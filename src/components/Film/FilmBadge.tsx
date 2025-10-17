import { convertRatingTo10Scale } from "@options/films/filmsUtils";
import { isOptionEnabled } from "@utils/chrome-storage";
import { createSignal, onMount } from "solid-js";

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
    const [useScale10, setUseScale10] = createSignal(false);

    onMount(async () => {
        // Check if rating scale conversion is enabled
        const scaleEnabled = await isOptionEnabled("5520bd3a-d90b-4cbf-9fa7-84888f077751");
        setUseScale10(scaleEnabled);
    });
    // Always use original rating for color determination
    const ratingColor = isColorfulBadge ? getRatingColor(rating) : "bg-gray-400/80";

    const displayRating = () => {
        const scale10 = useScale10();
        return scale10 && rating ? convertRatingTo10Scale(rating) : rating;
    };
    return (
        <div
            class={`css-film-badge absolute text-black flex flex-col items-center text-base gap-1 p-2 min-w-[32px] right-0 top-0 rounded-tl-sm rounded-br-sm rounded-tr-lg rounded-bl-lg ${ratingColor}`}
        >
            {displayRating() ? Number(displayRating()).toFixed(1) : "?"}
        </div>
    );
};

export default FilmBadge;
