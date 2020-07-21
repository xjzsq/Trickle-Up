import React, { Component } from 'react';
import { ImageBackground, Dimensions, StyleSheet, ScrollView, DeviceEventEmitter } from 'react-native';
import {
  Container,
  Text,
  View,
  Header,
  Title,
  ListItem,
  Label,
  Item,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Card,
  CardItem,
  Input,
  Picker,
} from 'native-base';
import FlipCard from 'react-native-flip-card'; //卡片翻转效果
import Modal from 'react-native-modal';
import Storage from './storage.js';

const SLIDER_WIDTH = Dimensions.get('window').width;
const SLIDER_HEIGHT = Dimensions.get('window').height;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);
const Content_HEIGHT = SLIDER_HEIGHT - 250;

export default class setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _name: '',
      _default: '',
      _type: '',
      _val: '',
      BG: {
        setting_Face: null,//null
        setting_Back: null,
      },
      nowBack: false,
      typeModalVisible: false,
      defaultModalVisible: false,
      Type: [],
      defaultList: [],
      skin: null,
    }
    Storage.getStorage('Type').then((x) => {
      if (x !== null) this.setState({ Type: JSON.parse(x) });
    });

    Storage.getStorage('defaultList').then((x) => {
      if (x !== null) this.setState({ defaultList: JSON.parse(x) });
    });
  }
  componentDidMount() {
    DeviceEventEmitter.addListener('updateDefaultData', (ppp = null) => {
      Storage.getStorage('defaultList').then((x) => {
        this.setState({ defaultList: JSON.parse(x) });
      });
    });
  }
  componentWillMount() {
    Storage.getStorage('Type').then((x) => {
      if (x !== null) this.setState({ Type: JSON.parse(x) });
    });

    Storage.getStorage('defaultList').then((x) => {
      if (x !== null) this.setState({ defaultList: JSON.parse(x) });
    });
    DeviceEventEmitter.removeAllListeners();
  }
  onTypeValueChange(value: string) {
    this.setState({
      _type: value
    });
  }
  onValValueChange(value: string) {
    this.setState({
      _val: parseInt(value)
    });
  }
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
            <Title>设置</Title>
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
        <View>
          <ScrollView>
            <FlipCard
              style={styles.card}
              friction={6}
              perspective={1000}
              flipHorizontal={true}
              flipVertical={false}
              flip={this.state.nowBack}
              clickable={false}
              onFlipEnd={(isFlipEnd) => { console.log('isFlipEnd', isFlipEnd) }}
            >
              {/* Face Side */}
              <View style={styles.face}>
                <Card style={{
                  backgroundColor: this.state.skin == null ? '#F0FFFF' : 'transparent'
                }}>
                  <ImageBackground source={this.state.BG.setting_Face == null ? require('./p1.png') : this.state.BG.setting_Face}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    imageStyle={{
                      opacity: this.state.skin == 'otaku' ? 0.5 : 0
                    }}>
                    <CardItem header style={{ backgroundColor: 'transparent' }}>
                      <Left>
                        <Button info iconLeft onPress={() => { this.setState({ nowBack: false }) }}>
                          <Icon name='list' />
                          <Text>默认列表</Text>
                        </Button>
                      </Left>
                      <Button info iconRight onPress={() => { this.setState({ nowBack: true }) }}>
                        <Text>种类</Text>
                        <Icon name='swap' />
                      </Button>
                    </CardItem>
                    <View style={styles.itemContain}>
                      {this.state.defaultList.map((items, index) => {
                        return (
                          <CardItem CardBody style={styles.itemContainer}>
                            <Left>
                              <Body>
                                <Text>{items.name}({this.state.Type[items.type].name})</Text>
                              </Body>
                            </Left>
                            <Icon name="heart" style={{ color: '#ED4A6A' }} />
                            <Text>{items.val}</Text>
                            <Button large info style={{ height: 20, borderColor: 'transparent' }}
                              bordered onPress={() => {
                                //删除函数
                                this.state.defaultList.splice(index, 1);
                                this.setState({ defaultList: this.state.defaultList });
                                Storage.setStorage('defaultList', JSON.stringify(this.state.defaultList));
                                DeviceEventEmitter.emit('updatedefaultData');
                              }}>
                              <Icon name="close" />
                            </Button>
                          </CardItem>);
                      })}
                      <Text style={{ padding: 15 }}>{(this.state.defaultList.length !== 0) ? '' : "这里空荡荡的,不考虑添加几个每天都能让你幸福的事情吗？"}</Text>
                      <CardItem style={{ backgroundColor: 'transparent' }}>
                        <Left style={{ paddingLeft: 9 }}>
                          <Text>又有每天都能让你感到幸福的事情了吗?</Text>
                        </Left>
                        <Right>
                          <Button large info style={{ height: 20, borderColor: 'transparent' }}
                            bordered onPress={() => {
                              this.setState({ _name: '' }),
                                this.setState({ _type: 'home' }),
                                this.setState({ _val: 0 }),
                                this.setState({ defaultModalVisible: !this.state.defaultModalVisible })
                            }}>
                            <Icon name="add" />
                          </Button>
                        </Right>
                        <Modal
                          isVisible={this.state.defaultModalVisible}
                          onBackdropPress={() => { this.setState({ defaultModalVisible: !this.state.defaultModalVisible }) }}
                          backdropOpacity={0.2}
                          style={{
                            width: Dimensions.get('window').width,
                            height: Dimensions.get('window').height * 0.5,
                            alignContent: 'center',
                            padding: 30,
                          }}
                        >
                          <View style={{ elevation: 1 }}>
                            <Header style={{ backgroundColor: '#00bfff' }}
                              androidStatusBarColor="#00bfff"
                            >
                              <Left>
                                <Button transparent onPress={() => {
                                  this.setState({ defaultModalVisible: !this.state.defaultModalVisible })
                                }}
                                >
                                  <Icon name='arrow-back' />
                                </Button>
                              </Left>
                              <Body>
                                <Title>发现幸福</Title>
                              </Body>
                              <Right>
                              </Right>
                            </Header>
                            <View style={styles.newDateModal}>
                              <Text style={{ fontSize: 20, color: 'gray' }}>
                                又发现了每天都能你幸福的事情？写下来别弄丢她！
                          </Text>
                              <ListItem>
                                <Item floatingLabel style={{ underlineColor: 'transparent' }}>
                                  <Label>什么事情啊？</Label>
                                  <Input
                                    value={this.state._name}
                                    onChangeText={(text) => { this.setState({ _name: text }) }}
                                  />
                                </Item>
                              </ListItem>
                              <ListItem>
                                <Text>选择分类:</Text>
                                <Picker
                                  note
                                  mode="dropdown"
                                  style={{ width: 120 }}
                                  selectedValue={this.state._type}
                                  onValueChange={this.onTypeValueChange.bind(this)}
                                >
                                  {Object.keys(this.state.Type).map((obj, idx) => (
                                    <Picker.Item style={{ justifyContent: 'center' }} label={this.state.Type[obj].name} value={this.state.Type[obj].type} />
                                  ))}
                                </Picker>
                              </ListItem>
                              <ListItem>
                                <Icon name='heart' style={{ color: '#ED4A6A' }} />
                                <Text> 幸福指数：</Text>
                                <Picker
                                  note
                                  mode="dropdown"
                                  style={{ width: 120 }}
                                  selectedValue={this.state._val}
                                  onValueChange={this.onValValueChange.bind(this)}
                                >
                                  <Picker.Item label="0" value={parseInt("0")} />
                                  <Picker.Item label="1" value={parseInt("1")} />
                                  <Picker.Item label="2" value={parseInt("2")} />
                                  <Picker.Item label="3" value={parseInt("3")} />
                                  <Picker.Item label="4" value={parseInt("4")} />
                                  <Picker.Item label="5" value={parseInt("5")} />
                                </Picker>
                              </ListItem>
                              <View>
                                <Button success onPress={() => {
                                  for (let i = 0; i < this.state.defaultModalVisible.length; i++) {
                                    if (this.state._name === this.state.defaultModalVisible[i].name) {
                                      alert("默认列表中已经有这件让你幸福的事情了~");
                                      return;
                                    }
                                  }
                                  if (this.state._name === '') {
                                    alert("是什么秘密的事情幸福的让你说不出来呀？写下来嘛~");
                                    return;
                                  }
                                  this.state.defaultList.push(
                                    {
                                      name: this.state._name,
                                      type: this.state._type,
                                      val: this.state._val,
                                      done: false,
                                    }
                                  );
                                  //存储数据
                                  this.setState({ defaultList: this.state.defaultList });
                                  Storage.setStorage('defaultList', JSON.stringify(this.state.defaultList)).then(() => {
                                    this.setState({ defaultModalVisible: !this.state.defaultModalVisible });
                                    DeviceEventEmitter.emit('updatedefaultData');
                                  }
                                  );
                                }}>
                                  <Icon name='checkmark' style={{ alignItems: 'center' }} />
                                </Button>
                              </View>
                            </View>
                          </View>
                        </Modal>
                      </CardItem>
                    </View>
                  </ImageBackground>
                </Card>
              </View>
              {/* Back Side */}
              <View style={styles.face}>
                <Card style={{
                  backgroundColor: this.state.skin == null ? '#F0FFFF' : 'transparent'
                }}>
                  <ImageBackground source={this.state.BG.setting_Back == null ? require('./p4.png') : this.state.BG.setting_Back}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    imageStyle={{
                      opacity: this.state.skin == 'otaku' ? 0.38 : 0
                    }}>
                    <CardItem header style={{
                      backgroundColor: 'transparent'
                    }}>
                      <Left>
                        <Button info iconLeft onPress={() => { }}>
                          <Icon name='star' />
                          <Text>种类</Text>
                        </Button>
                      </Left>
                      <Button info iconRight onPress={() => { this.setState({ nowBack: false }) }}>
                        <Text>默认列表</Text>
                        <Icon name='swap' />
                      </Button>
                    </CardItem>
                    <View style={{ height: Content_HEIGHT }}>
                      {/* <Text style={{ padding: 15 }}>说到底，幸福这种东西是因人而异的，有人觉得有饭吃就很幸福，有人觉得有书看就很幸福，有人认为努力活在当下才是最重要的，也有人在达到某种目标的瞬间便感到此生无憾，有些人只要某个人得到幸福，自己就会跟着幸福，也有些人则令人伤透脑筋地刚好相反。(《末日时在做什么？有没有空？可以来拯救吗？》兰朵露可)</Text> */}
                      <Text style={{ padding: 15 }}>哪些种类的事情能让你感到幸福呢？</Text>
                      {Object.keys(this.state.Type).map((obj, idx) => {
                        return (
                          <CardItem style={styles.checkList}>
                            <Left style={{ paddingLeft: 20 }}>
                              <Text>{this.state.Type[obj].name}</Text>
                            </Left>
                            <Right>
                              <Button large info style={{ height: 20, borderColor: 'transparent' }}
                                bordered onPress={() => {
                                  //删除函数
                                  delete this.state.Type[obj];
                                  this.setState({ Type: this.state.Type });
                                  Storage.setStorage('Type', JSON.stringify(this.state.Type));
                                  DeviceEventEmitter.emit('updateTypeData');
                                }}>
                                <Icon name="close" />
                              </Button>
                            </Right>

                          </CardItem>
                        );
                      })}
                      <CardItem style={styles.checkList} >
                        <Left style={{ paddingLeft: 9 }}>
                          <Text>发现了新的能你幸福的事情种类?</Text>
                        </Left>
                        <Right>
                          <Button large info style={{ height: 20, borderColor: 'transparent' }}
                            bordered onPress={() => {
                              this.setState({ _name: '' }),
                                this.setState({ _default: '' }),
                                this.setState({ typeModalVisible: !this.state.typeModalVisible })
                            }}>
                            <Icon name="add" />
                          </Button>
                        </Right>
                        <Modal
                          isVisible={this.state.typeModalVisible}
                          onBackdropPress={() => { this.setState({ typeModalVisible: !this.state.typeModalVisible }) }}
                          backdropOpacity={0.2}
                          style={{
                            width: Dimensions.get('window').width * 0.8,
                            height: Dimensions.get('window').height * 0.5,
                            alignContent: 'center',
                            padding: 30,
                          }}
                        >
                          <View style={{
                            width: Dimensions.get('window').width * 0.8,
                            height: Dimensions.get('window').height * 0.5,
                            alignContent: 'center',
                          }}>
                            <Container style={{ flex: 1 }}>
                              <Header style={{ backgroundColor: '#00bfff' }}
                                androidStatusBarColor="#00bfff"
                              >
                                <Left>
                                  <Button transparent onPress={() => {
                                    this.setState({ typeModalVisible: !this.state.typeModalVisible })
                                  }}
                                  >
                                    <Icon name='arrow-back' />
                                  </Button>
                                </Left>
                                <Body>
                                  <Title>发现幸福</Title>
                                </Body>
                                <Right>
                                </Right>
                              </Header>
                              <View style={styles.newDateModal}>
                                <Text style={{ fontSize: 20, color: 'gray' }}>
                                  又发现了新的能你幸福的事情种类？记下来！
                            </Text>
                                <ListItem>
                                  <Item floatingLabel style={{ underlineColor: 'transparent' }}>
                                    <Label>种类名称</Label>
                                    <Input
                                      value={this.state._name}
                                      onChangeText={(text) => { this.setState({ _name: text }) }}
                                    />
                                  </Item>
                                </ListItem>

                                <ListItem>
                                  <Item floatingLabel style={{ underlineColor: 'transparent' }}>
                                    <Label>描述一下？</Label>
                                    <Input
                                      value={this.state._default}
                                      onChangeText={(text) => { this.setState({ _default: text }) }}
                                    />
                                  </Item>
                                </ListItem>
                                <View>
                                  <Button success onPress={() => {
                                    for (let i = 0; i < this.state.Type.length; i++) {
                                      if (this.state._name === this.state.Type[i].name) {
                                        alert("名称重复，已经有这个种类了...");
                                        return;
                                      }
                                    }
                                    if (this.state._name === '') {
                                      alert("总能找到这个分类的名字吧~");
                                      return;
                                    }
                                    this.state.Type[this.state._name] =
                                    {
                                      name: this.state._name,
                                      type: this.state._name,
                                      default: this.state._default,
                                    };
                                    //存储数据
                                    this.setState({ Type: this.state.Type });
                                    Storage.setStorage('Type', JSON.stringify(this.state.Type)).then(() => {
                                      this.setState({ typeModalVisible: !this.state.typeModalVisible });
                                      DeviceEventEmitter.emit('updateTypeData');
                                    }
                                    );
                                  }}>
                                    <Icon name='checkmark' />
                                  </Button>
                                </View>
                              </View>
                            </Container>
                          </View>
                        </Modal>
                      </CardItem>
                    </View>
                  </ImageBackground>
                </Card>
              </View>
            </FlipCard>
          </ScrollView>
        </View>
      </Container >
    );
  }
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    marginTop: 20,
  },
  face: {
    width: ITEM_WIDTH,
  },
  checkList: {
    backgroundColor: 'transparent',
  },
  newDateModal: {
    padding: 20,
    backgroundColor: 'white',
  },
  carouselContainer: {
    marginTop: 10
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  itemDate: {
    alignItems: 'flex-start',
    flex: 1,
  },
  itemContain: {
    height: Content_HEIGHT,
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
  },
  itemButtom: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 50,
  },
});