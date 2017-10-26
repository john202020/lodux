declare const require;

const React = require("react");
const { Component } = React;

const Cc = props => {
  return <div>cc</div>
}

class Bb extends Component {
  render() {
    return <div>Bb<Cc /></div>
  }
}

export default class aa extends Component {
  render() {
    return <div>
      <Cc />
      <Bb />
    </div>

  }
}

