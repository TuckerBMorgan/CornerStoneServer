import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { decklists } from "../../../scripts/database/index";

export default component$(() => {
  return (
    <>
      <a href="/db"><h1>Complete database</h1></a>
      {Array.from(decklists.values()).map(list => <a href={`/${encodeURIComponent(list.name)}`}><h1>{list.name}</h1></a>)}
    </>
  );
});

export const head: DocumentHead = {
  title: 'Visual Spoiler',
  meta: [
    {
      name: 'description',
      content: 'Visual Spoiler',
    },
  ],
};
