import { View, Text, Modal, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import Label from '../label'
import { COLORS, hp } from '@utils/common'

const GenderPicker = (props) => {

  const genders = [
    { id: 1, name: 'Male' },
    { id: 2, name: 'Female' },
    { id: 3, name: 'Other' },
  ]

  return (
    <Modal
      visible={props.isVisible}
      transparent
      onRequestClose={() => props.onclose()}
      animationType="fade"
    >
      <TouchableOpacity
        style={{
          backgroundColor: 'rgba(0,0,0,0.4)',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
        activeOpacity={0.8}
        onPress={() => props.onclose()}
      >
        <View style={{
          width: '70%',
          maxHeight: 200
        }}>
          <ScrollView>
            {
              genders.map((gender, index) => (
                <TouchableOpacity 
                key={index}
                activeOpacity={0.8}
                  style={{
                    backgroundColor: COLORS._FFFFFF,
                    padding: 12,
                    borderBottomWidth: index != genders.length - 1 ? 1 : 0,
                    borderColor: COLORS._000000,
                    borderRadius:5
                  }}
                  onPress={() => {props.onselect(gender.name); props.onclose()}}
                >
                  <Label style={{ textAlign: 'left', color: COLORS._000000, fontSize: hp(2) }}>{gender.name}</Label>
                </TouchableOpacity>
              ))
            }
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  )
}

export default GenderPicker