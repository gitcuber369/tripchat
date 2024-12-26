import React, { useState, useContext, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useToast } from "react-native-toast-notifications";
import moment from "moment";

import { TabsParamsList } from "../../utils/types";
import { COLORS, SIZES, FONTS } from "../../utils/constants";
import { adjustSize } from "../../utils/adjustsize";
import Input from "../../components/Input";
import { SearchIcon } from "../../../assets/svg";
import { supabase } from "../../utils/supabase";
import { UserContext } from "../../context";

type Props = {
  navigation: NativeStackScreenProps<TabsParamsList, "Chats">;
};

export default function Chats({ navigation }: Props) {
  const { user } = useContext(UserContext);
  const toast = useToast();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [chats, setChats] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchChatRooms = async () => {
    try {
      const { data, error } = await supabase
        .from("destination_members")
        .select(
          `
          destination_id,
          destinations (
            title,
            description,
            imageUrl,
            chats (
              id,
              message,
              created_at,
              type,
              chatType
            )
          )
          `
        )
        .eq("user_id", user?.id) // Filter by current user
        .order("created_at", {
          foreignTable: "destinations.chats",
          ascending: false,
        }); // Order chats by latest message

      if (error) {
        throw error;
      }

      // Map the data to extract relevant fields
      const chatRooms = data.map((room) => ({
        destinationId: room.destination_id,
        destinationName: room.destinations?.title || "Unknown Destination",
        lastMessage: room.destinations?.chats[0]?.message || "",
        lastMessageTime: room.destinations?.chats[0]?.created_at || null,
        type: room.destinations?.chats[0]?.chatType || null,
        imageUrl: room.destinations?.imageUrl || null,
      }));

      setChats([...chatRooms]);
      return chatRooms;
    } catch (err: any) {
      console.log(err.message);
      toast.show(err.message || "Something went wrong!", { type: "danger" });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const subscribeToRealtimeChatRooms = () => {
    const channel = supabase
      .channel("realtime:chats")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "chats" },
        (payload) => {
          console.log("Realtime event received:", payload);
          // Update the chat rooms with the new message
          const newMessage = payload.new;

          setChats((prevChats) => {
            const updatedChats = [...prevChats];
            const chatRoomIndex = updatedChats.findIndex(
              (room) => room.destinationId === newMessage.destination_id
            );

            if (chatRoomIndex !== -1) {
              // Update the last message for the existing chat room
              updatedChats[chatRoomIndex] = {
                ...updatedChats[chatRoomIndex],
                lastMessage: newMessage.message,
                lastMessageTime: newMessage.created_at,
                type: newMessage.chatType,
              };
            } else {
              // Add a new chat room if it doesn't exist
              updatedChats.push({
                destinationId: newMessage.destination_id,
                destinationName: "New Destination", // Fetch destination details if needed
                lastMessage: newMessage.message,
                lastMessageTime: newMessage.created_at,
                type: newMessage.chatType,
                imageUrl: null, // Fetch or set default image if needed
              });
            }

            return updatedChats;
          });
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  };

  useEffect(() => {
    (async () => {
      fetchChatRooms(); // Fetch initial data
      const unsubscribe = subscribeToRealtimeChatRooms(); // Set up realtime updates
      return () => unsubscribe(); // Clean up subscription on unmount
    })();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchChatRooms();
  }, []);

  const filterChats = chats.filter((chat) =>
    chat.destinationName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.conainer}>
      <Text style={styles.heading}>Chats</Text>

      <View style={styles.tabs}>
        {["All", "Groups"].map((time, i) => (
          <TouchableOpacity
            key={i}
            style={[
              styles.tabStyle,
              time === activeTab && styles.activeTabStyle,
            ]}
            onPress={() => setActiveTab(time)}
          >
            <Text
              style={[
                styles.tabTextStyle,
                time === activeTab && styles.activeTextTabStyle,
              ]}
            >
              {time}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Input
        placeholder="Search"
        autoCapitalize="none"
        value={search}
        onChangeText={setSearch}
        leftIcon={<SearchIcon color="#3C3C4399" />}
        customStyle={{
          input: {
            marginLeft: SIZES.MARGIN_MEDIUM,
            fontSize: SIZES.FONT_MEDIUM,
          },
          container: {
            backgroundColor: COLORS.BACKGROUND_COLOR,
            borderWidth: 1,
            borderColor: COLORS.GRAY_200,
            borderRadius: 10,
            height: adjustSize(56),
            marginTop: adjustSize(SIZES.MARGIN_SMALL),
          },
        }}
      />

      <FlatList
        data={filterChats}
        renderItem={({ item }) => {
          if (activeTab === "All" || item.type === activeTab) {
            // console.log(item);
            return (
              <TouchableOpacity
                style={styles.chat}
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate("Chat", { id: item.destinationId })
                }
              >
                <View>
                  {item.active && <View style={styles.active} />}
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={styles.chatImage}
                  />
                </View>
                <View style={styles.chatDetails}>
                  <Text style={styles.title}>{item.destinationName}</Text>
                  <Text
                    style={[
                      styles.lastMessage,
                      !item.isLastMessageRead && {
                        color: COLORS.TEXT_COLOR,
                        fontFamily: FONTS.BOLD,
                      },
                    ]}
                    numberOfLines={1}
                  >
                    {item.lastMessage}
                  </Text>
                </View>
                <View>
                  <Text style={styles.time}>
                    {item?.lastMessageTime &&
                      moment(item?.lastMessageTime).fromNow(true)}
                  </Text>
                  {/* {!item.isLastMessageRead && (
                    <View style={styles.isLastMessageRead} />
                  )} */}
                </View>
              </TouchableOpacity>
            );
          }
          return null; // Render nothing if conditions are not met
        }}
        keyExtractor={(item) => item.destinationId.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.notFoundContainer}>
            {loading ? (
              <ActivityIndicator size="large" color={COLORS.PRIMARY} />
            ) : (
              <Text style={styles.notFoundTxt}>No chats found</Text>
            )}
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  conainer: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_COLOR,
  },
  heading: {
    width: "90%",
    alignSelf: "center",
    marginTop: SIZES.MARGIN_MEDIUM,
    color: COLORS.BLACK,
    fontSize: SIZES.FONT_LARGE,
    fontFamily: FONTS.INTER_MEDIUM,
  },
  tabs: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SIZES.MARGIN_LARGE,
    gap: 5,
    paddingHorizontal: SIZES.PADDING_MEDIUM,
  },
  tabStyle: {
    backgroundColor: COLORS.GRAY_200,
    borderRadius: 10,
    height: adjustSize(39),
    width: adjustSize(73),
    justifyContent: "center",
    alignItems: "center",
    marginRight: SIZES.MARGIN_SMALL,
  },
  activeTabStyle: {
    backgroundColor: COLORS.BLACK,
  },
  tabTextStyle: {
    fontFamily: FONTS.INTER_SEMIBOLD,
    lineHeight: 15,
    fontSize: SIZES.FONT_SMALL,
    color: COLORS.GRAY_700,
  },
  activeTextTabStyle: {
    fontFamily: FONTS.INTER_SEMIBOLD,
    color: COLORS.WHITE,
  },
  listContainer: {
    paddingHorizontal: SIZES.PADDING_MEDIUM,
    paddingBottom: SIZES.PADDING_SMALL,
    marginTop: SIZES.MARGIN_MEDIUM,
  },
  notFoundContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: adjustSize(200),
  },
  notFoundTxt: {
    fontFamily: FONTS.POPPINS_REGULAR,
    color: COLORS.GRAY_500,
  },
  chat: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    paddingVertical: SIZES.PADDING_SMALL + 3,
    borderBottomColor: COLORS.GRAY_200,
  },
  chatImage: {
    width: 48,
    height: 48,
    borderRadius: adjustSize(16),
  },
  chatDetails: {
    flex: 1,
    marginLeft: adjustSize(SIZES.MARGIN_MEDIUM),
  },
  title: {
    color: COLORS.TEXT_COLOR,
    fontFamily: FONTS.BOLD,
    fontSize: SIZES.FONT_SMALL + 2,
  },
  lastMessage: {
    color: COLORS.GRAY_500,
    fontFamily: FONTS.MEDIUM,
    fontSize: SIZES.FONT_SMALL,
    marginTop: SIZES.MARGIN_SMALL,
  },
  isLastMessageRead: {
    width: 10,
    height: 10,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: adjustSize(10 / 2),
    marginTop: SIZES.MARGIN_MEDIUM,
  },
  time: {
    color: COLORS.GRAY_500,
    fontFamily: FONTS.REGULAR,
    fontSize: SIZES.FONT_SMALL,
  },
  active: {
    width: 12,
    height: 12,
    backgroundColor: "#2CC069",
    borderRadius: adjustSize(12 / 2),
    position: "absolute",
    zIndex: 1,
    right: 0,
    borderWidth: 1.5,
    borderColor: COLORS.WHITE,
  },
});
