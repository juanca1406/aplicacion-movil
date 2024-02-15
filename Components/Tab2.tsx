// Tab2.js
import React, { useContext } from 'react';
import { View, Text, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CameraContext from '../Context/CameraContext';

export default function Tab2() {
    const navigation = useNavigation();
    const { image } = useContext(CameraContext);

    const openCamera = () => {
        //@ts-ignore    
        navigation.navigate('Camara');
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Tab2</Text>
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            <Button title="Tomar foto" onPress={openCamera} />
        </View>
    );
}
