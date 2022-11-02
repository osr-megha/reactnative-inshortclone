import React, { useContext } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Context, { NewsContext } from './API/Context';
import InshortsTabs from './components/InshortsTabs';

const App = () => {

  const {darkTheme} = useContext(NewsContext);

  return (
    <View style={{...styles.container, backgroundColor: darkTheme ? '#282C35' : 'white'}}>
      <InshortsTabs/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:StatusBar.currentHeight,
  },
});

export default () =>{
  return(
    <React.Fragment>
  <Context>
  <App />
  </Context>
  </React.Fragment>
  );
}
