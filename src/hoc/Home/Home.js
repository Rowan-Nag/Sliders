import React from 'react';
import './Home.css'; 
import { Route, Switch, BrowserRouter } from 'react-router-dom';    
import * as actions from '../../store/actions';
import { connect } from 'react-redux';

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentScrollHeight:0,
        }
    }


    componentDidMount(){
        window.onscroll =()=>{
            const newScrollHeight = Math.ceil(window.scrollY / 25) *25;
            if (this.state.currentScrollHeight != newScrollHeight){
                this.setState({currentScrollHeight: newScrollHeight})
            }
    }

}



    render(){
        return (<div className = {"Home"}>
            <div style ={{opacity:Math.min(100 / this.state.currentScrollHeight  , 1)}} className = {"Banner"}>
            <h1 className = {"Title"}>Title of Site</h1>
                <img src = {"https://prod.wp.cdn.aws.wfu.edu/sites/375/2020/04/desktop_night.jpg"} />
              
            </div>
            <div   className = {"Container"}>
                <h1 className = {"Title"}>TITLE A</h1>
                <img src ={"http://www.jenniferheffner.com/wp-content/uploads/2014/03/Enviromental-Photography-jpg.jpg"}/>
                <div className = {"Text"}> 
                    Why do we use it?
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', 
                    making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, 
                    and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, 
                    sometimes by accident, sometimes on purpose (injected humour and the like).
                </div>
            </div>

        <div className = {"Container"}>
        <h1 className = {"Title"}>TITLE B</h1>
                <img src = {"https://rightasrain.uwmedicine.org/sites/chew/files/styles/large/public/images/2018/going-vegan.jpg?h=a61a7e7e&itok=RLMcPHvf"}/>
                <div className = {"Text"}> 
                Why do we use it?
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', 
                making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, 
                and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, 
                sometimes by accident, sometimes on purpose (injected humour and the like).
               </div>
            </div>
         

            <div className = {"Container"}>
                <h1 className = {"Title"}>TITLE C</h1>
                <img src = {"https://c.wallhere.com/photos/77/e5/National_Geographic_pollution_environment-84054.jpg!d"}/>
                <div className = {"Text"}> 
                Why do we use it?
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', 
                making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, 
                and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, 
                sometimes by accident, sometimes on purpose (injected humour and the like).
               </div>
            </div>
        </div>)
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);


