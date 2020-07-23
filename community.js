import React, { Component, Dimensions } from 'react';
import { Image } from 'react-native';
import {
  View, Title, Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right
} from 'native-base';
import { ImageBackground } from 'react-native';
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
        <Content>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={require('./o1.jpg')} />
                <Body>
                  <Text>Trickle-Up 开发组</Text>
                  <Text note>分享自 自定义主题</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={require('./ff.jpg')} style={{ height: 200, width: null, flex: 1 }} />
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                  <Icon active name="thumbs-up" />
                  <Text>12 喜欢</Text>
                </Button>
              </Left>
              <Body>
                <Button transparent>
                  <Icon active name="chatbubbles" />
                  <Text>4 评论</Text>
                </Button>
              </Body>
              <Right>
                <Text>11小时前</Text>
              </Right>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={require('./o1.jpg')} />
                <Body>
                  <Text>Trickle-Up 开发组</Text>
                  <Text note>分享自 愿望单</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={require('./ss.jpg')} style={{ height: 200, width: null, flex: 1 }} />
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                  <Icon active name="thumbs-up" />
                  <Text>12 喜欢</Text>
                </Button>
              </Left>
              <Body>
                <Button transparent>
                  <Icon active name="chatbubbles" />
                  <Text>4 评论</Text>
                </Button>
              </Body>
              <Right>
                <Text>11小时前</Text>
              </Right>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={require('./o1.jpg')} />
                <Body>
                  <Text>Admin</Text>
                  <Text note>咕咕咕</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={require('./o1.jpg')} style={{ height: 200, width: null, flex: 1 }} />
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                  <Icon active name="thumbs-up" />
                  <Text>12 喜欢</Text>
                </Button>
              </Left>
              <Body>
                <Button transparent>
                  <Icon active name="chatbubbles" />
                  <Text>4 评论</Text>
                </Button>
              </Body>
              <Right>
                <Text>11小时前</Text>
              </Right>
            </CardItem>
          </Card>
        </Content>
        {/* <View style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent',
          height: SLIDER_HEIGHT,
        }}>
          <Text>{this.state.link}</Text>
        </View> */}
      </Container>
    );
  }
}