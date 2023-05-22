use std::collections::HashSet;


pub struct Controller {
    pub id: usize,
    pub card_ids: HashSet<usize>
}

impl Controller {
    pub fn new(id: usize) -> Controller {
        Controller {
            id,
            card_ids: HashSet::new()
        }
    }

    pub fn add_card_to_controller(&mut self, card_id: usize) {
        self.card_ids.insert(card_id);
    }
}