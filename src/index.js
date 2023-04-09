import React, { createContext } from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from "./components/App/App";
import RootStore from "./store";

const store = RootStore.create({});
export const StoreContext = createContext(store);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);