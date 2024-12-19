import React, { useState, useContext } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { WithLocalSvg } from "react-native-svg/css";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Formik } from "formik";
import { useToast } from "react-native-toast-notifications";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import Modal from "react-native-modal";
import * as Location from "expo-location";

import { RootStackParamList } from "../../utils/types";
import { COLORS, FONTS, SIZES } from "../../utils/constants";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { adjustSize } from "../../utils/adjustsize";
import { signinValidationSchema } from "../../utils/validations";
import { supabase } from "../../utils/supabase";
import { UserContext } from "../../context";
import { usePushNotifications } from "../../context/usePushNotifications";

type Props = {
  navigation: NativeStackScreenProps<RootStackParamList, "ResetPassword">;
};

export default function ResetPassword({ navigation }: Props) {
  const toast = useToast();
  const { user, setUser, logout } = useContext(UserContext);
  const { expoPushToken, sendPushNotification } = usePushNotifications();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>(null);

  const handleLogin = async (values: any, resetForm: any) => {
    try {
      setLoading(true);
      let {
        data: { user, session },
        error: signinError,
      } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      if (signinError) {
        throw signinError;
      }

      let { data: userData, error: databaseError } = await supabase
        .from("users")
        .select("*")
        .eq("id", user?.id)
        .single();

      let { data, error: updateError } = await supabase
        .from("users")
        .update({ expoPushToken: expoPushToken?.data })
        .eq("id", user?.id);

      if (databaseError) {
        throw databaseError;
      }
      if (updateError) {
        throw updateError;
      }
      userData.expoPushToken = expoPushToken?.data;
      // console.log("=====>>>>>", userData);
      setUser(userData);
      toast.show("Login successful!", {
        type: "success",
      });
      resetForm();
    } catch (error: any) {
      console.log(error);
      toast.show(error.message || "Something went wrong!", { type: "danger" });
    } finally {
      setLoading(false);
    }
  };

  const signIn = async () => {
    try {
      // Check for Play Services
      await GoogleSignin.hasPlayServices();

      // Perform Google Sign-In
      const response = await GoogleSignin.signIn();
      if (response) {
        const { idToken } = response.data; // Extract ID Token from response

        // Authenticate with Supabase
        const { data: sessionData, error: authError } =
          await supabase.auth.signInWithIdToken({
            provider: "google",
            token: idToken,
          });

        if (authError) {
          throw authError;
        }

        const userId = sessionData.user.id; // Get the authenticated user's ID
        // console.log("===========sessionData>>>>>s", sessionData);

        // Check if user already exists in the `users` table
        const { data: existingUser, error: fetchError } = await supabase
          .from("users")
          .select("*")
          .eq("id", userId)
          .single();

        if (fetchError) {
          console.log("======fetchError>>>>>", fetchError);
          if (fetchError.code === "PGRST116") {
            // User does not exist; insert user data into Supabase
            const { email, full_name, picture } =
              sessionData.user.user_metadata; // Extract additional user data
            const { error: insertError } = await supabase.from("users").insert({
              id: userId,
              email,
              username: full_name,
              profile_pic: [picture],
              expoPushToken: expoPushToken?.data,
            });

            if (insertError) {
              throw insertError;
            }
            setModalVisible(true);
            setUserData({
              id: userId,
              email,
              username: full_name,
              profile_pic: [picture],
              role: "",
              description: null,
              expoPushToken: expoPushToken?.data,
            });
          } else {
            throw fetchError;
          }
        } else {
          // console.log("User already exists:", existingUser);
          setUser(existingUser);
        }

        console.log("Google Login Successful:", sessionData);
      } else {
        console.log("Sign-in was cancelled by the user");
      }
    } catch (error: any) {
      if (error?.code) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            toast.show("Sign-in operation already in progress", {
              type: "danger",
            });
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            toast.show("Google Play Services not available or outdated", {
              type: "danger",
            });
            break;
          default:
            console.error("Google Sign-In error:", error);
        }
      } else {
        // console.error("An unexpected error occurred:", error);
        toast.show(error?.message || "something went wrong", {
          type: "danger",
        });
      }
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
          .eq("id", userData?.id); // Update based on user ID
        setUser({ ...userData });
      } else {
        toast.show("Could not fetch city and country.", { type: "danger" });
      }

      // Navigate to the next screen
      setModalVisible(false);
      // navigation.navigate("Login");
    } catch (error) {
      // console.error("Error accessing location or reverse geocoding:", error);
      toast.show("Failed to access location. Try again later.", {
        type: "danger",
      });
    }
  };

  return (
    <SafeAreaView style={styles.conainer}>
      <View style={styles.logoView}>
        <WithLocalSvg asset={require("../../../assets/svg/star.svg")} />
      </View>
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
      <Text style={styles.heading}>Log in</Text>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={signinValidationSchema}
        onSubmit={(values, { resetForm }) => {
          handleLogin(values, resetForm);
          // navigation.navigate("Tabs");
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
                input: {},
                container: {
                  backgroundColor: COLORS.WHITE,
                  borderWidth: 1,
                  borderColor: COLORS.GRAY_200,
                  borderRadius: 10,
                  height: adjustSize(56),
                },
              }}
            />
            <Input
              placeholder="Password"
              label="Password"
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              error={
                touched.password && errors.password
                  ? errors.password
                  : undefined
              }
              secureTextEntry={!showPassword}
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
                input: {},
                container: {
                  backgroundColor: COLORS.WHITE,
                  borderWidth: 1,
                  borderColor: COLORS.GRAY_200,
                  borderRadius: 10,
                  height: adjustSize(56),
                },
              }}
            />

            <TouchableOpacity
              style={styles.forgotBtn}
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Text style={styles.forgotBtnTxt}>Forgot Password?</Text>
            </TouchableOpacity>
            <Button
              title={"Log in"}
              loading={loading}
              onPress={() => handleSubmit()}
              customStyles={{
                View: {
                  marginTop: SIZES.MARGIN_LARGE,
                  backgroundColor: COLORS.BLACK,
                  borderRadius: 10,
                },
                text: {
                  fontSize: 18,
                  // fontFamily: FONTS.SEMI_BOLD,
                },
              }}
            />
          </>
        )}
      </Formik>

      <View style={styles.orSec}>
        <View style={styles.line} />
        <Text style={styles.orTxt}>Or Login with</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.socialBtns}>
        {/* <TouchableOpacity style={styles.socialBtn}>
          <EvilIcons name="sc-facebook" size={30} color="#3C5A99" />
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.socialBtn} onPress={() => signIn()}>
          <WithLocalSvg asset={require("../../../assets/svg/Google.svg")} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialBtn}>
          <AntDesign name="apple1" size={22} color="black" />
        </TouchableOpacity>
      </View>
      {/* </ScrollView> */}
      <View style={styles.bottomSec}>
        <Text style={styles.txt1}>Don’t have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.txt2}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        // visible={isModalVisible}
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
  conainer: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_COLOR,
    justifyContent: "center",
  },
  heading: {
    color: COLORS.TEXT_COLOR,
    fontSize: SIZES.FONT_EXTRA_LARGE + 10,
    fontFamily: FONTS.INTER_BOLD,
    marginTop: SIZES.MARGIN_EXTRA_LARGE,
    marginBottom: SIZES.MARGIN_SMALL,
    width: "90%",
    alignSelf: "center",
  },
  forgotBtn: {
    alignSelf: "flex-end",
    marginRight: SIZES.MARGIN_EXTRA_LARGE,
    marginVertical: SIZES.MARGIN_MEDIUM,
  },
  forgotBtnTxt: {
    color: COLORS.BLACK,
    fontFamily: FONTS.INTER_SEMIBOLD,
    fontSize: SIZES.FONT_SMALL + 2,
  },
  bottomSec: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SIZES.MARGIN_MEDIUM,
    alignSelf: "center",
    position: "absolute",
    bottom: adjustSize(20),
    zIndex: 1,
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
  logoView: {
    position: "absolute",
    top: adjustSize(30),
    right: adjustSize(30),
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
    // justifyContent: "space-between",
    marginTop: adjustSize(20),
    gap: 10,
    justifyContent: "center",
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
});
