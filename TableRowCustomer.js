import React from 'react'
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import swal from 'sweetalert';

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

class TableRowCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      selectedRow: null,
      succsess: "",
    }
  }

  componentDidMount() {
    this.setState({
      Id: this.props.row.Id,
      Name: this.props.row.Name,
      Tel: this.props.row.Tel,
      Email: this.props.row.Email,
      Address: this.props.row.Address
    })
  }

  onRowDelete = (row) => {
    const { Id } = this.state;
    if (window.location.hostname === "localhost") {
      fetch('http://localhost:49934/api/deletecostumer?Id=' + Id)
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
            swal('הלקוח נמחק בהצלחה')
          }

        })
        .catch(error => this.setState({ error: "There was an error in delete the costumer" }));
    }
    else {
      fetch('http://proj.ruppin.ac.il/bgroup81/prod/api/deletecostumer?Id=' + Id)
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
            swal('הלקוח נמחק בהצלחה')
          }

        })
        .catch(error => this.setState({ error: "There was an error in delete the costumer" }));
    }
  };


  onRowClickHandler = (row) => {//,event

    if (this.state.isEditMode) {
      //const data = { ...this.state };
      // send to DB 

      if (window.location.hostname === "localhost") {
        const url = 'http://localhost:49934/api/Costumer/updateCostumer';

        var data = {
          Id: this.state.Id,
          Name: this.state.Name,
          Tel: this.state.Tel,
          Email: this.state.Email,
          Address: this.state.Address
        }
        fetch(url, {
          method: 'POST', // or ‘PUT’
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data), // data can be `string` or {object}!

        })
          .then(response => {
          })
          .catch(error => console.error('Error:', error))
        //event.preventDefault();
      }
      else {
        const url = 'http://proj.ruppin.ac.il/bgroup81/prod/api/Costumer/updateCostumer';

        var data = {
          Id: this.state.Id,
          Name: this.state.Name,
          Tel: this.state.Tel,
          Email: this.state.Email,
          Address: this.state.Address
        }
        fetch(url, {
          method: 'POST', // or ‘PUT’
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data), // data can be `string` or {object}!

        })
          .then(response => {
          })
          .catch(error => console.error('Error:', error))
        //event.preventDefault();

      }

    }
    this.setState({ isEditMode: !this.state.isEditMode })
  };

  onChangeHandler = (e) => {
    //console.log(e.target.value);
    const name = e.target.name;
    this.setState({ [name]: e.target.value })
  }

  render() {
    const { Id, Name, Tel, Email, Address, isEditMode } = this.state;
    return (
      <TableRow>
        <TableCell align="center"> <Button style={{ backgroundColor: "rgb(161, 51, 66)" }} variant="contained" color="primary" onClick={() => this.onRowDelete(Id)}>מחק</Button> &nbsp;<Button style={{ backgroundColor: "#2e1534" }} variant="contained" color="primary" onClick={() => this.onRowClickHandler(Id)}>{isEditMode ? 'שמור' : 'עדכן'}</Button></TableCell>
        <TableCell align="center">{isEditMode ? <input name='Address' onChange={this.onChangeHandler} value={Address} /> : Address}</TableCell>
        <TableCell align="center">{isEditMode ? <input name='Email' onChange={this.onChangeHandler} value={Email} /> : Email}</TableCell>
        <TableCell align="center">{isEditMode ? <input name='Tel' onChange={this.onChangeHandler} value={Tel} /> : Tel}</TableCell>
        <TableCell align="center">{isEditMode ? <input name='Name' onChange={this.onChangeHandler} value={Name} /> : Name}</TableCell>
      </TableRow>
    )
  }
}


export default TableRowCustomer;