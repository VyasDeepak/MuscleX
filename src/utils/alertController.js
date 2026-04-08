import React from "react";
import { Alert } from "react-native";
import * as Helper from "../utils/helper";
const permissionConfirm = (alertMessage, cb) => {
  Alert.alert(
    'Adpik',
    
    alertMessage,
    [
      {
        text: "NOT NOW",
        onPress: () => {
            Helper.appIsBackground=false
          if (cb) cb(false);
        },
        style: "cancel",
      },
      {
        text: "SETTINGS",
        onPress: () => {
          setTimeout(() => {
            Helper.appIsBackground=false
          }, 1000);
          if (cb) cb(true);
        },
      },
    ],
    { cancelable: false }
  );
};

const alert = (alertMessage, cb) => {
  Alert.alert(
    AppConstant.appName,
    alertMessage,
    [
      {
        text: "OK",
        onPress: () => {
          if (cb) cb(true);
        },
      },
    ],
    { cancelable: false }
  );
};
const confirm = (alertMessage, cb) => {
  Alert.alert(
    'Build Jahaan',
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

export { permissionConfirm, alert, confirm };
