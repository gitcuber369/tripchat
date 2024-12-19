import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
{
  /* <AntDesign name="instagram" size={15} color={COLORS.TEXT_COLOR} /> */
  // <MaterialIcons name="tiktok" size={15} color={COLORS.TEXT_COLOR} />;
}

import { TabsParamsList } from "../../utils/types";
import { COLORS, FONTS, SIZES } from "../../utils/constants";
import CarouselComponent from "../../components/Carousel";
import { adjustSize } from "../../utils/adjustsize";
import Button from "../../components/Button";
import { UserContext } from "../../context";
import { UserContextType } from "../../utils/types";
import { usePushNotifications } from "../../context/usePushNotifications";
import Input from "../../components/Input";

type Props = NativeStackScreenProps<TabsParamsList, "Profile">;

export default function Profile({ navigation }: Props) {
  const { sendPushNotification } = usePushNotifications();
  const [modalVisible1, setModalVisible1] = useState(false);
  const [interest, setInterest] = useState("");
  const { user, logout, destinations, setUser } =
    useContext<UserContextType>(UserContext);

  const openLink = (url: string | undefined) => {
    if (url) {
      Linking.canOpenURL(url)
        .then((supported) => {
          if (supported) {
            Linking.openURL(url);
          } else {
            Alert.alert("Error", "URL not supported: " + url);
          }
        })
        .catch((err) => {
          console.error("An error occurred:", err);
          Alert.alert(
            "Error",
            "An unexpected error occurred. Please try again."
          );
        });
    } else {
      Alert.alert("Notice", "No link is set for this social profile.");
    }
  };
  return (
    <SafeAreaView style={styles.conainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.editProfileBtn}
          activeOpacity={0.6}
          onPress={() => navigation.navigate("EditProfile")}
        >
          {/* <MaterialIcons name="edit" size={20} color={COLORS.BLACK} /> */}
          <MaterialCommunityIcons
            name="account-edit"
            size={20}
            color={COLORS.BLACK}
          />
        </TouchableOpacity>
        <CarouselComponent userData={user} />

        <View style={styles.profileDetails}>
          <Text style={styles.label}>About Me</Text>
          <Text style={styles.description}>{user?.description}</Text>
          <Text style={styles.label}>Socials</Text>
          <View style={styles.row}>
            {user?.socials.map((socialLink, i) => (
              <TouchableOpacity
                style={styles.socialLink}
                key={i}
                activeOpacity={0.8}
                onPress={() => openLink(socialLink.link)}
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
              marginTop: SIZES.MARGIN_LARGE,
            }}
          >
            <Text style={[styles.label, { marginTop: 0 }]}>Interests</Text>
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
        </View>
        <Button
          title="Logout"
          onPress={() => logout()}
          customStyles={{
            View: {
              marginTop: SIZES.MARGIN_EXTRA_LARGE,
            },
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  conainer: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  profileDetails: {
    backgroundColor: COLORS.WHITE,
    marginTop: -20,
    borderTopLeftRadius: adjustSize(30),
    borderTopRightRadius: adjustSize(30),
    paddingHorizontal: SIZES.PADDING_MEDIUM,
    // paddingVertical: SIZES.PADDING_MEDIUM,
  },
  label: {
    color: COLORS.TEXT_COLOR,
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: SIZES.FONT_MEDIUM,
    marginTop: SIZES.MARGIN_LARGE,
    flex: 1,
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
  },
  editProfileBtn: {
    position: "absolute",
    zIndex: 1,
    backgroundColor: COLORS.WHITE,
    top: 20,
    alignSelf: "flex-end",
    right: 20,
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35 / 2,
    elevation: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dim background
  },
  modalContent: {
    width: "90%",
    padding: 10,
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
  },
});
