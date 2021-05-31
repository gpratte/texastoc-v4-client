import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {forgot} from '../loginClient'
import {shouldRedirect, redirect} from '../../utils/util';

class ForgotPassword extends React.Component {

  forgot = (e) => {
    e.preventDefault();
    forgot(e.target.elements.emailId.value)
  }

  render() {
    let redirectTo;
    if ((redirectTo = shouldRedirect(this.props.league, true))) {
      return redirect(redirectTo);
    }

    return (
      <div>
        <br/>
        <h2>Enter email</h2>
        <Form onSubmit={this.forgot}>
          <Form.Group>
            <Form.Control type="email" id={'emailId'} placeholder="Enter your login email"/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default ForgotPassword
