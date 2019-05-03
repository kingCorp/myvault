import React, { Component } from "react";
import { Alert, ToastAndroid } from "react-native";
import PropTypes from "prop-types";
import { Form, Item, Input, Icon, Label } from "native-base";

import SiginFormComponent from "./Component";
import styles from "./styles";

import { connect } from "react-redux";
import { loginUserAPI } from "../../reduxStore/user/actions";

class SigninContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { phone: "", password: "", btnClicked: false };
  }
  componentDidMount() {
    console.log(this.props);
  }

  signin = () => {
    // if (this.state.phone == "" && this.state.password == "")
    //   return ToastAndroid.show("Kindly fill all fields", ToastAndroid.SHORT);

    // if (this.state.phone.length != 11)
    //   return ToastAndroid.show(
    //     "phone number must be 11 digits",
    //     ToastAndroid.SHORT
    //   );

    // if (this.state.password.length < 5)
    //   return ToastAndroid.show(
    //     "Password must be at least 5 digits",
    //     ToastAndroid.SHORT
    //   );
    //  try {
    //     this.setState({ btnClicked: !this.state.btnClicked });
    //     this.props.getAuth(this.state.phone, this.state.password).then(()=>{
    //         console.log(this.props.navigation);
    //     this.props.navigation.navigate("Tab");
    //     }).catch(err => {
    //         Alert.alert('Failed', 'Network Error or Phone and Password mismatch');
    //         console.log(err)
    //         this.setState({ btnClicked: !this.state.btnClicked });
    //     });
    //  } catch (error) {
    //   this.setState({ btnClicked: !this.state.btnClicked });
    //     console.log(error)
    //  } 
    
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
            Alert.alert('Success', "You are logged in")
            this.props.navigation.navigate("Tab");
        } catch (e) {
            console.log(e);
            //Alert.alert('Failed', JSON.stringify(e.response.data.message))
            Alert.alert('Failed', 'Network Error or Phone and Password mismatch');
            this.setState({ btnClicked: !this.state.btnClicked, password: "" });
        }




  };
  forgot = () => {
    Alert.alert("forgot");
  };
  signup = () => {
    this.props.navigation.navigate("Register");
  };

  render() {
    const form = (
      <Form style={{ justifyContent: "space-between" }}>
        <Item floatingLabel style={styles.input}>
          <Icon name="md-phone-portrait" style={{ color: "#263238" }} />
          <Label>Phone number</Label>
          <Input
            placeholderTextColor="#263238"
            keyboardType="phone-pad"
            style={{ color: "#263238" }}
            onChangeText={phone => this.setState({ phone })}
            value={this.state.phone}
          />
        </Item>

        <Item floatingLabel style={styles.input}>
          <Icon name="lock" style={{ color: "#263238" }} />
          <Label>Password</Label>
          <Input
            placeholderTextColor="#263238"
            keyboardType="numbers-and-punctuation"
            secureTextEntry={true}
            style={{ color: "#263238" }}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
        </Item>
      </Form>
    );

    return (
      <SiginFormComponent
        signin={() => this.signin()}
        signup={() => this.signup()}
        forgot={() => this.forgot()}
        auth={this.props.auth}
        signinform={form}
      />
    );
  }
}

const mapStateToProps = state => {
  //console.log("AUTH STATE: ",state.auth)
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAuth: (pho, pass) => dispatch(loginUserAPI(pho, pass))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SigninContainer);
