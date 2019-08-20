import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getDate } from "../../utils";
import "./index.css";

class List extends React.PureComponent {
  static propTypes = {
    onFetchMore: PropTypes.func.isRequired
  };

  componentDidMount() {
    document.body.onscroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        this.props.onFetchMore();
      }
    };
  }

  render() {
    let {
      products: { data, hasEndBeenReached, fetchingMore }
    } = this.props;

    return (
      <React.Fragment>
        <span className="list-item__title">You are viewing 9 faces</span>
        <div className="d-flex flex-wrap">
          {data.map((product, i) => {
            return (
              <div key={i} className="d-flex flex-column list-item">
                <div className="d-flex justify-content-between align-items-center">
                  {product.id}
                  <i className="mdi mdi-plus" />
                </div>
                <span className="list-item__size">
                  Available size ({product.size}px)
                </span>
                <div className="align-self-center list-item__faces">
                  {product.face}
                </div>
                <span className="list-item__price">
                  ${(product.price / 100).toFixed(2)}
                </span>
                <span className="list-item__date">{getDate(product.date)}</span>
              </div>
            );
          })}
          {/* {productsItem} */}
        </div>
        {fetchingMore && (
          <span className="list-item__footer-text list-item__animated-loading">
            Loading...
          </span>
        )}
        {hasEndBeenReached && (
          <span className="list-item__footer-text">~ end of catalogue ~</span>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products,
  cart: state.cart
});

export default connect(mapStateToProps)(List);
