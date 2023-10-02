import { ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import CarDetailsCard from "../components/car-details/car-details-card";
import RezervationForm from "../components/car-details/rezervation-form";
import PaymentForm from "../components/car-details/payment-form";

const CarDetailsScreen = ({ route }) => {
  const { car } = route.params;

  const [activeScreen, setActiveScreen] = useState("reservation"); //reservation or payment
  const [reservationState, setReservationState] = useState()

  return (
    <ScrollView>
      <CarDetailsCard car={car} />

      {activeScreen == "reservation" 
      ? 
      <RezervationForm   
            setActiveScreen={setActiveScreen}
            carId={car.id}  
            setReservationState={setReservationState}
        /> 
      :
       <PaymentForm 
                setActiveScreen={setActiveScreen}
                reservationState={reservationState} />}

    </ScrollView>
  );
};

export default CarDetailsScreen;

const styles = StyleSheet.create({});
