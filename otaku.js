import React, { Component } from 'react';
import { Image, Dimensions, StyleSheet, TouchableOpacity, ScrollView, DatePickerAndroid, DeviceEventEmitter } from 'react-native';
import {
  Container,
  Text,
  View,
  DeckSwiper,
  Header,
  Title,
  Content,
  Footer,
  ListItem,
  List,
  Form,
  Label,
  Item,
  FooterTab,
  Thumbnail,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Card,
  CardItem,
  Fab,
  DatePicker,
  CheckBox,
  Input,
  Picker,
} from 'native-base';
import { scrollInterpolator, animatedStyles } from './utils/animations';
import FlipCard from 'react-native-flip-card'; //卡片翻转效果
import Modal from 'react-native-modal';
import Storage from './storage.js';


export default class otaku extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <Container>
        <Header
         style={{ backgroundColor: "#00bfff" }}
         androidStatusBarColor="#00bfff"
         iosBarStyle="light-content"
         >
          <Left>
            <Button transparent onPress={() => navigation.openDrawer()}>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>宅男欢乐页！</Title>
          </Body>
          <Right/>
        </Header>
        <View>
          <List>
            <ListItem >
              <Text>幸福小贴士：</Text>
              <Button info bordered block iconLeft  onPress={()=>{
                fetch("https://hitokoto.matrix72.top/").then(
                  res => res.text()).then(json => alert(json));
              }}>
                <Icon name='heart' style={{ color: '#ED4A6A' }}/>
                <Text>不幸福点我！</Text>
              </Button>
            </ListItem>
          </List>
          <List>
            <ListItem>
                <Text>不看看ACGN里面怎么定义幸福吗？</Text>
                <Button info bordered  onPress={()=>{
                  fetch("https://otaku.matrix72.top/").then(
                    res => res.text()).then(json => alert(json));
                }}>
                  <Icon name='key' />
                </Button>
            </ListItem>
          </List>
          <List>
            <ListItem>
                <Text>不看看ACGN里面怎么定义幸福吗？</Text>
                <Button info bordered  onPress={()=>{
                  fetch("https://otaku.matrix72.top/").then(
                    res => res.text()).then(json => alert(json));
                }}>
                  <Icon name='key' />
                </Button>
            </ListItem>
          </List>
        </View>
      </Container>
    );
  }
}