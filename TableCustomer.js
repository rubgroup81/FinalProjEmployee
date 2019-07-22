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
import TableRowCustomer from './TableRowCustomer'

import InsertCustomer from './InsertCustomer'
import RouteButton from './RouteButton';

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

class TableCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      selectedRow: null,
      page: 0,
      rowsPerPage: 10,
    }
  }

  componentDidMount() {

    this.setState({ customers: this.props.customers })

  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  onRowClickHandler = (row) => {
    this.setState({ selectedRow: row, isEdit: !this.state.isEdit })
  };

  onChangeHandler = (e) => {
    //console.log(e.target.value);
    const name = e.target.name;
    this.setState({ [name]: e.target.value })
  }

  render() {
    return (
      <div className="tbl">

        <br /><br />
        <Paper className={styles.root}>
          <Table className={styles.table}>
            <TableHead>
              <TableRow>
                <TableCell align="center"></TableCell>
                <TableCell align="center">כתובת</TableCell>
                <TableCell align="center">מייל</TableCell>
                <TableCell align="center">טלפון</TableCell>
                <TableCell align="center">שם</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.customers.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((row, i) => {
                return <TableRowCustomer key={row.Id} row={row} />
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={3}
                  count={this.props.customers.length}
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
      </div>)
  }
}







export default TableCustomer;