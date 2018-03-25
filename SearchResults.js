'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  FlatList,
  Text,
  ToolbarAndroid,
  DrawerLayoutAndroid,
} from 'react-native';
import Menu, {
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';

const { ContextMenu, SlideInMenu, Popover } = renderers;

class ListItem extends React.PureComponent {
  onPress = () => {
    this.props.onPressItem(this.props.index);
  }
  
  renderNavigationView() {
    return <View>
      <Text>Home</Text>
    </View>
  }

  onActionSelected = (actionNumber) => {
    switch (actionNumber) {
      case 0:
        this.onPress();
        break;
    
      default:
        break;
    }
  }

  render() {
    const item = this.props.item;
    const price = item.price_formatted.split(' ')[0];
    return ( 
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerHeight={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={this.renderNavigationView}
        style={{ height: 130 }}
      >
        <ToolbarAndroid
          title="Perceptron"          
          onActionSelected={this.onActionSelected}
          actions = {[
            {title: "Flat info", show: "never"},
            {title: "Log out", show: "never"},
          ]}
          style={{ height: 130 }}
        >     
          <TouchableHighlight
            onPress={this.onPress}
            underlayColor='#dddddd'
          >
            <View>
              <View style={styles.rowContainer}>
                <Image style={styles.thumb} source={{ uri: item.img_url }} />
                <View style={styles.textContainer}>
                  <Text style={styles.price}>{price}</Text>
                  <Text style={styles.title}
                    numberOfLines={1}>{item.title}</Text>
                </View>
              </View>
              <View style={styles.separator}/>
            </View>
          </TouchableHighlight>
       </ToolbarAndroid>
      </DrawerLayoutAndroid>
    );
  }
}

export default class SearchResults extends Component {
  static navigationOptions = {
    title: 'Results',
  };

  _keyExtractor = (item, index) => index;

  _renderItem = ({item, index}) => (
    <View>
      <ListItem
        item={item}
        index={index}
        onPressItem={this.onPressItem}
      />      
    </View>
  );

  onPressItem = (index) => {
    const { navigate, state } = this.props.navigation;
    navigate('Property', {property: state.params.listings[index]});
  };

  render() {
    const { params } = this.props.navigation.state;
    return (
      <FlatList
        data={params.listings}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  thumb: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48BBEC',
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  container: {
    flexDirection: 'column',
    padding: 0,
  },
  backdrop: {
    backgroundColor: 'red',
    opacity: 0.5,
  },
  anchorStyle: {
    backgroundColor: 'blue',
  },
});

const triggerStyles = {
  triggerText: {
    color: 'white',
  },
  triggerOuterWrapper: {
    backgroundColor: 'orange',
    padding: 0,
    flex: 1,
    zIndex: 2,
  },
  triggerWrapper: {
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  triggerTouchable: {
    underlayColor: 'darkblue',
    activeOpacity: 70,
    style : {
      flex: 1,
    },
  },
};

const optionsStyles = {
  optionsContainer: {
    backgroundColor: 'green',
    padding: 0,
    zIndex: 2,
  },
  optionsWrapper: {
    zIndex: 2,
    backgroundColor: 'purple',
  },
  optionWrapper: {
    backgroundColor: 'yellow',
    margin: 5,
  },
  optionTouchable: {
    underlayColor: 'gold',
    activeOpacity: 70,
  },
  optionText: {
    color: 'brown',
  },
};

const optionStyles = {
  optionTouchable: {
    underlayColor: 'red',
    activeOpacity: 40,
  },
  optionWrapper: {
    backgroundColor: 'pink',
    margin: 5,
  },
  optionText: {
    color: 'black',
  },
};

const menuProviderStyles = {
  menuProviderWrapper: styles.container,
  backdrop: styles.backdrop,
};
