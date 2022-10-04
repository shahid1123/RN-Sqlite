import React from 'react';
import {View, Pressable, Text, Button, StyleSheet} from 'react-native';

const CustomButton = props => {
  return (
    <Pressable
      onPress={props.onPressFunction}
      hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
      android_ripple={{color: '#00f'}}
      style={({pressed}) => [
        {backgroundColor: pressed ? '#dddd' : '#00ff00'},
        styles.button,
        { ...props.style }
      ]}>
      <Text style={styles.text}>{props.title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width:200,
    alignItems: 'center',
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  text: {
   
    
    fontStyle: 'italic',
    marginTop: 10,
    fontSize: 18,
    fontFamily:'JetBrainsMono-VariableFont_wght',
    color: "#fff",
    
    alignSelf: "center",
    textTransform: "uppercase"
  },
});

export default CustomButton;
