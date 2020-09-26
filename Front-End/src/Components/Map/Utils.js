/* eslint-disable comma-dangle */
/* eslint-disable import/prefer-default-export */
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyCt6g43R5qohybxO911L1KQ_WwIsD6hX-8");

export function handleAddressComponent(addressArray, correctAddressType) {
  let addressComponent = "";

  switch (correctAddressType) {
    case "administrative_area_level_2": {
      for (let i = 0; i < addressArray.length; i++) {
        const addressType = addressArray[i].types[0];
        if (addressType && correctAddressType === addressType) {
          addressComponent = addressArray[i].long_name;
        }
      }
      break;
    }
    case "sublocality_level_1": {
      for (let i = 0; i < addressArray.length; i++) {
        const addressType = addressArray[i].types[0];
        if (addressType) {
          for (let j = 0; j < addressArray.length; j++) {
            if (
              correctAddressType === addressType ||
              addressType === "locality"
            ) {
              addressComponent = addressArray[i].long_name;
            }
          }
        }
      }
      break;
    }
    case "administrative_area_level_1": {
      for (let i = 0; i < addressArray.length; i++) {
        const addressType = addressArray[i].types[0];
        if (addressType && addressType === correctAddressType) {
          addressComponent = addressArray[i].long_name;
        }
      }
      break;
    }
    default:
      return addressComponent;
  }

  return addressComponent;
}

async function createGeocodeObject(newLat, newLng) {
  let data;
  await Geocode.fromLatLng(newLat, newLng).then((response) => {
    const address = response.results[0].formatted_address;
    const addressArray = response.results[0].address_components;
    const city = handleAddressComponent(
      addressArray,
      "administrative_area_level_2"
    );
    const area = handleAddressComponent(addressArray, "sublocality_level_1");
    const state = handleAddressComponent(
      addressArray,
      "administrative_area_level_1"
    );

    data = {
      address,
      city,
      area,
      state,
      markerPosition: {
        lat: newLat,
        lng: newLng,
      },
      mapPosition: {
        lat: newLat,
        lng: newLat,
      },
    };
  });
  return data;
}

export async function handleMarkerDragEnd(event) {
  const newLat = event.latLng.lat();
  const newLng = event.latLng.lng();
  const data = await createGeocodeObject(newLat, newLng);
  return data;
}

export async function handleComponentMount(newLat, newLng) {
  const data = await createGeocodeObject(newLat, newLng);
  return data;
}

export function handlePlaceSelected(place) {
  const addressArray = place.address_components;
  const address = place.formatted_address;
  const city = handleAddressComponent(
    addressArray,
    "administrative_area_level_2"
  );
  const area = handleAddressComponent(addressArray, "sublocality_level_1");
  const state = handleAddressComponent(
    addressArray,
    "administrative_area_level_1"
  );
  const newLat = place.geometry.location.lat();
  const newLng = place.geometry.location.lng();
  const data = {
    address,
    city,
    area,
    state,
    markerPosition: {
      lat: newLat,
      lng: newLng,
    },
    mapPosition: {
      lat: newLat,
      lng: newLng,
    },
  };

  return data;
}
