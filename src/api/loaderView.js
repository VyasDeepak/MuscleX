import React, { useState, useImperativeHandle, forwardRef } from "react";
import { View, Modal, ActivityIndicator } from "react-native";
import { useUserStore } from "../zustand/userStore";

const LoaderView = () => {
  const { loading } = useUserStore();
  return (
    loading && (
      <>
        <Modal
          animationType="fade"
          statusBarTranslucent
          navigationBarTranslucent
          transparent={true}
          visible={loading}
          onRequestClose={() => {
            console.log("back press");
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.7)",
            }}>
            <ActivityIndicator size="large" color={"#FF2D81"} />
          </View>
        </Modal>
      </>
    )
  );
};
export default LoaderView;
