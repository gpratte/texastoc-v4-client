import React from 'react';
import Button from "react-bootstrap/Button";
import {CLIENT_URL} from '../../utils/constants'

class NewVersion extends React.Component {

  render() {
    return (
      <div>
        <h1>Time To Update</h1>
        <div>
          Please click the Update button to update this software.
          <p>You will need to log in again.</p>
          <p>
            <Button href={CLIENT_URL} variant="primary">
              Update
            </Button>
          </p>
        </div>
      </div>
    )
  }
}

export default NewVersion
