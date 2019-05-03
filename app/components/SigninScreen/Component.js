import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View, Alert, StatusBar } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Container, Spinner, Button, Icon } from "native-base";
import styles from "./styles";
import LoadingIndicator from '../LoadingIndicator/Component';


class SigninFormComponent extends Component {

    constructor(props) {
        super(props);
        this.state = { btnClicked: false };
    }

    render() {
        const { isFetching } = this.props.auth
        return (
            <KeyboardAwareScrollView>

                {
                    isFetching && <LoadingIndicator />
                }
                <Container style={styles.container}>
                    <View style={{ flex: 2, width: "80%", justifyContent: "flex-end" }}>
                        <Text style={{ fontSize: 70, fontWeight: "300", color: "#263238", textAlign: "center" }}>V<Icon name='lock' style={{ fontSize: 50, color: '#263238' }} />ult</Text>
                        
                        {this.props.signinform}

                        <View style={{ alignContent: "center", justifyContent: "center" }}>
                               {isFetching ? <Spinner color="#263238" /> : <Button block rounded
                                    style={styles.btn}
                                    onPress={() => this.props.signin()}>
                                    <Text style={styles.btnText}> SIGN IN </Text>
                                </Button>}
                               
                            <Button transparent
                                onPress={() => this.props.forgot()}>
                                <Text style={{ color: "#263238", fontWeight: "bold", fontSize: 14 }}>Forgot your password?</Text>
                            </Button>
                        </View>
                    </View>

                    <View style={{ justifyContent: "flex-end", flex: 0.2 }}>
                        <Button transparent
                            onPress={() => this.props.signup()}>
                            <Text style={{ color: "#263238", fontWeight: "bold", fontSize: 14 }}>CREATE ACCOUNT !!!</Text>
                        </Button>
                    </View>
                </Container>
            </KeyboardAwareScrollView>
        )
    }
}


export default SigninFormComponent
