export interface CardDescriptorBase {
    name: string;
    kind: CardDescriptor["kind"];
    cost: number;
    extraRulesText: string;
    groupIdentity?: GroupIdentity;
    id?: number;
}
export enum GroupIdentity {
    Necro = "Necro",
    NewWorld = "New World",
}
export enum CardKind {}
export interface CardDescriptorRegistry {}

export type CardDescriptor = CardDescriptorRegistry[keyof CardDescriptorRegistry];

export interface RulesCardDescriptor extends CardDescriptorBase {
    kind: CardKind.Rules;
}
export enum CardKind { Rules = "rules" }
export interface CardDescriptorRegistry { [CardKind.Rules]: RulesCardDescriptor }

export interface UnitCardDescriptor extends CardDescriptorBase {
    kind: CardKind.Unit;
    movement: number;
    power: number;
    resilience: number;
}
export enum CardKind { Unit = "unit" }
export interface CardDescriptorRegistry { [CardKind.Unit]: UnitCardDescriptor }


export interface InfrastructreCardDescriptor extends CardDescriptorBase {
    kind: CardKind.Infrastructure;
    resilience: number;
}
export enum CardKind { Infrastructure = "infrastructure" }
export interface CardDescriptorRegistry { [CardKind.Infrastructure]: InfrastructreCardDescriptor }


export interface ActionCardDescriptor extends CardDescriptorBase {
    kind: CardKind.Action;
}
export enum CardKind { Action = "action" }
export interface CardDescriptorRegistry { [CardKind.Action]: ActionCardDescriptor }

export const db = new Set<CardDescriptor>();
let id = 0;

export function register<T extends CardDescriptor>(card: T): T & {readonly id: number} {
    if (!card.id) {
        card.id = id++;
    }
    else if (card.id > id) {
        id = card.id + 1;
    }
    db.add(card);
    return card as T & {readonly id: number};
}

export interface Decklist {
    name: string;
    cards: readonly [CardDescriptor, CardDescriptor, CardDescriptor, CardDescriptor, CardDescriptor, CardDescriptor, CardDescriptor, CardDescriptor, CardDescriptor, CardDescriptor, CardDescriptor, CardDescriptor, CardDescriptor, CardDescriptor, CardDescriptor];
}

export const decklists = new Set<Decklist>();

export function createDecklist(name: string, ...cards: Decklist["cards"]) {
    const deck = {name, cards};
    decklists.add(deck);
    return deck;
}