import { ContentBlock } from "@/generated";
import parse from 'html-react-parser';

type ContentAreaProps = {
    content: ContentBlock;
}

export default function ContentBlockFunc({ content } : ContentAreaProps) {

function getImageUrl(): string {
    return 'https://app-ocxcjonasbe57m7cprod.cms.optimizely.com/' + content.Image
}

return (
    <>
        <div className="p-8">
            <h3 className="text-gray-50 text-xl font-semibold">
                {content.Title}
            </h3>
            <p className="mt-3 sm:text-sm md:text-base">
            { parse(content.MainText ?? "") }
            </p>
        </div>
        <div className="pl-8">
            <img src={getImageUrl()} />
        </div>
    </>
)
}