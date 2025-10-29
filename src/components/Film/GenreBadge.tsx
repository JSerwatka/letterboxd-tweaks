import { For } from "solid-js/web";

interface GenreBadgeProps {
    genreName: string;
}

interface GenreBadgesList {
    genres: (string | null)[];
}

export const GenreBadgesList = ({ genres }: GenreBadgesList) => {
    return (
        <div class="flex flex-row gap-1">
            {genres.map((genre) => {
                if (!genre) return null;
                return <GenreBadge genreName={genre} />;
            })}
        </div>
    );
};

const GenreBadge = ({ genreName }: GenreBadgeProps) => {
    return (
        <span
            style={{
                "box-shadow": "inset 0 1px rgba(255, 255, 255, .05)"
            }}
            class="text-[12px] rounded-[3px] bg-[#283038] px-[6px] py-[3px] text-[#99aabb] space-x-4 "
        >
            {genreName}
        </span>
    );
};
