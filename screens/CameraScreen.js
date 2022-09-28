import { useEffect, useRef, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Camera } from "expo-camera";
import * as ImageManipulator from "expo-image-manipulator";
export default function CameraScreen() {
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <>
      <Camera style={styles.camera} ref={cameraRef} />
      <Button
        style={styles.button}
        title="Press me"
        onPress={async () => {
          const pictureMetaData = await cameraRef.current.takePictureAsync();

          console.log("picture metadata", pictureMetaData);
          console.log(
            await ImageManipulator.manipulateAsync(pictureMetaData.uri, [
              { resize: { width: 800 } },
            ])
          );
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  button: {
    color: "red",
    height: 480,
  },
});
