import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Pressable, Button} from 'react-native';
import GlobalStyle from '../utils/GlobalStyle';
import {AsyncStorage} from '@react-native-async-storage/async-storage';
import CustomButton from '../utils/CustomButton';
import SQLite from 'react-native-sqlite-storage';
import {useSelector, useDispatch} from 'react-redux';
import {setName, setAge} from '../redux/action';

const db = SQLite.openDatabase(
  {
      name: 'MainDB',
      location: 'default',
  },
  () => { },
  error => { console.log(error,'shahid') }
);

export default function HomeScreen({navigation}) {

  const {name,age} = useSelector(state=>state.userReducer);
  const dispatch = useDispatch();



  // const [name, setName] = useState('');
  // const [age,setAge] = useState('');

  useEffect(() => {
    retriveData();
  }, []);

  const retriveData = () => {
    try {
       
        db.transaction((tx) => {
            tx.executeSql(
                "SELECT Name, Age FROM Users",
                [],
                (tx, results) => {
                    var len = results.rows.length;
                    if (len > 0) {
                        var userName = results.rows.item(0).Name;
                        var userAge = results.rows.item(0).Age;
                        dispatch( setName(userName));
                       dispatch( setAge(userAge));
                    }
                }
            )
        })
    } catch (error) {
        console.log(error);
    }
}

  return (
    <View style={styles.body}>
      <Text style={GlobalStyle.CustomFonts}>Welcome {name} </Text>
      <Text style={GlobalStyle.CustomFonts}>Welcome {age} </Text>
      <CustomButton
        title="Update"
        // onPressFunction{}
      />
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
    margin: 10,
    fontSize: 30,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#00ff00',
  },
  button: {
    backgroundColor: '#00ff',
    borderColor: '#00ff00',
    borderRadius: 10,
  },
});
