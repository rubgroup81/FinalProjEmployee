import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import './App.css';
import './Style.css';
import AppBar from '@material-ui/core/AppBar';
import RouteButton from './RouteButton'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import NewOrder from './NewOrder';
import InsertCustomer from './InsertCustomer';
import ShowCustomer from './ShowCustomer';
import ShowOrders from './ShowOrders';
import ShowSuppliers from './ShowSuppliers';
import ShowSpecificOrder from './ShowSpecificOrder';
import InsertSupplier from './InsertSupplier';
import ProductsMangment from './ProductsMangment';
import NewProduct from './NewProduct';
import Reports from './Reports';
import ShowInvoices from './ShowInvoices';
import PrintInvoice from './PrintInvoice';
import Dashboard from './Dashboard';
import MenuPopupState from './MenuPopupState';


const styles = theme => ({
  root: {
    flexGrow: 1,
    alignItems: 'center',

  },
  appBar: {
    // backgroundColor: "#2e1534",
    position: 'relative',
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,

  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
});

class App extends Component {
  state = {
    value: 0,
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;

    return (

      <Router >

        <div className={styles.root} >

          <div>
            <AppBar style={{ backgroundColor: "#2e1534" }} position="static" className={styles.appBar}>
              <Toolbar>
                <Typography variant="h6" color="inherit" noWrap>
                  <MenuPopupState></MenuPopupState>
                  <RouteButton value=' דף הבית' pathname='/Dashboard' />
                  <RouteButton value=' הזמנות' pathname='/ShowOrders' />
                  <RouteButton value=' יצירת הזמנה חדשה' pathname='/NewOrder' />
                  <RouteButton value=' לקוחות' pathname='/ShowCustomer' />
                  <RouteButton value='יצירת לקוח חדש' pathname='/InsertCustomer' />
                  <RouteButton value=' ספקים' pathname='/ShowSuppliers' />
                  <RouteButton value='יצירת ספק חדש' pathname='/InsertSupplier' />
                  <RouteButton value='מוצרים' pathname='/ProductsMangment' />
                  <RouteButton value='הוספת מוצרים' pathname='/NewProduct' />
                  <RouteButton value=' דוח הכנסות' pathname='/Reports' />
                  <RouteButton value=' חשבוניות' pathname='/ShowInvoices' />

                </Typography>
              </Toolbar>
            </AppBar>

          </div>

          <Route path="/" component={Dashboard} exact />
          <Route path="/InsertCustomer" component={InsertCustomer} />
          <Route path="/InsertSupplier" component={InsertSupplier} />
          <Route path="/ShowSpecificOrder/:id" component={ShowSpecificOrder} />
          <Route path="/ShowCustomer" component={ShowCustomer} />
          <Route path="/ShowOrders" component={ShowOrders} />
          <Route path="/NewOrder" component={NewOrder} />
          <Route path="/ShowSuppliers" component={ShowSuppliers} />
          <Route path="/ProductsMangment" component={ProductsMangment} />
          <Route path="/NewProduct" component={NewProduct} />
          <Route path="/Reports" component={Reports} />
          <Route path="/ShowInvoices" component={ShowInvoices} />
          <Route path="/PrintInvoice/:id" component={PrintInvoice} />
          <Route path="/Dashboard" component={Dashboard} />
        </div>

        <div id='divFooter'>

          {/* Footer */}
          <footer className="footer">
            <Typography variant="h6" align="center" gutterBottom>
              אבי רוקשין - מסגור, מראות ותמונות
            </Typography>
            <Typography variant="subtitle1" align="center" component="p">
              סוקולוב 57 הרצליה , טל' 09-9503512
            </Typography>
          </footer>
          {/* End footer */}
        </div>

      </Router>

    );
  }
}

export default App;

