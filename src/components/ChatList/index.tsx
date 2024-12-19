// import React from "react";
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   Dimensions,
//   TouchableOpacity,
//   ImageBackground,
//   Button
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import Carousel from "react-native-reanimated-carousel";
// import Entypo from "@expo/vector-icons/Entypo";
// import { useNavigation } from "@react-navigation/native";

// import { COLORS, FONTS, SIZES } from "../../utils/constants";
// import { INearbyChats } from "../../utils/types";
// import { adjustSize } from "../../utils/adjustsize";

// const { width } = Dimensions.get("window");

// interface Props {
//   data: INearbyChats[];
// }

// const ChatList = ({ data }: Props) => {
//   const navigation = useNavigation<any>();
//   return (
//     <View style={styles.container}>
//       <Carousel
//         loop
//         width={width}
//         height={300}
//         autoPlay={true}
//         data={data}
//         scrollAnimationDuration={1000}
//         // onSnapToItem={(index) => console.log("current index:", index)}
//         mode="parallax"
//         renderItem={({ item, index }) => (
//           <TouchableOpacity
//             style={styles.card}
//             activeOpacity={0.5}
//             onPress={() => navigation.navigate("ActivityDetails", { ...item })}
//             key={index}
//           >
//             <ImageBackground
//               source={{ uri: item.imageUrl }}
//               style={styles.imageBackground}
//             >
//               <LinearGradient
//                 colors={["#00000099", "#1D1D1D99", "#42424299"]}
//                 style={styles.background}
//               >
//                 <Text style={styles.name}>{item.name}</Text>
//                 <View style={styles.members}>
//                   {item.members.map((student, i) => (
//                     <Image
//                       source={{ uri: student.profileUrl }}
//                       style={styles.studentProfile}
//                       key={i}
//                     />
//                   ))}
//                 </View>
//                 <Text style={styles.plusMembersTxt}>145+ members</Text>
//                 <TouchableOpacity style={styles.joinBtn}>
//                   <View style={styles.subBtn}>
//                     <Entypo
//                       name="chevron-small-right"
//                       size={24}
//                       color="black"
//                     />
//                   </View>
//                   <Text style={styles.joinBtnTxt}>Join Chat</Text>
//                 </TouchableOpacity>
//               </LinearGradient>
//             </ImageBackground>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     // flex: 1,
//     justifyContent:"center",
//     alignItems:"center",
//     marginTop:SIZES.MARGIN_MEDIUM
//   },
//   card: {
//     borderRadius: 20,
//     backgroundColor: COLORS.GRAY_200,
//     height: adjustSize(300),
//     overflow: "hidden",
//     width: width-50,
//     alignSelf:"center"
//   },
//   imageBackground: {
//     height: adjustSize(300),
//   },
//   background: {
//     height: adjustSize(300),
//     padding: adjustSize(SIZES.PADDING_MEDIUM),
//   },
//   name: {
//     color: COLORS.WHITE,
//     fontFamily: FONTS.POPPINS_MEDIUM,
//     fontSize: SIZES.FONT_LARGE,
//   },
//   studentProfile: {
//     width: 30,
//     height: 30,
//     borderRadius: 30 / 2,
//   },
//   members: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: SIZES.MARGIN_SMALL,
//   },
//   plusMembersTxt: {
//     color: COLORS.GRAY_100,
//   },
//   joinBtn: {
//     position: "absolute",
//     bottom: 20,
//     width: "95%",
//     backgroundColor: "#646464B2",
//     alignSelf: "center",
//     height: adjustSize(48),
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: adjustSize(30),
//     elevation: 10,
//     flexDirection: "row",
//     paddingHorizontal: 5,
//   },
//   subBtn: {
//     width: adjustSize(40),
//     height: adjustSize(40),
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: COLORS.WHITE,
//     borderRadius: adjustSize(40 / 2),
//   },
//   joinBtnTxt: {
//     color: "#E4E4E4",
//     flex: 1,
//     textAlign: "center",
//     fontFamily: FONTS.SEMI_BOLD,
//     fontSize: SIZES.FONT_MEDIUM,
//   },
// });

// export default ChatList;

