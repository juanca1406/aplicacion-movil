import React, { useState, useContext } from "react";
import { Platform, Button, StyleSheet, View, Text, TextInput, Image } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import Gallery from "./Gallery";
import CameraContext from '../Context/CameraContext';

export default function Tab1() {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { image } = useContext(CameraContext);

  const onChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const navigation = useNavigation();

  const openCamera = () => {
    //@ts-ignore
    navigation.navigate("Camara");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{'\n'}Placa</Text>
      <TextInput style={styles.input} placeholder="Ingrese La Placa" />
      <Button title="Seleccionar fecha" onPress={showDatepicker} />
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <Text>{'\n'}</Text>
      <Text style={styles.text}>Fecha seleccionada: {date.toLocaleDateString()}{'\n'}{'\n'}</Text>
      <Text style={styles.text}>Inicio:{'\n'}</Text>
      <View style={styles.gallery}>
        <View style={styles.button}>
          <Button title="Tomar foto" onPress={openCamera} />
        </View>
        <Gallery />
        {image && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 300,
    fontStyle: 'italic',
    fontSize: 16,
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    fontStyle: 'italic',
  },
  gallery: {
    borderColor: 'gray',
    borderWidth: 1,
    height: 200,
    width: '100%',
    margin: 12,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  button: {
    width: 200,
    height: 100
  }
});
