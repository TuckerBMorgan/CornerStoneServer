mod game;
use std::net::TcpListener;

use game::{GameState, StartGame};

fn main() {
    let listener = TcpListener::bind("127.0.0.1:7878").unwrap();

    let mut game_state = GameState::new();
    game_state.queue_event(StartGame::new()).drain_event_queue();

    for stream in listener.incoming() {
        let stream = stream.unwrap();

        println!("Connection established!");
    }
}