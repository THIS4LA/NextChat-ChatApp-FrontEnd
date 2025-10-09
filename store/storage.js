import createWebStorage from "redux-persist/lib/storage/createWebStorage";

// Safe storage for SSR
const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local") // use localStorage in browser
    : createNoopStorage(); // use noop storage on server

export default storage;
