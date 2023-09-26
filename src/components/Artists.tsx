import { Artist, Maybe, useArtistDetailsQuery } from "@/generated";
import { useState } from "react";


type ItemsProps = {
  items: Array<Artist>
}

export function Artists({ items }: ItemsProps) {
  const [showModal, setShowModal] = useState(false);
  const [artistDetailName, setArtistDetailName] = useState(() => '');

  const { data } = useArtistDetailsQuery({ variables: {
    artistName: artistDetailName
  }});
  
  const setArtistDetails = (event: any) => {
    if(event?.target?.id) {
      setArtistDetailName(event?.target?.id)
      setShowModal(true)
    }
  }

  return (
    <div id="Items" className='grid grid-cols-3 gap-4'>
    {
      items?.map((artist, idx) => {
        return (
            <div key={idx} className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">{ artist?.Genre }</h2>
                
                <a href="#">
                    <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{ artist?.Artist_Name }</h5>
                </a>
                <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">{ artist?.Teaser_Text }</p>
                
                <p className="font-bold">Top hits</p>
                <div className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                  <ul className="list-disc pl-5">
                    { artist.Biggest_Hits?.map((hit, hitIdx) => {
                      return (
                        <li key={hitIdx}>{ hit }</li>
                      )
                    }) }
                  </ul>
                </div>
                {
                  showModal && data?.Artist?.items![0]?.Artist_Name === artist.Artist_Name ? 
                  <div>
                    <div className="p-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">{ data?.Artist?.items![0]?.Description }</div>
                    <div className="p-3">City: { data?.Artist?.items![0]?.City_Name }</div>
                  </div> :
                  <button data-modal-target="defaultModal" data-modal-toggle="defaultModal" id={artist?.Artist_Name ?? ''} onClick={setArtistDetails} className="inline-flex items-center text-blue-600 hover:underline">
                    Read more about { artist?.Artist_Name }
                  </button>
                }
            </div>
        )
      })
    }
    </div>
  );
}
