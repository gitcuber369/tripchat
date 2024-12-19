import React, { useState, useCallback, useEffect, useContext } from "react";
import {
  GiftedChat,
  Bubble,
  Avatar,
  Time,
  Send,
  InputToolbar,
} from "react-native-gifted-chat";
import {
  View,
  Text,
  Image,
  Linking,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  SafeAreaView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { useToast } from "react-native-toast-notifications";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

import { COLORS, FONTS, SIZES } from "../../utils/constants";
import { RootStackParamList } from "../../utils/types";
import { adjustSize } from "../../utils/adjustsize";
import { supabase, uploadImage } from "../../utils/supabase";
import { UserContext } from "../../context";
import { usePushNotifications } from "../../context/usePushNotifications";

type Props = {
  navigation: NativeStackScreenProps<RootStackParamList, "Chat">;
  route: RouteProp<RootStackParamList, "Chat">;
};

export default function Chat({ navigation, route }: Props) {
  const { sendPushNotification } = usePushNotifications();
  let { destinations, user } = useContext(UserContext);
  let { id }: any = route.params;
  const toast = useToast();
  const [messages, setMessages] = useState<any>([]);
  const [image, setImage] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [chatDetails, setChatDetails] = useState<any>(null);

  // console.log(id);

  const onSend = useCallback(
    async (messages = []) => {
      try {
        const newMessage = messages[0];
        const { error } = await supabase.from("chats").insert([
          {
            message: newMessage.text,
            user_id: user?.id,
            destination_id: id,
            type: "text",
            created_at: newMessage.createdAt || new Date().toISOString(),
            chatType: "Groups",
          },
        ]);

        if (error) throw error;
        const to = chatDetails?.destination_members.map(
          (userDetails: any) => userDetails.users.expoPushToken !== user?.id
        );
        // console.log(to);
        sendPushNotification({
          to,
          title: "New Message",
          body: newMessage.text,
          chatId: id,
        });
        // setMessages((prevMessages: any) =>
        //   GiftedChat.append(prevMessages, messages)
        // );
      } catch (err: any) {
        console.log("Error sending message:", err.message);
        toast.show(err.message || "Failed to send message!", {
          type: "danger",
        });
      }
    },
    [id]
  );

  const fetchChatMessages = async () => {
    try {
      const { data, error } = await supabase
        .from("chats")
        .select("*")
        .eq("destination_id", id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      const formattedMessages = data.map((message) => ({
        _id: message.id,
        text: message.message,
        createdAt: new Date(message.created_at),
        user: { _id: message.user_id },
      }));

      setMessages(formattedMessages);
    } catch (err: any) {
      console.log("Error fetching messages:", err.message);
      toast.show(err.message || "Failed to load messages!", { type: "danger" });
    }
  };

  const subscribeToRealTimeMessages = () => {
    const channel = supabase
      .channel("realtime:chats")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "chats" },
        (payload) => {
          const newMessage = payload.new;
          setMessages((prevMessages) =>
            GiftedChat.append(prevMessages, {
              _id: newMessage.id,
              text: newMessage.message,
              createdAt: new Date(newMessage.created_at),
              user: { _id: newMessage.user_id },
            })
          );
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  };

  useEffect(() => {
    (async () => {
      fetchChatMessages();
      setChatDetails(destinations.find((destination) => destination.id === id));
      const unsubscribe = subscribeToRealTimeMessages();

      return () => unsubscribe();
    })();
  }, []);

  // const onSend = useCallback((messages = []) => {
  //   setMessages((previousMessages: any) =>
  //     GiftedChat.append(previousMessages, messages)
  //   );
  // }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    if (!result.canceled) {
      try {
        const response = await uploadImage({
          userId: user?.id,
          image: result.assets[0],
          bucket: "chat_images",
        });
        // console.log("======>>>response>>>>=====", response);
        // setImage(result.assets[0].uri);
      } catch (error: any) {
        console.log(error);
      }
    }
  };

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera permissions to make this work!");
      return;
    }
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const renderMessageImage = (props: any) => {
    return (
      <View
        style={{
          padding: 10,
          backgroundColor: "#E9F2FF",
          borderRadius: 17,
          width: 300,
        }}
      >
        <Text
          style={{
            color: COLORS.PRIMARY,
            fontSize: 14,
            marginBottom: 10,
          }}
          onPress={() => Linking.openURL(props.currentMessage.text)}
        >
          {props.currentMessage.text}
        </Text>
        <Image
          source={{ uri: props.currentMessage.image }}
          style={{ width: 200, height: 150, borderRadius: 10 }}
        />
      </View>
    );
  };

  const renderComposer = (props: any) => {
    return (
      <View style={styles.composerContainer}>
        <TouchableOpacity onPress={() => pickImage()}>
          <AntDesign name="plus" size={24} color={COLORS.GRAY_500} />
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          placeholder="Write a message"
          value={props.text}
          onChangeText={(text) => props.onTextChanged(text)}
          multiline
        />
      </View>
    );
  };

  const renderSend = (props: any) => {
    return (
      <Send {...props}>
        <View
          style={{
            height: 55,
            justifyContent: "center",
            alignItems: "center",
            marginRight: SIZES.MARGIN_LARGE,
          }}
        >
          <Feather name="send" size={24} color={COLORS.PRIMARY} />
        </View>
      </Send>
    );
  };

  const renderBubble = (props: any) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: COLORS.PRIMARY,
            borderRadius: 16,
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderBottomRightRadius: 0,
          },
          left: {
            backgroundColor: "#F5F5F5",
            paddingHorizontal: 15,
            paddingVertical: 15,
            borderRadius: 16,
            borderBottomLeftRadius: 0,
          },
        }}
        textStyle={{
          right: {
            color: COLORS.WHITE,
            fontSize: 14,
            fontFamily: FONTS.MEDIUM,
          },
          left: {
            color: COLORS.TEXT_COLOR,
            fontSize: 14,
            fontFamily: FONTS.MEDIUM,
          },
        }}
        containerStyle={{
          right: { marginBottom: 10 },
          left: { marginBottom: 10 },
        }}
        renderMessageText={() => {
          if (!props.currentMessage.carAd) {
            return (
              <Text
                style={{
                  color:
                    props.currentMessage.user._id !== user?.id
                      ? COLORS.BLACK
                      : COLORS.WHITE,
                  fontSize: 15,
                  fontFamily: FONTS.MEDIUM,
                }}
              >
                {props.currentMessage.text}
              </Text>
            );
          }
        }}
      />
    );
  };

  const renderInputToolbar = (props: any) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={styles.inputToolbar}
        // primaryStyle={{ alignItems: "center", borderWidth: 1 }}
      />
    );
  };

  const renderTime = (props: any) => {
    // Remove left side time
    // if (props.currentMessage.user._id !== 1) {
    //   return null;
    // }

    return (
      <Time
        {...props}
        timeTextStyle={{
          right: {
            color: COLORS.WHITE,
            fontSize: 12,
            fontFamily: FONTS.REGULAR,
            marginTop: 10,
          },
          left: {
            color: COLORS.GRAY_300,
            fontSize: 12,
            fontFamily: FONTS.REGULAR,
            marginTop: 10,
          },
        }}
      />
    );
  };

  // console.log(chatDetails?.destination_members);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Entypo name="chevron-small-left" size={24} color={COLORS.BLACK} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ActivityDetails", { ...chatDetails })
          }
        >
          <Image
            source={{ uri: chatDetails?.imageUrl }}
            style={styles.chatImage}
          />
        </TouchableOpacity>
        <View style={styles.chatDetails}>
          <Text style={styles.title}>{chatDetails?.title}</Text>
          <Text style={styles.members}>
            {chatDetails?.destination_members.length} members
          </Text>
        </View>
        <Entypo
          name="dots-three-horizontal"
          size={20}
          color={COLORS.TEXT_COLOR}
        />
        {/* <Menu style={styles.menu}>
          <MenuTrigger>
            <Entypo
              name="dots-three-horizontal"
              size={20}
              color={COLORS.TEXT_COLOR}
            />
          </MenuTrigger>
          <MenuOptions
            customStyles={{ optionsContainer: styles.menuContainer }}
          >
            <MenuOption
              style={[
                styles.menuOption,
                {
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.GRAY_200,
                },
              ]}
            >
              <Text style={styles.menuOptionTxt}>Delete</Text>
            </MenuOption>
            <MenuOption style={styles.menuOption}>
              <Text style={styles.menuOptionTxt}>Block</Text>
            </MenuOption>
          </MenuOptions>
        </Menu> */}
      </View>
      <GiftedChat
        messages={messages}
        onSend={(messages: any) => onSend(messages)}
        user={{
          _id: user?.id!,
          name: user?.username,
        }}
        renderComposer={renderComposer}
        renderSend={renderSend}
        alwaysShowSend
        renderBubble={renderBubble}
        renderAvatar={(props) => null}
        renderTime={renderTime}
        renderInputToolbar={renderInputToolbar}
        renderMessageImage={renderMessageImage}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BACKGROUND_COLOR,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: SIZES.PADDING_MEDIUM,
    paddingVertical: SIZES.PADDING_SMALL + 5,
  },
  chatImage: {
    width: adjustSize(54),
    height: adjustSize(54),
    borderRadius: adjustSize(54 / 2),
    marginLeft: SIZES.MARGIN_MEDIUM,
  },
  backBtn: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.GRAY_200,
    width: 32,
    height: 32,
    borderRadius: adjustSize(10),
  },
  chatDetails: {
    flex: 1,
    marginLeft: SIZES.MARGIN_MEDIUM,
    marginRight: SIZES.MARGIN_SMALL,
  },
  title: {
    color: COLORS.TEXT_COLOR,
    fontFamily: FONTS.BOLD,
    fontSize: SIZES.FONT_MEDIUM - 2,
  },
  members: {
    color: COLORS.GRAY_500,
    fontFamily: FONTS.REGULAR,
    fontSize: SIZES.FONT_SMALL,
    marginTop: SIZES.MARGIN_SMALL,
  },
  inputToolbar: {
    borderTopWidth: 1,
    borderTopColor: "#fff",
    alignItems: "center",
  },
  composerContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    height: 55,
    marginRight: 5,
    paddingHorizontal: SIZES.PADDING_SMALL,
  },
  textInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 15,
    fontSize: 14,
    fontFamily: FONTS.BOLD,
    color: COLORS.TEXT_COLOR,
    textAlignVertical: "center",
    paddingTop: Platform.OS === "ios" ? 12 : 0,
    backgroundColor: COLORS.GRAY_100,
    marginLeft: SIZES.MARGIN_MEDIUM,
    borderRadius: 4,
  },
  attachButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  systemMessageContainer: {
    marginVertical: 10,
  },
  menuOptionTxt: {
    color: COLORS.GRAY_700,
    fontFamily: FONTS.BOLD,
    fontSize: 12,
    lineHeight: 20,
  },
  menu: {},
  menuContainer: {
    borderRadius: 10,
    // paddingHorizontal: SIZES.PADDING_SMALL,
    paddingVertical: 5,
    width: adjustSize(120),
  },
  menuOption: {
    paddingVertical: 5,
    paddingHorizontal: SIZES.PADDING_SMALL,
  },
});
