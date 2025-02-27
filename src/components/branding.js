import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { FONTS, COLORS } from '@utils/common';
import { commonStyles } from '@styles/commonStyles';

const Branding = props => {
    const { size } = props
    return (
        <View style={styles(props).view}>
            <Image
                source={require('@images/logo.png')}
                style={[styles(props).image, props.style]}
            />
            <Text style={[styles(props).text, props.textStyle]}>{`PROGRAMMERS\nQUIZ`}</Text>
        </View>
    );
};

Branding.defaultProps = {
    size: 106
}

export default Branding;

const styles = (props) => StyleSheet.create({
    view: {
        // position: 'absolute',
        ...commonStyles._center,
    },
    image: {
        width: props.size,
        height: props.size * 1.094,
        resizeMode: 'contain',
    },
    text: {
        fontFamily: FONTS.Ubuntu_700,
        color: COLORS._063861,
        fontSize: props.size * 0.15,
        textAlign: 'center',
        marginTop : props.size * 0.017
    }
});