// import { FlatList, Image, StyleSheet, Text, View } from "react-native";
// import axios from "axios";
// import { useEffect, useState } from "react";

// export default function FeedScreen() {
//   const [data, setData] = useState([]);
//   useEffect(() => {
//     async () => {
//       const filesUrl = axios.get(process.env.FETCH_LINK);
//       setData(filesUrl.data);
//     };
//   }, []);
//   console.log("data", data);
//   return data.length > 0 ? (
//     <FlatList
//       data={data}
//       keyExtractor={(serverImageURI) => serverImageURI}
//       renderItem={(itemData) => {
//         console.log("item", itemData);
//       }}
//     >
//       <Image
//         style={styles.image}
//         source={{
//           uri: process.env.FETCH_LINK + itemData.item,
//         }}
//       />
//     </FlatList>
//   ) : (
//     <View>
//       <Text>Couldn't find your images</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   image: {
//     resizeMode: "contain",
//     height: 500,
//   },
// });

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Image, FlatList, StyleSheet } from "react-native";

export default function FeedScreen() {
  const [serverImagesUrls, setServerImagesUrls] = useState([]);
  useEffect(() => {
    (async () => {
      const filesUrl = await axios.get(
        "https://wildstagram.nausicaa.wilders.dev/list"
      );
      console.log("filesurls", filesUrl.data);
      setServerImagesUrls(filesUrl.data);
    })();
  }, []);
  return serverImagesUrls.length > 0 ? (
    <FlatList
      data={serverImagesUrls}
      keyExtractor={(serverImageURI) => serverImageURI}
      renderItem={(itemData) => {
        console.log("item", itemData);
        return (
          <>
            <Image
              style={styles.image}
              source={{
                uri:
                  "https://wildstagram.nausicaa.wilders.dev/files/" +
                  itemData.item,
              }}
            />
          </>
        );
      }}
    />
  ) : null;
}

const styles = StyleSheet.create({
  image: {
    resizeMode: "contain",
    height: 500,
  },
});
b;
