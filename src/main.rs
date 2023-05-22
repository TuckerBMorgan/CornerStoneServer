mod game;
use std::{net::TcpListener, io::Write};

use game::{GameState, StartGame, ScriptHost, GiveCardToController};

const END_MESSAGE_CHARACTER : &str = "@@";


fn main() {
    let listener = TcpListener::bind("127.0.0.1:7878").unwrap();

    let mut script_host = ScriptHost::new();
    let mut game_state = GameState::new();
    let mut game_state = game_state.start_game().resolve_game_state(&mut script_host);
    game_state = game_state.add_cards_to_game();
    game_state = game_state.resolve_game_state(&mut script_host);




    let mut streams = vec![];
    for stream in listener.incoming() {
        let mut stream = stream.unwrap();

        println!("Connection established!");
        for event in game_state.event_strings.iter() {
            println!("Sending event {:?}", event);
            let _ = stream.write_all((event.to_owned() + END_MESSAGE_CHARACTER).as_bytes());
        }

        game_state.event_strings = vec![];

        streams.push(stream);
    }
}