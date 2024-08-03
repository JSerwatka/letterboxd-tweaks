import CSS from "csstype";

export type CardType = "large" | "small" | "micro";

export interface FriendData {
    name: string;
    avatarLink: string;
}

interface ExtraFilmData {
    ratingElementClasses?: string;
    commentsLink?: HTMLAnchorElement;
    isLiked?: boolean;
    dateOfView?: string;
    friendData?: FriendData;
}

export class CardTypeNotDefinedError extends Error {
    constructor(location: string) {
        super(`${location}::  Card type is not defined`);
        this.name = "CardTypeNotDefinedError";
    }
}

export class Film {
    filmElement: HTMLElement;
    rating: string | undefined;
    releaseYear: string | undefined;
    title: string | undefined;
    posterCardType: CardType | undefined;
    extraData: ExtraFilmData;

    constructor(filmElement: HTMLElement) {
        this.filmElement = filmElement;
        this.releaseYear = filmElement.dataset.filmReleaseYear;
        this.title = filmElement.dataset.filmName;
        this.extraData = {};
    }

    /**
     *  Used to init an object, to prevent using the object without film rating or card type set
     * @throws {Error} If the card type could not be determined.
     */
    static async build(filmElement: HTMLElement): Promise<Film | undefined> {
        const filmInstance = new Film(filmElement);
        filmInstance.setCardType();

        // If no card type - it means changing styles is disabled for this film element
        if (!filmInstance.posterCardType) {
            return;
        }

        await filmInstance.setFilmRating();
        filmInstance.setExtraData();
        filmInstance.applyStylesToFilmPoster();

        return filmInstance;
    }

    /**
     * Sets the card type for the film poster based on the container it is in.
     *
     * @throws {Error} If the card type could not be determined.
     */
    private setCardType() {
        const containerToCardTypeMap: Record<CardType, string[]> = {
            large: [
                "ul.-p150:not(.-overlapped)",
                "body.list-page ul.js-list-entries.-p125",
                "section.js-watchlist-main-content ul.-p125",
                "section#popular-films ul.-p230",
                "body.similar-films ul.-p125",
                "body.similar-films section.poster-list.-p230",
                "body.filmography-page ul.-p125"
            ],
            small: [
                "body.films-watched ul.-p70",
                "div#films-browser-list-container ul.-p70",
                "div.likes-page-content ul.-p70:not(.-overlapped)"
            ],
            micro: [
                "[data-object-name='review']",
                "body.list-page ul.-p70.film-details-list",
                "section#live-feed ul.-p70",
                "section#crew-picks-sidebar ul.-p70",
                "body.search-results ul.results > li > div.film-poster"
            ]
        };

        for (const [cardType, selectors] of Object.entries(containerToCardTypeMap)) {
            if (selectors.some((selector) => this.filmElement.closest(selector))) {
                this.posterCardType = cardType as CardType;
                return;
            }
        }
    }

    private async setFilmRating() {
        const filmContainer = this.filmElement.parentElement;
        // It works only on movie database page
        let rating = filmContainer?.dataset.averageRating;
        if (rating) {
            this.rating = rating;
            return;
        }

        // For all other pages - watched, watchlist, list
        const filmSlug = this.filmElement.dataset.filmSlug;
        rating = await fetchFilmRating(filmSlug);

        this.rating = rating;
    }

