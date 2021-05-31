import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {shouldRedirect, redirect} from '../../utils/util';
import {resetPassword} from "../loginClient";

class ForgotPasswordCode extends React.Component {

  reset = (e) => {
    e.preventDefault();
    resetPassword(e.target.elements.codeId.value, e.target.elements.passwordId.value)
  }

  render() {
    let redirectTo;
    if ((redirectTo = shouldRedirect(this.props.league, true))) {
      return redirect(redirectTo);
    }

    return (
      <div>
        <br/>
        <h2>Enter code</h2>
        <Form onSubmit={this.reset}>
          <Form.Group>
            <Form.Control type="text"
                          defaultValue={''}
                          autoComplete={'new-password'}
                          id={'codeId'}
                          placeholder="Enter the code"/>
            <Form.Text className="text-muted">
              Enter the code
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control type="password"
                          defaultValue={''}
                          autoComplete="new-password"
                          id={'passwordId'}
                          placeholder="Enter new password"/>
            <Form.Text className="text-muted">
              Enter your new password
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default ForgotPasswordCode
