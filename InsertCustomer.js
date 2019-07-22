import React from 'react';
import { TextField, TableSortLabel, FormControl } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import swal from 'sweetalert';

class InsertCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { Name: '', Email: '', Tel: '', Address: '' }
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = event => {

        event.preventDefault();
        if (window.location.hostname === "localhost") {
            const url = 'http://localhost:49934/api/Costumer';
            const data = { Name: this.state.Name, Address: this.state.Address, Tel: this.state.Tel, Email: this.state.Email }
            fetch(url, {
                method: 'POST', // or ‘PUT’

                body: JSON.stringify(data), // data can be `string` or {object}!

                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {
                    swal("הלקוח נוסף בהצלחה");
                })
                .catch(error => console.error('Error:', error)
                )

        }
        else {
            const url = 'http://proj.ruppin.ac.il/bgroup81/prod/api/Costumer';
            const data = { Name: this.state.Name, Address: this.state.Address, Tel: this.state.Tel, Email: this.state.Email }

            fetch(url, {
                method: 'POST', // or ‘PUT’
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {
                    swal("הלקוח נוסף בהצלחה");
                })
                .catch(error => console.error('Error:', error)
                )
        }
    }

    render() {

        return (
            <div className="divInsert">
                <form onSubmit={this.handleSubmit}>
                    <h1>יצירת לקוח חדש</h1>
                    <TableSortLabel>שם :</TableSortLabel>&nbsp;&nbsp;&nbsp;
                    <TextField name='Name' placeholder="שם " onChange={this.handleChange}></TextField> <br />
                    <TableSortLabel>טלפון :</TableSortLabel>
                    <TextField name='Tel' placeholder="טלפון " onChange={this.handleChange}></TextField> <br />
                    <TableSortLabel>כתובת:</TableSortLabel>
                    <TextField name='Address' placeholder="כתובת" onChange={this.handleChange}></TextField> <br />
                    <TableSortLabel>אימייל:</TableSortLabel>
                    <TextField name='Email' placeholder="Email" onChange={this.handleChange}></TextField> <br />
                    <br /><br /><br />
                    <Button type='submit' variant="outlined" color="primary" > הוסף לקוח</Button>

                </form>
            </div>
        )
    }
}

export default InsertCustomer;