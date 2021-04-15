import React from 'react';
import './Play.css'; 
import { Route, Switch, BrowserRouter } from 'react-router-dom';    
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import Canvasc from "../../components/game/Game";
import { pushBoard } from '../../store/actions/main';


class Play extends React.Component {


    render(){
        return(<div>
            <Canvasc/>
        </div>)

    }
}

export default Play;