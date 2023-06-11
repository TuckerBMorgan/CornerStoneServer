import { register, CardKind } from "../cards.js";

register({
    kind: CardKind.Rules,
    cost: 0,
    name: `Getting Started`,
    extraRulesText: `
To begin, each player shuffles their 15 card deck and draws 5 cards.
Each player may then choose to set aside an number of these cards, and draw that many new cards to replace them.
The cards set aside are then shuffled back into the deck.
Both players start with a "Scout Pylon" deployed in the central position of the battlefield grid row in front of them.

The game then begins - the turn counter starts at 1, and each player is awarded 1 supply for their first turn.

Both players may then submit as many actions as they have the cards and supply for.
These actions will remaind hidden to the other player until the turn is resolved.

The turn then resolves.
The turn counter advances by 1, and players are awarded supply equal to the turn counter.
Players each draw one new card, and then play continues in this fashion
    - advancing the turn counter
    - collecting supply
    - drawing a card
    - submitting actions
    - resolving the turn
until a player has been forced off the battlefield.

A player is forced off the battlefield when they no longer have control over any territory.
    `
});

register({
    kind: CardKind.Rules,
    cost: 0,
    name: `Resolving a turn`,
    extraRulesText: `
Once all actions are submitted (or a turn timer has elapsed), a turn must be resolved.
A turn is resolved in this order:
- Any quick effects happen, in the same order non-quick effects do.
- Units move.
  - All submitted movements occur "simultaneously". If a unit attempts to move into an occupied space, or the same space as another unit, one of two things happen:
    - If the units are all controlled by the same player, the unit with the greatest cost, and the alphabetically first name, then oldest on the board, has priority for the movement.
      If the full movement cannot be done (eg, because, due to forced movement, the unit is moving into a wall or another stationary friendly unit), as much movement as can be performed is, and the unit stops.
      (This can, in turn, block other units movement in a chain)
    - If the units are controlled by different players, the units clash.
      In a clash, friendly units damage the resilience of enemy units by an amount equal to their total power, divided by the number of units damaged, rounded up.
      If a unit's resilience is reduced to 0, it retreats.
- New units and infrastructure are deployed to the battlefield.
- Actions occur. These are "simultaneous".
  - Any conflicting movements resolve just as movements in the movement step do.
  - Any resilience to units changes are summed, and only the final value at the end of effect resolution is checked to see if a unit retreats.`
});

register({
    kind: CardKind.Rules,
    cost: 0,
    name: `Definitions`,
    extraRulesText: `
- Resilience - The ability of a structure or unit to remain functional on the battlefield.
  - The number on a card is both it's initial value, and it's maximum.
- Power - The magnitude of ability of a unit to reduce the resilience of anther unit or structure.
- Retreat - When a unit's resilience is reduced to 0, it retreats. Units which are cards are shuffled back into their owner's deck.
- Battlefield - The grid to which units are deployed and move within.
- Conrtol - A player has "control" of grid tiles which are adjacent to their units, but not units controlled by an opposing player.
- Deploy - A player may place a unit or infrastructure on the battlefield anywhere they maintain control.
- Forced from the battlefield - A player is forced from the battlefield (loses the game), when they control no grid tiles, and have no deployed units
  - This condition is only checked at the end of a turn.
- Supply - Supply is the resource spent to deploy units and perform actions on a turn. A player's supply is usually capped at the current turn count, but supply is retained between turns.
- Adjacent - The positions directly north/south/east/west of a position are adjacent to it.
    `
});

