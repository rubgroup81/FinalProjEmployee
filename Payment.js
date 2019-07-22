import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { TableSortLabel, Input, FormLabel, Button } from '@material-ui/core';

import AddInvoice from './AddInvoice';

class Payment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isEditMode: false,
            TotalOrderWithTax: '',
            PaidOnAccount: 0,
            paymentBalance: '',
            StatusPayment: '',
            MethodOfPayment: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        this.setState({ paymentBalance: this.props.totalprice - event.target.value });
        this.props.sendData3(event.target.value);//send object PaidOnAccount
    };

    handleChange1 = event => {
        this.setState({ [event.target.name]: event.target.value });
        this.props.sendData1(event.target.value);//send object MethodOfPayment      
    };

    handleChange2 = event => {
        this.setState({ [event.target.name]: event.target.value });
        this.props.sendData2(event.target.value);//send object StatusPayment
    };

    render() {
        const { StatusPayment, MethodOfPayment, PaidOnAccount, paymentBalance, TotalOrderWithTax, isEditMode } = this.state;

        return (
            <div className='divPayment'>
                <h3><u>תשלום:</u></h3>

                <TableSortLabel>סטטוס תשלום:</TableSortLabel>&nbsp;
                {this.props.compShowSpecific !== 1 ?
                    <FormControl>
                        <Select value={StatusPayment}
                            onChange={this.handleChange2}
                            inputProps={{
                                name: 'StatusPayment',
                            }}>
                            <MenuItem value="">
                                <em>סטטוס תשלום</em>
                            </MenuItem>
                            <MenuItem value="לא שולם"> לא שולם </MenuItem>
                            <MenuItem value="שולם חלקית"> שולם חלקית </MenuItem>
                            <MenuItem value="שולם">  שולם </MenuItem>
                        </Select>
                    </FormControl>
                    : <FormControl>
                        <Select value={this.props.statusPayment}
                            onChange={this.handleChange2}
                            inputProps={{
                                name: 'StatusPayment',
                            }}>
                            <MenuItem value="">
                                <em>סטטוס תשלום</em>
                            </MenuItem>
                            <MenuItem value="לא שולם"> לא שולם </MenuItem>
                            <MenuItem value="שולם חלקית"> שולם חלקית </MenuItem>
                            <MenuItem value="שולם">  שולם </MenuItem>
                        </Select>
                    </FormControl>
                }
                <br />
                <TableSortLabel>אמצעי תשלום:</TableSortLabel>
                {this.props.compShowSpecific !== 1 ?
                    <FormControl>
                        <Select value={MethodOfPayment}
                            onChange={this.handleChange1}
                            inputProps={{
                                name: 'MethodOfPayment',
                            }}>
                            <MenuItem value="">
                                <em>אמצעי תשלום</em>
                            </MenuItem>
                            <MenuItem value="אשראי"> אשראי </MenuItem>
                            <MenuItem value="שיק"> שיק  </MenuItem>
                            <MenuItem value="מזומן"> מזומן </MenuItem>
                        </Select>
                    </FormControl>
                    : <FormControl>
                        <Select value={this.props.methodOfPayment}
                            onChange={this.handleChange1}
                            inputProps={{
                                name: 'MethodOfPayment',
                            }}>
                            <MenuItem value="">
                                <em>אמצעי תשלום</em>
                            </MenuItem>
                            <MenuItem value="אשראי"> אשראי </MenuItem>
                            <MenuItem value="שיק"> שיק  </MenuItem>
                            <MenuItem value="מזומן"> מזומן </MenuItem>
                        </Select>
                    </FormControl>
                }
                <br />
                <TableSortLabel> סכום ששולם:</TableSortLabel>
                {this.props.compShowSpecific !== 1 ?
                    <FormControl>
                        <Input type='text' name="PaidOnAccount" onChange={this.handleChange} value={PaidOnAccount} />
                    </FormControl>
                    : <FormControl>
                        <Input type='text' name="PaidOnAccount" onChange={this.handleChange} value={this.props.paidOnAccount} />
                    </FormControl>
                }
                <br />
                <TableSortLabel> יתרת תשלום:</TableSortLabel>
                <FormControl>
                    <Input type='number' name="paymentBalance" value={this.state.paymentBalance} disabled />
                </FormControl><br />

                <TableSortLabel> סה"כ לתשלום:</TableSortLabel>
                <FormControl>
                    <Input type='number' name='TotalOrderWithTax' value={this.props.totalprice} />
                </FormControl>
                <br /><br />
                {this.props.compShowSpecific === 1 ?
                    <AddInvoice
                        numOrder={this.props.numOrder}
                        StPayment={this.props.statusPayment}
                    >
                    </AddInvoice> : ''
                }

            </div>
        )
    }
}

export default Payment;

