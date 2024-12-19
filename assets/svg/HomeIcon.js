// import * as React from "react";
// import Svg, { Path } from "react-native-svg";
// const HomeIcon = (props) => (
//   <Svg
//     xmlns="http://www.w3.org/2000/svg"
//     width={27}
//     height={27}
//     fill="none"
//     {...props}
//   >
//     <Path
//       fill={props.color}
//       d="M10.135 17.872a.906.906 0 1 0-1.08 1.456 6.968 6.968 0 0 0 4.165 1.387c1.553 0 2.99-.516 4.165-1.387a.906.906 0 1 0-1.08-1.456 5.155 5.155 0 0 1-3.085 1.03 5.155 5.155 0 0 1-3.085-1.03Z"
//     />
//     <Path
//       fill={props.color}
//       fillRule="evenodd"
//       d="M13.22.777c-.856 0-1.633.245-2.476.655-.816.397-1.758.981-2.934 1.711l-2.497 1.55c-1.113.691-2.004 1.244-2.691 1.77-.712.545-1.258 1.1-1.653 1.821-.394.72-.571 1.485-.656 2.39-.083.877-.083 1.95-.083 3.295v1.948c0 2.3 0 4.117.185 5.537.19 1.456.587 2.632 1.486 3.562.903.934 2.052 1.35 3.474 1.549 1.379.191 3.14.191 5.358.191h4.974c2.219 0 3.98 0 5.358-.191 1.422-.198 2.571-.616 3.474-1.55.899-.93 1.297-2.105 1.486-3.561.185-1.42.185-3.236.185-5.537V13.97c0-1.345 0-2.418-.083-3.295-.085-.905-.262-1.67-.656-2.39-.395-.721-.941-1.276-1.653-1.82-.687-.527-1.578-1.08-2.691-1.77l-2.497-1.55c-1.177-.73-2.118-1.315-2.934-1.712-.843-.41-1.62-.655-2.476-.655ZM8.724 4.71c1.228-.762 2.09-1.296 2.812-1.647.703-.342 1.2-.472 1.684-.472.483 0 .98.13 1.684.472.721.351 1.584.885 2.812 1.647l2.416 1.5c1.161.72 1.976 1.228 2.584 1.693.592.453.932.827 1.165 1.252.233.427.37.926.442 1.69.073.782.074 1.77.074 3.17v1.837c0 2.382-.002 4.08-.17 5.369-.164 1.266-.474 2.001-.99 2.536-.514.53-1.212.845-2.422 1.013-1.239.173-2.873.175-5.178.175h-4.834c-2.305 0-3.94-.002-5.178-.175-1.21-.168-1.908-.483-2.421-1.013-.517-.535-.827-1.27-.992-2.536-.167-1.29-.17-2.987-.17-5.369v-1.838c0-1.4.002-2.387.075-3.17.072-.763.208-1.262.442-1.689.233-.425.573-.799 1.165-1.252.608-.465 1.423-.972 2.584-1.693l2.416-1.5Z"
//       clipRule="evenodd"
//     />
//   </Svg>
// );
// export default HomeIcon;

import * as React from "react";
import Svg, { Path } from "react-native-svg";
const HomeIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill={props.color}
      fillRule="evenodd"
      d="M11.511 1.21a1 1 0 0 1 1.228 0l9 7a1 1 0 0 1 .386.79v11a3 3 0 0 1-3 3h-14a3 3 0 0 1-3-3V9a1 1 0 0 1 .386-.79l9-7ZM4.125 9.49V20a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9.49l-8-6.223-8 6.222Z"
      clipRule="evenodd"
    />
    <Path
      fill={props.color}
      fillRule="evenodd"
      d="M8.125 12a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v10a1 1 0 1 1-2 0v-9h-4v9a1 1 0 1 1-2 0V12Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default HomeIcon;