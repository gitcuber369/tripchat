import React, { useContext, useState } from "react";
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Formik } from "formik";
import * as ImagePicker from "expo-image-picker";
import { useToast } from "react-native-toast-notifications";
import AntDesign from "@expo/vector-icons/AntDesign";

import { RootStackParamList } from "../../utils/types";
import { COLORS, FONTS, SIZES } from "../../utils/constants";
import { editProfileSchema } from "../../utils/validations";
import Input from "../../components/Input";
import { adjustSize } from "../../utils/adjustsize";
import Button from "../../components/Button";
import { UserContext } from "../../context";
import CarouselComponent from "../../components/Carousel";
import { supabase, uploadImage } from "../../utils/supabase";

type Props = {
  navigation: NativeStackScreenProps<RootStackParamList, "EditProfile">;
};

export default function EditProfile({ navigation }: Props) {
  const { user, logout, destinations, setUser } = useContext<any>(UserContext);
  const toast = useToast();
  const [modalVisible1, setModalVisible1] = useState<boolean>(false);
  const [modalVisible2, setModalVisible2] = useState<boolean>(false);
  const [interest, setInterest] = useState("");
  const [interests, setInterests] = useState(user.interests ?? []);
  const [socials, setSocials] = useState(user.socials);

  const pickImage = async () => {
    // Launch the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      try {
        const publicUrl = await uploadImage({
          userId: user?.id || "",
          image: result.assets[0],
          bucket: "profile_pictures",
        });

        const { data, error } = await supabase
          .from("users")
          .update({
            profile_pic: user?.profile_pic
              ? [...user?.profile_pic, publicUrl]
              : [publicUrl],
          })
          .eq("id", user?.id);

        if (error) {
          console.error("Error updating profile_pic:", error);
        } else {
          setUser({
            ...user,
            profile_pic: user?.profile_pic
              ? [...user?.profile_pic, publicUrl]
              : [publicUrl],
          });
          //   getUser();
          //   console.log("Profile picture updated:", data);
        }
      } catch (error: any) {
        toast.show(error?.message || "Something went wrong!", {
          type: "danger",
        });
        console.error("Error:", error);
      }
    }
  };

  const updateProfie = async (values: any) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .update({
          username: values.username,
          description: values.description,
          interests: user?.interests,
          socials: socials,
        })
        .eq("id", user?.id);

      if (error) {
        throw error;
      }
      setUser({
        ...user,
        username: values.username,
        description: values.description,
      });
      toast.show("Profile updated successfully", {
        type: "success",
      });
    } catch (error: any) {
      toast.show(error?.message || "Something went wrong!", {
        type: "danger",
      });
    }
  };

  const addInterest = () => {
    interests.push(interest);
    setInterests([...interests]);
    setInterest("");
  };

  return (
    <SafeAreaView style={styles.conainer}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color={COLORS.WHITE} />
        <Text style={styles.backBtnTxt}>Edit Profile</Text>
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.editProfileBtn}
          activeOpacity={0.6}
          onPress={() => pickImage()}
        >
          <MaterialIcons name="edit" size={20} color={COLORS.BLACK} />
        </TouchableOpacity>
        <CarouselComponent userData={user} />
        <Formik
          initialValues={{
            username: user?.username,
            description: user.description ?? "",
          }}
          validationSchema={editProfileSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            updateProfie(values);
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
                placeholder="Description"
                autoCapitalize="none"
                label="Description"
                value={values.description}
                onChangeText={handleChange("description")}
                onBlur={handleBlur("description")}
                multiline
                error={
                  touched.description && errors.description
                    ? errors.description
                    : undefined
                }
                customStyle={{
                  container: {
                    backgroundColor: COLORS.WHITE,
                    borderWidth: 1,
                    borderColor: COLORS.GRAY_200,
                    borderRadius: 10,
                    height: 100,
                  },
                  input: {
                    textAlignVertical: "top",
                  },
                }}
              />

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: SIZES.MARGIN_EXTRA_LARGE,
                  marginHorizontal: SIZES.MARGIN_LARGE,
                }}
              >
                <Text style={[styles.label, { marginTop: 0 }]}>Socials</Text>
                <TouchableOpacity onPress={() => setModalVisible2(true)}>
                  <MaterialIcons name="edit" size={20} color={COLORS.BLACK} />
                </TouchableOpacity>
              </View>
              <View style={styles.row}>
                {user?.socials.map((socialLink: any, i: number) => (
                  <TouchableOpacity
                    style={styles.socialLink}
                    key={i}
                    activeOpacity={0.8}
                    // onPress={() => openLink(socialLink.link)}
                  >
                    {socialLink.name === "Instagram" && (
                      <AntDesign
                        name="instagram"
                        size={15}
                        color={COLORS.TEXT_COLOR}
                      />
                    )}
                    {socialLink.name === "Tiktok" && (
                      <MaterialIcons
                        name="tiktok"
                        size={15}
                        color={COLORS.TEXT_COLOR}
                      />
                    )}
                    <Text style={styles.socialLinkTxt}>
                      {socialLink.link ? socialLink.name : "Not Set"}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: SIZES.MARGIN_EXTRA_LARGE,
                  marginHorizontal: SIZES.MARGIN_LARGE,
                }}
              >
                <Text style={[styles.label, { marginTop: 0 }]}>Interests</Text>
                <TouchableOpacity onPress={() => setModalVisible1(true)}>
                  <MaterialIcons name="edit" size={20} color={COLORS.BLACK} />
                </TouchableOpacity>
              </View>
              <View style={styles.row}>
                {user?.interests &&
                  user.interests.map((interest: string, i: number) => (
                    <TouchableOpacity
                      style={[styles.socialLink, { borderRadius: 20 }]}
                      key={i}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.socialLinkTxt}>{interest}</Text>
                    </TouchableOpacity>
                  ))}
              </View>
              <Button
                title="Update"
                onPress={() => handleSubmit()}
                customStyles={{
                  View: {
                    marginTop: SIZES.MARGIN_EXTRA_LARGE,
                  },
                }}
              />
            </>
          )}
        </Formik>
      </ScrollView>

      {/* Modal Component 1 */}
      <Modal
        animationType="slide" // 'none', 'slide', or 'fade'
        transparent={true} // Makes background transparent
        visible={modalVisible1}
        onRequestClose={() => setModalVisible1(false)} // Handle back button press on Android
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeading}>Edit Interests</Text>
              <TouchableOpacity onPress={() => setModalVisible1(false)}>
                <AntDesign name="close" size={20} color={COLORS.GRAY_500} />
              </TouchableOpacity>
            </View>
            <View style={styles.modalRow}>
              <TextInput
                placeholder="Enter interest"
                value={interest}
                onChangeText={setInterest}
                style={{
                  backgroundColor: COLORS.WHITE,
                  borderWidth: 1,
                  borderColor: COLORS.GRAY_200,
                  borderRadius: 10,
                  height: adjustSize(40),
                  paddingHorizontal: 10,
                  flex: 1,
                  fontFamily: FONTS.MEDIUM,
                }}
              />
              <Button
                title="Add"
                onPress={() => addInterest()}
                disabled={interest === ""}
                customStyles={{
                  View: {
                    height: adjustSize(40),
                    width: 80,
                    marginLeft: 10,
                    borderRadius: 10,
                    marginBottom: 0,
                  },
                  text: {
                    fontSize: SIZES.FONT_SMALL,
                  },
                }}
              />
            </View>
            <View style={styles.interests}>
              {interests.map((val: string, i: number) => (
                <View key={i} style={styles.interest}>
                  <Text style={styles.interestTxt}>{val}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      interests.splice(i, 1);
                      setInterests([...interests]);
                    }}
                  >
                    <AntDesign name="close" size={12} color={COLORS.GRAY_500} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                justifyContent: "center",
                marginTop: SIZES.MARGIN_LARGE,
                gap: 10,
              }}
            >
              <Button
                title="Cancel"
                onPress={() => setModalVisible1(false)}
                customStyles={{
                  View: {
                    marginTop: 0,
                    height: 40,
                    width: "45%",
                    backgroundColor: COLORS.WHITE,
                    borderWidth: 1,
                    borderColor: "red",
                  },
                  text: {
                    color: "red",
                  },
                }}
              />
              <Button
                title="Update"
                onPress={() => {
                  setUser({ ...user, interests: interests });
                  setModalVisible1(false);
                }}
                customStyles={{
                  View: {
                    marginTop: 0,
                    height: 40,
                    width: "45%",
                  },
                }}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal Component 2*/}
      <Modal
        animationType="slide" // 'none', 'slide', or 'fade'
        transparent={true} // Makes background transparent
        visible={modalVisible2}
        onRequestClose={() => setModalVisible2(false)} // Handle back button press on Android
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeading}>Edit Social links</Text>
            </View>
            {socials.map((val: any, i: number) => {
              return (
                <Input
                  placeholder="Enter link"
                  label={val.name}
                  value={val.link}
                  onChangeText={(text) => {
                    socials[i].link = text;
                    setSocials([...socials]);
                  }}
                  key={i}
                  // onBlur={handleBlur("username")}
                  customStyle={{
                    container: {
                      backgroundColor: COLORS.WHITE,
                      borderWidth: 1,
                      borderColor: COLORS.GRAY_200,
                      borderRadius: 10,
                      height: 40,
                    },
                  }}
                />
              );
            })}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                justifyContent: "center",
                marginTop: SIZES.MARGIN_LARGE,
                gap: 10,
              }}
            >
              <Button
                title="Cancel"
                onPress={() => setModalVisible2(false)}
                customStyles={{
                  View: {
                    marginTop: 0,
                    height: 40,
                    width: "45%",
                    backgroundColor: COLORS.WHITE,
                    borderWidth: 1,
                    borderColor: "red",
                  },
                  text: {
                    color: "red",
                  },
                }}
              />
              <Button
                title="Update"
                onPress={() => {
                  setUser({ ...user, socials: socials });
                  setModalVisible2(false);
                }}
                customStyles={{
                  View: {
                    marginTop: 0,
                    height: 40,
                    width: "45%",
                  },
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  conainer: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  backBtn: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "flex-start",
    marginLeft: SIZES.MARGIN_LARGE,
    marginTop: SIZES.MARGIN_MEDIUM,
    position: "absolute",
    zIndex: 1,
  },
  backBtnTxt: {
    marginLeft: SIZES.MARGIN_MEDIUM,
    color: COLORS.WHITE,
    fontSize: SIZES.FONT_LARGE,
    fontFamily: FONTS.INTER_MEDIUM,
  },
  description: {
    color: COLORS.GRAY_500,
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: SIZES.FONT_MEDIUM - 2,
    marginTop: SIZES.MARGIN_SMALL,
  },
  socialLink: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    paddingHorizontal: SIZES.PADDING_SMALL,
    height: 35,
    borderRadius: adjustSize(10),
    borderColor: COLORS.GRAY_300,
    gap: 7,
  },
  socialLinkTxt: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    lineHeight: 19,
    color: COLORS.TEXT_COLOR,
    fontSize: SIZES.FONT_SMALL,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: adjustSize(10),
    marginTop: SIZES.MARGIN_SMALL,
    flexWrap: "wrap",
    marginHorizontal: SIZES.MARGIN_LARGE,
  },
  editProfilesec: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: COLORS.GRAY_500,
    width: "90%",
    alignSelf: "center",
    marginTop: SIZES.MARGIN_EXTRA_LARGE,
    height: 100,
    borderRadius: 10,
  },
  editProfilesecTxt: {
    color: COLORS.GRAY_800,
    fontFamily: FONTS.SEMI_BOLD,
  },
  profilePicturesMain: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    paddingHorizontal: SIZES.PADDING_MEDIUM,
    marginTop: SIZES.MARGIN_LARGE,
    gap: 10,
  },
  profilePictureMainView: {
    width: adjustSize(80),
    height: adjustSize(80),
  },
  profilePicture: {
    height: adjustSize(80),
    width: adjustSize(80),
    borderRadius: 10,
  },

  editProfileBtn: {
    position: "absolute",
    zIndex: 1,
    backgroundColor: COLORS.WHITE,
    top: 300,
    alignSelf: "flex-end",
    right: 20,
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35 / 2,
    elevation: 10,
  },
  label: {
    color: COLORS.TEXT_COLOR,
    flex: 1,
    fontFamily: FONTS.INTER_MEDIUM,
    fontSize: SIZES.FONT_MEDIUM,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dim background
  },
  modalContent: {
    width: "90%",
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: "center",
  },
  modalRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: SIZES.MARGIN_LARGE,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    // marginVertical: SIZES.MARGIN_SMALL,
    // marginBottom: SIZES.MARGIN_MEDIUM,
  },
  modalHeading: {
    color: COLORS.BLACK,
    fontFamily: FONTS.BOLD,
    fontSize: SIZES.FONT_MEDIUM + 2,
  },
  interests: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
    marginTop: SIZES.MARGIN_LARGE,
    width: "100%",
  },
  interest: {
    flexDirection: "row",
    paddingHorizontal: SIZES.PADDING_SMALL,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 3,
    gap: 5,
    borderColor: COLORS.GRAY_200,
  },
  interestTxt: {
    color: COLORS.GRAY_500,
    fontFamily: FONTS.MEDIUM,
    fontSize: SIZES.FONT_SMALL,
  },
});
