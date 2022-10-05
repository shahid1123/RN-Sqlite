import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, Text, TextInput, Alert} from 'react-native';
import GlobalStyle from '../utils/GlobalStyle';
import CustomButton from '../utils/CustomButton';
import {AsyncStorage} from '@react-native-async-storage/async-storage';
import SQLite from 'react-native-sqlite-storage';

import {useSelector, useDispatch} from 'react-redux';
import {setName, setAge} from '../redux/action';

const db = SQLite.openDatabase(
  {
    name: 'MainDB',
    location: 'default',
  },
  () => {},
  error => {
    console.log(error, 'osama inside ftn open database');
  },
);

export default function login(navigation) {


  const { name, age } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();


  // const [name, SetName] = useState('');
  // const [age, setAge] = useState('');

  useEffect(() => {
    createTable();
    getData();
  }, []);

  const createTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS ' +
          'Users' +
          '(ID INTEGER PRIMARY KEY AUTOINCREMENT,user_name TEXT, user_age INTEGER);',
      );
    });
  };

  const getData = () => {
    try {
      db.transaction(tx => {
        tx.executeSql('SELECT Name, Age FROM Users', [], (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            navigation.navigate('Home');
          }
        });
      });
    } catch (error) {
      console.log(error, 'shahid inside get data function');
    }
  };

  const storeData = async () => {
    if (name.length == 0 || age.length == 0) {
      Alert.alert('Warning!', 'Please write your data.');
    } else {
      try {
        dispatch(setName(name));
        dispatch(setAge(age));
        await db.transaction(async tx => {
          // await tx.executeSql(
          //     "INSERT INTO Users (Name, Age) VALUES ('" + name + "'," + age + ")"
          // );
          await tx.executeSql(
            'INSERT INTO Users (user_name, user_age) VALUES (?,?)',
            [name, age],
          );
        });
        navigation.navigate('Home');
      } catch (error) {
        console.log(error, 'ouneeb inside store data');
      }
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Image
        resizeMode="center"
        styles={styles.logo}
        source={require('../../assets/react.png')}
      />
      <Text style={GlobalStyle.CustomFonts}>Login Form</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Name here"
        onChangeText={value => dispatch(setName(value))}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Age here"
        onChangeText={value => dispatch(setAge(value))}
      />

      <CustomButton title="Login" onPressFunction={storeData} />
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',

    backgroundColor: '#00ff',
  },

  logo: {
    width: 100,
    height: 50,
    margin: 10,
  },
  input: {
    width: 300,
    borderWidth: 2,
    fontSize: 20,

    marginBottom: 10,
    textAlign: 'center',
    backgroundColor: '#dddddddd',
    borderColor: '#00ff00',
    borderRadius: 10,
  },
});
