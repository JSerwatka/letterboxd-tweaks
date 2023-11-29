interface FilmDataProps {
    score?: string;
    title?: string;
    releaseYear?: string;
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
        <div class="text-white px-10 py-1 w-[200px] left-0 bottom-0 rounded-md text-lg ">
            <div class="line-clamp-3 text-lg leading-tigh mb-4" title={props.title}>{props.title}</div>
            <div class="text-gray-400">{props.releaseYear}</div>
        </div>
    );
};