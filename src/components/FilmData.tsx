interface FilmDataProps {
    score?: string;
    title?: string;
    releaseYear?: string;
    yourRating?: string | null;
}

export const FilmDataLarge = (props: FilmDataProps) => {
    return (
        <div class="absolute text-black bg-white/40 w-full px-2 py-1 left-0 bottom-0 z-10 rounded-md backdrop-blur-[4px] text-lg">
            <div class="line-clamp-1" title={props.title}>{props.title}</div>
            <div class="text-sm leading-tight">{props.releaseYear}</div>
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