import { FilmDataLarge, FilmDataSmall } from "@components/Film/FilmData";
import { render } from "solid-js/web";
import { observeElement, waitForElement } from "@utils/element-observers";
import { GenreBadgesList } from "@components/Film/GenreBadge";
import FilmBadge from "@components/Film/FilmBadge";
import { FilmReviewComments } from "@components/Film/FilmIcons";
import { Film } from "./filmsUtils";

// --- DESC: Shows better version of movie card + adds ratings ---
export const showFilmData = async () => {
    let specialCaseHandled = false;
    observeElement(document, "[data-film-name]", async (element) => {
        try {
            const film = await Film.build(element as HTMLElement);
            if (!film) return;

            // special cases should run only once, because they change containers
            if (!specialCaseHandled) {
                specialCaseHandled = film.handleSpecialCases() ?? false;
            }

            switch (film.posterCardType) {
                case "micro":
                    render(() => <FilmBadge rating={film.rating} isColorfulBadge={false} />, film.filmElement);
                    break;
                case "small":
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
                    render(() => <FilmBadge rating={film.rating} isColorfulBadge={true} />, film.filmElement);
                    render(() => <FilmDataSmall film={film} />, film.filmElement);
                    break;
                case "large":
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
                    render(() => <FilmBadge rating={film.rating} isColorfulBadge={true} />, film.filmElement);
                    render(() => <FilmDataLarge film={film} />, film.filmElement);
                default:
                    break;
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    });
};

// --- DESC: Hides service tab on films list ---
// WARNING: because there is no other selector, I have to use label with text "Service",
// which means that this code will no work if the page is translated
export async function hideService() {
    const sortingNavElement = await waitForElement(document, "div.sorting-selects");

    sortingNavElement?.querySelectorAll("label").forEach((sortingElement) => {
        if (sortingElement.textContent?.trim() === "Service") {
            sortingElement.remove();
        }
    });
}

// --- DESC: Shows duration and genre on top of film details page ---
export async function moveMovieDataToHeader() {
    const filmHeaderSection = await waitForElement(document, "section.film-header-group");

    const durationSection = await waitForElement(document, "p.text-footer");
    if (durationSection && durationSection.contains(durationSection.querySelector("[data-track-action='TMDB']"))) {
        const durationSectionText = durationSection?.textContent?.trim();
        const minutesFilmDuration = durationSectionText?.match(/^\d+/)?.map(Number)?.at(0);

        if (!minutesFilmDuration) return;

        const formattedFilmDuration = `${Math.floor(minutesFilmDuration / 60)}h ${minutesFilmDuration % 60}min`;

        const p = document.createElement("p");
        p.style.marginRight = "5px";
        p.style.marginBottom = "10px";
        p.style.display = "block";
        p.textContent = formattedFilmDuration;
        filmHeaderSection?.appendChild(p);
    }

    const genreSection = (await waitForElement(document, "#tab-genres a[href*='/films/genre']"))?.parentElement;
    if (genreSection) {
        const genreLinks = Array.from(genreSection.children);
        const genreNames = genreLinks.map((genreLink) => genreLink?.textContent);

        if (!filmHeaderSection) return;

        render(() => <GenreBadgesList genres={genreNames} />, filmHeaderSection);
    }
}
