import { StyleSheet, Text,Image , View } from 'react-native'
import React from 'react'
import { Card, Title, Paragraph, IconButton } from "react-native-paper";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Spacer from '../../components/common/spacer';
import colors from '../../utils/constants/colors';
import { getVehicleImage } from '../../utils/functions/vehicle';


const CarDetailsCard = ({car}) => {

  return (
    <View>
     {/* araba görseli */}
     <Image source={ getVehicleImage(car.image[0])} style={styles.carImage} />

{/* card */}
<Card style={styles.card}>
  <Card.Content style={styles.cardContent}>

    {/* özellikler */}
    <Text style={{ fontSize: 24, fontWeight: "bold" }}>{car.model}</Text>
    <Text>
      <Icon name='car-door' color={colors.color1} />
      {" "} {car.doors} doors | {" "}
      <Icon color={colors.color1} name='car-seat' /> 
       {car.seats} seats
    </Text>

    <Spacer />

    {/* fiyat */}
    <Text style={styles.price}>${car.pricePerHour}/hour</Text>

    <Spacer />

    {/* diğer özellikler */}
    <View style={styles.carProps}>
      <View style={{ alignItems: "center" }}>
        <Icon name='car-shift-pattern' size={30} color={colors.color1} />
        <Text>{car.transmission}</Text>
      </View>

      {car.airConditioning &&
        (<View style={{ alignItems: "center" }}>
          <Icon name='snowflake' size={30} color={colors.color1} />
          <Text>Air Con</Text>
        </View>)
      }


      <View style={{ alignItems: "center" }}>
        <Icon name='gas-station' size={30} color={colors.color1} />
        <Text>{car.fuelType}</Text>
      </View>

    </View>

  </Card.Content>

</Card>
    </View>
  )
}

export default CarDetailsCard

const styles = StyleSheet.create({
  carImage: {
    width: "100%",
    height: 200,
    position: "absolute",
    zIndex: 1,
  },
  card: {
    marginTop: 100,
    paddingTop: 85,
    marginHorizontal:15
  },
  cardContent: {
    alignItems: "center"
  },
  price: {
    backgroundColor: colors.color4,
    paddingVertical: 10,
    borderRadius: 20,
    fontSize: 20,
    width: "100%",
    textAlign: "center"
  },
  carProps: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%"
  }
})