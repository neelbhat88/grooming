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
  "hershel bhat":
    {relation: "brother", years: 28, nickname: "Hershwiz", },
  "eric solomonson":
    {relation: "friend", years: 18, nickname: "Eric"},
  "kevin adelman":
    {relation: "friend", years: 17, nickname: "Kev"},
  "josh carleton":
    {relation: "friend", years: 10, nickname: "Joshua"},
  "jim kolodziej":
    {relation: "friend", years: 10, nickname: "Jimmy"},
  "mark cassidy":
    {relation: "friend", years: 8, nickname: "Mark"},
  "mark moschel":
    {relation: "friend", years: 8, nickname: "Mark"},
  "husam najib":
    {relation: "friend", years: 10, nickname: "Tom Petty"},
  "siddharth bhalerao":
    {relation: "friend", years: 20, nickname: "Sid"},
  "vikrant donthamsetti":
    {relation: "bil", nickname: "Veeeeeeeeek"},
  "prashant donthamsetti":
    {relation: "bil", nickname: "Prashant"}
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
      <div className="page1 container">
        <div className="row">
          <div className="col-xs-12 text-center">
            <h1>Enter your name</h1>
            <div className="input-container">
              <input type="text" placeholder="First name"
                id="firstName" value={this.state.firstName}
                onChange={this.handleInput}
                className="name-input" />
              <input type="text" placeholder="Last name"
                id="lastName" value={this.state.lastName}
                onChange={this.handleInput}
                className="name-input" />
            </div>
            <div className="button-container">
              <button onClick={this.submitName}
                className="btn btn-primary">Next</button>
              <div className="error-text">{this.state.error}</div>
            </div>
          </div>
        </div>
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
        <h1>Hey, {this.props.groomData.nickname}</h1>
        <h3>We've known each other now for {this.props.groomData.years} years! We're getting old ;-)</h3>
        <h5>pictures here...</h5>
        <h3>Next year, on July 22 2017, I'm taking the next big step in life. So I have a question for you...</h3>
        <button onClick={this.props.onChangeStep.bind(null, "back")}>Back</button>
        <button onClick={this.nextStep}>Next</button>
      </div>
    );
  }
});

var Page3 = React.createClass({
  render: function() {
    return (
      <div>
        <h3>Since I'm currently living here</h3>
        <h5>Map of Lexington</h5>
        <h3>And you are living here</h3>
        <h5>Map of their location</h5>
        <h3>We'll have to use our imaginations a bit</h3>
        <button onClick={this.props.onChangeStep.bind(null, "back")}>Back</button>
        <button onClick={this.props.onChangeStep.bind(null, "next")}>Next</button>
      </div>
    );
  }
});

var Page4 = React.createClass({
  answerNo: function() {
    alert("Congrats! You have just been signed up for hourly texts from Cat Facts - the leading provider of useless information about Cats. This service cannot be cancelled. Enjoy!");
  },
  render: function() {
    return (
      <div>
        <h3>So let's pretend, we're hanging out. Maybe at a bar</h3>
        <h5>picture of a bar</h5>
        <h3>With some sort of drink in hand</h3>
        <h5>picture with a drink in hand</h5>
        <h5>question</h5>
        <button onClick={this.answerNo}>No</button>
        <button onClick={this.props.onChangeStep.bind(null, "next")}>YES!</button>

        <button onClick={this.props.onChangeStep.bind(null, "back")}>Back</button>
      </div>
    );
  }
});

var Page5 = React.createClass({
  render: function() {
    return (
      <div>
        <h5>Gif here: "http://i.giphy.com/3ornk5Sou1XMaL44bS.gif"</h5>

        <button onClick={this.props.onChangeStep.bind(null, "back")}>Back</button>
        <button onClick={this.props.onChangeStep.bind(null, "next")}>Next</button>
      </div>
    );
  }
});

var Page6 = React.createClass({
  render: function() {
    return (
      <div>
        <h3>{this.props.groomData.nickname}, looking forward to having you be a part of the big day!</h3>
        <button onClick={this.props.onChangeStep.bind(null, "back")}>Back</button>
      </div>
    );
  }
});

var Pages = React.createClass({
  getInitialState: function() {
    return {
      step: 1,
      name: "",
      groomData: {}
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
    this.setState({name: name, groomData: groomsman[name]});
  },
  render: function() {
    var page = null;

    var defaultPage = <Page1 onChangeStep={this.changeStep} onGroomSelect={this.selectGroom} />;
    switch (this.state.step) {
      case 1:
        page = defaultPage
        break;
      case 2:
        page = <Page2 name={this.state.name} groomData={this.state.groomData} onChangeStep={this.changeStep} />;
        break;
      case 3:
        page = <Page3 name={this.state.name} groomData={this.state.groomData} onChangeStep={this.changeStep} />;
        break;
      case 4:
        page = <Page4 name={this.state.name} groomData={this.state.groomData} onChangeStep={this.changeStep} />;
        break;
      case 5:
        page = <Page5 onChangeStep={this.changeStep} />;
        break;
      case 6:
        page = <Page6 name={this.state.name} groomData={this.state.groomData} onChangeStep={this.changeStep} />;
        break;
      default:
        page = defaultPage
    }

    return (
      <div>
        <div className="reset-container">
          <i onClick={() => this.changeStep("reset")}
             className="fa fa-sign-out clickable"
             title="Reset"></i>
        </div>
        <div>{page}</div>
      </div>
    );
  }
});

export default App;
