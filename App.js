import React, { Component } from 'react';
import { Image, Dimensions, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { Container, Text, View, DeckSwiper, Header, Title, Content, Footer, ListItem, List, Form, Label, Item,
   FooterTab, Thumbnail, Button, Left, Right, Body, Icon, Card, CardItem, Fab, DatePicker, CheckBox, Input,
    } from 'native-base';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { AsyncStorage } from '@react-native-community/async-storage';
import Carousel from 'react-native-snap-carousel';
import { scrollInterpolator, animatedStyles } from './utils/animations';
import FlipCard from 'react-native-flip-card'//卡片翻转效果
import RNShakeEvent from 'react-native-shake-event';
/* about screen */
const cards = [
  {
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

function AboutScreen ({navigation}) {
  return(
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
    this.state={
      index : 0,
      totalHappy: 46,
      modalVisible: false,
      setVisible: -1,
      useDefaultPlan: false,
      nowBack: 1-1,
      fabActive: false,
      _name : '',
      _type : '',
      _val : 0,
      _done : false,
      chosenDate: new Date(),
      HappyThings:[
        [
          new Date(2020,3,10),
          6,
          [
            {
              name : '不用上课', 
              type : 'school',
              val : 3,
              done : true,
            },
            {
              name : '祭祀祖先',
              type : 'home',
              val : 3,
              done : true,
            },
          ],
        ],
        [
          new Date(2020,3,9),
          6,
          [
            {
              name : '不用上课', 
              type : 'school',
              val : 3,
              done : true,
            },
            {
              name : '祭祀祖先',
              type : 'home',
              val : 3,
              done : true,
            },
          ],
        ],
        [
          new Date(2020,3,8),
          6,
          [
            {
              name : '不用上课', 
              type : 'school',
              val : 3,
              done : true,
            },
            {
              name : '祭祀祖先',
              type : 'home',
              val : 3,
              done : true,
            },
          ],
        ],
        [
          new Date(2020,3,7),
          6,
          [
            {
              name : '不用上课', 
              type : 'school',
              val : 3,
              done : true,
            },
            {
              name : '祭祀祖先',
              type : 'home',
              val : 3,
              done : true,
            },
          ],
        ],
        [
          new Date(2020,3,6),
          6,
          [
            {
              name : '不用上课', 
              type : 'school',
              val : 3,
              done : true,
            },
            {
              name : '祭祀祖先',
              type : 'home',
              val : 3,
              done : true,
            },
          ],
        ],
        [
          new Date(2020,3,5),
          6,
          [
            {
              name : '不用上课', 
              type : 'school',
              val : 3,
              done : true,
            },
            {
              name : '祭祀祖先',
              type : 'home',
              val : 3,
              done : true,
            },
          ],
        ],
        [
          new Date(2020,3,4),
          6,
          [
            {
              name : '不用上课', 
              type : 'school',
              val : 3,
              done : true,
            },
            {
              name : '祭祀祖先',
              type : 'home',
              val : 3,
              done : true,
            },
          ],
        ],
        [
          new Date(2020,3,3),
          4,
          [
            {
              name : '今晚吃鸡', 
              type : 'game',
              val : 2,
              done : true,
            },
            {
              name : '下午没课',
              type : 'school',
              val : 2,
              done : true,
            },
          ],
        ],
      ],
      Type:{
        'game' : {
          name : '游戏',
          DefaultText : '游戏胜利',
          DefaultVal : 2,
        },
        'home' : {
          name : '家庭',
          DefaultText : '家庭活动',
          DefaultVal : 3,
        },
        'school' : {
          name : '学校',
          DefaultText : '自由规划学习时间',
          DefaultVal : 2,
        },
      },
      defaultList:[
        {
          name : '今晚吃鸡', 
          type : 'game',
          val : 2,
          done : false,
        },
        {
          name : '和家人一起做了有意义的事', 
          type : 'home',
          val : 3,
          done : false,
        },
        {
          name : '又是可以自由规划的一天呢~', 
          type : 'school',
          val : 2,
          done : false,
        },
      ]
    }
  }
  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }
  getDateCNFormat(newDate) {
    return (
      <Text>
        {newDate.getFullYear()}年{newDate.getMonth()+1}月{newDate.getDate()}日
      </Text>
    );
  }
  getDateENFormat(newDate) {
    return (
      <Text>
        {newDate.getFullYear()}/{newDate.getMonth()+1}/{newDate.getDate()}
      </Text>
    );
  }
  
  _renderItem({ item, index }) {
    let tot = 0;
    return (
      <View>
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
            <View style={styles.face}>
              <Card>
                <CardItem header>
                  <Left>
                    <Button info iconLeft onPress={() => {}}>
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
                  <Text>{tot?'':"这里空空如也，赶快去寻找让你幸福的事情吧~"}</Text>
                </View>
                <CardItem footer style={styles.itemButtom}>
                  <Button primary onPress={() => {this.setState({nowBack:index})}}>
                    <Icon name='settings' />
                  </Button>
                </CardItem>
              </Card>
            </View>
            {/* Back Side */}
            <View>
              <Card>
                <CardItem header>
                  <Text>这些幸福，你捕捉到了吗？</Text>
                </CardItem>
                <View style={{height:Content_HEIGHT}}>
                  {item[2].map((items)=>{
                    return(
                    <CardItem style={styles.checkList}>
                      <CheckBox checked={items.done} onPress={
                        ()=>{items.done=!items.done;
                          let totHappy = 0;
                          for(let i = 0; i < item[2].length;i++){
                            if(item[2][i].done)totHappy+=item[2][i].val;
                          }
                          item[1]=totHappy;
                          this.setState({HappyThings:this.state.HappyThings});}
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
                          <Form>
                            <Item floatingLabel>
                              <Label>事件名称</Label>
                              <Input 
                                value={this.state._name}
                                onChangeText={(text) => {this.setState({_name:text})}}
                              />
                            </Item>
                          </Form>
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
                              let i = 0,fix=0;
                              while(i < this.state.HappyThings[index][2].length){
                                if(this.state.HappyThings[index][2][i].name===items.name){
                                  fix=i;
                                } else if(this.state._name===this.state.HappyThings[index][2][i].name){
                                  alert("名称重复，你在这一天已经记录过一次这个幸福了...");
                                }
                                i++;
                              }
                              items.name=this.state._name;
                              items.type=this.state._type;
                              items.val=this.state._val;
                              if(items.done!==this.state._done){
                                items.done=this.state._done;
                                let totHappy = 0;
                                for(let i = 0; i < item[2].length;i++){
                                  if(item[2][i].done)totHappy+=item[2][i].val;
                                }
                                item[1]=totHappy;
                              }
                              //存储数据
                              this.setState({setVisible:-1});
                            }}>
                              <Icon name='checkmark'/>
                            </Button>
                          </View>
                        </View>
                      </View>
                    </Modal>
                    </CardItem>
                    );})}
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
  dateEqual(date1,date2){
    return date1.getDate()===date2.getDate() 
    && date1.getMonth() === date2.getMonth()
    && date1.getFullYear() === date2.getFullYear();
  }
  render(){
    const {navigation} = this.props;
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
          {/*}
          <Text style={styles.counter}>
            {this.getDateENFormat(this.state.HappyThings[this.state.index][0])}
          </Text>
        */}
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
            <Button disabled style={{ backgroundColor: '#3B5998' }}>
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
                    } else if(this.state.chosenDate>this.state.HappyThings[i][0]){
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
                    //this.setState({HappyThings:})
                  } else {
                    list.splice(i,0,[
                      this.state.chosenDate,
                      0,
                      [],
                    ]);
                    this.setState({HappyThings :list});
                  }
                  //存储数据
                  this.setState({modalVisible:false});
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
  checkList:{
  },
  newDateModal:{
    padding: 20,
    backgroundColor: 'white',
    height: SLIDER_HEIGHT-20,
  },
  carouselContainer: {
    marginTop: 10
  },
  itemContainer: {
    //width: ITEM_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemDate:{
    alignItems:'flex-start',
    flex: 1,
  },
  itemContain:{
    height: Content_HEIGHT,
    alignItems: 'flex-end',
  },
  itemButtom:{
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 50,
  },
  counter: {
    marginTop: 25,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  },
});

/* 导航插件 */

const DrawerNav = createDrawerNavigator();

export default function App(){
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
        <DrawerNav.Screen name="关于" component={AboutScreen} />
      </DrawerNav.Navigator>
    </NavigationContainer>
  );
}















// import React, { Component } from 'react';
// import { DrawerNavigator } from 'react-navigation';
// export default class CardExample extends Component {

//     // closeDrawer() {
//     //     this.drawer._root.close()
//     // };
//     // openDrawer() {
//     //     this.drawer._root.open()
//     // };
//     // render() {
//     //     return (
//     //       <Drawer ref={(ref) => { this.drawer = ref; }} 
//     //       content={
//     //         <SideBar navigator={this.navigator} />
//     //       }
//     //       onClose = {() => this.closeDrawer() } 
//     //       >
//     //       </Drawer>
//     //     ); 
//     //   }
//     render() {

//       }
// }


    
//     // import React, { Component } from 'react';
//     // import { Text, View } from 'react-native';

//     // export default class HelloWorldApp extends Component {
//     //   render() {
//     //     return (
//     //         <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//     //           <Text>Hello, world!</Text>
//     //         </View>
//     //     );
//     //   }
//     // }

//     // /**
//     //  * Sample React Native App
//     //  * https://github.com/facebook/react-native
//     //  *
//     //  * @format
//     //  * @flow strict-local
//     //  */

//     // import React from 'react';
//     // import {
//     //   SafeAreaView,
//     //   StyleSheet,
//     //   ScrollView,
//     //   View,
//     //   Text,
//     //   StatusBar,
//     // } from 'react-native';

//     // import {
//     //   Header,
//     //   LearnMoreLinks,
//     //   Colors,
//     //   DebugInstructions,
//     //   ReloadInstructions,
//     // } from 'react-native/Libraries/NewAppScreen';

//     // const App: () => React$Node = () => {
//     //   return (
//     //     <>
//     //       <StatusBar barStyle="dark-content" />
//     //       <SafeAreaView>
//     //         <ScrollView
//     //           contentInsetAdjustmentBehavior="automatic"
//     //           style={styles.scrollView}>
//     //           <Header />
//     //           {global.HermesInternal == null ? null : (
//     //             <View style={styles.engine}>
//     //               <Text style={styles.footer}>Engine: Hermes</Text>
//     //             </View>
//     //           )}
//     //           <View style={styles.body}>
//     //             <View style={styles.sectionContainer}>
//     //               <Text style={styles.sectionTitle}>Step One</Text>
//     //               <Text style={styles.sectionDescription}>
//     //                 Edit <Text style={styles.highlight}>App.js</Text> to change this
//     //                 screen and then come back to see your edits.
//     //               </Text>
//     //             </View>
//     //             <View style={styles.sectionContainer}>
//     //               <Text style={styles.sectionTitle}>See Your Changes</Text>
//     //               <Text style={styles.sectionDescription}>
//     //                 <ReloadInstructions />
//     //               </Text>
//     //             </View>
//     //             <View style={styles.sectionContainer}>
//     //               <Text style={styles.sectionTitle}>Debug</Text>
//     //               <Text style={styles.sectionDescription}>
//     //                 <DebugInstructions />
//     //               </Text>
//     //             </View>
//     //             <View style={styles.sectionContainer}>
//     //               <Text style={styles.sectionTitle}>Learn More</Text>
//     //               <Text style={styles.sectionDescription}>
//     //                 Read the docs to discover what to do next:
//     //               </Text>
//     //             </View>
//     //             <LearnMoreLinks />
//     //           </View>
//     //         </ScrollView>
//     //       </SafeAreaView>
//     //     </>
//     //   );
//     // };

//     // const styles = StyleSheet.create({
//     //   scrollView: {
//     //     backgroundColor: Colors.lighter,
//     //   },
//     //   engine: {
//     //     position: 'absolute',
//     //     right: 0,
//     //   },
//     //   body: {
//     //     backgroundColor: Colors.white,
//     //   },
//     //   sectionContainer: {
//     //     marginTop: 32,
//     //     paddingHorizontal: 24,
//     //   },
//     //   sectionTitle: {
//     //     fontSize: 24,
//     //     fontWeight: '600',
//     //     color: Colors.black,
//     //   },
//     //   sectionDescription: {
//     //     marginTop: 8,
//     //     fontSize: 18,
//     //     fontWeight: '400',
//     //     color: Colors.dark,
//     //   },
//     //   highlight: {
//     //     fontWeight: '700',
//     //   },
//     //   footer: {
//     //     color: Colors.dark,
//     //     fontSize: 12,
//     //     fontWeight: '600',
//     //     padding: 4,
//     //     paddingRight: 12,
//     //     textAlign: 'right',
//     //   },
//     // });

//     // export default App;