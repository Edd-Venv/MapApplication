/* eslint-disable import/prefer-default-export */
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
