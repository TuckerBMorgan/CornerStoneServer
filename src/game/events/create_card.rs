use crate::game::{GameState, ScriptHost, Card};
use super::Event;
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct CreateCard {
    catalog_id: usize,
    unique_id: usize,
    cost: usize,
    starting_health: usize,
    starting_attack: usize 
}

impl CreateCard {
    pub fn new(catalog_id: usize,unique_id: usize, cost: usize, starting_health: usize, starting_attack: usize) -> CreateCard {
        CreateCard {
            catalog_id,
            unique_id,
            cost,
            starting_health,
            starting_attack
        }
    }
}

impl Event for CreateCard {
    fn execute(&self, mut game_state: GameState, script_host: &mut ScriptHost) -> GameState {
        let card_instance = Card::new(self.catalog_id, self.unique_id, self.cost, self.starting_health, self.starting_attack);
        game_state.add_card_instance_to_game(card_instance);
        game_state
    }

    fn to_json(&self) -> String {
        serde_json::to_string(self).unwrap().replace("{", "{\"eventType\":\"CreateCard\",")
    }
}