import React from "react";
import { WebView } from "react-native-webview";

import { CloseButton, Name } from "./styles";

import { Feather } from "@expo/vector-icons";

function ModalLink({ link, title, closeModal }) {
  return (
    <>
      <CloseButton activeOpacity={0.8} onPress={closeModal}>
        <Feather name="x" size={35} color="#fff" />

        <Name numberOfLines={1}>{title}</Name>
      </CloseButton>

      <WebView source={{ uri: link }} />
    </>
  );
}

export default ModalLink;
