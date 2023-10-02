import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Card, List } from "react-native-paper";
import colors from "../utils/constants/colors";
import moment from "moment";
import Spacer from "../components/common/spacer";
import { getVehicleImage } from "../utils/functions/vehicle";

const ReservationDetailsScreen = ({route}) => {

  const {reservation} = route.params;

  const status = {
    CREATED: "Reservation is confirmed.",
    CANCELED: "Reservation is cancelled.",
    DONE: "Reservation is completed."
  }

  return (
    <ScrollView style={{ padding: 15 }}>
      {/* arac bılgısı */}
      <Card>
        <Card.Cover
          source={getVehicleImage(reservation.car.image[0]) }
        />
        <Card.Title title={reservation.car.model} titleStyle={{ alignSelf: "center" , fontWeight:"bold" }} />
      </Card>

      {/*  rezervasyon bılgılerı */}
      <List.Item
        title={reservation.pickUpLocation}
        titleStyle={styles.itemTitle}
        description="Pick Up Location"
        left={() => (
          <List.Icon icon={"map-marker-right-outline"} color={colors.color1} />
        )}
      />

      <List.Item
        title={reservation.dropOffLocation}
        titleStyle={styles.itemTitle}
        description="Drop Off Location"
        left={() => (
          <List.Icon icon={"map-marker-left-outline"} color={colors.color1} />
        )}
      />

      <List.Item
        title={moment(reservation.pickUpTime).format("lll")}
        titleStyle={styles.itemTitle}
        description="Pick Up Time"
        left={() => <List.Icon icon={"car-clock"} color={colors.color1} />}
      />

      <List.Item
        title={moment(reservation.dropOffTime).format("lll")}
        titleStyle={styles.itemTitle}
        description="Drop Off Time"
        left={() => <List.Icon icon={"car-clock"} color={colors.color1} />}
      />

      <List.Item
        title={`$${reservation.totalPrice}`}
        titleStyle={styles.itemTitle}
        description="Total Price"
        left={() => <List.Icon icon={"cash-check"} color={colors.color1} />}
      />

      <List.Item
        title={status[reservation.status]}
        titleStyle={styles.itemTitle}
        description="Status"
        left={() => <List.Icon icon={"list-status"} color={colors.color1} />}
      />

          <Spacer height={30}/>

    </ScrollView>
  );
};

export default ReservationDetailsScreen;

const styles = StyleSheet.create({
  itemTitle:{
    fontWeight:"bold"
  }
});
