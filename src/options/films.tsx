import FilmScore from '@components/FilmScore';
import { render } from 'solid-js/web';

export const showFilmsScore = () => {
  const films = document.querySelectorAll('.poster-container') as NodeListOf<HTMLElement>;
  console.log(films);
  if (films.length) {
    films.forEach((film) => {
      const score = film.dataset.averageRating;
      if (!score) return;
      film.style.position = 'relative';

      render(() => <FilmScore score={score} />, film);
    });
  }
};
