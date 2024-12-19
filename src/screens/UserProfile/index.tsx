import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Ionicons from "@expo/vector-icons/Ionicons";

import { IUser, RootStackParamList, TabsParamsList } from "../../utils/types";
import { COLORS, FONTS, SIZES, socialsLinks } from "../../utils/constants";
import CarouselComponent from "../../components/Carousel";
import { adjustSize } from "../../utils/adjustsize";
import Button from "../../components/Button";
import { UserContext } from "../../context";
import { UserContextType } from "../../utils/types";
import { supabase } from "../../utils/supabase";

type UserProfileScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "UserProfile"
>;

const UserProfile: React.FC<UserProfileScreenProps> = ({
  route,
  navigation,
}) => {
  // export default function UserProfile({ navigation, route }: Props) {
  const { id } = route.params;
  const { user, logout, destinations, setUser } =
    useContext<UserContextType>(UserContext);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<IUser | null>(null);

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

  const getUser = async () => {
    try {
      setLoading(true);
      let { data, error: databaseError } = await supabase
        .from("users")
        .select("*")
        .eq("id", id)
        .single();
      if (databaseError) {
        throw databaseError;
      }
      setUserData(data);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <SafeAreaView style={styles.conainer}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color={COLORS.WHITE} />
        <Text style={styles.backBtnTxt}>Profile</Text>
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CarouselComponent userData={userData} />

        <View style={styles.profileDetails}>
          <Text style={styles.label}>About Me</Text>
          <Text style={styles.description}>{userData?.description}</Text>
          <Text style={styles.label}>Socials</Text>
          <View style={styles.row}>
            {socialsLinks.map((socialLink, i) => (
              <TouchableOpacity
                style={styles.socialLink}
                key={i}
                activeOpacity={0.8}
                onPress={() => openLink(socialLink.link)}
              >
                {socialLink.icon}
                <Text style={styles.socialLinkTxt}>
                  {socialLink.link ? socialLink.name : "Not Set"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.label}>Interests</Text>
          <View style={styles.row}>
            {[
              "🌃 Night life",
              "🌃 Solo Travel",
              "🧘 Yoga",
              "🏖️ Beach",
              "💻 Digital Nomad",
            ].map((interest, i) => (
              <TouchableOpacity
                style={[styles.socialLink, { borderRadius: 20 }]}
                key={i}
                activeOpacity={0.8}
              >
                <Text style={styles.socialLinkTxt}>{interest}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {/* <SubHeading heading="Travel Plans" showSeeAllBtn title="See All" /> */}
        </View>
        <Button
          title="Message"
          onPress={() => navigation.navigate("Chat", { id })}
          customStyles={{
            View: {
              marginTop: SIZES.MARGIN_EXTRA_LARGE,
            },
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

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
});

export default UserProfile;
