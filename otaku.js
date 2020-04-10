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
import Sound from 'react-native-sound';
 
let mp3 = require('./2.mp3');//支持众多格式
//如果是网络音频，使用 new Sound(mp3,null,error => {})
let whoosh = new Sound(mp3, (error) => {
  if (error) {
    return console.log('资源加载失败', error);
  }
});

let ooo=new Sound(require('./1.mp3'));

export default class otaku extends Component {
  constructor(props){
    super(props);
    this.state = {
      volume: 0.5,
      seconds: 0, //秒数
      totalMin: '', //总分钟
      totalSec: '', //总分钟秒数
      nowMin: 0, //当前分钟
      nowSec: 0, //当前秒钟
      maximumValue: 0, //滑块最大值
    }
  }
  componentDidMount(){
    let totalTime = whoosh.getDuration();
    totalTime = Math.ceil(totalTime);
    let totalMin = parseInt(totalTime/60); //总分钟数
    let totalSec = totalTime - totalMin * 60; //秒钟数并判断前缀是否 + '0'
    totalSec = totalSec > 9 ? totalSec : '0' + totalSec;
    this.setState({
      totalMin,
      totalSec,
      maximumValue: totalTime,
    })
  }
  componentWillUnmount(){
    this.time && clearTimeout(this.time);
  }
  // 播放
  _play = () => {
    whoosh.play();
    this.time = setInterval(() => {
      whoosh.getCurrentTime(seconds => {
        seconds = Math.ceil(seconds);
        this._getNowTime(seconds)
      })
    },1000)
  }
  _getNowTime = (seconds) => {
    let nowMin = this.state.nowMin,
      nowSec = this.state.nowSec;
    if(seconds >= 60){
      nowMin = parseInt(seconds/60); //当前分钟数
      nowSec = seconds - nowMin * 60;
      nowSec = nowSec < 10 ? '0' + nowSec : nowSec;
    }else{
      nowSec = seconds < 10 ? '0' + seconds : seconds;
    }
    this.setState({
      nowMin,
      nowSec,
      seconds
    });
  }
  render() {
    let time = this.state;
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
            <ListItem>
                <Text>不看看ACGN里面怎么定义幸福吗？</Text>
                <Button info bordered  onPress={()=>{
                  fetch("https://otaku.matrix72.top/").then(
                    res => res.text()).then(json => alert(json));
                }}>
                  <Icon name='key' />
                </Button>
            </ListItem>
            <ListItem>
                <Text>钉宫一顿骂，胜读十年书~</Text>
                <Button info bordered onPress={this._play}>
                  <Icon name={'play'} />
                </Button>
                 <Button info bordered onPress={()=>{ooo.play();}}>
                 <Icon name={'play'} />
                </Button>
            </ListItem>
            <ListItem>
                <Text>二次元随机萌音！</Text>
                 <Button info bordered onPress={()=>{
                  var xxx = new Sound('https://baka.matrix72.top/', Sound.MAIN_BUNDLE, (error) => {
                    if (error) {
                      console.log('failed to load the sound', error);
                      return;
                    }
                    xxx.play((success) => {
                      if (success) {
                        console.log('successfully finished playing');
                      } else {
                        console.log('playback failed due to audio decoding errors');
                      }
                    });
                  });
                 }}>
                 <Icon name={'play'} />
                </Button>
            </ListItem>
          </List>
        </View>
      </Container>
    );
  }
}

 