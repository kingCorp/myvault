import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Container, Spinner, Button } from "native-base";
import styles from "./styles";

class SignupFormComponent extends Component {

    constructor(props) {
        super(props);
        this.state = { btnClicked: false };
    }

    render() {
        return (
            <KeyboardAwareScrollView>
                <Container style={styles.container}>
                    <View style={{ flex: 1, width: "80%", justifyContent: "flex-end" }}>
                        <Text style={{ fontSize: 40, fontWeight: "100", color: "#263238", textAlign: "center" }}>Create account</Text>

                        {this.props.signupform}

                        {this.state.btnClicked ? <Spinner color="#263238" /> :
                            <Button block rounded
                                style={styles.btn}
                                onPress={() => this.props.signup()}>
                                <Text style={styles.btnText}> CREATE </Text>
                            </Button>}
                    </View>
                    <View style={{ justifyContent: "flex-end", flex: 0.1 }}>
                    </View>
                </Container>
            </KeyboardAwareScrollView>
        )
    }
}


export default SignupFormComponent
