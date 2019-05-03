import React from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
  Text
} from "react-native";

export default class AuthLoading extends React.Component {
  constructor(props) {
    super(props);
  }

  // Fetch the token from storage then navigate to our appropriate place
  componentDidMount = async () => {
    const userToken = await AsyncStorage.getItem("token");

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    console.log("form asyncStorage:   "+userToken)
    this.props.navigation.navigate(userToken ? "Tab" : "Stack");
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>VAULT</Text>
        <ActivityIndicator size="large" color="#263238" />
      </View>
    );
  }
}
