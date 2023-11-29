import { FilmDataLarge, FilmDataSmall } from "@components/FilmData";
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
    const filmListContainer = await waitForElement(document, "ul.poster-list");
    let styleElement = document.createElement('style');
    styleElement.innerHTML = `
        ul.poster-list.no-after::after {
            content: none !important;
        }

        .poster .blurred-img-overlay {
            width: 90px;
            position: absolute;
            top: 10px;
            left: 10px;
            transform: translate(-15%, -15%);
            filter: blur(40px);
            z-index: -10;
            border-radius: 50%;
        }
        .poster .blurred-img-overlay-large {
            position: absolute;
            top: 0;
            left: 0;
            filter: blur(40px);
            z-index: -10;
            border-radius: 50%;
        }
    `;
    document.head.appendChild(styleElement);
    filmListContainer?.classList?.add("no-after");
    await observeElement(document, "[data-film-name]", async (element) => {
        const film = element as HTMLElement;
        const score = await getScore(film);

        const releaseYear = film.dataset.filmReleaseYear;
        const title = film.dataset.filmName;

        film.style.position = "relative";
        const yourRatingElement = film?.parentElement?.querySelector("p.poster-viewingdata > span.rating");
        const yourRatingStars = yourRatingElement?.textContent;
        yourRatingElement?.remove();

        const isSmallCard = false;


        if (isSmallCard) {
            film.style.display = "flex";
            film.style.padding = "10px";
            film.style.boxShadow = "none";
            film.style.borderRadius = "8px";
            film.style.background = "#7eb4f121";
            film.style.backdropFilter = "blur(10px)"

            const aTag = film.querySelector("a.frame") as HTMLElement;
            aTag.style.boxShadow = "none";
            aTag.style.backgroundImage = "none";

            const overlay = film.querySelector("span.overlay") as HTMLElement;
            overlay.style.borderColor = "none";
            overlay.style.zIndex = "10";
            overlay.style.borderRadius = "8px";
            overlay.style.boxShadow = "none";

            const overlayActions = film.querySelector("span.overlay-actions") as HTMLElement;
            overlayActions.style.zIndex = "20";

            let imgElement = film.querySelector('img.image') as HTMLElement;
            if (imgElement) {
                imgElement.style.boxShadow = "0px 0px 7px 0px rgb(0 0 0 / 50%)"
                imgElement.style.borderRadius = "6px";

                let clonedImg = imgElement.cloneNode(true) as HTMLElement;
                clonedImg.classList.add("blurred-img-overlay")
                imgElement.after(clonedImg);
            }

            render(() => <FilmBadge score={score} isColorfulBadge={true} />, film)
            render(() => <FilmDataSmall title={title} releaseYear={releaseYear} yourRating={yourRatingStars} />, film);
        } else {
            film.style.padding = "12px";
            film.style.boxShadow = "none";
            film.style.borderRadius = "8px";
            film.style.background = "#7eb4f121";
            film.style.backdropFilter = "blur(10px)"
            film.style.height = "auto";

            const aTag = film.querySelector("a.frame") as HTMLElement;
            aTag.style.boxShadow = "none";
            aTag.style.backgroundImage = "none";

            const overlay = film.querySelector("span.overlay") as HTMLElement;
            overlay.style.borderColor = "none";
            overlay.style.zIndex = "10";
            overlay.style.borderRadius = "8px";
            overlay.style.boxShadow = "none";

            const overlayActions = film.querySelector("span.overlay-actions") as HTMLElement;
            overlayActions.style.zIndex = "20";

            let imgElement = film.querySelector('img.image') as HTMLElement;
            if (imgElement) {
                imgElement.style.boxShadow = "0px 0px 7px 0px rgb(0 0 0 / 50%)"
                imgElement.style.borderRadius = "6px";

                let clonedImg = imgElement.cloneNode(true) as HTMLElement;
                clonedImg.classList.add("blurred-img-overlay-large")
                imgElement.after(clonedImg);
            }

            render(() => <FilmBadge score={score} isColorfulBadge={true} />, film)
            render(() => <FilmDataLarge title={title} releaseYear={releaseYear} score={score} yourRating={yourRatingStars} />, film);
        }
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
            if (!genreName || !filmHeaderSection) return;
            render(() => <GenreBadge genreName={genreName} />, filmHeaderSection)
        })
    }
}