import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ReduxToastr from "react-redux-toastr";

import "semantic-ui-css/semantic.min.css";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import "./index.css";

import { configureStore } from "./app/store/configureStore";
import ScrollToTop from "./app/common/utils/ScrollToTop";
import App from "./app/layout/App";

const store = configureStore();

let render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop>
          <ReduxToastr
            position="bottom-right"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
          />
          <App />
        </ScrollToTop>
      </BrowserRouter>
    </Provider>,
    document.getElementById("root")
  );
};

if (module.hot) {
  module.hot.accept("./app/layout/App", () => {
    setTimeout(render);
  });
}

render();
