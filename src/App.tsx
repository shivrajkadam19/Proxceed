// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Entypo from 'react-native-vector-icons/Entypo';
// import EvilIcons from 'react-native-vector-icons/EvilIcons';
// import Feather from 'react-native-vector-icons/Feather';
// import Fontisto from 'react-native-vector-icons/Fontisto';
// import Foundation from 'react-native-vector-icons/Foundation';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Octicons from 'react-native-vector-icons/Octicons';
// import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
// import Zocial from 'react-native-vector-icons/Zocial';


import React from 'react';
import { AppProvider } from './app/context/ThemeProvider'; // Make sure to adjust the import path
import RootNavigator from './navigation/root-navigator'; // Your RootNavigator

const App: React.FC = () => {
  return (
    <AppProvider>
      <RootNavigator />
    </AppProvider>
  );
};

export default App;
