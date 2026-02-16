export const getScheduleColors = (color: string) => {
  switch (color) {
    case "orange":
      return { bg: "#FDF5F0", border: "#E35F00" };
    case "green":
      return { bg: "#F1FBF4", border: "#19C34C" };
    case "amber":
      return { bg: "#F9F9F1", border: "#A19712" };
    default:
      return { bg: "white", border: color };
  }
};
export const getIndicatorColor = (ind: string) => {
  switch (ind) {
    case "m":
    case "di":
    case "w":
      return { bg: "#F1FBF4", color: "#37A55C" };
    case "do":
    case "vr":
      return { bg: "#FDF5F0", color: "#E35F00" };
    default:
      return { bg: "#FFEFE7", color: "#F55300" };
  }
};
