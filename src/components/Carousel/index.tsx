import React, {
  useState,
  useEffect,
  createRef,
  useRef,
  useContext,
} from "react";
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  Text,
} from "react-native";
import { COLORS, FONTS, SIZES } from "../../utils/constants";
import { adjustSize } from "../../utils/adjustsize";
import { UserContext } from "../../context";
import { IUser } from "../../utils/types";

let { width, height } = Dimensions.get("window");

interface Props {
  userData: IUser | null;
}

const CarouselComponent = ({ userData }: Props) => {
  // let { user } = useContext(UserContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(); // Initialize scrollViewRef with createRef
  const images = userData?.profile_pic ?? [
    "https://bzphwlvkfpfmzsbcmrgl.supabase.co/storage/v1/object/public/profile_pictures/user.png",
  ];

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffsetX / width); // Use width instead of 300 for scroll distance
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {images.map((image: any, index: number) => (
          <View key={index} style={styles.imageMain}>
            <View
              style={{
                height: SIZES.HEIGHT_EXTRA_LARGE + 50,
                backgroundColor: "#0000004D",
                position: "absolute",
                zIndex: 1,
                width: "100%",
              }}
            />
            <Image source={{ uri: image }} style={styles.image} />
            <View style={styles.profileDetails}>
              <Text style={styles.name}>{userData?.username}</Text>
              <View>
                <Text style={styles.location}>{userData?.location?.city}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.dotsContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, index === activeIndex && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageMain: {
    width: width,
  },
  image: {
    width: "100%",
    height: SIZES.HEIGHT_EXTRA_LARGE + 50,
    alignSelf: "center",
  },
  dotsContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: adjustSize(50),
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: COLORS.GRAY_300,
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: COLORS.WHITE,
  },
  profileDetails: {
    position: "absolute",
    bottom: adjustSize(65),
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
  },
  name: {
    color: COLORS.WHITE,
    fontFamily: FONTS.BOLD,
    fontSize: SIZES.FONT_EXTRA_LARGE,
  },
  location: {
    color: COLORS.GRAY_100,
    fontFamily: FONTS.REGULAR,
    textTransform: "uppercase",
    fontSize: 12,
  },
});

export default CarouselComponent;
