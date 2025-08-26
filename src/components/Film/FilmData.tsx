import { Film } from "@options/films/filmsUtils";
import { HeartIcon } from "./FilmIcons";

interface FilmDataProps {
    film: Film;
}

export const FilmDataLarge = ({ film }: FilmDataProps) => {
    const { title: filmTitle, releaseYear: filmReleaseYear, extraData: filmExtraData } = film;

    const cardHight = film.extraData.friendData ? "h-36" : "h-28";

    return (
        <div
            class={`css-film-data-large text-gray-400 w-full rounded-md text-lg mt-4 flex flex-col justify-between ${cardHight}`}
        >
            <div class="line-clamp-2 text-lg leading-tight max-w-[126px] text-white" title={filmTitle}>
                {filmTitle}
            </div>
            <div>
                <div>{film.releaseYear}</div>
                <div
                    class="flex flex-row justify-between items-end mt-3"
                    classList={{
                        "justify-between": Boolean(film.extraData.ratingElementClasses),
                        "justify-end": !Boolean(film.extraData.ratingElementClasses)
                    }}
                >
                    {film.extraData.ratingElementClasses && (
                        <div class="flex items-center">
                            {film.extraData.isLiked && (
                                <div class="m-1">
                                    <HeartIcon />
                                </div>
                            )}
                            <div title="rating" class={filmExtraData.ratingElementClasses}></div>
                        </div>
                    )}
                    <div title="viewing date" class="text-sm">
                        {filmExtraData.dateOfView}
                    </div>
                </div>

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
                {film.extraData.ratingElementClasses && (
                    <div class="flex items-center">
                        {film.extraData.isLiked && (
                            <div class="mr-1">
                                <HeartIcon />
                            </div>
                        )}
                        <div title="rating" class={filmExtraData.ratingElementClasses?.replace(/-micro\b/, "")}></div>
                    </div>
                )}
            </div>
        </div>
    );
};
