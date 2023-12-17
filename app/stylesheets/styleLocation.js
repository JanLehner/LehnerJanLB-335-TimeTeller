import { StyleSheet } from "react-native";

const ClrDarkGreen = "#2da670";
const ClrLightGreen = "#47DF9C";
const ClrDarkGrey = "#1D2731";
const ClrLightGrey = "#33535D";
const ClrBlue = "#12323E";

export const stylesLocation = StyleSheet.create({
  locationView: {
    height: "25%",
    width: "75%",
  },
  locationNameView: {
    flexDirection: "row",
    paddingTop: "5%",
  },
  locationDescription: {
    color: "white",
    fontSize: 20,
  },
  worldEmoji: {
    fontSize: 30,
  },
  locationName: {
    color: "white",
    fontSize: 30,
  },
  timeView: {
    height: "35%",
    width: "75%",
    borderRadius: 10,
    margin: 30,
    backgroundColor: ClrBlue,
  },
  timeText: {
    color: ClrLightGreen,
    fontSize: 40,
  },
  timezoneDescription: {
    color: ClrLightGreen,
    fontSize: 20,
  },
});