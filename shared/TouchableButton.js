import React from "react";
import { Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

function TouchableButton({ btnStyleType, btnFunction,
    icon = false, txt = false, txtStyleType = '', name = '',
    type = '', size = 0, color = '', txtValue = '' }) {
    return (
        <TouchableOpacity style={btnStyleType} onPress={btnFunction}>
            {txt ? <Text
                style={[txtStyleType, { textAlign: "center", fontSize: 16 ,color :'grey'}]}>
                {txtValue}</Text> : null}
            {icon ? <Icon name={name} type={type} size={size} color={color} /> : null}

        </TouchableOpacity>
    )
}

export default TouchableButton