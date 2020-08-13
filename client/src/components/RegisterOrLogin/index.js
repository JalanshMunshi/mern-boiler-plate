import React, { Component } from 'react';

class Login extends Component {
    render() {
        return (
            <div className="container">
                <h3>Login</h3>
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s6">
                                <input 
                                    name="email"
                                    // value={this.state.email}
                                    // onChange={this.handleChange()}
                                    id="email"
                                    type="email"
                                    className="validate"
                                    required
                                />
                                <label htmlFor="email">Email</label>
                                <span
                                    className="helper-text"
                                    data-error="Please enter a valid email."
                                    data-success="Valid email."
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <input 
                                    name="password"
                                    // value={this.state.password}
                                    // onChange={this.handleChange()}
                                    id="password"
                                    type="password"
                                    className="validate"
                                    required
                                />
                                <label htmlFor="password">Password</label>
                                <span
                                    className="helper-text"
                                    data-error="Incorrect password."
                                    data-success="Correct password."
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s6">
                                <button
                                    className="btn waves-effect red lighten-2"
                                    type="submit"
                                    name="action"
                                    // onClick={this.submitForm}
                                >
                                    Login
                                </button>
                            </div>
                        </div>
                    </form>
                
                </div>
                This is the login page.
            </div>
        );
    }
}

export default Login;