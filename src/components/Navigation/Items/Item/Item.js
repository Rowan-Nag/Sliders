import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import'./Item.css';

class Item extends Component {

    componentDidUpdate() { }

    render() {

    return (
            <li className={"NavigationItem"}>
                <NavLink 
                    to={this.props.link}
                    exact
                    activeClassName={"NavigationItem"}
                    >{this.props.children}
                </NavLink>
            </li>
        );
    };
};

export default Item;