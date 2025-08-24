// main.tsx hoặc index.tsx

import React from "react";
import ReactDOM from "react-dom/client";
// import { ErrorBoundary } from "react-error-boundary";

import App from "./App";
// import ErrorFallback from "./ui/ErrorFallback";
import "./styles/main.scss";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
