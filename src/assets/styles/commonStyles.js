import { StyleSheet, Platform } from "react-native";
import { wp, hp } from "@utils/common";

const commonStyles = StyleSheet.create({
    _center: {
        justifyContent: "center",
        alignItems: "center",
    },
    _authBrandingContainer : {
        width : wp(100),
        height : hp(34.5),
        paddingTop: Platform.OS === 'ios' ? hp(6.2) : hp(5.5),
        justifyContent:'space-between',
        alignItems:'center'
    },
    _rowContainer : {
        flexDirection :"row",
        justifyContent: "center",
        alignItems: "center",
    }
})

export {
    commonStyles
}