import { Film, FriendData } from "@utils/filmUtils";

interface FilmDataProps {
    film: Film;
}

export const FilmDataLarge = ({ film }: FilmDataProps) => {
    const { title: filmTitle, releaseYear: filmReleaseYear, extraData: filmExtraData } = film;

    const cardHight = film.extraData.friendData ? "h-36" : "h-28";

    return (
        <div class={`text-gray-400 w-full rounded-md text-lg mt-4 flex flex-col justify-between ${cardHight}`}>
            <div class="line-clamp-2 text-lg leading-tight text-white" title={filmTitle}>
                {filmTitle}
            </div>
            <div>
                <div>{film.releaseYear}</div>
                {film.extraData.ratingElementClasses && (
                    <div class="flex flex-row justify-between items-end mt-3">
                        <div class="flex items-center">
                            {film.extraData.isLiked && (
                                <>
                                    <svg
                                        class="w-4 h-4 mr-1 pb-[1px] text-red-500/70"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 18"
                                    >
                                        <path d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z" />
                                    </svg>
                                </>
                            )}
                            <div title="rating" class={filmExtraData.ratingElementClasses}></div>
                        </div>
                        <div title="viewing date" class="text-sm">
                            {filmExtraData.dateOfView}
                        </div>
                    </div>
                )}
                {filmExtraData.friendData && (
                    <div class="text-sm mt-4 flex flex-row items-center">
                        <img
                            src={filmExtraData.friendData.avatarLink}
                            title={`${filmExtraData.friendData.name}'s profile picture`}
                            class="w-6 rounded-full inline mr-3"
                        />
                        <span>{filmExtraData.friendData.name}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export const FilmDataSmall = ({ film }: FilmDataProps) => {
    const { title: filmTitle, releaseYear: filmReleaseYear, extraData: filmExtraData } = film;

    return (
        <div class="text-white px-8 w-[200px] left-0 bottom-0 rounded-md text-lg flex flex-col  justify-between">
            <div class="line-clamp-2 text-lg leading-tigh mt-2" title={filmTitle}>
                {filmTitle}
            </div>
            <div>
                <div class="text-gray-400">{filmReleaseYear}</div>
                {filmExtraData.ratingElementClasses && (
                    <div title="your rating" class={filmExtraData.ratingElementClasses}></div>
                )}
            </div>
        </div>
    );
};
