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
        <span class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
            {genreName}
        </span>
    );
};
