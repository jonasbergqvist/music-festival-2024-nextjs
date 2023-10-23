import GradientWrapper from "./Layout/GradientWrapper"
import NavLink from "./Layout/NavLink"
import LayoutEffect from "./Layout/LayoutEffect"
import { useLandingQuery } from "@/generated";
import SectionWrapper from "./Layout/SectionWrapper";
import ContentBlock from "./ContentBlock";

export default function LandingContent() {
    const { data } = useLandingQuery({ variables: {

      }});

    if(data?.LandingPage?.items) {
        return (
            <section>
                <div className="custom-screen py-28">
                    <LayoutEffect className="duration-1000 delay-300"
                        isInviewState={{
                            trueState: "opacity-1",
                            falseState: "opacity-0"
                        }}
                    >
                        <div>
                            <div className="space-y-5 max-w-3xl mx-auto text-center">
                                <h1 className="text-4xl bg-clip-text text-transparent bg-gradient-to-r font-extrabold mx-auto sm:text-6xl" style={{ backgroundImage: "linear-gradient(179.1deg, #FFFFFF 0.77%, rgba(255, 255, 255, 0) 182.09%)" }}>
                                    {data?.LandingPage?.items[0]?.Title }
                                </h1>
                                <p className="max-w-xl mx-auto text-gray-300">
                                {data?.LandingPage?.items[0]?.Subtitle }
                                </p>
                                <div className="flex justify-center font-medium text-sm">
                                    <NavLink
                                        href="/#pricing"
                                        className="flex items-center text-white bg-purple-600 hover:bg-purple-500 active:bg-purple-700 "
                                    >
                                        {data?.LandingPage?.items[0]?.BuyTicketBlock?.Heading }
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                        </svg>
                                    </NavLink>
                                </div>
                            </div>
                            <GradientWrapper className="mt-16 sm:mt-28" wrapperClassName="max-w-3xl h-[250px] top-12 inset-0 sm:h-[300px] lg:h-[650px]">
                                <img src={data?.LandingPage?.items[0]?.HeroImage ?? ""} />
                            </GradientWrapper>
                        </div>
                    </LayoutEffect>
                </div>
                <SectionWrapper>
                    <div className="custom-screen text-gray-300">

                        <div className="mt-12">
                            <ul className="space-y-8 gap-x-6 sm:flex sm:space-y-0">
                                {
                                    data?.LandingPage?.items[0]?.MainContentArea?.map((item, idx) => {
                                        if(item?.ContentLink?.Expanded?.__typename === "ContentBlock") {
                                            return (
                                                <li className="flex-1 flex flex-col justify-between border border-gray-800 rounded-2xl" key={idx} style={{ background: "radial-gradient(141.61% 141.61% at 29.14% -11.49%, rgba(203, 213, 225, 0.15) 0%, rgba(203, 213, 225, 0) 57.72%)"}}>
                                                    <ContentBlock content={item?.ContentLink?.Expanded} />
                                                </li>
                                            )
                                        }
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </SectionWrapper>
                <SectionWrapper>
                    <div className="custom-screen text-gray-300">

                        <div className="mt-12">
                            <ul className="space-y-8 gap-x-6 sm:flex sm:space-y-0">
                                {
                                    data?.LandingPage?.items[0]?.FooterContentArea?.map((item, idx) => {
                                        if(item?.ContentLink?.Expanded?.__typename === "ContentBlock") {
                                            return (
                                                <li className="flex-1 flex flex-col justify-between border border-gray-800 rounded-2xl" key={idx} style={{ background: "radial-gradient(141.61% 141.61% at 29.14% -11.49%, rgba(203, 213, 225, 0.15) 0%, rgba(203, 213, 225, 0) 57.72%)"}}>
                                                    <ContentBlock content={item?.ContentLink?.Expanded} />
                                                </li>
                                            )
                                        }
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </SectionWrapper>
            </section>
        )
    }
}