import React, { Component } from 'react';
import { registerUser } from '../../actions/user_actions';
import { connect } from 'react-redux';

class Register extends Component {

    state = {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        repeatPassword: "",
        errors: []
    };

    handleChange = function(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    displayErrors = function(errors) {
        if(errors.length > 0) {
            return errors.map((error, i) => <p key={i}>{error}</p>)
        }
    }

    isFormValid = function() {
        let errors = [];
        let error;
        if(this.isFormEmpty(this.state)) {
            error = {
                message: "Please fill all the details."
            };
            this.setState({
                errors: errors.concat(error)
            });
            return false;
        } else if (this.isPasswordValid(this.state) === false) {
            error = {
                message: "Password is invalid."
            };
            this.setState({
                errors: errors.concat(error)
            });
            return false;
        } else {
            return true;
        }
    }

    isPasswordValid = function({ password, repeatPassword }) {
        if (password.length < 6 || repeatPassword.length < 6) {
            return false;
        } else if (password !== repeatPassword) {
            return false;
        } else {
            return true;
        }
    }

    isFormEmpty = function({ firstname, lastname, email, password, repeatPassword}) {
        return (
            firstname.trim().length === 0 ||
            lastname.trim().length === 0 ||
            email.trim().length === 0 ||
            password.trim().length === 0 ||
            repeatPassword.trim().length === 0
        );
    }

    submitForm = function(event) {
        event.preventDefault();

        const data = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            password: this.state.password,
            repeatPassword: this.state.repeatPassword
        }

        if(this.isFormValid() === true) {
            this.setState({
                errors: []
            });
            this.props.dispatch(registerUser(data))
            .then(response => {
                if(response.payload.success === true) {
                    this.props.history.push('/login');
                } else {
                    this.setState({
                        errors: this.state.errors.concat("Could not send data to database.")
                    });
                }
            })
            .catch(err => {
                this.setState({
                    errors: this.state.errors.concat(err)
                });
            });
        } else {
            console.error('Form is not valid.');
        }
    }

    render() {
        return (
            <div className="container">
                <h3>Create an account</h3>
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s6">
                                <input 
                                    name="firstname"
                                    value={this.state.firstname}
                                    onChange={event => this.handleChange(event)}
                                    id="firstname"
                                    type="text"
                                    className="validate"
                                    required
                                />
                                <label className="active" htmlFor="firstname">First Name</label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s6">
                                <input 
                                    name="lastname"
                                    value={this.state.lastname}
                                    onChange={event => this.handleChange(event)}
                                    id="lastname"
                                    type="text"
                                    className="validate"
                                />
                                <label className="active" htmlFor="lastname">Last Name</label>
                            </div>
                        </div>

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

                        <div className="row">
                            <div className="input-field col s6">
                                <input 
                                    name="repeatPassword"
                                    value={this.state.repeatPassword}
                                    onChange={event => this.handleChange(event)}
                                    id="repeatPassword"
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
                                    Create
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default connect()(Register);