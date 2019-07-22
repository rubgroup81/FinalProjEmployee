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
import { InputLabel, OutlinedInput, InputBase, TextField, TableSortLabel, DatePicker } from '@material-ui/core';
import RouteButton from './RouteButton';
import PrintThisComponent from './PrintThisComponent';

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

class Reports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      reports: [],
      error: null,
      position: 0,
      page: 0,
      rowsPerPage: 10,
      StartDate: "2019-06-05",
      FinalDate: "3000-06-05",
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (window.location.hostname === "localhost") {

      fetch('http://localhost:49934/api/Invoice/?startDate=' + this.state.StartDate + '&finalDate=' + this.state.FinalDate)
        .then(this.handleErrors)
        .then(response => response.json())

        .then(data => {
          this.setState({
            isLoaded: true,
            reports: data,
          })

        })
        .catch(error => this.setState({ error: "There was an error in getting the reports" }));
    }
    else {
      fetch('http://proj.ruppin.ac.il/bgroup81/prod/api/Invoice/?startDate=' + this.state.StartDate + '&finalDate=' + this.state.FinalDate)
        .then(this.handleErrors)
        .then(response => response.json())
        .then(data => {
          this.setState({
            isLoaded: true,
            reports: data,
          })
        })
        .catch(error => this.setState({ error: "There was an error in getting the reports" }));
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

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });

  }

  ShowReport() {

    if (window.location.hostname === "localhost") {

      fetch('http://localhost:49934/api/Invoice/?startDate=' + this.state.StartDate + '&finalDate=' + this.state.FinalDate)
        .then(this.handleErrors)
        .then(response => response.json())

        .then(data => {
          this.setState({
            isLoaded: true,
            reports: data,
          })
        })
        .catch(error => this.setState({ error: "There was an error in getting the reports" }));
    }
    else {
      fetch('http://proj.ruppin.ac.il/bgroup81/prod/api/Invoice/?startDate=' + this.state.StartDate + '&finalDate=' + this.state.FinalDate)
        .then(this.handleErrors)
        .then(response => response.json())
        .then(data => {
          this.setState({
            isLoaded: true,
            reports: data,
          })
        })
        .catch(error => this.setState({ error: "There was an error in getting the reports" }));
    }
  }

  render() {
    return (
      <div>
        <div className="divReport">
          <h1>דוח הכנסות</h1>
          מתאריך:<TextField type="date" name='StartDate' onChange={this.handleChange}></TextField>&nbsp; &nbsp;
            עד תאריך: <TextField type="date" name='FinalDate' onChange={this.handleChange}></TextField>&nbsp; &nbsp;
            <Button variant="outlined" color="primary" onClick={() => this.ShowReport()}>הצג</Button>&nbsp; &nbsp;
            <PrintThisComponent></PrintThisComponent>
        </div>
        <br /><br />
        <div className="tblReport" >
          <Paper className={styles.root}>
            <Table className={styles.table}>
              <TableHead>
                <TableRow>
                  <TableCell align="center">סה"כ (ש"ח)</TableCell>
                  <TableCell align="center">מספר חשבונית</TableCell>
                  <TableCell align="center">תאריך תשלום</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.reports.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((row, i) => (
                  <TableRow key={i}>
                    <TableCell align="center">{row.PaidOnAccount}</TableCell>
                    <TableCell align="center">{row.NumberInvoice}</TableCell>
                    <TableCell align="center">{row.DatePayment}</TableCell>

                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    colSpan={3}
                    count={this.state.reports.length}
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
      </div>
    )
  }
}
export default Reports;