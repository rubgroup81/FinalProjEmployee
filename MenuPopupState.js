import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';//npm install --save material-ui-popup-state
import { Link } from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';



function MenuPopupState() {
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {popupState => (
        <React.Fragment>
          <Button style={{ backgroundColor: "#2e1534" }} variant="contained" color="secondary" {...bindTrigger(popupState)}>
            <MenuIcon />
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close} component={Link} to={"./Dashboard"}>דף הבית</MenuItem>
            <MenuItem onClick={popupState.close} component={Link} to={"./ShowOrders"}>הזמנות</MenuItem>
            <MenuItem onClick={popupState.close} component={Link} to={"./NewOrder"}>יצירת הזמנה חדשה</MenuItem>
            <MenuItem onClick={popupState.close} component={Link} to={"./ShowCustomer"}>לקוחות</MenuItem>
            <MenuItem onClick={popupState.close} component={Link} to={"./InsertCustomer"}>יצירת לקוח חדש</MenuItem>
            <MenuItem onClick={popupState.close} component={Link} to={"./ShowSuppliers"}>ספקים</MenuItem>
            <MenuItem onClick={popupState.close} component={Link} to={"./InsertSupplier"}>יצירת ספק חדש </MenuItem>
            <MenuItem onClick={popupState.close} component={Link} to={"./ProductsMangment"}> מוצרים </MenuItem>
            <MenuItem onClick={popupState.close} component={Link} to={"./NewProduct"}> הוספת מוצרים </MenuItem>
            <MenuItem onClick={popupState.close} component={Link} to={"./Reports"}> דוח הכנסות </MenuItem>
            <MenuItem onClick={popupState.close} component={Link} to={"./ShowInvoices"}> חשבוניות </MenuItem>

          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}

export default MenuPopupState;