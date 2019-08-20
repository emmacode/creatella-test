import React from "react";
import { connect } from "react-redux";

import List from "../components/List";
import "./index.css";
//import * as actions from "../store/actions/products";
import { fetchProducts } from "../store/actions/products";

class Homescreen extends React.PureComponent {
  state = {
    _page: 1
  };

  componentDidMount() {
    this.props.fetchProducts({ _page: 1, _limit: 9 });
  }

  componentDidUpdate(prevProps) {
    let {
        products: { data: newData }
      } = this.props,
      {
        products: { data: prevData }
      } = prevProps;

    if (newData.length > prevData.length && newData !== prevData.length) {
      this.setState({
        _page: this.state._page + 1
      });
    }
  }

  /**
   *
   */

  fetchMoreProducts = () => {
    let {
      products: { hasEndBeenReached, fetchingMore }
    } = this.props;

    if (!hasEndBeenReached && !fetchingMore) {
      let { _page } = this.state;
      this.props.fetchProducts({ _page, _limit: 9 }, true);
    }
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="d-flex flex-column list-container">
          <List onFetchMore={this.fetchMoreProducts} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products
});

const mapDispatchToProps = dispatch => ({
  fetchProducts: (params, isFetchingMore) =>
    dispatch(fetchProducts(params, isFetchingMore))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Homescreen);
