import React, { useState } from "react";
import { Platform, Button, StyleSheet, View, Text } from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import Gallery from "./Gallery";

export default function Tab1() {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

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
      <Text>Fecha seleccionada: {date.toLocaleDateString()}</Text>
      <Gallery />
      <View>
        <Button title="Tomar foto" onPress={openCamera} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
