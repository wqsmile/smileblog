let timer = null;

export default function debounce(func: Function, delay: number) {
  return (function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  })();
}
