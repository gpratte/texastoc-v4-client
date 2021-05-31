import React from 'react'
import './GamePlayers.css'
import {Stomp} from "@stomp/stompjs"

/*
 * Websocket functionality taken from https://dev.to/finallynero/using-websockets-in-react-4fkp
 */
class Clock1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ws: null,
      reconnect: true
    };
  }

  componentDidMount() {
    console.log('!!! did mount')
    if (this.state.ws != null) {
      console.log('!!! did mount closing ws')
      this.state.ws.close();
    }
    this.setState({ws: null, reconnect: true})
    this.connect();
  }

  componentWillUnmount() {
    console.log('!!! will unmount')
    if (this.state.ws != null) {
      console.log('!!! will unmoust closing ws')
      this.state.ws.close();
    }
    console.log('!!! setting state to reconnect false')
    this.setState({ws: null, reconnect: false})
  }

  timeout = 250; // Initial timeout duration as a class variable

  /**
   * @function connect
   * This function establishes the connect with the websocket and also ensures
   * constant reconnection if connection closes
   */
  connect = () => {

    let stompClient;

    const stompConfig = {
      // Broker URL, should start with ws:// or wss:// - adjust for your broker setup
      brokerURL: "ws://localhost:8080/socket",

      // Keep it off for production, it can be quit verbose
      // Skip this key to disable
      debug: function (str) {
        console.log('STOMP: ' + str);
      },

      // If disconnected, it will retry after 200ms
      reconnectDelay: 200,

      // Subscriptions should be done inside onConnect as those need to reinstated when the broker reconnects
      onConnect: function (frame) {
        // The return object has a method called `unsubscribe`
        stompClient.subscribe('/topic/greetings', function (message) {
          const payload = JSON.parse(message.body);
          console.log('!!! ' + payload.message);
        });
      }
    };

    // Create an instance
    stompClient = Stomp.client(stompConfig);

    // You can set additional configuration here

    // Attempt to connect
    stompClient.activate();  };

  /**
   * utilited by the @function connect to check if the connection is close,
   * if so attempts to reconnect
   */
  check = () => {
    const { ws } = this.state;
    //check if websocket instance is closed, if so call `connect` function.
    if (!ws || ws.readyState === WebSocket.CLOSED) this.connect();
  };


  render() {
    console.log('!!! render ' + JSON.stringify(this.state))
    return (
      <div>
        <h1>Clock</h1>
      </div>
    );
  }
}

export default Clock1
