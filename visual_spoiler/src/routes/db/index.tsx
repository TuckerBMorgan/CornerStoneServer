import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { db } from "../../../../scripts/database/index";
import { Card } from '~/components/card';

export default component$(() => {
  return (
    <>
      {Array.from(db.values()).map(desc => <Card card={desc}/>)}
    </>
  );
});

export { head } from "../index";
