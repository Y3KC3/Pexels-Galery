import { useEffect, useState } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Avatar, Button } from "@rneui/themed";

import * as WebBrowser from "expo-web-browser";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

import ImageList from "../components/ImageList";
import { getImages } from "../api/pexels";

const ImagenScreen = ({ route }) => {
  const [photos, setPhotos] = useState([]);

  const loadImages = async () => {
    const result = await getImages();
    setPhotos(result.data.photos);
  };

  useEffect(() => {
    loadImages();
  }, []);

  const { image } = route.params;

  const handlePress = async () =>
    await WebBrowser.openBrowserAsync(image.photographer_url);

  const downloadFile = async () => {
    try {
      const fileUri = FileSystem.documentDirectory + image.id + ".jpeg";

      const { uri } = await FileSystem.downloadAsync(
        image.src.large2x,
        fileUri
      );

      saveFile(uri);
    } catch (e) { console.log(e) };
  };

  const saveFile = async (fileUri) => {
    const { status } = await MediaLibrary.requestPermissionsAsync();

    if (status === "granted") {
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      await MediaLibrary.createAlbumAsync("Download", asset, false);
    }
  };

  return (
    <View style={style.headerPhotographer}>
      <Image
        source={{
          uri: image.src.large2x,
          height: 350,
        }}
      />
      <View style={style.informationContainer}>
        <View style={style.informationSection}>
          <Avatar
            title={image.photographer
              .split(" ")
              .map((string) => string[0])
              .join("")
              .toUpperCase()}
            containerStyle={{ backgroundColor: "#229783" }}
            rounded
          />
          <TouchableOpacity onPress={handlePress}>
            <Text style={style.textPhotographer}>{image.photographer}</Text>
          </TouchableOpacity>
        </View>
        <Button
          title="Download"
          buttonStyle={{ backgroundColor: "#229783" }}
          onPress={downloadFile}
        />
      </View>
      <View>
        <ImageList photos={photos} />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  headerPhotographer: {
    backgroundColor: "#0D0D0D",
    flex: 1,
    flexDirection: "column",
    padding: 10,
  },
  informationContainer: {
    display: "flex",
    paddingVertical: 18,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  informationSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  textPhotographer: {
    color: "#FFFFFF",
    fontWeight: "bold",
    paddingStart: 5,
    fontSize: 18,
  },
});

export default ImagenScreen;
