interface GenreBadgeProps {
    genreName: string;
}

const GenreBadge = ({ genreName }: GenreBadgeProps) => {
    return (
        <span class="inline-flex items-center rounded-md bg-red-50 mx-1 px-2 py-1 font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
            {genreName}
        </span>
    );
};

export default GenreBadge;