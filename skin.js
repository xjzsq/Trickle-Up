import React, { Component } from 'react';
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
import Sound from 'react-native-sound';

let sound_1 = new Sound(require('./o1.mp3'));
let sound_2 = new Sound(require('./o2.mp3'));

export default class skin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      BG: null,
      skin: null,
    }
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
            <Title>个性化</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => {
                setTimeout(() => {
                  alert("同步失败！\n请检查与服务器的网络连接！");
                }, 500);
              }}>
              <Icon name="sync" />
            </Button>
          </Right>
        </Header>
        <ImageBackground source={this.state.BG == null ? require('./p2.png') : this.state.BG}
          style={{
            width: "100%",
            height: "100%",
          }}
          imageStyle={{
            opacity: 0.3
          }}>
          <View>
            <List>
              <ListItem >
                <Text>幸福小贴士：</Text>
                <Button info bordered block iconLeft onPress={() => {
                  fetch("https://hitokoto.matrix72.top/").then(
                    res => res.text()).then(json => alert(json));
                }}>
                  <Icon name='heart' style={{ color: '#ED4A6A' }} />
                  <Text style={{ color: 'black' }}>不幸福？点我！</Text>
                </Button>
              </ListItem>
              <ListItem>
                <Text>不看看ACGN里面怎么定义幸福吗？</Text>
                <Button info bordered onPress={() => {
                  fetch("https://otaku.matrix72.top/").then(
                    res => res.text()).then(json => alert(json));
                }}>
                  <Icon name='key' />
                </Button>
              </ListItem>
              <ListItem>
                <Text>钉宫一顿骂，胜读十年书~</Text>
                <Button info bordered onPress={() => { sound_2.play(); }}>
                  <Icon name={'play'} />
                </Button>
                <Text style={{ width: 10 }} />
                <Button info bordered onPress={() => { sound_1.play(); }}>
                  <Icon name={'play'} />
                </Button>
              </ListItem>
              <ListItem>
                <Text>二次元随机萌音！</Text>
                <Button info bordered onPress={() => {
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
        </ImageBackground>
      </Container>
    );
  }
}