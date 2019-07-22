import React from 'react';
import { TextField, InputLabel, TableSortLabel, FormLabel, InputAdornment, Button, Checkbox } from '@material-ui/core';
import GetGlasses from './GetGlasses';
import GetFrames from './GetFrames';
import GetPasspartu from './GetPasspartu';
import './Style.css';
import swal from 'sweetalert';

class FramingPicture extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Height: '',
            Width: '',
            PaspartuWidth: 0,
            ServiceCode: 1,
            FrameCode: '',
            PaspartuCode: 33,
            GlassCode: '',

            missionsToService: [],
            missionsFrameingPicture: [],
            isEditMode: false,
            isEditMode2: false,


            isChecked: true,

            localDataGlassPrice: null,
            localDataFramePrice: null,
            localDataPassPrice: null,

        }
        this.handleChange = this.handleChange.bind(this);
        this.Addservices = this.Addservices.bind(this);
        this.localDataGlass = null;
        this.localDataFrame = null;
        this.localDataPass = 33;
        this.PriceTotal = 0;
    }


    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    Addservices = (i) => {

        if (window.location.hostname === "localhost") {
            const url = 'http://localhost:49934/api/FramePicture';
            const data = {
                Id: i,
                Height: this.state.Height,
                Width: this.state.Width,
                PaspartuWidth: this.state.PaspartuWidth,
                ServiceCode: this.state.ServiceCode,
                FrameCode: this.localDataFrame,
                PaspartuCode: this.localDataPass,
                GlassCode: this.localDataGlass,
                PriceToOne: this.PriceTotal,
            }
            fetch(url, {
                method: 'POST', // or ‘PUT’

                body: JSON.stringify(data), // data can be `string` or {object}!

                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {
                    // swal("הפריט נוסף בהצלחה");
                })
                .catch(error => console.error('Error:', error))

        } else {
            const url = 'http://proj.ruppin.ac.il/bgroup81/prod/api/FramePicture';
            const data = {
                Id: i,
                Height: this.state.Height,
                Width: this.state.Width,
                PaspartuWidth: this.state.PaspartuWidth,
                ServiceCode: this.state.ServiceCode,
                FrameCode: this.localDataFrame,
                PaspartuCode: this.localDataPass,
                GlassCode: this.localDataGlass,
                PriceToOne: this.PriceTotal,
            }
            fetch(url, {
                method: 'POST', // or ‘PUT’
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {
                    // swal("הפריט נוסף בהצלחה");
                })
                .catch(error => console.error('Error:', error))
        }
    }

    //glass
    getData = (data) => {
        this.localDataGlass = data.Makat;
        this.setState({ localDataGlassPrice: data.PricePerSquareMeter });
    }

    //frame
    getDataFrames = (data) => {
        this.localDataFrame = data.Makat;
        this.setState({ localDataFramePrice: data.PricePerMeter });
    }

    //passpartu
    getDataPass = (data) => {
        this.localDataPass = data.Makat;
        { this.localDataPass == 33 ? this.setState({ localDataPassPrice: 0 }) : this.setState({ localDataPassPrice: 40 }) }
    }

    CalculatePrice = () => {

        if (this.state.Height != '' & this.state.Width != '' & this.localDataFrame != null & this.localDataGlass != null) {

            this.PriceTotal = (this.state.Height * this.state.Width * this.state.localDataGlassPrice) / 10000;//total glass
            this.PriceTotal += (2 * (this.state.Height / 100 + this.state.Width / 100)) * this.state.localDataFramePrice;//total frame
            this.PriceTotal += this.state.localDataPassPrice;// totalPasspartu          

            return Math.round(this.PriceTotal);
        }
        return 'חסר מידע';
    }


    render() {
        return (
            <div>
                <h4>מסגור תמונה</h4>
                <TableSortLabel>אורך:</TableSortLabel>
                <TextField placeholder="אורך" name="Height" value={this.props.Height} onChange={this.handleChange} type="number" inputProps={{ min: "1", max: "300" }} ></TextField> &nbsp;
                <TableSortLabel>רוחב:</TableSortLabel>
                <TextField placeholder="רוחב" name="Width" value={this.props.Width} onChange={this.handleChange} type="number" inputProps={{ min: "1", max: "300" }} ></TextField>  &nbsp;
                <TableSortLabel value={this.props.Type}>  זכוכית:  &nbsp;<GetGlasses sendData={this.getData} picFits={1} value={this.props.Type} compShowSpecific={this.props.compShowSpecific} GlassCode={this.props.GlassCode} required /> </TableSortLabel>  &nbsp;
                <TableSortLabel name="FrameCode" > מסגרת: &nbsp; <GetFrames sendDataFrame={this.getDataFrames} compShowSpecific={this.props.compShowSpecific} FrameCode={this.props.FrameCode} required /></TableSortLabel>
                <TableSortLabel name="PaspartuCode" > פספרטו:  &nbsp; <GetPasspartu sendDataPass={this.getDataPass}
                    compShowSpecific={this.props.compShowSpecific} PaspartuCode={this.props.PaspartuCode} required /></TableSortLabel>

                <TableSortLabel >רוחב פספרטו:</TableSortLabel>
                <TextField name="PaspartuWidth" value={this.props.PaspartuWidth} placeholder="רוחב פספרטו" onChange={this.handleChange} type="number" inputProps={{ min: "1", max: "30" }} ></TextField> &nbsp;<br />
                <TableSortLabel>הערות</TableSortLabel>
                <TextField
                    id="outlined-bare"
                    margin="normal"
                    variant="outlined"
                />
                <br />
                {this.props.compShowSpecific === 1 ?
                    <div><TableSortLabel>סה"כ מחיר</TableSortLabel>
                        <TextField placeholder="מחיר" name="PriceToOne" value={this.props.PriceToOne} type="number" inputProps={{ min: "1", max: "999" }} disabled></TextField>
                    </div> :
                    <div>
                        <TableSortLabel>סה"כ מחיר</TableSortLabel>
                        <TextField placeholder="מחיר" name="PriceToOne" value={this.CalculatePrice()} type="number" inputProps={{ min: "1", max: "999" }} disabled></TextField>
                    </div>
                }

            </div>
        )
    }
}

export default FramingPicture;
