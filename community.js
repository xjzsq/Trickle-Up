import React, { Component, Dimensions } from 'react';
import { ImageBackground } from 'react-native';
import {
  Container,
  Text,
  View,
  Header,
  Title,
  ListItem,
  List,
  Button,
  Left,
  Right,
  Body,
  Icon,
} from 'native-base';
// const SLIDER_HEIGHT = Dimensions.get('window').height - 250; 
const SLIDER_HEIGHT = 500;
export default class community extends Component {
  constructor(props) {
    super(props);
    this.state = {
      BG: null,
      skin: null,
      link: "连接中",
    }
  }
  componentDidMount() {
    this.timer = setTimeout(() => {
      alert("连接社区失败！\n请检查与服务器的网络连接！");
      // this.timers && clearInterval(this.timers);
    }, 2000);
    this.timers = setInterval(() => {
      if (this.state.link == "连接中") this.setState({ link: "连接中." });
      else if (this.state.link == "连接中.") this.setState({ link: "连接中.." });
      else if (this.state.link == "连接中..") this.setState({ link: "连接中..." });
      else this.setState({ link: "连接中" });
    }, 300);
  }
  componentWillUnmount() {
    this.timer && clearInterval(this.timer);
    this.timers && clearInterval(this.timers);
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
            <Title>社区</Title>
          </Body>
          <Right />
        </Header>
        <View style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent',
          height: SLIDER_HEIGHT,
        }}>
          <Text>{this.state.link}</Text>
        </View>
      </Container>
    );
  }
}