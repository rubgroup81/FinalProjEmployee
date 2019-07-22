import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { TextField } from '@material-ui/core';
class GetGlasses extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            glasses: [],
            glassType: '',
            Makat: '',
            GlassCode: '',
            name: '',
            isLoaded: false,
            error: null,

            Price: '',
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        if (window.location.hostname === "localhost") {
            fetch('http://localhost:49934/api/Glasses/' + this.props.picFits)// 0 cutGlass 1 FramingPicture
                .then(this.handleErrors)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        isLoaded: true,
                        glasses: data,
                    })
                })
                .catch(error => this.setState({ error: "There was an error in getting the glasses" }));
        }
        else {
            fetch('http://proj.ruppin.ac.il/bgroup81/prod/api/Glasses/' + this.props.picFits)
                .then(this.handleErrors)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        isLoaded: true,
                        glasses: data,
                    })
                })
                .catch(error => this.setState({ error: "There was an error in getting the glasses" }));
        }
    }

    handleErrors = (response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }


    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value }); //changes the name in the select
        this.setState({ GlassCode: event.target.value }); //changes the GlassCode
        this.props.sendData(event.target.value);//send object glass
    };

    render() {
        const codeglass = this.state.glasses.Makat;

        if (this.state.glasses.length === 0) {
            console.log("empty");
            return null;
        }
        else {
            return (
                <div>
                    {this.props.compShowSpecific !== 1 ?
                        <FormControl>
                            <Select
                                value={this.state.glassType}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'glassType',
                                }} >
                                <MenuItem value="">
                                    <em>בחר זכוכית</em>
                                </MenuItem>
                                {this.state.glasses.map(option => (
                                    <MenuItem key={option.Makat} value={option}>
                                        {option.Type}
                                    </MenuItem>
                                ))}

                            </Select>
                        </FormControl> : <TextField value={this.props.GlassCode} type="number" inputProps={{ min: "1", max: "999" }} disabled />}
                </div>
            )
        }

    }
}

export default GetGlasses;

