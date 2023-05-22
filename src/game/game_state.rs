use std::collections::HashMap;

use crate::game::Event;

use super::{Controller, ScriptHost, Card, StartGame, CardRecipe, CreateCard, GiveCardToController};

pub struct GameState {
    pub controllers: Vec<Controller>,
    pub pending_events: Vec<Box<dyn Event>>,
    pub card_instances: HashMap<usize, Card>,
    unique_id_counter: usize,
    pub event_strings: Vec<String>
}

impl GameState {
    pub fn new() -> GameState {
        GameState {
            controllers: vec![],
            pending_events: vec![],
            card_instances: HashMap::new(),
            unique_id_counter: 0,
            event_strings: vec![]
        }
    }

    pub fn start_game(mut self) -> GameState {
        let mut start_rune = StartGame::new();
        self = self.queue_event(start_rune);
        self
    }

    pub fn add_cards_to_game(mut self) -> GameState {
        let fake_card_recipe = CardRecipe::new(1, 1, 1, 1);
        let id = self.allocate_unique_id();
        let fake_first_card = CreateCard::new(fake_card_recipe.catalog_id,
                                  id, 
                                            fake_card_recipe.base_cost, 
                            fake_card_recipe.base_health, 
                                            fake_card_recipe.base_attack);
        let give_card_to_controller = GiveCardToController::new(id, 0);
        return self.queue_event(fake_first_card).queue_event(give_card_to_controller)

    }

    pub fn execute_event(self, event: Box<dyn Event>, script_host: &mut ScriptHost) -> GameState {
        event.execute(self, script_host)
    }

    pub fn queue_event(mut self, event: impl Event + 'static) -> GameState {
        self.pending_events.push(Box::new(event));
        self
    }

    pub fn resolve_game_state(mut self, script_host: &mut ScriptHost) -> GameState {

        while self.pending_events.len() > 0 {
            let most_recent_event = self.pending_events.remove(0);
            self.event_strings.push(most_recent_event.to_json());
            self = self.execute_event(most_recent_event, script_host);
        }

        self
    }

    pub fn add_card_instance_to_game(&mut self, card_instance: Card) {
        println!("Adding Card ID {:?} to game", card_instance.unique_id);
        assert!(!self.card_instances.contains_key(&card_instance.unique_id));
        self.card_instances.insert(card_instance.unique_id, card_instance);
    }

    pub fn give_card_instance_to_controller(&mut self, card_instance_id: usize, controller_id: usize) {
        println!("Giving card {:?} to controller {:?} ", card_instance_id, controller_id);
        assert!(self.card_instances.contains_key(&card_instance_id));
        assert!(!self.controllers[self.get_other_controller_id(controller_id)].card_ids.contains(&card_instance_id));
        self.controllers[controller_id].add_card_to_controller(card_instance_id);
    }

    pub fn get_other_controller_id(&self, controller_id: usize) -> usize {
        if controller_id == 0 {
            return 1;
        }
        return 0;
    }

    pub fn add_controller(&mut self, controller: Controller) {
        self.controllers.push(controller);
    }

    pub fn allocate_unique_id(&mut self) -> usize {
        self.unique_id_counter += 1;
        return self.unique_id_counter;
    }
}