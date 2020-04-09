import React, { Component } from 'react';
import { Image, Dimensions, StyleSheet, TouchableOpacity, ScrollView, Modal, DatePickerAndroid } from 'react-native';
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
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';
import { scrollInterpolator, animatedStyles } from './utils/animations';
import FlipCard from 'react-native-flip-card' //卡片翻转效果
import RNShakeEvent from 'react-native-shake-event';
import wishlist from './wishlist.js';
import setting from './setting.js';
import Storage from './storage.js'
import {captureRef} from "react-native-view-shot";
import Share from 'react-native-share';

/* about screen */
const cards = [{
        text: 'Card One',
        name: '1',
        image: require('./o1.jpg'),
    },
    {
        text: 'Card 2',
        name: '2',
        image: require('./o1.jpg'),
    },
    {
        text: 'Card 3',
        name: '3',
        image: require('./o1.jpg'),
    },
];

function AboutScreen({ navigation }) {
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
          <Title>关于</Title>
        </Body>
        <Right/>
      </Header>
        <View>
          <DeckSwiper
              dataSource={cards}
              renderItem={item =>
                <Card style={{ elevation: 3 }}>
                  <CardItem>
                    <Left>
                      <Thumbnail source={item.image} />
                      <Body>
                        <Text>{item.text}</Text>
                        <Text note>NativeBase</Text>
                      </Body>
                    </Left>
                  </CardItem>
                  <CardItem cardBody>
                    <Image style={{ height: 300, flex: 1 }} source={item.image} />
                  </CardItem>
                  <CardItem>
                    <Icon name="heart" style={{ color: '#ED4A6A' }} />
                    <Text>{item.name}</Text>
                  </CardItem>
                </Card>
              }
            />
        </View>
    </Container>
    );
}

