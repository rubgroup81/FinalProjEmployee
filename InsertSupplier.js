import React from 'react';
import { TextField, TableSortLabel, FormControl } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import swal from 'sweetalert';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

class InsertSupplier extends React.Component {
    constructor(props) {

        super(props);
        this.state = { Name: '', Email: '', Tel: '', Address: '', MethodOfPayment: '' }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange = event => {

        this.setState({ [event.target.name]: event.target.value })
    }

    onChangeHandler = (e) => {
        const name = e.target.name;
        this.setState({ [name]: e.target.value })
    }

    handleSubmit = event => {

        event.preventDefault();
        if (window.location.hostname === "localhost") {
            const url = 'http://localhost:49934/api/Supplier';

            const data = { Name: this.state.Name, Address: this.state.Address, Tel: this.state.Tel, Email: this.state.Email, MethodOfPayment: this.state.MethodOfPayment }

            fetch(url, {
                method: 'POST', // or ‘PUT’

                body: JSON.stringify(data), // data can be `string` or {object}!

                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {
                    swal("הספק נוסף בהצלחה");
                })
                .catch(error => console.error('Error:', error)
                )

        } else {
            const url = 'http://proj.ruppin.ac.il/bgroup81/prod/api/Supplier';

            const data = { Name: this.state.Name, Address: this.state.Address, Tel: this.state.Tel, Email: this.state.Email, MethodOfPayment: this.state.MethodOfPayment }

            fetch(url, {
                method: 'POST', // or ‘PUT’    
                body: JSON.stringify(data), // data can be `string` or {object}!    
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {
                    swal("הספק נוסף בהצלחה");
                })
                .catch(error => console.error('Error:', error)
                )
        }
    }

    render() {
        const { MethodOfPayment } = this.state;
        return (
            <div className="divInsert">
                <form onSubmit={this.handleSubmit}>
                    <h1>יצירת ספק חדש</h1>
                    <TableSortLabel>שם :</TableSortLabel>&nbsp;&nbsp;&nbsp;
                    <TextField name='Name' placeholder="שם " onChange={this.handleChange}></TextField> <br />
                    <TableSortLabel>טלפון :</TableSortLabel>
                    <TextField name='Tel' placeholder="טלפון " onChange={this.handleChange}></TextField> <br />
                    <TableSortLabel>כתובת:</TableSortLabel>
                    <TextField name='Address' placeholder="כתובת" onChange={this.handleChange}></TextField> <br />
                    <TableSortLabel>אימייל:</TableSortLabel>
                    <TextField name='Email' placeholder="אימייל" onChange={this.handleChange}></TextField> <br />
                    <TableSortLabel>אמצעי תשלום:</TableSortLabel>
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
                    </FormControl><br /><br /><br />

                    <br /><Button type='submit' variant="outlined" color="primary" > הוסף ספק</Button>
                </form>
            </div>
        )
    }
}

export default InsertSupplier;