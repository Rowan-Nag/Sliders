import React from 'react';
import './About.css'; 
import { Route, Switch, BrowserRouter } from 'react-router-dom';    
import * as actions from '../../store/actions';
import { connect } from 'react-redux';

class About extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }



    render(){
        return (<div className = {"About"}>About</div>)
    }
}


const mapStateToProps = state => {
    return {
        
        //userId: state.user.userId,
       
    };
}

const mapDispatchToProps = dispatch => {
    return {
        _get: (path) => dispatch(actions._get(path)),
      
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(About);



