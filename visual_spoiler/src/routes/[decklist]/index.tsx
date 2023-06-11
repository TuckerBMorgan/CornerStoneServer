import { component$ } from '@builder.io/qwik';
import { useLocation, type DocumentHead } from '@builder.io/qwik-city';
import { decklists } from '../../../../scripts/database';
import { Card } from '~/components/card';

export default component$(() => {
    const loc = useLocation();
    const name = loc.params.decklist;
    const deck = Array.from(decklists).find(d => d.name === name);
    if (!deck) {
        return <p>Deck not found</p>
    }
    return (<>
      {deck?.cards.map(desc => <Card card={desc}/>)}
    </>);
});

export { head } from "../index";