import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'

function Announment({ text }) {
    return (
        <View style={{
            padding: 20, paddingTop: 75, paddingBottom: 75, margin: 10, borderWidth: 1,
            borderRadius: 10, justifyContent: 'center', alignItems: 'center'
        }}>
            <TouchableOpacity >
                <Text style={{
                    fontWeight: 'bold', color: 'blue',
                    fontSpacing: 4, letterSpacing: 1
                }}>{text}
                </Text>
            </TouchableOpacity>
        </View >
    )
}

export default Announment