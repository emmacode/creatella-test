import React from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/products";

class Homescreen extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <button
          onClick={() => {
            console.log(this.props.products);
          }}
        >
          Get State
        </button>
        <button onClick={() => console.log(this.props.actions1())}>oya</button>
        <button
          onClick={() => {
            console.log(this.props.actions2());
          }}
        >
          oya2
        </button>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products
});

const mapDispatchToProps = dispatch => ({
  actions1: () => dispatch(actions.fetchProductsPending()),
  actions2: () => dispatch(actions.fetchProductsSucceed())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Homescreen);
