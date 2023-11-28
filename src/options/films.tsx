import FilmData from "@components/FilmData";
import { render } from "solid-js/web";
import { observeElement, waitForElement } from "@utils/element-observers";
import GenreBadge from "@components/GenreBadge";
import FilmBadge from "@components/FilmBadge";

const getScore = async (film: HTMLElement) => {
    const filmContainer = film.parentElement;
    // It works only on movie database page
    let score = filmContainer?.dataset.averageRating;
    if (score) return score;

    // For all other pages - watched, watchlist, list
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

    return score;
};

export const showFilmData = async () => {
    await observeElement(document, "[data-film-name]", async (element) => {
        const film = element as HTMLElement;
        const score = await getScore(film);

        const releaseYear = film.dataset.filmReleaseYear;
        const title = film.dataset.filmName;
        
        film.style.position = "relative";

        // const actionMenu = film.querySelector(".overlay-actions") as HTMLElement;
        // actionMenu.style.display = "block !important";
        // actionMenu.style.margin = "0";
        // actionMenu.style.width  = "100%";
        // actionMenu.style.left = "0px";
        // actionMenu.style.bottom = "0px"; 

        render(() => <FilmBadge score={score} />, film)
        render(() => <FilmData title={title} releaseYear={releaseYear} score={score} />, film);
    });
};

// WARNING: because there is no other selector, I have to doublecheck if the lable inside is "Service", 
// which means that this code will no work if the page is translated
export async function hideService() {
    const serviceElement = await waitForElement(document, "div.sorting-selects > section.smenu-wrapper:nth-child(4)")
    const labelElement = serviceElement?.querySelector("label");

    if (labelElement?.textContent?.trim() === "Service") {
        serviceElement?.remove();
    }
    
}

export async function moveMovieDataToHeader() {
    const filmHeaderSection = await waitForElement(document, "#featured-film-header");
    
    const durationSection = (await waitForElement(document, "p.text-footer"));

    if (durationSection && durationSection.contains(durationSection.querySelector("[data-track-action='TMDb']"))) {
        const durationSectionText = durationSection?.textContent?.trim();
        const minutesFilmDuration = durationSectionText?.match(/^\d+/)?.map(Number)?.at(0);

        if (!minutesFilmDuration) return;

        const formattedFilmDuration = `${Math.floor(minutesFilmDuration / 60)}h ${minutesFilmDuration % 60}min`;

        const p = document.createElement("p");
        p.style.marginRight = "5px";
        p.style.display = "block";
        p.textContent = formattedFilmDuration;
        filmHeaderSection?.appendChild(p);
    }



    const genreSection = (await waitForElement(document, "#tab-genres a[href*='/films/genre']"))?.parentElement;

    if (genreSection) {
        const genreLinks = Array.from(genreSection.children);
        const genreNames = genreLinks.map((genreLink) => genreLink?.textContent);

        genreNames.forEach((genreName) => {
            if(!genreName || !filmHeaderSection) return;
            render(() => <GenreBadge genreName={genreName} />, filmHeaderSection)
        })
    }
}