import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { TextField } from '@material-ui/core';


class GetMirrors extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Makat: '',
            Type: '',
            mirrors: [],

            mirrorType: '',
            name: '',
            isLoaded: false,
            error: null
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        var type = 'מראה';
        if (window.location.hostname === "localhost") {
            fetch('http://localhost:49934/api/AllGlasses/' + type)
                .then(this.handleErrors)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        isLoaded: true,
                        mirrors: data,
                    })
                })
                .catch(error => this.setState({ error: "There was an error in getting the mirrors" }));
        }
        else {

            fetch('http://proj.ruppin.ac.il/bgroup81/prod/api/AllGlasses/' + type)
                .then(this.handleErrors)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        isLoaded: true,
                        mirrors: data,
                    })
                })
                .catch(error => this.setState({ error: "There was an error in getting the mirrors" }));
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
        this.props.sendData(event.target.value);

    };

    render() {
        if (this.state.mirrors.length === 0) {
            console.log("empty");
            return null;
        }
        else {
            return (
                <div>
                    {this.props.compShowSpecific !== 1 ?
                        <FormControl>
                            <Select
                                value={this.state.mirrorType}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'mirrorType',
                                }} >

                                {this.state.mirrors.map((option, i) => (
                                    <MenuItem key={i} value={option}>
                                        {option.Type}
                                    </MenuItem>
                                ))}
                            </Select>

                        </FormControl> : <TextField value={this.props.MirrorCode} type="number" inputProps={{ min: "1", max: "999" }} disabled />}

                </div>
            )
        }

    }
}

export default GetMirrors;

