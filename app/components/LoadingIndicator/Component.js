import React from 'react'
import { View, ActivityIndicator } from 'react-native'

import styles from './Styles'

const LoadingIndicator = () =>
  <View style={styles.loadingContainer}>
    <ActivityIndicator style={styles.loadingIndicator} size='large' color="#0000ff"/>
  </View>

export default LoadingIndicator
