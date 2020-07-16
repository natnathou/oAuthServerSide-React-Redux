import React, {Component} from 'react'
import Cookies from "js-cookie"
import history from "../../history/history"
import {connect} from "react-redux"
import {authenticatedTest} from "../../actions/actions"


class SecurePage extends Component {

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
                return response.json()
                
            })
            .catch((e) => {
                history.push("/login")
            });

    }



    render() {
        return (
            
                <React.Fragment>
                    {
                        this.props.authenticated.status
                        ?
                        <div>Route Secure</div>
                        :
                        null
                    }
                </React.Fragment>
                

            
            
        )
    }
}


const mapStateToProps = (state) => {
    return {
        authenticated: state.authenticated
    }

};
export default connect(
    mapStateToProps, {authenticatedTest}
)(SecurePage)
