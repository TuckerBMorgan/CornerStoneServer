import { register, CardKind, GroupIdentity, createDecklist } from "../cards.js";

let card;
createDecklist(
    "New World Infrastructure",
    card = register({
        groupIdentity: GroupIdentity.NewWorld,
        kind: CardKind.Infrastructure,
        cost: 0,
        name: "Supply Cache",
        resilience: 1,
        extraRulesText: "Increase your supply cap by 1.\n_(does not generate extra supply)_"
    }),
    card,
    card = register({
        groupIdentity: GroupIdentity.NewWorld,
        kind: CardKind.Unit,
        cost: 1,
        name: "Engineer Corp.",
        power: 1,
        resilience: 1,
        movement: 1,
        extraRulesText: "Infrastructure costs 1 less supply to build."
    }),
    card,
    card = register({
        kind: CardKind.Unit,
        cost: 1,
        name: "Trench Diggers",
        power: 1,
        resilience: 3,
        movement: 2,
        extraRulesText: "When this is deployed, create a 1/1 'Barbed Trench' infrastructure in both the tiles to the left and right of it. _(This occurs during action-based deployments)_",
    }),
    card,
    card = register({
        kind: CardKind.Unit,
        cost: 2,
        name: "Forward Scouts",
        power: 1,
        resilience: 3,
        movement: 3,
        extraRulesText: "",
    }),
    card,
    card = register({
        groupIdentity: GroupIdentity.NewWorld,
        kind: CardKind.Action,
        cost: 2,
        name: "Precision Support Strike",
        extraRulesText: "3 damage to target position. Adjacent enemy units take 1 damage and are knocked 1 space farther away from the impact."
    }),
    card,
    card = register({
        groupIdentity: GroupIdentity.NewWorld,
        kind: CardKind.Infrastructure,
        cost: 3,
        name: "Machine-gun Emplacement",
        resilience: 4,
        extraRulesText: "Quick: At the beginning of each turn, this does 2 damage to every adjacent enemy unit and diagonally adjacent unit."
    }),
    card,
    card = register({
        groupIdentity: GroupIdentity.NewWorld,
        kind: CardKind.Infrastructure,
        cost: 5,
        name: "Artillery Emplacement",
        resilience: 6,
        extraRulesText: "Quick: At the beginning of each turn, this does 3 damage to target position and 1 damage to all adjacent positions."
    }),
    card,
    card = register({
        groupIdentity: GroupIdentity.NewWorld,
        kind: CardKind.Action,
        cost: 9,
        name: "Coordinated Bombardment",
        extraRulesText: "This costs 1 less supply for each infrastructure you control. Copy this action for each infrastructure you control. Deal 1 damage to target position and all adjacent positions."
    })
);