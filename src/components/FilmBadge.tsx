interface FilmDataProps {
    score?: string;
}

function getScoreColor(score: FilmDataProps["score"]) {
    if (!score) return "bg-gray-400"

    const scoreNumber = Number(score)

    if (scoreNumber <= 2) {
        return 'bg-red-500/90';
    }
    if (scoreNumber >= 2 && scoreNumber < 3) {
        return 'bg-orange-600/90';
    }
    if (scoreNumber >= 3 && scoreNumber < 3.5) {
        return 'bg-yellow-500/90';
    }
    if (scoreNumber >= 3.5 && scoreNumber < 4) {
        return 'bg-[#b7dd29]/90';
    }
    if (scoreNumber >= 4) {
        return 'bg-green-500/90';
    }
}

const FilmBadge = ({ score }: FilmDataProps) => {
    const scoreColor = getScoreColor(score);

    return (
        <div class={`absolute text-black px-[4px] py-[3px] rounded-br-md top-0 ${scoreColor}`}>{score ?? "?"}</div>
    );
}

export default FilmBadge;