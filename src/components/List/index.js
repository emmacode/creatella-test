import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getDate } from "../../utils";
//import * as actions from "../../store/actions/cart";
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

  _handleAdd = id => {
    this.props.addToCart(id);
  };

  _handleRemove = id => {
    this.props.removeItem(id);
  };

  render() {
    let {
      products: { data, hasEndBeenReached, fetchingMore }
    } = this.props;

    return (
      <React.Fragment>
        <div className="d-flex flex-wrap">
          {data.map((product, i) => {
            return (
              <div key={i} className="d-flex flex-column list-item">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="list-item__title">{product.id}</span>
                  {/* {this.props.cart === -1 ? (
                    <i
                      className="mdi mdi-plus-circle"
                      onClick={() => {
                        this._handleAdd(product.id);
                      }}
                    />
                  ) : (
                    <i
                      className="mdi mdi-minus-circle"
                      onClick={() => {
                        this._handleRemove(product.id);
                      }}
                    />
                  )} */}
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
  products: state.products
  // cart: state.cart
});

// const mapDispatchToProps = dispatch => ({
//   addToCart: id => dispatch(actions.addToCart(id)),
//   removeItem: id => dispatch(actions.removeItem(id))
// });

export default connect(
  mapStateToProps
  // mapDispatchToProps
)(List);
