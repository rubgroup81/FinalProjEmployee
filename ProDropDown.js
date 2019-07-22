import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { InputLabel, OutlinedInput, InputBase, TextField } from '@material-ui/core';
import ProductsTable from "./Table"
import ProductsTableRow from './TableRow'
import './Style.css';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';


class ProDropDown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: '',
            categories: [],
            isLoaded: false,
            error: null,
            showComponent: true,
            selectedRow: null
        }
        this.handleChange = this.handleChange.bind(this);
    }
    onRowClickHandler = (row) => {
        this.setState({ selectedRow: row, isEdit: !this.state.isEdit })
    };
    componentDidMount() {
        if (window.location.hostname === "localhost") {
            fetch('http://localhost:49934/api/categories')
                .then(this.handleErrors)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        isLoaded: true,
                        categories: data,
                    })
                })
                .catch(error => this.setState({ error: "There was an error in getting the categories" }));
        } else {
            fetch('http://proj.ruppin.ac.il/bgroup81/prod/api/categories')
                .then(this.handleErrors)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        isLoaded: true,
                        categories: data,
                    })
                })
                .catch(error => this.setState({ error: "There was an error in getting the categories" }));
        }
    }

    handleErrors = (response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }

    handleChange(e) {
        this.setState({ categoriesCode: e.target.value, Name: e.target.name });
        const selectedCategory = e.target.value;
        const selectedCategoryName = e.target.name;
        this.props.onSelectChange(selectedCategory, selectedCategoryName);
    }

    render() {
        if (this.state.categories.length === 0) {
            return <div>loading...</div>
        }
        else {
            return (
                <div className="divProduct">
                    <h1>ניהול מוצרים</h1>
                    <select className="form-control" onChange={(e) => this.handleChange(e)}>
                        <option value="">בחר קטגוריית מוצר
                          </option>
                        {this.state.categories.map((category, i) => (
                            <option key={i} value={category.Number} name={category.Name}>
                                {category.Name}
                            </option>
                        ))}
                    </select>  &nbsp; &nbsp; 
                    <Button component={Link} to={"NewProduct"} variant="outlined" color="secondary">+ הוסף מוצר</Button>
                  

                </div>
            )
        }
    }
}

export default ProDropDown;

