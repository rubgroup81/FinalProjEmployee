import React from 'react'
import PrintThisComponent from './PrintThisComponent';
import { TextField, InputLabel, TableSortLabel, Checkbox } from '@material-ui/core';



class PrintInvoice extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            invoice: "",

            editMode: false,
            error: null,
            position: 0,
            page: 0,
            rowsPerPage: 10,
        }

    }

    componentDidMount() {
        let numInvoice = this.props.match.params.id;

        if (window.location.hostname === "localhost") {
            fetch('http://localhost:49934/api/Invoice/' + numInvoice)
                .then(this.handleErrors)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        isLoaded: true,
                        invoice: data,
                    })
                })
                .catch(error => this.setState({ error: "There was an error in getting the Invoice" }));
        }
        else {
            fetch('http://proj.ruppin.ac.il/bgroup81/prod/api/Invoice/' + numInvoice)
                .then(this.handleErrors)
                .then(response => response.json())

                .then(data => {
                    this.setState({
                        isLoaded: true,
                        invoice: data,
                    })

                })
                .catch(error => this.setState({ error: "There was an error in getting the Invoice" }));
        }
    }

    handleErrors = (response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }

    render() {
        if (this.state.invoice.length === 0) {
            return <div>loading...</div>
        }
        return (
            <div className="printInvoice">
                <h2>אבי רוקשין </h2>
                <h4>עוסק מורשה מס' 053577755 </h4>
                <h4>רח' סוקולוב 57, הרצליה</h4>
                <h4>09-9503512</h4>
                <h3>-----------------------------------------</h3>
                <h3>חשבונית מס'  <u>{this.state.invoice.NumberInvoice}</u></h3>
                <h3>לכבוד:  <u>{this.state.invoice.NameCostumer}</u></h3>
                <h3>תאריך:  <u>{this.state.invoice.DatePayment}</u></h3>

                <h3>סה"כ: <u> {this.state.invoice.PaidOnAccount}  ש"ח</u></h3>
                <h3>אמצעי תשלום: <u>{this.state.invoice.MethodOfPayment}</u></h3>
                <br /><br />

                <PrintThisComponent></PrintThisComponent>

            </div>
        )
    }
}
export default PrintInvoice;