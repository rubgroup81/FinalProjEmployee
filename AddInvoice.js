import React from 'react';
import { TextField, TableSortLabel, FormControl } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import swal from 'sweetalert';



class AddInvoice extends React.Component {
    constructor(props) {
        super(props);


        this.StPayment = this.props.StPayment;
    }

    AddInvoice() {
        if (window.location.hostname === "localhost") {
            const url = 'http://localhost:49934/api/Invoice';
            const data = { NumberOrder: this.props.numOrder }
            fetch(url, {
                method: 'POST', // or ‘PUT’
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {
                    swal("החשבונית נוצרה בהצלחה");
                })
                .catch(error => console.error('Error:', error)
                )
        }
        else {
            const url = 'http://proj.ruppin.ac.il/bgroup81/prod/api/Invoice';
            const data = { NumberOrder: this.props.numOrder }

            fetch(url, {
                method: 'POST', // or ‘PUT’
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {
                    swal("החשבונית נוצרה בהצלחה");
                })
                .catch(error => console.error('Error:', error)
                )
        }

    }



    render() {
        return (
            <div>
                {this.props.StPayment === 'שולם חלקית' || this.props.StPayment === 'שולם' ?
                    <Button onClick={() => this.AddInvoice()} variant="outlined" color="primary" > הפק חשבונית</Button>
                    : <Button variant="outlined" disabled> הפק חשבונית</Button>
                }
            </div>
        )

    }

}


export default AddInvoice;