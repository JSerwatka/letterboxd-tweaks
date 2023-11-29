interface FilmDataProps {
    score?: string;
    isColorfulBadge: boolean
}

function getScoreColor(score: FilmDataProps["score"]) {
    if (!score) return "bg-gray-400"

    const scoreNumber = Number(score)

    if (scoreNumber <= 2) {
        return 'bg-red-500/80';
    }
    if (scoreNumber >= 2 && scoreNumber < 3) {
        return 'bg-orange-600/80';
    }
    if (scoreNumber >= 3 && scoreNumber < 3.5) {
        return 'bg-yellow-500/80';
    }
    if (scoreNumber >= 3.5 && scoreNumber < 4) {
        return 'bg-[#b7dd29]/80';
    }
    if (scoreNumber >= 4) {
        return 'bg-green-500/80';
    }
    return "bg-gray-400/80"
}

const FilmBadge = ({ score, isColorfulBadge }: FilmDataProps) => {
    const scoreColor = isColorfulBadge ? getScoreColor(score) : "bg-gray-400/80";

    return (
        <div class={`absolute text-black flex flex-col items-center gap-1 p-2 min-w-[32px] right-0 top-0 rounded-tl-sm rounded-br-sm rounded-tr-lg rounded-bl-lg ${scoreColor}`}>
            {score ? Number(score).toFixed(1) : "?"}
        </div>
    );
    // return (
    //     <div class={`absolute text-black px-[4px] py-[2px] rounded-br-md top-0 ${scoreColor}`}>{score ?? "?"}</div>
    // );
}

export default FilmBadge;