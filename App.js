import React, { Component } from 'react';
import { Image } from 'react-native';
import { View,Drawer, Container, DeckSwiper, Header, Title, Content, Footer, FooterTab, Thumbnail, Button, Left, Right, Body, Icon, Text, Card, CardItem, } from 'native-base';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { AsyncStorage } from '@react-native-community/async-storage';

const cards = [
  {
    text: 'Card One',
    name: '1',
    image: require('./1.jpg'),
  },
  {
    text: 'Card 2',
    name: '2',
    image: require('./1.jpg'),
  },
  {
    text: 'Card 3',
    name: '3',
    image: require('./1.jpg'),
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

class HomeScreen extends Component {
  state={
    HappyThings:{
      '4.3':{
        '今晚吃鸡':{
          type : 'game',
          val : 2,
        },
        '下午没课':{
          type : 'school',
          val : 2,
        },
      },
      '4.4':{
        '不用上课':{
          type : 'school',
          val : 3,
        },
        '祭祀祖先':{
          type : 'home',
          val : 3,
        },
      },
    },
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
  }
  getTypeName(happyType){
    alert(this.state.Type.happyType.name);
    return this.state.Type.happyType.name;
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
            <Title>{this.state.Type.home.name}</Title>
          </Body>
          <Right>
             <Icon name="heart" style={{ color: '#ED4A6A' }} />
             <Text style={{color: "white",fontSize: 20}}>(幸福指数)</Text>
          </Right>
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
          {/*
          <Card>
            <CardItem>
              <Body>
                <Text>
                   咕咕咕 
                </Text>
              </Body>
            </CardItem>
          </Card>
          */}
        </View>
      </Container>
    );
  }
}

const DrawerNav = createDrawerNavigator();

export default function App(){
  return (
    <NavigationContainer>
      <DrawerNav.Navigator initialRouteName="主页" 
      drawerStyle={{width: 240}} 
      drawerContentOptions={{
        contentContainerStyle: {//外层
          marginTop: 20,
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
        style:{
          //marginVertical: 100
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