import { Ranking } from "@/generated"
import { Dispatch, SetStateAction } from "react"

type SearchboxProps = {
  searchBox: string
  ranking: Ranking
  setRanking: Dispatch<SetStateAction<Ranking>>
  setGenres: Dispatch<SetStateAction<Array<string>>>
  setSearchBox: Dispatch<SetStateAction<string>>
  setSearchPhrase: Dispatch<SetStateAction<string>>
}

export function Searchbox({ searchBox, ranking, setRanking, setGenres, setSearchBox, setSearchPhrase }:SearchboxProps) {
  const handleRankingSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.value === Ranking.Semantic) {
      setRanking(Ranking.Semantic);
    }
    else {
      setRanking(Ranking.Relevance);
    }
  };

  const handleSearchClick = (event: any) => {
      setGenres(new Array<string>())
      setSearchPhrase(searchBox)
  };

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGenres(new Array<string>())
    setSearchBox(event.target.value);
  };

  const handleSearchboxKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setGenres(new Array<string>())
      setSearchPhrase(searchBox)  
    }
  };

  return (
    <div className="relative z-20 flex flex-col justify-center h-full px-3 mx-auto flex-center">
      <div className="relative flex items-center w-full pl-1 lg:max-w-68 sm:pr-2 sm:ml-0">
          <div className="relative flex items-center w-full h-full lg:w-64 group">
              <input type="text" value={searchBox} onChange={handleSearchInput} onKeyDown={handleSearchboxKeyDown} className="block w-full py-1.5 pl-10 pr-4 leading-normal rounded-2xl focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 ring-opacity-90 bg-gray-100 dark:bg-gray-800 text-gray-400 aa-input" placeholder="Search"/>
              <button type="submit" onClick={handleSearchClick} className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-blue-500 focus:outline-none">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
                <span className="sr-only">Search</span>
              </button>
          </div>
          <div className="flex items-center pl-4 rounded dark:border-gray-700">
            <input id="bordered-radio-1" type="radio" checked={ranking === Ranking.Relevance} onChange={handleRankingSelection} value="RELEVANCE" name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label id="Relevance" className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default</label>
          </div>
          <div className="flex items-center pl-4 rounded dark:border-gray-700">
            <input id="bordered-radio-2" type="radio" checked={ranking === Ranking.Semantic} onChange={handleRankingSelection} value="SEMANTIC" name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label id="Semantic" className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Semantic</label>
          </div>
      </div>
    </div>
  );
}