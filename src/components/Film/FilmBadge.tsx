interface FilmBadgeProps {
    rating?: string;
    isColorfulBadge: boolean;
}

function getRatingColor(rating: FilmBadgeProps["rating"]) {
    if (!rating) return "bg-gray-400";

    const ratingNumber = Number(rating);

    if (ratingNumber <= 2) {
        return "bg-red-500/80";
    }
    if (ratingNumber >= 2 && ratingNumber < 3) {
        return "bg-orange-600/80";
    }
    if (ratingNumber >= 3 && ratingNumber < 3.5) {
        return "bg-yellow-500/80";
    }
    if (ratingNumber >= 3.5 && ratingNumber < 4) {
        return "bg-[#b7dd29]/80";
    }
    if (ratingNumber >= 4) {
        return "bg-green-500/80";
    }
    return "bg-gray-400/80";
}

const FilmBadge = ({ rating, isColorfulBadge }: FilmBadgeProps) => {
    const ratingColor = isColorfulBadge ? getRatingColor(rating) : "bg-gray-400/80";

    return (
        <div
            class={`css-film-badge absolute text-black flex flex-col items-center text-base gap-1 p-2 min-w-[32px] right-0 top-0 rounded-tl-sm rounded-br-sm rounded-tr-lg rounded-bl-lg ${ratingColor}`}
        >
            {rating ? Number(rating).toFixed(1) : "?"}
        </div>
    );
};

export default FilmBadge;
