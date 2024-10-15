import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import DailyCalories from "../../assets/icons/fire3.svg"
import WeeklyCalories from "../../assets/icons/fire2.svg"
import AllTimeCalories from "../../assets/icons/fire4.svg"
import Skull from "../../assets/icons/burning-skull-white.svg"
import PlayButton from "../../assets/icons/play-button-blue.svg"
import HoneyComb from "../../assets/icons/honeycomb.svg"

export default function Fitness() {

  const handleButtonPress = ()=>{
    // do logic for the calorie timer
  }



  return (
    <View className="flex-1 items-center bg-background">
      <Text className="text-xl text-text font-montserrat-light mt-10">F I T N E S S</Text>
      <Text className="text-[10px] text-center w-5/6 text-grey font-montserrat-light mt-2">Please note that calorie estimation is for informational purposes only and not a substitute for professional medical advice</Text>

      {/* CHANGE THIS TO NOT BE HARDCODED */}

      <View className="mt-8">

        <View className="flex-row">
        <Text className="text-3xl text-text font-montserrat-alt mr-4">1 3 7 4</Text>
        <DailyCalories width={36} height={36}></DailyCalories>
        </View>
        <Text className=" pl-8 mt-1 mb-8 text-xl text-text font-montserrat-alt">Calories burnt today.</Text>


        <View className="flex-row">
        <Text className="text-3xl text-text font-montserrat-alt mr-4">5 6 4 3</Text>
        <WeeklyCalories width={36} height={36}></WeeklyCalories>
        </View>
        <Text className=" pl-8 mt-1 mb-8 text-xl text-text font-montserrat-alt">Calories burnt this week.</Text>

        <View className="flex-row">
        <Text className="text-3xl text-text font-montserrat-alt mr-4">8 5 0 3 5</Text>
        <AllTimeCalories width={36} height={36}></AllTimeCalories>
        </View>
        <Text className=" pl-8 mt-1 mb-8 text-xl text-text font-montserrat-alt">All-time calories burnt.</Text>

        <View className="flex-row">
        <Text className="text-3xl text-text font-montserrat-alt mr-4">1 3 %</Text>
        <Skull width={36} height={36}></Skull>
        </View>
        <Text className=" pl-8 mt-1 text-xl text-text font-montserrat-alt">To skateboard mastery.</Text>

      </View>

      <TouchableOpacity className="bg-buttonbg border border-accent-2 w-5/6 p-3 py-4 mt-10 rounded-3xl mb-2 items-center"
      onPress={handleButtonPress}>
        <PlayButton width={32} height={32}></PlayButton>
      </TouchableOpacity>
      <Text className="text-[12px] text-grey text-center font-montserrat-light mb-12">Tap the button to begin a skate sesh, calories will be estimated based on your skill level and duration of the session.  </Text>
      <View className="absolute -z-10 left-[200px] top-[150px] ">
      <HoneyComb width={400} height={400}></HoneyComb>
      </View>
    </View>
  );
}
