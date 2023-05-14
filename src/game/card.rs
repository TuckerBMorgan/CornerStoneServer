pub struct CardRecipe {
    pub base_cost: usize,
    pub base_health: usize,
    pub base_damage: usize
}


pub struct Card {
    pub cost: usize,
    pub health: usize,
    pub damage: usize
}

impl Card {
    pub fn new(card_recipe: &CardRecipe) -> Card {
        CardRecipe {
            cost: card_recipe.base_cost,
            health: card_recipe.base_health,
            damage: card_recipe.base_damage
        }
    }
}