import { For, Show, createEffect, createResource, createSignal, on, onMount } from "solid-js";
import { onCleanup } from "solid-js";
import { waitForElement } from "@utils/element-observers";
import { render } from "solid-js/web";
import { Divider } from "@components/Divider";

interface MovieSearchResult {
    url: string;
    title: string;
    originalTitle: string | null;
    releaseYear: number;
    directors: string[];
    poster: string;
}

interface MovieSearchResponse extends Omit<MovieSearchResult, "directors" | "title" | "originalTitle"> {
    name: string;
    directors: Array<{ name: string }>;
    originalName: string | null;
}

const [controller, setController] = createSignal<AbortController | null>(null);

// TODO: refactor to component

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
        response = await fetch(`https://letterboxd.com/s/autocompletefilm?q=${userInput}&limit=10&adult=false`, {
            signal
        });
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
        movieList.data.map(async (movie: MovieSearchResponse) => {
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
                title: movie.name,
                originalTitle: movie.originalName,
                releaseYear: movie.releaseYear,
                directors: movie.directors.map((directorObject) => directorObject.name),
                poster: posterImgElement?.src
            };
        })
    );
}
export function SearchAutocomplete({
    searchFieldForm,
    searchActionButton,
    searchInputField
}: {
    searchFieldForm: HTMLElement;
    searchInputField: HTMLElement;
    searchActionButton: HTMLAnchorElement | null | undefined;
}) {
    let timeoutId: NodeJS.Timeout | null = null;
    const [searchValue, setSearchValue] = createSignal<string | null>(null);
    const [isFieldFocused, setIsFieldFocused] = createSignal(false);
    const [data] = createResource(searchValue, fetchMovies);
    const searchIcon = searchFieldForm.querySelector("input[type='submit']") as HTMLElement | undefined;
    let searchAutocompleteRef: HTMLDivElement | undefined;

    const handleSearchFocus = () => {
        setIsFieldFocused(true);
    };

    const handleEscapeClosesSearchBar = (event: KeyboardEvent) => {
        if (event.key === "Escape" && isFieldFocused()) {
            searchActionButton?.click();
            setIsFieldFocused(false);
        }
    };

    const handleMouseClickOutsideClosesSearchBar = (event: MouseEvent) => {
        const isWithinForm = searchFieldForm?.contains(event.target as Node);
        const isWithinSearchResults = searchAutocompleteRef?.contains(event.target as Node);

        if (!isWithinForm && !isWithinSearchResults && isFieldFocused()) {
            searchActionButton?.click();
            setIsFieldFocused(false);
        }
    };

    onMount(async () => {
        searchInputField.addEventListener("keyup", async (event: Event) => {
            const searchField = event.target as HTMLInputElement;

            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            // timeout for request throttling
            timeoutId = setTimeout(() => setSearchValue(searchField.value), 200);
        });
    });

    onMount(() => {
        searchInputField.addEventListener("focus", handleSearchFocus);
        document.addEventListener("keydown", handleEscapeClosesSearchBar);
        document.addEventListener("mousedown", handleMouseClickOutsideClosesSearchBar);
    });

    onCleanup(() => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        if (!controller()?.signal.aborted) {
            controller()?.abort();
        }

        searchInputField.removeEventListener("focus", handleSearchFocus);
        document.removeEventListener("keydown", handleEscapeClosesSearchBar);
        document.removeEventListener("mousedown", handleMouseClickOutsideClosesSearchBar);
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
        <Show when={!data.loading && searchValue()}>
            <style>{`
              /* Firefox */
              .scrollbar {
                scrollbar-width: auto;
                scrollbar-color: #73dd9c rgba(0, 0, 0, 0.1);
              }

              /* Chrome, Edge, and Safari */
              .scrollbar::-webkit-scrollbar {
                width: 7px;
              }

              .scrollbar::-webkit-scrollbar-track {
                background:  rgba(0, 0, 0, 0.1);
                border-radius: 10px;
              }

              .scrollbar::-webkit-scrollbar-thumb {
                background-color: #73dd9c;
                border-radius: 10px;
              }
           `}</style>
            <div
                class="bg-[#2c3440] py-6 rounded-b-lg max-h-[560px] overflow-auto scrollbar"
                ref={searchAutocompleteRef}
            >
                <For each={data()}>
                    {(movie) => (
                        <div class="hover:bg-[#4d5b70] px-3">
                            <a class="w-90% no-underline text-current hover:text-current" href={movie.url}>
                                <div class="flex flex-row py-3 gap-5">
                                    <div class="min-w-[75px] w-[75px] h-[112px] min-h-[112px]">
                                        <img src={movie.poster} class="w-full object-contain rounded-md" />
                                    </div>
                                    <div class="flex flex-col justify-between">
                                        <div>
                                            <div
                                                class="text-lg text-white line-clamp-2"
                                                classList={{
                                                    "mb-1": !!movie.originalTitle,
                                                    "mb-3": !movie.originalTitle
                                                }}
                                                title={movie.title}
                                            >
                                                {movie.title}
                                            </div>
                                            {movie.originalTitle && (
                                                <div
                                                    class="mb-3 italic text-gray-300 line-clamp-2"
                                                    title={movie.originalTitle}
                                                >
                                                    {movie.originalTitle}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <div class="mb-3 italic">{movie.releaseYear}</div>
                                            <div class="">{movie.directors.join(", ")}</div>
                                        </div>
                                    </div>
                                </div>
                                <Divider />
                            </a>
                        </div>
                    )}
                </For>
            </div>
        </Show>
    );
}

export async function renderSearch() {
    const searchFieldForm = (await waitForElement(document, "form#search")) as HTMLElement | null | undefined;
    if (!searchFieldForm) return;

    // btn for closing and opening a search bar
    const searchActionButton = (await waitForElement(document, ".main-nav .js-nav-search-toggle > a")) as
        | HTMLAnchorElement
        | null
        | undefined;

    const searchInputField = (await waitForElement(searchFieldForm, "input#search-q")) as HTMLElement | undefined;
    if (!searchInputField) return;

    // update styles before mounting the component to prevent delay
    searchInputField.style.backgroundColor = "#2c3440";
    searchFieldForm.style.width = "400px";
    searchInputField.style.borderRadius = "10px 10px 0 0";

    return render(
        () => (
            <SearchAutocomplete
                searchFieldForm={searchFieldForm}
                searchInputField={searchInputField}
                searchActionButton={searchActionButton}
            />
        ),
        searchFieldForm
    );
}
