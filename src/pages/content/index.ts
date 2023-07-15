console.info('chrome-ext template-svelte-ts content script');

export {};

setTimeout(() => {
  const films = document.querySelectorAll('.poster-container') as NodeListOf<HTMLElement>;
  console.log(films);
  if (films.length) {
    films.forEach((film) => {
      const score = film.dataset.averageRating;
      if (!score) return;

      film.style.position = 'relative';

      const scoreElement = document.createElement('div');
      scoreElement.textContent = score;
      scoreElement.style.position = 'absolute';
      scoreElement.style.top = '0';
      scoreElement.style.left = '0';
      scoreElement.style.color = 'red';
      scoreElement.style.zIndex = '999';
      scoreElement.style.fontSize = '20px';

      film.appendChild(scoreElement);
    });
  }
}, 2000);
