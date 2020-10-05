import React, { useState } from 'react';
import { View, Text, Button, TextInput, AsyncStorage } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { signIn,signUp } from '../Store/Actions';





function SignInorSignUp({ navigation }) {

    return (

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {/*<Counter />*/}
            <Button title="Sign In" onPress={() => { navigation.push('SignIn')/*, this.saveData()*/ }} />
            <Button title="sign Up" onPress={() => { navigation.push('SignUp')/*navigation.push('SignUp'), this.saveData()*/ }} />
        </View>

    );
}

/*function signUp({ navigation }) {
  return (
 
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Counter />
    </View>
 
  );
}*/

let userName/*,fName */ = null;
let InputFields = [];
function Test({ navigation }) {
    const data = useSelector(state => state);

    const SaveInfo = async (type, data) => {
        try {
            await AsyncStorage.setItem(type, data);
            //userName = await AsyncStorage.getItem(name);
        } catch (error) {
            // Error retrieving data
            console.log(error.message);
        }
    };
    const [getFName, setFName] = useState('');
    const [getLName, setLName] = useState('');
    const [getEmail, setEmail] = useState('');
    const [getPassword, setPassword] = useState('');
    const [getConfirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();

    const signUpUser = () => {
        let user = { fName: getFName, lName: getLName, email: getEmail, password: getPassword, confirmPassword: getConfirmPassword }
        dispatch(signUp(user));
    }


    if (!InputFields.length < 1) {

        (async () => {
            userName = await AsyncStorage.getItem("lastName");
        })();
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <TextInput placeholder={"First Name"} onChangeText={text => { dispatch(firstName(text)), userName = text, (async () => { await SaveInfo("firstName", text); })(); }} />
                <TextInput placeholder="Last Name" onChangeText={text => { dispatch(lastName(text)), userName = text, (async () => { await SaveInfo("lastName", text); })(); }} />
                <TextInput placeholder="Email" onChangeText={text => { dispatch(Email(text)), userName = text, (async () => { await SaveInfo("Email", text); })(); }} />
                <TextInput placeholder="PassWord" secureTextEntry={true} onChangeText={text => { dispatch(password(text)), userName = text, (async () => { await SaveInfo("password", text); })(); }} />
                <TextInput placeholder="Confirm PassWord" secureTextEntry={true} onChangeText={text => { dispatch(confirmPassword(text)), userName = text, (async () => { await SaveInfo("confirmPassword", text); })(); }} />
                <Text>Name from Asynch: {}</Text>


            </View>
        );
    }
    else {
        (async () => {
            userName = await AsyncStorage.getItem("isLoggedIn");

        })();

        return (


            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {
                    data.error && <Text>There was an error</Text>
                }
                <TextInput placeholder="First Name" onChangeText={text => { setFName(text) }} />
                <TextInput placeholder="Last Name" onChangeText={text => { setLName(text) }} />
                <TextInput placeholder="Email" onChangeText={text => { setEmail(text) }} />
                <TextInput placeholder="PassWord" secureTextEntry={true} onChangeText={text => { setPassword(text) }} />
                <TextInput placeholder="Confirm PassWord" secureTextEntry={true} onChangeText={text => { setConfirmPassword(text) }} />

                <Button disabled={(getFName == "" || getLName == "" || getEmail == "" || getPassword == "" || getConfirmPassword == ""
                    || (getConfirmPassword != "" && getPassword != getConfirmPassword)) ? true : false}
                    title="Confirm" onPress={() => {
                        SaveInfo("firstName", getFName), SaveInfo("lastName", getLName), SaveInfo("Email", getEmail), SaveInfo("password", getPassword), SaveInfo("confirmPassword", getConfirmPassword)
                            , SaveInfo("isLoggedIn", JSON.stringify(true))
                            , true ? signUpUser() : signUpUser()
                        //, register()
                    }} />


                <Text>Name: {getEmail}</Text>
            </View>
        );
    }
}
function SignInScreen() {
    const [getEmail, setEmail] = React.useState('');
    const [getPassword, setPassword] = React.useState('');
    const [getValidate, setValidate] = React.useState(false);
    //const { signIn } = React.useContext(AuthContext);
    const dispatch = useDispatch();
    const signInUser = () => {
        let user = { email: getEmail, password: getPassword }
        dispatch(signIn(user));
    }
    const data = useSelector(state => state);
    const validateUser = () => {
        let user = { email: getEmail, password: getPassword }
        loginValidation(user)
    }

    return (
        <View>

            <TextInput
                placeholder="Email"
                onChangeText={text => { setEmail(text) }}
            />
            <TextInput
                placeholder="Password"
                onChangeText={text => { setPassword(text) }}
                secureTextEntry
            />
            <Button title="Sign in" onPress={() =>/* validateUser() ?*/ signInUser() /*: setValidate(true) signIn({ username, password })*/} />
            {
                (data.error || getValidate) && <Text>There was an error</Text>
            }
        </View>

    );
}


const Stack = createStackNavigator();
export default AuthStack = (data) => {
    return (


        <Stack.Navigator initialRouteName="SignInorSignUp">

            <Stack.Screen name="SignInorSignUp" component={SignInorSignUp} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={Test} />

        </Stack.Navigator>
    )

};



