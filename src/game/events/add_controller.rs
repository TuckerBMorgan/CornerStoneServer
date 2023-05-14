use crate::game::Controller;
use crate::game::GameState;
use crate::game::Event;

use serde::{Serialize, Deserialize};

use crate::game::ScriptHost;

#[derive(Serialize, Deserialize, Debug)]
pub struct AddController {
    pub id: usize
}

impl AddController {
    pub fn new(id: usize) -> AddController {
        AddController {
            id
        }
    }
}

impl Event for AddController {
    fn execute(&self, mut game_state: GameState, _script_host: &mut ScriptHost) -> GameState {
        game_state.add_controller(Controller::new(self.id));
        game_state
    }

    fn to_json(&self) -> String {
        serde_json::to_string(self).unwrap().replace("{", "{\"eventType\":\"AddController\",")
    }
}