import { createEffect, createResource, createSignal, on, onMount } from "solid-js";
import { onCleanup } from "solid-js";
import { waitForElement } from "@utils/element-observers";
import { render } from "solid-js/web";

interface MovieSearchResult {
    url: string;
    name: string;
    releaseYear: number;
    directors: string[];
    poster: string;
}

const [controller, setController] = createSignal<AbortController | null>(null);

async function fetchMovies(userInput: string | null): Promise<MovieSearchResult[] | undefined> {
    if (!userInput) {
        return;
    }

    // abort the previous request if it's still ongoing
    if (!controller()?.signal.aborted) {
        controller()?.abort();
    }

    setController(new AbortController());
    const signal = controller()?.signal;

    let response;

    try {
        response = await fetch(
            `https://letterboxd.com/s/autocompletefilm?q=${userInput}&limit=10&timestamp=1700657512497&adult=false`,
            { signal }
        );
    } catch (err) {
        // ignore abort error
        if (err instanceof Error && err.name !== "AbortError") {
        }
    }

    if (!response) {
        return;
    }

    const movieList = await response.json();

    return Promise.all(
        movieList.data.map(async (movie: any) => {
            const posterPageResponse = await fetch(`https://letterboxd.com/ajax/poster${movie.url}std/110x165/`, {
                signal
            });
            const posterPageText = await posterPageResponse.text();

            const parser = new DOMParser();
            const posterPageHTML = parser.parseFromString(posterPageText, "text/html");

            const posterImgElement = posterPageHTML.querySelector("img.image:not(.empty-poster-image)") as
                | HTMLImageElement
                | null
                | undefined;

            return {
                url: movie.url,
                name: movie.name,
                releaseYear: movie.releaseYear,
                directors: movie.directors,
                poster: posterImgElement?.src
            };
        })
    );
}

export function SearchAutocomplete({ searchFieldsContainer }: { searchFieldsContainer: Element }) {
    let timeoutId: NodeJS.Timeout | null = null;
    const [searchValue, setSearchValue] = createSignal<string | null>(null);
    const [data] = createResource(searchValue, fetchMovies);
    const searchInputField = searchFieldsContainer.querySelector("input#search-q");
    const searchIcon = searchFieldsContainer.querySelector("input[type='submit']") as HTMLElement | undefined;

    onMount(async () => {
        searchInputField?.addEventListener("keyup", async (event: Event) => {
            const searchField = event.target as HTMLInputElement;

            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            // timeout for request throttling
            timeoutId = setTimeout(() => setSearchValue(searchField.value), 200);
        });
    });

    onCleanup(() => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        if (!controller()?.signal.aborted) {
            controller()?.abort();
        }
    });

    createEffect(() => {
        console.log(data());
    });

    createEffect(() => {
        if (!searchIcon) return;

        if (data.loading) {
            searchIcon.style.background =
                "url(https://s.ltrbxd.com/static/img/spinner-light-2x.3653aae2.gif) no-repeat";
            searchIcon.style.backgroundPosition = "center";
            searchIcon.style.backgroundSize = "15px 15px";
        } else {
            searchIcon.style.background = "url(https://s.ltrbxd.com/static/img/sprite.91ec427c.svg) no-repeat";
            searchIcon.style.backgroundPosition = "-100px -170px";
            searchIcon.style.backgroundSize = "800px 1020px";
        }
    });

    return (
        <>
            <div>he</div>
            {/* <div>{console.log(data())}</div> */}
            {/* <input id="search-q" type="text" placeholder="Search movies..." /> */}
            {/* {loading() && <div>Loading...</div>} */}
            {/* Render movies here */}
        </>
    );
}

export async function renderSearch() {
    const searchFieldsContainer = await waitForElement(document, "form#search fieldset");

    if (!searchFieldsContainer) return;

    return render(() => <SearchAutocomplete searchFieldsContainer={searchFieldsContainer} />, document);
}
