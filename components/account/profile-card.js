import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import {
  Avatar,
  Button,
  Card,
  IconButton,
  Paragraph,
  Title,
} from "react-native-paper";
import colors from "../../utils/constants/colors";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore  from "expo-secure-store"
import MyContext from '../../store'

const ProfileCard = ({ page }) => {


    const navigation = useNavigation();
    const  { myUser ,setMyUser} = useContext(MyContext);

  // cıkıs yap butonu ıcın method alert verecek ona gore ıslem yapacagız
  handleLogout = () => {
    Alert.alert("Warning", "Are you sure you want to log out?", [
      { text: "NO" },
      { text: "YES", onPress: async () => {
          // 1- securestore dakı token ı sişlmesi gerek
          await SecureStore.deleteItemAsync("token");
          //2- merkezı state de kullanıcı bılgııs duruyor bunun da sılınmesı lazım
          setMyUser(null);
      } },
    ]);
  };
  return (
    <Card>
      {/* avatar and isim  */}
      <Card.Content style={styles.cardContent}>
        <Avatar.Icon icon={"account-circle"} size={100} />
        <Title>  {myUser.firstName} {myUser.lastName} </Title>
        <Paragraph> { myUser.email}</Paragraph>
      </Card.Content>

      {/*  butonlar */}
      <View style={styles.buttonsRow} gap={10}>

        <Button 
            mode={page == "profile" ? "contained" : "outlined"}
            onPress={()=>navigation.navigate("profile")}>
            
          Profile
        </Button>

        <Button 
            mode={page == "password" ? "contained" : "outlined"}
            onPress={()=>navigation.navigate("change-password")}>
           
          Password
        </Button>

        <Button 
            mode={page == "reservations" ? "contained" : "outlined"}
             onPress={()=>navigation.navigate("reservations")}>
           
          Reservations
        </Button>

      </View>

      {/*  cıkıs yap butonu */}
      <IconButton
        icon={"logout-variant"}
        style={styles.logout}
        onPress={handleLogout}
      />
    </Card>
  );
};
export default ProfileCard;
const styles = StyleSheet.create({
  cardContent: {
    alignItems: "center",
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  logout: {
    backgroundColor: colors.color5,
    position: "absolute",
    top: 5,
    right: 5,
  },
});
