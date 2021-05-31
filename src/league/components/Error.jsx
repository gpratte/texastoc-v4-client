import React from 'react'
import leagueStore from '../leagueStore'
import Button from 'react-bootstrap/Button';
import {
  API_ERROR_DONE
} from '../leagueActions'

class Error extends React.Component {
  render() {
    if (this.props.league.apiError === null) {
      return null;
    }

    return (
      <div>
        <p className={'error'}>
          <Button variant="link" className={'far fa-window-close'} onClick={() => {
            leagueStore.dispatch({type: API_ERROR_DONE, message: ''})
          }}/>
          There was an error: {this.props.league.apiError}
        </p>
      </div>
    );
  }
}

export default Error
