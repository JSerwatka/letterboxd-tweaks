interface FilmDataProps {
    score?: string;
    title?: string;
    releaseYear?: string;
}

const FilmData = (props: FilmDataProps) => {
    return (
        <div class="absolute text-black bg-white opacity-60 w-full left-0 top-0 z-10 text-lg">
            <div>{props.title}</div>
            <div> {props.releaseYear}</div>
            <div>{props.score}</div>
        </div>
    );
};

export default FilmData;
