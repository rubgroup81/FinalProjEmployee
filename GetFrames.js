import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { TextField, TableSortLabel, DatePicker } from '@material-ui/core';


class GetFrames extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Makat: '',
            frames: [],
            frameType: '',
            PricePerMeter: '',
            name: '',
            isLoaded: false,
            error: null,
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {

        if (window.location.hostname === "localhost") {
            fetch('http://localhost:49934/api/Frame')
                .then(this.handleErrors)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        isLoaded: true,
                        frames: data,
                    })
                })
                .catch(error => this.setState({ error: "There was an error in getting the frmaes" }));
        }
        else {
            fetch('http://proj.ruppin.ac.il/bgroup81/prod/api/Frame')
                .then(this.handleErrors)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        isLoaded: true,
                        frames: data,
                    })
                })
                .catch(error => this.setState({ error: "There was an error in getting the frmaes" }));
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
        this.props.sendDataFrame(event.target.value);
    };

    render() {
        if (this.state.frames.length === 0) {
            console.log("empty");
            return null;
        }
        else {
            return (
                <div>
                    {this.props.compShowSpecific !== 1 ?
                        <FormControl>
                            <Select
                                onChange={this.handleChange}
                                value={this.state.frameType}
                                inputProps={{
                                    name: 'frameType',
                                }}  >
                                <MenuItem value="">
                                    <em>בחר מסגרת</em>
                                </MenuItem>
                                {this.state.frames.map(option => (
                                    <MenuItem key={option.Makat} value={option}>
                                        {option.Makat}

                                    </MenuItem>
                                ))}

                            </Select>
                        </FormControl> : <TextField value={this.props.FrameCode} type="number" inputProps={{ min: "1", max: "999" }} disabled />}
                </div>
            )
        }

    }
}

export default GetFrames;

