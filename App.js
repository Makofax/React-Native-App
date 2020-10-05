/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import Counter from './src/Counter';
import { View, Text, Button, AsyncStorage, TextInput, StyleSheet } from 'react-native';
import { store } from './src/Store/Store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { firstName, lastName, Email, password, confirmPassword, signUp, signIn , verifyToken} from './src/Store/Actions';
import AuthStack  from './src/Navigation/AuthStack'
import moment from 'moment';

const AuthContext = React.createContext();
//const { registerValidation, loginValidation } = require('./src/validation');

function SplashScreen({ navigation }) {
  const [getToken, setToken] = useState('');
  const data = useSelector(state => state);

  (async () => {
      setToken(await AsyncStorage.getItem("auth-token"));
      console.log(getToken, "brash");
  })();

  const dispatch = useDispatch();

  if (getToken) {
      let user = { token: getToken }
      dispatch(verifyToken(user));
  }

  return (
      <View>
          <Text>Loading...</Text>
      </View>
  );
}
function HomeScreen({ navigation }) {

  let fName = "";

  moment.locale('en');
  var now = moment(1316116057189).fromNow();
  const [getEmail, setEmail] = useState('');
  function clearAllData() {
      AsyncStorage.getAllKeys()
          .then(keys => AsyncStorage.multiRemove(keys))
          .then(() => alert('success'));
  }
  const deleteUser = async () => {
      await AsyncStorage.removeItem('firstName');
      await AsyncStorage.removeItem('lastName');
      await AsyncStorage.removeItem('Email');
      await AsyncStorage.removeItem('password');
      await AsyncStorage.removeItem('confirmPassword');

  };

  const GetInfo = async () => {
      try {
          setEmail(await AsyncStorage.getItem('Email'))


          //userName = await AsyncStorage.getItem(name);
      } catch (error) {
          // Error retrieving data
          console.log(error.message);
      }
  };
  const SaveInfo = async (type, data) => {
      try {
          await AsyncStorage.setItem(type, data);
          fName = await AsyncStorage.getItem("isLoggedIn");
          console.log(fName);
          //userName = await AsyncStorage.getItem(name);
      } catch (error) {
          // Error retrieving data
          console.log(error.message);
      }
  };
  const { signOut } = React.useContext(AuthContext);
  const { deleteAccount } = React.useContext(AuthContext);

  return (

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          {/*<Counter />*/}
          <Text>{GetInfo(), getEmail}</Text>
          <Button title="Sign Out" onPress={() => { signOut(), console.log(now);/*, console.log(fName), this.saveData()*/ }} />
          <Button title="Delete Account" onPress={() => { deleteAccount(), SaveInfo("isLoggedIn", JSON.stringify(false)), deleteUser()/*, console.log(fName), this.saveData()*/ }} />
      </View>

  );
};





const Stack = createStackNavigator();

const App = () => {
  
  const [getToken, setToken] = useState('');
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'REGISTERED':
          return {
            ...prevState,
            isSignout: false,
            isRegistered: true,
            userToken: action.token,
          };
        case 'DELETEACCOUNT':
          return {
            ...prevState,
            isLoading: false,
            isSignout: true,
            userToken: null,
            isRegistered: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      isRegistered: false,
      isRegistering: false,
      userToken: null,
    }
  );
  let userToken;
  /*React.useEffect(() => {
    const bootstrapAsync = async () => {
      

      try {
        userToken = await AsyncStorage.getItem('userToken');
        setToken(await AsyncStorage.getItem('userToken'));
        console.log(getToken, "something");
      } catch (e) {
        console.log(e);
      }

      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
      if (userToken != '') {
        dispatch({ type: 'REGISTERED' })
      }
    };

    bootstrapAsync();
  }, []);*/

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      register: () => dispatch({ type: 'REGISTERED' }),
      deleteAccount: () => dispatch({ type: 'DELETEACCOUNT' }),
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async data => {

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );
  const data = useSelector(state => state);

  return (

    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        
          {data.isLoading ? (
            <Stack.Navigator>
            <Stack.Screen name="Splash" component={SplashScreen} />
            </Stack.Navigator>
            //
           
            
            
          ) : data.id ?
                (
                  <Stack.Navigator>
                  <Stack.Screen name="Home" component={HomeScreen} />
                  </Stack.Navigator>

                ) : (
                  <AuthStack data={data}/>
                )}


        
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({

  textInput: {
    height: 40,
    width: 200,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    borderColor: 'gray',
    borderWidth: 1,

  },

});

export default App;