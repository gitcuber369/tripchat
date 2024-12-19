import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
} from "react-native";
import { Formik } from "formik";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import Modal from "react-native-modal";
import { WithLocalSvg } from "react-native-svg/css";
import { useToast } from "react-native-toast-notifications";
import * as Location from "expo-location";

import { signupValidationSchema } from "../../utils/validations";
import { RootStackParamList } from "../../utils/types";
import { COLORS, FONTS, SIZES } from "../../utils/constants";
import Button from "../../components/Button";
import Input from "../../components/Input";
import AcceptTermsConditions from "../../components/AcceptTermsConditions";
import { adjustSize } from "../../utils/adjustsize";
import { supabase } from "../../utils/supabase";

type Props = {
  navigation: NativeStackScreenProps<RootStackParamList, "Signup">;
};

export default function Signup({ navigation }: Props) {
  const toast = useToast();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSignUp = async (values: any, resetForm: any) => {
    try {
      // toggleModal();
      setLoading(true);

      // Check if the email already exists
      const { data: existingUsers, error: checkError } = await supabase
        .from("users") // Replace "users" with your actual table name if different
        .select("email")
        .eq("email", values.email);

      if (checkError) {
        throw new Error("Error checking existing users.");
      }

      if (existingUsers && existingUsers.length > 0) {
        toast.show("Email already exists. Please log in instead.", {
          type: "danger",
        });
        return;
      }

      let {
        data: { user, session },
        error: signupError,
      } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });
      delete values.password;
      delete values.check;
      if (signupError) {
        throw signupError;
      }

      const { data, error: insertError } = await supabase.from("users").upsert(
        [
          {
            id: user?.id,
            role: "user",
            // expoPushToken: "",
            ...values,
          },
        ],
        { onConflict: "id", count: "estimated" }
      );

      if (insertError) {
        throw insertError;
      }
      // toast.show("Sign up successful! Please verify your email.", {
      //   type: "success",
      // });
      resetForm();
      setUser(user);
      toggleModal();
    } catch (error: any) {
      console.log(error);
      toast.show(error.message || "Something went wrong!", { type: "danger" });
    } finally {
      setLoading(false);
    }
  };

  const handleAllowLocation = async () => {
    try {
      // Request location permissions
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        toast.show("Permission to access location was denied", {
          type: "danger",
        });
        return;
      }

      // Get the current location
      let location = await Location.getCurrentPositionAsync({});
      // console.log("User's Location Coordinates:", location);

      // Perform reverse geocoding to get city and country
      let [address] = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (address) {
        const city = address.city || address.subregion || "Unknown City";
        const country = address.country || "Unknown Country";

        const { data, error } = await supabase
          .from("users")
          .update({
            location: {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              city,
              country,
            },
          })
          .eq("id", user?.id); // Update based on user ID
      } else {
        toast.show("Could not fetch city and country.", { type: "danger" });
      }

      // Navigate to the next screen
      setModalVisible(false);
      navigation.navigate("Login");
    } catch (error) {
      // console.error("Error accessing location or reverse geocoding:", error);
      toast.show("Failed to access location. Try again later.", {
        type: "danger",
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.logoView}>
          <WithLocalSvg asset={require("../../../assets/svg/star.svg")} />
        </View>
        <Text style={styles.heading}>Create account</Text>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            check: false,
          }}
          validationSchema={signupValidationSchema}
          onSubmit={(values, { resetForm }) => {
            handleSignUp(values, resetForm);
            // toggleModal();
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <>
              <Input
                placeholder="Username"
                autoCapitalize="none"
                label="Username"
                value={values.username}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                error={
                  touched.username && errors.username
                    ? errors.username
                    : undefined
                }
                customStyle={{
                  container: {
                    backgroundColor: COLORS.WHITE,
                    borderWidth: 1,
                    borderColor: COLORS.GRAY_200,
                    borderRadius: 10,
                    height: 56,
                  },
                }}
              />
              <Input
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                label="Email address"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                error={touched.email && errors.email ? errors.email : undefined}
                rightIcon={
                  <Ionicons
                    name="checkmark-circle"
                    size={24}
                    color={COLORS.BLACK}
                  />
                }
                customStyle={{
                  container: {
                    backgroundColor: COLORS.WHITE,
                    borderWidth: 1,
                    borderColor: COLORS.GRAY_200,
                    borderRadius: 10,
                    height: 56,
                  },
                }}
              />
              <Input
                placeholder="Password"
                label="Password"
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                secureTextEntry={!showPassword}
                error={
                  touched.password && errors.password
                    ? errors.password
                    : undefined
                }
                rightIcon={
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    {!showPassword ? (
                      <Feather name="eye-off" size={20} color={COLORS.GRAY} />
                    ) : (
                      <Feather name="eye" size={20} color={COLORS.GRAY} />
                    )}
                  </TouchableOpacity>
                }
                customStyle={{
                  container: {
                    backgroundColor: COLORS.WHITE,
                    borderWidth: 1,
                    borderColor: COLORS.GRAY_200,
                    borderRadius: 10,
                    height: 56,
                  },
                }}
              />
              <AcceptTermsConditions
                txt1="I accept the"
                txt2="terms"
                txt3="privacy policy"
                onCheck={() => setFieldValue("check", !values.check)}
                check={values.check}
              />
              {touched.check && errors.check && (
                <Text style={styles.errorText}>{errors.check}</Text>
              )}
              <Button
                title="Sign up"
                loading={loading}
                onPress={handleSubmit}
                customStyles={{
                  View: {
                    marginTop: SIZES.MARGIN_LARGE,
                    backgroundColor: COLORS.BLACK,
                    borderRadius: 10,
                  },
                  text: {
                    fontSize: 18,
                  },
                }}
              />
            </>
          )}
        </Formik>

        {/* <View style={styles.orSec}>
          <View style={styles.line} />
          <Text style={styles.orTxt}>Or Sign up with</Text>
          <View style={styles.line} />
        </View>
        <View style={styles.socialBtns}>
          <TouchableOpacity style={styles.socialBtn} onPress={()=>signIn()}>
            <WithLocalSvg asset={require("../../../assets/svg/Google.svg")} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialBtn}>
            <AntDesign name="apple1" size={22} color="black" />
          </TouchableOpacity>
        </View> */}

        <View style={styles.bottomSec}>
          <Text style={styles.txt1}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.txt2}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Image source={require("../../../assets/img/location.png")} />
          <Text style={styles.modalHeading}>Enable Location</Text>
          <Text style={styles.modalDes}>
            Your location will be used to help match you with others nearby and
            access available location based features.
          </Text>
          <Button
            title="Allow"
            onPress={() => {
              handleAllowLocation();
              // setModalVisible(false);
              // navigation.navigate("Login");
            }}
            customStyles={{
              View: {
                marginTop: SIZES.MARGIN_EXTRA_LARGE,
                // width: "100%",
              },
            }}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_COLOR,
    justifyContent: "center",
  },
  heading: {
    color: COLORS.TEXT_COLOR,
    fontSize: SIZES.FONT_EXTRA_LARGE + 10,
    fontFamily: FONTS.INTER_BOLD,
    marginTop: SIZES.MARGIN_MEDIUM,
    marginBottom: SIZES.MARGIN_SMALL,
    width: "90%",
    alignSelf: "center",
  },
  bottomSec: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SIZES.MARGIN_MEDIUM,
    alignSelf: "center",
    marginBottom: SIZES.MARGIN_MEDIUM,
    // position: "absolute",
    // bottom: 20,
  },
  txt1: {
    color: COLORS.GRAY,
    fontFamily: FONTS.INTER_MEDIUM,
    fontSize: SIZES.FONT_SMALL + 2,
  },
  txt2: {
    color: COLORS.TEXT_COLOR,
    fontFamily: FONTS.INTER_BOLD,
    fontSize: SIZES.FONT_SMALL + 2,
    marginLeft: SIZES.MARGIN_SMALL,
  },
  errorText: {
    color: "red",
    fontSize: SIZES.FONT_SMALL,
    marginTop: 4,
    alignSelf: "flex-start",
    marginLeft: "5%",
    fontFamily: FONTS.MEDIUM,
  },
  orSec: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    alignSelf: "center",
    marginTop: adjustSize(20),
  },
  line: {
    height: 1,
    width: 100,
    backgroundColor: COLORS.GRAY_200,
  },
  orTxt: {
    marginHorizontal: adjustSize(5),
    fontFamily: FONTS.INTER_REGULAR,
    fontSize: adjustSize(14),
    color: "#000000B2",
  },
  socialBtns: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
    justifyContent: "space-between",
    marginTop: adjustSize(20),
  },
  socialBtn: {
    borderWidth: 1,
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.WHITE,
    height: adjustSize(56),
    borderRadius: adjustSize(10),
    borderColor: COLORS.GRAY_200,
  },
  modalContainer: {
    backgroundColor: COLORS.WHITE,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: adjustSize(16),
    padding: SIZES.PADDING_MEDIUM,
  },
  modalHeading: {
    color: COLORS.TEXT_COLOR,
    fontFamily: FONTS.BOLD,
    textAlign: "center",
    fontSize: SIZES.FONT_EXTRA_LARGE,
    marginTop: SIZES.MARGIN_MEDIUM,
  },
  modalDes: {
    textAlign: "center",
    fontFamily: FONTS.MEDIUM,
    marginTop: SIZES.MARGIN_MEDIUM,
    color: COLORS.GRAY_500,
  },
  logoView: {
    alignSelf: "flex-end",
    marginTop: SIZES.MARGIN_MEDIUM,
    marginRight: SIZES.MARGIN_EXTRA_LARGE,
    // position: "absolute",
    // top: adjustSize(30),
    // right: adjustSize(30),
  },
});
