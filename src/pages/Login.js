import React, { Component } from 'react';

import { MDBContainer, MDBRow, MDBBtn, MDBCard, MDBInput } from 'mdbreact';

import auth from "../utils/Auth";

class Login extends Component {

    constructor(props) {
        super(props)
        // Don't call this.setState() here!
        this.state = {
            isAuthenticated: false,
            user: '',
            pass: '',
        }

        this.onLogin = this.onLogin.bind(this)
        this.isAuthenticated = this.isAuthenticated.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount() {
        this.isAuthenticated()
    }

    isAuthenticated() {
        // const _self = this

        const isAuthenticated = auth.isAuthenticated()
        /*
        promise.then(user => {
            _self.setState({ isAuthenticated: true, isLoading: false })
            _self.props.history.push("/dashboard");
        }).catch(e => {
            console.log(e)
            _self.setState({ isAuthenticated: false, isLoading: false })
        })
        */
       if(isAuthenticated){
        this.setState({ isAuthenticated: true, isLoading: false })
        this.props.history.push("/dashboard");
       }else{
        this.setState({ isAuthenticated: false, isLoading: false })
       }
        console.log('isAuthenticated', isAuthenticated)
    }


    onLogin() {
        const _self = this
        auth.login(this.state).catch(function (error) {
            // Handle Errors here.
            console.log(error)
            alert(error.message)

        }).then(function (e) {
            console.log(e)

            if (e) {
                _self.props.history.push("/dashboard");
            }

        });


    }

    handleChange(event) {

        let newValue = this.state
        newValue[event.target.name] = event.target.value;
        this.setState(newValue);
    }

    loginUI() {
        const { user, pass } = this.state
        return (
            <MDBContainer className="d-flex justify-content-center align-items-center"
                style={{ marginTop: 80 }}>
                <MDBCard
                    className="login"
                    style={{ width: 380 }}
                >
                    <div className="text-white rgba-stylish-strong py-5 px-5 z-depth-4">
                        <div className="text-center">
                            <h3 className="white-text mb-5 mt-4 font-weight-bold">
                                <strong>Login</strong>
                            </h3>
                        </div>
                        <MDBInput
                            style={{ color: '#fff' }}
                            label="Your email"
                            group
                            type="text"
                            value={user} name="user"
                            onChange={this.handleChange}
                            validate />
                        <MDBInput
                            style={{ color: '#fff' }}
                            label="Your password"
                            group
                            type="password"
                            value={pass}
                            name="pass"
                            onChange={this.handleChange}
                            validate />

                        <MDBRow className="d-flex align-items-center mb-4">
                            <div className="text-center mb-3 col-md-12">
                                <MDBBtn
                                    color="primary"
                                    type="button"
                                    onClick={this.onLogin}
                                >
                                    Login
                                        </MDBBtn>
                            </div>
                        </MDBRow>
                    </div>
                </MDBCard>
            </MDBContainer>
        )
    }

    render() {
        const { isAuthenticated, isLoading } = this.state

        return (
            <div>{isLoading ?
                <div className="loader border-top-info"></div> 
                :
                <div>
                    {isAuthenticated ? null : this.loginUI()}
                </div>}
            </div>
        )



    }
}

export default Login