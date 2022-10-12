import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Pressable, Button} from 'react-native';
import GlobalStyle from '../utils/GlobalStyle';
import {AsyncStorage} from '@react-native-async-storage/async-storage';
import CustomButton from '../utils/CustomButton';
import SQLite from 'react-native-sqlite-storage';
import {useSelector, useDispatch} from 'react-redux';
import {setName, setAge, get_cities} from '../redux/action';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';

const db = SQLite.openDatabase(
  {
    name: 'MainDB',
    location: 'default',
  },
  () => {},
  error => {
    console.log(error, 'shahid');
  },
);

export default function HomeScreen({navigation}) {
  const {name, age, cities} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  // const [name, setName] = useState('');
  // const [age,setAge] = useState('');

  useEffect(() => {
    retriveData();
    dispatch(get_cities());
  }, []);

  const retriveData = () => {
    try {
      db.transaction(tx => {
        tx.executeSql('SELECT Name, Age FROM Users', [], (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            var userName = results.rows.item(0).Name;
            var userAge = results.rows.item(0).Age;
            dispatch(setName(userName));
            dispatch(setAge(userAge));
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.body}>
      <Text style={GlobalStyle.CustomFonts}> Data From API </Text>

      <FlatList
        data={cities}
        renderItem={({item}) => (
          <TouchableOpacity>
          <View style={styles.itemlist}>
            <Text style={GlobalStyle.CustomFonts}>{item.country}</Text>
            <Text style={GlobalStyle.CustomFontsSubtitle}>{item.city}</Text>
          </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />


      {/* <Text style={GlobalStyle.CustomFonts}>Welcome {age} </Text> */}

      {/* <CustomButton
        title="Update"
        onPressFunction{}
      /> */}
    </View>
  );
}
const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemlist: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#cccccc',
    borderRadius: 5,
    margin: 7,
    width: 350,
    justifyContent: 'center',
    alignItems: 'center',
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
