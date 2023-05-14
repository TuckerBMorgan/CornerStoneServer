use crate::game::{GameState};

use super::{Event, AddController};
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct StartGame {
    ghost_data: usize
}

impl StartGame { 
    pub fn new() -> StartGame {
        StartGame { ghost_data: 0 }
    }
}

impl Event for StartGame {
    fn execute(&self, game_state: GameState) -> GameState {
        let add_controller_event_0 = AddController::new(0);
        let add_controller_event_1 = AddController::new(1);
        game_state.queue_event(add_controller_event_0).queue_event(add_controller_event_1)
    }

    fn to_json(&self) -> String {
        serde_json::to_string(self).unwrap().replace("{", "{\"eventType\":\"start_game\",")
    }
}