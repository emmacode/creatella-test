import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

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
    // let productsItem = data.map((product, i) => {
    //   return (
    //     <div key={i}>
    //       <h3>{product.id}</h3>
    //       <h3>{product.size}</h3>
    //       <h3>{product.price}</h3>
    //       <h3>{product.face}</h3>
    //       <h3>{product.date}</h3>
    //     </div>
    //   );
    // });

    return (
      <React.Fragment>
        <div>
          {data.map((product, i) => {
            return (
              <div key={i}>
                <h3>{product.id}</h3>
                <h3>{product.size}</h3>
                <h3>{product.price}</h3>
                <h3>{product.face}</h3>
                <h3>{product.date}</h3>
              </div>
            );
          })}
          {/* {productsItem} */}
        </div>
        {fetchingMore && <span>loading...</span>}
        {hasEndBeenReached && <span>End of catalogue</span>}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products
});

export default connect(mapStateToProps)(List);
