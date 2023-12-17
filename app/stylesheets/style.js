import { StyleSheet } from "react-native";

const ClrDarkGreen = "#2da670";
const ClrLightGreen = "#47DF9C";
const ClrDarkGrey = "#1D2731";
const ClrLightGrey = "#33535D";
const ClrBlue = "#12323E";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flexbox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  tabbar: {
    height: '15%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: ClrLightGrey,
  },
  tabbarBtnN: {
    height: "60%",
    width: "45%",
    borderRadius: 10,
  },
  tabbarBtnA: {
    backgroundColor: ClrDarkGreen,
  },
  tabbarBtnP: {
    backgroundColor: ClrLightGreen,
  },
  tabbarBtnText: {
    color: ClrDarkGrey,
    fontSize: 26
  },
  main: {
    height: "85%",
    width: "100%",
    backgroundColor: ClrDarkGrey,
  },
});
