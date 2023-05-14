use crate::game::{GameState, ScriptHost};

use super::{Event, AddController};

pub struct StartGame {
    
}

impl StartGame {
    pub fn new() -> StartGame {
        StartGame {  }
    }
}

impl Event for StartGame {
    fn execute(&self, game_state: GameState, script_host: &mut ScriptHost) -> GameState {
        println!("Game start event fired!");
        script_host.execute_module("./scripts/events/test.ts");
        let add_controller_event_0 = AddController::new(0);
        let add_controller_event_1 = AddController::new(1);
        game_state.queue_event(add_controller_event_0).queue_event(add_controller_event_1)
    }
}