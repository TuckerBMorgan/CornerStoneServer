use crate::game::Event;

use super::Controller;

pub struct GameState {
    pub controllers: Vec<Controller>,
    pub pending_events: Vec<Box<dyn Event>>
}

impl GameState {
    pub fn new() -> GameState {
        GameState {
            controllers: vec![],
            pending_events: vec![]
        }
    }

    pub fn execute_event(self, event: Box<dyn Event>) -> GameState {
        event.execute(self)
    }

    pub fn queue_event(mut self, event: impl Event + 'static) -> GameState{
        self.pending_events.push(Box::new(event));
        self
    }

    pub fn drain_event_queue(mut self) {
        while self.pending_events.len() > 0 {
            let most_recent_event = self.pending_events.remove(0);
            self = self.execute_event(most_recent_event);
        }
    }

    pub fn add_controller(&mut self, controller: Controller) {
        self.controllers.push(controller);
    }
}