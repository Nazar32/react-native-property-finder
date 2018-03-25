'use strict';

import {
  StackNavigator,
} from 'react-navigation';
import SearchPage from './SearchPage';
import SearchResults from './SearchResults';
import PropertyView from './PropertyView';
import OptionsPage from './OptionsPage';

const App = StackNavigator({
  Home: { screen: SearchPage },
  Options: { screen: OptionsPage, },
  Results: { screen: SearchResults },
  Property: { screen: PropertyView},
});
export default App;
