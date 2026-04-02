import HTMLParser from "html-react-parser";

export default function ServiceDescription({ description }: { description: string }) {
    const parsedDescription = HTMLParser(description);
    return (
        <div className="cms-content">
            {parsedDescription}
        </div>
    )
}