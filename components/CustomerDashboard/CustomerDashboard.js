import * as React from 'react';

import {Overlay, Divider, Rating} from 'react-native-elements';
import {
  View,
  TouchableOpacity,
  Text,
  Button,
  AsyncStorage,
  ActivityIndicator,
  Alert,
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {ScrollView} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';

import hairstyles from './TrendingHairstyles';
import Snackbar from 'react-native-snackbar';

import io from 'socket.io-client';
import carouselItems from './items/carouselItems';
import testimonies from './items/testimonies';

class CustomerDashboard extends React.Component {
  componentDidMount() {
    this.socket = io('https://dbformongo.eu-gb.cf.appdomain.cloud');

    this.socket.on('sendStatusToUser', data => {
      this.setState({
        temp: {
          id: data.id,
          status: data.status,
          url: data.url,
        },
      });
      this.setState({noteShow: true});
      setTimeout(() => {
        this.setState({noteShow: false});
      }, 5000);
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      carouselItems: carouselItems,

      testimonials: testimonies,
      hairstyles,
      modal: false,
      temp: null,
      noteShow: false,
    };
  }

  setModal = () => {
    this.setState({modal: !this.state.modal});
  };

  _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => { 
          
          console.log(item,"myItem")
          item.title=="Hair Salon" ? this.props.navigation.navigate('choose_gender') : this.props.navigation.navigate('selectAnythingScreen',{anItem:item})
          

        } 
          
          
          }>
        <LinearGradient
          colors={['#606c88', '#3f4c6b']}
          start={{x: 0, y: 1}}
        end={{x: 0, y: 1}}
          style={styles.container}>
          <ImageBackground
            source={{uri:item.image}}
            style={{width: 300, height: 200, justifyContent: 'flex-end'}}
            imageStyle={{borderRadius: 5}}>
            <View
              style={{
                backgroundColor: 'white',
                minHeight: 50,
                minWidth: 250,
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0.8,
              }}>
              <Text style={{fontSize: 20, fontFamily: 'Montserrat-Bold'}}>
                {item.title}
              </Text>
            </View>
          </ImageBackground>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  _renderItem2({item, index}) {
    return (
      <TouchableOpacity activeOpacity={0.9}>
        <LinearGradient
          colors={['#FFFFFF', '#FFFFFF']}
          start={{x: 0, y: 1}}
          end={{x: 0, y: 1}}
          style={styles.testimonials}>
          {/* <ImageBackground source={item.image} > */}

          <View style={{justifyContent: 'center'}}>
            <Text style={{fontSize: 17, fontWeight: 'bold'}}>{item.main}</Text>
            <Divider style={{marginVertical: 10, height: 1}} />
            <Text style={{fontSize: 12, fontWeight: 'normal'}}>
              {item.text}
            </Text>
            <Rating
              startingValue={item.rating}
              ratingBackgroundColor="pink"
              type="star"
              imageSize={20}
              readonly
              minValue={1}
              fractions={0}
              showRating={true}
            />
          </View>

          {/* </ImageBackground> */}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  _renderItem3 = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() =>
          Snackbar.show({
            text: 'Added To cart',
            duration: 6001,
            action: {
              text: 'Go To Cart',
              onPress: () => {
                this.props.navigation.navigate('choose_gender');
              },
              textColor: 'green',
            },
          })
        }>
        <LinearGradient
          colors={['#606c88', '#3f4c6b']}
          start={{x: 0, y: 1}}
          end={{x: 0, y: 1}}
          style={styles.container}>
          <ImageBackground
            resizeMode="cover"
            source={item.image}
            style={{width: 300, height: 200, justifyContent: 'flex-end'}}
            imageStyle={{borderRadius: 5}}>
            <View style={styles.carouselContainer}>
              <Text style={{fontSize: 14, fontFamily: 'Montserrat-Bold'}}>
                {item.title}
              </Text>
            </View>
          </ImageBackground>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <ScrollView
        style={{flex: 2, backgroundColor: 'white', paddingVertical: 40}}>


        
        {this.state.noteShow ? (
          // <Animated.View >
          <View
            style={styles.screen}>
            <ImageBackground
              source={require('./../../assets/images/Background.png')}
              resizeMode="cover"
              imageStyle={{opacity: 0.4}}
              style={styles.imageBackground}>
              <Icon
                name={'x-circle'}
                size={20}
                style={{position: 'absolute', top: 25, right: 25}}
              />
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                }}>
                <Text style={{fontFamily: 'Montserrat-SemiBold', fontSize: 15}}>
                  Order No:{' '}
                  <Text>
                    {this.state.temp !== null ? this.state.temp.id : ''}
                  </Text>{' '}
                </Text>
                <Text style={{fontFamily: 'Montserrat-SemiBold', fontSize: 15}}>
                  Has Been Successfully placed
                </Text>
              </View>
            </ImageBackground>
          </View>
        ) : // </Animated.View>
        null}

        <View style={{marginVertical: 20, marginLeft: 20}}>
          <Text style={{fontSize: 30, fontFamily: 'Montserrat-Bold'}}>
            CustomerDashboard
          </Text>
          <Text style={{marginVertical: 5}}>Checkout our new styles</Text>
        </View>
        <ImageBackground
          loadingIndicatorSource
          resizeMode="repeat"
          source={require('./../../assets/images/Background.png')}
          imageStyle={{opacity: 0.5}}
          style={{flex: 1}}>
          <Text
            style={{
              fontFamily: 'SourceSansPro-Regular',
              marginLeft: 25,
              marginBottom: 10,
              fontSize: 25,
              fontWeight: 'normal',
              elevation: 4,
            }}>
            Offers Near You
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              minHeight: 230,
            }}>
            <Carousel
              layout={'default'}
              // layoutCardOffset={4}
              ref={ref => (this.carousel = ref)}
              data={this.state.carouselItems}
              sliderWidth={300}
              itemWidth={300}
              renderItem={this._renderItem}
              onSnapToItem={index => this.setState({activeIndex: index})}
            />
          </View>

          <Text
            style={{
              fontFamily: 'SourceSansPro-Regular',
              marginLeft: 25,
              marginVertical: 20,
              fontSize: 25,
              fontWeight: 'normal',
              elevation: 4,
            }}>
            New Hairstyles For Men
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 20,
              height: 230,
            }}>
            <Carousel
              layout={'default'}
              layoutCardOffset={4}
              showsHorizontalScrollIndicator
              ref={ref => (this.carousel = ref)}
              data={this.state.hairstyles}
              sliderWidth={300}
              itemWidth={300}
              renderItem={this._renderItem3}
              onSnapToItem={index => this.setState({activeIndex: index})}
            />
          </View>

          <Text
            style={{
              fontFamily: 'SourceSansPro-Regular',
              marginLeft: 25,
              marginVertical: 10,
              fontSize: 25,
              fontWeight: 'normal',
              elevation: 4,
            }}>
            Testimonials
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 20,
              minHeight: 300,
            }}>
            <Carousel
              layout={'default'}
              // layoutCardOffset={4}

              ref={ref => (this.carousel = ref)}
              data={this.state.testimonials}
              sliderWidth={300}
              itemWidth={300}
              renderItem={this._renderItem2}
              onSnapToItem={index => this.setState({activeIndex: index})}
            />
          </View>

         
        </ImageBackground>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  textStyles: {
    marginTop: 20,
    marginHorizontal: 15,
    fontSize: 14,
    color: 'grey',
  },
  container: {
    backgroundColor: 'floralwhite',
    borderRadius: 5,
    height: 200,
    // padding: 10,
    marginLeft: 12,
    marginRight: 12,
    elevation: 10,
  },
  testimonials: {},
  testimonials: {
    backgroundColor: 'white',
    borderRadius: 5,
    // height: 400,
    padding: 30,
    marginLeft: 12,
    marginRight: 12,
    elevation: 10,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBackground: {
    padding: 20,
    width: Dimensions.get('screen').width - 20,
    height: Dimensions.get('screen').height,
    position: 'relative',
  },
  carouselContainer: {
    backgroundColor: 'white',
    minHeight: 50,
    minWidth: 250,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.8,
  },
  screen:{
    height: 150,
    width: Dimensions.get('screen').width - 20,
    position: 'absolute',
    top: 10,

    backgroundColor: 'white',
    elevation: 100,
    zIndex: 100,
    marginHorizontal: 10,
    borderRadius: 10,
  }
  
  ,
});

CustomerDashboard['navigationOptions'] = ({navigation, props}) => {
  return {
    headerTitle: 'Windows',
    headerShown: false,

    // headerTintColor:"white",
    headerRight: () => {
      return (
        <View style={{flexDirection: 'row', padding: 10}}>
          <Icon
            name="settings"
            onPress={() => {
              navigation.toggleDrawer();
            }}
            color="rgb(184, 184, 184)"
            size={25}
          />
        </View>
      );
    },
    headerRightContainerStyle: {
      marginHorizontal: 20,
      elevation: 15,
    },
  };
};

export default CustomerDashboard;
