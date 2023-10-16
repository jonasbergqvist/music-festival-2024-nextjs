import { Artist, Ranking, StringFacet, useArtistListQuery } from '../../generated';
import { useEffect, useState } from 'react';

import { Facets } from '@/components/Facets';
import { Artists } from '@/components/Artists';
import { Searchbox } from '@/components/Searchbox';

export default function Home() {
  const [searchBox, setSearchBox] = useState(() => '');
  const [searchPhrase, setSearchPhrase] = useState(() => '');
  const [genres, setGenres] = useState(() => new Array<string>());
  const [cities, setCities] = useState(() => new Array<string>());
  const [ranking, setRanking] = useState(() => Ranking.Relevance)

  const [items, setItems] = useState(() => new Array<Artist>())
  const [genreFacets, setGenreFacets] = useState(() => new Array<StringFacet>())
  const [cityFacets, setCityFacets] = useState(() => new Array<StringFacet>())

  const { data } = useArtistListQuery({ variables: {
    searchPhrase: searchPhrase,
    genres: genres,
    cities: cities,
    ranking: ranking
  }});

  function facetGenreOptionChanged(): boolean {
    if(data?.Artist?.facets?.Genre?.length != genreFacets.length) {
      return true
    }

    for (let i = 0; i < data?.Artist?.facets?.Genre.length; i++) {
      if(data?.Artist?.facets?.Genre[i]?.name !== genreFacets[i]?.name) {
        return true
      }

      if(data?.Artist?.facets?.Genre[i]?.count !== genreFacets[i]?.count) {
        return true
      }
    }

    return false
  }

  function facetCityOptionChanged(): boolean {
    if(data?.Artist?.facets?.City_Name?.length != cityFacets.length) {
      return true
    }

    for (let i = 0; i < data?.Artist?.facets?.City_Name.length; i++) {
      if(data?.Artist?.facets?.City_Name[i]?.name !== cityFacets[i]?.name) {
        return true
      }

      if(data?.Artist?.facets?.City_Name[i]?.count !== cityFacets[i]?.count) {
        return true
      }
    }

    return false
  }

  useEffect(() => {
    if(data?.Artist?.facets?.Genre != undefined && data?.Artist?.facets?.Genre) {
      if(facetGenreOptionChanged()) {
        setGenreFacets(data.Artist.facets?.Genre as StringFacet[])
      }
      if(facetCityOptionChanged()) {
        setCityFacets(data.Artist.facets?.City_Name as StringFacet[])
      }
    }
  }, [data?.Artist?.facets]);

  useEffect(() => {
    if(data?.Artist?.items !== undefined) {
      if(data?.Artist?.items) {
        setItems(data?.Artist?.items as Artist[])
      }
    }
  }, [data?.Artist?.items]);

  return (
    <main className="overflow-hidden bg-sky-500/50 dark:bg-gray-800 rounded-2xl">
      <div className="flex">
        <div className="relative hidden h-screen my-4 ml-4 shadow-lg lg:block w-80">
            <div className="h-full bg-white rounded-2xl dark:bg-gray-700">
                <div className="flex items-center justify-center pt-6 font-mono font-bold">
                  Music Festival 2024
                </div>
                <nav className="mt-6">
                    <div>
                      <Facets 
                        genreFacets={genreFacets} 
                        genres={genres} 
                        setGenres={setGenres}
                        cityFacets={cityFacets} 
                        cities={cities} 
                        setCities={setCities}
                         />
                    </div>
                </nav>
            </div>
        </div>
        
        <div className="w-full pl-0 md:p-4 md:space-y-4">
            <header className="z-40 items-center w-full h-16 bg-white shadow-lg dark:bg-gray-700 rounded-2xl">
              <Searchbox
                searchBox={searchBox}
                ranking={ranking}
                setGenres={setGenres}
                setRanking={setRanking}
                setSearchBox={setSearchBox}
                setSearchPhrase={setSearchPhrase} />
            </header>
            <main role="main" className="w-full h-full flex-grow p-3 overflow-auto">
              <div className="tracking-widest text-xs title-font font-medium text-gray-800 mb-1">Hits: { data?.Artist?.total }</div>  
              <Artists items={items}/>
            </main>
          </div>
        </div>
    </main>
  );
}