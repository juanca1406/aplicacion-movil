import React, { useState } from "react";
import { ActivityIndicator, Button, FlatList, Text, View, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function Gallery() {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const pickImages = async () => {
        setIsLoading(true);
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            selectionLimit: 10,
            aspect: [4, 3],
            quality: 1,
        });
        setIsLoading(false);
        console.log(result);
        if (!result.cancelled && result.assets) {
            setImages(prevImages => [...prevImages, ...result.assets.map(asset => asset.uri)]);
        }
    };

    return (
        <FlatList
            data={images}
            renderItem={({ item }) => (
                <Image source={{ uri: item }} style={{ width: 200, height: 200 }} />
            )}
            numColumns={1}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={
                isLoading ? (
                    <View>
                        <Text
                            style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
                        >
                            Loading...
                        </Text>
                        <ActivityIndicator size={"large"} />
                    </View>
                ) : (
                    <Button title="Seleccionar imagen" onPress={pickImages} />
                )
            }
        />
    );
}
