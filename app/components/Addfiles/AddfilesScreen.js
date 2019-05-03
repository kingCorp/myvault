// @flow
import React, { Component } from "react";
import { Text, View, Alert, AsyncStorage } from "react-native";
import { Container, Icon, Button, Spinner } from "native-base";
import styles from "./styles";

import {
  DocumentPicker,
  DocumentPickerUtil
} from "react-native-document-picker";
import RNFetchBlob from "rn-fetch-blob";

type Props = {};
export default class Addfiles extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { btnClicked: false };
  }

  render() {
    return (
      <Container style={styles.container}>
        <View style={{ flex: 1, width: "80%", justifyContent: "center" }}>
          <View
            style={{
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Icon
              name="md-cloud-upload"
              style={{ fontSize: 100, color: "#263238" }}
            />
            <Text
              style={{
                color: "#263238",
                fontSize: 14,
                margin: 10,
                textAlign: "center",
                fontWeight: "bold"
              }}
            >
              upload files from storage device
            </Text>
            {this.state.btnClicked ? (
              <Spinner color="#263238" />
            ) : (
              <Button
                block
                rounded
                style={styles.btn}
                onPress={() => this.upload()}
              >
                <Text style={styles.btnText}> UPLOAD </Text>
              </Button>
            )}
          </View>
        </View>
      </Container>
    );
  }

  upload = async () => {
    const userToken = await AsyncStorage.getItem("userId");
    console.log(userToken);
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.showPicker(userToken);
  };

  async showPicker(userId) {
    // iPhone/Android
    this.setState({ btnClicked: !this.state.btnClicked });
    DocumentPicker.show(
      {
        filetype: [DocumentPickerUtil.allFiles()]
      },
      (error, res) => {
        // Android
        if (res != null) {
          console.log(
            res.uri,
            res.type, // mime type
            res.fileName,
            res.fileSize
          );
          Alert.alert(
            "File Upload",
            "Are you sure you want to upload this file",
            [
              {
                text: "Cancel",
                onPress: () => {console.log("Cancel Pressed"); this.setState({ btnClicked: !this.state.btnClicked })},
                style: "cancel"
              },
              {
                text: "OK",
                onPress: () => {
                  RNFetchBlob.fetch(
                    "POST",
                    "https://rnvault.herokuapp.com/files",
                    {
                      "Content-Type": "multipart/form-data"
                    },
                    [
                      // part file from storage
                      {
                        name: "fileType",
                        filename: "" + res.fileName + "",
                        type: "" + res.type + "",
                        data: RNFetchBlob.wrap(res.uri)
                      },
                      // elements without property `filename` will be sent as plain text
                      {
                        name: "userId",
                        data: "" + userId + ""
                      }
                    ]
                  )
                    .then(resp => {
                      // ...
                      console.log(resp);
                      console.log("response side");
                      Alert.alert("Success", "file upload successfull");
                      this.setState({ btnClicked: !this.state.btnClicked });
                    })
                    .catch(err => {
                      // ...
                      Alert.alert("Failed", "file upload failed");
                      this.setState({ btnClicked: !this.state.btnClicked });
                    });
                }
              }
            ],
            { cancelable: false }
          );
        } else {
          console.log(error);
          this.setState({ btnClicked: !this.state.btnClicked });
        }
      }
    );
  }
}
