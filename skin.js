import React, {Component, useState} from 'react';
import {ImageBackground, Switch, StyleSheet} from 'react-native';
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
const styles = StyleSheet.create({
  ListItem: {
    marginHorizontal: 40,
    flexDirection: 'row',
  },
  itemText: {
    fontSize: 24,
  },
  align: {
    alignSelf: 'flex-end',
  },
  div: {
    opacity: 0.5
  }
});
export default class skin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      BG: null,
      skin: null,
    };
  }
  render() {
    let time = this.state;
    let isEnabled = true;
    const {navigation} = this.props;
    const toggleSwitch = () => {
      isEnabled = !isEnabled;
    };
    return (
      <Container>
        <Header
          style={{backgroundColor: '#00bfff'}}
          androidStatusBarColor="#00bfff"
          iosBarStyle="light-content">
          <Left>
            <Button transparent onPress={() => navigation.openDrawer()}>
              <Icon name="menu" />
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
                  alert('同步失败！\n请检查与服务器的网络连接！');
                }, 500);
              }}>
              <Icon name="sync" />
            </Button>
          </Right>
        </Header>
        <ImageBackground
          source={null}
          style={{
            width: '100%',
            height: '100%',
          }}
          imageStyle={{
            opacity: 0.3,
            // backgroundColor: '#DDF3FF',
          }}>
          <View>
            <List>
              <ListItem style={styles.ListItem}>
                <Left>
                  <Text style={styles.itemText}>简洁模式</Text>
                </Left>
                <Right>
                  <Switch
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    style={styles.align}
                  />
                </Right>
              </ListItem>

              <ListItem itemDivider style={styles.div}>
                <Text>多彩模式个性化</Text>
              </ListItem>

              <ListItem style={styles.ListItem}>
                <Left>
                  <Text style={styles.itemText}>首页卡片背景 </Text>
                </Left>
                <Right>
                  <Button info bordered style={styles.align}>
                    <Icon name="camera" />
                  </Button>
                </Right>
              </ListItem>

              <ListItem style={styles.ListItem}>
                <Left>
                  <Text style={styles.itemText}>种草机背景 </Text>
                </Left>
                <Right>
                  <Button info bordered style={styles.align}>
                    <Icon name="camera" />
                  </Button>
                </Right>
              </ListItem>

              <ListItem itemDivider style={styles.div}>
                <Text>简洁模式个性化</Text>
              </ListItem>

              <ListItem style={styles.ListItem}>
              <Left>
                  <Text style={styles.itemText}>主题色 </Text>
                </Left>
                <Right>
                  <Button info bordered style={styles.align}>
                    <Icon name="color-filter" />
                  </Button>
                </Right>
              </ListItem>

              {/* <ListItem>
                <Text>不看看ACGN里面怎么定义幸福吗？</Text>
                <Button
                  info
                  bordered
                  onPress={() => {
                    fetch('https://otaku.matrix72.top/')
                      .then(res => res.text())
                      .then(json => alert(json));
                  }}>
                  <Icon name="key" />
                </Button>
              </ListItem>
              
              <ListItem>
                <Text>钉宫一顿骂，胜读十年书~</Text>
                <Button
                  info
                  bordered
                  onPress={() => {
                    sound_2.play();
                  }}>
                  <Icon name={'play'} />
                </Button>
                <Text style={{width: 10}} />
                <Button
                  info
                  bordered
                  onPress={() => {
                    sound_1.play();
                  }}>
                  <Icon name={'play'} />
                </Button>
              </ListItem>
              <ListItem>
                <Text>二次元随机萌音！</Text>
                <Button
                  info
                  bordered
                  onPress={() => {
                    var xxx = new Sound(
                      'https://baka.matrix72.top/',
                      Sound.MAIN_BUNDLE,
                      error => {
                        if (error) {
                          console.log('failed to load the sound', error);
                          return;
                        }
                        xxx.play(success => {
                          if (success) {
                            console.log('successfully finished playing');
                          } else {
                            console.log(
                              'playback failed due to audio decoding errors',
                            );
                          }
                        });
                      },
                    );
                  }}>
                  <Icon name={'play'} />
                </Button>
              </ListItem> */}
            </List>
          </View>
        </ImageBackground>
      </Container>
    );
  }
}
