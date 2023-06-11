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
        resilience: 1,
        power: 1,
        movement: 1,
        extraRulesText: "Infrastructure costs 1 less supply to build."
    }),
    card,
    card = register({
        kind: CardKind.Unit,
        cost: 1,
        name: "Self-Defense Squadron",
        resilience: 2,
        power: 2,
        movement: 1,
        extraRulesText: "",
    }),
    card,
    card = register({
        kind: CardKind.Unit,
        cost: 2,
        name: "Forward Scouts",
        resilience: 3,
        power: 1,
        movement: 3,
        extraRulesText: "",
    }),
    card,
    card = register({
        groupIdentity: GroupIdentity.NewWorld,
        kind: CardKind.Action,
        cost: 2,
        name: "Precision Support Strike",
        extraRulesText: "3 damage to target position. Adjacent units take 1 damage and are knocked 1 space farther away from the impact."
    }),
    card,
    card = register({
        groupIdentity: GroupIdentity.NewWorld,
        kind: CardKind.Infrastructure,
        cost: 3,
        name: "Machine-gun Emplacement",
        resilience: 5,
        extraRulesText: "Quick: At the beginning of each turn, this does 1 damage to every adjacent enemy unit."
    }),
    card,
    card = register({
        groupIdentity: GroupIdentity.NewWorld,
        kind: CardKind.Infrastructure,
        cost: 5,
        name: "Artillery Emplacement",
        resilience: 7,
        extraRulesText: "Quick: At the beginning of each turn, this does 2 damage to a position of your choosing, and 1 damage to adjacent positions."
    }),
    card,
    card = register({
        groupIdentity: GroupIdentity.NewWorld,
        kind: CardKind.Action,
        cost: 9,
        name: "Coordinated Bombardment",
        extraRulesText: "This costs 1 less supply for each infrastructure you control. Copy this action for each infrastructure you control. Deal 3 damage to target position and all adjacent positions."
    })
);