use crate::game::{GameState, ScriptHost};

pub trait Event {
    fn to_json(&self) -> String;
    fn execute(&self, game_state: GameState, script_host: &mut ScriptHost) -> GameState;
} 