import FilmData from "@components/FilmData";
import { render } from "solid-js/web";
import { observeElement } from "@utils/element-observers";

const getScore = async (film: HTMLElement) => {
    const filmContainer = film.parentElement;
    // It work only on movie database page
    let score = filmContainer?.dataset.averageRating;

    // For all other pages - watched, watchlist, list
    if (!score) {
        const filmSlug = film.dataset.filmSlug;
        if (!filmSlug) return;

        const parser = new DOMParser();
        const movieRatingUrl = `https://letterboxd.com/csi/film/${filmSlug}/rating-histogram/`;

        const ratingHistogramDom = await fetch(movieRatingUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`No score found`);
                }
                return response.text();
            })
            .catch((error) => {
                console.log(error);
                return;
            });
        if (!ratingHistogramDom) return;

        const htmlDocument = parser.parseFromString(ratingHistogramDom, "text/html");
        score = htmlDocument.querySelector(".average-rating > a.display-rating")?.textContent ?? undefined;
    }

    return score;
};

export const showFilmData = async () => {
    await observeElement(document, "[data-film-name]", async (element) => {
        const film = element as HTMLElement;
        const score = await getScore(film);

        const releaseYear = film.dataset.filmReleaseYear;
        const title = film.dataset.filmName;

        film.style.position = "relative";
        render(() => <FilmData title={title} releaseYear={releaseYear} score={score} />, film);
    });
};
