import React, { Component } from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';

import DashboardComponent from './Component';
import styles from './styles'

import { connect } from 'react-redux';
import { fetchFilesFromAPI } from '../../reduxStore/files/actions';

class DashboardContainer extends Component {

    constructor(props) {
        super(props);
        this.state = { phone: '', password: '', email: '', name: '' };
    }

    render() {

        return (
            <DashboardComponent
            navigation={this.props.navigation}
            files={this.props.files}
            getFiles={this.props.getFiles}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        files: state.files
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getFiles: (id) => dispatch(fetchFilesFromAPI(id)),
        logout: async () => {
            try {
              const isLog = await AsyncStorage.removeItem('token');
              if (isLog) {
                  return this.props.navigation.goBack();
              }
            } catch (error) {
              console.log(error);
              Alert.alert('could not log out')
            }
          }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer)
