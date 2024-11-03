import axios from "axios";
import React, { useState } from "react";
import { Platform } from 'react-native';
import { Image, Alert, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Camera, CameraType } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import {
  AspectRatio,
  Spinner,
  HStack,
  Icon,
  Text,
  Pressable,
  Actionsheet,
  useDisclose,
  Center,
  Box,
} from "native-base";

import { urlServer } from "../constants/conn.js";

const GetImageScreen = () => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [type, setType] = useState(CameraType.back);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);

  const placeholderImage = require("../assets/image.png");
  const navigation = useNavigation();
  const { isOpen, onOpen, onClose } = useDisclose();

  const setEmptyImage = () => {
    setImage(null);
  };

  useFocusEffect(
    React.useCallback(() => {
      setEmptyImage();
      setLoading(false);
    }, [])
  );

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setVideo(result.assets[0]);
    }
  };

  const takeImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const uploadImage = async () => {
    if (image !== null && image.uri !== null) {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", {
        uri: image.uri,
        type: "image/*",
        name: "image.jpg",
      });

      try {
        const response = await axios.post(urlServer + "/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        navigation.navigate("Result", { data: response.data });
      } catch (error) {
        // Xử lý lỗi nếu có
      }
    } else if (video !== null && video.uri !== null) {
      setLoading(true);
      const formData = new FormData();
      formData.append("video", {
        uri: video.uri,
        type: "video/*",
        name: "video.mp4",
      });
      try {
        const response = await axios.post(urlServer + "/upload-video", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        navigation.navigate("Result", { data: response.data });
      } catch (error) {
        // Xử lý lỗi nếu có
      }
    } else {
      Alert.alert("Notification", "Please select the file to recognize!");
    }
  };

  const [selected, setSelected] = React.useState(1);

  return (
    <SafeAreaProvider>
      {loading ? (
        <HStack flex={1} justifyContent="center">
          <Spinner size="lg" />
        </HStack>
      ) : (
        <View style={styles.container}>
          {image !== null && image.uri !== null ? (
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: image.uri }}
                style={styles.image}
                resizeMode="contain"
                alt="Uploaded image"
              />
            </View>
          ) : (
            <View style={styles.imageContainer}>
              {video !== null && video.uri !== null ? (
                <AspectRatio
                  ratio={{ base: 3 / 4, md: 9 / 10 }}
                  style={styles.image}
                >
                  <Video
                    source={{ uri: video.uri }}
                    resizeMode="contain"
                    shouldPlay
                    isLooping
                    isMuted
                    style={styles.image}
                  />
                </AspectRatio>
              ) : (
                <Image
                  style={styles.defaultImage}
                  source={placeholderImage}
                  resizeMode="contain"
                  alt="Default image"
                />
              )}
            </View>
          )}
        </View>
      )}

      <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
        <Actionsheet.Item onPress={pickImage} color="muted.500">
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="phone-portrait-outline" size={24} color="black" />
            <Text style={{ marginLeft: 10 }}>Mở ảnh từ thiết bị</Text>
          </View>
        </Actionsheet.Item>

        <Actionsheet.Item onPress={() => {
          requestPermission();
          takeImage();
        }}
          color="muted.500"
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="camera-outline" size={24} color="black" />
            <Text style={{ marginLeft: 10 }}>Mở máy ảnh</Text>
          </View>
        </Actionsheet.Item>
      </Actionsheet>

      <Box
        position="absolute"
        bottom="0"
        alignItems="stretch"
        width="100%"
        alignSelf="center"
      >
        <HStack bg="#2E8B57" alignItems="center" safeAreaBottom shadow={6}>
          <Pressable
            cursor="pointer"
            opacity={selected === 0 ? 1 : 0.5}
            py={Platform.OS === 'ios' ? 0 : 3}
            flex={1}
            onPress={() => {
              setSelected(0);
              navigation.navigate("Activity");
            }}
          >
            <Center>
              <Icon
                mb="1"
                as={<Ionicons name="notifications" size={24} color="black" />}
                color="white"
                size="lg"
              />
              <Text color="white" fontSize="xs">
                Lịch sử
              </Text>
            </Center>
          </Pressable>

          <Pressable
            cursor="pointer"
            opacity={selected === 1 ? 1 : 0.5}
            py="2"
            flex={1}
            onPress={() => {
              setSelected(1);
              onOpen();
            }}
          >
            <Center>
              <Icon
                mb="1"
                as={<Ionicons name="camera" size={24} color="black" />}
                color="white"
                size="lg"
              />
              <Text color="white" fontSize="xs">
                Máy ảnh
              </Text>
            </Center>
          </Pressable>

          <Pressable
            cursor="pointer"
            opacity={selected === 3 ? 1 : 0.5}
            py="2"
            flex={1}
            onPress={() => {
              setSelected(3);
              uploadImage();
            }}
          >
            <Center>
              <Icon
                mb="1"
                as={<Ionicons name="navigate" size={24} color="black" />}
                color="white"
                size="lg"
              />
              <Text color="white" fontSize="xs">
                Nhận dạng
              </Text>
            </Center>
          </Pressable>
        </HStack>
      </Box>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    justifyContent: 'center', // Can be removed if imageContainer is used
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%', // Set your desired width
    height: '100%', // Set your desired height
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    marginBottom: 60

  },
  defaultImage: {
    width: '50%',
    height: '50%',
    marginBottom: 55

  },
});

export default GetImageScreen;
