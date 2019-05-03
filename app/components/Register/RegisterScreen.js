// @flow
import React, { Component } from "react";
import {
  Text,
  View,
  Alert,
  BackHandler,
  ActivityIndicator,
  StatusBar,
  ToastAndroid,
  AsyncStorage
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Container,
  Header,
  Content,
  Label,
  Form,
  Item,
  Input,
  Spinner,
  Button,
  Icon,
  Toast
} from "native-base";
import styles from "./styles";
import axios from "axios";

type Props = {};
export default class Login extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      btnClicked: false,
      email: "",
      name: "",
      password: "",
      phone: ""
    };
  }

  async _signUp(navigate) {
    const { name, email, phone, password } = this.state;
    let reg = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

    if (name == "" && email == "" && phone == "" && password == "")
      return ToastAndroid.show("Kindly fill all fields", ToastAndroid.SHORT);

    if (reg.test(email) == 0)
      return ToastAndroid.show("Email is incorrect", ToastAndroid.SHORT);

    if (phone.length != 11)
      return ToastAndroid.show(
        "phone number must be 11 digits",
        ToastAndroid.SHORT
      );

    if (password.length < 5)
      return ToastAndroid.show(
        "Password must be at least 5 digits",
        ToastAndroid.SHORT
      );

    try {
      this.setState({ btnClicked: !this.state.btnClicked });
      let url = `https://rnvault.herokuapp.com/user/signup`;
      const options = {
        method: "POST",
        headers: { "content-type": "application/json" },
        data: {
          email: email,
          password: password,
          username: name,
          phone: phone
        },
        url
      };
      const data = await axios(options);
      this.setState({ btnClicked: !this.state.btnClicked, password: "" });
      console.log(data.data.token);
      // Alert.alert('Success', "Profile saved")
      AsyncStorage.multiSet(
        [["token", data.data.token], ["userId", data.data.userId]],
        () => {
          console.log("it stored in async:  ");
        }
      );
      navigate("Token", { details: data.data });
    } catch (e) {
      console.log(e);
      //Alert.alert('Failed', JSON.stringify(e.response.data.message))
      Alert.alert("Failed", "Network Error, Kindly Connect to internet");
      this.setState({ btnClicked: !this.state.btnClicked, password: "" });
    }
  }

  render() {
    let { navigate } = this.props.navigation;

    return (
      <KeyboardAwareScrollView>
        <StatusBar backgroundColor="#263238" barStyle="light-content" />
        <Container style={styles.container}>
          <View style={{ flex: 1, width: "80%", justifyContent: "flex-end" }}>
            <Text
              style={{
                fontSize: 40,
                fontWeight: "100",
                color: "#263238",
                textAlign: "center"
              }}
            >
              create account
            </Text>
            <Form style={{ justifyContent: "space-between" }}>
              <Item floatingLabel style={styles.input}>
                <Icon name="person" style={{ color: "#263238" }} />
                <Label>Username</Label>
                <Input
                  placeholderTextColor="#263238"
                  keyboardType="default"
                  style={{ color: "#263238" }}
                  onChangeText={name => this.setState({ name })}
                  value={this.state.name}
                />
              </Item>

              <Item floatingLabel style={styles.input}>
                <Icon name="mail" style={{ color: "#263238" }} />
                <Label>Email</Label>
                <Input
                  placeholderTextColor="#263238"
                  keyboardType="email-address"
                  style={{ color: "#263238" }}
                  onChangeText={email => this.setState({ email })}
                  value={this.state.email}
                />
              </Item>

              <Item floatingLabel style={styles.input}>
                <Icon name="md-phone-portrait" style={{ color: "#263238" }} />
                <Label>Phone number</Label>
                <Input
                  placeholderTextColor="#263238"
                  keyboardType="phone-pad"
                  style={{ color: "#263238" }}
                  maxLength={11}
                  onChangeText={phone => this.setState({ phone })}
                  value={this.state.phone}
                />
              </Item>

              <Item floatingLabel style={styles.input}>
                <Icon name="lock" style={{ color: "#263238" }} />
                <Label>Password</Label>
                <Input
                  placeholderTextColor="#263238"
                  secureTextEntry={true}
                  style={{ color: "#263238" }}
                  onChangeText={password => this.setState({ password })}
                  value={this.state.password}
                />
              </Item>
            </Form>

            {this.state.btnClicked ? (
              <Spinner color="#263238" />
            ) : (
              <Button
                block
                rounded
                style={styles.btn}
                onPress={() => this._signUp(navigate)}
              >
                <Text style={styles.btnText}> CREATE </Text>
              </Button>
            )}
          </View>
          <View style={{ justifyContent: "flex-end", flex: 0.1 }} />
        </Container>
      </KeyboardAwareScrollView>
    );
  }
}
