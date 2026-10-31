import { createContext, useContext } from 'react';
import { api } from '../services/api.js';
const Context = createContext(null);
export function AppProvider({ children }) {
  return <Context.Provider value={{ api }}>{children}</Context.Provider>;
}
export const useApp = () => useContext(Context);
