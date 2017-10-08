/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import { Accelerometer, Gyroscope } from 'react-native-sensors';

const gyroscopeObservable = new Gyroscope({
    updateInterval: 300, // defaults to 100ms
});

export default class resume extends Component {

    constructor(props) {
        super(props);
        this.state = {
            acceleration: {
                x: 'unknown',
                y: 'unknown',
                z: 'unknown',
            },
            gyroscope: {
                x: 'unknown',
                y: 'unknown',
                z: 'unknown',
            }
        };
    }

    componentWillMount() {

        gyroscopeObservable
            .subscribe(gyroscope => this.setState({
                gyroscope,
            }));
    }

    chooseImage(x, y) {

        let images = [require('./images/forward.png'), require("./images/left.png"), require("./images/right.png"), require("./images/top.png"), require("./images/bottom.png")];

        if (x < -0.04 && y < -0.05) {
            return images[0];
        }

        if (x < -0.06) {
            return images[1];
        }

        if (x > 0.06) {
            return images[2];
        }

        if (y > 0) {
            return images[3];
        }

        if (y < 0) {
            return images[4];
        }

        return images[0];

    }

  render() {
      const {
          gyroscope,
      } = this.state;

    return (
        <View style={styles.container}>

            <Image style={styles.image} source={this.chooseImage(gyroscope.x, gyroscope.y)} resizeMode="contain" />

        </View>
    );
  }

    componentWillUnmount() {
        gyroscopeObservable.stop();
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#fff',
    marginBottom: 5,
  },
    image: {flex: 1,
        alignSelf: 'center'}
});


AppRegistry.registerComponent('resume', () => resume);
