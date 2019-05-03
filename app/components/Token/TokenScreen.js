// @flow
import React, { Component } from "react";
import { Text, View, Alert, StatusBar, AsyncStorage } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Spinner,
  Button,
  Icon,
  Label,
  Toast,
  ToastAndroid,
  Body,
  Left,
  Title
} from "native-base";
import styles from "./styles";

import axios from "axios";

type Props = {};
export default class Token extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      btnClicked: false
    };
  }

  componentWillMount() {
    console.log(this.props);
    console.log(this.props.navigation.state.params.details.details.phone);
  }

  async proceed() {
    if (this.state.token != "") {
      this.setState({ btnClicked: !this.state.btnClicked });
      let url = `https://rnvault.herokuapp.com/user/verify`;
      try {
        const options = {
          method: "POST",
          headers: { "content-type": "application/json" },
          data: {
            phone:
              "" +
              this.props.navigation.state.params.details.details.phone +
              "",
            sms: this.state.token
          },
          url
        };
        const data = await axios(options);
        this.setState({ btnClicked: !this.state.btnClicked });
        console.log(data);
        // AsyncStorage.multiSet(
        //   [["token", this.props.navigation.state.params.details.details.token], ["userId", this.props.navigation.state.params.details.details.userId]],
        //   () => {
        //     console.log("it stored in async");
        //   }
        // );
        this.props.navigation.navigate("Tab");
      } catch (e) {
        console.log(e);
        Alert.alert("Failed", "Network Error, Kindly Connect to internet");
        this.setState({ btnClicked: !this.state.btnClicked });
      }
    } else {
      Toast.show({
        text: "Kindly fill all fields!",
        buttonText: "Okay",
        duration: 3000,
        position: "top"
      });
    }
  }

  sendToken() {
    Alert.alert("Token sent!!");
  }

  render() {
    return (
      <KeyboardAwareScrollView>
        <StatusBar backgroundColor="#263238" barStyle="light-content" />
        <Container style={styles.container}>
          <View
            style={{
              flex: 1,
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Icon name="mail" style={{ fontSize: 50, color: "#263238" }} />
            <Text style={{ fontSize: 30, color: "#263238" }}>
              Enter SMS Token
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              alignContent: "center",
              width: "70%",
              alignSelf: "center"
            }}
          >
            <Text style={styles.txt}>
              Please check your phone or email a message was sent to you with
              your token
            </Text>
            <Form>
              <Item floatingLabel style={styles.input}>
                <Icon name="md-mail" style={{ color: "#263238" }} />
                <Label>SMS token</Label>
                <Input
                  placeholderTextColor="#263238"
                  keyboardType="numeric"
                  style={{ color: "#263238" }}
                  onChangeText={token => this.setState({ token })}
                  value={this.state.token}
                />
              </Item>

              {this.state.btnClicked ? (
                <Spinner color="#263238" />
              ) : (
                <Button block style={styles.btn} onPress={() => this.proceed()}>
                  <Text style={styles.btnText}> VALIDATE </Text>
                </Button>
              )}
            </Form>
          </View>
          <View style={{ justifyContent: "flex-end", flex: 0.1, margin: 5 }}>
            <Button transparent onPress={() => this.sendToken()}>
              <Text style={styles.linkTxt}>DIDN'T RECIEVE CODE</Text>
            </Button>
          </View>
        </Container>
      </KeyboardAwareScrollView>
    );
  }
}
