'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  Text,
  Picker,
  DrawerLayoutAndroid,
  Button
} from 'react-native';
import Menu, {
    MenuProvider,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    renderers,
  } from 'react-native-popup-menu';

const { ContextMenu, SlideInMenu, Popover } = renderers;

export default class OptionsPage extends Component {
  static navigationOptions = {
    title: 'Options',
  };

  constructor(props, ctx) {
    super(props, ctx);
    this.state = {
        renderer: ContextMenu,
        fontSize: 20,
    };
  }

  render() {
    return (
        <MenuProvider customStyles={menuProviderStyles}>
            <View>         
                <Text style={{fontSize: this.state.fontSize, }}>Change Font size</Text>
                <Picker
                    selectedValue={this.state.fontSize}
                    onValueChange={(itemValue) => this.setState({ fontSize: itemValue, })}
                >
                    {
                        [10, 15, 20, 25, 30, 40, 45, 50].map(i => (
                            <Picker.Item key={i} label={i.toString()} value={i} />
                        ))
                    }
                </Picker>        
                <Menu
                    renderer={this.state.renderer}
                    rendererProps={{ anchorStyle: styles.anchorStyle }}
                    style={{ height: 50 }}
                >
                    <MenuTrigger text='Open context menu' customStyles={triggerStyles}/>
                    <MenuOptions>
                        <MenuOption
                            text='Context Menu'
                            onSelect={() => this.setState({renderer: ContextMenu})}
                        />
                        <MenuOption
                            text='Slide-in Menu'
                            onSelect={() => this.setState({renderer: SlideInMenu})}
                        />
                        <MenuOption
                            text='Popover'
                            onSelect={() => this.setState({renderer: Popover})}
                        />
                        <MenuOption
                            text='Three (custom)'
                            onSelect={() => alert('Selected custom styled option')}
                        />
                        <MenuOption disabled={true}>
                            <Text style={{color: '#ccc'}}>Four (disabled)</Text>
                        </MenuOption>
                    </MenuOptions>
                </Menu>
            </View>
        </MenuProvider>      
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    backgroundColor: '#F8F8F8',
  },
  separator: {
    height: 1,
    backgroundColor: '#DDDDDD'
  },
  image: {
    width: 400,
    height: 300
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 5,
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    margin: 5,
    color: '#656565'
  },
  description: {
    fontSize: 18,
    margin: 5,
    color: '#656565'
  },
  container: {
    flexDirection: 'column',
    padding: 30,
  },
  backdrop: {
    backgroundColor: 'red',
    opacity: 0.5,
  },
  anchorStyle: {
    backgroundColor: 'blue',
  },
});

const menuProviderStyles = {
    menuProviderWrapper: styles.container,
    backdrop: styles.backdrop,
};
  
const triggerStyles = {
    triggerText: {
      color: 'white',
    },
    triggerOuterWrapper: {
      backgroundColor: 'orange',
      padding: 0,
      flex: 1,
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
  