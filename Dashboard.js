import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';


import { Link } from "react-router-dom";
import ShowOnlineOrders from './ShowOnlineOrders';


import GetOrdersFor3Days from './GetOrdersFor3Days';

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // isToggleOn: true,
            // component:"",         
        };

        this.images = [
            {

                url: 'http://proj.ruppin.ac.il/bgroup81/test2/imgProjDeshbord/pic20.png',
                title: 'הצגת הזמנות',
                width: '20%',
                linkTo: 'ShowOrders',
            },
            {
                url: 'http://proj.ruppin.ac.il/bgroup81/test2/imgProjDeshbord/pic18.jpg',
                title: 'יצירת הזמנה ',
                width: '20%',
                linkTo: 'NewOrder',
            },
            {
                url: 'http://proj.ruppin.ac.il/bgroup81/test2/imgProjDeshbord/pic12.jpg',
                title: 'לקוחות',
                width: '20%',
                linkTo: 'ShowCustomer',

            },
            {

                url: 'http://proj.ruppin.ac.il/bgroup81/test2/imgProjDeshbord/pic28.jpg',
                title: 'ספקים',
                width: '20%',
                linkTo: 'ShowSuppliers',
            },
            {

                url: 'http://proj.ruppin.ac.il/bgroup81/test2/imgProjDeshbord/pic13.jpg',
                title: 'ניהול מוצרים',
                width: '20%',
                linkTo: 'ProductsMangment',
            },
            {
                url: 'http://proj.ruppin.ac.il/bgroup81/test2/imgProjDeshbord/pic15.jpg',
                title: 'הוספת מוצרים',
                width: '20%',
                linkTo: 'NewProduct',
            },
            {
                url: 'http://proj.ruppin.ac.il/bgroup81/test2/imgProjDeshbord/pic16.jpg',
                title: 'דוחות',
                width: '20%',
                linkTo: 'Reports',
            },
            {

                url: 'http://proj.ruppin.ac.il/bgroup81/test2/imgProjDeshbord/pic10.jpg',
                title: 'חשבוניות',
                width: '20%',
                linkTo: 'ShowInvoices',
            },
        ];

    }

    render() {
        return (
            <div>
                <div style={{ margin: "5%", marginRight: "15%" }}>

                    {this.images.map(image => (
                        <ButtonBase
                            component={Link} to={"./" + image.linkTo}
                            focusRipple
                            key={image.title}
                            style={{
                                position: 'relative',
                                height: 250,
                                width: image.width,
                                border: "4px solid white",
                            }}
                        >
                            <span
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    right: 0,
                                    top: 0,
                                    bottom: 0,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center 40%',
                                    backgroundImage: `url(${image.url})`,
                                    border: "10px solid rgba(70, 70, 73, 0.580)",
                                }}
                            />
                            <span

                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    right: 0,
                                    top: 0,
                                    bottom: 0,
                                    backgroundColor: "rgba(70, 70, 73, 0.911)",
                                    opacity: 0.4,
                                }}

                            />
                            <span
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    right: 0,
                                    top: 0,
                                    bottom: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: "white",

                                }}
                            >
                                <Typography
                                    component="span"
                                    variant="subtitle1"
                                    color="inherit"
                                    style={{
                                        position: 'relative',
                                        padding: '10px',

                                        height: "20%",
                                        width: "45%",
                                        textAlign: "center",
                                        border: "3px solid rgba(236, 236, 236, 0.583)",
                                    }}
                                >
                                    {image.title}
                                    <span style={{
                                        height: 3,
                                        width: 18,
                                        backgroundColor: "white",
                                        position: 'absolute',
                                        bottom: -2,
                                        left: 'calc(50% - 9px)',
                                    }}
                                    />
                                </Typography>
                            </span>
                        </ ButtonBase >
                    ))}
                </div>

                <GetOrdersFor3Days></GetOrdersFor3Days>

                <ShowOnlineOrders></ShowOnlineOrders>
            </div>
        );
    }
}
export default Dashboard;











