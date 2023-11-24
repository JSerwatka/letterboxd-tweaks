import { Show, createEffect, createResource, createSignal, on, onMount } from "solid-js";
import { onCleanup } from "solid-js";
import { waitForElement } from "@utils/element-observers";
import { render } from "solid-js/web";
import { Divider } from "@components/Divider";

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
export function SearchAutocomplete({
    searchFieldForm,
    searchActionButton
}: {
    searchFieldForm: HTMLElement;
    searchActionButton: HTMLAnchorElement | null | undefined;
}) {
    let timeoutId: NodeJS.Timeout | null = null;
    const [searchValue, setSearchValue] = createSignal<string | null>(null);
    const [isFieldFocused, setIsFieldFocused] = createSignal(false);
    const [data] = createResource(searchValue, fetchMovies);
    const searchInputField = searchFieldForm.querySelector("input#search-q") as HTMLElement | undefined;
    const searchIcon = searchFieldForm.querySelector("input[type='submit']") as HTMLElement | undefined;
    let searchAutocompleteRef: HTMLDivElement | undefined;

    const handleSearchFocus = () => {
        if (!searchInputField) return;

        searchInputField.style.backgroundColor = "#2c3440";
        searchFieldForm.style.width = "400px";
        setIsFieldFocused(true);
    };

    const handleEscapeClosesSearchBar = (event: KeyboardEvent) => {
        if (event.key === "Escape" && isFieldFocused()) {
            searchActionButton?.click();
            setIsFieldFocused(false);
        }
    };

    const handleMouseClickOutsideClosesSearchBar = (event: MouseEvent) => {
        const isWithinInputField = searchInputField?.contains(event.target as Node);
        const isWithinSearchResults = searchAutocompleteRef?.contains(event.target as Node);
        console.log({ isWithinInputField, isWithinSearchResults, isFieldFocused: isFieldFocused() });
        if (!isWithinInputField && !isWithinSearchResults && isFieldFocused()) {
            searchActionButton?.click();
            setIsFieldFocused(false);
        }
    };

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

    onMount(() => {
        searchInputField?.addEventListener("focus", handleSearchFocus);
        document?.addEventListener("keydown", handleEscapeClosesSearchBar);
        document?.addEventListener("mousedown", handleMouseClickOutsideClosesSearchBar);
    });

    onCleanup(() => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        if (!controller()?.signal.aborted) {
            controller()?.abort();
        }

        searchInputField?.removeEventListener("focus", handleSearchFocus);
        document.removeEventListener("keydown", handleEscapeClosesSearchBar);
        document.removeEventListener("mousedown", handleMouseClickOutsideClosesSearchBar);
    });

    createEffect(() => {
        console.log(data());
        console.log(searchAutocompleteRef);
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
        <Show when={true}>
            <div ref={searchAutocompleteRef}>
                {/* <Show when={!data.loading && searchValue()}> */}
                <div class="bg-[#2c3440] -mt-4 py-6 px-3 rounded-b-lg">
                    <div class="flex flex-row">
                        <img
                            src="https://a.ltrbxd.com/resized/sm/upload/78/y5/zg/ej/oefdD26aey8GPdx7Rm45PNncJdU-0-110-0-165-crop.jpg?v=2d0ce4be25"
                            class="w-1/2 object-contain"
                        />
                        <div class="flex flex-col">
                            <div>He has left us alone but shaft of line sometimes beaming through the curtains</div>
                            <div>1990</div>
                            <div>Ilya Hello, Melon Vaoru, Test Toajas</div>
                        </div>
                    </div>
                    <Divider />
                </div>
                {/* <div>{console.log(data())}</div> */}
                {/* <input id="search-q" type="text" placeholder="Search movies..." /> */}
                {/* {loading() && <div>Loading...</div>} */}
                {/* Render movies here */}
            </div>
        </Show>
    );
}

export async function renderSearch() {
    const searchFieldForm = (await waitForElement(document, "form#search")) as HTMLElement | null | undefined;
    // btn for closing and opening a search bar
    const searchActionButton = (await waitForElement(document, ".main-nav .js-nav-search-toggle > a")) as
        | HTMLAnchorElement
        | null
        | undefined;

    if (!searchFieldForm) return;

    return render(
        () => <SearchAutocomplete searchFieldForm={searchFieldForm} searchActionButton={searchActionButton} />,
        searchFieldForm
    );
}

// position: absolute;
// width: 298px;
// left: 50%;
// transform: translateX(-50%);
// background-color: #2c3440;
