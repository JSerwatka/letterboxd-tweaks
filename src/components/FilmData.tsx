interface FilmDataProps {
    score?: string;
    title?: string;
    releaseYear?: string;
    yourRating?: string | null;
}

export const FilmDataLarge = (props: FilmDataProps) => {
    return (
        <div class="text-white w-full rounded-md text-lg mt-4 flex flex-col h-20  justify-between">
            <div class="line-clamp-2 text-lg leading-tight" title={props.title}>{props.title}</div>
            <div>
                <div class="text-gray-400">{props.releaseYear}</div>
                {props.yourRating && <div title="your rating" class="rating -tiny -darker rated-9 mt-3">{props.yourRating}</div>}
            </div>
        </div>
    );
};

export const FilmDataSmall = (props: FilmDataProps) => {
    return (
        <div class="text-white px-8 w-[200px] left-0 bottom-0 rounded-md text-lg flex flex-col  justify-between">
            <div class="line-clamp-2 text-lg leading-tigh mt-2" title={props.title}>{props.title}</div>
            <div>
                <div class="text-gray-400">{props.releaseYear}</div>
                {props.yourRating && <div title="your rating" class="rating -tiny -darker rated-9 mt-3">{props.yourRating}</div>}
            </div>
        </div>
    );
};