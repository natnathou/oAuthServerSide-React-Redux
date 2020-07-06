import React, {Component} from 'react'
import Cookies from "js-cookie"
import {Link} from "react-router-dom"


export default class Header extends Component {
    state = {
        user         : {},
        error        : null,
        authenticated: false
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
    }

    _handleLogout = () => {
        window.open(`${process.env.REACT_URL_SERVER}/auth/logout`, "_self");
        Cookies.set('jwt', false);
    };


    render() {
        return (
            <div className="ui secondary pointing menu">
                <Link to="/" className="item">
                    <h2>
                        OAuth App
                    </h2>
                </Link>
                <h4 className="right menu">
                    {!this.state.authenticated ?
                        <div className="item">
                            <Link to="/login" className="item">
                                <button className="ui positive  basic button">
                                    Login
                                </button>
                            </Link>
                            <Link to="/signup" className="item">
                                <button className="ui twitter button">
                                    Signup
                                </button>
                            </Link>
                        </div>
                        :
                        <div className="item">
                            <button className="ui negative basic button" onClick={this._handleLogout}>
                                Logout
                            </button>
                        </div>
                    }
                </h4>
            </div>
        )
    }
}
