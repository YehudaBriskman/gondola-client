import "./index.css"
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import store from "./store/store";
import { ApolloProvider } from "@apollo/client";
import { MongoClient } from "./network/network";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("#root element not found.");

const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <Router>
      <ApolloProvider client={MongoClient}>
          <App />
        </ApolloProvider>
    </Router>
  </Provider>
);
