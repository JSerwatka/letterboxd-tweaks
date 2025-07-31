![logo-128](https://github.com/user-attachments/assets/24db487d-5e4f-47d3-b769-481f71a59c7e)

# Letterboxd Tweaks
<a href="https://www.buymeacoffee.com/jserwatka" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 50px !important;width: auto !important;" ></a>

## Description
This Chrome extension/Firefox add-on enhances the Letterboxd website with cleaner movie cards, a more efficient search bar featuring instant movie suggestions, and an improved user interface that hides unnecessary filters, navbar items, and sort options, along with other quality of life improvements.

## Main features
- New film cards
  
  <img src="https://github.com/user-attachments/assets/04d91a6c-6d90-4167-89e9-a60d8ad285e8" height="350" />

- Better film page

  <img src="https://github.com/user-attachments/assets/631c1e99-bd07-4cfa-b554-3e7a7db8dfa1" height="350" />

- Improved search experience

  <img src="https://github.com/user-attachments/assets/abbef7b9-e992-46d1-b09b-90b43d98c323" height="400" />

- Hide useless filters, sort options and nav items
  ![image](https://github.com/JSerwatka/letterboxd-tweaks/assets/33938646/11f3eedd-c79c-4be6-bc63-970cb09237b2)

## Future Improvements
- Display the cast member's image when hovering over their name. (https://github.com/JSerwatka/letterboxd-tweaks/issues/25)
- Automatically add a movie to the diary after rating it. (https://github.com/JSerwatka/letterboxd-tweaks/issues/26)
- Show an indicator if a movie is already in the watchlist. (https://github.com/JSerwatka/letterboxd-tweaks/issues/27)
- Allow removing a movie from a list directly from the movie component. (https://github.com/JSerwatka/letterboxd-tweaks/issues/28)
- Add keyboard shortcuts for search and make it a command component. (https://github.com/JSerwatka/letterboxd-tweaks/issues/29)

If you have ideas for further improvements, please email them to jserwatka.dev@gmail.com or create an issue on this repository.

# Getting Started
1. Check if your `Node.js` version is >= **14**
2. Clone this repo and `cd` into it
   ```shell
   git clone https://github.com/JSerwatka/letterboxd-tweaks.git
   cd letterboxd-tweaks
   ```
3. Install the dependencies
   ```shell
   npm i
   ```
4. Build the project in dev mode

   ```shell
   npm run dev
   ```

5. Enable `Developer mode` in your `Manage Extensions` tab
6. Click `Load unpacked`, and select `letterboxd-tweaks/build` folder

  
# Build with

- Chrome Extension with Vite template from [create-chrome-ext](https://github.com/guocaoyi/create-chrome-ext)

- SolidJS
