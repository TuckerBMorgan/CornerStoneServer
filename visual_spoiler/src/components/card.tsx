import { component$ } from '@builder.io/qwik';
import { CardDescriptor, CardKind } from '../../../scripts/database';
import { marked } from "marked";

/**
 * The RouterHead component is placed inside of the document `<head>` element.
 */
export const Card = component$((props: {card: CardDescriptor}) => {
  const card = props.card;
  let cost, power, resilience, movement;
  cost = card.cost ? <div class="cost-container"><p class="icon-with-number">📦{card.cost}</p></div> : undefined;
  switch (card.kind) {
    case CardKind.Unit: {
        power = <div class="power-container"><p class="icon-with-number">⚔️{card.power}</p></div>
        movement = <div class="movement-container"><p class="icon-with-number">👣{card.movement}</p></div>
    }
    case CardKind.Infrastructure: {
        resilience = <div class="resilience-container"><p class="icon-with-number">🛡️{card.resilience}</p></div>
        break;
    }
  }
  return (
    <>
    <div class="card">
        <h1 class="card-name">{card.name}</h1>
        {cost}
        {card.groupIdentity ? <div class="group-identity-container"><p class="group-identity">{card.groupIdentity}</p></div> : ""}
        {card.extraRulesText ? <div class="rules-text-container"><div class={`rules-text ${card.extraRulesText.split("\n").length > 10 ? "smaller-text" : ""}`} dangerouslySetInnerHTML={marked(card.extraRulesText, {mangle: false, headerIds: false, gfm: true})}></div></div> : ""}
        {power}{resilience}{movement}
    </div>
    </>
  );
});
