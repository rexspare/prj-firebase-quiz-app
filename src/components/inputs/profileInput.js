import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { COLORS, hp, wp } from '@utils/common'
import { commonStyles } from '@styles/commonStyles'
import {Label} from "@components"
import { FONTS } from '../../utils/common'

const ProfileInput = (props) => {
  return (
    <View style={[styles.main, props.style]}>
      <Label style={styles.title}>{props.title}</Label>
      <TextInput 
      style={[styles.input, props.inputStyles]}
    //   placeholder="PlaceHolder"
      value={props.value && props.value}
      onChangeText={props.onChange}
      editable={props.editable}
      keyboardType={props.keyboardType}
      />
    </View>
  )
}

ProfileInput.defaultProps = {
    title : "title",
    onChange : () => {},
    editable : true
}

const styles = StyleSheet.create({
    main: {
        width:'90%',
        alignSelf:'center',
        paddingHorizontal : '4%',
        // paddingTop: 3,
        borderWidth : 1,
        borderColor :COLORS._E0E0E0,
        borderRadius : 8,
        backgroundColor : COLORS._FFFFFF,
        alignItems:'flex-start',
        marginBottom: hp(1.7)
    },
    title : {
        fontSize: 10,
        color: COLORS._DDDDDD,
        bottom : -7
    },
    input : {
        // borderWidth:2,
        width: '100%',
        height : hp(4.5),
        paddingLeft:0,
        fontFamily: FONTS.Poppins_400,
        color : COLORS._7C7C7C,
        paddingTop:0,
        paddingBottom:0,
        fontSize: 12
    }

    
})

export default ProfileInput

