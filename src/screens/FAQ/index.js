import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import styles from './styles'
import CurveHeader from '../../components/curveheader';
import {AccordionList} from "accordion-collapse-react-native";
import { useState } from 'react';
import { height, width } from '../../utils/common';

const FAQ = (props) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [list, setList] = useState([
    {
      id:1,
      title: 'Customer services',
      body: 'The first stage for researching your FAQ starts with your customer-facing services and sales teams. Speak to your customer service departments; they understand what issues your users are having more than anyone.'
    },
    {
      id:2,
      title: 'Site search',
      body: 'Check the keywords in your site search to see what users are searching for.'
    },
    {
      id:3,
      title: 'Google search console',
      body: 'Check queries in GSC to see what phrases have clicks. Filter by question modifiers such as \‘how\’ or \‘can.\’'
    },
    {
      id:4,
      title: 'People Also Ask',
      body: 'Check the PAA box on SERPs for keywords surrounding your products and categories — this will give you strong clues for potential FAQs.'
    },
   
    {
      id:5,
      title: 'Quora and other questions sites',
      body: 'Check the PAA box on SERPs for keywords surrounding your products and categories — this will give you strong clues for potential FAQs.'
    },
    {
      id:6,
      title: 'Keyword research',
      body: 'Check the PAA box on SERPs for keywords surrounding your products and categories — this will give you strong clues for potential FAQs.'
    },
    {
      id:7,
      title: 'Quora and other questions sites',
      body: 'Check the PAA box on SERPs for keywords surrounding your products and categories — this will give you strong clues for potential FAQs.'
    },
    {
      id:8,
      title: 'Keyword research',
      body: 'Check the PAA box on SERPs for keywords surrounding your products and categories — this will give you strong clues for potential FAQs.'
    },
    {
      id:9,
      title: 'People Also Ask',
      body: 'Check the PAA box on SERPs for keywords surrounding your products and categories — this will give you strong clues for potential FAQs.'
    },
    {
      id:10,
      title: 'Quora and other questions sites',
      body: 'Check the PAA box on SERPs for keywords surrounding your products and categories — this will give you strong clues for potential FAQs.'
    },
    {
      id:11,
      title: 'Keyword research',
      body: 'Check the PAA box on SERPs for keywords surrounding your products and categories — this will give you strong clues for potential FAQs.'
    },
    {
      id:12,
      title: 'People Also Ask',
      body: 'Check the PAA box on SERPs for keywords surrounding your products and categories — this will give you strong clues for potential FAQs.'
    },
    {
      id:13,
      title: 'Quora and other questions sites',
      body: 'Check the PAA box on SERPs for keywords surrounding your products and categories — this will give you strong clues for potential FAQs.'
    },
    {
      id:14,
      title: 'Keyword research',
      body: 'Check the PAA box on SERPs for keywords surrounding your products and categories — this will give you strong clues for potential FAQs.'
    },
    {
      id:15,
      title: 'People Also Ask',
      body: 'Check the PAA box on SERPs for keywords surrounding your products and categories — this will give you strong clues for potential FAQs.'
    },
    {
      id:16,
      title: 'Quora and other questions sites',
      body: 'Check the PAA box on SERPs for keywords surrounding your products and categories — this will give you strong clues for potential FAQs.'
    },
    {
      id:17,
      title: 'Keyword research',
      body: 'Check the PAA box on SERPs for keywords surrounding your products and categories — this will give you strong clues for potential FAQs.'
    },
    {
        id:18,
        title: 'People Also Ask',
        body: 'Check the PAA box on SERPs for keywords surrounding your products and categories — this will give you strong clues for potential FAQs.'
      },
    {
        id:19,
        title: 'People Also Ask',
        body: 'Check the PAA box on SERPs for keywords surrounding your products and categories — this will give you strong clues for potential FAQs.'
      },
    ],)

    const _head = (item) => {
        console.log("helloo", isExpanded, item.id)
      return(
          <View>
            <Text style={{color: 'blue', fontWeight: 'bold', marginBottom: 20}}>{item.title}</Text>
          </View>
      );
    }

    const _body = (item) => {
        return (
            <View>
              <Text style={{color: '#000', marginBottom: 10}}>{item.body}</Text>
            </View>
        );
    } 

  return (
    <View style={styles.main}>
      <CurveHeader
        title={"FAQ"}
        onLeftPress={() => props.navigation.goBack()}
      />
    <View style={{marginHorizontal: width*0.05, marginTop: height*0.05, backgroundColor: '#FFF', padding: 20, marginBottom: height*0.08}}>
      <AccordionList
        list={list}
        header={_head}
        body={_body}
        keyExtractor={item => `${item.id}`}
        onToggle={() => setIsExpanded(!isExpanded)}
      />
    </View>
    </View>
  )
}

export default FAQ