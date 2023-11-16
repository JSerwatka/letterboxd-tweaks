// Account Filters - if both of them are switched on, also remove divider-line class from element with .divider-line and .js-account-filters classes (li element)
// Fade watched movies: (li.js-account-filters > label.js-fade-toggle).parent().remove()
// Show custom posters:  (li.js-account-filters > label.js-custom-poster-toggle).parent().remove()

// Film activity filters (2 links)
// Hide watched movies: All(li.js-film-filter + data-category="watched").remove()
// Show/hide reviewed films: All(li.js-film-filter + data-category="reviewed").remove()
// Show/hide rewatched films: All(li.js-film-filter + data-category="rewatched").remove()
// Show/hide logged films: All(li.js-film-filter + data-category="logged").remove()
// Show/hide rated films: All(li.js-film-filter + data-category="rated").remove()
// show/hide films in watchlist: All(li.js-film-filter + data-category="watchlisted").remove()

// Content filters
// Hide documentaries: (li.js-film-filter + data-category="docs").remove()
// Hide unreleased titles: (li.js-film-filter + data-category="unreleased").remove()

const AccountFilters = { 
    "Fade watched movies": "li.js-account-filters > label.js-fade-toggle",
    "Show custom posters": "li.js-account-filters > label.js-custom-poster-toggle",
}

const FilmFilters = {
    "Show/hide watched movies": "li.js-film-filter[data-category='watched']",
    "Show/hide reviewed films": "li.js-film-filter[data-category='reviewed']",
    "Show/hide rewatched films": "li.js-film-filter[data-category='rewatched']",
    "Show/hide logged films": "li.js-film-filter[data-category='logged']",
    "Show/hide rated films": "li.js-film-filter[data-category='rated']",
    "Show/hide films in watchlist": "li.js-film-filter[data-category='watchlisted']",
}

const ContentFilters = {
    "Hide documentaries": "li.js-film-filter[data-category='docs']",
    "Hide unreleased titles": "li.js-film-filter[data-category='unreleased']",
}


