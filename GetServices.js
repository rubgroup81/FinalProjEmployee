import React from 'react';
import Glasses from './Glasses';

class GetServices extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ServiceCode: '',
            Name: '',
            services: [],
            isLoaded: false,
            error: null
        }
        this.handleChange = this.handleChange.bind(this);
    }


    componentDidMount() {
        if (window.location.hostname === "localhost") {
            fetch('http://localhost:49934/api/services')
                .then(this.handleErrors)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        isLoaded: true,
                        services: data,
                    })
                })
                .catch(error => this.setState({ error: "There was an error in getting the services" }));
        }
        else {
            fetch('http://proj.ruppin.ac.il/bgroup81/prod/api/services')
                .then(this.handleErrors)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        isLoaded: true,
                        services: data,
                    })
                })
                .catch(error => this.setState({ error: "There was an error in getting the services" }));
        }
    }

    handleErrors = (response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }

    handleChange(e) {
        this.setState({ ServiceCode: e.target.value });
    }


    render() {
        if (this.state.services.length === 0) {
            console.log("empty");
            return null;
        }
        else {
            return (
                <div>
                    <select className="form-control" onChange={this.handleChange}>
                        <option value="">
                            בחר שירות
                          </option>
                        {this.state.services.map(service => (
                            <option key={service.ServiceCode} value={service.ServiceCode}>
                                {service.Name}
                            </option>
                        ))}
                    </select>
                </div>
            )
        }
    }
}

export default GetServices;
