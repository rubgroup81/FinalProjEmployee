import React from 'react';
import { TextField, InputLabel, TableSortLabel, Checkbox } from '@material-ui/core';
import GetMirrors from './GetMirrors';
import './Style.css';
import swal from 'sweetalert';
import Button from '@material-ui/core/Button';




class CutMirror extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Height: '',
            Width: '',
            Faza: 0,
            Remarks: '',
            ServiceCode: 3,
            ProductCode: '',
            totalPrice: '',
            PriceToOne: '',
            localDataMirrorPrice: null,
            missionCut: [],

            priceFaza: 0,
            isChecked: true,

        }
        this.handleChange = this.handleChange.bind(this);
        this.Addservices = this.Addservices.bind(this);
        this.localDataMirrorMakat = null;
        this.handleClick = this.handleClick.bind(this);
        this.CalculatePrice = this.CalculatePrice.bind(this);
        this.PriceTotal = null;
        // this.localDataMirrorPrice = null;

    }




    Addservices = (i) => {

        if(window.location.hostname === "localhost"){
            const url = 'http://localhost:49934/api/CutMirrorAndGlass';
            const data = {
                Id: i,
                Height: this.state.Height,
                Width: this.state.Width,
                ServiceCode: 3,
                Faza: this.state.Faza,
                Remarks: this.state.Remarks,
                ProductCode: this.localDataMirrorMakat,
                PriceToOne: this.PriceTotal + this.state.priceFaza,
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
                ServiceCode: 3,
                Faza: this.state.Faza,
                Remarks: this.state.Remarks,
                ProductCode: this.localDataMirrorMakat,
                PriceToOne: this.PriceTotal + this.state.priceFaza,
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
        this.localDataMirrorMakat = data.Makat;
        this.setState({ localDataMirrorPrice: data.PricePerSquareMeter })
    }

    handleClick(e) {
        this.setState({
            isChecked: !this.state.isChecked,
        });

        this.state.isChecked ? this.setState({ Faza: 1, priceFaza: (2 * (this.state.Height / 100 + this.state.Width / 100) * 50), })
            : this.setState({ Faza: 0, priceFaza: 0, });
    }


    CalculatePrice = () => {

        if (this.state.Height != '' & this.state.Width != '' & this.state.localDataMirrorPrice != null) {
            this.PriceTotal = (this.state.Height * this.state.Width * this.state.localDataMirrorPrice) / 10000;
            return Math.round(this.PriceTotal + this.state.priceFaza);
        }
        return 'חסר מידע';
    }


    render() {


        return (
            <div>
                <h4>חיתוך מראה</h4>
                <TableSortLabel>אורך:</TableSortLabel>
                <TextField placeholder="אורך" value={this.props.Height} name="Height" onChange={this.handleChange}  type="number" inputProps={{ min: "1", max: "300" }} required></TextField> &nbsp;
            <TableSortLabel>רוחב:</TableSortLabel>
                <TextField placeholder="רוחב" value={this.props.Width} name="Width" onChange={this.handleChange}  type="number" inputProps={{ min: "1", max: "300" }} required></TextField>  &nbsp;
         
            <TableSortLabel> מראה: &nbsp;      
	           <GetMirrors sendData={this.getData} compShowSpecific={this.props.compShowSpecific} MirrorCode={this.props.MirrorCode} required />
            </TableSortLabel> &nbsp;        
          
            <TableSortLabel name="Faza" onClick={this.handleClick} value={this.props.Faza} checked={this.state.isChecked}>פאזה <Checkbox checked={this.props.Faza} color="primary"/></TableSortLabel>

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

            </div >
        )

    }
}

export default CutMirror;
