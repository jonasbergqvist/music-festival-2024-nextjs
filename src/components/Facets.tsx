import { StringFacet } from "@/generated";
import { Dispatch, SetStateAction } from "react";

type FacetProps = {
  genreFacets: Array<StringFacet>;
  genres: Array<string>;
  setGenres: Dispatch<SetStateAction<string[]>>;

  cityFacets: Array<StringFacet>;
  cities: Array<string>;
  setCities: Dispatch<SetStateAction<string[]>>;
}

export function Facets({ genreFacets, genres, setGenres, cityFacets, cities, setCities }: FacetProps) {
  const handleGenreSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    let localGenres = Array.from(genres)
    if(event.target.checked) {
      localGenres.push(event.target.id);
    }
    else {
      localGenres = localGenres.filter(x => x !== event.target.id);
    }
    setGenres(localGenres);
  };

  const handleCitySelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    let localCities = Array.from(cities)
    if(event.target.checked) {
      localCities.push(event.target.id);
    }
    else {
      localCities = localCities.filter(x => x !== event.target.id);
    }
    setCities(localCities);
  };

  return (
    <div>
      <div className="sticky top-0 p-4 w-full">
          <b>Genre</b>
          <ul className="flex sm:flex-col overflow-hidden content-center justify-between">
            <div id="Genres"  className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            {
              genreFacets.map((genre, idx) => {
                return (
                  <div className="flex items-center mb-4" key={idx}>
                    <input id={genre?.name ?? ''} checked={genres.indexOf(genre?.name ?? '') > -1 } onChange={handleGenreSelection} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{ genre?.name } ({ genre?.count })</label>
                  </div>
                )
              })
            }
            </div>
          </ul>
      </div>
      <div className="sticky top-0 p-4 w-full">
        <b>City</b>
          <ul className="flex sm:flex-col overflow-hidden content-center justify-between">
            <div id="Cities"  className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            {
              cityFacets.map((city, idx) => {
                return (
                  <div className="flex items-center mb-4" key={idx}>
                    <input id={city?.name ?? ''} checked={cities.indexOf(city?.name ?? '') > -1 } onChange={handleCitySelection} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{ city?.name } ({ city?.count })</label>
                  </div>
                )
              })
            }
            </div>
          </ul>
      </div>
    </div>
  );
}