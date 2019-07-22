import React from 'react'
import TableSupplier from './TableSupplier';
import Button from '@material-ui/core/Button';
import { TextField, InputLabel, TableSortLabel } from '@material-ui/core';
import { Link } from "react-router-dom";


class ShowSuppliers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      suppliers: [],
      newsuppliers: [],
      editMode: false,
      error: null,
      position: 0,
      page: 0,
      rowsPerPage: 10,
      filterNameSupplier: '',
    }
    this.ShowAllSupplier = this.ShowAllSupplier.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (window.location.hostname === "localhost") {
      fetch('http://localhost:49934/api/Supplier')
        .then(this.handleErrors)
        .then(response => response.json())

        .then(data => {
          this.setState({
            isLoaded: true,
            suppliers: data,
            newsuppliers: data,
          })
        })
        .catch(error => this.setState({ error: "There was an error in getting the suppliers" }));
    }
    else {
      fetch('http://proj.ruppin.ac.il/bgroup81/prod/api/Supplier')
        .then(this.handleErrors)
        .then(response => response.json())
        .then(data => {
          this.setState({
            isLoaded: true,
            suppliers: data,
            newsuppliers: data,
          })
        })
        .catch(error => this.setState({ error: "There was an error in getting the Supplier" }));
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
    this.setState({ newsuppliers: this.state.newsuppliers.filter(s => s.Name === this.state.filterNameSupplier) });
    return this.state.newsuppliers;
  }

  ShowAllSupplier() {
    this.setState({
      newsuppliers: [...this.state.suppliers]
    })
    return this.state.newsuppliers
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });

  }

  render() {
    if (this.state.suppliers.length === 0) {
      return <div>loading...</div>
    }
    return (
      <div className="divFilter">
        <h1>ספקים</h1>
        <TextField placeholder="שם ספק" type="text" name='filterNameSupplier' onChange={this.handleChange}></TextField>&nbsp; &nbsp;
          <Button variant="outlined" color="primary" onClick={() => this.filterTbl()}>חפש
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /><path d="M0 0h24v24H0z" fill="none" /></svg>
        </Button>&nbsp; &nbsp;
        <Button style={{ backgroundColor: "#2e1534" }} variant="contained" color="primary" onClick={() => this.ShowAllSupplier()}>הצג הכל</Button>&nbsp; &nbsp;
        <Button component={Link} to={"InsertSupplier"} variant="outlined" color="secondary">+ הוסף ספק חדש</Button>

        <TableSupplier suppliers={this.state.newsuppliers} />
      </div>
    )
  }
}
export default ShowSuppliers;