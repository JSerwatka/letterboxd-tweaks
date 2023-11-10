interface FilmScoreProps {
    score: string;
}

const FilmScore = (props: FilmScoreProps) => {
    return <div class="absolute text-red-500 left-0 top-0 z-10 text-lg">{props.score}</div>;
};

export default FilmScore;
