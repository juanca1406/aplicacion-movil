import React from 'react';
import { View, Text } from 'react-native';
import Gallery from './Gallery';

export default function Tab2() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Tab2</Text>
            <Gallery />
        </View>
    );
}
