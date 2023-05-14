use std::pin::Pin;
use std::rc::Rc;

use anyhow::anyhow;
use anyhow::bail;
use anyhow::Context;
use anyhow::Error;
use deno_ast::MediaType;
use deno_ast::ParseParams;
use deno_ast::SourceTextInfo;
use deno_core::error::AnyError;
use deno_core::resolve_import;
use deno_core::resolve_path;
use deno_core::Extension;
use deno_core::JsRuntime;
use deno_core::ModuleLoader;
use deno_core::ModuleSource;
use deno_core::ModuleSourceFuture;
use deno_core::ModuleSpecifier;
use deno_core::ModuleType;
use deno_core::ResolutionKind;
use deno_core::RuntimeOptions;
use deno_core::url::Url;
use futures::FutureExt;

struct TypescriptModuleLoader;

impl ModuleLoader for TypescriptModuleLoader {
    fn resolve(
        &self,
        specifier: &str,
        referrer: &str,
        _kind: ResolutionKind,
    ) -> Result<ModuleSpecifier, Error> {
        Ok(resolve_import(specifier, referrer)?)
    }

    fn load(
        &self,
        module_specifier: &ModuleSpecifier,
        _maybe_referrer: Option<&ModuleSpecifier>,
        _is_dyn_import: bool,
    ) -> Pin<Box<ModuleSourceFuture>> {
        fn load(module_specifier: &ModuleSpecifier) -> Result<ModuleSource, AnyError> {
            let path = module_specifier
                .to_file_path()
                .map_err(|_| anyhow!("Only file:// URLs are supported."))?;

            let media_type = MediaType::from_path(&path);
            let (module_type, should_transpile) = match MediaType::from_path(&path) {
                MediaType::JavaScript | MediaType::Mjs | MediaType::Cjs => {
                    (ModuleType::JavaScript, false)
                }
                MediaType::Jsx => (ModuleType::JavaScript, true),
                MediaType::TypeScript
                | MediaType::Mts
                | MediaType::Cts
                | MediaType::Dts
                | MediaType::Dmts
                | MediaType::Dcts
                | MediaType::Tsx => (ModuleType::JavaScript, true),
                MediaType::Json => (ModuleType::Json, false),
                _ => bail!("Unknown extension {:?}", path.extension()),
            };

            let code = std::fs::read_to_string(&path)?;
            let code = if should_transpile {
                let parsed = deno_ast::parse_module(ParseParams {
                    specifier: module_specifier.to_string(),
                    text_info: SourceTextInfo::from_string(code),
                    media_type,
                    capture_tokens: false,
                    scope_analysis: false,
                    maybe_syntax: None,
                })?;
                parsed.transpile(&Default::default())?.text
            } else {
                code
            };
            Ok(ModuleSource::new(
                module_type,
                code.into(),
                module_specifier,
            ))
        }

        futures::future::ready(load(module_specifier)).boxed_local()
    }
}

pub struct ScriptHost {
    runtime: JsRuntime,
}

impl ScriptHost {
    pub fn new() -> ScriptHost {
        // Build a deno_core::Extension providing custom ops
        let ext = Extension::builder("cornerstone_host_extensions")
            .ops(vec![
                // The op-layer automatically deserializes inputs
                // and serializes the returned Result & value
                // TODO: Create game-specific builtins (gamestate manipulation/querying helpers?)
            ])
            .build();

        // Initialize a runtime instance
        let runtime = JsRuntime::new(RuntimeOptions {
            extensions: vec![
                ext,
            ],
            module_loader: Some(Rc::new(TypescriptModuleLoader)),
            ..Default::default()
        });

        ScriptHost { runtime }
    }

    pub fn execute_module_url(self: &mut Self, module: &Url) -> Result<(), AnyError> {
        // TODO: Use real logging library (for configurable log levels and areas)
        let future = async move {
            println!("Loading module: {0}", module);
            let mod_id_res = self.runtime.load_main_module(module, None).await;
            match &mod_id_res {
                Result::Err(err) => println!("Module loading error: {0}", err),
                _ => ()
            }
            let mod_id = mod_id_res.unwrap();
            println!("Evaluating module: {0}", module);
            let result = self.runtime.mod_evaluate(mod_id);
            println!("Executing event loop for module: {0}", module);
            let spin_result = self.runtime.run_event_loop(false).await;
            match &spin_result {
                Result::Err(err) => println!("Event loop execution error: {0}", err),
                _ => ()
            }
            println!("Waiting for results for module: {0}", module);
            let res = result.await?;
            match &res {
                Result::Err(err) => println!("Execution error: {0}", err),
                _ => ()
            }
            println!("Module execution complete: {0}", module);
            res
        };

        // TODO: Longer lived runtime? Multithreaded?
        tokio::runtime::Builder::new_current_thread()
            .enable_all()
            .build()
            .unwrap()
            .block_on(future)
    }

    // TODO: Load from in-memory filesystem? Also: collect results?
    pub fn execute_module(self: &mut Self, module: &str) -> Result<(), AnyError> {
        self.execute_module_url(&resolve_path(
            module, 
            &std::env::current_dir().context("Unable to get CWD")?,
        )?)
    }
}
