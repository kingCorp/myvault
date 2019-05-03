import React, { Component } from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import { Form, Item, Input, Icon, Label, } from "native-base";

import SignupFormComponent from './Component';
import styles from './styles'


class SignupContainer extends Component {

    constructor(props) {
        super(props);
        this.state = { phone: '', password: '', email: '', name: '' };
    }

    signin = () => {
        Alert.alert('signin', this.state.phone + ' - ' + this.state.password);

    }

    render() {
        const form = (
            <Form style={{ justifyContent: "space-between" }}>
                <Item floatingLabel style={styles.input}>
                    <Icon name='person' style={{ color: '#263238' }} />
                    <Label>Username</Label>
                    <Input
                        placeholderTextColor="#263238"
                        keyboardType="default"
                        style={{ color: "#263238" }}
                        onChangeText={(name) => this.setState({ name })} value={this.state.name} />
                </Item>

                <Item floatingLabel style={styles.input}>
                    <Icon name='mail' style={{ color: '#263238' }} />
                    <Label>Email</Label>
                    <Input
                        placeholderTextColor="#263238"
                        keyboardType="email-address"
                        style={{ color: "#263238" }}
                        onChangeText={(email) => this.setState({ email })} value={this.state.email} />
                </Item>

                <Item floatingLabel style={styles.input}>
                    <Icon name='md-phone-portrait' style={{ color: '#263238' }} />
                    <Label>Phone number</Label>
                    <Input
                        placeholderTextColor="#263238"
                        keyboardType="phone-pad"
                        style={{ color: "#263238" }}
                        maxLength={11}
                        onChangeText={(phone) => this.setState({ phone })} value={this.state.phone} />
                </Item>

                <Item floatingLabel style={styles.input}>
                    <Icon name='lock' style={{ color: '#263238' }} />
                    <Label>Password</Label>
                    <Input
                        placeholderTextColor="#263238"
                        secureTextEntry={true}
                        style={{ color: "#263238" }}
                        onChangeText={(password) => this.setState({ password })} value={this.state.password} />
                </Item>

            </Form>
        )

        return (
            <SignupFormComponent
                signup={() => this.signup()}
                signupform={form}
            />
        )
    }
}


export default SignupContainer
