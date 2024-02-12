import React, { useEffect, useRef, useState } from 'react';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { View, Text, StyleSheet, Image } from 'react-native';
import Button from './Button'
import { useNavigation } from '@react-navigation/native';

export default function Camara() {
    const navigation = useNavigation();

    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            MediaLibrary.requestPermissionsAsync();
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');
        })();
    }, []);

    const takePicture = async () => {
        if (cameraRef) {
            try {
                const data = await cameraRef.current.takePictureAsync();
                console.log(data);
                setImage(data.uri);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const savePicture = async () => {
        if (image) {
            try {
                const asset = await MediaLibrary.createAssetAsync(image);
                alert('Imagen guardada! 🎉');
                setImage(null);
                console.log('Guardado exitosamente');
                navigation.navigate('Registro');
            } catch (error) {
                console.log(error);
            }
        }
    };

    if (hasCameraPermission === false) {
        return <Text>No acceso a la camara</Text>
    }

    return (
        <View style={styles.container}>
            {!image ?
                <Camera
                    style={styles.camera}
                    type={type}
                    flashMode={flash}
                    ref={cameraRef}
                >
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 30,
                    }}>
                        <Button
                            title=""
                            icon="retweet"
                            onPress={() => {
                                setType(type === CameraType.back ? CameraType.front : CameraType.back);
                            }} />
                        <Button
                            icon="flash"
                            color={flash === Camera.Constants.FlashMode.off ? 'gray' : '#fff'}
                            onPress={() =>
                                setFlash(
                                    flash === Camera.Constants.FlashMode.off
                                        ? Camera.Constants.FlashMode.on
                                        : Camera.Constants.FlashMode.off
                                )
                            }
                        />
                    </View>
                </Camera>
                :
                <Image source={{ uri: image }} style={styles.camera} />
            }
            <View>
                {image ?
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 50,
                    }}>
                        <Button title={'Re-take'} icon="retweet" onPress={() => setImage(null)} />
                        <Button title={'Save'} icon="check" onPress={savePicture} />
                    </View>
                    :
                    <Button title={'Tomar foto'} icon="camera" onPress={takePicture} />
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        paddingBottom: 20,
    },
    camera: {
        flex: 1,
        borderRadius: 20,
    }

})
