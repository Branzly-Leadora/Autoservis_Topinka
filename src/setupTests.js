// jest-dom adds custom jest matchers for asserting on DOM nodes.
import "@testing-library/jest-dom";

// jsdom neimplementuje matchMedia / IntersectionObserver / ResizeObserver,
// které framer-motion a naše efekty používají – doplníme jednoduché stuby.
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

class ObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.IntersectionObserver = window.IntersectionObserver || ObserverStub;
window.ResizeObserver = window.ResizeObserver || ObserverStub;

// Canvas 2D kontext pro particle efekt v hero sekci.
HTMLCanvasElement.prototype.getContext = function () {
  return {
    setTransform: () => {},
    clearRect: () => {},
    beginPath: () => {},
    arc: () => {},
    fill: () => {},
    moveTo: () => {},
    lineTo: () => {},
    stroke: () => {},
  };
};

window.scrollTo = window.scrollTo || (() => {});
Element.prototype.scrollIntoView = Element.prototype.scrollIntoView || (() => {});
