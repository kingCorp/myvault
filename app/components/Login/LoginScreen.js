// @flow
import React, { Component } from 'react';
import { Text, View,Alert, StatusBar, ToastAndroid, AsyncStorage } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Container, Header, Content, Form, Item, Input, Spinner, Button, Icon, Toast, Label, } from "native-base";
import styles from "./styles";
import axios from "axios";


type Props = {};
export default class Login extends Component<Props, State> {

    constructor(props) {
        super(props);

        this.state = {
            btnClicked: false,
            phone: "",
            password: "",
            biometricType: null
        };
        
    }

    async _login(navigate) {
        if (this.state.phone == "" && this.state.password == "")
            return ToastAndroid.show('Kindly fill all fields', ToastAndroid.SHORT);

        if (this.state.phone.length != 11)
            return ToastAndroid.show('phone number must be 11 digits', ToastAndroid.SHORT);

        if (this.state.password.length < 5)
            return ToastAndroid.show('Password must be at least 5 digits', ToastAndroid.SHORT);

        try {
            this.setState({ btnClicked: !this.state.btnClicked });
            let url = `https://rnvault.herokuapp.com/user/login`;
            const options = {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                data: {
                    'phone': this.state.phone,
                    'password': this.state.password
                },
                url
            }
            const data = await axios(options)
            this.setState({ btnClicked: !this.state.btnClicked, password: "" });
            console.log(data);
            AsyncStorage.multiSet([['token', data.data.token],['userId', data.data.userId]], ()=>{
                console.log('it stored in async')
            });
            Alert.alert('Success', "You are logged in")
            navigate("Tab");
        } catch (e) {
            console.log(e);
            //Alert.alert('Failed', JSON.stringify(e.response.data.message))
            Alert.alert('Failed', 'Network Error or Phone and Password mismatch');
            this.setState({ btnClicked: !this.state.btnClicked, password: "" });
        }

    }

    forgot() {
        Alert.alert("Your password has been sent to your email");
    }

    register() {
        this.props.navigation.navigate("Register");
    }

    render() {
        let { navigate } = this.props.navigation;
        return (
            <KeyboardAwareScrollView>
                <StatusBar
                    backgroundColor="#263238"
                    barStyle="light-content"
                />
                <Container style={styles.container}>
                  
                    <View style={{ flex: 2, width: "80%", justifyContent: "flex-end" }}>
                    <Text style={{ fontSize: 70, fontWeight: "300", color: "#263238", textAlign: "center" }}>V<Icon name='lock' style={{ fontSize: 50, color: '#263238' }} />ult</Text>
                        <Form style={{ justifyContent: "space-between", }}>
                            <Item floatingLabel style={styles.input}>
                                <Icon name='md-phone-portrait' style={{ color: '#263238' }} />
                                <Label>Phone number</Label>
                                <Input
                                    placeholderTextColor="#263238"
                                    keyboardType="phone-pad"
                                    style={{ color: "#263238" }}
                                    onChangeText={(phone) => this.setState({ phone })} value={this.state.phone} />
                            </Item>

                            <Item floatingLabel style={styles.input}>
                                <Icon name='lock' style={{ color: '#263238' }} />
                                <Label>Password</Label>
                                <Input
                                    placeholderTextColor="#263238"
                                    keyboardType="numbers-and-punctuation"
                                    secureTextEntry={true}
                                    style={{ color: "#263238" }}
                                    onChangeText={(password) => this.setState({ password })} value={this.state.password} />
                            </Item>
                        </Form>
                        <View style={{ alignContent: "center", justifyContent: "center" }}>
                            {this.state.btnClicked ? <Spinner color="#263238" /> :
                                <Button block rounded
                                    style={styles.btn}
                                    onPress={() => this._login(navigate)}>
                                    <Text style={styles.btnText}> LOG IN </Text>
                                </Button>}
                            <Button transparent
                                onPress={() => this.forgot()}>
                                <Text style={{ color: "#263238", fontWeight: "bold", fontSize: 14 }}>Forgot your password?</Text>
                            </Button>
                        </View>
                    </View>

                    <View style={{ justifyContent: "flex-end", flex: 0.2 }}>
                        <Button transparent
                            onPress={() => this.register()}>
                            <Text style={{ color: "#263238", fontWeight: "bold", fontSize: 14 }}>CREATE ACCOUNT !!!</Text>
                        </Button>
                    </View>
                </Container>
            </KeyboardAwareScrollView>
        );
    }
}
