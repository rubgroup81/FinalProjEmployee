import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { InputLabel, OutlinedInput, InputBase, TextField, TableSortLabel, DatePicker } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import KanvasPictures from './KanvasPictures';
import SweetAlert from 'react-bootstrap-sweetalert';
import swal from 'sweetalert';
import Frame from './Frame';
import Mirror from './Mirror';
import Kanvas from './Kanvas';
import ProDropDown from './ProDropDown';
import RouteButton from './RouteButton';

var selecteCategory = "";

class NewProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            isLoaded: false,
            error: null,
            showComponent: false,
            Makat: 18,
            myArray: [],
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleInStock = this.handleInStock.bind(this);
        this.handleInvited = this.handleInvited.bind(this);
        this.AddDivProduct = this.AddDivProduct.bind(this);

        this.refsArr = [];
        this.selName = null;
        this.selVal = null;
    }

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

    handleChange(event) {
        this.selName = event.target.name;
        this.selVal = event.target.value;
        //console.log(this.selVal);
        this.setState({ showComponent: true });

    }

    handleInvited(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleInStock(event) {
        this.setState({ [event.target.name]: event.target.value });
    }


    AddDivProduct() {

        this.setState({ [this.selName]: this.selVal });
        selecteCategory = this.selVal;

        let temp = React.createRef();
        this.refsArr = [...this.refsArr, temp];

        //debugger;
        let comp = null;
        switch (selecteCategory) {
            case '1':
                comp = <Frame ref={this.refsArr[this.refsArr.length - 1]} />;
                break;
            case '2':
                comp = <Mirror ref={this.refsArr[this.refsArr.length - 1]} />;
                break;
            case '3':
                comp = <Kanvas ref={this.refsArr[this.refsArr.length - 1]} />;
                break;


        }

        return this.setState(previousState => ({ myArray: [...previousState.myArray, comp] }));
    }

    render() {
        //console.log('refsArr.length=', this.refsArr.length);


        return (
            <form onSubmit={this.handleSubmit} className="divProduct">
                <h1>הוספת מוצר חדש</h1>

                <select className="form-control" onChange={(e) => this.handleChange(e)}>
                    <option value="">בחר קטגוריית מוצר
                          </option>
                    {this.state.categories.map((category, i) => (
                        <option key={i} value={category.Number} name={category.Name}>
                            {category.Name}
                        </option>
                    ))}
                </select>
                &nbsp; &nbsp;
                    {this.state.showComponent ? <Button variant="contained" onClick={() => this.AddDivProduct()}>הוסף פרטי מוצר </Button> : ''}


                <div>

                    {this.state.myArray.map((row, i) => (
                        <div key={i}>
                            {row}

                            {/* <Button variant="contained" onClick={() => this.deleteItem(i)}>מחק שירות </Button> */}
                            <hr />
                        </div>
                    ))}

                </div>

            </form>
        )
    }
}

export default NewProduct;
