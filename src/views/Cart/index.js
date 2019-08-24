import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./index.css";

class Cart extends React.PureComponent {
  render() {
    let length =
      this.props.cart.addedItems.length === 0 ? (
        <span className="Cart__cart-length d-flex justify-content-center">
          You have {this.props.cart.addedItems.length} Item
        </span>
      ) : (
        <span className="Cart__cart-length d-flex justify-content-center">
          You have {this.props.cart.addedItems.length} Items
        </span>
      );

    let total = this.props.cart.total;

    let addedItem = this.props.cart.addedItems.length ? (
      <div className="d-flex justify-content-around">
        <div className="d-flex flex-wrap Cart__main">
          {this.props.cart.addedItems.map((product, i) => {
            return (
              <div key={i} className="d-flex flex-column cart-item">
                <span className="cart-item__title">
                  Product-id:({product.id})
                </span>
                <span className="cart-item__size">Size:({product.size}px)</span>

                <div className="align-self-center cart-item__faces">
                  {product.face}
                </div>
                <span className="cart-item__price">
                  ${(product.price / 100).toFixed(2)}
                </span>
                <div className="d-flex justify-content-end">
                  <button className="btn  Cart__cart-delete">REMOVE</button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="Cart__sidebar">
          <div className="Cart__cart-price">Total: {total}$</div>
          <button className="btn Cart__check-btn">CHECK OUT</button>
        </div>
      </div>
    ) : (
      <div className="cart-empty__container d-flex align-items-center justify-content-center">
        <div className="d-flex flex-column">
          <div className="Cart__icon-body">
            <i className="d-flex justify-content-center mdi mdi-cart Cart__mdi-cart" />
          </div>
          <span className="cart-empty__title d-flex justify-content-center">
            Your cart is empty!
          </span>
          <Link
            to="/"
            className="btn cart-empty__button d-flex justify-content-center"
          >
            START SHOPPING
          </Link>
        </div>
      </div>
    );
    return (
      <React.Fragment>
        <span className="d-flex justify-content-center Cart__item-length">
          {length}
        </span>

        <div className="Cart__body">{addedItem}</div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart
});

export default connect(mapStateToProps)(Cart);
