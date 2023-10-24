import { Artist, Maybe, useArtistDetailsQuery } from "@/generated";
import { useState } from "react";
import SectionWrapper from "./Layout/SectionWrapper";
import LayoutEffect from "./Layout/LayoutEffect";
import GradientWrapper from "./Layout/GradientWrapper";


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
    <>
        <div className="custom-screen text-gray-300">
            <div className="mt-12">
                <ul className="grid grid-cols-3 gap-10">
                    {
                        items?.map((artist, idx) => {
                          return (
                              <li className="" key={idx} style={{ background: "radial-gradient(141.61% 141.61% at 29.14% -11.49%, rgba(203, 213, 225, 0.15) 0%, rgba(203, 213, 225, 0) 57.72%)"}}>
                                
                                  <div className="p-8">
                                    <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">{ artist?.Genre }</h2>
                                    <h3 className="text-gray-50 text-xl font-semibold">
                                      <button data-modal-target="defaultModal" data-modal-toggle="defaultModal" id={artist?.Artist_Name ?? ''} onClick={setArtistDetails} className="inline-flex items-center text-blue-400">
                                        {artist?.Artist_Name}
                                      </button>
                                    </h3>
                                    <p className="mt-3 sm:text-sm md:text-base">
                                    <GradientWrapper className="" wrapperClassName="h-[100px] top-12 inset-0 sm:h-[100px] lg:h-[100px]">{ artist?.Teaser_Text }</GradientWrapper>
                                    </p>
                                  </div>
                                  <div className="pl-8">
                                    <ul className="list-disc pl-5">
                                      { artist.Biggest_Hits?.map((hit, hitIdx) => {
                                        return (
                                          <li key={hitIdx}>{ hit }</li>
                                        )
                                      }) }
                                    </ul>
                                  </div>
                              </li>
                          )
                        })
                    }
                </ul>
            </div>
        </div>
      {
        showModal ? (
          <LayoutEffect className="duration-1000 delay-300"
                        isInviewState={{
                            trueState: "opacity-1",
                            falseState: "opacity-0"
                        }}
                    >
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
          </LayoutEffect>
        ) : null
      }
    </>
  );
}
