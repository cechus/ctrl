import { icons } from "./icons";

export type IconType =
  | "MENU"
  | "HOME"
  | "SETTINGS"
  | "PLUS"
  | "OPTIONS"
  | "FAVORITE"
  | "PLAY"
  | "PAUSE"
  | "STOP"
  | "ARROW_DOWN";

interface IconProps {
  name: IconType;
  color?: string;
  className?: string;
}

export default function Icon({ name, color, className }: IconProps) {
  color = color || "#FFF";
  return (
    <svg
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 24 24"
      className={className}
      // style={{
      //   display: "flex",
      //   justifyContent: "center",
      //   alignItems: "center",
      // }}
    >
      <path d={icons[name]} fill={color} />
    </svg>
  );
}
