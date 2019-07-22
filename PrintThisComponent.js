import React, {Component} from 'react'

import Button from '@material-ui/core/Button';

class PrintThisComponent extends Component {

  componentDidMount() {

    console.log('PrintThisComponent mounted!')

  }

  render() {

    return (
      
      <Button variant="outlined" color="secondary"  onClick={() => window.print()}>הדפס</Button>  
      
    )
  }
}

export default PrintThisComponent