// import React, { useRef, useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   ImageBackground,
//   StyleSheet,
//   Dimensions,
//   FlatList,
//   TouchableOpacity,
//   Animated,
//   Image,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import Entypo from "@expo/vector-icons/Entypo";
// import { useNavigation } from "@react-navigation/native";

// import { COLORS, FONTS, SIZES } from "../../utils/constants";
// import { INearbyChats } from "../../utils/types";
// import { adjustSize } from "../../utils/adjustsize";

// const { width } = Dimensions.get("window");
// const ITEM_WIDTH = width * 0.8;
// const SPACING = 20;

// interface Props {
//   data: INearbyChats[];
// }

// const ChatList = ({ data }: Props) => {
//   const navigation = useNavigation<any>();
//   const scrollX = useRef(new Animated.Value(0)).current;
//   const flatListRef = useRef<FlatList<any>>(null);
//   const [activeIndex, setActiveIndex] = useState(0);

//   const handleScroll = Animated.event(
//     [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//     { useNativeDriver: false }
//   );

//   const handleMomentumScrollEnd = (event: any) => {
//     const newIndex = Math.round(
//       event.nativeEvent.contentOffset.x / (ITEM_WIDTH + SPACING)
//     );
//     setActiveIndex(newIndex);
//   };

//   // Autoplay logic
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const nextIndex = (activeIndex + 1) % data.length; // Loop back to the first item
//       flatListRef.current?.scrollToOffset({
//         offset: nextIndex * (ITEM_WIDTH + SPACING),
//         animated: true,
//       });
//       setActiveIndex(nextIndex);
//     }, 3000); // Change slide every 3 seconds

//     return () => clearInterval(interval); // Cleanup interval on component unmount
//   }, [activeIndex, data.length]);

//   const renderItem = ({
//     item,
//     index,
//   }: {
//     item: INearbyChats;
//     index: number;
//   }) => {
//     const inputRange = [
//       (index - 1) * (ITEM_WIDTH + SPACING),
//       index * (ITEM_WIDTH + SPACING),
//       (index + 1) * (ITEM_WIDTH + SPACING),
//     ];

//     const scale = scrollX.interpolate({
//       inputRange,
//       outputRange: [0.9, 1, 0.9],
//       extrapolate: "clamp",
//     });

//     return (
//       <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
//         <TouchableOpacity
//           style={styles.card}
//           activeOpacity={0.5}
//           onPress={() => navigation.navigate("ActivityDetails", { ...item })}
//           key={index}
//         >
//           <ImageBackground
//             source={{ uri: item.imageUrl }}
//             style={styles.imageBackground}
//           >
//             <LinearGradient
//               colors={["#00000099", "#1D1D1D99", "#42424299"]}
//               style={styles.background}
//             >
//               <Text style={styles.time}>Morning</Text>
//               <Text style={styles.name}>{item.name}</Text>
//               <View style={styles.members}>
//                 {item.members.map((student: any, i: number) => (
//                   <Image
//                     source={{ uri: student.profileUrl }}
//                     style={styles.studentProfile}
//                     key={i}
//                   />
//                 ))}
//               </View>
//               <Text style={styles.plusMembersTxt}>145+ members</Text>
//               <TouchableOpacity style={styles.joinBtn}>
//                 <View style={styles.subBtn}>
//                   <Entypo name="chevron-small-right" size={24} color="black" />
//                 </View>
//                 <Text style={styles.joinBtnTxt}>Join Chat</Text>
//               </TouchableOpacity>
//             </LinearGradient>
//           </ImageBackground>
//         </TouchableOpacity>
//       </Animated.View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Animated.FlatList
//         ref={flatListRef}
//         data={data}
//         keyExtractor={(item, index) => `carousel-item-${index}`}
//         renderItem={renderItem}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={{ paddingHorizontal: SPACING / 2 }}
//         snapToInterval={ITEM_WIDTH + SPACING}
//         decelerationRate="fast"
//         scrollEventThrottle={16}
//         onScroll={handleScroll}
//         onMomentumScrollEnd={handleMomentumScrollEnd}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginTop: SIZES.MARGIN_MEDIUM,
//   },
//   card: {
//     borderRadius: 20,
//     backgroundColor: COLORS.GRAY_200,
//     height: adjustSize(300),
//     overflow: "hidden",
//     width: width - 50,
//     alignSelf: "center",
//   },
//   imageBackground: {
//     height: adjustSize(300),
//   },
//   background: {
//     height: adjustSize(300),
//     padding: adjustSize(SIZES.PADDING_MEDIUM - 5),
//   },
//   name: {
//     color: COLORS.WHITE,
//     fontFamily: FONTS.POPPINS_MEDIUM,
//     fontSize: SIZES.FONT_LARGE,
//   },
//   studentProfile: {
//     width: 30,
//     height: 30,
//     borderRadius: 30 / 2,
//   },
//   members: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: SIZES.MARGIN_SMALL,
//   },
//   plusMembersTxt: {
//     color: COLORS.GRAY_100,
//   },
//   joinBtn: {
//     position: "absolute",
//     bottom: 20,
//     width: "95%",
//     backgroundColor: "#646464B2",
//     alignSelf: "center",
//     height: adjustSize(48),
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: adjustSize(30),
//     elevation: 10,
//     flexDirection: "row",
//     paddingHorizontal: 5,
//   },
//   subBtn: {
//     width: adjustSize(40),
//     height: adjustSize(40),
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: COLORS.WHITE,
//     borderRadius: adjustSize(40 / 2),
//   },
//   joinBtnTxt: {
//     color: "#E4E4E4",
//     flex: 1,
//     textAlign: "center",
//     fontFamily: FONTS.SEMI_BOLD,
//     fontSize: SIZES.FONT_MEDIUM,
//   },
//   time: {
//     fontFamily: FONTS.MEDIUM,
//     color: COLORS.GRAY_300,
//     fontSize: SIZES.FONT_SMALL + 2,
//   },
// });

