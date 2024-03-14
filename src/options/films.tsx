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
        film.setRatingClasses();
        film.applyStylesToFilmPoster();
        const viewingDataElement = film.filmElement.parentElement?.querySelector("p.poster-viewingdata");

        if (film.posterCardType == "small") {
            render(() => <FilmBadge score={film.score} isColorfulBadge={true} />, film.filmElement);
            render(
                () => (
                    <FilmDataSmall
                        title={film.title}
                        releaseYear={film.releaseYear}
                        yourRatingElementClasses={film.yourRatingElementClasses}
                    />
                ),
                film.filmElement
            );
        } else {
            // data only on large cards
            const dateOfView = viewingDataElement?.querySelector("time")?.textContent;
            const commentsLink = viewingDataElement?.querySelector("a.icon-review") as HTMLAnchorElement | undefined;
            const isLiked = viewingDataElement?.contains(viewingDataElement.querySelector(".icon-liked"));

            if (commentsLink && commentsLink.href) {
                render(
                    () => (
                        <FilmReviewComments
                            href={commentsLink.href}
                            title={commentsLink.dataset.originalTitle ?? "reviews"}
                        />
                    ),
                    film.filmElement
                );
            }

            render(() => <FilmBadge score={film.score} isColorfulBadge={true} />, film.filmElement);
            render(
                () => (
                    <FilmDataLarge
                        title={film.title}
                        releaseYear={film.releaseYear}
                        score={film.score}
                        yourRatingElementClasses={film.yourRatingElementClasses}
                        dateOfView={dateOfView}
                        isLiked={isLiked}
                    />
                ),
                film.filmElement
            );
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
