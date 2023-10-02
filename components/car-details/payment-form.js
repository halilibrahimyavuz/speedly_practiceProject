import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, Card, Checkbox, TextInput, Title } from "react-native-paper";
import * as Yup from "yup";
import { useFormik } from "formik";
import Spacer from "../common/spacer";
import Helper from "../common/helper";
import { MaskedTextInput } from "react-native-mask-text";
import colors from "../../utils/constants/colors";
import { StackActions, useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { endEvent } from "react-native/Libraries/Performance/Systrace";
import { createReservation } from "../../api/reservation-service";

const PaymentForm = ({ setActiveScreen, reservationState }) => {
  const navigation = useNavigation();

  // **************FORMIk and YUP *****************************
  const initialValues = {
    cardNo: "",
    nameOnCard: "",
    expireDate: "",
    cvc: "",
    contract: false,
  };

  const validationSchema = Yup.object({
    cardNo: Yup.string().required("Please enter your card number."),
    nameOnCard: Yup.string().required("Please enter your name on card."),
    expireDate: Yup.string().required("Please enter expire date."),
    cvc: Yup.number()
      .typeError("Must be number.")
      .required("Please enter your cvc."),
    contract: Yup.boolean().oneOf([true], "Please check the box of contract."),
  });

  const onSubmit =async (values) => {
    
    try {
      
      console.log(reservationState);
      const reservationDto = {
        carId : reservationState.carId ,
        pickUpLocation : reservationState.pickUpLocation,
        dropOffLocation  : reservationState.dropOffLocation,
        pickUpTime : reservationState.pickUpDateTime ,
        dropOffTime :reservationState.dropOffDateTime
      }
   
     const response = await createReservation(reservationDto);
     // buradan sonra gerıye tekrar donelemesın yanı odeme sayfasına degılde anasayfyaa gıtsın demek ıcın
     //replace kullanarak gerı donmeyeı engelleıyoruz bır oncekı sayfayı kaldırıyor
     navigation.dispatch(StackActions.replace("reservation-result"));

   
    } catch (error) {
      Toast.show({
        type:"error",
        text1:error.response.data.message
      })
      
    }
    
    
    // navigation.navigate("reservation-result");
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  //000000000000000000000000*-***************************-*0000000000000000000000000000000

  return (
    <View style={styles.container}>
      {/* fiyat bılgısı */}
      <Card>
        <Card.Content style={styles.priceCard}>
          <Title>Total Price: </Title>
          <Title style={{ fontWeight: "bold" }}>
            {" "}
            ${reservationState.price}{" "}
          </Title>
        </Card.Content>
      </Card>

      <Spacer />
      {/* kredı kartı gırme ekran  */}
      <TextInput
        label={"Card Number"}
        value={formik.values.cardNo}
        onChangeText={formik.handleChange("cardNo")}
        keyboardType="number-pad"
        render={(props) => (
          <MaskedTextInput {...props} mask="9999 9999 9999 9999" />
        )}
      />

      <Helper input={formik.errors.cardNo} />

      <TextInput
        label={"Name on Card"}
        value={formik.values.nameOnCard}
        onChangeText={formik.handleChange("nameOnCard")}
      />

      <Helper input={formik.errors.nameOnCard} />

      {/* skt ve cvc satırı */}
      <View style={styles.row}>
        <View style={{ flex: 5, marginRight: 10 }}>
          <TextInput
            label={"Expire Date"}
            value={formik.values.expireDate}
            onChangeText={formik.handleChange("expireDate")}
            keyboardType="number-pad"
            render={(props) => <MaskedTextInput {...props} mask="99/99" />}
          />

          <Helper input={formik.errors.expireDate} />
        </View>
        <View style={{ flex: 4 }}>
          <TextInput
            label={"CVC"}
            value={formik.values.cvc}
            onChangeText={formik.handleChange("cvc")}
            keyboardType="number-pad"
            render={(props) => <MaskedTextInput {...props} mask="999" />}
          />

          <Helper input={formik.errors.cvc} />
        </View>
      </View>

      <Checkbox.Item
        label="I have read and aggree the sales contract."
        status={formik.values.contract ? "checked" : "unchecked"}
        position="leading"
        onPress={() => {
          formik.setFieldValue("contract", !formik.values.contract);
        }}
      />
      <Helper input={formik.errors.contract} />

      <Button
        mode="contained"
        style={styles.submitButton}
        onPress={formik.handleSubmit}
      >
        Checkout
      </Button>

      <Button
        mode="contained"
        style={styles.backButton}
        onPress={() => {
          // sayfadan gerı cıkmıyoruz sadece rezervation form componentıne doncegız
          setActiveScreen("reservation");
        }}
      >
        Return Back
      </Button>
    </View>
  );
};

export default PaymentForm;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  priceCard: {
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
  },
  submitButton: {
    marginTop: 20,
  },
  backButton: {
    marginTop: 20,
    backgroundColor: colors.color2,
  },
});
