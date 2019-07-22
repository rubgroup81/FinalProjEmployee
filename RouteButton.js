import React from "react";
import { Route } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const RouteButton = (props) => {
    return (
        <Route render={({ history }) => (
            <Button style={{ backgroundColor: "#2e1534" }} variant="contained" color="primary" onClick={() => {
                history.push({
                    pathname: props.pathname,
                    data: props.data,
                });
            }}>
                {props.value}
            </Button>
        )}
        />
    )
}

export default RouteButton;