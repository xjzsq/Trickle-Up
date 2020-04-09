import React, {Component} from 'react';
import { Image, Dimensions, StyleSheet, TouchableOpacity, ScrollView, Modal, AsyncStorage, DatePickerAndroid } from 'react-native';
import { Container, Text, View, DeckSwiper, Header, Title, Content, Footer, ListItem, List, Form, Label, Item,
   FooterTab, Thumbnail, Button, Left, Right, Body, Icon, Card, CardItem, Fab, DatePicker, CheckBox, Input, Picker,
    } from 'native-base';

const setStorage = async (key,value) => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (error) {
    // Error saving data
    return false;
  }
}

const getStorage = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
   } catch (error) {
     // Error retrieving data
     return null;
   }
   return null;
}

export class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state={
    }
    getStorage('Type').then((x)=>{
      if(x!==null)this.setState({Type : JSON.parse(x)});
    });
    getStorage('defaultList').then((x)=>{
      if(x!==null)this.setState({defaultList : JSON.parse(x)});
    });
  }
}