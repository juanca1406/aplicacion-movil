import React, { useContext } from "react";
import { View, Text, Image, Button, StyleSheet, SafeAreaView, SectionList } from "react-native";

const DATA = [
  {
    data: ['Primero', 'Segundo', 'Tercero'],
  },
]

export default function Tab2() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Registro del comparendo</Text>

      <SafeAreaView style={styles.container}>
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (

            <Text style={styles.text}>{item}</Text>
          )}

        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    fontStyle: 'italic',
    margin: 20,
    borderColor: 'gray',
    borderWidth: 1,
    height: 100,
    width: 100,
  },

})
