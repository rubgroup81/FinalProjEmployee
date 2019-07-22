import React from 'react'
import RouteButton from './RouteButton'

import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import ShowOrders from './ShowOrders';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import KanvasPictures from './KanvasPictures';

import FramingPicture from './FramingPicture';
import FramingMirror from './FramingMirror';
import CutGlass from './CutGlass';
import CutMirror from './CutMirror';
import Payment from './Payment';
import AddInvoice from './AddInvoice';


import { TextField, InputLabel, TableSortLabel, Checkbox } from '@material-ui/core';
import GetGlasses from './GetGlasses';
import Mission from './Mission';



const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',


    },
    input: {
        margin: theme.spacing.unit,
    },
});


class ShowSpecificOrder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            order: '',
            customer: '',
            error: null,
            position: 0,
            cutMirrorAndGlass: [],
            framePicture: [],
            frameMirror: [],
            picKanvas: [],
            missionsToService: [],
            StatusOrder: '',
            missionframeMirror: [],
            missionsFrameingPicture: [],
            missionCut: [],

            StatusPayment: '',
            MethodOfPayment: '',
            PaidOnAccount: '',
            TotalOrder: '',
            LocationOrder: '',

            isEditMode: false,
            isEditMode2: false,

            showMissions: 1,
            missionToItem: [],
        }

        this.handlePayment = this.handlePayment.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    componentDidMount() {

        let numOrder = this.props.match.params.id;

        if (window.location.hostname === "localhost") {
            fetch('http://localhost:49934/api/OrderSpecific/' + numOrder)
                .then(this.handleErrors)
                .then(response => response.json())

                .then(data => {
                    this.setState({
                        isLoaded: true,
                        order: data,
                        NumberOrder: data.NumberOrder,
                        StartDate: data.StartDate,
                        FinalDate: data.FinalDate,
                        StatusOrder: data.StatusOrder,
                        StatusPayment: data.StatusPayment,
                        MethodOfPayment: data.MethodOfPayment,
                        PaidOnAccount: data.PaidOnAccount,
                        TotalOrder: data.TotalOrder,
                    })

                    this.GetCustomer(this.state.order.NumCostumer);// Customer
                    this.GetServices(numOrder);// Services                  
                    //console.log(this.state.order);
                })
                .catch(error => this.setState({ error: "There was an error in getting the orders" }));
        }
        else {
            fetch('http://proj.ruppin.ac.il/bgroup81/prod/api/OrderSpecific/' + numOrder)
                .then(this.handleErrors)
                .then(response => response.json())

                .then(data => {
                    this.setState({
                        isLoaded: true,
                        order: data,
                        NumberOrder: data.NumberOrder,
                        StartDate: data.StartDate,
                        FinalDate: data.FinalDate,
                        StatusOrder: data.StatusOrder,
                        StatusPayment: data.StatusPayment,
                        MethodOfPayment: data.MethodOfPayment,
                        PaidOnAccount: data.PaidOnAccount,
                        TotalOrder: data.TotalOrder,
                    })

                    this.GetCustomer(this.state.order.NumCostumer);
                    this.GetServices(numOrder);// Services                  
                })
                .catch(error => this.setState({ error: "There was an error in getting the orders" }));
        }
    }

    GetCustomer(idCustomer) {
        if (window.location.hostname === "localhost") {
            fetch('http://localhost:49934/api/CostumerSpecific/' + idCustomer)
                .then(this.handleErrors)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        isLoaded: true,
                        customer: data,
                    })

                })
                .catch(error => this.setState({ error: "There was an error in getting the customer" }));
        }
        else {
            fetch('http://proj.ruppin.ac.il/bgroup81/prod/api/CostumerSpecific/' + idCustomer)
                .then(this.handleErrors)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        isLoaded: true,
                        customer: data,
                    })


                })
                .catch(error => this.setState({ error: "There was an error in getting the customer" }));
        }
    }

    GetServices(idOrder) {
        if (window.location.hostname === "localhost") {
            Promise.all([
                fetch('http://localhost:49934/api/CutMirrorAndGlass/' + idOrder),
                fetch('http://localhost:49934/api/FramePicture/' + idOrder),
                fetch('http://localhost:49934/api/FrameMirror/' + idOrder),
                fetch('http://localhost:49934/api/AllFinalProduct/' + idOrder),
            ])
                .then(([res1, res2, res3, res4]) => Promise.all([res1.json(), res2.json(), res3.json(), res4.json()]))
                .then(res => {
                    this.setState({ cutMirrorAndGlass: res[0], framePicture: res[1], frameMirror: res[2], picKanvas: res[3] })

                }).catch(error => this.setState({ error: "There was an error in getting the Services" }));
        } else {

            Promise.all([
                fetch('http://proj.ruppin.ac.il/bgroup81/prod/api/CutMirrorAndGlass/' + idOrder),
                fetch('http://proj.ruppin.ac.il/bgroup81/prod/api/FramePicture/' + idOrder),
                fetch('http://proj.ruppin.ac.il/bgroup81/prod/api/FrameMirror/' + idOrder),
                fetch('http://proj.ruppin.ac.il/bgroup81/prod/api/AllFinalProduct/' + idOrder),
            ])
                .then(([res1, res2, res3, res4]) => Promise.all([res1.json(), res2.json(), res3.json(), res4.json()]))
                .then(res => {
                    this.setState({ cutMirrorAndGlass: res[0], framePicture: res[1], frameMirror: res[2], picKanvas: res[3] })

                }).catch(error => this.setState({ error: "There was an error in getting the Services" }));


        }
    }

    handleErrors = (response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }


    handlePayment(event) {
        this.setState({ [event.target.name]: event.target.value });
    }


    onChangeHandler = (e) => {
        const name = e.target.name;
        this.setState({ [name]: e.target.value })
    }

    onClickHandler() {

        if (this.state.isEditMode) {
            //const data = { ...this.state };
            // send to DB 

            if (window.location.hostname === "localhost") {
                const url = 'http://localhost:49934/api/Order/updateOrder';
                var data = {
                    NumberOrder: this.state.NumberOrder,
                    StartDate: this.state.StartDate,
                    FinalDate: this.state.FinalDate,
                    StatusOrder: this.state.StatusOrder,
                    StatusPayment: this.state.StatusPayment,
                    LocationOrder: this.state.LocationOrder,
                    MethodOfPayment: this.state.MethodOfPayment,
                    PaidOnAccount: this.state.PaidOnAccount,
                }
                fetch(url, {
                    method: 'POST', // or ‘PUT’
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data), // data can be `string` or {object}!

                })
                    .then(response => {
                    })
                    .catch(error => console.error('Error:', error))


            } else {
                const url = 'http://proj.ruppin.ac.il/bgroup81/prod/api/Order/updateOrder';
                var data = {
                    NumberOrder: this.state.NumberOrder,
                    StartDate: this.state.StartDate,
                    FinalDate: this.state.FinalDate,
                    StatusOrder: this.state.StatusOrder,
                    StatusPayment: this.state.StatusPayment,
                    LocationOrder: this.state.LocationOrder,
                    MethodOfPayment: this.state.MethodOfPayment,
                    PaidOnAccount: this.state.PaidOnAccount,
                }
                fetch(url, {
                    method: 'POST', // or ‘PUT’
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data), // data can be `string` or {object}!

                })
                    .then(response => {
                    })
                    .catch(error => console.error('Error:', error))


            }

        }
        this.setState({ isEditMode: !this.state.isEditMode })
    };

    getDataStatusPayment = (data) => {//from comp Payment
        this.setState({ StatusPayment: data })
    }

    getDataMethodOfPayment = (data) => {//from comp Payment
        this.setState({ MethodOfPayment: data })
    }

    getDataPaidOnAccount = (data) => {//from comp Payment
        this.setState({ PaidOnAccount: data })
    }



    render() {
        const { StartDate, FinalDate, StatusOrder, StatusPayment, isEditMode, isEditMode2 } = this.state;
        return (
            <div className={styles.container} >

                <div className="customer">
                    <h1>הזמנה מספר: <u>{this.props.match.params.id}</u></h1>
                    <h3><u>פרטי לקוח:</u></h3>
                    <TextField id="filled-name" type="text" name="Name" label="שם לקוח" value={this.state.customer.Name} margin="normal" variant="filled" /> &nbsp;
                    <TextField id="filled-tel" type="telepone" name="Tel" label="טלפון" value={this.state.customer.Tel} margin="normal" variant="filled" /> &nbsp;
                    <TextField id="filled-email" type="email" name="Email" label="מייל" value={this.state.customer.Email} margin="normal" variant="filled" /> &nbsp;
                    <TextField id="filled-address" type="address" name="Address" label="כתובת" value={this.state.customer.Address} margin="normal" variant="filled" /> &nbsp; &nbsp;
                </div>


                <div className="detailsOrder">
                    <h3><u>פרטי הזמנה:</u></h3>
                    תאריך קבלת עבודה: &nbsp;
                    <FormControl>
                        {isEditMode ? <Input type="text" name="StartDate" onChange={this.onChangeHandler} value={StartDate} disabled /> : <Input type="text" name="StartDate" value={StartDate} disabled />}
                    </FormControl><br />
                    תאריך סיום משוער: &nbsp;
                    <FormControl>
                        {isEditMode ? <Input type="date" name="FinalDate" onChange={this.onChangeHandler} value={FinalDate} /> : <Input type="text" name="FinalDate" value={FinalDate} disabled />}
                    </FormControl><br />
                    סטטוס הזמנה:  &nbsp;
                    <FormControl>
                        {isEditMode ? <Select value={StatusOrder}
                            onChange={this.onChangeHandler}
                            inputProps={{
                                name: 'StatusOrder',
                            }}>
                            <MenuItem value="חדשה"> חדשה </MenuItem>
                            <MenuItem value="בתהליך"> בהתהליך </MenuItem>
                            <MenuItem value="מוכנה">  מוכנה </MenuItem>
                            <MenuItem value="בוטל">  בוטל </MenuItem>

                        </Select> : <Input type="text" name="StatusOrder" value={StatusOrder} disabled />}
                    </FormControl><br /><br />

                    <Payment
                        compShowSpecific={1}
                        numOrder={this.props.match.params.id}
                        totalprice={this.state.TotalOrder}
                        statusPayment={this.state.StatusPayment}
                        methodOfPayment={this.state.MethodOfPayment}
                        paidOnAccount={this.state.PaidOnAccount}
                        sendData2={this.getDataStatusPayment}
                        sendData1={this.getDataMethodOfPayment}
                        sendData3={this.getDataPaidOnAccount}
                    >
                    </Payment>
                    <br />
                    <Button variant="contained" color="primary" onClick={() => this.onClickHandler()}>{isEditMode ? 'שמור' : 'עדכן פרטי הזמנה'}</Button>
                </div>

                <div className="ServicesInOrder">
                    <h3>פריטים:</h3>

                    {this.state.framePicture.map((row, i) => (
                        <div className="FrameingPicture" key={i}>

                            <FramingPicture Height={row.Height} Width={row.Width} PaspartuWidth={row.PaspartuWidth}
                                GlassCode={row.GlassCode} Notes={row.Notes} NumberOrder={this.state.NumberOrder}
                                ItemInOrder={row.Id} TaskStatus={row.TaskStatus} PriceToOne={row.PriceToOne} compShowSpecific={1}

                                FrameCode={row.FrameCode} PaspartuCode={row.PaspartuCode} showMissions={1}
                            ></FramingPicture>

                            <Mission NumberOrder={this.state.NumberOrder} ItemInOrder={row.Id} />
                            <hr />
                        </div>
                    ))}

                    {this.state.frameMirror.map((row, i) => (
                        <div className="FrameingMirror" key={i}>
                            <FramingMirror Height={row.Height} Width={row.Width} Notes={row.Notes} NumberOrder={this.state.NumberOrder}
                                ItemInOrder={row.Id} TaskStatus={row.TaskStatus} GlassCod={row.type} PriceToOne={row.PriceToOne} compShowSpecific={1}

                                showMissions={1} FrameCode={row.FrameCode}>
                            </FramingMirror>

                            <Mission NumberOrder={this.state.NumberOrder} ItemInOrder={row.Id} />
                            <hr />

                        </div>
                    ))}

                    {this.state.cutMirrorAndGlass.map((row, i) => (

                        <div className="CuttingMirrorAndGlass" key={i}>
                            {row.ServiceCode !== 3 ? <CutGlass Height={row.Height} Width={row.Width} Remarks={row.Remarks} NumberOrder={this.state.NumberOrder}
                                ItemInOrder={row.Id} TaskStatus={row.TaskStatus} PriceToOne={row.PriceToOne} compShowSpecific={1}
                                GlassCode={row.ProductCode} showMissions={1}>
                            </CutGlass> :
                                <CutMirror Height={row.Height} Width={row.Width} Remarks={row.Remarks} NumberOrder={this.state.NumberOrder}
                                    ItemInOrder={row.Id} TaskStatus={row.TaskStatus} PriceToOne={row.PriceToOne} compShowSpecific={1}

                                    MirrorCode={row.ProductCode} showMissions={1} Faza={row.Faza}
                                ></CutMirror>}

                            <Mission NumberOrder={this.state.NumberOrder} ItemInOrder={row.Id} />

                            <hr />
                        </div>
                    ))}

                    {this.state.picKanvas.map((row, i) => (
                        <div className="PicKanvas" key={i}>
                            <h4>תמונת קנבס:</h4>
                            <TableSortLabel>  תיאור:</TableSortLabel>
                            <TextField id="picName" value={row.Name}>{row.Name}</TextField>&nbsp;
                            <TableSortLabel>מידות:</TableSortLabel>
                            <TextField id="picSize" value={row.Length_Width}> {row.Length_Width}</TextField>&nbsp;
                            <TableSortLabel>מחיר:</TableSortLabel>
                            <TextField id="picPrice" value={row.Price}> {row.Price} </TextField><br /><br />
                            <hr />
                        </div>
                    ))}
                </div>
                <br />
                <RouteButton value=' חזור לטבלת הזמנות ' pathname={"/ShowOrders"} Component={ShowOrders} />&nbsp;
            </div>
        )
    }
}
export default ShowSpecificOrder


