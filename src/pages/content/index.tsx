import '@src/index.css';

console.info('content script');

export {};

setTimeout(async () => {
  const file = await import('@options/films');
  file['showFilmsScore']();
}, 2000);
