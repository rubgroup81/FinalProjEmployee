import React from 'react';
import { TextField, InputLabel, TableSortLabel, Checkbox } from '@material-ui/core';


class Mission extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            orderNumber: '',
            rowNumber: '',
            TaskName: '',
            TaskStatus: '',
            missions: [],
            isChecked: true,
        }

        this.handleClick = this.handleClick.bind(this);

    }


    componentDidMount() {

        if (window.location.hostname === "localhost") {
            fetch('http://localhost:49934/api/MissionToItemController?orderNumber=' + this.props.NumberOrder + '&rowNumber=' + this.props.ItemInOrder)
                .then(this.handleErrors)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        isLoaded: true,
                        missions: data,
                    })
                })
                .catch(error => this.setState({ error: "There was an error in getting the orders" }));
        } else {
            fetch('http://proj.ruppin.ac.il/bgroup81/prod/api/MissionToItemController?orderNumber=' + this.props.NumberOrder + '&rowNumber=' + this.props.ItemInOrder)
                .then(this.handleErrors)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        isLoaded: true,
                        missions: data,
                    })
                })
                .catch(error => this.setState({ error: "There was an error in getting the orders" }));
        }

    }


    handleClick = (e) => {

        let statusChanged = e.target.checked ? true : false;
        // console.log("status changed: " + statusChanged);

        if (window.location.hostname === "localhost") {
            const url = 'http://localhost:49934/api/MissionToItemController/updateMissionToItem';
            var data = {
                NumberOrder: this.props.NumberOrder,
                ItemInOrder: this.props.ItemInOrder,
                TaskCode: e.target.value,
                TaskStatus: statusChanged,
                TaskName: '',
            }
            fetch(url, {
                method: 'POST', // or ‘PUT’
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data), // data can be `string` or {object}!

            })
                .then(response => {
                })
                .catch(error => console.error('Error:', error))

        } else {
            const url = 'http://proj.ruppin.ac.il/bgroup81/prod/api/MissionToItemController/updateMissionToItem';
            var data = {
                NumberOrder: this.props.NumberOrder,
                ItemInOrder: this.props.ItemInOrder,
                TaskCode: e.target.value,
                TaskStatus: statusChanged,
                TaskName: '',
            }
            fetch(url, {
                method: 'POST', // or ‘PUT’
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data), // data can be `string` or {object}!

            })
                .then(response => {
                })
                .catch(error => console.error('Error:', error))
        }

        window.location.reload();
    }

    handleErrors = (response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }



    render() {

        return (
            <div  >
                <h5>משימות עבודה:</h5>
                {this.state.missions.map((row, i) => (
                    <div key={i} >
                        <Checkbox key={row.Id} checked={row.TaskStatus} color="primary" onClick={this.handleClick} value={row.TaskCode} />{row.TaskName}
                    </div>
                ))}
            </div>
        )
    }
}


export default Mission;
