import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import styles from './styles'
import CurveHeader from '../../components/curveheader'
import { COLORS, height, width } from '../../utils/common'

const PrivacyPolicy = (props) => {
  return (
    <View style={styles.main}>
      <CurveHeader
        title={"Privacy Policy"}
        onLeftPress={() => props.navigation.goBack()}
      />
     <ScrollView>
     <View style={{width: width * 0.9, alignSelf: 'center', marginVertical: height*0.03}}>
      <Text style={{color: COLORS._000000}}>
        We at Wasai LLC respect the privacy of your personal information and, as such,
        make every effort to ensure your information is protected and remains private.
        As the owner and operator of loremipsum.io (the "Website") hereafter referred
        to in this Privacy Policy as "Lorem Ipsum", "us", "our" or "we", we have provided
        this Privacy Policy to explain how we collect, use, share and protect information
        about the users of our Website (hereafter referred to as “user”, “you” or "your").
        For the purposes of this Agreement, any use of the terms "Lorem Ipsum", "us", "our"
        or "we" includes Wasai LLC, without limitation. We will not use or share your personal
        information with anyone except as described in this Privacy Policy.
      </Text>
      <Text style={{color: COLORS._000000}}>
        This Privacy Policy will inform you about the types of personal data we collect, the
        purposes for which we use the data, the ways in which the data is handled and your
        rights with regard to your personal data. Furthermore, this Privacy Policy is intended
        to satisfy the obligation of transparency under the EU General Data Protection Regulation
        2016/679 ("GDPR") and the laws implementing GDPR.
      </Text>
      <Text style={{color: COLORS._000000}}>
        For the purpose of this Privacy Policy the Data Controller of personal data is Wasai LLC
        and our contact details are set out in the Contact section at the end of this Privacy Policy.
        Data Controller means the natural or legal person who (either alone or jointly or in common
        with other persons) determines the purposes for which and the manner in which any personal
        information are, or are to be, processed.
      </Text>
      <Text style={{color: COLORS._000000}}>
        For purposes of this Privacy Policy, "Your Information" or "Personal Data" means information
        about you, which may be of a confidential or sensitive nature and may include personally
        identifiable information ("PII") and/or financial information. PII means individually
        identifiable information that would allow us to determine the actual identity of a specific
        living person, while sensitive data may include information, comments, content and other
        information that you voluntarily provide.
      </Text>
      <Text style={{color: COLORS._000000}}>
        Lorem Ipsum collects information about you when you use our Website to access our services,
        and other online products and services (collectively, the “Services”) and through other
        interactions and communications you have with us. The term Services includes, collectively,
        various applications, websites, widgets, email notifications and other mediums, or portions
        of such mediums, through which you have accessed this Privacy Policy.
      </Text>
      <Text style={{color: COLORS._000000}}>
        We may change this Privacy Policy from time to time. If we decide to change this Privacy Policy,
        we will inform you by posting the revised Privacy Policy on the Site. Those changes will go into
        effect on the "Last updated" date shown at the end of this Privacy Policy. By continuing to use
        the Site or Services, you consent to the revised Privacy Policy. We encourage you to periodically
        review the Privacy Policy for the latest information on our privacy practices.
      </Text>
      </View>
     </ScrollView>
    </View>
  )
}

export default PrivacyPolicy