import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./index.css";

class Header extends React.PureComponent {
  render() {
    return (
      <div className="d-flex row main-header-container">
        <div className="d-flex main-header justify-content-between align-items-center">
          <div className="d-flex">
            <Link to="/">
              <span className="main-header__title-name">
                Creatella <span className="main-header__title-face">Face</span>
              </span>
            </Link>
          </div>
          <Link to="/cart" className="main-header__cart right">
            {this.props.cart.length > 0 && (
              <div className="d-flex justify-content-center align-items-center main-header__cart-count">
                {this.props.cart.length}
              </div>
            )}
            <i className="mdi mdi-cart" />
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart
});

export default connect(mapStateToProps)(Header);
