import { View, Text, Pressable, ScrollView, Modal, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import TabbarList from "./components/tabbarList";
import { styles } from "./stylesheets/style";
import { stylesList } from "./stylesheets/styleList";
import { storage } from "./storage/storage";
import { fetchLocationTime, formatResult, fetchLocationTimezoneAndName } from "./methods/methods";

export default function ListScreen() {
  const [isModalSearchVisible, UpdateIsModalSearchVisible] = useState(false);
  const [isModalItemviewVisible, UpdateIsModalItemviewVisible] = useState(false);
  const [dataInformation, UpdateDataInformation] = useState("Loading list elements, please stand by...");
  const [selectedItem, UpdateSelectedItem] = useState({ index: "", cityname: "", timezone: "", });
  const [searchValue, UpdateSearchValue] = React.useState("");
  const [locationListData, UpdateLocationListData] = React.useState([]);
  const [searchStatus, UpdateSearchStatus] = React.useState("Please enter a city name and then click on search.");
  const [timeZone, UpdateTimezone] = useState("Loading...");
  const [second, UpdateSecond] = useState("00");
  const [minute, UpdateMinute] = useState("00");
  const [hour, UpdateHour] = useState("00");
  const [locationTimeFound, UpdateLocationTimeFound] = useState(false);

  useEffect(() => {
    try {
      var dataFromStorage = JSON.parse(storage.getString("locationList"));
      if (dataFromStorage.length == 0) {
        UpdateDataInformation("You have not added any locations to your list. Add some by clicking on the button above.");
      } else {
        UpdateLocationListData(dataFromStorage);
        UpdateDataInformation("");
      }
    } catch {
      const emptyArray = [];
      const serializedEmptyArray = JSON.stringify(emptyArray);
      storage.set("locationList", serializedEmptyArray);
      UpdateDataInformation("You have not added any locations to your list. Add some by clicking on the button above.");
    }
  }, []);

  useEffect(() => {
    const serializedArray = JSON.stringify(locationListData);
    storage.set("locationList", serializedArray);
    if(locationListData.length == 0){
      UpdateDataInformation("You have not added any locations to your list. Add some by clicking on the button above.");
    }else{
      UpdateDataInformation("");
    }
  }, [locationListData]);

  useEffect(() => {
    const fetchTime = async () => {
      if (isModalItemviewVisible == true) {
        const result = await fetchLocationTime(selectedItem.cityname);
        await UpdateTimezone(result.timezone);
        await UpdateHour(result.time[0]);
        await UpdateMinute(result.time[1]);
        await UpdateSecond(result.time[2]);
        if (result.timezone !== "Problem while fetching the time") {
          UpdateLocationTimeFound(true);
        }
      }
    };
    fetchTime();
  }, [isModalItemviewVisible]);

  useEffect(() => {
    if (locationTimeFound == true) {
      const interval = setInterval(() => {
        updateClock();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [locationTimeFound, second, minute, hour]);

  const updateClock = () => {
    const secondNumber = Number(second);
    const minuteNumber = Number(minute);
    const hourNumber = Number(hour);
    if (secondNumber < 59) {
      UpdateSecond(formatResult(secondNumber + 1));
    } else {
      UpdateSecond("00");
      if (minuteNumber < 59) {
        UpdateMinute(formatResult(minuteNumber + 1));
      } else {
        UpdateMinute("00");
        if (hourNumber < 23) {
          UpdateHour(formatResult(hourNumber + 1));
        } else {
          UpdateHour("00");
        }
      }
    }
  };

  const addALocation = (citynameGiven, timezoneGiven) => {
    const itemToAdd = { cityname: citynameGiven, timezone: timezoneGiven };
    const updatedLocationList = [itemToAdd, ...locationListData];
    UpdateLocationListData(updatedLocationList);
  };

  const removeALocation = () => {
    const updatedLocationList = [];
    locationListData.forEach((item) => {
      if (item !== locationListData[selectedItem.index]) {
        updatedLocationList.push(item);
      }
    });
    UpdateLocationListData(updatedLocationList);
  }

  const resetModalAddACity = () => {
    UpdateSearchStatus("Please enter a city name and then click on search.");
    UpdateSearchValue("");
    UpdateIsModalSearchVisible(false);
  };

  const resetModalItemview = () => {
    UpdateIsModalItemviewVisible(false);
    UpdateSelectedItem({ index: "", cityname: "", timezone: "", });
  };

  const openItem = (indexGiven, citynameGiven, timezoneGiven) => {
    UpdateSelectedItem({
      index: indexGiven,
      cityname: citynameGiven,
      timezone: timezoneGiven,
    });
    UpdateIsModalItemviewVisible(true);
  };

  const clickOnSearch = async () => {
    if (searchValue !== "" && searchValue !== " ") {
      const fetchedData = await fetchLocationTimezoneAndName(searchValue);
      if (fetchedData.timezone == "1" || fetchedData.timezone == "2") {
        UpdateSearchStatus(fetchedData.cityname);
      } else {
        addALocation(fetchedData.cityname, fetchedData.timezone);
        resetModalAddACity();
      }
    }
  };

  const clickOnDelete = async () => {
    await removeALocation();
    resetModalItemview();
  }

  return <View style={styles.container}>
    <StatusBar style="light" backgroundColor="#1D2731" />
    <View style={{ ...styles.flexbox, ...styles.main }}>
      <Pressable style={{ ...styles.flexbox, ...stylesList.searchBtn }} onPress={() => UpdateIsModalSearchVisible(true)}>
        <Text style={stylesList.searchBtnText}>Add a new location... 🔎</Text>
      </Pressable>
      <ScrollView
        style={stylesList.resultScrollView}
        contentContainerStyle={{
          display: "flex", justifyContent: "center", alignItems: "center",
        }}
      >
        <Text style={stylesList.statusText}>{dataInformation}</Text>
        {locationListData.length > 0 &&
          locationListData.map((item, index) => (
            <Pressable
              style={{ ...styles.flexbox, ...stylesList.listItem }}
              key={index}
              onPress={() => openItem(index, item.cityname, item.timezone)}
            >
              <Text style={stylesList.listItemTitle}>{item.cityname}</Text>
              <Text style={stylesList.listItemTimezone}>
                Timezone: {item.timezone}
              </Text>
            </Pressable>
          ))}
      </ScrollView>
    </View>
    <TabbarList></TabbarList>
    {/*--------------------------Search modal starts here/*--------------------------*/}
    <Modal visible={isModalSearchVisible} animationType="slide">
      <View style={stylesList.modalContainer}>
        <View style={{ ...styles.flexbox, ...stylesList.modalHeader }}>
          <Pressable style={{ ...styles.flexbox, ...stylesList.modalBackBtn }} onPress={resetModalAddACity}>
            <Text style={stylesList.modalBackBtnText}>Cancel</Text>
          </Pressable>
          <View style={stylesList.modalHeaderEmptyHelper}></View>
        </View>
        <View style={{ ...styles.flexbox, ...stylesList.modalMain }}>
          <View style={{ ...styles.flexbox, ...stylesList.modalSearchbarView }}>
            <TextInput
              style={stylesList.modalInputField}
              onChangeText={UpdateSearchValue}
              value={searchValue}
              placeholder="Enter a city name..."
            />
            <Pressable style={{ ...styles.flexbox, ...stylesList.modalSearchBtn }} onPress={clickOnSearch}>
              <Text style={stylesList.modalSearchBtnText}>Search 🔎</Text>
            </Pressable>
          </View>
          <Text style={stylesList.modalSearchStatus}>{searchStatus}</Text>
        </View>
      </View>
    </Modal>
    {/*--------------------------Itemview modal starts here/*--------------------------*/}
    <Modal visible={isModalItemviewVisible} animationType="slide">
      <View style={stylesList.modalContainer}>
        <View style={{ ...styles.flexbox, ...stylesList.modalHeader }}>
          <Pressable style={{ ...styles.flexbox, ...stylesList.modalBackBtn }} onPress={resetModalItemview}>
            <Text style={stylesList.modalBackBtnText}>Back</Text>
          </Pressable>
          <View style={stylesList.modalHeaderEmptyHelper}></View>
        </View>
        <View style={{ ...styles.flexbox, ...stylesList.modalMain }}>
          <Text style={stylesList.modalItemviewCitynameText}>{selectedItem.cityname}</Text>
          <View style={{ ...styles.flexbox, ...stylesList.modalItemviewTimeView }}>
            <Text style={stylesList.modalItemviewTimeText}>{hour}:{minute}:{second}</Text>
            <Text style={stylesList.modalItemViewTimezoneDescription}>Timezone: {timeZone}</Text>
          </View>
          <Pressable style={{ ...styles.flexbox, ...stylesList.modalItemviewDeleteBtn }}  onPress={clickOnDelete}>
            <Text style={stylesList.modalItemviewDeleteBtnText}>Delete</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  </View>;
}
