import React from "react";
import { TouchableOpacity, Image, View, Text, StyleSheet } from "react-native";
import { INearbyChats } from "../../utils/types";
import { COLORS, FONTS, SIZES } from "../../utils/constants";

const EventCard = ({
  data,
  ...props
}: {
  data: INearbyChats;
} & TouchableOpacity["props"]) => {
  let { name, imageUrl, members, hashTags } = data;
  return (
    <TouchableOpacity activeOpacity={0.8} {...props} style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.chatImage} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.bottomSec}>
          <View style={styles.members}>
            {members.map((student, i) => (
              <Image
                source={{ uri: student.profileUrl }}
                style={[styles.studentProfile, { marginLeft: i > 0 ? -5 : 0 }]}
                key={i}
              />
            ))}
            <Text style={styles.plusTxt}>+33</Text>
          </View>
        </View>
        <View style={{ marginTop: SIZES.MARGIN_SMALL }}>
          {hashTags?.map((tag, i) => (
            <Text key={i} style={styles.tag}>
              {tag}
            </Text>
          ))}
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
    borderRadius: 4,
    overflow: "hidden",
    width: 133,
    marginRight: 10,
  },
  detailsContainer: {
    paddingHorizontal: SIZES.PADDING_SMALL - 3,
    paddingVertical: SIZES.PADDING_SMALL - 5,
  },
  chatImage: {
    width: "100%",
    height: 90,
  },
  members: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SIZES.MARGIN_SMALL,
    flex: 1,
  },
  studentProfile: {
    width: 19,
    height: 19,
    borderRadius: 30 / 2,
  },
  bottomSec: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  plusTxt: {
    color: COLORS.BLACK,
    fontFamily: FONTS.BOLD,
    marginLeft: 5,
    fontSize: 10,
  },
  name: {
    fontFamily: FONTS.BOLD,
    fontSize: SIZES.FONT_SMALL - 2,
    color: COLORS.GRAY_800,
  },
  description: {
    color: COLORS.GRAY_500,
    fontSize: 9,
    fontFamily: FONTS.BOLD,
    marginTop: SIZES.MARGIN_SMALL,
  },
  tag: {
    fontSize: 8,
    fontFamily: FONTS.POPPINS_MEDIUM,
    color: COLORS.BLACK,
  },
});
export default EventCard;
