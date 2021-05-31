import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {addNewSeason} from '../seasonClient'
import {redirect, shouldRedirect} from "../../utils/util";

class NewSeason extends React.Component {

  addNewSeason = (e) => {
    e.preventDefault();
    const startYear = e.target.elements.startDateId.value;
    addNewSeason(startYear);
  }


  render() {
    let redirectTo;
    if ((redirectTo = shouldRedirect(this.props.league))) {
      return redirect(redirectTo);
    }

    return (
      <div>
        <br/>
        <h1>New Season</h1>
        <br/>
        <p>Season starts on May 1st</p>
        <Form onSubmit={this.addNewSeason}>
          <Form.Group>
            <Form.Label>Start Year</Form.Label>
            <Form.Control type="text" placeholder="yyyy" id={'startDateId'}/>
          </Form.Group>
          <Button variant="primary" type="submit">Add New Season</Button>
        </Form>
      </div>
    );
  }
}

export default NewSeason
