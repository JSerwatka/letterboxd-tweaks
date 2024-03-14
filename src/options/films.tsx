import { FilmDataLarge, FilmDataSmall } from "@components/FilmData";
import { render } from "solid-js/web";
import { observeElement, waitForElement } from "@utils/element-observers";
import GenreBadge from "@components/GenreBadge";
import FilmBadge from "@components/FilmBadge";
import FilmReviewComments from "@components/FilmReviewComments";
import { Film } from "@utils/filmUtils";

// --- DESC: Shows better version of movie card + adds ratings ---
export const showFilmData = async () => {
    // TODO: What is this for????
    const filmListContainer = await waitForElement(document, "ul.poster-list");

    let styleElement = document.createElement("style");
    styleElement.innerHTML = `
        ul.poster-list.no-after::after {
            content: none !important;
        }
    `;
    document.head.appendChild(styleElement);
    filmListContainer?.classList?.add("no-after");

    observeElement(document, "[data-film-name]", async (element) => {
        const film = await Film.build(element as HTMLElement);

        // If no card type - it means changing styles is disabled for this film element
        if (!film.posterCardType) {
            return;
        }
        film.setExtraData();
        film.applyStylesToFilmPoster();
        if (film.posterCardType == "micro") {
            render(() => <FilmBadge score={film.score} isColorfulBadge={false} />, film.filmElement);
        }
        if (film.posterCardType == "small") {
            render(() => <FilmBadge score={film.score} isColorfulBadge={true} />, film.filmElement);
            render(() => <FilmDataSmall film={film} />, film.filmElement);
        }
        if (film.posterCardType == "large") {
            if (film.extraData.commentsLink && film.extraData.commentsLink.href) {
                render(
                    () => (
                        <FilmReviewComments
                            href={film.extraData.commentsLink!.href}
                            title={film.extraData.commentsLink!.dataset.originalTitle ?? "reviews"}
                        />
                    ),
                    film.filmElement
                );
            }
            render(() => <FilmBadge score={film.score} isColorfulBadge={true} />, film.filmElement);
            render(() => <FilmDataLarge film={film} />, film.filmElement);
        }
    });
};

// --- DESC: Hides service tab on films list ---
// WARNING: because there is no other selector, I have to doublecheck if the lable inside is "Service",
// which means that this code will no work if the page is translated
export async function hideService() {
    const serviceElement = await waitForElement(document, "div.sorting-selects > section.smenu-wrapper:nth-child(4)");
    const labelElement = serviceElement?.querySelector("label");

    if (labelElement?.textContent?.trim() === "Service") {
        serviceElement?.remove();
    }
}

// --- DESC: Shows duration and genre on top of film details page ---
export async function moveMovieDataToHeader() {
    const filmHeaderSection = await waitForElement(document, "#featured-film-header");

    const durationSection = await waitForElement(document, "p.text-footer");

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
            render(() => <GenreBadge genreName={genreName} />, filmHeaderSection);
        });
    }
}
