import { register, CardKind, createDecklist } from "../cards.js";

let noop;
createDecklist(
  "Rules Reminder Cards",
  register({
    kind: CardKind.Rules,
    cost: 0,
    name: `Getting Started 1/2`,
    extraRulesText: `
To begin, each player shuffles their 15 card deck and draws 5 cards.
Each player may then choose to set aside an number of these cards, and draw that many new cards to replace them.
The cards set aside are then shuffled back into the deck.

The game then begins - the turn counter starts at 1, and each player is awarded 1 supply for their first turn.

Both players may then submit as many actions as they have the cards and supply for.
These actions will remain hidden to the other player until the turn is resolved.`
  }),
  register({
    kind: CardKind.Rules,
    cost: 0,
    name: `Getting Started 2/2`,
    extraRulesText: `
The turn then resolves.
The turn counter advances by 1, and players are awarded supply equal to the turn counter.
Players each draw one new card, and then play continues in this fashion
  - advancing the turn counter
  - collecting supply
  - drawing a card
  - submitting actions
  - resolving the turn
until a player has been forced off the battlefield or a stalemate is declared.`
  }),
  register({
    kind: CardKind.Rules,
    cost: 0,
    name: `Turn Resolution 1/2`,
    extraRulesText: `
First, any quick effects happen - quick special effects (start of turn), then queued quick movements, then queued quick deployments.

Then units move. All units advance/clash one tile at a time. All submitted movements occur "simultaneously". If a unit attempts to move into an occupied space, or the same space as another unit, one of two things happen:
  - If the units are all controlled by the same player, the unit with the greatest cost, then the greatest power,
    and the alphabetically first name, then oldest on the board, has priority for the movement.
    If the full movement cannot be done (eg, because, due to forced movement, the unit is moving into a wall or
    another stationary friendly unit), as much movement as can be performed is, and the unit stops.
    (This can, in turn, block other units movement in a chain)
  - If the units are controlled by different players, the units clash.
    In a clash, friendly units damage the resilience of enemy units by an amount equal to their total power, divided
    by the number of units damaged, rounded up.
    If a unit's resilience is reduced to 0, it retreats.`
  }),
  register({
    kind: CardKind.Rules,
    cost: 0,
    name: `Turn Resolution 2/2`,
    extraRulesText: `
New units and infrastructure are then deployed to the battlefield.
  - Units which deploy to a space occupied by an enemy unit immediately clash.
  - If they do not force the enemy to retreat, the deployment fails.
  - If the deployment was from a unit card, the unit card is returned to the player's hand.
Finally, non-quick actions occur. These are "simultaneous", in the same order they resolve in the "quick" effect step.
  - action-based special effects, queued movements, queued deployments.
  - Units may retreat and infrastructure may be destroyed both as resilience changes occur and as a result of movement clashes.`
  }),
  register({
    kind: CardKind.Rules,
    cost: 0,
    name: `Conflicting Forced Movement`,
    extraRulesText: `
During both quick effects and normal action phases, a unit may be affected by multiple forced movement effects.
In such a scenario, the net movement is summed (one left + one right = no movement, for example).
Then, movement is executed one step at a time for each affected unit (as with turn movement), in the following directional priority:
 - Away from the owning player
 - Towards the owning player
 - The owning player's left
 - The owning player's right
Lost clashes may stop this movement at any step, and negate the remainder of the movement. Collision with an allied unit or
infrastructure will likewise stop the movement early.
If forced movement is stopped by the edge of the battlefield, the unit stopped takes 1 damage.`
  }),
  register({
    kind: CardKind.Rules,
    cost: 0,
    name: `Definitions 1/2`,
    extraRulesText: `
*Resilience* - The ability of a structure or unit to remain functional on the battlefield.
  - The number on a card is both it's initial value, and it's maximum.
*Power* - The magnitude of ability of a unit to reduce the resilience of anther unit or structure.
*Retreat* - When a unit's resilience is reduced to 0, it retreats.
    - Used action cards, retreated unit cards, and destroyed infrastructure cards are placed into a discard pile.
*Battlefield* - The grid to which units are deployed and move within.
*Conrtol* - A player has "control" of grid tiles which are adjacent to their units, but not units controlled by an opposing player. 
    - Players are considered as having control of the row in front of them, provided that control is not contested by an enemy unit.`
  }),
  register({
    kind: CardKind.Rules,
    cost: 0,
    name: `Definitions 2/2`,
    extraRulesText: `
*Deploy* - A player may place a unit or infrastructure on the battlefield anywhere they maintain control.
*Forced from the battlefield* - A player is forced from the battlefield (loses the game), when they control no grid tiles,
  and have no deployed units
  - This condition is only checked at the end of a turn.
  - If the turn counter reaches 30, the game is considered a stalemate.
*Supply* - Supply is the resource spent to deploy units and perform actions on a turn. A player's supply is usually capped
  at the current turn count, but supply is retained between turns.
*Adjacent* - The positions directly north/south/east/west of a position are adjacent to it.`
  }),
  noop = register({
    kind: CardKind.Rules,
    cost: 0,
    name: "This card intentionally left blank",
    extraRulesText: ""
  }),
  noop,
  noop,
  noop,
  noop,
  noop,
  noop,
  noop
);
