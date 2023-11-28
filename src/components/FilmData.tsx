interface FilmDataProps {
    score?: string;
    title?: string;
    releaseYear?: string;
}

const FilmData = (props: FilmDataProps) => {
    return (
        <div class="absolute text-black h-1/4 bg-white/40 w-full left-0 bottom-0 z-10 rounded-lg backdrop-blur-[2px]	 text-lg">
            <div>{props.title}</div>
            <div>
                <span>{props.releaseYear}</span>
            </div>
        </div>
    );
};

export default FilmData;
