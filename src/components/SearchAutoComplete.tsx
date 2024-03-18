import { For, Show, createEffect, createResource, createSignal, on, onMount } from "solid-js";
import { onCleanup } from "solid-js";
import { Divider } from "@components/Divider";
import { fetchFilmRating } from "@utils/filmUtils";
import FilmBadge from "./Film/FilmBadge";

interface FilmSearchResult {
    url: string;
    title: string;
    originalTitle: string | null;
    releaseYear: number;
    directors: string[];
    poster: string;
    rating?: string;
}

interface FilmSearchResponse
    extends Omit<FilmSearchResult, "directors" | "title" | "originalTitle" | "poster" | "rating"> {
    name: string;
    directors: Array<{ name: string }>;
    originalName: string | null;
}

const [controller, setController] = createSignal<AbortController | null>(null);

export function SearchAutoComplete({
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
    const [data] = createResource(searchValue, fetchFilms);
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
            const searchValue = searchField.value;
            const searchValueCleaned = searchValue.replace(/[^\w\s]/g, " ");

            // timeout for request throttling
            timeoutId = setTimeout(() => setSearchValue(searchValueCleaned), 200);
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

    // handle loading icon
    createEffect(() => {
        if (!searchIcon) return;

        if (data.loading) {
            searchIcon.style.background =
                "url(https://s.ltrbxd.com/static/img/spinner-light-2x.3653aae2.gif) no-repeat";
            searchIcon.style.backgroundPosition = "center";
            searchIcon.style.backgroundSize = "15px 15px";
            searchInputField.style.borderRadius = "20px";
            return;
        }

        searchIcon.style.background = "url(https://s.ltrbxd.com/static/img/sprite.91ec427c.svg) no-repeat";
        searchIcon.style.backgroundPosition = "-100px -170px";
        searchIcon.style.backgroundSize = "800px 1020px";
    });

    // handle search border when movies loaded
    createEffect(() => {
        const moviesFound = data();
        if (moviesFound?.length && moviesFound.length > 0) {
            searchInputField.style.borderRadius = "15px 15px 0px 0px";
        }
    });

    return (
        <Show when={!data.loading && searchValue()}>
            <style>{`
              /* Firefox */
              .searchbar-scrollbar {
                scrollbar-width: auto;
                scrollbar-color: #5f5f5f rgba(0, 0, 0, 0.1);
              }

              /* Chrome, Edge, and Safari */
              .searchbar-scrollbar::-webkit-scrollbar {
                width: 7px;
              }

              .searchbar-scrollbar::-webkit-scrollbar-track {
                background:  rgba(0, 0, 0, 0.1);
                border-radius: 10px;
              }

              .searchbar-scrollbar::-webkit-scrollbar-thumb {
                background-color: #5f5f5f;
                border-radius: 10px;
              }
           `}</style>
            <div
                class="bg-[#2c3440] py-6 rounded-b-lg max-h-[560px] overflow-auto searchbar-scrollbar"
                ref={searchAutocompleteRef}
            >
                <For each={data()}>
                    {(film) => (
                        <div class="hover:bg-[#4d5b70] px-3">
                            <a class="w-90% no-underline text-current hover:text-current" href={film.url}>
                                <div class="flex flex-row py-3 gap-5">
                                    <div class="min-w-[75px] w-[75px] h-[112px] min-h-[112px] relative">
                                        <img src={film.poster} class="w-full object-contain rounded-md" />
                                        <FilmBadge rating={film.rating} isColorfulBadge={true} />
                                    </div>
                                    <div class="flex flex-col justify-between">
                                        <div>
                                            <div
                                                class="text-lg text-white line-clamp-2"
                                                classList={{
                                                    "mb-1": !!film.originalTitle,
                                                    "mb-3": !film.originalTitle
                                                }}
                                                title={film.title}
                                            >
                                                {film.title}
                                            </div>
                                            {film.originalTitle && (
                                                <div
                                                    class="mb-3 italic text-gray-300 line-clamp-2"
                                                    title={film.originalTitle}
                                                >
                                                    {film.originalTitle}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <div class="mb-3 italic">{film.releaseYear}</div>
                                            <div class="">{film.directors.join(", ")}</div>
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

async function fetchFilms(userInput: string | null): Promise<FilmSearchResult[] | undefined> {
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

    // get basic data - url, name, directors, ...
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

    const filmList = await response.json();

    // get poster img and rating
    return Promise.all(
        filmList.data.map(async (film: FilmSearchResponse) => {
            const posterPageResponse = await fetch(`https://letterboxd.com/ajax/poster${film.url}std/110x165/`, {
                signal
            });

            const posterPageText = await posterPageResponse.text();

            const parser = new DOMParser();
            const posterPageHTML = parser.parseFromString(posterPageText, "text/html");
            const posterImgElement = posterPageHTML.querySelector("img.image:not(.empty-poster-image)") as
                | HTMLImageElement
                | null
                | undefined;

            const posterContainerElement = posterPageHTML.querySelector("div.film-poster") as HTMLElement | undefined;
            const slug = posterContainerElement?.dataset.filmSlug;
            const rating = await fetchFilmRating(slug);

            return {
                url: film.url,
                title: film.name,
                originalTitle: film.originalName,
                releaseYear: film.releaseYear,
                directors: film.directors.map((directorObject) => directorObject.name),
                poster: posterImgElement?.src,
                rating: rating
            };
        })
    );
}
