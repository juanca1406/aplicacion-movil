import React, { useEffect, useState } from 'react';
import { LogBox, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FormControl, Input, Text, Divider, Box, NativeBaseProvider, Center, Image, ScrollView, Stack, Button, Link } from "native-base";
import { useNavigation } from '@react-navigation/native';

function Tab1() {

    useEffect(() => {
        LogBox.ignoreLogs(['In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.']);
    }, []);

    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const onChange = (event: any, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const navigation = useNavigation();

    const OpenCamara = () => {
        //@ts-ignore
        navigation.navigate('Camara');
    };
    return (

        <ScrollView w="100%">
            <Stack space={2.5} alignSelf="center" px="4" safeArea mt="4" w={{
                base: "100%",
                md: "100%"
            }}>
                <Box>
                    <FormControl mb="5">
                        <FormControl.Label>Placa</FormControl.Label>
                        <Input />
                    </FormControl>
                    <Divider />
                    <Button onPress={showDatepicker} >
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
                        <Text>Seleccionar fecha</Text>
                    </Button>
                    <Text >
                        Fecha seleccionada: {date.toLocaleDateString()}
                    </Text>

                    <Image mb={5} source={{ uri: "https://wallpaperaccess.com/full/317501.jpg" }} alt="Alternate Text" size="xl" />
                    <Button onPress={OpenCamara}>
                        <Text>Tomar foto</Text>
                    </Button>
                </Box>
            </Stack>
        </ScrollView>
    );
}

export default () => {
    return (
        <NativeBaseProvider>
            <Center flex={1} px="3">
                <Tab1 />
            </Center>
        </NativeBaseProvider>
    );
};
