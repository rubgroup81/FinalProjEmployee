import React from 'react';
import { TextField, InputLabel, TableSortLabel, Checkbox } from '@material-ui/core';
import GetKanvasPic from './GetKanvasPic';
import swal from 'sweetalert';

class KanvasPictures extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // Makat: '',
            // Type: '',
            pictures: [],
            pictureCode: '',
            pictureDetails: [],
            picName: '',
            picSize: '',
            picPrice: '',
            name: '',
            isLoaded: false,
            error: null,
            ServiceCode: 5,
        }

        this.Addservices = this.Addservices.bind(this);
        this.localData = null;
        this.localDataSize = null;
        this.localDataName = null;
        this.localDataPrice = null;
    }

    Addservices = (i) => {

        if (window.location.hostname === "localhost") {
            const url = 'http://localhost:49934/api/finalproduct';

            const data = {
                Id: i,
                Makat: this.localData,
                Length_Width: this.localDataSize,
                Price: this.localDataPrice,
                ServiceCode: this.state.ServiceCode,
                Name: this.localDataName,
            }

            fetch(url, {
                method: 'POST', // or ‘PUT’

                body: JSON.stringify(data), // data can be `string` or {object}!

                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {
                    // swal("תמונת הקנבס נוספה בהצלחה");
                })
                .catch(error => console.error('Error:', error))

        } else {
            const url = 'http://proj.ruppin.ac.il/bgroup81/prod/api/finalproduct';

            const data = {
                Id: i,
                Makat: this.localData,
                Length_Width: this.localDataSize,
                Price: this.localDataPrice,
                ServiceCode: this.state.ServiceCode,
                Name: this.localDataName,
            }

            fetch(url, {
                method: 'POST', // or ‘PUT’

                body: JSON.stringify(data), // data can be `string` or {object}!

                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {
                    // swal("תמונת הקנבס נוספה בהצלחה");
                })
                .catch(error => console.error('Error:', error))
        }

    }

    getData = (data, picSize, picName, picPrice) => {
        // console.log('data=', data);
        this.localData = data;
        this.localDataSize = picSize;
        this.localDataName = picName;
        this.localDataPrice = picPrice;
    }

    CalculatePrice = () => {
        return this.localDataPrice;
    }

    render() {

        return (
            <div>
                <h4>תמונות קנבס</h4>
                <TableSortLabel>  מקט תמונה  &nbsp;  <GetKanvasPic sendData={this.getData} /> </TableSortLabel>  &nbsp;
            <TableSortLabel>הערות</TableSortLabel>
                <TextField
                    id="outlined-bare"
                    margin="normal"
                    variant="outlined"
                />
            </div>
        )
    }
}

export default KanvasPictures;