// export default ChatList;

import React, { useRef, useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Animated,
  Image,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Entypo from "@expo/vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";

import { COLORS, FONTS, SIZES } from "../../utils/constants";
import { INearbyChats } from "../../utils/types";
import { adjustSize } from "../../utils/adjustsize";
import { supabase } from "../../utils/supabase";
import { UserContext } from "../../context";

const { width } = Dimensions.get("window");

interface Props {
  data: INearbyChats[];
}

const ITEM_WIDTH = width * 0.7; // Reduce width to allow side cards to show
const SPACING = 10;
const SIDE_CARD_WIDTH = (width - ITEM_WIDTH) / 2; // Calculate side spacing for centering

const ChatList = ({ data }: Props) => {
  const { user, fetchDestinationsWithMembers } = useContext(UserContext);
  const navigation = useNavigation<any>();
  const toast = useToast();
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList<any>>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const handleMomentumScrollEnd = (event: any) => {
    const newIndex = Math.round(
      event.nativeEvent.contentOffset.x / (ITEM_WIDTH + SPACING)
    );
    setActiveIndex(newIndex);
  };

  const joinDestination = async (id: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("destination_members")
        .insert({ user_id: user?.id, destination_id: id });
      if (error) {
        throw error;
      }
      console.log(data);
      fetchDestinationsWithMembers();
      toast.show("Joined successfully!", { type: "success" });
    } catch (error: any) {
      console.log(error);
      toast.show(error.message || "Something went wrong!", { type: "danger" });
    } finally {
      setLoading(false);
    }
  };

  // Autoplay logic
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % data.length;
      flatListRef.current?.scrollToOffset({
        offset: nextIndex * (ITEM_WIDTH + SPACING),
        animated: true,
      });
      setActiveIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex, data.length]);

  const renderItem = ({
    item,
    index,
  }: {
    item: INearbyChats;
    index: number;
  }) => {
    const inputRange = [
      (index - 1) * (ITEM_WIDTH + SPACING),
      index * (ITEM_WIDTH + SPACING),
      (index + 1) * (ITEM_WIDTH + SPACING),
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.9, 1, 0.9],
      extrapolate: "clamp",
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.7, 1, 0.7],
      extrapolate: "clamp",
    });

    // Function to check if a city exists
    const doesUserExist = (userId: string | undefined) => {
      return item?.destination_members.some((item) => item.user_id === userId);
    };

    return (
      <Animated.View
        style={[
          styles.card,
          { transform: [{ scale }], opacity, marginHorizontal: SPACING / 2 },
        ]}
      >
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.5}
          onPress={() => navigation.navigate("ActivityDetails", { ...item })}
        >
          <ImageBackground
            source={{ uri: item.imageUrl }}
            style={styles.imageBackground}
          >
            <LinearGradient
              colors={["#00000099", "#1D1D1D99", "#42424299"]}
              style={styles.background}
            >
              <Text style={styles.time}>{item.time}</Text>
              <Text style={styles.name}>{item.title}</Text>
              <View style={styles.members}>
                {item?.destination_members &&
                  item?.destination_members.map((student: any, i: number) => {
                    // console.log(student.users);
                    return (
                      <TouchableOpacity
                        key={i}
                        onPress={() => {
                          if (student.user_id !== user?.id) {
                            navigation.navigate("UserProfile", {
                              id: student.user_id,
                            });
                          } else {
                            navigation.navigate("Profile");
                          }
                        }}
                      >
                        <Image
                          source={{
                            uri:
                              student?.users && student?.users?.profile_pic
                                ? student?.users?.profile_pic[0]
                                : "https://bzphwlvkfpfmzsbcmrgl.supabase.co/storage/v1/object/public/profile_pictures/user.png",
                          }}
                          style={styles.studentProfile}
                        />
                      </TouchableOpacity>
                    );
                  })}
              </View>
              {item?.destination_members.length !== 0 && (
                <Text style={styles.plusMembersTxt}>
                  {item?.destination_members?.length > 10
                    ? `${item.destination_members.length}+ members`
                    : `${item.destination_members.length} members`}
                </Text>
              )}
              <TouchableOpacity
                style={styles.joinBtn}
                // onPress={() => joinDestination(item.id)}
                onPress={() =>
                  doesUserExist(user?.id)
                    ? navigation.navigate("Chat", { id: item.id })
                    : joinDestination(item.id)
                }
                disabled={loading}
              >
                {doesUserExist(user?.id) ? (
                  <Text style={styles.joinBtnTxt}>Chat</Text>
                ) : (
                  <>
                    <View style={styles.subBtn}>
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="black"
                      />
                    </View>
                    {loading ? (
                      <View
                        style={{
                          flex: 1,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <ActivityIndicator color={COLORS.WHITE} size="small" />
                      </View>
                    ) : (
                      <Text style={styles.joinBtnTxt}>Join Chat</Text>
                    )}
                  </>
                )}
              </TouchableOpacity>
            </LinearGradient>
          </ImageBackground>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(item, index) => `carousel-item-${index}`}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: SIDE_CARD_WIDTH, // Ensure proper spacing for side cards
        }}
        snapToInterval={ITEM_WIDTH + SPACING}
        decelerationRate="fast"
        scrollEventThrottle={16}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleMomentumScrollEnd}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.MARGIN_MEDIUM,
  },
  card: {
    borderRadius: 20,
    backgroundColor: COLORS.GRAY_200,
    height: adjustSize(300),
    overflow: "hidden",
    width: ITEM_WIDTH,
    alignSelf: "center",
    // borderWidth: 1,
    // borderColor: "red",
  },
  imageBackground: {
    height: adjustSize(300),
  },
  background: {
    height: adjustSize(300),
    padding: adjustSize(SIZES.PADDING_MEDIUM - 5),
  },
  name: {
    color: COLORS.WHITE,
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: SIZES.FONT_LARGE,
  },
  studentProfile: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
  },
  members: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SIZES.MARGIN_SMALL,
  },
  plusMembersTxt: {
    color: COLORS.GRAY_100,
  },
  joinBtn: {
    position: "absolute",
    bottom: 20,
    width: "95%",
    backgroundColor: "#646464B2",
    alignSelf: "center",
    height: adjustSize(48),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: adjustSize(30),
    elevation: 10,
    flexDirection: "row",
    paddingHorizontal: 5,
  },
  subBtn: {
    width: adjustSize(40),
    height: adjustSize(40),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.WHITE,
    borderRadius: adjustSize(40 / 2),
  },
  joinBtnTxt: {
    color: "#E4E4E4",
    flex: 1,
    textAlign: "center",
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: SIZES.FONT_MEDIUM,
  },
  time: {
    fontFamily: FONTS.MEDIUM,
    color: COLORS.GRAY_300,
    fontSize: SIZES.FONT_SMALL + 2,
  },
});

export default ChatList;
