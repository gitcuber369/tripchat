import React from "react";
import {
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { COLORS, FONTS, SIZES } from "../../utils/constants";

const SubHeading = ({
  heading,
  showSeeAllBtn,
  title,
  customStyles,
  onPress,
  ...props
}: {
  heading?: string;
  txt2?: string;
  showSeeAllBtn?: boolean;
  title?: string;
  onPress?: () => void;
  customStyles?: {
    View?: ViewStyle;
    text1?: TextStyle;
    text2?: TextStyle;
  };
} & View["props"]) => {
  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          alignSelf: "center",
          marginTop: SIZES.MARGIN_EXTRA_LARGE,
          justifyContent: "space-between",
          ...customStyles?.View,
        },
      ]}
    >
      <Text
        style={{
          color: COLORS.TEXT_COLOR,
          fontFamily: FONTS.POPPINS_SEMIBOLD,
          fontSize: SIZES.FONT_MEDIUM,
          ...customStyles?.text1,
        }}
      >
        {heading}
      </Text>
      {showSeeAllBtn && (
        <TouchableOpacity
          activeOpacity={0.8}
          {...props}
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={onPress}
        >
          <Text
            style={{
              color: COLORS.PRIMARY,
              fontFamily: FONTS.POPPINS_MEDIUM,
              fontSize: SIZES.FONT_SMALL + 2,
              lineHeight: 19,
              ...customStyles?.text2,
            }}
          >
            {title}
          </Text>
          <Entypo name="chevron-small-right" size={20} color={COLORS.PRIMARY} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SubHeading;
