import React from "react";
import Spinner from "./components/Spinner";

class Root extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <Spinner />
        {this.props.children}
      </React.Fragment>
    );
  }
}

export default Root;
