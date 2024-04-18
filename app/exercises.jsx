import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import { fetchExercisesByBodypart } from '../api/exerciseDB';
import { demoExercises } from '../constants';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Exercises() {
    const router = useRouter();
    const item = useLocalSearchParams();
    const [exercises, setExercises] = useState([demoExercises]);
    console.log("got item:", item)

    useEffect(() => {
        //if(item) getExercises(item.name);
    }, [item]);

    const getExercises = async (bodypart) => {
        let data = await fetchExercisesByBodypart(bodypart);
        //console.log("got data:",data);
        setExercises(data);
    }

    return (
<ScrollView>
    <StatusBar style="light" />
    <View style={{ position: 'relative' }}>
        <Image
            source={item.image}
            style={{ width: wp(100), height: hp(45) }}
            className="rounded-b-[40px]"
        />
        <TouchableOpacity
            onPress={() => router.back()}
            className="bg-rose-500 absolute flex justify-center items-center pr-1 rounded-full"
            style={{
                position: 'absolute',
                top: hp(7),
                left: hp(4),
                height: hp(5.5),
                width: hp(5.5),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: hp(5.5) / 2, 
            }}
        >
            <Ionicons name="caret-back-outline" size={hp(4)} color="white" />
        </TouchableOpacity>
    </View>
</ScrollView>

    )

}