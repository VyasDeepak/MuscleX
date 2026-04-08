import { Alert } from "react-native";

export const confirm = (alertMessage, cb, buttons) => {
    Alert.alert(
      'Adpik',
      alertMessage,
      [
        {
          text: "Yes",
          onPress: () => {
            if (cb) cb(true);
          },
        },
        {
          text: "No",
          onPress: () => {
            if (cb) cb(false);
          },
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };
  