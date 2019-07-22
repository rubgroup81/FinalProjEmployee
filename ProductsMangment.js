import React from 'react'
import ProductsTable from "./Table"
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { withStyles } from '@material-ui/core/styles';
import ProDropDown from "./ProDropDown";
import { Link } from "react-router-dom";

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});


class ProductsMangment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      products: [],
      tableOne: [],
      tableTwo: [],
      tableThree: [],
      table: [],
      editMode: false,
      error: null,
      position: 0,
      page: 0,
      rowsPerPage: 10,
      selectedTable: 1,
    }

  }


  handleErrors = (response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };


  PrintId = (productId) => {
    // this.setState({editMode:!this.state.editMode,editedMakat:productId})
    // console.log(productId);
  }

  onSelectChange = (num, name) => {

    if (window.location.hostname === "localhost") {
      fetch('http://localhost:49934/api/products/' + num)
        .then(response => response.json())
        .then(data => {
          return this.setState({
            table: data,
            num
          })
        })
        .catch(error => this.setState({ error: "There was an error in getting the products" }));


    } else {
      fetch('http://proj.ruppin.ac.il/bgroup81/prod/api/products/' + num)
        .then(response => response.json())
        .then(data => {
          return this.setState({
            table: data,
            num
          })
        })
        .catch(error => this.setState({ error: "There was an error in getting the products" }));

    }

  }

  render() {

    return (
      <div name="continer">
        <div>
          <ProDropDown onSelectChange={this.onSelectChange} />
        <br />
        </div>
        <div>
          <div className="divProduct">          
            {this.state.table.length ? <ProductsTable selectedTable={this.state.num} products={this.state.table} onCellClick={this.PrintId} /> : null}
          </div>
        </div>
      </div>
    )
  }
}
export default ProductsMangment