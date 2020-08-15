import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/user_actions';
import { Link } from 'react-router-dom';

class Login extends Component {

    state = {
        email: "",
        password: "",
        errors: []
    };

    handleChange = function(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    submitForm = function(event) {
        event.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password
        };
        if(this.isFormValid(this.state)) {
            this.setState({
                errors: []
            });
            this.props.dispatch(loginUser(data))
            .then(response => {
                if(response.payload.loginSuccess === true) {
                    this.props.history.push('/');
                } else {
                    this.setState({
                        errors: this.state.errors.concat("Invalid email or password.")
                    });
                }
            })
            .catch(err => console.log(err));
        } else {
            this.setState({
                errors: this.state.errors.concat("Form invalid.")
            });
            console.log(this.state.errors);
        }
        
    }

    isFormValid = function({ email, password }) {
        return email && password;
    }

    displayErrors = function(errors) {
        if(errors.length > 0) {
            return errors.map((error, i) => <p key={i}>{error}</p>)
        }
    }

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
                                    value={this.state.email}
                                    onChange={event => this.handleChange(event)}
                                    id="email"
                                    type="email"
                                    className="validate"
                                    required
                                />
                                <label className="active" htmlFor="email">Email</label>
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
                                    value={this.state.password}
                                    onChange={event => this.handleChange(event)}
                                    id="password"
                                    type="password"
                                    className="validate"
                                    required
                                />
                                <label className="active" htmlFor="password">Password</label>
                                <span
                                    className="helper-text"
                                    data-error="Incorrect password."
                                    data-success="Correct password."
                                />
                            </div>
                        </div>
                        <div>
                            {this.displayErrors(this.state.errors)}
                        </div>
                        <div className="row">
                            <div className="col s6">
                                <button
                                    className="btn waves-effect red lighten-2"
                                    type="submit"
                                    name="action"
                                    onClick={event => this.submitForm(event)}
                                >
                                    Login
                                </button>
                                &nbsp; &nbsp;
                                <Link to="/register">
                                    <button
                                        className="btn waves-effect red lighten-2"
                                        type="submit"
                                        name="action"
                                    >
                                        Sign up
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Login);