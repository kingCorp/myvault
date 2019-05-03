import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  ScrollView,
  FlatList,
  Text,
  View,
  AsyncStorage,
  Alert,
  Linking,
  WebView
} from "react-native";
import {
  Container,
  Header,
  Content,
  Right,
  Body,
  Button,
  Icon,
  Card,
  CardItem,
  Title,
  Left,
  Subtitle,
  Fab,
  Thumbnail
} from "native-base";

import RNFetchBlob from "rn-fetch-blob";
import styles from "./styles";
import LoadingIndicator from "../LoadingIndicator/Component";
import Axios from "axios";
import TouchID from "react-native-touch-id";

class DashboardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { btnClicked: false, token:"" };
  }

  componentWillMount = async () => {
    const userToken = await AsyncStorage.getItem("userId");
    console.log(userToken);
    this.setState({token: userToken})
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.getFiles(userToken);
    this.clickHandler();
  };


  render() {
    const { files, isFetching } = this.props.files;
    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
          <Body style={{ marginLeft: 10 }}>
            <Title>Dashboard</Title>
          </Body>
        </Header>

        {isFetching && <LoadingIndicator />}
        {this.state.btnClicked ? <LoadingIndicator /> : 
        <Content padder>
          <FlatList
            numColumns={2}
            data={files}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View>
                <View>
                  <Card style={styles.gridcont}>
                    <CardItem>
                      <Body>
                        <Thumbnail
                          square
                          large
                          source={{ uri: item.filePath }}
                        />
                        <Text>{item.fileName}</Text>
                        <Text note>{item.fileSize}KB</Text>
                      </Body>
                    </CardItem>
                    <CardItem>
                      <Left>
                        <Icon name="md-download" style={{ color: "#263238" }} onPress={() => {
                            //this.download(item.filePath);
                            //Linking.openURL(item.filePath)
                            Alert.alert(
                              "Download",
                              "Are you sure u want to download this file",
                              [
                                {
                                  text: "Cancel",
                                  onPress: () => {
                                    console.log("Cancel Pressed");
                                  },
                                  style: "cancel"
                                },
                                {
                                  text: "OK",
                                  onPress: () => {
                                    Linking.openURL(item.filePath)
                                  }
                                }
                              ],
                              { cancelable: false }
                            );
                          }} />
                      </Left>
                      <Body />
                      <Right>
                        <Icon name="md-trash" style={{ color: "red" }} onPress={() => {
                            this._deletefile(item._id);
                          }} />
                      </Right>
                    </CardItem>
                  </Card>
                </View>
              </View>
            )}
            onRefresh={() => this.props.getFiles(this.state.token)}
            refreshing={isFetching}
            keyExtractor={item => item._id}
          />




        </Content>}
       
      </Container>
    );
  }


  download = async (uri) => {
    let dirs = RNFetchBlob.fs.dirs;
    console.log(uri)
    Alert.alert(
      "Download",
      "Are you sure u want to download this file",
      [
        {
          text: "Cancel",
          onPress: () => {
            console.log("Cancel Pressed");
          },
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            console.log(dirs)
            this.setState({ btnClicked: !this.state.btnClicked });
             RNFetchBlob.config({
              // response data will be saved to this path if it has access right.
              path: dirs.DownloadDir
            })
              .fetch("GET", uri, {
                //some headers ..
              })
              .then(res => {
                // the path should be dirs.DocumentDir + 'path-to-file.anything'
                Alert.alert("Success", "file downloaded successfully");
                // this.setState({ btnClicked: !this.state.btnClicked });
                console.log("The file saved to ", res.path());
              })
              .catch(err => {
                console.log(err);
                // this.setState({ btnClicked: !this.state.btnClicked });
                Alert.alert("Failed", "Unable to download");
              });


          }
        }
      ],
      { cancelable: false }
    );
  }

  _deletefile(id) {
    Alert.alert(
      "Delete file",
      "Are you sure you want to delete this file",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            Axios.delete("https://rnvault.herokuapp.com/files/" + id)
              .then(res => {
                Alert.alert("File deleted");
                this.props.getFiles(this.state.token);
              })
              .catch(err => {console.log(err); Alert.alert("could not delete file")});
          }
        }
      ],
      { cancelable: false }
    );
  }
  // verify if fingerprint is supported on MOBILE device
  clickHandler() {
    TouchID.isSupported()
      .then(authenticate)
      .catch(err => {
        console.log(err);
        Alert.alert(
          "TouchID not supported",
          "Fingerprint authentication failed"
        );
        this.props.navigation.navigate("Stack");
        let keys = ["token", "userId"];
        AsyncStorage.multiRemove(keys, () => {
          this.props.navigation.navigate('Stack');
        });
      });
  }
}

//method to authenticate user finger print
function authenticate() {
  return TouchID.authenticate()
    .then(success => {
      Alert.alert("Verified","Authenticated Successfully");
    })
    .catch(error => {
      console.log(error);
      Alert.alert(error.message, "Fingerprint authentication failed");
      this.props.navigation.navigate("Stack");
      let keys = ["token", "userId"];
      AsyncStorage.multiRemove(keys, () => {
        this.props.navigation.navigate('Stack');
      });
    });
}

export default DashboardComponent;
