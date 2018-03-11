import React, { Component } from 'react';
import { BrowserRouter as Router, NavLink, Redirect, Prompt } from "react-router-dom";
import Route from "react-router-dom/Route";

import User from "../components/User"

import './App.css';

class App extends Component {
	state = {
		loggedIn: false
	}

	loginHandle = () => {
		this.setState(prevState => ({
				loggedIn: !prevState.loggedIn
		}));
	}

  render() {
    return (
    	<Router>
	      <div className="App">
	      	<NavLink to="/" exact activeStyle={{color: "green"}}>Home</NavLink>
	      	<br />
	      	<NavLink to="/about" activeStyle={{color: "green"}}>About</NavLink>
	      	<br />
	      	<NavLink to="/user/peter" activeStyle={{color: "green"}}>User Peter</NavLink>
	      	<br />
	      	<NavLink to="/user/john" activeStyle={{color: "green"}}>User John</NavLink>
	      	<br /><br />
	      	<input 
	      		type="button" 
	      		value={ this.state.loggedIn 
	      			? "log out"
	      			: "log in"
	      		} 
	      		onClick={this.loginHandle} 
	      	/>
	      	<br />
	      	<Prompt
	      		when={!this.state.loggedIn}
	      		message={(location) => {
	      			return(
	      				location.pathname.startsWith("/user") ? "Are you sure?" : true
	      			);
	      		}} />
	      	<hr />
	      {/*  ----------------         ------------------*/}
	        <Route path="/" exact render={
	        	() => <h1>Welcome Home!</h1>
	        } />
	        <Route path="/about" render={
	        	() => <h1>Welcome About!</h1>
	        } />
	        {/*<Route path="/user/:username" exact strict component={User} />*/}
	        <Route path="/user/:username" exact strict 
	        	render={ ({match}) => 
		        	{ return( this.state.loggedIn 
			        		? <User username={match.params.username} /> 
			        		: <Redirect to="/" />);
		        	}
		        } 
		      />
	      </div>
	    </Router>
    );
  }
}

export default App;
