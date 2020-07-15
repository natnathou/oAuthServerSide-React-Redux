import React, {Component} from 'react'
import Cookies from "js-cookie"
import {Link} from "react-router-dom"


export default class Header extends Component {
    constructor(props){
        super(props)
        this.refPushable = React.createRef()
        this.refToggle = React.createRef()
    }
    state = {
        user         : {},
        error        : null,
        authenticated: true,
        toggle       : false
    }


    componentDidMount() {
        fetch("/auth/login/success", {
            method     : "GET",
            credentials: "include",
            headers    : {
                Accept                            : "application/json",
                "Content-Type"                    : "application/json",
                "Access-Control-Allow-Credentials": true,
                'Authorization'                   : `${Cookies.get('jwt')}`
            }
        })
            .then(response => {
                if (response.status === 200) return response.json();
                throw new Error("failed to authenticate user");
            })
            .then(responseJson => {
                console.log(responseJson);
                this.setState({
                    authenticated: true,
                    user         : responseJson.user.data
                });
            })
            .catch(error => {
                this.setState({
                    authenticated: false,
                    error        : "Failed to authenticate user"
                });
            });

            this.updateWindowDimensions();
            window.addEventListener('resize', this.updateWindowDimensions);
            window.addEventListener('click', this.onBodyClick);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
        window.removeEventListener('click', this.onBodyClick);
      }
      
    updateWindowDimensions=()=> {
          if(window.innerWidth >=992){
            this.setState({toggle: false})
          }
      }

      onBodyClick = (event) => {
        if (this.refToggle.current.contains(event.target)) {
          return;
        }
  
        this.setState({toggle: false})
      };
  

    Toggle = () => {
        this.setState({toggle: !this.state.toggle})

    };

    handleClick = () => {
        this.setState({toggle: false})
    };

    _handleLogout = () => {
        window.open(`${process.env.REACT_URL_SERVER}/auth/logout`, "_self");
        Cookies.set('jwt', false);
    };


    render() {
        return (
            <div>
                <div className="ui grid">
                    {/*for bigScreen*/}
                    <div className="computer only row">
                        <div className="column">
                            <div className="ui secondary pointing menu">
                                <Link to="/" className="item">
                                    <h2>
                                        OAuth
                                    </h2>
                                </Link>
                                <h4 className="right menu">
                                                                         
                                        {
                                        !this.state.authenticated 
                                            ?
                                            <div className="item">   
                                                
                                            <Link to="/login" className="item">
                                                <button className="ui teal button">
                                                    Login
                                                </button>                                                    
                                            </Link>
                                            </div>
                                            :
                                            null
                                        }
                                        {
                                        !this.state.authenticated 
                                            ?
                                            <div className="item">
                                        
                                            <Link to="/signup" className="item">
                                                <button className="ui twitter button">
                                                    Signup
                                                </button>
                                            </Link>
                                            </div>
                                            :
                                            <div className="item">
                                            <Link 
                                            to=""
                                            className="" 
                                            onClick={this._handleLogout} 
                                            >
                                                <button className="ui negative basic button">
                                                    Logout
                                                </button>
                                            </Link>
                                            </div>
                                        }
                                   
                                </h4>
                            </div>
                        </div>
                    </div>
                    {/*for smallScreen*/}
                    <div className="tablet mobile only row">
                        <div className="column">
                            <div className="ui secondary pointing menu">
                                <Link to="/" className="item">
                                    <h2>
                                        oAuth
                                    </h2>
                                </Link>
                                <div className="right menu">
                                    <div className="item" ref={this.refToggle}>
                                        <div id="mobile_item" className="item" onClick={this.Toggle}>
                                            <i className="bars icon"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                {
                    this.state.toggle
                        ?
                        <div className="overflowCondition containerPushable">
                            <div className="Pushables" ref={this.refPushable} onClick={this.handleClick}>
                                <div className="ui floated right">
                                    <div className="ui vertical menu">
                                        {
                                        !this.state.authenticated 
                                            ?
                                                
                                            <Link to="/login" className="ui teal button item buttonHamburger">
                                                Login
                                            </Link>
                                            :
                                            null
                                        }
                                        {
                                        !this.state.authenticated 
                                            ?
                                        
                                            <Link to="/signup" className="ui item button blue-twitter buttonHamburger">
                                                Signup
                                            </Link>
                                            :
                                            <Link 
                                                to="" 
                                                className="ui red button buttonHamburger item"  
                                                onClick={this._handleLogout}
                                                >
                                               Logout                                                    
                                            </Link>
                                        }
                                    </div>

                                </div>
                            </div>
                        </div>
                        :
                        null
                }
            </div>
            
        )
    }
}
