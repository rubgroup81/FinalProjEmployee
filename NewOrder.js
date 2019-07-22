import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { InputLabel, OutlinedInput, InputBase, TextField, TableSortLabel, DatePicker } from '@material-ui/core';
import FramingPicture from './FramingPicture';
import FramingMirror from './FramingMirror';
import CutMirror from './CutMirror';
import CutGlass from './CutGlass';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import KanvasPictures from './KanvasPictures';
import SweetAlert from 'react-bootstrap-sweetalert';
import swal from 'sweetalert';
import RouteButton from './RouteButton';
import Payment from './Payment';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },

});

var selectedService = "";

class NewOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            services: [],
            serviceType: '',
            name: '',
            Phone: '',
            customer: '',
            CustomerName: '',
            StartDate: new Date().toISOString().split('T')[0], //date today
            FinalDate: '',
            StatusPayment: '',
            NumCostumer: '',
            ServiceCode: '',
            LocationOrder: '',
            isLoaded: false,
            error: null,
            showComponent: false,
            StatusOrder: 'חדשה',
            myArray: [],
            showPayment: false,

        }
        this.handleChange = this.handleChange.bind(this);
        this.checkExsitsCustomer = this.checkExsitsCustomer.bind(this);
        this.handlePhone = this.handlePhone.bind(this);
        this.handlePayment = this.handlePayment.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.AddDivServices = this.AddDivServices.bind(this);
        this.onRemoveItem = this.onRemoveItem.bind(this);

        this.refsArr = [];
        this.selName = null;
        this.selVal = null;
        this.pricetotalOrder = 0;//new9.6
    }

    componentDidMount() {
        if (window.location.hostname === "localhost") {
            fetch('http://localhost:49934/api/services')
                .then(this.handleErrors)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        isLoaded: true,
                        services: data,
                    })
                })
                .catch(error => this.setState({ error: "There was an error in getting the services" }));
        } else {
            fetch('http://proj.ruppin.ac.il/bgroup81/prod/api/services')
                .then(this.handleErrors)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        isLoaded: true,
                        services: data,
                    })
                })
                .catch(error => this.setState({ error: "There was an error in getting the services" }));
        }
    }

    handleErrors = (response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }

    handleChange(event) {
        // this.setState({ [event.target.name]: event.target.value });
        this.selName = event.target.name;
        this.selVal = event.target.value;

        this.setState({ showComponent: true });
    }

    handlePhone(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handlePayment(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    checkExsitsCustomer() {
        if (window.location.hostname === "localhost") {
            fetch('http://localhost:49934/api/Costumer/' + this.state.Phone)
                .then(this.handleErrors)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        isLoaded: true,
                        customer: data,
                        CustomerName: data.Name,
                        NumCostumer: data.Id
                    })

                    if (data.Id === 0) {
                        swal("הלקוח לא קיים במערכת!");

                    } else
                        swal("הלקוח קיים במערכת!");

                })
                .catch(error => this.setState({ error: "There was an error in getting customer details" }));
            swal(this.state.error);
            console.log(this.state.error);
        } else {

            fetch('http://proj.ruppin.ac.il/bgroup81/prod/api/Costumer/' + this.state.Phone)
                .then(this.handleErrors)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        isLoaded: true,
                        customer: data,
                        CustomerName: data.Name,
                        NumCostumer: data.Id
                    })

                    if (data.Id === 0) {
                        swal("הלקוח לא קיים במערכת!");

                    } else
                        swal("הלקוח קיים במערכת!");

                })
                .catch(error => this.setState({ error: "There was an error in getting customer details" }));
            swal(this.state.error);
            console.log(this.state.error);
        }
    }

    handleSubmit(event) {

        event.preventDefault();



        if (window.location.hostname === "localhost") {
            const url = 'http://localhost:49934/api/Order'
            const data = {
                StartDate: this.state.StartDate,
                FinalDate: this.state.FinalDate,
                StatusPayment: this.localDataStatusPay,
                StatusOrder: this.state.StatusOrder,
                NumCostumer: this.state.NumCostumer,

                Tax: 1.17,
                MethodOfPayment: this.localDataMethodOfPay,
                PaidOnAccount: this.localDataPaidOnAccount,
                LocationOrder: this.state.LocationOrder,
                TotalOrder: this.pricetotalOrder,
            }
            fetch(url, {
                method: 'POST', // or ‘PUT’

                body: JSON.stringify(data), // data can be `string` or {object}!

                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {

                    this.refsArr.map((elm, i) => {
                        elm.current.Addservices(i);
                    });
                    swal("ההזמנה נוספה בהצלחה", "", "success");
                })
                .catch(error => console.error('Error:', error))
        } else {
            const url = 'http://proj.ruppin.ac.il/bgroup81/prod/api/Order'
            const data = {
                StartDate: this.state.StartDate,
                FinalDate: this.state.FinalDate,
                StatusPayment: this.localDataStatusPay,
                StatusOrder: this.state.StatusOrder,
                NumCostumer: this.state.NumCostumer,
                Tax: 1.17,
                MethodOfPayment: this.localDataMethodOfPay,
                PaidOnAccount: this.localDataPaidOnAccount,
                LocationOrder: this.state.LocationOrder,
                TotalOrder: this.pricetotalOrder,
            }
            fetch(url, {
                method: 'POST', // or ‘PUT’

                body: JSON.stringify(data), // data can be `string` or {object}!

                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {

                    this.refsArr.map((elm, i) => {
                        elm.current.Addservices(i);
                    });
                    swal("ההזמנה נוספה בהצלחה", "", "success");
                })
                .catch(error => console.error('Error:', error))
        }
    }

    AddDivServices() {

        this.setState({ [this.selName]: this.selVal });
        selectedService = this.selVal;

        let temp = React.createRef();
        this.refsArr = [...this.refsArr, temp];

        //debugger;
        let comp = null;
        switch (selectedService) {
            case '1':
                comp = <FramingPicture ref={this.refsArr[this.refsArr.length - 1]} />;
                break;
            case '2':
                comp = <FramingMirror ref={this.refsArr[this.refsArr.length - 1]} />;
                break;
            case '3':
                comp = <CutMirror ref={this.refsArr[this.refsArr.length - 1]} />;
                break;
            case '4':
                comp = <CutGlass ref={this.refsArr[this.refsArr.length - 1]} />;
                break;
            case '5':
                comp = <KanvasPictures ref={this.refsArr[this.refsArr.length - 1]} />;
                break;
        }
        return this.setState(previousState => ({ myArray: [...previousState.myArray, comp] }));
    }



    onRemoveItem(index) {
        if (index !== -1) {
            this.refsArr.splice(index, 1);
            var array = [...this.state.myArray]; // make a separate copy of the array      
            array.splice(index, 1);
            this.setState({ myArray: array });
        }
        // console.log('refsArr.length= ', this.refsArr.length);
    }

    getPrice() {
        this.refsArr.map(elm => {
            this.pricetotalOrder += elm.current.CalculatePrice();
        });
        return this.pricetotalOrder;
    }

    showComponentPayment() {
        this.setState({ showPayment: true })
    }

    getDataStatusPayment = (data) => {
        this.localDataStatusPay = data;
    }
    getDataMethodOfPayment = (data) => {
        this.localDataMethodOfPay = data;
    }

    getDataPaidOnAccount = (data) => {
        this.localDataPaidOnAccount = data;
    }

    render() {
        //console.log('refsArr.length=', this.refsArr.length);
        if (this.state.services.length === 0) {
            console.log("empty");
            return null;
        }
        else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <div className='customer'>
                        <h1>יצירת הזמנה חדשה</h1>
                        <h3>האם הלקוח קיים במערכת?</h3>
                        <TableSortLabel>הזן את טלפון הלקוח:</TableSortLabel>
                        <TextField id="phone" placeholder="טלפון לקוח" name='Phone' onChange={this.handlePhone} required></TextField> &nbsp;
                    <TableSortLabel>שם לקוח</TableSortLabel>
                        <TextField disabled={true} placeholder="שם לקוח" name='CustomerName' value={this.state.CustomerName}></TextField> &nbsp;
                    <Button variant="outlined" color="primary" onClick={this.checkExsitsCustomer}>בדיקת לקוח קיים</Button> &nbsp; &nbsp;
                    <RouteButton value='הוספת לקוח חדש' pathname='/InsertCustomer' />
                    </div>
                    <div className='detailsOrder'>
                        <h3>פרטי הזמנה</h3>
                        <TableSortLabel>תאריך קבלת עבודה:</TableSortLabel>
                        <TextField type="date" name='StartDate' value={this.state.StartDate} onChange={this.handlePayment}></TextField><br />
                        <TableSortLabel>תאריך סיום עבודה:</TableSortLabel>&nbsp;&nbsp;
                        <TextField type="date" name='FinalDate' onChange={this.handlePayment}></TextField><br />
                    </div>

                    <div className='ServicesInOrder'>
                        <h3>הוספת שירות להזמנה</h3>
                        {this.state.myArray.map((row, index) => (
                            <div key={index}>
                                {row}
                                {this.state.showPayment == false ?
                                    <IconButton aria-label="Delete" className={styles.margin} onClick={() => this.onRemoveItem(index)}>
                                        <DeleteIcon fontSize="large" />
                                    </IconButton> : ''}
                                <hr />
                            </div>
                        ))}

                        {this.state.showPayment == false && this.state.Phone != '' ?
                            <select onChange={this.handleChange}>
                                <option value="">
                                    בחר שירות
                               </option>
                                {this.state.services.map(service => (
                                    <option key={service.ServiceCode} value={service.ServiceCode}>
                                        {service.Name}
                                    </option>
                                ))}
                            </select> : ''}&nbsp; &nbsp;

                        {this.state.showComponent && this.state.showPayment == false ?
                            <Fab size="small" aria-label="Add" className={styles.margin} onClick={() => this.AddDivServices()}>
                                <AddIcon />
                            </Fab> : ''}
                        <br /><br />

                        {this.state.showPayment ? <Payment sendData1={this.getDataMethodOfPayment} sendData2={this.getDataStatusPayment} sendData3={this.getDataPaidOnAccount} totalprice={this.getPrice()} ></Payment> : ''}
                        &nbsp; &nbsp;
                        <div className="divSend">
                            {this.state.showComponent & this.state.showPayment == false ? <Button variant="contained" color="secondary" onClick={() => this.showComponentPayment()} >עבור לתשלום</Button> : <Button variant="contained" disabled>עבור לתשלום</Button>}
                            &nbsp; &nbsp;
                            {this.state.showPayment ? <Button type='submit' variant="contained" color="primary" > שלח הזמנה</Button>
                                : <Button variant="contained" disabled> שלח הזמנה</Button>}<br />
                        </div>
                    </div>
                </form>
            )
        }
    }
}

export default NewOrder;
