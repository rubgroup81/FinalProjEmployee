import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { TableSortLabel, TextField } from '@material-ui/core';
import swal from 'sweetalert';


var selectedPic = "";
class GetKanvasPic extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pictures: [],
            pictureCode: '',
            pictureDetails: [],
            picName: '',
            picSize: '',
            picPrice: '',
            name: '',
            isLoaded: false,
            error: null,
        }
        this.handleChange = this.handleChange.bind(this);


    }

    componentDidMount() {
        if (window.location.hostname === "localhost") {
            fetch('http://localhost:49934/api/finalproduct')
                .then(this.handleErrors)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        isLoaded: true,
                        pictures: data,
                    })
                })
                .catch(error => this.setState({ error: "There was an error in getting the pictures" }));
        }
        else {
            console.log("no");
            fetch('http://proj.ruppin.ac.il/bgroup81/prod/api/finalproduct')
                .then(this.handleErrors)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        isLoaded: true,
                        pictures: data,
                    })
                })
                .catch(error => this.setState({ error: "There was an error in getting the pictures" }));
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
        selectedPic = event.target.value;
        if (window.location.hostname === "localhost") {
            fetch('http://localhost:49934/api/finalproduct/' + selectedPic)
                .then(this.handleErrors)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        isLoaded: true,
                        pictureDetails: data,
                        picSize: data[0].Length_Width,
                        picName: data[0].Name,
                        picPrice: data[0].Price,
                    })
                    this.props.sendData(event.target.value, this.state.picSize, this.state.picName, this.state.picPrice);
                })
                .catch(error => this.setState({ error: "There was an error in getting the pictures" }));
        }
        else {
            fetch('http://proj.ruppin.ac.il/bgroup81/prod/api/finalproduct/' + selectedPic)
                .then(this.handleErrors)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        isLoaded: true,
                        pictureDetails: data,
                        picSize: data[0].Length_Width,
                        picName: data[0].Name,
                        picPrice: data[0].Price,
                    })
                    this.props.sendData(event.target.value, this.state.picSize, this.state.picName, this.state.picPrice);
                })
                .catch(error => this.setState({ error: "There was an error in getting the pictures" }));
        }
    };


    render() {
        if (this.state.pictures.length === 0) {
            console.log("empty");
            return null;
        }
        else {
            return (
                <div>
                    <FormControl>
                        <Select
                            value={this.state.pictureCode}
                            onChange={this.handleChange}
                            inputProps={{
                                name: 'pictureCode',
                            }} >
                            <MenuItem value="">
                                <em>בחר תמונה</em>
                            </MenuItem>
                            {this.state.pictures.map(option => (
                                <MenuItem key={option.Makat} value={option.Makat}>
                                    {option.Makat}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl id="knavsDetails">
                        {this.state.pictureDetails.map((option, index) => (
                            <div key={index}>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                             <TextField id="picName" value={option.Name}>
                                    {option.Name}
                                </TextField>
                                <TableSortLabel>מידות</TableSortLabel>
                                <TextField id="picSize" value={option.Length_Width}>
                                    {option.Length_Width}
                                </TextField>
                                <TableSortLabel>מחיר</TableSortLabel>
                                <TextField id="picPrice" value={option.Price}>
                                    {option.Price}
                                </TextField>
                            </div>
                        ))}
                    </FormControl>
                </div>
            )
        }

    }
}

export default GetKanvasPic;
