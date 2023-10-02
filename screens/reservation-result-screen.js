import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Avatar, Button, Title } from "react-native-paper";
import colors from "../utils/constants/colors";
import { useNavigation } from "@react-navigation/native";

const ReservationResultScreen = () => {

    const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Avatar.Icon size={90} icon={"check-decagram"} />
      <Title style={{fontWeight:"bold"}}> Congratulations !!</Title>
      <Text style={styles.text}>
        {" "}
        Your reservation created succesfully. You can check it in your account
        page.
      </Text>

      <View>
        <Button 
          onPress={()=>{
            // sadece sayfa degıstırmıyoruz aynı zmanda baska stack ıcıne gıdıyoruz
            navigation.navigate("account-stack", {screen :  "reservations"})
          }} mode="contained">Go Rezervations</Button>

        <Button 
          onPress={()=>{
            navigation.navigate("cars")
          }} mode="contained" style={styles.homeButton}>
          Go Home
        </Button>
      </View>
    </View>
  );
};

export default ReservationResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    gap: 15,
  },
  tect: {
    textAlign: "center",
  },
  homeButton: {
    backgroundColor: colors.color2,
    marginTop:10
  },
});
