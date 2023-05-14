use crate::game::Controller;
use crate::game::GameState;
use crate::game::Event;
use crate::game::ScriptHost;
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
}