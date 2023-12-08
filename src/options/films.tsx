import { FilmDataLarge, FilmDataSmall } from "@components/FilmData";
import { render } from "solid-js/web";
import { observeElement, waitForElement } from "@utils/element-observers";
import GenreBadge from "@components/GenreBadge";
import FilmBadge from "@components/FilmBadge";
import FilmReviewComments from "@components/FilmReviewComments";
import CSS from "csstype";

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

type CardType = "small" | "large";

function getStylesByCard(cardType: CardType) {
    let filmStyles: CSS.Properties = {
        position: "relative",
        boxShadow: "none",
        borderRadius: "8px",
        background: "#7eb4f121",
        backdropFilter: "blur(10px)"
    };

    let aTagStyles: CSS.Properties = {
        boxShadow: "none",
        backgroundImage: "none"
    };

    let overlayStyles: CSS.Properties = {
        borderColor: "none",
        zIndex: "10",
        borderRadius: "8px",
        boxShadow: "none"
    };

    let overlayActionsStyles: CSS.Properties = {
        zIndex: "20"
    };

    let blurredImgStyles: CSS.Properties = {
        position: "absolute",
        filter: "blur(40px)",
        zIndex: "-10",
        borderRadius: "50%"
    };

    let imgStyles: CSS.Properties = {
        boxShadow: "0px 0px 7px 0px rgb(0 0 0 / 50%)",
        borderRadius: "6px"
    };

    if (cardType === "small") {
        filmStyles = {
            ...filmStyles,
            display: "flex",
            padding: "10px"
        };

        blurredImgStyles = {
            ...blurredImgStyles,
            width: "90px",
            top: "10px",
            left: "10px",
            transform: "translate(-15%, -15%)"
        };
    } else {
        filmStyles = {
            ...filmStyles,
            padding: "12px",
            height: "auto"
        };

        overlayStyles = {
            ...overlayStyles,
            display: "flex",
            width: "auto"
        };

        blurredImgStyles = {
            ...blurredImgStyles,
            top: "0",
            left: "0"
        };
    }

    return { filmStyles, aTagStyles, overlayStyles, overlayActionsStyles, imgStyles, blurredImgStyles };
}

export const showFilmData = async () => {
    // TODO: refactor
    const filmListContainer = await waitForElement(document, "ul.poster-list");
    let styleElement = document.createElement("style");
    styleElement.innerHTML = `
        ul.poster-list.no-after::after {
            content: none !important;
        }
    `;
    document.head.appendChild(styleElement);
    filmListContainer?.classList?.add("no-after");

    await observeElement(document, "[data-film-name]", async (element) => {
        const film = element as HTMLElement;
        const score = await getScore(film);

        const releaseYear = film.dataset.filmReleaseYear;
        const title = film.dataset.filmName;

        const viewingDataElement = film?.parentElement?.querySelector("p.poster-viewingdata");
        // classes are used to build stars ui element
        const yourRatingElement = viewingDataElement?.querySelector("span.rating");
        const yourRatingElementClasses = yourRatingElement ? Array.from(yourRatingElement.classList).join(" ") : null;

        // TODO: apply when finished
        // viewingDataElement?.remove();

        const cardType = "small" as CardType;

        const aTag = film.querySelector("a.frame") as HTMLElement;
        const overlay = film.querySelector("span.overlay") as HTMLElement;
        const overlayActions = film.querySelector("span.overlay-actions") as HTMLElement;
        const imgElement = film.querySelector("img.image") as HTMLElement;
        const clonedImg = imgElement.cloneNode(true) as HTMLElement;

        const { filmStyles, aTagStyles, overlayStyles, overlayActionsStyles, imgStyles, blurredImgStyles } =
            getStylesByCard(cardType);
        Object.assign(film.style, filmStyles);
        Object.assign(aTag.style, aTagStyles);
        Object.assign(overlay.style, overlayStyles);
        Object.assign(overlayActions.style, overlayActionsStyles);
        Object.assign(imgElement.style, imgStyles);
        Object.assign(clonedImg.style, blurredImgStyles);

        imgElement.after(clonedImg);

        if (cardType == "small") {
            render(() => <FilmBadge score={score} isColorfulBadge={true} />, film);
            render(
                () => (
                    <FilmDataSmall
                        title={title}
                        releaseYear={releaseYear}
                        yourRatingElementClasses={yourRatingElementClasses}
                    />
                ),
                film
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
                    film
                );
            }

            render(() => <FilmBadge score={score} isColorfulBadge={true} />, film);
            render(
                () => (
                    <FilmDataLarge
                        title={title}
                        releaseYear={releaseYear}
                        score={score}
                        yourRatingElementClasses={yourRatingElementClasses}
                        dateOfView={dateOfView}
                        isLiked={isLiked}
                    />
                ),
                film
            );
        }
    });
};

// WARNING: because there is no other selector, I have to doublecheck if the lable inside is "Service",
// which means that this code will no work if the page is translated
export async function hideService() {
    const serviceElement = await waitForElement(document, "div.sorting-selects > section.smenu-wrapper:nth-child(4)");
    const labelElement = serviceElement?.querySelector("label");

    if (labelElement?.textContent?.trim() === "Service") {
        serviceElement?.remove();
    }
}

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
