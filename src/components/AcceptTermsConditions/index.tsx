import React from "react";
import {
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { COLORS, FONTS, SIZES } from "../../utils/constants";
import { adjustSize } from "../../utils/adjustsize";

const AcceptTermsConditions = ({
  txt1,
  txt2,
  txt3,
  customStyles,
  onCheck,
  onPress,
  check,
  ...props
}: {
  txt1?: string;
  txt2?: string;
  txt3?: string;
  onCheck?: () => void;
  onPress?: () => void;
  check: boolean;
  customStyles?: {
    View?: ViewStyle;
    text?: TextStyle;
  };
} & View["props"]) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        width: "90%",
        alignSelf: "center",
        marginTop: SIZES.FONT_MEDIUM,
        marginBottom: SIZES.MARGIN_LARGE,
      }}
    >
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderRadius: adjustSize(20 / 2),
          width: adjustSize(20),
          height: adjustSize(20),
          justifyContent: "center",
          alignItems: "center",
          borderColor: COLORS.TEXT_COLOR,
          backgroundColor: check ? COLORS.TEXT_COLOR : "transparent",
        }}
        onPress={onCheck}
      >
        {check && <AntDesign name="check" size={12} color={COLORS.WHITE} />}
      </TouchableOpacity>
      <Text
        style={{
          marginLeft: SIZES.MARGIN_MEDIUM,
          fontFamily: FONTS.SEMI_BOLD,
          marginRight: SIZES.MARGIN_SMALL,
          fontSize: SIZES.FONT_SMALL + 2,
        }}
      >
        {txt1}
      </Text>
      <TouchableOpacity
        activeOpacity={0.8}
        {...props}
        style={{
          ...customStyles?.View,
        }}
        onPress={onPress}
      >
        <Text
          style={{
            color: COLORS.PRIMARY,
            fontFamily: FONTS.BOLD,
            fontSize: SIZES.FONT_MEDIUM,
            ...customStyles?.text,
          }}
        >
          {txt2}{" "}
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          fontFamily: FONTS.SEMI_BOLD,
          fontSize: SIZES.FONT_SMALL + 2,
        }}
      >
        and
      </Text>
      <TouchableOpacity
        activeOpacity={0.8}
        {...props}
        style={{
          ...customStyles?.View,
        }}
        onPress={onPress}
      >
        <Text
          style={{
            color: COLORS.PRIMARY,
            fontFamily: FONTS.BOLD,
            fontSize: SIZES.FONT_MEDIUM,
            ...customStyles?.text,
          }}
        >
          {" " + txt3}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AcceptTermsConditions;
