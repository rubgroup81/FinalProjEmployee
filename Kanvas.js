import React from 'react';
import swal from 'sweetalert';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { InputLabel, OutlinedInput, InputBase, TextField, FormLabel, TableSortLabel, DatePicker, InputAdornment } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import RouteButton from './RouteButton';


class Kanvas extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Name: '',
            StatusInStock: '',
            InvitedStatus: '',
            CategoryNumber: 3,
            Description: '',
            Length_Width: '',
            Price: '',
            Type: '',
            Image: '',
            file: '',
            imagePreviewUrl: '',
            localDataImageFrame: "black.jpg",//props from GetSmallFrames

        }
        this.handleChange = this.handleChange.bind(this);
        this.Addproduct = this.Addproduct.bind(this);
        this.handleInStock = this.handleInStock.bind(this);
        this.handleInvited = this.handleInvited.bind(this);
    }

    handleInvited(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleInStock(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    _handleSubmit(e) {
        e.preventDefault();
        // TODO: do something with -> this.state.file
        console.log('handle uploading-', this.state.file);
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result,
                Image: file.name,
            });
        }

        reader.readAsDataURL(file)
    }

    CalcPXheight = () => {
        return ((this.props.heightPic / this.props.widthPic) / 2000) + "px";
    }


    Addproduct = () => {
        let { Name, StatusInStock, InvitedStatus, Length_Width, Price, Type, Description, Image } = this.state;
        const data = { ...this.state };
        if (window.location.hostname === "localhost") {
            let url = 'http://localhost:49934/api/InsertFinalProduct?Name=' + Name + '&StatusInStock=' + StatusInStock + '&InvitedStatus=' + InvitedStatus + '&CategoryNumber=3' + '&Length_Width=' + Length_Width + '&Price=' + Price + '&Type=' + Type + '&Description=' + Description + '&Image=' + Image + ''

            fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {
                    swal("הפריט נוסף בהצלחה");
                })
                .catch(error => {
                    console.error('Error:', error)
                })

        } else {
            let url = 'http://proj.ruppin.ac.il/bgroup81/prod/api/InsertFinalProduct?Name=' + Name + '&StatusInStock=' + StatusInStock + '&InvitedStatus=' + InvitedStatus + '&CategoryNumber=3' + '&Length_Width=' + Length_Width + '&Price=' + Price + '&Type=' + Type + '&Description=' + Description + '&Image=' + Image + ''

            fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {
                    swal("הפריט נוסף בהצלחה");
                })
                .catch(error => {
                    console.error('Error:', error)
                })
        }
    };

    render() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} style={{ height: this.CalcPXheight(), width: 100 }} />);
        } else {
            $imagePreview = (<div className="previewText"></div>);
        }

        return (
            <div>
                <div>
                    <h3>פרטים כלליים </h3>
                    <TableSortLabel>שם המוצר</TableSortLabel>
                    <TextField placeholder="מראה/זכוכית/לייסט/תמונה" name='Name' onChange={this.handleChange}></TextField><br />
                    <TableSortLabel>סטטוס במלאי</TableSortLabel>
                    <FormControl>
                        <Select value={this.state.StatusInStock}
                            onChange={this.handleInStock}
                            inputProps={{
                                name: 'StatusInStock',
                            }}>
                            <MenuItem value="">
                                <em>סטטוס מוצר במלאי</em>
                            </MenuItem>
                            <MenuItem value="לא במלאי"> לא במלאי </MenuItem>
                            <MenuItem value="במלאי">  במלאי </MenuItem>

                        </Select>
                    </FormControl>
                    <br></br>
                    <TableSortLabel>סטטוס הוזמן</TableSortLabel>
                    <FormControl>
                        <Select value={this.state.InvitedStatus}
                            onChange={this.handleInvited}
                            inputProps={{
                                name: 'InvitedStatus',
                            }}>
                            <MenuItem value="">
                                <em>סטטוס הוזמן</em>
                            </MenuItem>
                            <MenuItem value="false"> לא הוזמן </MenuItem>
                            <MenuItem value="true">  הוזמן </MenuItem>

                        </Select>
                    </FormControl>
                </div>
                <div>

                    <h4>פרטיי תמונת קנבס</h4>
                    <TableSortLabel>סוג המוצר</TableSortLabel>
                    <TextField placeholder="סוג המוצר" name="Type" onChange={this.handleChange}></TextField> &nbsp;
                <TableSortLabel>שם התמונה - תיאור</TableSortLabel>
                    <TextField placeholder="שם תמונת קנבס" name="Description" onChange={this.handleChange}></TextField>  &nbsp;
                <TableSortLabel>גובה ורוחב</TableSortLabel>
                    <TextField placeholder="גובה ורוחב" name="Length_Width" onChange={this.handleChange}></TextField>  &nbsp;
                <TableSortLabel> מחיר</TableSortLabel>
                    <TextField placeholder="מחיר" name="Price" onChange={this.handleChange}></TextField>  &nbsp;
                <TableSortLabel> תמונה</TableSortLabel>
                    <form onSubmit={(e) => this._handleSubmit(e)}>
                        <input className="fileInput"
                            type="file"
                            onChange={(e) => this._handleImageChange(e)} />
                    </form>

                    {$imagePreview}
                    <br></br>
                    <Button variant="contained" onClick={() => this.Addproduct()}>הוספת תמונת קנבס</Button><br />
                </div>
            </div>
        )
    }
}

export default Kanvas;
