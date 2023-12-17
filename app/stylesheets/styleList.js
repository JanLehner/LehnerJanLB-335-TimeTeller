import { StyleSheet } from "react-native";

const ClrDarkGreen = "#2da670";
const ClrLightGreen = "#47DF9C";
const ClrDarkGrey = "#1D2731";
const ClrLightGrey = "#33535D";
const ClrBlue = "#12323E";

export const stylesList = StyleSheet.create({
  //--------Buttons------------
  searchBtn: {
    height: "10%",
    width: "90%",
    flexDirection: "row",
    margin: "5%",
    borderRadius: 5,
    backgroundColor: ClrDarkGreen
  },
  searchBtnText: {
    color: ClrDarkGrey,
    fontSize: 23,
  },
  //---------------------------
  resultScrollView: {
    height: "85%",
    width: "100%",
  },
  statusText: {
    width: "90%",
    marginTop: "5%",
    fontSize: 20,
    textAlign: "center",
    color: ClrDarkGreen,
  },
  listItem: {
    height: 150,
    width: "90%",
    margin: "5%",
    borderRadius: 10,
    backgroundColor: ClrBlue
  },
  listItemTitle: {
    color: ClrLightGreen,
    fontSize: 30
  },
  listItemTimezone: {
    color: ClrLightGreen,
    fontSize: 20
  },
  modalContainer: {
    flex: 1,
    backgroundColor: ClrDarkGrey,
  },
  modalHeader: {
    height: "10%",
    width: "100%",
    marginTop: "3%",
    flexDirection: "row",
  },
  modalBackBtn: {
    height: "80%",
    width: "30%",
    flexDirection: "row",
    borderRadius: 5,
    backgroundColor: ClrDarkGreen,
  },
  modalBackBtnText: {
    color: ClrDarkGrey,
    fontSize: 22
  },
  modalHeaderEmptyHelper: {
    height: "80%",
    width: "60%",
  },
  modalMain: {
    height: "90%",
    width: "100%",
  },
  modalSearchbarView: {
    height: "10%",
    width: "100%",
    flexDirection: "row",
  },
  modalInputField: {
    height: "100%",
    width: "65%",
    fontSize: 20,
    color: ClrLightGreen,
    placeholderTextColor: ClrLightGreen,
    backgroundColor: ClrBlue,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderWidth: 1,
    paddingLeft: "2%",
    borderColor: ClrLightGrey,
  },
  modalSearchBtn: {
    height: "100%",
    width: "25%",
    backgroundColor: ClrBlue,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: ClrLightGrey,
  },
  modalSearchBtnText: {
    fontSize: 20,
    color: ClrLightGreen,
  },
  modalSearchStatus: {
    width: "90%",
    marginTop: "5%",
    fontSize: 20,
    textAlign: "center",
    color: ClrDarkGreen,
  },
  modalItemviewCitynameText: {
    color: "white",
    fontSize: 35,
  },
  modalItemviewTimeView: {
    height: "25%",
    width: "65%",
    borderRadius: 10,
    margin: 30,
    backgroundColor: ClrBlue,
  },
  modalItemviewTimeText: {
    color: ClrLightGreen,
    fontSize: 40,
  },
  modalItemViewTimezoneDescription: {
    color: ClrLightGreen,
    fontSize: 20,
  },
  modalItemviewDeleteBtn: {
    height: "10%",
    width: "40%",
    flexDirection: "row",
    borderRadius: 5,
    backgroundColor: ClrDarkGreen,
  },
  modalItemviewDeleteBtnText: {
    color: ClrDarkGrey,
    fontSize: 22
  },
});