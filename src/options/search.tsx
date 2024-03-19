import { SearchAutoComplete } from "@components/SearchAutoComplete";
import { waitForElement } from "@utils/element-observers";
import { render } from "solid-js/web";

// changes search bar to show result while typing
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

    const navbar = (await waitForElement(document, "nav.main-nav")) as HTMLElement | null | undefined;

    // prevents navitems moving when search bar is opened
    if (navbar) {
        navbar.style.right = "110px";
    }

    // update styles before mounting the component to prevent delay
    Object.assign(searchInputField.style, {
        backgroundColor: "#2c3440",
        borderRadius: "20px",
        padding: "10px 20px"
    });
    Object.assign(searchFieldForm.style, {
        width: "400px"
    });

    return render(
        () => (
            <SearchAutoComplete
                searchFieldForm={searchFieldForm}
                searchInputField={searchInputField}
                searchActionButton={searchActionButton}
            />
        ),
        searchFieldForm
    );
}
