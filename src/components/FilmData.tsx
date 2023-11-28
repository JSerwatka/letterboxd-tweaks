interface FilmDataProps {
    score?: string;
    title?: string;
    releaseYear?: string;
}

const FilmData = (props: FilmDataProps) => {
    return (
        <div class="absolute text-black bg-white/40 w-full px-2 py-1 left-0 bottom-0 z-10 rounded-md backdrop-blur-[4px] text-lg">
            <div class="line-clamp-1" title={props.title}>{props.title}</div>
            <div class="text-sm leading-tight">{props.releaseYear}</div>
        </div>
    );
};

export default FilmData;
