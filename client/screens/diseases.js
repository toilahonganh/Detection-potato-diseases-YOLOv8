import React from "react";
import { Platform, View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Image } from "react-native";
import { TuyenTrung } from "../../client/assets/tuyentrung.jpg"
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import { Ionicons } from "@expo/vector-icons";
import {
  AspectRatio,
  Alert,
  Icon,
  Link,
  VStack,
  HStack,
  Text,
  Pressable,
  Actionsheet,
  useDisclose,
  Center,
  Box,
  ScrollView,
} from "native-base";
import { urlServer } from "../constants/conn.js";
import DiseaseInfo from "./DeseaseInfo.js";

const ResultScreen = ({ navigation, route }) => {
  const placeholderImage = require("../assets/image.png");
  const late__blight = require("../assets/late.png");
  const early__blight = require("../assets/early.png");
  const nematode = require("../assets/tuyentrung.jpg");
  const pest = require("../assets/pest.jpg");

  const detectedDiseases = ["Late Blight", "Early Blight", "Nematode Potato", "Pest Potato", "Healthy Potato"];



  const { isOpen, onOpen, onClose } = useDisclose();

  // Check if data is available
  if (!route.params.data || !route.params.data[0]) {
    return (
      <Center flex="3">
        <Alert margin="2%" w="96%" status="success" colorScheme="info">
          <VStack space={2} flexShrink={1} w="100%" h="70">
            <HStack
              flexShrink={1}
              space={2}
              alignItems="center"
              justifyContent="space-between"
            >
              <HStack flexShrink={1} space={2} alignItems="center">
                <Alert.Icon />
                <Text fontSize="lg" fontWeight="medium" color="coolGray.800">
                  Notification
                </Text>
              </HStack>
            </HStack>
            <Box pl="6" _text={{ color: "coolGray.600" }}>
              <Text
                fontSize="md"
                fontWeight="medium"
                color="#228B22"
                _dark={{ color: "#003060" }}
              >
                No potato diseases detected. Potatoes Healthy
              </Text>
            </Box>
          </VStack>
        </Alert>

        <Center marginTop="2%" marginBottom="5%">
          <Link
            _text={{
              fontSize: "md",
              _light: { color: "cyan.500" },
              color: "cyan.300",
            }}
            isUnderlined
            _hover={{
              _text: {
                _light: { color: "cyan.600" },
                color: "cyan.400",
              },
            }}
            onPress={() => navigation.navigate("GetImage")}
          >
            Back
          </Link>
        </Center>
      </Center>
    );
  }

  const imagePath = route.params.data[0].image;
  const urlImage = urlServer + `/getimage/${imagePath}`;

  const saveImage = async () => {
    const uri = urlImage;

    try {
      const imgExt = uri.split(".").pop();
      const downloadResult = await FileSystem.downloadAsync(
        uri,
        FileSystem.documentDirectory + "image." + imgExt
      );

      if (downloadResult && downloadResult.uri) {
        const localUri = downloadResult.uri;
        const asset = await MediaLibrary.createAssetAsync(localUri);
        await MediaLibrary.createAlbumAsync("Potatoes", asset, false);
      } else {
        Alert.alert("Download Failed", "Failed to download the image.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while downloading the image.");
    }
  };

  const [selected, setSelected] = React.useState(1);
  const kind = route.params.data[0].kind;
  const C_time = route.params.data[0].c_time;

  return (
    <SafeAreaProvider>
      <Box>
        <AspectRatio ratio={{ base: 3 / 4, md: 9 / 10 }}>
          <Image
            source={urlImage ? { uri: urlImage } : placeholderImage}
            resizeMode="contain"
            alt={urlImage ? "Uploaded Image" : "Default Image"}
          />
        </AspectRatio>
        <Box px={4} mt={Platform.OS === 'ios' ? 0 : 20}>
          <Box my={2}>
            <Text bold color="#2E8B57" fontSize="lg">
              Thông tin nhận dạng
            </Text>
            <Box flexDirection="row" flexWrap="wrap" mt="5">
              <Text bold color="black" fontSize={Platform.OS === 'ios' ? "xs" : "sm"} numberOfLines={1}>
                Đối tượng nhận dạng: </Text>
              <Text color="black" fontSize={Platform.OS === 'ios' ? "xs" : "sm"} numberOfLines={1}>
                {String(kind) === "Early Blight Potato" ? (
                  "Bệnh đốm vòng"
                ) : String(kind) === "Late Blight Potato" ? (
                  "Bệnh mốc sương"
                ) : String(kind) === "Healthy Potato" ? (
                  "Không phát hiện bệnh trên lá"
                ) : String(kind) === "Nematode Potato" ? (
                  "Bệnh tuyến trùng"
                ) : String(kind) === "Pest Potato" ? (
                  "Bệnh sâu ăn lá"
                ) : null}
              </Text>
            </Box>
            <Box flexDirection="row" mt="5">
              <Text bold color="black" fontSize={Platform.OS === 'ios' ? "xs" : "sm"}>
                Thời gian nhận dạng: </Text>
              <Text color="blue" fontSize={Platform.OS === 'ios' ? "xs" : "sm"}>{C_time}</Text>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box position="absolute" bottom="0" alignItems="stretch" width="100%" alignSelf="center">
        <HStack bg="#2E8B57" alignItems="center" safeAreaBottom shadow={6}>
          <Pressable
            cursor="pointer"
            opacity={selected === 1 ? 1 : 0.5}
            py="2"
            flex={1}
            onPress={() => {
              setSelected(1);
              navigation.navigate("GetImage");
            }}
          >
            <Center>
              <Icon
                mb="1"
                as={<Ionicons name="refresh-circle" size={24} color="black" />}
                color="white"
                size="lg"
              />
              <Text color="white" fontSize="xs">
                Trở lại
              </Text>
            </Center>
          </Pressable>

          <Pressable
            cursor="pointer"
            opacity={selected === 0 ? 1 : 0.5}
            py="3"
            flex={1}
            onPress={() => {
              setSelected(0);
              saveImage();
            }}
          >
            <Center>
              <Icon
                mb="1"
                as={<Ionicons name="cloud-download" size={24} color="black" />}
                color="white"
                size="lg"
              />
              <Text color="white" fontSize="xs">
                Tải xuống
              </Text>
            </Center>
          </Pressable>
          <Pressable
            cursor="pointer"
            opacity={selected === 2 ? 1 : 0.5}
            py="2"
            flex={1}
            onPress={() => onOpen()}
          >
            <Center>
              <Icon
                mb="1"
                as={<Ionicons name="information-outline" size={24} color="black" />}
                color="white"
                size="lg"
              />
              <Text color="white" fontSize="xs">
                Chi tiết
              </Text>
            </Center>
          </Pressable>
        </HStack>
      </Box>

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content _dragIndicator={{ bg: "blue.500" }}>
          <Text
            bold
            fontSize="14"
            marginBottom="5"
            color="#003060"
            _dark={{ color: "#00407a" }}
          >
            Thông tin chi tiết
          </Text>
          <ScrollView>
            <DiseaseInfo diseases={kind} urlImage={urlImage} late_blight={late__blight} early_blight={early__blight} />
          </ScrollView>
        </Actionsheet.Content>
      </Actionsheet>
    </SafeAreaProvider>
  );
};
const styles = StyleSheet.create({
  descriptionText: {
    fontSize: 12,
  },
  descriptionTextBold: {
    fontSize: 14,
    fontWeight: 700
  },
});

export default ResultScreen;
