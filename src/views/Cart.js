import React from "react";
import { connect } from "react-redux";

class Cart extends React.PureComponent {
  render() {
    let {
      items: { addedItems }
    } = this.props;
    let addedItem = addedItems.length ? (
      addedItems.map(item => {
        return <h1>{item.id}</h1>;
      })
    ) : (
      <p>Nothing.</p>
    );
    return <div>{addedItem}</div>;
  }
}

const mapStateToProps = state => ({
  items: state.cart
});

export default connect(mapStateToProps)(Cart);
