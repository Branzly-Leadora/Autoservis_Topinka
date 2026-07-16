// Polyfilly pro starší prohlížeče (Safari < 14 apod.), aby reveal animace,
// parallax a scroll efekty fungovaly na všech zařízeních.
import 'intersection-observer';
import { ResizeObserver as ResizeObserverPolyfill } from '@juggle/resize-observer';

// Self-hostované fonty – žádná závislost na Google Fonts, načtou se vždy.
import '@fontsource/bebas-neue/400.css';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/600.css';
import '@fontsource/dm-sans/700.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

if (typeof window !== 'undefined' && !window.ResizeObserver) {
  window.ResizeObserver = ResizeObserverPolyfill;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
