import React from 'react'
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import ProDropDown from "./ProDropDown";
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

class ProductsTableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      selectedRow: null
    }
  }

  componentDidMount() {
    this.setState({
      Makat: this.props.row.Makat,
      Name: this.props.row.Name,
      Type: this.props.row.Type,
      StatusInStock: this.props.row.StatusInStock,
      InvitedStatus: this.props.row.InvitedStatus ? 'הוזמן' : 'לא הוזמן'
    })
  }

  onRowDelete = (row) => {
    const { Makat } = this.state;
    const data = { ...this.state };
    // send to DB 
    if (window.location.hostname === "localhost") {
      let url = 'http://localhost:49934/api/products?Makat=' + Makat + ''
      return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
        .then(response => {
          swal("הפריט נמחק בהצלחה");
        })
        .catch(error => {
          console.error('Error:', error)
        })

    } else {
      let url = 'http://proj.ruppin.ac.il/bgroup81/prod/api/products?Makat=' + Makat + ''
      return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
        .then(response => {
          swal("הפריט נמחק בהצלחה");
        })
        .catch(error => {
          console.error('Error:', error)
        })
    }
  };

  onRowClickHandler = (row) => {
    const { table } = this.props;
    if (this.state.isEdit) {
      const { StatusInStock, Makat, InvitedStatus } = this.state;

      const data = { ...this.state };
      // send to DB 

      let url = '';
      if (window.location.hostname === "localhost") {
        switch (table) {
          case '1':
            url = 'http://localhost:49934/api/Frames?StatusInStock=' + StatusInStock + '&Makat=' + Makat + '&InvitedStatus=' + (InvitedStatus == 'הוזמן' ? true : false) + ''
            break;
          case '2':
            url = 'http://localhost:49934/api/Glasses?StatusInStock=' + StatusInStock + '&Makat=' + Makat + '&InvitedStatus=' + (InvitedStatus == 'הוזמן' ? true : false) + ''
            break;
          case '3':
            url = 'http://localhost:49934/api/FinalProducts?StatusInStock=' + StatusInStock + '&Makat=' + Makat + '&InvitedStatus=' + (InvitedStatus == 'הוזמן' ? true : false) + ''
            break;

          default:
            break;
        }
      }
      else {
        switch (table) {
          case '1':
            url = 'http://proj.ruppin.ac.il/bgroup81/prod/api/Frames?StatusInStock=' + StatusInStock + '&Makat=' + Makat + '&InvitedStatus=' + (InvitedStatus == 'הוזמן' ? true : false) + ''
            break;
          case '2':
            url = 'http://proj.ruppin.ac.il/bgroup81/prod/api/Glasses?StatusInStock=' + StatusInStock + '&Makat=' + Makat + '&InvitedStatus=' + (InvitedStatus == 'הוזמן' ? true : false) + ''
            break;
          case '3':
            url = 'http://proj.ruppin.ac.il/bgroup81/prod/api/FinalProducts?StatusInStock=' + StatusInStock + '&Makat=' + Makat + '&InvitedStatus=' + (InvitedStatus == 'הוזמן' ? true : false) + ''
            break;

          default:
            break;
        }

      }

      return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
        .then(response => {
          this.setState({ isEdit: !this.state.isEdit })

          swal("הפריט עודכן בהצלחה");
        })
        .catch(error => {
          this.setState({ isEdit: !this.state.isEdit })
          console.error('Error:', error)
        })
    }

    this.setState({ isEdit: !this.state.isEdit })

  };

  onChangeHandler = (e) => {

    //console.log('och=', e.target.value);
    const name = e.target.name;
    this.setState({ [name]: e.target.value })
  }



  render() {
    const { Makat, Name, Type, StatusInStock, InvitedStatus, isEdit } = this.state;

    return (
      <TableRow>

        <TableCell align="center"><Button style={{ backgroundColor: "#2e1534" }} variant="contained" color="primary" onClick={() => this.onRowClickHandler(Makat)}>{isEdit ? 'שמור' : 'עדכן'}</Button> &nbsp; <Button style={{ backgroundColor: "rgb(161, 51, 66)" }} variant="contained" color="primary" onClick={() => this.onRowDelete(Makat)}>מחק</Button></TableCell>

        <TableCell align="center">{isEdit ?
          <select name='InvitedStatus' value={this.state.InvitedStatus} onChange={this.onChangeHandler}  >
            <option value="הוזמן"  >
              הוזמן
             </option>
            <option value="לא הוזמן">
              לא הוזמן
             </option>
          </select>
          : InvitedStatus}</TableCell>
        <TableCell align="center">{
          isEdit ? <select name='StatusInStock' value={this.state.StatusInStock} onChange={this.onChangeHandler} >
            <option value='במלאי'>
              במלאי
              </option>
            <option value='לא במלאי'>
              לא במלאי
              </option>
          </select>
            : StatusInStock}</TableCell>
        <TableCell align="center">{Name}</TableCell>
        <TableCell align="center">{Type}</TableCell>
        <TableCell align="center">{Makat}</TableCell>





      </TableRow>
    )
  }
}





export default ProductsTableRow;