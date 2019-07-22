import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { TextField, TableSortLabel, DatePicker } from '@material-ui/core';

class GetPasspartu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Makat: '',
            Name: '',
            passpartu: [],
            passType: 0,
            name: '',
            isLoaded: false,
            error: null
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        if (window.location.hostname === "localhost") {
            fetch('http://localhost:49934/api/Paspartu')
                .then(this.handleErrors)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        isLoaded: true,
                        passpartu: data,
                    })
                })
                .catch(error => this.setState({ error: "There was an error in getting the passparus" }));
        }
        else {
            fetch('http://proj.ruppin.ac.il/bgroup81/prod/api/Paspartu')
                .then(this.handleErrors)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        isLoaded: true,
                        passpartu: data,
                    })
                })
                .catch(error => this.setState({ error: "There was an error in getting the passparus" }));
        }
    }

    handleErrors = (response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });

        this.props.sendDataPass(event.target.value);
    };

    render() {
        if (this.state.passpartu.length === 0) {
            console.log("empty");
            return null;
        }
        else {
            return (

                <div>
                    {this.props.compShowSpecific !== 1 ?
                        <FormControl>
                            <Select
                                value={this.state.passType}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'passType',
                                }} >
                                <MenuItem value="">
                                    <em>בחר פספרטו</em>
                                </MenuItem>
                                {this.state.passpartu.map(option => (
                                    <MenuItem key={option.Makat} value={option}>
                                        {option.Name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl> : <TextField value={this.props.PaspartuCode} type="number" inputProps={{ min: "1", max: "999" }} disabled />}
                </div>
            )
        }

    }
}

export default GetPasspartu;

