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
import { Formik } from "formik";
import { useToast } from "react-native-toast-notifications";
import * as Location from "expo-location";

import { RootStackParamList } from "../../utils/types";
import { COLORS, FONTS, SIZES } from "../../utils/constants";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { adjustSize } from "../../utils/adjustsize";
import {
  signinValidationSchema,
  forgotPasswordValidationSchema,
} from "../../utils/validations";
import { supabase } from "../../utils/supabase";
import { UserContext } from "../../context";
import { usePushNotifications } from "../../context/usePushNotifications";

type Props = {
  navigation: NativeStackScreenProps<RootStackParamList, "ForgotPassword">;
};

export default function ForgotPassword({ navigation }: Props) {
  const toast = useToast();
  const { setUser } = useContext(UserContext);
  const { expoPushToken, sendPushNotification } = usePushNotifications();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleResetPassword = async (values: any, resetForm: any) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.resetPasswordForEmail(
        values.email,
        {
          redirectTo: "Sologo://ResetPassword",
        }
      );

      if (error) {
        throw error;
      }
      //   let {
      //     data: { user, session },
      //     error: signinError,
      //   } = await supabase.auth.signInWithPassword({
      //     email: values.email,
      //     password: values.password,
      //   });
      //   if (signinError) {
      //     throw signinError;
      //   }

      //   let { data, error: updateError } = await supabase
      //     .from("users")
      //     .update({ expoPushToken: expoPushToken?.data })
      //     .eq("id", user?.id);

      toast.show("Email sent successfully", {
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

  return (
    <SafeAreaView style={styles.conainer}>
      <View style={styles.logoView}>
        <WithLocalSvg asset={require("../../../assets/svg/star.svg")} />
      </View>
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
      <Text style={styles.heading}>Forgot Password</Text>
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={forgotPasswordValidationSchema}
        onSubmit={(values, { resetForm }) => {
          handleResetPassword(values, resetForm);
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
            {/* <Input
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
            /> */}
            <Button
              title={"Reset Password"}
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

      {/* <Modal
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
      </Modal> */}
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
