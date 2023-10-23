import { StringFacet } from "@/generated";
import { Dispatch, SetStateAction } from "react";
import GradientWrapper from "./Layout/GradientWrapper";

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
    <div className="" style={{ background: "radial-gradient(141.61% 141.61% at 29.14% -11.49%, rgba(203, 213, 225, 0.15) 0%, rgba(203, 213, 225, 0) 57.72%)"}}>
        <div className="p-8">
          <h3 className="bg-clip-text text-transparent bg-gradient-to-r font-extrabold mx-auto" style={{ backgroundImage: "linear-gradient(179.1deg, #FFFFFF 0.77%, rgba(255, 255, 255, 0) 182.09%)" }}>
              Genre
          </h3>
         </div>
        <div className="pl-8">
          <ul className="list-disc pl-5">
            { genreFacets.map((genre, idx) => {
              return (
                <li className="flex items-center mb-4" key={idx}>
                    <input id={genre?.name ?? ''} checked={genres.indexOf(genre?.name ?? '') > -1 } onChange={handleGenreSelection} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label className="ml-2 text-sm font-medium text-gray-300 dark:text-gray-300">{ genre?.name } ({ genre?.count })</label>
                  </li>
              )
            }) }
          </ul>
        </div>

        <div className="p-8">
          <h3 className="bg-clip-text text-transparent bg-gradient-to-r font-extrabold mx-auto" style={{ backgroundImage: "linear-gradient(179.1deg, #FFFFFF 0.77%, rgba(255, 255, 255, 0) 182.09%)" }}>
            Cities
          </h3>
         </div>
        <div className="pl-8">
          <ul className="list-disc pl-5">
            { cityFacets.map((city, idx) => {
              return (
                <li className="flex items-center mb-4" key={idx}>
                    <input id={city?.name ?? ''} checked={cities.indexOf(city?.name ?? '') > -1 } onChange={handleCitySelection} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label className="ml-2 text-sm font-medium text-gray-300 dark:text-gray-300">{ city?.name } ({ city?.count })</label>
                  </li>
              )
            }) }
          </ul>
        </div>
    </div>
)
}