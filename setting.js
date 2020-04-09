import React, { Component } from 'react';
import { Image, Dimensions, StyleSheet, TouchableOpacity, ScrollView, Modal, AsyncStorage, DatePickerAndroid } from 'react-native';
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

const setStorage = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
        return true;
    } catch (error) {
        // Error saving data
        return false;
    }
}

const getStorage = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value;
        }
    } catch (error) {
        // Error retrieving data
        return null;
    }
    return null;
}

export default class setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	nowBack:false;
        }
        getStorage('Type').then((x) => {
            if (x !== null) this.setState({ Type: JSON.parse(x) });
        });
        getStorage('defaultList').then((x) => {
            if (x !== null) this.setState({ defaultList: JSON.parse(x) });
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
                        {默认列表设置}
                    </Button>
                  </Left>
                </CardItem>
                <View style={styles.itemContain}>
                  {this.state.defaultList.map((items)=>{
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
                  })}
                  <Text>{tot?'':"这里空空如也,赶快去寻找让你幸福的事吧~"}</Text>
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
                          setStorage('HappyThings',JSON.stringify(this.state.HappyThings));
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
                                    setStorage('HappyThings', JSON.stringify(this.state.HappyThings)).then(
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
                                setStorage('HappyThings', JSON.stringify(this.state.HappyThings)).then((x)=>{
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
                                setStorage('defaultList',JSON.stringify(this.state.defaultList));
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
                              setStorage('HappyThings', JSON.stringify(this.state.HappyThings)).then(()=>{
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

