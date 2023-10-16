import { Artist, Ranking, StringFacet, useArtistListQuery } from './../generated';
import { useEffect, useState } from 'react';

import { Facets } from '@/components/Facets';
import { Artists } from '@/components/Artists';
import { Searchbox } from '@/components/Searchbox';

export default function Home() {

  return (
    <main className="overflow-hidden bg-sky-500/50 dark:bg-gray-800 rounded-2xl">
      Music Festival 2024
    </main>
  );
}