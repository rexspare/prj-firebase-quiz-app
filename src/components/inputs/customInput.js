import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Platform,
  } from 'react-native';
  import React, {useState} from 'react';
  import {COLORS, FONTS, hp,} from '@utils/common';
  import {commonStyles} from '@assets/styles/commonStyles';
  import {useSelector} from 'react-redux';
  import If from '../if';
  import Feather from 'react-native-vector-icons/Feather';
  
  const CustomInput = props => {
    const theme = useSelector(state => state.themeReducer.theme);
    const lang = useSelector(state => state.langReducer.lang);
  
    const [isSecureTextEntry, setisSecureTextEntry] = useState(true);
    const [isFocus, setisFocus] = useState(false);
    const {Icon, isError} = props;

    return (
      <View style={[Styles.mainContainer, props.styles]}>
        <View
          style={[
            Styles.inputContainer,
            props.containerstyle,
          ]}>
          <If condition={Icon}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={[Styles.iconContainer]}
              onPress={() => props.IconPress()}>
              {Icon}
            </TouchableOpacity>
          </If>
          <TextInput
            style={[
              Styles.inputStyle,
              {
                color: COLORS._333333,
                paddingLeft: Icon ? 0 : 20,
              },
              props?.textStyles,
            ]}
            secureTextEntry={props.isPassword ? isSecureTextEntry : false}
            placeholder={props.placeholder}
            value={props.value && props.value}
            placeholderTextColor={props?.placeholderColor || COLORS._DDDDDD}
            onFocus={() => setisFocus(true)}
            onBlur={() => setisFocus(false)}
            onChangeText={txt => props.onChange(txt)}
            editable={props.editable}
            keyboardType={props.keyboardType}
          />
          <If condition={props.isPassword}>
            <TouchableOpacity
              style={[Styles.iconContainer, {paddingRight: '3%'}]}
              onPress={() => setisSecureTextEntry(!isSecureTextEntry)}>
              {
                props.RightIcon ?
                props.RightIcon 
                :
                <Feather
                name={isSecureTextEntry ? 'eye-off' : 'eye'}
                color={COLORS._DDDDDD}
                size={16}
              />
              }
            </TouchableOpacity>
          </If>
        </View>
      </View>
    );
  };
  
  CustomInput.defaultProps = {
    title: 'title',
    placeholder: 'placeholer',
    onChange: () => {},
    isPassword: false,
    isError: false,
    IconPress: () => {
      console.log('IconPress');
    },
    editable: true,
    keyboardType:"default"
  };
  
  const Styles = StyleSheet.create({
    mainContainer: {
      width: '78%',
      alignSelf: 'center',
      marginTop: 15,
    },
    inputContainer: {
      // minHeight: 40,
      height: hp(5.25),
      maxHeight: 56,
      borderRadius: hp(4),
      flexDirection: 'row',
      backgroundColor : 'white'
    },
    inputStyle: {
      flex: 1,
      // minHeight: 40,
      height: hp(6),
      maxHeight: 55,
      fontFamily: FONTS.Poppins_400,
      fontSize: 12,
      textAlignVertical:'center',
      bottom : Platform.OS === 'ios' ? 2 : 0.5,
      color:'black',
      opacity:1
    },
    iconContainer: {
      width: '15%',
      ...commonStyles._center,
    },
  });
  
  export default CustomInput;
  