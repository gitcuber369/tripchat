import React from "react";
import { TouchableOpacity, Image, View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { INearbyChats } from "../../utils/types";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS, FONTS, SIZES } from "../../utils/constants";

const ChatCard = ({
  data,
  ...props
}: {
  data: INearbyChats;
} & TouchableOpacity["props"]) => {
  let { name, imageUrl, members, description, destination_members, title } =
    data;
  const navigation: any = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      {...props}
      style={styles.container}
      onPress={() => navigation.navigate("ActivityDetails", { ...data })}
    >
      <Image source={{ uri: imageUrl }} style={styles.chatImage} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {title}
        </Text>
        <Text numberOfLines={2} style={styles.description}>
          {description}
        </Text>
        <View style={styles.bottomSec}>
          <View style={styles.members}>
            {destination_members.map((student, i) => (
              <Image
                source={{
                  uri:
                    student?.users && student?.users?.profile_pic
                      ? student?.users?.profile_pic[0]
                      : "https://bzphwlvkfpfmzsbcmrgl.supabase.co/storage/v1/object/public/profile_pictures/user.png",
                }}
                style={[styles.studentProfile, { marginLeft: i > 0 ? -5 : 0 }]}
                key={i}
              />
            ))}
            {destination_members.length !== 0 && (
              <Text style={styles.plusTxt}>
                {destination_members?.length > 10
                  ? `${destination_members.length}+ members`
                  : `${destination_members.length} members`}
              </Text>
            )}
            {/* <Text style={styles.plusTxt}>+33</Text> */}
          </View>
          <TouchableOpacity>
            <Ionicons name="add-circle-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    elevation: 2,
    marginTop: SIZES.MARGIN_MEDIUM,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 4,
    overflow: "hidden",
  },
  detailsContainer: {
    flex: 1,
    padding: SIZES.PADDING_SMALL,
  },
  chatImage: {
    width: 100,
    height: "100%",
  },
  members: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SIZES.MARGIN_SMALL,
    flex: 1,
  },
  studentProfile: {
    width: 23,
    height: 23,
    borderRadius: 30 / 2,
  },
  bottomSec: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: SIZES.MARGIN_MEDIUM,
  },
  plusTxt: {
    color: COLORS.BLACK,
    fontFamily: FONTS.BOLD,
    marginLeft: 5,
    fontSize: 10,
  },
  name: {
    fontFamily: FONTS.BOLD,
    fontSize: SIZES.FONT_SMALL + 2,
    color: COLORS.BLACK,
  },
  description: {
    color: COLORS.GRAY_500,
    fontSize: 9,
    fontFamily: FONTS.BOLD,
    marginTop: SIZES.MARGIN_SMALL,
  },
});
export default ChatCard;
