import React from 'react';
import { TextField, InputLabel, TableSortLabel } from '@material-ui/core';

import GetFrames from './GetFrames';
import './Style.css';
import swal from 'sweetalert';

class FramingMirror extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Height: '',
            Width: '',
            Notes: '',
            ServiceCode: 2,
            FrameCode: '',
            MirrorCode: 4,
            priceTotalFrame: 0,
            missionframeMirror: [],
        }

        this.handleChange = this.handleChange.bind(this);
        this.Addservices = this.Addservices.bind(this);
        this.CalculatePrice = this.CalculatePrice.bind(this);
        this.localDataFrame = null;
        this.localDataFramePrice = null;
        this.PriceTotal = null;
        this.mirrorPrice = 150;
    }


    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    Addservices = (i) => {

        if (window.location.hostname === "localhost") {
            const url = 'http://localhost:49934/api/FrameMirror';
            const data = {
                Id: i,
                Height: this.state.Height,
                Width: this.state.Width,
                ServiceCode: this.state.ServiceCode,
                FrameCode: this.localDataFrame,
                MirrorCode: 4,
                Notes: this.state.Notes,
                PriceToOne: Math.round(this.PriceTotal),
            }
            fetch(url, {
                method: 'POST', // or ‘PUT’
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {
                    // swal("מסגור מראה נוסף בהצלחה");
                })
                .catch(error => console.error('Error:', error))
        }
        else {

            const url = 'http://proj.ruppin.ac.il/bgroup81/prod/api/FrameMirror';
            const data = {
                Id: i,
                Height: this.state.Height,
                Width: this.state.Width,
                ServiceCode: this.state.ServiceCode,
                FrameCode: this.localDataFrame,
                MirrorCode: 4,
                Notes: this.state.Notes,
                PriceToOne: Math.round(this.PriceTotal),
            }
            fetch(url, {
                method: 'POST', // or ‘PUT’

                body: JSON.stringify(data), // data can be `string` or {object}!

                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {
                    // swal("מסגור מראה נוסף בהצלחה");
                })
                .catch(error => console.error('Error:', error))
        }

    }


    getDataFrames = (data) => {
        this.localDataFrame = data.Makat;
        this.localDataFramePrice = data.PricePerMeter;
        this.setState({ priceTotalFrame: (2 * (this.state.Height / 100 + this.state.Width / 100)) * this.localDataFramePrice });
    }

    CalculatePrice = () => {

        if (this.state.Height != '' & this.state.Width != '' & this.localDataFrame != null) {
            let priceTotalMirror = (this.state.Height * this.state.Width * this.mirrorPrice) / 10000;
            this.PriceTotal = priceTotalMirror + this.state.priceTotalFrame;
            return Math.round(this.PriceTotal);
        }
        return 'חסר מידע';
    }

    render() {

        return (
            <div>
                <h4>מסגור מראה</h4>
                <TableSortLabel>אורך</TableSortLabel>
                <TextField placeholder="אורך" value={this.props.Height} name="Height" onChange={this.handleChange} type="number" inputProps={{ min: "1", max: "300" }}></TextField> &nbsp;
                <TableSortLabel>רוחב</TableSortLabel>
                <TextField placeholder="רוחב" value={this.props.Width} name="Width" onChange={this.handleChange} type="number" inputProps={{ min: "1", max: "300" }} ></TextField>  &nbsp;
                <TableSortLabel> מסגרת: &nbsp; <GetFrames sendDataFrame={this.getDataFrames} compShowSpecific={this.props.compShowSpecific} FrameCode={this.props.FrameCode} required /></TableSortLabel>  &nbsp;
                <TableSortLabel >הערות</TableSortLabel>
                <TextField
                    name="Notes"
                    onChange={this.handleChange}
                    id="outlined-bare"
                    margin="normal"
                    variant="outlined"
                    value={this.props.Notes}
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
                <br /><br />
            </div>
        )
    }
}

export default FramingMirror;
