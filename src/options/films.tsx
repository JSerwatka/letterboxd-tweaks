import FilmScore from '@components/FilmScore';
import { render } from 'solid-js/web';

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

        const htmlDocument = parser.parseFromString(ratingHistogramDom, 'text/html');
        score = htmlDocument.querySelector('.average-rating > a.display-rating')?.textContent ?? undefined;
    }

    return score;
};

export const showFilmsScore = () => {
    const films = document.querySelectorAll('[data-film-name]') as NodeListOf<HTMLElement>;

    if (films.length) {
        films.forEach(async (film) => {
            const score = await getScore(film);
            if (!score) return;

            film.style.position = 'relative';

            render(() => <FilmScore score={score} />, film);
        });
    }
};
