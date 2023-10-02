import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ProfileCard from "../components/account/profile-card";
import Spacer from "../components/common/spacer";
import { ActivityIndicator, DataTable } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { getReservations } from "../api/reservation-service";
import Toast from "react-native-toast-message";
import moment from "moment";
import colors from "../utils/constants/colors";

const ReservationsScreen = () => {
  const navigation = useNavigation();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const response = await getReservations();
      setReservations(response.data.content);

      setLoading(false);

    } catch (error) {
      setLoading(false);

      Toast.show({
        type: "error",
        text1: error.response.data.message,
      });
    }
  };

  useEffect (() => {
    loadData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* profile card */}
      <ProfileCard page={"reservations"} />

      {/* spacer */}
      <Spacer />

      {/* content */}
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Car</DataTable.Title>
          <DataTable.Title>PickUp Location</DataTable.Title>
          <DataTable.Title>PickUp Date</DataTable.Title>
        </DataTable.Header>

     {/* 0000000000000000000000000000000000000000000000000000000 */}
      {/* //EMPTY STATE  --> bos durumun gosterılmesı     */}
     {/* 0000000000000000000000000000000000000000000000000000000 */}

        {loading   //eger loadıng ıse reservatıns gosterme
        ?
        (<ActivityIndicator    //paper dan gelen actıvıtyIndıcator
          animating={true}      //anımasyon gozuksunmu 
          color={colors.color1}
          style={styles.loading} size={50}
        />)
        :
        reservations.length == 0 
        ?
        <Text style={styles.empyText}>
        You dont any reservations yet.
        {"\n"}
         You can  create a reservation by slecting a car
         {"\n"} from the home page
         </Text>
        : 
        (reservations.map((item) => (
          <DataTable.Row
          key={item.id}
          onPress={() => navigation.navigate("reservation-details" , {reservation : item})}
          >
            <DataTable.Cell> {item.car.model} </DataTable.Cell>

            <DataTable.Cell> {item.pickUpLocation} </DataTable.Cell>

            <DataTable.Cell> {moment( item.pickUpTime).format("ll") }  </DataTable.Cell>
          </DataTable.Row>
        )))
        
        }


       

      </DataTable>
    </ScrollView>
  );
};

export default ReservationsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  loading:{
    marginTop:40,
    
  },
  empyText:{
    marginTop:20,
    textAlign:"center"
  }
});
