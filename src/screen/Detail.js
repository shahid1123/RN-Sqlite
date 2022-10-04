import React from "react";
import { View ,Text,StyleSheet,Pressable
} from "react-native";
import GlobalStyle from "../utils/GlobalStyle";




 export default    function DetailScreen({navigation,route}) {
  const {ItemName , ItemId} = route.params;

    const OnpressHandler = () => {
      // navigation.navigate('Home');
      navigation.goBack();
    };
    return (
      <View style={styles.body}>
        <Text style={styles.text}>Welcome to DetailScreen</Text>
        <Pressable
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
          android_ripple={{color: '#00ff00'}}
          onPress={OnpressHandler}
          style={({pressed}) => ({backgroundColor: pressed ? '#ddd' : '#00ff'})}>
          <Text style={GlobalStyle.ButtonText}>Go To HomeScreen</Text>
          
        </Pressable>
        <Text>Data From Home  {ItemName}</Text>
          <Text>Id  from Homee {ItemId}</Text>
      </View>
    );
  }

  const styles = StyleSheet.create({
    body: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      margin:10,
      fontSize: 30,
      fontFamily:'OpenSans-Italic-VariableFont_wdth,wght',
      
      textAlign: 'center',
      color: '#00ff00',
    },
  });