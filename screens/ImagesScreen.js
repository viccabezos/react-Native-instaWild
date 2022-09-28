import * as FileSystem from "expo-file-system";
import React, { useEffect, useState } from "react";
import { StyleSheet, Image, FlatList, Button, View } from "react-native";

import singleFileUploader from "single-file-uploader";
import Constants from "expo-constants";

export default function ImagesScreen() {
  const [imagesURI, setImagesURI] = useState([]);
  useEffect(() => {
    (async () => {
      const images = await FileSystem.readDirectoryAsync(
        FileSystem.cacheDirectory + "ImageManipulator"
      );
      setImagesURI(images);
    })();
  }, []);
  return imagesURI.length > 0 ? (
    <FlatList
      data={imagesURI}
      keyExtractor={(imageURI) => imageURI}
      renderItem={(itemData) => {
        console.log("item", itemData);
        return (
          <View>
            <Image
              style={styles.image}
              source={{
                uri:
                  FileSystem.cacheDirectory +
                  "ImageManipulator/" +
                  itemData.item,
              }}
            />
            <Button
              title="upload"
              onPress={async () => {
                try {
                  singleFileUploader({
                    distantUrl:
                      "https://wildstagram.nausicaa.wilders.dev/upload",
                    expectedStatusCode: 201,
                    filename: itemData.item,
                    filetype: "image/jpeg",
                    formDataName: "fileData",
                    localUri:
                      FileSystem.cacheDirectory +
                      "ImageManipulator/" +
                      itemData.item,
                    token: Constants.manifest.extra.token,
                  });
                  alert("image Uploaded");
                } catch (err) {
                  alert("error uploading your image");
                }
              }}
            />
          </View>
        );
      }}
    />
  ) : null;
}

const styles = StyleSheet.create({
  image: {
    resizeMode: "cover",
    height: 300,
    flex: 1,
  },
  button: {
    height: 500,
    color: "red",
  },
});
