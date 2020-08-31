import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Items.css';
import NavigationItem from './Item/Item';
import NavBtn from '../../../assets/react_redux.png';

class NavigationItems extends Component {

    canLogOut(){
        if(!this.props.mainButtonActiveFlag && !this.props.sitemaintenance){
            return (<NavigationItem link="/logout">Logout</NavigationItem>);
        } 
    }

  

    render() { 
        return (
            <ul className={"NavigationItems"}>
                <div className = {"slider"}>
                   {/* <img className = {classes.slider} src = {NavBtn} alt="slider"/>*/}
                </div> 
                {!this.props.isAuthenticated ? <NavigationItem link="/profile">Profile</NavigationItem> : null }
                {!this.props.isAuthenticated ? <NavigationItem link="/about">About</NavigationItem> : null}
                {!this.props.isAuthenticated ? <NavigationItem link="/default">Home </NavigationItem> : null}    
                {this.props.isAuthenticated ? <NavigationItem link="/">Home</NavigationItem> : null}
              
                {!this.props.isAuthenticated && !this.props.sitemaintenance
                    ? <NavigationItem link="/signin">Sign In</NavigationItem>
                    : this.canLogOut()}
                {/* {this.props.isAuthenticated ?  <NavigationItem link="/billing">Billing</NavigationItem> : null}
                {this.props.isAuthenticated ?  <NavigationItem link="/credit">Credit</NavigationItem> : null} */}
              
            </ul>
        );
    };
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.user.isAuthenticated,
        isAdmin: state.admin.isAdmin,
        mainButtonActiveFlag: state.main.mainButtonActiveFlag,
        sitemaintenance: state.user.sitemaintenance,
        username: state.user.username,
    };
}

const mapDispatchToProps = dispatch => {
    return { };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationItems);