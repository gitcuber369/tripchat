import { Dimensions } from "react-native";

// Get screen dimensions
const { width: SCREEN_WIDTH } = Dimensions.get("window");

// Define the base width (adjust this if you have a different reference device)
const BASE_WIDTH = 375;

// Function to adjust size based on screen width
export const adjustSize = (size: number) => {
  return size * (SCREEN_WIDTH / BASE_WIDTH);
};
