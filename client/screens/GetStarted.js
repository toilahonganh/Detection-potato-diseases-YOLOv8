import React, { useState, useCallback } from "react";
import { StyleSheet } from 'react-native';
import { Image, ImageBackground, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import {
    AspectRatio,
    Spinner,
    HStack,
    Text,
    View,
    Button,
    Actionsheet,
    useDisclose,
} from "native-base";
import { urlServer } from "../constants/conn.js";

const GetStarted = () => {
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);

    const placeholderImage = require("../assets/laodong1.jpg");
    const navigation = useNavigation();
    const { isOpen, onOpen, onClose } = useDisclose();

    const setEmptyImage = () => {
        setImage(null);
        setVideo(null);
    };

    useFocusEffect(
        useCallback(() => {
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

    return (
        <SafeAreaProvider>
            <ImageBackground
                source={placeholderImage}
                style={styles.background}
                resizeMode="cover"
            >
                {image?.uri ? (
                    <AspectRatio ratio={{ base: 3 / 4, md: 9 / 10 }} style={styles.aspectRatio}>
                        <Image
                            source={{ uri: image.uri }}
                            style={styles.image}
                            resizeMode="contain"
                            alt="Uploaded image"
                        />
                    </AspectRatio>
                ) : video?.uri ? (
                    <AspectRatio ratio={{ base: 3 / 4, md: 9 / 10 }} style={styles.aspectRatio}>
                        {/* <Video
                                source={{ uri: video.uri }}
                                resizeMode="contain"
                                shouldPlay
                                isLooping
                                isMuted
                                style={styles.video}
                            /> */}
                    </AspectRatio>
                ) : (
                    <View style={styles.centeredView}>
                        <AspectRatio ratio={{ base: 3 / 4, md: 9 / 10 }} style={styles.aspectRatio}></AspectRatio>
                        <View>
                            <Text style={styles.infoText}>
                                Ứng dụng nhận dạng bệnh trên lá cây khoai tây sử dụng mô hình học sâu YOLOv8.
                            </Text>
                        </View>

                        <Button
                            onPress={() => navigation.navigate("GetImage")}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Bắt đầu</Text>
                        </Button>
                    </View>
                )}
            </ImageBackground>
            {/* Actionsheet for selecting image from library or camera */}
            <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
                <Actionsheet.Item onPress={pickImage} color="muted.500" style={styles.actionSheetItem}>
                    <Ionicons name="phone-portrait-outline" size={24} color="black" />
                    <Text style={styles.actionSheetText}>Mở ảnh từ thiết bị</Text>
                </Actionsheet.Item>

                <Actionsheet.Item onPress={takeImage} color="muted.500" style={styles.actionSheetItem}>
                    <Ionicons name="camera-outline" size={24} color="black" />
                    <Text style={styles.actionSheetText}>Mở máy ảnh</Text>
                </Actionsheet.Item>
            </Actionsheet>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    background: { flex: 1, backgroundColor: '#f6f6f6' },
    aspectRatio: { flex: 1 },
    image: { width: '100%', height: '100%' },
    video: { width: '100%', height: '100%' }, // Uncomment and update if you use video component
    centeredView: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    infoText: { color: '#fff', fontWeight: '600', fontSize: 20 },
    button: { marginTop: 20 },
    buttonText: { color: '#fff' },
    actionSheetItem: { flexDirection: "row", alignItems: "center" },
    actionSheetText: { marginLeft: 10 },
});

export default GetStarted;