    /**
     * Returns the styles for different elements of the film poster based on the card type.
     *
     * @returns An object containing the styles for the film container, anchor tag, overlay, overlay actions, image element, and blurred image element.
     * @throws {Error} - If the card type is not defined.
     */
    static getStylesByCard(cardType: CardType) {
        if (!cardType) {
            throw new CardTypeNotDefinedError("getStylesByCard");
        }

        let filmStyles: CSS.Properties = {
            position: "relative",
            boxShadow: "none",
            borderRadius: "8px",
            background: "#7eb4f121",
            backdropFilter: "blur(10px)",
            overflow: "hidden"
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

        switch (cardType) {
            case "large":
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
                break;
            case "small":
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
                break;
            case "micro":
                filmStyles = {
                    ...filmStyles,
                    padding: "0px"
                };

                blurredImgStyles = {
                    ...blurredImgStyles,
                    top: "0",
                    left: "0"
                };
            default:
                break;
        }

        return { filmStyles, aTagStyles, overlayStyles, overlayActionsStyles, imgStyles, blurredImgStyles };
    }

    setExtraData() {
        const viewingDataElement = this.filmElement.parentElement?.querySelector("p.poster-viewingdata");

        const ratingElement = viewingDataElement?.querySelector("span.rating");
        const ratingElementClasses = ratingElement ? Array.from(ratingElement.classList).join(" ") : undefined;

        const commentsLink = viewingDataElement?.querySelector("a.icon-review") as HTMLAnchorElement | undefined;
        const isLiked = viewingDataElement?.contains(viewingDataElement.querySelector(".icon-liked"));
        const dateOfView = viewingDataElement?.querySelector("time")?.textContent ?? undefined;

        const friendElement = this.filmElement.querySelector("div.js-poster-attribution");
        const friendAvatarLink = (friendElement?.querySelector(".avatar > img") as HTMLImageElement | undefined)?.src;
        const friendName = friendElement?.querySelector(".name > a")?.textContent ?? undefined;

        let friendData: FriendData | undefined;
        if (friendAvatarLink && friendName) {
            friendElement?.remove();
            friendData = {
                name: friendName,
                avatarLink: friendAvatarLink
            };
        }

        this.extraData = {
            ratingElementClasses,
            commentsLink,
            isLiked,
            dateOfView,
            friendData
        };

        viewingDataElement?.remove();
    }

    /**
     * Applies styles to the film poster.
     *
     * This method applies various styles to different elements of the film poster, such as the film container, the anchor tag, the overlay, the overlay actions, the image element, and a cloned blurred image element. The styles are determined based on the card type of the film poster.
     * @throws {Error} - If the card type is not defined.
     */
    applyStylesToFilmPoster() {
        if (!this.posterCardType) {
            throw new CardTypeNotDefinedError("applyStylesToFilmPoster");
        }
        const aTag = this.filmElement.querySelector("a.frame") as HTMLElement;
        const overlay = this.filmElement.querySelector("span.overlay") as HTMLElement;
        const overlayActions = this.filmElement.querySelector("span.overlay-actions") as HTMLElement;
        const imgElement = this.filmElement.querySelector("img.image") as HTMLElement;
        const clonedImg = imgElement.cloneNode(true) as HTMLElement;

        const { filmStyles, aTagStyles, overlayStyles, overlayActionsStyles, imgStyles, blurredImgStyles } =
            Film.getStylesByCard(this.posterCardType);

        Object.assign(this.filmElement.style, filmStyles);
        Object.assign(aTag.style, aTagStyles);
        Object.assign(overlay.style, overlayStyles);
        Object.assign(overlayActions.style, overlayActionsStyles);
        Object.assign(imgElement.style, imgStyles);
        Object.assign(clonedImg.style, blurredImgStyles);

        imgElement.after(clonedImg);
    }

    handleSpecialCases() {
        type SpecialCases = "POPULAR_THIS_WEEK" | "SMALL_GRID";
        const getSpecialCase = (): SpecialCases | undefined => {
            if (this.filmElement.closest("section#popular-films ul.-p230")) {
                return "POPULAR_THIS_WEEK";
            }

            const gridContainer = this.filmElement.closest("ul.poster-list.-p70.-grid");
            if (gridContainer && gridContainer.childElementCount > 3) {
                return "SMALL_GRID";
            }

            return;
        };

        switch (getSpecialCase()) {
            case "POPULAR_THIS_WEEK":
                const carouselMask = this.filmElement.closest("section#popular-films div.carousel-mask") as
                    | HTMLElement
                    | undefined;
                const posterList = this.filmElement.closest("section#popular-films ul.poster-list.-p230") as
                    | HTMLElement
                    | undefined;

                if (carouselMask && posterList) {
                    carouselMask.style.height = "465px";
                    posterList.style.height = "500px";
                }
                return true;
            case "SMALL_GRID":
                let styleElement = document.createElement("style");
                styleElement.innerHTML = `
                    ul.poster-list.no-after::after {
                        content: none !important;
                    }
                `;
                document.head.appendChild(styleElement);

                const gridContainer = this.filmElement.closest("ul.poster-list.-p70.-grid");
                gridContainer?.classList?.add("no-after");
                return true;
            default:
                break;
        }
    }
}

export async function fetchFilmRating(filmSlug?: string) {
    if (!filmSlug) return;

    const parser = new DOMParser();
    const movieRatingUrl = `https://letterboxd.com/csi/film/${filmSlug}/rating-histogram/`;

    const ratingHistogramDom = await fetch(movieRatingUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`No rating found`);
            }
            return response.text();
        })
        .catch((error) => {
            console.log(error);
            return;
        });
    if (!ratingHistogramDom) return;

    const htmlDocument = parser.parseFromString(ratingHistogramDom, "text/html");
    const rating = htmlDocument.querySelector(".average-rating > a.display-rating")?.textContent ?? undefined;

    return rating;
}
