import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Label from './label'
import { hp, COLORS } from '@utils/common'
import { commonStyles } from '@styles/commonStyles'
import { AppContext } from '@contexts/appContext'

const TopicSelector = (props) => {
    const theme = useSelector((state) => state.themeReducer.theme)
    const {allQuizes, selectedTopic, setselectedTopic} = useContext(AppContext)
    const [topics_, settopics_] = useState([])
    
    let Topics = [
        {
            id: 1,
            topic: 'Popular'
        },
        ...allQuizes
    ]

    useEffect(() => {
        let unique = [...new Set(Topics.map(item => item.topic))]
        settopics_(unique)
    }, [allQuizes.length])
    
    return (
        <View style={[styles.main, props.style]}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                {
                    topics_.map((topic, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.item]}
                            activeOpacity={0.8}
                            onPress={() => setselectedTopic(topic)}
                        >
                            <Label font='h4' fontSize={hp(1.8)}
                                style={{ color: selectedTopic == topic ? theme.appColor : COLORS._C2C2C2 }}>
                                {topic}
                            </Label>
                            {selectedTopic == topic &&
                                <View style={[styles.line, { backgroundColor: theme.appColor }]}></View>
                            }
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    main: {
        width: '100%',
        flexDirection: 'row',
        marginBottom:10
    },
    item: {
        paddingHorizontal: 5,
        ...commonStyles._center
    },
    line: {
        width: 20,
        height: 1.5,
        borderRadius: 2
    }
})

export default TopicSelector