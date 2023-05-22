use crate::game::{GameState, ScriptHost, Card, self};
use super::Event;
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct GiveCardToController {
    pub card_unique_id: usize,
    pub controller_id: usize
}

impl GiveCardToController {
    pub fn new(card_unique_id: usize, controller_id: usize) -> GiveCardToController {
        GiveCardToController {
            card_unique_id,
            controller_id
        }
    }
}


impl Event for GiveCardToController {
    fn execute(&self, mut game_state: GameState, script_host: &mut ScriptHost) -> GameState {
        game_state.give_card_instance_to_controller(self.card_unique_id, self.controller_id);
        game_state
    }

    fn to_json(&self) -> String {
        serde_json::to_string(self).unwrap().replace("{", "{\"eventType\":\"GiveCardToController\",")
    }
}