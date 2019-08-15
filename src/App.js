import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import "./App.css";
import rootReducer from "./store/reducers/index";
import Homescreen from "./views/Homescreen";

const store = createStore(rootReducer, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
      <Homescreen />
    </Provider>
  );
}

export default App;
