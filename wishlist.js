import React, {Component} from 'react';
import {
  Image,
  Dimensions,
  StyleSheet,
  LayoutAnimation,
  TouchableOpacity,
  CheckBox,
  AsyncStorage,
} from 'react-native';
import {
  Container,
  Text,
  View,
  DeckSwiper,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Thumbnail,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Card,
  CardItem,
  Form,
  Label,
  Input,
  Item,
} from 'native-base';
import DraggableFlatList from 'react-native-draggable-flatlist';
import ActionButton from 'react-native-action-button';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import {SwipeRow} from 'react-native-swipe-list-view';
const setStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (error) {
    // Error saving data
    return false;
  }
};

const getStorage = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    // Error retrieving data
  }
};

/*种草机页面 */

export default class wishlist extends Component {
  constructor(props) {
    super(props);
    const tempCnt = getStorage('totalItem');
    const tempData = getStorage('wishItem');
    this.state = {
      isModalVisible: false,
      totalItem: 0,
      modalTemp: {
        name: '',
        key: 0,
        price: 0,
        imgSource: null,
      },
      data: [
        // {
        //   name: 'ryzen 3900x',
        //   key: 1,
        //   price: 4000,
        //   imgSource: require('./1.jpg'),
        // },
        // {
        //   name: 'rtx 2080ti',
        //   key: 2,
        //   price: 10800,
        //   imgSource: require('./2.png'),
        // },
      ],
    };
    if (tempCnt)
      tempCnt.then(val => {
        if (val) this.state.totalItem = parseInt(val);
      });
    if (tempData) {
      tempData.then(val => {
        if (val) {
          const jsonval = JSON.parse(val);
          this.setState({data: jsonval});
        }
      });
    }
  }

  renderItem = ({item, index, drag}) => {
    return (
      <SwipeRow leftOpenValue={75} rightOpenValue={-75} disableLeftSwipe={true}>
        <View style={styles.standaloneRowBack}>
          <Text
            style={styles.backTextWhite}
            onPress={() => {
              const updd = this.state.data.filter(d => d !== item);
              LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
              this.state.totalItem--;
              this.setState({data: updd});
              this.saveData();
            }}>
            删除
          </Text>
        </View>
        <View>
          <TouchableOpacity onLongPress={drag} activeOpacity={0.9}>
            <Container style={{height: 130, padding: 15}}>
              <Content>
                <Card>
                  <CardItem>
                    <Left>
                      <Thumbnail
                        source={this.state.data[index].imgSource}
                        style={{height: 60}}
                      />
                      <Body>
                        <Text>{this.state.data[index].name}</Text>
                        <Text note>￥{this.state.data[index].price}</Text>
                      </Body>
                    </Left>
                    <Right>
                      <CheckBox
                        onChange={() => {
                          const upd = this.state.data.filter(d => d !== item);
                          LayoutAnimation.configureNext(
                            LayoutAnimation.Presets.spring,
                          );
                          this.state.totalItem--;
                          this.setState({data: upd});
                          this.saveData();
                        }}
                      />
                    </Right>
                  </CardItem>
                </Card>
              </Content>
            </Container>
          </TouchableOpacity>
        </View>
      </SwipeRow>
    );
  };

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  saveData = () => {
    setStorage('wishItem', JSON.stringify(this.state.data));
    setStorage('totalItem', JSON.stringify(this.state.totalItem.toString));
  };
  render() {
    const {navigation} = this.props;

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
            <Title style={{alignContent: 'center', fontSize: 20}}>种草机</Title>
          </Body>
        </Header>
        <View style={{flex: 1}}>
          <DraggableFlatList
            activationDistance={15}
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => `draggable-item-${item.key}`}
            onDragEnd={({data}) => {
              this.setState({data: data});
              this.saveData();
            }}
          />
        </View>
        <ActionButton onPress={this.toggleModal} />
        <Modal
          isVisible={this.state.isModalVisible}
          onBackdropPress={this.toggleModal}
          backdropOpacity={0.0}
          style={{
            width: Dimensions.get('window').width * 0.8,
            height: Dimensions.get('window').height * 0.5,
            alignContent: 'center',
            padding: 30,
          }}>
          <View
            style={{
              width: Dimensions.get('window').width * 0.8,
              height: Dimensions.get('window').height * 0.5,
              alignContent: 'center',
              padding: 30,
            }}>
            <Container style={{flex: 1}}>
              <Content>
                <Form>
                  <Item style={styles.row}>
                    <Image source={this.state.modalTemp.imgSource} />
                  </Item>
                  <Item floatingLabel>
                    <Label>Name</Label>
                    <Input
                      onChangeText={text => {
                        this.setState({
                          modalTemp: {
                            name: text,
                            price: this.state.modalTemp.price,
                            imgSource: this.state.modalTemp.imgSource,
                          },
                        });
                      }}
                    />
                  </Item>
                  <Item floatingLabel last style={{padding: 5}}>
                    <Label>Price</Label>
                    <Input
                      onChangeText={text => {
                        this.setState({
                          modalTemp: {
                            name: this.state.modalTemp.name,
                            price: text,
                            imgSource: this.state.modalTemp.imgSource,
                          },
                        });
                      }}
                    />
                  </Item>
                  <Button
                    style={{padding: 25}}
                    onPress={() => {
                      ImagePicker.openPicker({
                        width: 100,
                        height: 100,
                        cropping: true,
                        includeBase64: true,
                        includeExif: true,
                      }).then(image => {
                        this.setState({
                          modalTemp: {
                            name: this.state.modalTemp.name,
                            price: this.state.modalTemp.price,
                            imgSource: {
                              uri: `data:${image.mime};base64,` + image.data,
                              width: image.width,
                              height: image.height,
                            },
                          },
                        });
                      });
                    }}>
                    <Text>选择图片</Text>
                  </Button>

                  <View style={styles.row}>
                    <Button
                      onPress={() => {
                        var moTemp = this.state.modalTemp;
                        if (
                          moTemp.name.length == 0 ||
                          moTemp.price.length == 0
                        ) {
                          alert('想要的东西可不能为空哦');
                        } else {
                          if (moTemp.imgSource == null)
                            moTemp.imgSource = require('./o1.jpg');
                          moTemp.key = ++this.state.totalItem;
                          this.setState({
                            data: this.state.data.concat(moTemp),
                          });
                          this.saveData();
                          this.setState({
                            modalTemp: {
                              name: '',
                              key: 0,
                              price: 0,
                              imgSource: null,
                            },
                            isModalVisible: !this.state.isModalVisible,
                          });
                        }
                      }}>
                      <Text>完成</Text>
                    </Button>
                    <Button onPress={this.toggleModal}>
                      <Text>取消</Text>
                    </Button>
                  </View>
                </Form>
              </Content>
            </Container>
          </View>
        </Modal>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 15,
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 32,
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  standalone: {
    marginTop: 30,
    marginBottom: 30,
  },
  standaloneRowBack: {
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  backTextWhite: {
    backgroundColor: 'tomato',
    color: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  spacer: {
    height: 50,
  },
});
