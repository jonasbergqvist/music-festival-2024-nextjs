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
          <>
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
                
                <button data-modal-target="defaultModal" data-modal-toggle="defaultModal" id={artist?.Artist_Name ?? ''} onClick={setArtistDetails} className="inline-flex items-center text-blue-600 hover:underline">
                  Read more about { artist?.Artist_Name }
                </button>
            </div>
            {showModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-3xl font-semibold">
                        { data?.Artist?.items![0]?.Artist_Name }
                      </h3>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                      <p className="my-4 text-slate-500 text-lg leading-relaxed">
                        {data?.Artist?.items![0]?.Description}
                      </p>
                      <p className="my-4 text-slate-800 text-lg leading-relaxed">
                        From: {data?.Artist?.items![0]?.City_Name}
                      </p>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
          </>
        )
      })
    }
    </div>
  );
}
