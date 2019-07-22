import React from 'react'
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import swal from 'sweetalert';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { FormControl } from '@material-ui/core';


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

class TableRowSupplier extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      selectedRow: null,
      succsess: ""
    }
  }

  componentDidMount() {
    this.setState({

      Id: this.props.row.Id,
      Name: this.props.row.Name,
      Tel: this.props.row.Tel,
      Email: this.props.row.Email,
      Address: this.props.row.Address,
      MethodOfPayment: this.props.row.MethodOfPayment
    })
  }

  onRowDelete = (row) => {
    const { Id } = this.state;

    if (window.location.hostname === "localhost") {
      fetch('http://localhost:49934/api/deletesupllier?Id=' + Id)
        .then(this.handleErrors)
        .then(response => response.json())

        .then(data => {
          this.setState({
            isLoaded: true,
            succsess: data,

          })
          if (this.state.succsess == 0) {
            swal('קרתה תקלה בעת המחיקה, אנא נסה שנית מאוחר יותר')
          }
          else {
            swal('הספק נמחק בהצלחה')
          }

        })
        .catch(error => this.setState({ error: "There was an error in delete the supllier" }));
    }
    else {
      fetch('http://proj.ruppin.ac.il/bgroup81/prod/api/deletesupllier?Id=' + Id)
        .then(this.handleErrors)
        .then(response => response.json())

        .then(data => {
          this.setState({
            isLoaded: true,
            succsess: data,

          })
          if (this.state.succsess == 0) {
            swal('קרתה תקלה בעת המחיקה, אנא נסה שנית מאוחר יותר')
          }
          else {
            swal('הספק נמחק בהצלחה')
          }

        })
        .catch(error => this.setState({ error: "There was an error in delete the supllier" }));
    }
  };


  onRowClickHandler = (row) => {

    if (this.state.isEditMode) {

      // send to DB 
      if (window.location.hostname === "localhost") {
        const url = 'http://localhost:49934/api/Supplier/updateSupplier';

        var data = {
          Id: this.state.Id,
          Name: this.state.Name,
          Tel: this.state.Tel,
          Email: this.state.Email,
          Address: this.state.Address,
          MethodOfPayment: this.state.MethodOfPayment,
        }
        fetch(url, {
          method: 'POST', // or ‘PUT’
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data), // data can be `string` or {object}!

        })
          .then(response => {
          })
          .catch(error => console.error('Error:', error))

      }
      else {
        const url = 'http://proj.ruppin.ac.il/bgroup81/prod/api/Supplier/updateSupplier';

        var data = {
          Id: this.state.Id,
          Name: this.state.Name,
          Tel: this.state.Tel,
          Email: this.state.Email,
          Address: this.state.Address,
          MethodOfPayment: this.state.MethodOfPayment,
        }
        fetch(url, {
          method: 'POST', // or ‘PUT’
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data), // data can be `string` or {object}!

        })
          .then(response => {
          })
          .catch(error => console.error('Error:', error))

      }
    }
    this.setState({ isEditMode: !this.state.isEditMode })
  };

  onChangeHandler = (e) => {
    // console.log(e.target.value);
    const name = e.target.name;
    this.setState({ [name]: e.target.value })
  }

  render() {
    const { Id, Name, Tel, Email, Address, MethodOfPayment, isEditMode } = this.state;
    return (
      <TableRow>

        <TableCell align="center"> <Button style={{ backgroundColor: "rgb(161, 51, 66)" }} variant="contained" color="primary" onClick={() => this.onRowDelete(Id)}>מחק</Button> &nbsp;<Button style={{ backgroundColor: "#2e1534" }} variant="contained" color="primary" onClick={() => this.onRowClickHandler(Id)}>{isEditMode ? 'שמור' : 'עדכן'}</Button></TableCell>
        <TableCell align="center">{isEditMode ?
          <FormControl>
            <Select value={MethodOfPayment}
              onChange={this.onChangeHandler}
              inputProps={{
                name: 'MethodOfPayment',
              }}>
              <MenuItem value="אשראי"> אשראי </MenuItem>
              <MenuItem value="מזומן"> מזומן </MenuItem>
              <MenuItem value="צק">  צ'ק </MenuItem>

            </Select>
          </FormControl> : MethodOfPayment}</TableCell>
        <TableCell align="center">{isEditMode ? <input name='Address' onChange={this.onChangeHandler} value={Address} /> : Address}</TableCell>
        <TableCell align="center">{isEditMode ? <input name='Email' onChange={this.onChangeHandler} value={Email} /> : Email}</TableCell>
        <TableCell align="center">{isEditMode ? <input name='Tel' onChange={this.onChangeHandler} value={Tel} /> : Tel}</TableCell>
        <TableCell align="center">{isEditMode ? <input name='Name' onChange={this.onChangeHandler} value={Name} /> : Name}</TableCell>

      </TableRow>
    )
  }
}





export default TableRowSupplier;