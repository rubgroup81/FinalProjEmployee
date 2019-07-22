import React from 'react';
import swal from 'sweetalert';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { InputLabel, OutlinedInput, InputBase, TextField, FormLabel, TableSortLabel, DatePicker, InputAdornment } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import RouteButton from './RouteButton';

class Frame extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Name: '',
            StatusInStock: '',
            InvitedStatus: '',
            CategoryNumber: 1,
            Type: '',
            PricePerMeter: '',
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
        let { Name, StatusInStock, InvitedStatus, PricePerMeter, Type } = this.state;
        const data = { ...this.state };

        if (window.location.hostname === "localhost") {
            let url = 'http://localhost:49934/api/Frame?Name=' + Name + '&StatusInStock=' + StatusInStock + '&InvitedStatus=' + InvitedStatus + '&CategoryNumber=1' + '&PricePerMeter=' + PricePerMeter + '&Type=' + Type + ''
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
        else {
            let url = 'http://proj.ruppin.ac.il/bgroup81/prod/api/Frame?Name=' + Name + '&StatusInStock=' + StatusInStock + '&InvitedStatus=' + InvitedStatus + '&CategoryNumber=1' + '&PricePerMeter=' + PricePerMeter + '&Type=' + Type + ''

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
                    <h4>פרטי לייסט</h4>
                    <TableSortLabel>סוג</TableSortLabel>
                    <TextField placeholder="סוג" name="Type" onChange={this.handleChange} ></TextField> &nbsp;
                <TableSortLabel>מחיר למטר מרובע</TableSortLabel>
                    <TextField placeholder="מחיר למטר מרובע" name="PricePerMeter" onChange={this.handleChange}></TextField>  &nbsp;
                  <br /><br />
                    <Button variant="contained" onClick={() => this.Addproduct()}>הוספת לייסט</Button><br />
                </div>
            </div>
        )
    }
}

export default Frame;
