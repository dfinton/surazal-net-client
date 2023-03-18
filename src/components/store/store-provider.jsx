import { createContext, useContext } from 'react';
import RootStore from '@/store';

let rootStore;
export const StoreContext = createContext();

export function useStore() {
  const context = useContext(StoreContext);

  if (context === undefined) {
    throw new Error('useStore must be used within StoreProvider');
  }

  return context;
}

function initializeStore(initialState = null) {
  const store = rootStore ?? new RootStore();

  // If your page has Next.js data fetching methods that use a Mobx store, it will
  // get hydrated here
  if (initialState) store.hydrate(initialState);

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return store;

  // Create the store once in the client
  if (!store) rootStore = store;

  return store;
}

export function StoreProvider({ children, initialState }) {
  const store = initializeStore(initialState)

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}
