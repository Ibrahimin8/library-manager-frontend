import '@testing-library/jest-dom';

// Silence react-router-dom navigate warnings by providing a MemoryRouter in tests

// Mock scrollTo in jsdom
if (!window.scrollTo) {
  // @ts-ignore
  window.scrollTo = () => {};
}

// Ensure localStorage/sessionStorage exist in jsdom (they do, but keep explicit)
if (!('localStorage' in window)) {
  // @ts-ignore
  window.localStorage = {
    store: {},
    getItem(key) { return this.store[key] || null; },
    setItem(key, value) { this.store[key] = String(value); },
    removeItem(key) { delete this.store[key]; },
    clear() { this.store = {}; }
  };
}
if (!('sessionStorage' in window)) {
  // @ts-ignore
  window.sessionStorage = {
    store: {},
    getItem(key) { return this.store[key] || null; },
    setItem(key, value) { this.store[key] = String(value); },
    removeItem(key) { delete this.store[key]; },
    clear() { this.store = {}; }
  };
}
