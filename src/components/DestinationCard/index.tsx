import React from "react";
import { TextStyle, TouchableOpacity, ViewStyle } from "react-native";

const DestinationCard = ({
  title,
  customStyles,
  loading = false,
  ...props
}: {
  title: string;
  loading: boolean;
  customStyles?: {
    View?: ViewStyle;
    text?: TextStyle;
  };
} & TouchableOpacity["props"]) => {
  return (
    <>
      <TouchableOpacity activeOpacity={0.8} {...props}></TouchableOpacity>
    </>
  );
};

export default DestinationCard;
