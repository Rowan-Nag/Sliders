import React from 'react';
import './Signin.css'; 
import { Route, Switch, BrowserRouter } from 'react-router-dom';    
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import { auth } from 'firebase';
const emailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
//isValid = pattern.test(value)

class Signin extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",

            warning: null
        }
        
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onSubmitHandler(e){
        e.preventDefault();
        if(emailPattern.test(this.state.username) && this.state.password.length > 5){
            let formData = {
                email: this.state.username,
                password: this.state.password
            }
            console.log(formData);
            this.props.auth(formData, true);
        }else{
            this.setState({username: "", password: ""});
            this.setState({warning: <h3>Invalid submission</h3>})
        }
    }

    render(){
        return (<div className = {"Signin"}>
            <form autoComplete="off" onSubmit={this.onSubmitHandler}>
            <input placeholder = {"username"} 
                onChange = {(e)=> {
                
                    this.setState({username:e.target.value});
                
                    }} 
                    value = {this.state.username}
                    /> 
            <input placeholder = {"password"} 
                onChange = {(e)=> {
                
                    this.setState({password:e.target.value});
                
                    }} 
                    value = {this.state.password}
                    /> 

            <button>Submit</button>
            </form>
                    {this.state.warning || <h3><br/>Enter your email and password above</h3>}
        </div>)
    }
}




const mapStateToProps = state => {
    return {
        
        //userId: state.user.userId,
       userId: state.user.userId,
       isAuthenticated: state.user.isAuthenticated,
       userEmail: state.user.userEmail,
       
    };
}

const mapDispatchToProps = dispatch => {
    return {
        //_get: (path) => dispatch(actions._get(path)),
        getTest: () => dispatch(actions.getTest()),
        auth: (formData, isSignup) => dispatch(actions.auth(formData, isSignup)),
        authSignIn: (userId, userEmail) => dispatch(actions.authSignIn(userId, userEmail)),
        authSignOut: () => dispatch(actions.authLogOut()),

    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Signin);