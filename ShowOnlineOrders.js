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
import RouteButton from './RouteButton';
import ShowSpecificOrder from './ShowSpecificOrder';


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

class ShowOnlineOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      orders: [],
      error: null,
      position: 0,
      page: 0,
      rowsPerPage: 10,
    }
  }

  componentDidMount() {

    if (window.location.hostname === "localhost") {
      fetch('http://localhost:49934/api/OrderOnline/ממתין לאישור')
        .then(this.handleErrors)
        .then(response => response.json())

        .then(data => {
          this.setState({
            isLoaded: true,
            orders: data,
          })

        })
        .catch(error => this.setState({ error: "There was an error in getting the orders" }));
    }
    else {
      fetch('http://proj.ruppin.ac.il/bgroup81/prod/api/OrderOnline/ממתין לאישור')
        .then(this.handleErrors)
        .then(response => response.json())
        .then(data => {
          this.setState({
            isLoaded: true,
            orders: data,
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


  render() {
    if (this.state.orders.length === 0) {
      return (null)
    }
    else {
      return (
        <div className="tblOrder">
          <h1>הזמנות חדשות מהאתר</h1>
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
                {this.state.orders.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((row, i) => {
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

      )
    }
  }
}
export default ShowOnlineOrders;