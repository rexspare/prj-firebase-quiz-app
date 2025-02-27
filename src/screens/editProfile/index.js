import { View, TouchableOpacity, Image, ScrollView, Alert, Text, Button, Dimensions } from "react-native";
import React, { useContext, useState } from "react";
import {
  CurveHeader,
  Label,
  ProfileInput,
  GradientButton,
  GenderPicker,
} from "@components";
import styles from "./styles";
import { hp, COLORS, FONTS, wp } from "@utils/common";
import Feather from "react-native-vector-icons/Feather";
import { useSelector } from "react-redux";
import { SCREENS } from "@navigation/routes";
import LinearGradient from "react-native-linear-gradient";
import { AuthContext } from "contexts/authContext";
import CountryPicker from "react-native-country-picker-modal";
import { height } from "../../utils/common";
import ImagePicker from "react-native-image-crop-picker";
import { saveData } from "@services/firebaseServices";
import { uploadImage } from "../../services/firebaseServices";
import { collections } from "@constants/collections";
import { showFlash } from "../../utils/myUtils";
import firestore from "@react-native-firebase/firestore";
import DatePicker from "react-native-date-picker";
import Modal from "react-native-modal";

const EditProfile = (props) => {
  const theme = useSelector((state) => state.themeReducer.theme);
  const { userData, defaultAvatar, getUser } = useContext(AuthContext);
  const [name, setname] = useState(userData?.name || "");
  const [email, setemail] = useState(userData?.email || "");
  const [isEmailValid, setisEmailValid] = useState(true);
  const [dateOfBirth, setdateOfBirth] = useState(userData?.dateOfBirth || "");
  const [occupation, setoccupation] = useState(userData?.occupation || "");
  const [phone, setphone] = useState(userData?.phone || "");
  const [country, setCountry] = useState(userData?.country || "");
  const [gender, setgender] = useState(userData?.gender || "");
  const [imageObject, setimageObject] = useState({});
  const [profileImage, setprofileImage] = useState(
    userData?.profileImage || ""
  );
  const [isGenderModelVisisble, setisGenderModelVisisble] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onSelect = (country) => {
    setCountry(country.name);
  };

  /**
   * Image Picker Functions
   */
  const handlePickImage = () => {
    Alert.alert("Change Image", "Select an Image from", [
      {
        text: "Cancel",
        onPress: () => {},
      },
      {
        text: "Camera",
        onPress: () => {
          openCamera();
        },
      },
      {
        text: "Gallery",
        onPress: () => {
          openGallery();
        },
      },
    ]);
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(async (image) => {
        setimageObject(image);
        setprofileImage(image.path);
      })
      .catch(() => {});
  };

  const openGallery = () => {
    // setModalVisible(false)
    setTimeout(() => {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      })
        .then(async (image) => {
          setimageObject(image);
          setprofileImage(image.path);
        })
        .catch((error) => {console.log("Error", error)});
    }, 500);
  };

  /**
   * Email validation
   */
  const handleEmail = (text) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    setemail(text);
    if (emailRegex.test(text)) {
      setisEmailValid(true);
    } else {
      setisEmailValid(false);
    }
  };

  /**
   * Date Format
   */

  const handleSelectDate = (param) => {
    var date = new Date(param),
      month = "" + (date.getMonth() + 1),
      day = "" + date.getDate(),
      year = date.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    var month = date.getMonth() + 1;
    month = month < 10 ? "0".concat(month) : month;
    setdateOfBirth(month + "/" + day + "/" + year);
  };

  /**
   * Update User Profile
   */
  const updateProfile = async () => {
    if (isEmailValid && email != "" && phone != "" && name != "") {
      setisLoading(true);
      let imageUrl = "";
      if (imageObject?.path) {
        imageUrl = await uploadImage(imageObject.path);
      }
      await saveData(collections.users, userData?.uid, {
        email: email,
        phone: phone,
        lastUpdatedAt: firestore.FieldValue.serverTimestamp(),
        name: name,
        occupation: occupation,
        country: country,
        dateOfBirth: dateOfBirth,
        gender: gender,
        profileImage: imageUrl == "false" ? "" : imageUrl,
      });
      setisLoading(false);
      showFlash("user profile updated Successfully");
      getUser();
      props.navigation.goBack()
    } else {
      showFlash("Enter all the data", "warning");
    }
  };

  return (
    <View style={styles.main}>
      <CurveHeader
        title={"Edit Profile"}
        onLeftPress={() => props.navigation.goBack()}
      />
      {/* CONTEXT */}
      <ScrollView contentContainerStyle={{ paddingBottom: height * 0.2 }}>
        {/* IMAGE AND NAME */}
        <View style={styles.topContainer}>
          <TouchableOpacity onPress={() => handlePickImage()}>
            <Image
              source={{ uri: profileImage || defaultAvatar }}
              style={styles.image}
            />
          </TouchableOpacity>

          <Label
            style={{
              fontSize: hp(2.4),
              fontFamily: FONTS.Poppins_500,
              color: COLORS._7C7C7C,
              marginTop: 5,
            }}
          >
            {name}
          </Label>
          <Label style={{ fontSize: hp(2), color: COLORS._D7D7D7, top: -4 }}>
            @{name}
          </Label>
        </View>
        {/* END */}

        {/* INPUT FIELDS */}

        <ProfileInput
          title="Name"
          value={name}
          onChange={(txt) => setname(txt)}
        />

        <ProfileInput
          title="Email"
          value={email}
          onChange={(txt) => handleEmail(txt)}
          editable={false}
        />

        <TouchableOpacity activeOpacity={1} onPress={() => setOpen(!open)}>
          <ProfileInput
            title="Date of birth"
            value={dateOfBirth}
            onChange={(txt) => setdateOfBirth(txt)}
            editable={false}
          />
          <DatePicker
            modal
            open={open}
            date={date}
            mode="date"
            onConfirm={(date) => {
              setOpen(false);
              setDate(date);
              handleSelectDate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </TouchableOpacity>

        <ProfileInput
          title="Occupation"
          value={occupation}
          onChange={(txt) => setoccupation(txt)}
        />

        <ProfileInput
          title="Phone number"
          value={phone}
          onChange={(txt) => setphone(txt)}
          keyboardType={'phone-pad'}
        />

        <View style={styles.rowContainer}>
          {/* COUNTRY */}
          <View style={styles.itemContainer}>
            <Label style={styles.title}>Country</Label>
            <View style={[styles.rowContainer, { width: "100%" }]}>
              <CountryPicker
                withFilter={true}
                withAlphaFilter={true}
                containerButtonStyle={[styles.values]}
                placeholder={country ? country : "Select Country"}
                style={{ color: "#838383" }}
                value={country}
                onSelect={(val) => {
                  console.log("Country", val.name);
                  onSelect(val);
                }}
              />
              <Feather name="chevron-down" color={COLORS._C2C2C2} size={17} />
            </View>
          </View>
          {/* GENDER */}
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => setisGenderModelVisisble(true)}
          >
            <Label style={styles.title}>Gender</Label>
            <View style={[styles.rowContainer, { width: "100%" }]}>
              <Label style={styles.value}>{gender || "pick gender"}</Label>
              <Feather name="chevron-down" color={COLORS._C2C2C2} size={17} />
            </View>
          </TouchableOpacity>
        </View>

        {/* END */}
      </ScrollView>
      {/* BUTTON */}
      <LinearGradient
        colors={["rgba(0,0,0,0)", "#FFFFFF", "#FFFFFF", "#FFFFFF"]}
        style={styles.absoluteBtn}
      >
        <GradientButton
          style={{ borderRadius: 100, width: wp(70) }}
          textStyles={{ color: COLORS._FFFFFF, fontFamily: FONTS.Poppins_500 }}
          title="Submit"
          onpress={() => updateProfile()}
          isLoading={isLoading}
        />
      </LinearGradient>

      <GenderPicker
        isVisible={isGenderModelVisisble}
        onclose={() => setisGenderModelVisisble(false)}
        onselect={(gender) => setgender(gender)}
      />
       <Modal isVisible={isModalVisible}>
        <View style={{ flex: 0.3, backgroundColor: '#fff', borderRadius: 10, width: Dimensions.get('window').width*0.7, alignSelf: "center", justifyContent: "center" }}>
         
         <View style={{alignItems: "center", borderBottomWidth: 0.5, paddingBottom: 20}}>
          <Text style={{fontWeight: "bold", fontSize: 16,}}>Select Image</Text>
          <Text>Select an Image from</Text>
         </View>
         <View style={{borderBottomWidth:0.5, paddingBottom: 10}}>
         <Button title="Cancel" onPress={toggleModal} />
         </View>
         <View style={{borderBottomWidth:0.5, paddingBottom: 10}}>
          <Button title="Camera" onPress={() => openCamera()} />
        </View>
          <Button title="Gallery" onPress={() => openGallery()} />

        </View>
      </Modal>
    </View>
  );
};

export default EditProfile;
