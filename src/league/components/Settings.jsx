import React from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import leagueStore from "../leagueStore";
import {REDIRECT, UPDATE_SETTINGS} from "../leagueActions";
import {shouldRedirect, redirect} from '../../utils/util';

class Settings extends React.Component {

  updateSettings = (e) => {
    e.preventDefault();
    leagueStore.dispatch({type: UPDATE_SETTINGS, flag: e.target.elements.oneTouchId.checked});
    leagueStore.dispatch({type: REDIRECT, to: '/home'})
  }

  render() {
    let redirectTo;
    if ((redirectTo = shouldRedirect(this.props.league))) {
      return redirect(redirectTo);
    }

    const oneTouchRebuy = this.props.league.oneTouchRebuy;
    return (
      <div>
        <h1>Settings</h1>
        <div>
          <Form onSubmit={this.updateSettings}>
            <Form.Group>
              <Form.Check inline
                          type={'checkbox'}
                          id={'oneTouchId'}
                          label={'One Touch Rebuy'}
                          defaultChecked={oneTouchRebuy ? true : false}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update Settings
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default Settings
