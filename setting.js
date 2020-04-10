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
import FlipCard from 'react-native-flip-card' //卡片翻转效果
import Modal from 'react-native-modal';
import Storage from './storage.js'

const SLIDER_WIDTH = Dimensions.get('window').width;
const SLIDER_HEIGHT = Dimensions.get('window').height;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);
const Content_HEIGHT = SLIDER_HEIGHT - 180;

export default class setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _name: '',
      _default: '',
      nowBack: false,
      typeModalVisible: false,
      Type: [],
      defaultList: [],
    }
    Storage.getStorage('Type').then((x) => {
      if (x !== null) this.setState({ Type: JSON.parse(x) });
    });

    Storage.getStorage('defaultList').then((x) => {
      if (x !== null) this.setState({ defaultList: JSON.parse(x) });
    });
  }
  componentDidMount() {
    DeviceEventEmitter.addListener('updateDefaultData', () => {
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
          <Right/>
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
            onFlipEnd={(isFlipEnd)=>{console.log('isFlipEnd', isFlipEnd)}}
          >
            {/* Face Side */}
            <View style={styles.face}>
              <Card>
                <CardItem header>
                  <Left>
                    <Button info iconLeft onPress={async() => {
                      try {
                        const {action, year, month, day} = await DatePickerAndroid.open({
                          // 要设置默认值为今天的话，使用`new Date()`即可。
                          // 下面显示的会是2020年5月25日。月份是从0开始算的。
                          date: new Date(),
                        });
                        if (action !== DatePickerAndroid.dismissedAction) {
                          // 这里开始可以处理用户选好的年月日三个参数：year, month (0-11), day
                          alert('还没创建这一天的卡片呢~');
                        }
                      } catch ({code, message}) {
                        console.warn('Cannot open date picker', message);
                      }
                    }}>
                        <Icon name='calendar'/>
                        <Text>默认列表设置</Text>
                    </Button>
                  </Left>
                </CardItem>
                <View style={styles.itemContain}>
                  {this.state.defaultList.map((items)=>{
                      return(
                      <CardItem CardBody style={styles.itemContainer}>
                        <Left>
                          <Body>
                            <Text>{items.name}</Text>
                          </Body>
                        </Left>
                        <Body>
                          <Text>{this.state.Type[items.type].name}</Text>
                        </Body>
                          <Icon name="heart" style={{ color: '#ED4A6A' }} />
                          <Text>{items.val}</Text>
                      </CardItem>);
                  })}
                  <Text>{(this.state.defaultList.length !== 0)?'':"这里空荡荡的,不考虑添加几个每天都能让你幸福的事情吗？"}</Text>
                </View>
                <CardItem footer style={styles.itemButtom}>
                  <Button primary onPress={() => {this.setState({nowBack:true})}}>
                    <Icon name='settings' />
                  </Button>
                </CardItem>
              </Card>
            </View>
            {/* Back Side */}
            <View style={styles.face}>
              <Card>
                <CardItem header>
                </CardItem>
                <View style={{height:Content_HEIGHT}}>

                  <Text>说到底，幸福这种东西是因人而异的，有人觉得有饭吃就很幸福，有人觉得有书看就很幸福，有人认为努力活在当下才是最重要的，也有人在达到某种目标的瞬间便感到此生无憾，有些人只要某个人得到幸福，自己就会跟着幸福，也有些人则令人伤透脑筋地刚好相反。(《末日时在做什么？有没有空？可以来拯救吗？》兰朵露可)</Text>
                  <Text>所以...那些种类的事情能让你感到幸福呢？</Text>
                  {Object.keys(this.state.Type).map((obj, idx) =>{
                    return(
                    <CardItem style={styles.checkList}>
                      <Left style={{paddingLeft: 20}}>
                        <Text>{this.state.Type[obj].name}</Text>
                      </Left>
                      <Right>
                        <Button large info style={{height:20,borderColor:'transparent'}}
                        bordered onPress={()=>{
                          //删除函数
                          delete this.state.Type[obj];
                          this.setState({Type:this.state.Type});
                          Storage.setStorage('Type',JSON.stringify(this.state.Type));
                          DeviceEventEmitter.emit('updateTypeData');
                        }}>
                          <Icon name="close" />
                        </Button>
                      </Right>
                      
                    </CardItem>
                    );})} 
                  <CardItem style={styles.checkList} >
                    <Left style={{paddingLeft: 9}}>
                      <Text>发现了新的能你幸福的事情种类?</Text>
                    </Left>
                    <Right>
                      <Button large info style={{height:20,borderColor:'transparent'}}
                      bordered onPress={()=>{
                        this.setState({_name:''}),
                        this.setState({_default:''}),
                        this.setState({typeModalVisible:!this.state.typeModalVisible})
                      }}>
                        <Icon name="add" />
                      </Button>
                    </Right>
                    <Modal
                      isVisible={this.state.typeModalVisible}
                      onBackdropPress={()=>{this.setState({typeModalVisible:!this.state.typeModalVisible})}}
                      backdropOpacity={0.0}
                      style={{
                        width: Dimensions.get('window').width ,
                        height: Dimensions.get('window').height * 0.5,
                        alignContent: 'center',
                        padding: 30,
                      }}
                    >
                      <View>
                        <Header style={{ backgroundColor: '#00bfff' }}
                          androidStatusBarColor="#00bfff"
                        >
                          <Left>
                            <Button transparent onPress={() => {
                              this.setState({ typeModalVisible : !this.state.typeModalVisible })
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
                          <Text style={{fontSize:20,color: 'gray'}}>
                            又发现了新的能你幸福的事情种类？记下来！
                          </Text>
                          <ListItem>
                            <Item floatingLabel style={{underlineColor:'transparent'}}>
                              <Label>种类名称</Label>
                              <Input 
                                value={this.state._name}
                                onChangeText={(text) => {this.setState({_name:text})}}
                              />
                            </Item>
                          </ListItem>
                          
                          <ListItem>
                            <Item floatingLabel style={{underlineColor:'transparent'}}>
                              <Label>描述一下？</Label>
                              <Input 
                                value={this.state._default}
                                onChangeText={(text) => {this.setState({_default:text})}}
                              />
                            </Item>
                          </ListItem>
                          <View>
                            <Button success onPress={()=>{
                              for(let i = 0; i < this.state.Type.length; i++){
                                if(this.state._name===this.state.Type[i].name){
                                  alert("名称重复，已经有这个种类了...");
                                  return;
                                }
                              }
                              if(this.state._name===''){
                                alert("总能找到这个分类的名字吧~");
                                return;
                              }
                              this.state.Type[this.state._name]=
                              {
                                name:this.state._name,
                                type:this.state._name,
                                default:this.state._default,
                              };
                              //存储数据
                              this.setState({Type:this.state.Type});
                              Storage.setStorage('Type', JSON.stringify(this.state.Type)).then(()=>{
                                this.setState({typeModalVisible:!this.state.typeModalVisible});
                                DeviceEventEmitter.emit('updateTypeData');
                              }
                              );
                            }}>
                              <Icon name='checkmark'/>
                            </Button>
                          </View>
                        </View>
                      </View>
                    </Modal>
                  </CardItem>
                </View>
                <CardItem footer style={styles.itemButtom}>
                  <Button success onPress={() => {this.setState({nowBack:!this.state.nowBack})}}>
                    <Icon name='checkmark' />
                  </Button>
                </CardItem>
              </Card>
            </View>
          </FlipCard>
        </ScrollView>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
  },
  face: {
    width: ITEM_WIDTH,
  },
  checkList: {},
  newDateModal: {
    padding: 20,
    backgroundColor: 'white',
  },
  carouselContainer: {
    marginTop: 10
  },
  itemContainer: {
    width: ITEM_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemDate: {
    alignItems: 'flex-start',
    flex: 1,
  },
  itemContain: {
    height: Content_HEIGHT,
    alignItems: 'flex-end',
  },
  itemButtom: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 50,
  },
});