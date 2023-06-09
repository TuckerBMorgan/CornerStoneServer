import { register, CardKind, GroupIdentity, createDecklist } from "../cards.js";

let card;
createDecklist(
    "The Frozen March",
    card = register({
        groupIdentity: GroupIdentity.Necro,
        kind: CardKind.Unit,
        cost: 1,
        name: "Frozen Infantryman",
        power: 2,
        resilience: 1,
        movement: 1,
        extraRulesText: "When this unit retreats, create a 0/1/1 'Frozen Corpse' at its position."
    }),
    card,
    card = register({
        groupIdentity: GroupIdentity.Necro,
        kind: CardKind.Unit,
        cost: 1,
        name: "Chilling Motivator",
        power: 1,
        resilience: 3,
        movement: 1,
        extraRulesText: "Quick: Units which start their turn adjacent to this unit have one +1 movement until end of turn and regain one resilience."
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
        groupIdentity: GroupIdentity.Necro,
        kind: CardKind.Unit,
        cost: 2,
        name: "Battlefield Salvager",
        resilience: 3,
        power: 1,
        movement: 2,
        extraRulesText: "Any time an adjacent unit retreats, this unit gets +1 power _(until it retreats)_."
    }),
    card,
    card = register({
        groupIdentity: GroupIdentity.Necro,
        kind: CardKind.Infrastructure,
        cost: 3,
        name: "Frozen War Banner",
        resilience: 2,
        extraRulesText: `Units adjacent to this infrastructure have +1 power.
Action: You may spend one supply to return this to your hand. _(This occurs during the action-based deployment phase, and only if this infrastructure has not been destroyed.)_`
    }),
    card,
    card = register({
        groupIdentity: GroupIdentity.Necro,
        kind: CardKind.Action,
        cost: 4,
        name: "Frozen Mustering",
        extraRulesText: "Deploy two 'Frozen Infantryman' units."
    }),
    card,
    card = register({
        groupIdentity: GroupIdentity.Necro,
        kind: CardKind.Unit,
        cost: 5,
        name: "Shambling War-Host",
        power: 3,
        resilience: 5,
        movement: 2,
        extraRulesText: "At the end of the turn, deploy one 'Frozen Corpse' to each position this unit occupied during the turn if they are unoccupied."
    }),
    card,
    card = register({
        groupIdentity: GroupIdentity.Necro,
        kind: CardKind.Action,
        cost: 9,
        name: "Forced March",
        extraRulesText: `This costs 1 less supply for each friendly unit you control.
Quick: Deploy two 'Frozen Infantryman'.
Action: Move all friendly units 2 positions in the same direction of your choosing. _(This is forced movement.)_`
    })
);