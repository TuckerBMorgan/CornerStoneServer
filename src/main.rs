mod game;
use std::{net::TcpListener, io::Write};

use game::{GameState, StartGame, ScriptHost};

const END_MESSAGE_CHARACTER : &str = "@@";


fn main() {
    let listener = TcpListener::bind("127.0.0.1:7878").unwrap();

    let mut script_host = ScriptHost::new();
    let mut game_state = GameState::new();
    let events = game_state.queue_event(StartGame::new()).drain_event_queue(&mut script_host);



    let mut streams = vec![];
    for stream in listener.incoming() {
        let mut stream = stream.unwrap();

        println!("Connection established!");
        for event in events.iter() {
            println!("Sending event {:?}", event);
            let _ = stream.write_all((event.to_owned() + END_MESSAGE_CHARACTER).as_bytes());
        }

        streams.push(stream);
    }
}