import LandingContent from "@/components/LandingContent";
import ContentArea from "@/components/ContentArea";
import { ContentAreaItemModel, LandingPage, Maybe, useLandingQuery } from "@/generated";

export default function Home() {

  const { data } = useLandingQuery({ variables: {

  }});
  
  return (
    <>
      <LandingContent contentItem={data?.LandingPage?.items[0] as LandingPage } />
      <ContentArea contentItems={ data?.LandingPage?.items[0]?.MainContentArea as Array<Maybe<ContentAreaItemModel>> } />
    </>
  );
}