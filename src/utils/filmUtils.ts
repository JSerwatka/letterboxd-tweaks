import CSS from "csstype";

export type CardType = "large" | "small" | "micro";

export class Film {
    filmElement: HTMLElement;
    score: string | undefined;
    releaseYear: string | undefined;
    title: string | undefined;
    posterCardType: CardType | undefined;
    yourRatingElementClasses: string | undefined;

    constructor(filmElement: HTMLElement) {
        this.filmElement = filmElement;
        this.releaseYear = filmElement.dataset.filmReleaseYear;
        this.title = filmElement.dataset.filmName;
    }

    /**
        Used to init an object, to prevent using the object without film rating or card type set
     */
    static async build(filmElement: HTMLElement): Promise<Film> {
        const filmInstance = new Film(filmElement);
        await filmInstance.setFilmRating();
        filmInstance.setCardType();
        return filmInstance;
    }

    private async setFilmRating() {
        const filmContainer = this.filmElement.parentElement;
        // It works only on movie database page
        let score = filmContainer?.dataset.averageRating;
        if (score) {
            this.score = score;
            return;
        }

        // For all other pages - watched, watchlist, list
        const filmSlug = this.filmElement.dataset.filmSlug;
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

        this.score = score;
    }

    /**
     * Sets the card type for the film poster based on the container it is in.
     *
     * @throws {Error} If the card type could not be determined.
     */
    private setCardType() {
        const containerToCardTypeMap: Record<CardType, string[]> = {
            large: ["ul.-p150", "section.js-watchlist-main-content ul.-p125", "section#popular-films ul.-p230"],
            small: [
                "body.films-watched ul.-p70",
                "div.films-browser-list-container ul.-p70",
                "div.likes-page-content ul.-p70",
                "div.likes-page-content ul.-p70",
                "body.films-watched ul.-p70"
            ],
            micro: [
                "[data-object-name='review']",
                "body.list-page ul.-p70.film-details-list",
                "section#live-feed ul.-p70",
                "section#crew-picks-sidebar ul.-p70"
            ]
        };

        for (const [cardType, selectors] of Object.entries(containerToCardTypeMap)) {
            if (selectors.some((selector) => this.filmElement.closest(selector))) {
                this.posterCardType = cardType as CardType;
                break;
            }
        }

        if (!this.posterCardType) {
            throw Error("setCardType:: Card type could not be determined.");
        }
    }

    /**
     * Returns the styles for different elements of the film poster based on the card type.
     *
     * @returns An object containing the styles for the film container, anchor tag, overlay, overlay actions, image element, and blurred image element.
     * @throws {Error} - If the card type is not defined.
     */
    static getStylesByCard(cardType: CardType | undefined) {
        if (!cardType) {
            throw Error("getStylesByCard:: Card type is not defined");
        }

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
            // TODO implement
            default:
                break;
        }

        return { filmStyles, aTagStyles, overlayStyles, overlayActionsStyles, imgStyles, blurredImgStyles };
    }
    //

    /**
     * Sets yourRatingElementClasses property. These classes are used to build stars ui element (only for rated movies)
     */
    setRatingClasses() {
        const viewingDataElement = this.filmElement.parentElement?.querySelector("p.poster-viewingdata");
        const yourRatingElement = viewingDataElement?.querySelector("span.rating");
        this.yourRatingElementClasses = yourRatingElement
            ? Array.from(yourRatingElement.classList).join(" ")
            : undefined;

        // TODO: apply for production
        // viewingDataElement?.remove();
    }

    /**
     * Applies styles to the film poster.
     *
     * This method applies various styles to different elements of the film poster, such as the film container, the anchor tag, the overlay, the overlay actions, the image element, and a cloned blurred image element. The styles are determined based on the card type of the film poster.
     */
    applyStylesToFilmPoster() {
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
}
