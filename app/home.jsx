import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImageSlider from '../components/ImageSliderr';
import BodyParts from '../components/BodyPartss';
import { useRouter } from 'expo-router';

export default function Home() {
    const router = useRouter();
    const handleImagePress = () => {
        router.push('/calendarPage');
    };
    return (
        <SafeAreaView className="flex-1 bg white flex space-y-5" edges={["top"]}>
            <StatusBar style="dark" />

            {/*punchline and avatar */}
            <View className="flex-row justify-between items-center mx-5">
                <View className="space-y-2">

                    <Text
                        style={{ fontSize: hp(4.5) }}
                        className="font-bold tracking-wider text-rose-500 "
                    >
                        Hoş Geldin
                    </Text>


                    <Text
                        style={{ fontSize: hp(4.5) }}
                        className="font-bold tracking-wider text-neutral-700 "
                    >
                        Halit Yavuz İbik
                    </Text>
                </View>

                <View className="flex justify-center items-center space-y-2">
                    <TouchableOpacity onPress={handleImagePress}>
                        <Image
                            source={require("../assets/images/vesikalik.jpg")}
                            style={{ height: 100, width: 100 }}
                            className="rounded-full"
                        />
                    </TouchableOpacity>
                    <Text >Profil</Text>


                    <View
                        className="bg-neutral-200 rounded-full flex justify-center items-center border-{3px} border-neutral-300"
                        style={{ height: hp(5.5) }}
                    >
                        <Ionicons name="notifications" size={hp(3)} color="gray" />
                    </View>
                </View>
            </View>

            <View>
                <ImageSlider />
            </View>

            <View className="flex-1">
                <BodyParts />
            </View>

        </SafeAreaView>
    )

}