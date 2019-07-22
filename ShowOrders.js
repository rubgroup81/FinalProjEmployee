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
import './Style.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { TextField, InputLabel, TableSortLabel } from '@material-ui/core';
import RouteButton from './RouteButton';
import ShowSpecificOrder from './ShowSpecificOrder';
import GetOrdersFor3Days from './GetOrdersFor3Days';


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',

  },
  table: {
    minWidth: 700,

  },
  button: {
    margin: theme.spacing.unit,
    backgroundColor: 'white',
    borderColor: 'red',
    color: 'blue',
  },

  input: {
    display: 'none',
  },

});

class ShowOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      orders: [],
      error: null,
      position: 0,
      page: 0,
      rowsPerPage: 10,

      newOrders: [],
      filterNameCostumer: '',
      filterNumberOrder: '',
      nameCategory: '',
    }
    this.ShowAllOrders = this.ShowAllOrders.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (window.location.hostname === "localhost") {
      fetch('http://localhost:49934/api/Order')
        .then(this.handleErrors)
        .then(response => response.json())
        .then(data => {
          this.setState({
            isLoaded: true,
            orders: data,
            newOrders: data
          })

        })
        .catch(error => this.setState({ error: "There was an error in getting the orders" }));
    }
    else {
      fetch('http://proj.ruppin.ac.il/bgroup81/prod/api/Order')
        .then(this.handleErrors)
        .then(response => response.json())
        .then(data => {
          this.setState({
            isLoaded: true,
            orders: data,
            newOrders: data
          })

        })
        .catch(error => this.setState({ error: "There was an error in getting the orders" }));
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

  filterTbl() {
    if (this.state.nameCategory == "filterNameCostumer") {
      this.setState({ newOrders: this.state.newOrders.filter(o => o.NameCostumer === this.state.filterNameCostumer) });
    }
    else if (this.state.nameCategory == "filterNumberOrder") {
      this.setState({ newOrders: this.state.newOrders.filter(o => o.NumberOrder == this.state.filterNumberOrder) });
    }
    return this.state.newOrders;
  }

  ShowAllOrders() {
    this.setState({
      newOrders: [...this.state.orders]
    })
    return this.state.newOrders
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({ nameCategory: [event.target.name] });
  }

  render() {
    if (this.state.orders.length === 0) {
      return (null)
    }
    else {
      return (
        <div className="tblOrder">
          <h1>הזמנות</h1>
          <div className="divFilter">
            <TextField placeholder="מספר הזמנה" type="number" name='filterNumberOrder' onChange={this.handleChange}></TextField>&nbsp; &nbsp;
           <TextField placeholder="שם לקוח" type="text" name='filterNameCostumer' onChange={this.handleChange}></TextField>&nbsp; &nbsp;
            <Button variant="outlined" color="primary" onClick={() => this.filterTbl()}>חפש
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /><path d="M0 0h24v24H0z" fill="none" /></svg>
            </Button>&nbsp; &nbsp;
            <Button style={{ backgroundColor: "#2e1534" }} variant="contained" color="primary" onClick={() => this.ShowAllOrders()}>הצג הכל</Button>&nbsp; &nbsp;
          </div><br />
          <div>
            <Paper className={styles.root}>
              <Table className={styles.table}>
                <TableHead>
                  <TableRow>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center">סכום</TableCell>
                    <TableCell align="center">שם לקוח</TableCell>
                    <TableCell align="center">סטטוס תשלום</TableCell>
                    <TableCell align="center">סטטוס הזמנה</TableCell>
                    <TableCell align="center">תאריך סיום משוער</TableCell>
                    <TableCell align="center">תאריך קבלה</TableCell>
                    <TableCell align="center"> מספר הזמנה</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                  {this.state.newOrders.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((row, i) => {
                    if (row.StatusOrder !== "בוטל") {
                      return (
                        <TableRow key={i}>
                          <TableCell align="center"><RouteButton value='הצג' pathname={"/ShowSpecificOrder/" + row.NumberOrder} Component={ShowSpecificOrder} /></TableCell>
                          <TableCell align="center">{row.TotalOrder}</TableCell>
                          <TableCell align="center">{row.NameCostumer}</TableCell>
                          <TableCell align="center">{row.StatusPayment}</TableCell>
                          <TableCell align="center">{row.StatusOrder}</TableCell>
                          <TableCell align="center">{row.FinalDate}</TableCell>
                          <TableCell align="center">{row.StartDate}</TableCell>
                          <TableCell align="center">{row.NumberOrder}</TableCell>
                        </TableRow>
                      );
                    }
                    else {
                      return null
                    }
                  })}

                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      colSpan={3}
                      count={this.state.orders.length}
                      rowsPerPage={this.state.rowsPerPage}
                      page={this.state.page}
                      SelectProps={{
                        native: true,
                      }}
                      onChangePage={this.handleChangePage}
                      onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </Paper>
          </div>
          <GetOrdersFor3Days />

        </div>
      )
    }
  }
}
export default ShowOrders;