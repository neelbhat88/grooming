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
    { relation: "brother", years: 28, nickname: "Hershwiz",
      old_picture: "https://d13a0hp1k8a4rs.cloudfront.net/groomsmen_app/me_and_hershel.jpg",
      new_picture: "https://d13a0hp1k8a4rs.cloudfront.net/groomsmen_app/me_and_hershel_new.jpg",
      location: "https://d13a0hp1k8a4rs.cloudfront.net/groomsmen_app/map_chicago.jpg"
    },
  "eric solomonson":
    { relation: "friend", years: 18, nickname: "Eric",
      old_picture: "https://d13a0hp1k8a4rs.cloudfront.net/groomsmen_app/me_and_eric.jpg",
      new_picture: "https://d13a0hp1k8a4rs.cloudfront.net/groomsmen_app/me_and_eric_new.jpg",
      location: "https://d13a0hp1k8a4rs.cloudfront.net/groomsmen_app/map_boston.jpg"
    },
  "kevin adelman":
    { relation: "friend", years: 17, nickname: "Kev",
      old_picture: "https://d13a0hp1k8a4rs.cloudfront.net/groomsmen_app/me_and_kevin.jpg",
      new_picture: "https://d13a0hp1k8a4rs.cloudfront.net/groomsmen_app/me_and_kevin_new.jpg",
      location: "https://d13a0hp1k8a4rs.cloudfront.net/groomsmen_app/map_chicago.jpg"
    },
  "josh carleton":
    { relation: "friend", years: 10, nickname: "Joshua",
      old_picture: "https://d13a0hp1k8a4rs.cloudfront.net/groomsmen_app/me_and_josh.jpg",
      new_picture: "https://d13a0hp1k8a4rs.cloudfront.net/groomsmen_app/me_and_josh_new.jpg",
      location: "https://d13a0hp1k8a4rs.cloudfront.net/groomsmen_app/map_boston.jpg"
    },
  "jim kolodziej":
    { relation: "friend", years: 10, nickname: "Jimmy",
      old_picture: "https://d13a0hp1k8a4rs.cloudfront.net/groomsmen_app/me_and_jim.jpg",
      new_picture: "https://d13a0hp1k8a4rs.cloudfront.net/groomsmen_app/me_and_jim_new.jpg",
      location: "https://d13a0hp1k8a4rs.cloudfront.net/groomsmen_app/map_chicago.jpg"
    },
  "mark cassidy":
    { relation: "friend", years: 8, nickname: "Mark",
      old_picture: "https://d13a0hp1k8a4rs.cloudfront.net/groomsmen_app/me_and_cassidy.jpg",
      new_picture: "https://d13a0hp1k8a4rs.cloudfront.net/groomsmen_app/me_and_cassidy_new.jpg",
      location: "https://d13a0hp1k8a4rs.cloudfront.net/groomsmen_app/map_stanford.jpg"
    },
  "mark moschel":
    { relation: "friend", years: 8, nickname: "Mark",
      old_picture: "https://d13a0hp1k8a4rs.cloudfront.net/groomsmen_app/me_and_moschel.jpg",
      new_picture: "https://d13a0hp1k8a4rs.cloudfront.net/groomsmen_app/me_and_moschel_new.jpg",
      location: "https://d13a0hp1k8a4rs.cloudfront.net/groomsmen_app/map_napa.jpg"
    },
  "husam najib":
    { relation: "friend", years: 10, nickname: "Tom Petty",
      old_picture: "https://d13a0hp1k8a4rs.cloudfront.net/groomsmen_app/me_and_husam.jpg",
      new_picture: "https://d13a0hp1k8a4rs.cloudfront.net/groomsmen_app/me_and_husam_new.jpg",
      location: "https://d13a0hp1k8a4rs.cloudfront.net/groomsmen_app/map_chicago.jpg"
    },
  "siddharth bhalerao":
    { relation: "friend", years: 18, nickname: "Sid",
      old_picture: "https://d13a0hp1k8a4rs.cloudfront.net/groomsmen_app/me_and_siddharth.jpg",
      new_picture: "https://d13a0hp1k8a4rs.cloudfront.net/groomsmen_app/me_and_siddharth_new.jpg",
      location: "https://d13a0hp1k8a4rs.cloudfront.net/groomsmen_app/map_louisville.jpg"
    },
  // "vikrant donthamsetti":
  //   {relation: "bil", nickname: "Veeeeeeeeek"},
  // "prashant donthamsetti":
  //   {relation: "bil", nickname: "Prashant"}
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
      <div className="container text-center">
        <div className="row">
          <h1>Hey, {this.props.groomData.nickname}</h1>
          <br />
          <h3>We've known each other now for {this.props.groomData.years}-ish years! We're getting old ;-)</h3>
          <h3>From then:</h3>
          <div className="picture col-xs-12">
            <img src={this.props.groomData.old_picture} role="presentation" />
          </div>
          <h3>Till now:</h3>
          <div className="picture col-xs-12">
            <img src={this.props.groomData.new_picture} role="presentation" />
          </div>
          <br />
          <br />
          <h3>{"Bro, it's been real. It's been fun. It's been real fun."}</h3>
          <br />
          <br />
          <img src="http://i.giphy.com/wrzf9P70YWLJK.gif" role="presentation"/>
          <br />
          <br />
          <h3>{"Next year, on July 22 2017, I'm taking the next big step in life. It's a big moment and so I wanted to ask you a question..."}</h3>
          <div className="button-container">
            <button className="btn btn-default"
              onClick={this.props.onChangeStep.bind(null, "back")}>Back</button>
            <button className="btn btn-primary"
              onClick={this.nextStep}>Next</button>
          </div>
        </div>
      </div>
    );
  }
});

