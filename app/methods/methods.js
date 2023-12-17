export const formatResult = (result) => {
  var updatedResult = "";
  if (result < 10) {
    updatedResult = "0" + result.toString();
  } else {
    updatedResult = result.toString();
  }
  return updatedResult;
};

export const fetchLocationName = async (latitude, longitude) => {
  try {
    const URL = `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`;
    const response = await fetch(URL);
    const json = await response.json();
    if(json.address.village !== null && json.address.village !== undefined){
      return json.address.village;
    }if(json.address.town !== null && json.address.town !== undefined){
      return json.address.town;
    }else{
      return json.address.city;
    }
  } catch (error) {
    console.error(error);
    return "There was a problem fetching data"
  }
};

export const fetchLocationTime = async (locationName) => {
  try {
    const URL = `https://timezone.abstractapi.com/v1/current_time/?api_key=${process.env.EXPO_PUBLIC_API_KEY}&location=${locationName}`;
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data.datetime);
    if (data.datetime == undefined) {
      console.log("city not found");
    } else {
      const dateTimeString = data.datetime;
      const timeString = dateTimeString.split(" ")[1];
      const timeArray = timeString.split(":");
      const result = { timezone: data.timezone_abbreviation, time: timeArray };
      return result;
    }
  } catch (error) {
    console.log("Fetch Error", error);
    const errorResult = { timezone: "Problem while fetching the time", time: [0, 0, 0] };
    return errorResult;
  }
};

export const fetchLocationTimezoneAndName = async (wantedLocation) => {
  try {
    const URL = `https://timezone.abstractapi.com/v1/current_time/?api_key=${process.env.EXPO_PUBLIC_API_KEY}&location=${wantedLocation}`;
    const response = await fetch(URL);
    const data = await response.json();
    if (data.datetime == undefined) {
      const returnCityNotFound = {
        cityname: "The city you entered could not be found.",
        timezone: "1",
      };
      return returnCityNotFound;
    } else {
      const result = {
        cityname: data.requested_location,
        timezone: data.timezone_abbreviation,
      };
      return result;
    }
  } catch (error) {
    console.log("Fetch Error", error);
    const errorResult = {
      cityname: "There was a problem with the API, please try later again.",
      timezone: "2",
    };
    return errorResult;
  }
};