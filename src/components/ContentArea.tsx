import { ContentAreaItemModel, Maybe } from "@/generated";
import SectionWrapper from "./Layout/SectionWrapper"

type ContentAreaProps = {
    contentItems: Array<Maybe<ContentAreaItemModel>>;
}

export default function ContentArea({ contentItems  } : ContentAreaProps) {

/*

                <div className="max-w-xl mx-auto text-center">
                    <h2 className="text-gray-50 text-3xl font-semibold sm:text-4xl">
                        Take your email marketing to the next level with Mailgo
                    </h2>
                    <p className="mt-3">
                        With Mailgo's powerful features, you can easily create and send beautiful emails that will engage your customers and drive more sales.
                    </p>
                </div>

*/


/*

                                    <div className="p-8">
                                        <h3 className="text-gray-50 text-xl font-semibold">
                                            {item?.__typename}
                                        </h3>
                                        <p className="mt-3 sm:text-sm md:text-base">
                                            {item.desc}
                                        </p>
                                    </div>
                                    <div className="pl-8">
                                        An image should be here
                                    </div>

*/

    return (
        <SectionWrapper>
            <div className="custom-screen text-gray-300">

                <div className="mt-12">
                    <ul className="space-y-8 gap-x-6 sm:flex sm:space-y-0">
                        {
                            contentItems.map((item, idx) => (
                                <li className="flex-1 flex flex-col justify-between border border-gray-800 rounded-2xl" key={idx}
                                    style={{
                                        background: "radial-gradient(141.61% 141.61% at 29.14% -11.49%, rgba(203, 213, 225, 0.15) 0%, rgba(203, 213, 225, 0) 57.72%)"
                                    }}
                                >

                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </SectionWrapper>
    )
}