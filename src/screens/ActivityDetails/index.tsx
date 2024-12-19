import React, { useState, useContext } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useToast } from "react-native-toast-notifications";

import { RootStackParamList } from "../../utils/types";
import { COLORS, FONTS, SIZES } from "../../utils/constants";
import { adjustSize } from "../../utils/adjustsize";
import Button from "../../components/Button";
import { UserContext } from "../../context";
import { supabase } from "../../utils/supabase";

type Props = {
  navigation: NativeStackScreenProps<RootStackParamList, "ActivityDetails">;
  route: RouteProp<RootStackParamList, "ActivityDetails">;
};

export default function ActivityDetails({ navigation, route }: Props) {
  const { user, fetchDestinationsWithMembers } = useContext(UserContext);
  const toast = useToast();
  const {
    imageUrl,
    location,
    description,
    title,
    interest,
    id,
    destination_members,
    city,
    country,
  } = route.params;
  const [loading, setLoading] = useState(false);

  const joinDestination = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("destination_members")
        .insert({ user_id: user?.id, destination_id: id });
      if (error) {
        throw error;
      }
      // console.log(data);
      fetchDestinationsWithMembers();
      toast.show("Joined successfully!", { type: "success" });
    } catch (error: any) {
      console.log(error);
      toast.show(error.message || "Something went wrong!", { type: "danger" });
    } finally {
      setLoading(false);
    }
  };

  // Function to check if a city exists
  const doesUserExist = (userId: string | undefined) => {
    return destination_members.some((item) => item.user_id === userId);
  };
  // console.log("====>>>>>>", destination_members);
  return (
    <SafeAreaView style={styles.conainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{}}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Entypo name="chevron-small-left" size={24} color={COLORS.BLACK} />
          </TouchableOpacity>
          <Image source={{ uri: imageUrl }} style={styles.image} />
        </View>
        <View style={styles.detailsSec}>
          <Text style={styles.name}>{title}</Text>
          <View style={styles.location}>
            <FontAwesome6
              name="location-dot"
              size={20}
              color={COLORS.GRAY_300}
            />
            <Text style={styles.locationTxt}>{city + " " + country}</Text>
          </View>
          <Text style={styles.des}>{description}</Text>
          <Text style={styles.label}>Interest</Text>
          <View style={styles.inerestsMain}>
            {interest?.map((interest, i) => (
              <View style={styles.inerest} key={i}>
                <Text style={styles.inerestTxt}>{interest}</Text>
              </View>
            ))}
          </View>
          <Button
            loading={loading}
            customStyles={{ View: styles.joinBtn }}
            onPress={() =>
              doesUserExist(user?.id)
                ? navigation.navigate("Chat", { id })
                : joinDestination()
            }
          >
            {doesUserExist(user?.id) ? (
              <Text style={styles.joinTxt}>Message</Text>
            ) : (
              <>
                <Text style={styles.joinTxt}>Join Chat</Text>
                <AntDesign name="arrowright" size={24} color={COLORS.WHITE} />
              </>
            )}
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  conainer: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  header: {},
  image: {
    height: adjustSize(300),
    width: "100%",
  },
  profileImage: {
    width: adjustSize(51),
    height: adjustSize(51),
    borderRadius: adjustSize(51) / 2,
  },
  backBtn: {
    width: adjustSize(44),
    height: adjustSize(44),
    position: "absolute",
    zIndex: 1,
    backgroundColor: COLORS.WHITE,
    justifyContent: "center",
    alignItems: "center",
    top: 20,
    left: 20,
    borderRadius: adjustSize(44 / 2),
  },
  detailsSec: {
    backgroundColor: COLORS.WHITE,
    flex: 1,
    paddingHorizontal: SIZES.PADDING_MEDIUM,
    paddingVertical: SIZES.PADDING_MEDIUM,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: adjustSize(-20),
  },
  name: {
    color: COLORS.TEXT_COLOR,
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: SIZES.FONT_LARGE + 2,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationTxt: {
    flex: 1,
    marginLeft: SIZES.MARGIN_SMALL,
    color: COLORS.GRAY_300,
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: SIZES.FONT_SMALL,
  },
  des: {
    color: COLORS.GRAY_300,
    marginTop: SIZES.MARGIN_MEDIUM,
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: SIZES.FONT_SMALL + 2,
    lineHeight: 21,
  },
  joinBtn: {
    flexDirection: "row",
    marginTop: SIZES.MARGIN_LARGE,
  },
  joinTxt: {
    color: COLORS.WHITE,
    fontFamily: FONTS.POPPINS_MEDIUM,
    marginRight: SIZES.MARGIN_MEDIUM,
    fontSize: SIZES.FONT_MEDIUM,
  },
  label: {
    fontFamily: FONTS.BOLD,
    fontSize: SIZES.FONT_LARGE + 2,
    marginTop: SIZES.MARGIN_LARGE,
  },
  inerestsMain: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
    flexWrap: "wrap",
    marginTop: SIZES.MARGIN_MEDIUM,
    gap: SIZES.MARGIN_MEDIUM,
  },
  inerest: {
    backgroundColor: "#176FF20D",
    borderRadius: adjustSize(16),
    padding: SIZES.PADDING_MEDIUM - 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: SIZES.MARGIN_SMALL,
  },
  inerestTxt: {
    fontFamily: FONTS.ITALIC,
    fontSize: SIZES.FONT_MEDIUM - 2,
    color: COLORS.GRAY_500,
  },
});
