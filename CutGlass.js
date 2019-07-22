import React from 'react';
import { TextField, InputLabel, TableSortLabel, Checkbox } from '@material-ui/core';
import GetGlasses from './GetGlasses';
import './Style.css';
import swal from 'sweetalert';
import Button from '@material-ui/core/Button';

class CutGlass extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Height: '',
            Width: '',
            Faza: 0,
            Remarks: '',
            ServiceCode: 4,
            ProductCode: '',
            localDataGlassPrice: null,
            missionCut: [],
        }
        this.handleChange = this.handleChange.bind(this);
        this.Addservices = this.Addservices.bind(this);
        this.localDataGlass = null;
        this.PriceTotal = null;
    }    

    Addservices = (i) => {
        if(window.location.hostname === "localhost"){     
        const url = 'http://localhost:49934/api/CutMirrorAndGlass';
        const data = {
            Id: i,
            Height: this.state.Height,
            Width: this.state.Width,
            ServiceCode: this.state.ServiceCode,
            Faza: this.state.Faza,
            Remarks: this.state.Remarks,
            ProductCode: this.localDataGlass,
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
        else{ 
            const url = 'http://proj.ruppin.ac.il/bgroup81/prod/api/CutMirrorAndGlass';
            const data = {
                Id: i,
                Height: this.state.Height,
                Width: this.state.Width,
                ServiceCode: this.state.ServiceCode,
                Faza: this.state.Faza,
                Remarks: this.state.Remarks,
                ProductCode: this.localDataGlass,
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

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    getData = (data) => {
        this.localDataGlass = data.Makat;
        this.setState({ localDataGlassPrice: data.PricePerSquareMeter });
    }

    CalculatePrice = () => {
        if (this.state.Height != '' & this.state.Width != '' & this.localDataGlass != null) {

            this.PriceTotal = (this.state.Height * this.state.Width * this.state.localDataGlassPrice) / 10000;//total price glass            

            return Math.round(this.PriceTotal);
        }
        return 'חסר מידע';
    }
  
    render() {

        return (
            <div>
                <h4>חיתוך זכוכית</h4>
                <TableSortLabel>אורך:</TableSortLabel>
                <TextField placeholder="אורך" value={this.props.Height} name="Height" onChange={this.handleChange} type="number" inputProps={{ min: "1", max: "300" }}></TextField> &nbsp;
            <TableSortLabel>רוחב:</TableSortLabel>
                <TextField placeholder="רוחב" name="Width" value={this.props.Width} onChange={this.handleChange} type="number" inputProps={{ min: "1", max: "300" }}></TextField>  &nbsp;

            <TableSortLabel>  זכוכית:  &nbsp;	
           <GetGlasses sendData={this.getData} picFits={0} value={this.props.localDataGlass} compShowSpecific={this.props.compShowSpecific} GlassCode={this.props.GlassCode} required/> </TableSortLabel>  &nbsp;
          
            <TableSortLabel>הערות</TableSortLabel>
                <TextField
                    name="Remarks"
                    onChange={this.handleChange}
                    id="outlined-bare"
                    margin="normal"
                    variant="outlined"
                    value={this.props.Remarks}
                />
                <br />
                {this.props.compShowSpecific === 1 ?
                    <div><TableSortLabel>סה"כ מחיר</TableSortLabel>
                        <TextField placeholder="מחיר" name="PriceToOne" value={this.props.PriceToOne}  type="number" inputProps={{ min: "1", max: "999" }} disabled></TextField>
                    </div> :
                    <div>
                        <TableSortLabel>סה"כ מחיר</TableSortLabel>
                        <TextField placeholder="מחיר" name="PriceToOne" value={this.CalculatePrice()}  type="number" inputProps={{ min: "1", max: "999" }} disabled></TextField>
                    </div>
                }
            </div>
        )
    }
}

export default CutGlass;
