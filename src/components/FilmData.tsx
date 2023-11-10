interface FilmDataProps {
    score?: string;
    title?: string;
    releaseYear?: string;
}

const FilmData = (props: FilmDataProps) => {
    return (
        <div class="absolute text-red-500 left-0 top-0 z-10 text-lg">
            {props.title} {props.releaseYear} {props.score}
        </div>
    );
};

export default FilmData;