/* 主屏幕卡片 */
const SLIDER_WIDTH = Dimensions.get('window').width;
const SLIDER_HEIGHT = Dimensions.get('window').height;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);
const Content_HEIGHT = SLIDER_HEIGHT - 180;
export class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this._renderItem = this._renderItem.bind(this);
        this.setDate = this.setDate.bind(this);
        this.state = {
            index: 0,
            modalVisible: false,
            setVisible: -1,
            newVisible: -1,
            useDefaultPlan: false,
            nowBack: -1,
            fabActive: false,
            _name: '',
            _type: '',
            _val: 0,
            _done: false,
            _default: false,
            chosenDate: new Date(),
            HappyThings: [
                [
                    new Date(2020, 3, 10),
                    6,
                    [{
                            name: '不用上课',
                            type: 'school',
                            val: 3,
                            done: true,
                        },
                        {
                            name: '祭祀祖先',
                            type: 'home',
                            val: 3,
                            done: true,
                        },
                    ],
                ],
                [
                    new Date(2020, 3, 9),
                    6,
                    [{
                            name: '不用上课',
                            type: 'school',
                            val: 3,
                            done: true,
                        },
                        {
                            name: '祭祀祖先',
                            type: 'home',
                            val: 3,
                            done: true,
                        },
                    ],
                ],
                [
                    new Date(2020, 3, 8),
                    6,
                    [{
                            name: '不用上课',
                            type: 'school',
                            val: 3,
                            done: true,
                        },
                        {
                            name: '祭祀祖先',
                            type: 'home',
                            val: 3,
                            done: true,
                        },
                    ],
                ],
                [
                    new Date(2020, 3, 7),
                    6,
                    [{
                            name: '不用上课',
                            type: 'school',
                            val: 3,
                            done: true,
                        },
                        {
                            name: '祭祀祖先',
                            type: 'home',
                            val: 3,
                            done: true,
                        },
                    ],
                ],
                [
                    new Date(2020, 3, 6),
                    6,
                    [{
                            name: '不用上课',
                            type: 'school',
                            val: 3,
                            done: true,
                        },
                        {
                            name: '祭祀祖先',
                            type: 'home',
                            val: 3,
                            done: true,
                        },
                    ],
                ],
                [
                    new Date(2020, 3, 5),
                    6,
                    [{
                            name: '不用上课',
                            type: 'school',
                            val: 3,
                            done: true,
                        },
                        {
                            name: '祭祀祖先',
                            type: 'home',
                            val: 3,
                            done: true,
                        },
                    ],
                ],
                [
                    new Date(2020, 3, 4),
                    6,
                    [{
                            name: '不用上课',
                            type: 'school',
                            val: 3,
                            done: true,
                        },
                        {
                            name: '祭祀祖先',
                            type: 'home',
                            val: 3,
                            done: true,
                        },
                    ],
                ],
                [
                    new Date(2020, 3, 3),
                    4,
                    [{
                            name: '今晚吃鸡',
                            type: 'game',
                            val: 2,
                            done: true,
                        },
                        {
                            name: '下午没课',
                            type: 'school',
                            val: 2,
                            done: true,
                        },
                    ],
                ],
            ],
            Type: {
                'game': {
                    type: 'game',
                    name: '游戏',
                    DefaultText: '游戏胜利',
                },
                'home': {
                    type: 'home',
                    name: '家庭',
                    DefaultText: '家庭活动',
                },
                'school': {
                    type: 'school',
                    name: '学校',
                    DefaultText: '自由规划学习时间',
                },
            },
            defaultList: [{
                    name: '今晚吃鸡',
                    type: 'game',
                    val: 2,
                    done: false,
                },
                {
                    name: '和家人一起做了有意义的事',
                    type: 'home',
                    val: 3,
                    done: false,
                },
                {
                    name: '又是可以自由规划的一天呢~',
                    type: 'school',
                    val: 2,
                    done: false,
                },
            ]
        }
        Storage.getStorage('HappyThings').then((x) => {
            if (x !== null) this.setState({ HappyThings: JSON.parse(x) });
        });
        Storage.getStorage('Type').then((x) => {
            if (x !== null) this.setState({ Type: JSON.parse(x) });
            else {
              Storage.setStorage('Type',JSON.stringify(this.state.Type));
              Storage.getStorage('Type').then((x) => {console.log(x);});
            }
        });
        Storage.getStorage('defaultList').then((x) => {
            if (x !== null) this.setState({ defaultList: JSON.parse(x) });
            else{
              Storage.setStorage('defaultList',JSON.stringify(this.state.defaultList));
            }
        });
    }
    componentWillMount() {
        this.updateTotHappy();
    }
    updateTotHappy() {
        let tot = 0;
        for (let i = 0; i < this.state.HappyThings.length; i++) {
            tot += this.state.HappyThings[i][1];
        }
        this.setState({ totalHappy: tot });
    }
    setDate(newDate) {
        this.setState({ chosenDate: newDate });
    }
    getDateCNFormat(_newDate) {
        let newDate = new Date(_newDate);
        return (
            <Text>
        {newDate.getFullYear()}年{newDate.getMonth()+1}月{newDate.getDate()}日
      </Text>
        );
    }
    getDateENFormat(_newDate) {
        let newDate = new Date(_newDate)
        return (
            <Text>
        {newDate.getFullYear()}/{newDate.getMonth()+1}/{newDate.getDate()}
      </Text>
    
        );
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
    _renderItem({ item, index }) {
        let tot = 0;
        return (
        <View ref = "source">
        <ScrollView>
          <FlipCard 
            style={styles.card}
            friction={6}
            perspective={1000}
            flipHorizontal={true}
            flipVertical={false}
            flip={index == this.state.nowBack}
            clickable={false}
            onFlipEnd={(isFlipEnd)=>{console.log('isFlipEnd', isFlipEnd)}}
          >
            {/* Face Side */}
            <View style={styles.face} res={shot=>this.refs[`${index}`] = shot}>
              <Card>
                <CardItem header>
                  <Left>
                    <Button info iconLeft onPress={async() => {
                      try {
                        const {action, year, month, day} = await DatePickerAndroid.open({
                          // 要设置默认值为今天的话，使用`new Date()`即可。
                          // 下面显示的会是2020年5月25日。月份是从0开始算的。
                          date: new Date(item[0]),
                        });
                        if (action !== DatePickerAndroid.dismissedAction) {
                          // 这里开始可以处理用户选好的年月日三个参数：year, month (0-11), day
                          for(let i = 0;i < this.state.HappyThings.length; i++){
                            if(this.dateEqual(new Date(year,month,day),this.state.HappyThings[i][0])){
                              this.carousel.snapToItem(i);
                              return;
                            }
                          }
                          alert('还没创建这一天的卡片呢~');
                        }
                      } catch ({code, message}) {
                        console.warn('Cannot open date picker', message);
                      }
                    }}>
                        <Icon name='calendar'/>
                        {this.getDateENFormat(item[0])}
                    </Button>
                  </Left>
                  <Icon name="heart" style={{ color: '#ED4A6A' }} />
                  <Text>{item[1]}</Text>
                </CardItem>
                <View style={styles.itemContain}>
                  {item[2].map((items)=>{
                    if(items.done){
                      tot++;
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
                    }
                  })}
                  <Text>{tot?'':"这里空空如也,赶快去寻找让你幸福的事吧~"}</Text>
                </View>
                <CardItem footer style={styles.itemButtom}>
                  <Button primary onPress={() => {this.setState({nowBack:index})}}>
                    <Icon name='settings' />
                  </Button>
                  <Button onPress={() =>{
              captureRef(this.refs[`${index}`],{
                format: "jpg",
                quality: 0.8,
                result:"data-uri"
              }).then(res => {
                Share.open({
                  url: res
                })
              })
            }} >
              <Icon name='share' />
            </Button>
                </CardItem>
              </Card>
            </View>
            {/* Back Side */}
            <View>
              <Card>
                <CardItem header>
                  <Text>这些幸福，你捕捉到了吗？还没的话，就快去实现吧~</Text>
                </CardItem>
                <View style={{height:Content_HEIGHT}}>
                  {item[2].map((items)=>{
                    return(
                    <CardItem style={styles.checkList}>
                      <CheckBox checked={items.done} onPress={
                        ()=>{
                          items.done=!items.done;
                          let totHappy = 0;
                          for(let i = 0; i < item[2].length;i++){
                            if(item[2][i].done)totHappy+=item[2][i].val;
                          }
                          item[1]=totHappy;
                          this.setState({HappyThings:this.state.HappyThings});
                          Storage.setStorage('HappyThings',JSON.stringify(this.state.HappyThings));
                          this.updateTotHappy();
                        }
                      }/>
                      <Left style={{paddingLeft: 20}}>
                        <Text>{items.name}</Text>
                      </Left>
                      <Right>
                        <Button large info style={{height:20,borderColor:'transparent'}}
                        bordered onPress={()=>{
                          this.setState({_name:items.name}),
                          this.setState({_type:items.type}),
                          this.setState({_val:items.val}),
                          this.setState({_done:items.done}),
                          this.setState({setVisible:items.name})
                        }}>
                          <Icon name="arrow-forward" />
                        </Button>
                      </Right>
                      <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.setVisible === items.name}
                        onRequestClose={() => {
                          this.setState({ setVisible: -1 })
                        }}
                      >
                        <View>
                          <Header style={{ backgroundColor: '#00bfff' }}
                            androidStatusBarColor="#00bfff"
                          >
                            <Left>
                              <Button transparent onPress={() => {
                                this.setState({ setVisible: -1 })
                              }}
                              >
                                <Icon name='arrow-back' />
                              </Button>
                            </Left>
                            <Body>
                              <Title>{items.name}</Title>
                            </Body>
                            <Right>
                              {/*
                              <Button transparent>
                                <Text>Cancel</Text>
                              </Button>
                              */}
                            </Right>
                          </Header>
                          <View style={styles.newDateModal}>
                            <Text style={{fontSize:20,color: 'gray'}}>
                              这件事是否让你感到更加幸福了呢？
                            </Text>
                            <ListItem>
                              <Item floatingLabel>
                                <Label>事件名称</Label>
                                <Input 
                                  value={this.state._name}
                                  onChangeText={(text) => {this.setState({_name:text})}}
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
                                  <Picker.Item style={{justifyContent:'center'}} label={this.state.Type[obj].name} value={this.state.Type[obj].type} />       
                                ))}
                              </Picker>
                            </ListItem>
                            <ListItem>
                              <Icon name='heart' style={{ color: '#ED4A6A' }}/>
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
                            <ListItem>
                              <CheckBox checked={this.state._done} onPress={
                                ()=>this.setState({_done:!this.state._done})
                              }/>
                              <Body>
                                <Text>我已经通过这个获得幸福啦~</Text>
                              </Body>
                            </ListItem>
                            <ListItem>
                              <Button iconLeft danger onPress={()=>{
                                //删除询问 TODO
                                for(let i = 0; i < this.state.HappyThings[index][2].length; i++){
                                  if(this.state.HappyThings[index][2][i].name===items.name){
                                    this.setState({HappyThings:this.state.HappyThings});
                                    //存储数据
                                    Storage.setStorage('HappyThings', JSON.stringify(this.state.HappyThings)).then(
                                      this.setState({setVisible:-1})
                                    );
                                  }
                                }
                              }}>
                                <Icon name='trash'/>
                                <Text>删除本事件</Text>
                              </Button>
                            </ListItem>
                            <View>
                              <Button success onPress={()=>{
                                let i = 0,fix=0;
                                while(i < this.state.HappyThings[index][2].length){
                                  if(this.state.HappyThings[index][2][i].name===items.name){
                                    fix=i;
                                  } else if(this.state._name===this.state.HappyThings[index][2][i].name){
                                    alert("名称重复，你在这一天已经记录过一次这件幸福的事情了...");
                                  }
                                  i++;
                                }
                                items.name=this.state._name;
                                items.type=this.state._type;
                                items.val=this.state._val;
                                if(items.done!==this.state._done)items.done=this.state._done;
                                let totHappy = 0;
                                for(let i = 0; i < item[2].length;i++){
                                  if(item[2][i].done)totHappy+=item[2][i].val;
                                }
                                item[1]=totHappy;
                                this.setState({HappyThings:this.state.HappyThings});
                                //存储数据
                                Storage.setStorage('HappyThings', JSON.stringify(this.state.HappyThings)).then((x)=>{
                                  this.updateTotHappy();
                                  this.setState({setVisible:-1});
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
                    );})}
                  <CardItem style={styles.checkList} >
                    <Icon name='add' style={{paddingLeft:13}}/>
                    <Left style={{paddingLeft: 9}}>
                      <Text>又感到了幸福?</Text>
                    </Left>
                    <Right>
                      <Button large info style={{height:20,borderColor:'transparent'}}
                      bordered onPress={()=>{
                        this.setState({_name:''}),
                        this.setState({_type:'home'}),
                        this.setState({_val:0}),
                        this.setState({_done:false}),
                        this.setState({_default:false}),
                        this.setState({newVisible:index})
                      }}>
                        <Icon name="arrow-forward" />
                      </Button>
                    </Right>
                    <Modal
                      animationType="slide"
                      transparent={true}
                      visible={this.state.newVisible === index}
                      onRequestClose={() => {
                        this.setState({ newVisible: -1 })
                      }}
                    >
                      <View>
                        <Header style={{ backgroundColor: '#00bfff' }}
                          androidStatusBarColor="#00bfff"
                        >
                          <Left>
                            <Button transparent onPress={() => {
                              this.setState({ newVisible: -1 })
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
                            又发现了幸福的事情吗？记下来！
                          </Text>
                          <ListItem>
                            <Item floatingLabel style={{underlineColor:'transparent'}}>
                              <Label>事件名称</Label>
                              <Input 
                                value={this.state._name}
                                onChangeText={(text) => {this.setState({_name:text})}}
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
                                <Picker.Item style={{justifyContent:'center'}} label={this.state.Type[obj].name} value={this.state.Type[obj].type} />       
                              ))}
                            </Picker>
                          </ListItem>
                          <ListItem>
                            <Icon name='heart' style={{ color: '#ED4A6A' }}/>
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
                          <ListItem>
                            <CheckBox checked={this.state._default} onPress={
                              ()=>this.setState({_default:!this.state._default})
                            }/>
                            <Body>
                              <Text>加入默认列表中</Text>
                            </Body>
                          </ListItem>
                          <ListItem>
                            <CheckBox checked={this.state._done} onPress={
                              ()=>this.setState({_done:!this.state._done})
                            }/>
                            <Body>
                              <Text>我已经通过这个获得幸福啦~</Text>
                            </Body>
                          </ListItem>
                          <View>
                            <Button success onPress={()=>{
                              let i = 0;
                              while(i < this.state.HappyThings[index][2].length){
                                if(this.state._name===this.state.HappyThings[index][2][i].name){
                                  alert("名称重复，你在这一天已经记录过一次这个幸福了...");
                                  return;
                                }
                                i++;
                              }
                              if(this.state._name===''){
                                alert("是什么秘密的事情幸福的让你说不出来呀？写下来嘛~");
                                return;
                              }
                              i=0;
                              if(this.state._default){
                                for(let i=0;i<this.state.defaultList.length;i++){
                                  if(this.state._name===this.state.defaultList[i].name){
                                    if(this.state._type!==this.state.defaultList[i].type 
                                      || this.state._val!==this.state.defaultList[i].val){
                                      alert("默认列表中已经有这件让你幸福的事情了~");
                                      return;
                                    }
                                    break;
                                  }
                                }
                                this.state.defaultList.push(
                                {
                                  name:this.state._name,
                                  type:this.state._type,
                                  val:this.state._val,
                                  done:false,
                                });
                                this.setState({defaultList:this.state.defaultList});
                                Storage.setStorage('defaultList',JSON.stringify(this.state.defaultList));
                              }
                              item[2].push(
                              {
                                name:this.state._name,
                                type:this.state._type,
                                val:this.state._val,
                                done:this.state._done,
                              });
                              let totHappy = 0;
                              for(let i = 0; i < item[2].length;i++){
                                if(item[2][i].done)totHappy+=item[2][i].val;
                              }
                              item[1]=totHappy;
                              //存储数据
                              this.setState({HappyThings:this.state.HappyThings});
                              Storage.setStorage('HappyThings', JSON.stringify(this.state.HappyThings)).then(()=>{
                                this.updateTotHappy();
                                this.setState({newVisible:-1});
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
                  <Button success onPress={() => {this.setState({nowBack:-1})}}>
                    <Icon name='checkmark' />
                  </Button>
                </CardItem>
              </Card>
            </View>
          </FlipCard>
        </ScrollView>
      </View>
        );
    }
    dateEqual(_date1, _date2) {
        let date1 = new Date(_date1),
            date2 = new Date(_date2);
        return date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear();
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
            <Title>主页</Title>
          </Body>
          <Right>
             <Icon name="heart" style={{ color: '#ED4A6A' }} />
             <Text style={{color: "white",fontSize: 20}}>{this.state.totalHappy}</Text>
          </Right>
        </Header>
        <View>
          <Carousel
            ref={(c) => this.carousel = c}
            data={this.state.HappyThings}
            renderItem={this._renderItem}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            containerCustomStyle={styles.carouselContainer}
            inactiveSlideShift={0}
            onSnapToItem={(index) => this.setState({ index })}
            scrollInterpolator={scrollInterpolator}
            slideInterpolatedStyle={animatedStyles}
            useScrollView={true}
          />
        </View>
        
        <Fab
            active={this.state.fabActive}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#00bfff' }}
            position="bottomRight"
            onPress={() => this.setState({ fabActive: !this.state.fabActive })}>
            <Icon name="list" />
            <Button onPress={() => {this.setState({modalVisible:true})}} style={{ backgroundColor: '#ED4A6A' }}>
              <Icon name="add" />
            </Button>
            <Button style={{ backgroundColor: '#3B5998' }} >
              <Icon name="share" />
            </Button>
          </Fab>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({ modalVisible: !this.state.modalVisible })
          }}
        >
          <View>
            <Header style={{ backgroundColor: '#00bfff' }}
              androidStatusBarColor="#00bfff"
            >
              <Left>
                <Button transparent onPress={() => {
                  this.setState({ modalVisible: !this.state.modalVisible })
                }}
                >
                  <Icon name='arrow-back' />
                </Button>
              </Left>
              <Body>
                <Title>新建卡片</Title>
              </Body>
              <Right>
                {/*
                <Button transparent>
                  <Text>Cancel</Text>
                </Button>
                */}
              </Right>
            </Header>
            <View style={styles.newDateModal}>
              <Text style={{fontSize:20,color: 'gray'}}>
                记录新的一天让你感到幸福的事情吧~
              </Text>
              <ListItem>
                <Text>日期:</Text>
                <DatePicker
                defaultDate={new Date()}
                minimumDate={new Date(2020, 0, 23)}
                maximumDate={new Date(2020, 11, 31)}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText=""
                textStyle={{ color: "black" }}
                placeHolderTextStyle={{ color: "black" }}
                onDateChange={this.setDate}
                disabled={false}
                />
              </ListItem>
              <ListItem>
                <CheckBox checked={this.state.useDefaultPlan} onPress={
                  ()=>this.setState({useDefaultPlan:!this.state.useDefaultPlan})
                }/>
                <Body>
                  <Text>使用默认列表初始化</Text>
                </Body>
              </ListItem>
              <View>
                <Button success onPress={()=>{
                  let i = 0;
                  while(i < this.state.HappyThings.length){
                    if(this.dateEqual(this.state.chosenDate,this.state.HappyThings[i][0])){
                      alert('这一天已经有记录幸福的卡片了呢~');
                      return;
                    } else if(this.state.chosenDate>new Date(this.state.HappyThings[i][0])){
                      break;
                    }
                    i++;
                  }
                  let list = this.state.HappyThings;
                  if(true === this.state.useDefaultPlan){
                    list.splice(i,0,[
                      this.state.chosenDate,
                      0,
                      this.state.defaultList,
                    ]);
                    this.setState({HappyThings :list});
                  } else {
                    list.splice(i,0,[
                      this.state.chosenDate,
                      0,
                      [],
                    ]);
                    this.setState({HappyThings :list});
                  }
                  //存储数据
                  Storage.setStorage('HappyThings', JSON.stringify(this.state.HappyThings)).then(
                    this.setState({modalVisible:false})
                  );
                }}>
                  <Icon name='checkmark'/>
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      </Container>
        );
    }
}
const styles = StyleSheet.create({
    checkList: {},
    newDateModal: {
        padding: 20,
        backgroundColor: 'white',
        height: SLIDER_HEIGHT - 20,
    },
    carouselContainer: {
        marginTop: 10
    },
    itemContainer: {
        //width: ITEM_WIDTH,
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

/* 导航插件 */

const DrawerNav = createDrawerNavigator();

export default function App() {
    RNShakeEvent.addEventListener('shake', () => {
        console.log('Device shake!');
    });
    return (
        <NavigationContainer>
      <DrawerNav.Navigator initialRouteName="主页" 
      drawerStyle={{width: 240}} 
      drawerContentOptions={{
        contentContainerStyle: {//外层
          marginTop: 20,//20
          //marginVertical: 100,
        },
        itemStyle:{//内层文字
          marginHorizontal: 0,
          marginVertical: 0,
          //padding: 8,
          //backgroundColor: "#66ccff",
        },
        labelStyle:{//文字遮罩（触摸变色部分）
          marginHorizontal: 0,
          padding: 6,
        },
      }}
      >
        <DrawerNav.Screen name="主页" component={HomeScreen} />
        <DrawerNav.Screen name="种草" component={wishlist} />
        <DrawerNav.Screen name="设置" component={setting} />
        <DrawerNav.Screen name="关于" component={AboutScreen} />
      </DrawerNav.Navigator>
    </NavigationContainer>
    );
}