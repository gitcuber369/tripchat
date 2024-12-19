import "react-native-url-polyfill/auto";
// import { decode } from "base64-arraybuffer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { decode } from "base64-arraybuffer";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { ImagePickerAsset } from "expo-image-picker";

// dLrjF5QJd1HqvFzA;
const supabaseUrl = "https://bzphwlvkfpfmzsbcmrgl.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6cGh3bHZrZnBmbXpzYmNtcmdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIxNzcxODYsImV4cCI6MjA0Nzc1MzE4Nn0.m5amtAbGwnzqEXh2QaVOVyjkX40AZA7VJmIwJL7J9m4";

export const supabase = createClient<any>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// export const getLoggedInUser = async (): Promise<IUser | null | undefined> => {
//   const { data, error } = await supabase.auth.getUser();

//   if (error) return;

//   const user = await supabase
//     .from("users")
//     .select("*")
//     .eq("id", data.user?.id)
//     .single();
//   return user.data;
// };

interface IUploadImage {
  userId: string;
  image: ImagePickerAsset;
  bucket: "chat_images" | "profile_pictures";
}

// export const uploadImage = async (payload: IUploadImage): Promise<string> => {
//   try {
//     if (!payload.image.uri || !payload.bucket || !payload.userId) {
//       throw new Error("Invalid payload: Missing required fields.");
//     }

//     const fileName: string = payload.image.uri.split("/").pop() || "image";
//     const fileExtension = fileName.split(".").pop()?.toLowerCase();

//     if (
//       !fileExtension ||
//       !["jpg", "jpeg", "png", "gif", "webp"].includes(fileExtension)
//     ) {
//       throw new Error("Invalid file type. Only image files are allowed.");
//     }

//     const contentType = `image/${fileExtension}`;
//     const base64Image = payload.image.base64 || "";

//     // Decode Base64 image
//     const imageBuffer = decode(base64Image);

//     // Upload image
//     const result = await supabase.storage
//       .from(payload.bucket)
//       .upload(
//         `${payload.userId}/${new Date().toISOString()}_${fileName}`,
//         imageBuffer,
//         { contentType }
//       );

//     if (!result.data?.path) {
//       throw new Error("Image upload failed.");
//     }

//     // Retrieve public URL
//     const publicUrl = supabase.storage
//       .from(payload.bucket)
//       .getPublicUrl(result.data.path);

//     if (!publicUrl.data?.publicUrl) {
//       throw new Error("Failed to retrieve public URL.");
//     }

//     return publicUrl.data.publicUrl;
//   } catch (err: any) {
//     console.error("Error uploading image:", err.message || err);
//     throw new Error(
//       err.message || "An unexpected error occurred while uploading the image."
//     );
//   }
// };

export const uploadImage = async (payload: IUploadImage): Promise<string> => {
  try {
    const fileName: string = payload.image.uri.split("/").pop() || "";
    const fileExtension = fileName && fileName.split(".").pop()?.toLowerCase();
    const type = `image/${fileExtension}`;
    const base64Image = payload.image.base64 || "";

    const result = await supabase.storage
      .from(payload.bucket)
      .upload(
        `${payload.userId}/${new Date().toISOString()}_${fileName}`,
        decode(base64Image),
        {
          contentType: type,
        }
      );

    const imageUrlInStorage = result.data?.path || "";

    const publicUrl = await supabase.storage
      .from(payload.bucket)
      .getPublicUrl(imageUrlInStorage);
    // console.log(result);

    return publicUrl.data.publicUrl;
  } catch (err: any) {
    throw err;
  }
};

// export const joinDestination = async (
//   userId: string,
//   destinationId: string
// ) => {
//   try {
//     const { data, error } = await supabase
//       .from("destination_members")
//       .insert({ user_id: userId, destination_id: destinationId });

//     if (error) {
//       throw new Error("Error joining destination:", error);
//       // console.error("Error joining destination:", error);
//     } else {
//       return data;
//     }
//   } catch (error) {
//     throw error;
//   }
// };