var Page3 = React.createClass({
  componentDidMount: function() {
    window.scrollTo(0,0);
  },
  render: function() {
    return (
      <div className="container">
        <div className="container text-center">
          <div className="row">
            <h1>{"But, hold on. This doesn't feel right."}</h1>
            <br />
            <h3>{"Since I'm currently living here:"}</h3>
            <br />
            <div className="picture col-xs-12">
              <img src="https://d13a0hp1k8a4rs.cloudfront.net/groomsmen_app/map_lexington.jpg" role="presentation" />
            </div>

            <h3>And you are living here</h3>
            <br />
            <div className="picture col-xs-12">
              <img src={this.props.groomData.location} role="presentation" />
            </div>

            <h3>We'll have to use our imaginations a bit</h3>

            <div className="button-container">
              <button className="btn btn-default"
                onClick={this.props.onChangeStep.bind(null, "back")}>Back</button>
              <button className="btn btn-primary"
                onClick={this.props.onChangeStep.bind(null, "next")}>Next</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var Page4 = React.createClass({
  componentDidMount: function() {
    window.scrollTo(0,0);
  },
  answerNo: function() {
    alert("Congrats! You have just been signed up for hourly texts from Cat Facts - the leading provider of useless information about Cats. This service cannot be cancelled. Enjoy!");
  },
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 text-center">
            <h1>{"Let's imagine:"}</h1>
            <br />
            <h3>{"We're hanging out. Maybe at a bar."}</h3>

            <div className="picture col-xs-12">
              <img src="https://d13a0hp1k8a4rs.cloudfront.net/groomsmen_app/bar.jpg" role="presentation" />
            </div>

            <h3>{"With some sort of drink in hand."}</h3>
            <br />
            <div className="picture col-xs-12">
              <img src="https://d13a0hp1k8a4rs.cloudfront.net/groomsmen_app/drink_pic.jpg" role="presentation" />
            </div>

            <h3>{"Ok, the scene has been set. And now back to my question."}</h3>
            <br />
            <br />
            <h2>{"Bro, will you be one of my groomsmen?"}</h2>

            <h4>Your Answer</h4>
            <div className="button-container">
              <button className="btn btn-default" onClick={this.answerNo}>No</button>
              <button className="btn btn-primary" onClick={this.props.onChangeStep.bind(null, "next")}>YES!</button>
            </div>

            <div className="button-container">
              <button className="btn btn-default" onClick={this.props.onChangeStep.bind(null, "back")}>Back</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var Page5 = React.createClass({
  componentDidMount: function() {
    window.scrollTo(0,0);
  },
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 text-center">
            <img src="http://i.giphy.com/3ornk5Sou1XMaL44bS.gif" width="100%" role="presentation" />

            <div className="button-container">
              <button className="btn btn-default"
                onClick={this.props.onChangeStep.bind(null, "back")}>Back</button>
              <button className="btn btn-primary"
                onClick={this.props.onChangeStep.bind(null, "next")}>Next</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var Page6 = React.createClass({
  componentDidMount: function() {
    window.scrollTo(0,0);
  },
  otherGroomsmen: function() {
    var names = Object.keys(groomsman);
    var index = names.indexOf(this.props.name);
    names.splice(index, 1);

    return names.join(", ");
  },
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 text-center">
            <h2>{this.props.groomData.nickname}, looking forward to having you be a part of the big day!</h2>
            <br />
            <h4>You'll be alongside this group of awesome dudes:</h4>
            <div>{this.otherGroomsmen()}</div>
            <br />
            <br />
            <img src="http://enzian.org/wp-content/uploads/2016/02/The-Sandlot-Hero.jpg" width="100%" role="presentation" />
            <br />
            <br />
            <br />

            <h3>{"Oh, one final thing. During our ceremony you'll be wearing a traditional Indian outfit which I'll be getting for you. To make sure I get one that fits you right, can you please send me the following measurements?"}</h3>
            <br />
            <br />
            <div className="col-xs-8 col-xs-offset-2">
              <img src="https://d13a0hp1k8a4rs.cloudfront.net/groomsmen_app/kurta.jpg" width="100%" role="presentation" />
            </div>

            <br />
            <br />

            <div className="col-xs-12">
              <h3>{"Thanks! We're all going to look REAL good."}</h3>
              <br />
              <h3>{"And as far as the bachelor party is concerned, I'm thinking Spring 2017. More information for that to follow. I'm pumped to have you as one of my groomsmen!"}</h3>
            </div>

            <div className="col-xs-12 button-container">
              <button onClick={this.props.onChangeStep.bind(null, "back")}>Back</button>
            </div>
          </div>
        </div>
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
