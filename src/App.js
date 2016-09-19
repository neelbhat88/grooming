import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <Pages />
    );
  }
}

var groomsman = {
  "hershel bhat": {relation: "brother", years: 28},
  "eric solomonson": {relation: "friend", years: 18},
  "kevin adelman": {relation: "friend", years: 17},
  "josh carleton": {relation: "friend", years: 10},
  "jim kolodziej": {relation: "friend", years: 10},
  "mark cassidy": {relation: "friend", years: 8},
  "mark moschel": {relation: "friend", years: 8},
  "husam najib": {relation: "friend", years: 10},
  "siddharth bhalerao": {relation: "friend", years: 20},
  "vikrant donthamsetti": {relation: "bil"},
  "prashant donthamsetti": {relation: "bil"}
}

var Page1 = React.createClass({
  getInitialState: function() {
    return {
      firstName: "",
      lastName: "",
      error: ""
    };
  },
  submitName: function() {
    this.setState({error: ""});

    var firstName = this.state.firstName.trim();
    var lastName = this.state.lastName.trim();
    var fullName = firstName + " " + lastName
    var groom = groomsman[fullName.toLowerCase()]

    if (!firstName || !lastName || !groom) {
      console.log("Groom does not exist");
      this.setState({error: "Unable to find you in the CIA database. Please try using your real name."})
      return;
    }

    this.setState({firstName: "", lastName: ""})

    // Set state on parent
    this.props.onGroomSelect(fullName.toLowerCase());
    this.props.onChangeStep("next");
  },
  handleInput: function(e) {
    var newState = {};
    newState[e.target.id] = e.target.value;
    this.setState(newState);
  },
  render: function() {
    return (
      <div>
        <h1>Enter your name</h1>
        <input type="text" placeholder="First name"
          id="firstName" value={this.state.firstName}
          onChange={this.handleInput} />
        <input type="text" placeholder="Last name"
          id="lastName" value={this.state.lastName}
          onChange={this.handleInput} />
        <button onClick={this.submitName}>Next</button>
        <div className="error-text">{this.state.error}</div>
      </div>
    );
  }
});

var Page2 = React.createClass({
  nextStep: function() {
    this.props.onChangeStep("next");
  },
  render: function() {
    return (
      <div>
        <h1>Hi, {this.props.name}</h1>
        <button onClick={this.props.onChangeStep.bind(null, "back")}>Back</button>
        <button onClick={this.nextStep}>Next</button>
      </div>
    );
  }
});

var Page3 = React.createClass({
  render: function() {
    return (
      <h1>This is page 3</h1>
    );
  }
});

var Page4 = React.createClass({
  render: function() {
    return (
      <h1>This is page 4</h1>
    );
  }
});

var Pages = React.createClass({
  getInitialState: function() {
    return {
      step: 1,
      name: ""
    };
  },
  changeStep: function(action) {
    switch (action) {
      case "reset":
        this.setState({step: 1});        
        break;
      case "back":
        this.setState({step: this.state.step - 1})
        break;
      case "next":
        this.setState({step: this.state.step + 1})
        break;
      default:
    }
  },
  selectGroom: function(name) {
    this.setState({name: name});
  },
  render: function() {
    var page = null;

    var defaultPage = <Page1 onChangeStep={this.changeStep} onGroomSelect={this.selectGroom} />;
    switch (this.state.step) {
      case 1:
        page = defaultPage
        break;
      case 2:
        page = <Page2 name={this.state.name} onChangeStep={this.changeStep} />;
        break;
      case 3:
        page = <Page3 name={this.state.name} onChangeStep={this.changeStep} />;
        break;
      case 4:
        page = <Page4 name={this.state.name} onChangeStep={this.changeStep} />;
        break;
      default:
        page = defaultPage
    }

    return (
      <div>
        <div>{page}</div>
        <div className="button-container">
          <button onClick={() => this.changeStep("reset")}>Reset</button>
        </div>
      </div>
    );
  }
});

export default App;
