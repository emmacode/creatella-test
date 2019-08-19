import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import "./App.css";
import rootReducer from "./store/reducers/index";
import Homescreen from "./views/Homescreen";
import Spinner from "./components/Spinner";

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

function App() {
  return (
    <Provider store={store}>
      <Spinner />
      <Homescreen />
    </Provider>
  );
}

export default App;
