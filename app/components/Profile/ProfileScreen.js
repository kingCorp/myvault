// @flow
import React, { Component } from "react";
import { Text, View, Alert, AsyncStorage } from "react-native";
import {
  Container,
  Card,
  Button,
  Body,
  CardItem,
  Left,
  Right
} from "native-base";
import axios from 'axios'
import styles from "./styles";

type Props = {};
export default class Profile extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {info:{}};
  }

  componentDidMount = async () => {
    const userToken = await AsyncStorage.getItem("userId");
    console.log(userToken);
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.getProfile(userToken)
  };

  signout() {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            let keys = ["token", "userId"];
            AsyncStorage.multiRemove(keys, () => {
              this.props.navigation.navigate('Stack');
            });
          }
        }
      ],
      { cancelable: false }
    );
    
  }

  getProfile(id) {
    try {
       axios.get('https://rnvault.herokuapp.com/user/'+id)
           .then(res => {
               console.log(res.data.User.email);
               this.setState({info:res.data.User})
           })
           .catch(err => {
               Alert.alert('Failed', 'Network Error');
               console.log(err)
           });
   } catch (e) {
       console.log(e);
   }
  }

  render() {
    console.log( this.state.info.username)
    const{username,email,phone} = this.state.info
    return (
      <Container>
        <View style={{ paddingVertical: 20 }}>
          <Card style={{ padding: 5 }}>
            <CardItem header>
              <Body>
                <View style={styles.container}>
                  <Text style={{ color: "white", fontSize: 14 }}>{username}</Text>
                </View>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Text>Name: </Text>
              </Left>
              <Right>
                <Text>{username}</Text>
              </Right>
            </CardItem>
            <CardItem>
              <Left>
                <Text>Email: </Text>
              </Left>
              <Right>
                <Text>{email}</Text>
              </Right>
            </CardItem>
            <CardItem>
              <Left>
                <Text>Phone: </Text>
              </Left>
              <Right>
                <Text>{phone}</Text>
              </Right>
            </CardItem>
            <CardItem>
              <Body>
                <Button
                  block
                  rounded
                  style={styles.btn}
                  onPress={() => this.signout()}
                >
                  <Text style={styles.btnText}> SIGN OUT </Text>
                </Button>
              </Body>
            </CardItem>
          </Card>
        </View>
      </Container>
    );
  }
}
