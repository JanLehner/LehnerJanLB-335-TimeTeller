import { View, Text, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import TabbarLocation from "./components/tabbarLocation";
import { styles } from "./stylesheets/style";
import { stylesLocation } from "./stylesheets/styleLocation";
import { formatResult, fetchLocationName, fetchLocationTime } from "./methods/methods";
import * as Location from "expo-location";


export default function LocationScreen() {
  const [locationNameFound, UpdateLocationNameFound] = useState(false);
  const [locationTimeFound, UpdateLocationTimeFound] = useState(false);
  const [locationName, UpdateLocationName] = useState("Your location is being determined...");
  const [locationLatitude, UpdateLocationLatitude] = useState();
  const [locationLongitude, UpdateLocationLongitude] = useState();
  const [timeZone, UpdateTimezone] = useState("Loading...");
  const [second, UpdateSecond] = useState("00");
  const [minute, UpdateMinute] = useState("00");
  const [hour, UpdateHour] = useState("00");

  useEffect(() => {
    const getPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        UpdateLocationName("You denied access to your location.");
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      console.log(currentLocation);
      UpdateLocationLatitude(currentLocation.coords.latitude);
      UpdateLocationLongitude(currentLocation.coords.longitude);
    };
    getPermission();
  }, []);

  useEffect(() => {
    const fetchName = async () => {
      if (locationLatitude !== undefined && locationLongitude !== undefined) {
        const locationNameFetched = await fetchLocationName(
          locationLatitude,
          locationLongitude
        );
        await UpdateLocationName(locationNameFetched);
        UpdateLocationNameFound(true);
      }
    };
    fetchName();
  }, [locationLatitude, locationLongitude]);

  useEffect(() => {
    const fetchTime = async () => {
      if (
        locationName !== "Your location is being determined..." &&
        locationName !== "You denied access to your location." &&
        locationName !== "There was a problem fetching data"
      ) {
        const result = await fetchLocationTime(locationName);
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
  }, [locationNameFound]);

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

  return <View style={styles.container}>
    <StatusBar style="light" backgroundColor="#1D2731" />
    <View style={{ ...styles.flexbox, ...styles.main }}>
      <View style={{ ...styles.flexbox, ...stylesLocation.locationView }}>
        <Text style={stylesLocation.locationDescription}>Current location:</Text>
        <View style={{ ...styles.flexbox, ...stylesLocation.locationNameView }}>
          <Text style={stylesLocation.worldEmoji}>🌍</Text>
          <Text style={stylesLocation.locationName}> {locationName}</Text>
        </View>
      </View>
      <View style={{ ...styles.flexbox, ...stylesLocation.timeView }}>
        <Text style={stylesLocation.timeText}>{hour}:{minute}:{second}</Text>
        <Text style={stylesLocation.timezoneDescription}>Timezone: {timeZone}</Text>
      </View>
    </View>
    <TabbarLocation></TabbarLocation>
  </View>;
}
