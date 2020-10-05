import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {addition,subtraction,  firstName,lastName,Email,password,confirmPassword} from './Store/Actions'

const Counter = (props) => {
    const data = useSelector(state => state.counter);
    const data1 = useSelector(state => state.firstName);
    //const {counter} = data;
    const dispatch = useDispatch();


    return (
        <View style={style.container}>
            <Button title='Add' onPress={() => dispatch(addition())}/>
            <Text>{data} </Text>
            <Text>{data1} </Text>
            <Button title="Subtract"  onPress={() => dispatch(subtraction())} />
            
        </View>
    );
}

export default Counter;

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
