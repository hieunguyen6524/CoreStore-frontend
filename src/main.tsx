// main.tsx hoặc index.tsx

import ReactDOM from "react-dom/client";
// import { ErrorBoundary } from "react-error-boundary";

import App from "./App";
// import ErrorFallback from "./ui/ErrorFallback";
import "./styles/main.scss";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
