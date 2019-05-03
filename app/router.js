import React from "react";
import { Text, Platform, StatusBar } from "react-native";

import { Root, Container, Header, Body, Content } from "native-base";
import {
  createStackNavigator,
  createDrawerNavigator,
  createSwitchNavigator,
  DrawerItems,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";

//import SignUp from "./components/SignupScreen/Container";
import Login from "./components/Login/LoginScreen";
import Token from "./components/Token/TokenScreen";
import Register from "./components/Register/RegisterScreen"
//import SignIn from "./components/SigninScreen/Container";
import Dashboard from "./components/DashboardScreen/Container";
import Addfiles from "./components/Addfiles/AddfilesScreen";
import Profile from "./components/Profile/ProfileScreen";
import Authloading from "./components/Authloading/Authloading";

// const CustomDrawerComponent = props => (
//   <Container>
//     <Header style={{ height: 200, backgroundColor: "#263238" }}>
//       <Body style={{ alignItems: "center" }}>
//         <Icon style={{ fontSize: 70, color: "white" }} name="lock" />
//         <Text style={{ fontSize: 20, color: "white" }}>Vault</Text>
//       </Body>
//     </Header>
//     <Content>
//       <DrawerItems {...props} />
//     </Content>
//   </Container>
// );

// const Drawer = createDrawerNavigator(
//   {
//     Dashboard: { screen: Dashboard }
//   },
//   {
//     drawerPosition: "left",
//     initialRouteName: "Dashboard",
//     contentComponent: CustomDrawerComponent,
//     drawerWidth: 300,
//     drawerOpenRoute: "DrawerOpen",
//     drawerCloseRoute: "DrawerClose",
//     drawerToggleRoute: "DrawerToggle"
//   }
// );

const headerStyle = {
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};
 
export const Stack = createStackNavigator(
  {
    SignIn: {
      screen: Login,
      navigationOptions: {}
    },
    Register: {
      screen: Register,
      navigationOptions: {}
    },
    Token: {
      screen: Token,
      navigationOptions: {}
    }
  },
  {
    headerMode: "none",
    navigationOptions: {}
  }
);

export const Tab = createBottomTabNavigator(
  {
    Dashboard: {
      screen: Dashboard,
      navigationOptions: {
        tabBarLabel: false,
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home" size={30} color={tintColor} />
        )
      }
    },
    Addfiles: {
      screen: Addfiles,
      navigationOptions: {
        tabBarLabel: false,
        tabBarIcon: ({ tintColor }) => (
          <Icon name="cloud-upload" size={30} color={tintColor} />
        )
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: false,
        tabBarIcon: ({ tintColor }) => (
          <Icon name="user" size={30} color={tintColor} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      showLabel: false,
      activeTintColor: "#F8F8F8",
      inactiveTintColor: "#586589",
      style: {
        // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: "#263238"
      }
    }
  }
);

export const myApp = createSwitchNavigator(
  {
    Stack: {
      screen: Stack
    },
    Tab: {
      screen: Tab
    },
    Authloading: Authloading
  },
  {
    initialRouteName: "Authloading"
  }
);

const AppVault = createAppContainer(myApp);

export default () => (
  <Root>
    <AppVault />
  </Root>
);
