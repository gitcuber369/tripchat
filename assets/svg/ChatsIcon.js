import * as React from "react";
import Svg, { Path } from "react-native-svg";
const ChatsIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={19}
    height={18}
    fill="none"
    {...props}
  >
    <Path
      fill={props.color}
      d="m5.676 14.829.654.349A6.96 6.96 0 0 0 9.622 16h.003a7 7 0 1 0-7-7v.003a6.96 6.96 0 0 0 .822 3.292l.35.654-.538 2.417 2.417-.537ZM.625 18l1.058-4.762A9 9 0 0 1 9.625 0a9 9 0 0 1 9 9 9 9 0 0 1-13.238 7.942L.625 18Z"
    />
  </Svg>
);
export default ChatsIcon;
