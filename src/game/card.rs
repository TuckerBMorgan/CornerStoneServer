pub struct CardRecipe {
    pub catalog_id: usize,
    pub base_cost: usize,
    pub base_health: usize,
    pub base_attack: usize
}


impl CardRecipe {
    pub fn new(catalog_id: usize, base_cost: usize, base_health: usize, base_attack: usize) -> CardRecipe {
        CardRecipe { catalog_id, base_cost, base_health, base_attack }
    }
}

pub struct Card {
    pub catalog_id: usize,
    pub unique_id: usize,
    pub cost: usize,
    pub health: usize,
    pub attack: usize
}

impl Card {
    pub fn new(catalog_id: usize, unique_id: usize, cost: usize, health: usize, attack: usize) -> Card {
        Card {
            catalog_id: catalog_id,
            unique_id,
            cost: cost,
            health: health,
            attack: attack
        }
    }
}