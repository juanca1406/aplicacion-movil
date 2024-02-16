import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  Button,
  View,
  Image,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

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
      setImages((prevImages) => [
        ...prevImages,
        ...result.assets.map((asset) => asset.uri),
      ]);
    }
  };

  const handleImagePress = (uri) => {
    setSelectedImage(uri);
    setModalVisible(true);
  };

  const openCamera = () => {
    navigation.navigate("Camara");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleImagePress(item)}>
            <View style={styles.img}>
              <Image
                source={{ uri: item }}
                style={{ width: 100, height: 100 }}
              />
            </View>
          </TouchableOpacity>
        )}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          isLoading ? (
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Loading...
              </Text>
              <ActivityIndicator size={"large"} />
            </View>
          ) : (
            <View style={styles.button}>
              <Button title="Seleccionar imagen" onPress={pickImages} />
              <Button title="Tomar foto" onPress={openCamera} />
            </View>
          )
        }
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalImageContainer}>
            <Image
              source={{ uri: selectedImage }}
              style={{ width: "100%", height: "100%" }}
              resizeMode="contain"
            />
          </View>
          <Button title="Cerrar" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  img: {
    paddingTop: 10,
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalImageContainer: {
    width: "80%",
    height: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
  },
});
