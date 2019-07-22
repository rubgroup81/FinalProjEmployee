import React from 'react';
import swal from 'sweetalert';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { InputLabel, OutlinedInput, InputBase, TextField, FormLabel, TableSortLabel, DatePicker, InputAdornment } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import RouteButton from './RouteButton';

class Mirror extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Name: '',
            StatusInStock: '',
            InvitedStatus: '',
            CategoryNumber: 2,
            Type: '',
            SuitableForPicture: false,
            Thickness: '',
            PricePerSquareMeter: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.Addproduct = this.Addproduct.bind(this);
        this.handleInStock = this.handleInStock.bind(this);
        this.handleInvited = this.handleInvited.bind(this);
    }

    handleInvited(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleInStock(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    Addproduct = () => {
        let { Name, StatusInStock, InvitedStatus, Thickness, SuitableForPicture, PricePerSquareMeter, Type } = this.state;
        const data = { ...this.state };

        if (window.location.hostname === "localhost") {
            let url = 'http://localhost:49934/api/MirrorAndGlass?Name=' + Name + '&StatusInStock=' + StatusInStock + '&InvitedStatus=' + InvitedStatus + '&CategoryNumber=2' + '&PricePerSquareMeter=' + PricePerSquareMeter + '&Thickness=' + Thickness + '&Type=' + Type + '&SuitableForPicture=' + SuitableForPicture + ''

            fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {
                    swal("הפריט נוסף בהצלחה");
                })
                .catch(error => {
                    console.error('Error:', error)
                })

        } else {
            let url = 'http://proj.ruppin.ac.il/bgroup81/prod/api/MirrorAndGlass?Name=' + Name + '&StatusInStock=' + StatusInStock + '&InvitedStatus=' + InvitedStatus + '&CategoryNumber=2' + '&PricePerSquareMeter=' + PricePerSquareMeter + '&Thickness=' + Thickness + '&Type=' + Type + '&SuitableForPicture=' + SuitableForPicture + ''

            fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {
                    swal("הפריט נוסף בהצלחה");
                })
                .catch(error => {
                    console.error('Error:', error)
                })
        }
    };


    render() {

        return (
            <div>
                <div>
                    <h3>פרטים כלליים </h3>
                    <TableSortLabel>שם המוצר</TableSortLabel>
                    <TextField placeholder="מראה/זכוכית/לייסט/תמונה" name='Name' onChange={this.handleChange}></TextField><br />
                    <TableSortLabel>סטטוס במלאי</TableSortLabel>
                    <FormControl>
                        <Select value={this.state.StatusInStock}
                            onChange={this.handleInStock}
                            inputProps={{
                                name: 'StatusInStock',
                            }}>
                            <MenuItem value="">
                                <em>סטטוס מוצר במלאי</em>
                            </MenuItem>
                            <MenuItem value="לא במלאי"> לא במלאי </MenuItem>
                            <MenuItem value="במלאי">  במלאי </MenuItem>

                        </Select>
                    </FormControl>
                    <br></br>
                    <TableSortLabel>סטטוס הוזמן</TableSortLabel>
                    <FormControl>
                        <Select value={this.state.InvitedStatus}
                            onChange={this.handleInvited}
                            inputProps={{
                                name: 'InvitedStatus',
                            }}>
                            <MenuItem value="">
                                <em>סטטוס הוזמן</em>
                            </MenuItem>
                            <MenuItem value="false"> לא הוזמן </MenuItem>
                            <MenuItem value="true">  הוזמן </MenuItem>

                        </Select>
                    </FormControl>
                </div>
                <div>

                    <h4>פרטיי מראה/זכוכית</h4>
                    <TableSortLabel>סוג המראה</TableSortLabel>
                    <TextField placeholder="סוג הזכוכית/מראה" name="Type" onChange={this.handleChange}></TextField> &nbsp;
                <TableSortLabel>עובי</TableSortLabel>
                    <TextField placeholder="עובי" name="Thickness" onChange={this.handleChange}></TextField>  &nbsp;
                <TableSortLabel>מחיר למטר מרובע</TableSortLabel>
                    <TextField placeholder="מחיר" name="PricePerSquareMeter" onChange={this.handleChange}></TextField>  &nbsp;
                <TableSortLabel>מתאימה לתמונה</TableSortLabel>
                    <select name='SuitableForPicture' value={this.state.SuitableForPicture} onChange={this.handleChange}  >
                        <option value="true"  >
                            מתאים
             </option>
                        <option value="false">
                            לא מתאים
             </option>
                    </select>
                    <br /><br />
                    <Button variant="contained" onClick={() => this.Addproduct()}>הוספת מראה/זכוכית</Button><br />
                </div>
            </div>
        )

    }
}

export default Mirror;
