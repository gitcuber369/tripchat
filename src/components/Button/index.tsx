import React from "react";
import {
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  ActivityIndicator,
} from "react-native";
import { COLORS, FONTS, SIZES } from "../../utils/constants";

const Button = ({
  title,
  customStyles,
  loading = false,
  children,
  ...props
}: {
  title?: string;
  loading: boolean;
  customStyles?: {
    View?: ViewStyle;
    text?: TextStyle;
  };
  children?: React.ReactNode;
} & TouchableOpacity["props"]) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      {...props}
      style={{
        width: "90%",
        backgroundColor: COLORS.PRIMARY,
        alignItems: "center",
        justifyContent: "center",
        height: SIZES.HEIGHT_SMALL + 8,
        borderRadius: 30,
        marginBottom: SIZES.MARGIN_MEDIUM,
        ...customStyles?.View,
        alignSelf: "center",
      }}
    >
      {loading ? (
        <ActivityIndicator color={COLORS.WHITE} size="small" />
      ) : children ? (
        children
      ) : (
        <Text
          style={{
            textAlign: "center",
            color: COLORS.WHITE,
            fontFamily: FONTS.BOLD,
            fontSize: SIZES.FONT_MEDIUM,
            ...customStyles?.text,
          }}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
