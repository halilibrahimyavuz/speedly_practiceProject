import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import ProfileCard from "../components/account/profile-card";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button, TextInput } from "react-native-paper";
import Helper from "../components/common/helper";
import Spacer from "../components/common/spacer";
import { MaskedTextInput } from "react-native-mask-text";
import MyContext from "../store";
import Toast from "react-native-toast-message";
import { updateUser } from "../api/user-service";

const ProfileScreen = () => {
  const { myUser } = useContext(MyContext);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    firstName: myUser.firstName,
    lastName: myUser.lastName,
    phoneNumber: myUser.phoneNumber,
    address: myUser.address,
    zipCode: myUser.zipCode,
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Please enter your first name"),
    lastName: Yup.string().required("Please enter your last name"),
    phoneNumber: Yup.string().required("Please enter your phone number"),
    address: Yup.string().required("Please enter your address"),
    zipCode: Yup.string().required("Please enter your zip code"),
  });

  const onSubmit = async (values) => {
    try {
      setLoading(true); //loadıng donmeye baslasın ıslem sırasında
      //values içinde email olmadııg ıcın onuda ekleyıp gonderdık put ıslemıne
      const response = await updateUser({ ...values, email: myUser.email });

      setLoading(false); //loadıng bıtır
      Toast.show({
        type: "success",
        text1: "Your profole was updated successfully",
      });
    } catch (err) {
      setLoading(false); //loadıng donmeyi bıtır

      Toast.show({
        type: "error",
        text1: err.response.data.message,
      });
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <ScrollView style={styles.container}>
      {/* profile card */}
      <ProfileCard page={"profile"} />

      <Spacer />

      {/* content */}
      <TextInput
        label={"First Name"}
        value={formik.values.firstName}
        onChangeText={formik.handleChange("firstName")}
      />

      <Helper input={formik.errors.firstName} />

      <TextInput
        label={"Last Name"}
        value={formik.values.lastName}
        onChangeText={formik.handleChange("lastName")}
      />

      <Helper input={formik.errors.lastName} />

      <TextInput
        label={"Phone Number"}
        value={formik.values.phoneNumber}
        onChangeText={formik.handleChange("phoneNumber")}
        keyboardType="phone-pad"
        render={(props) => <MaskedTextInput {...props} mask="(999) 999-9999" />}
      />

      <Helper input={formik.errors.phoneNumber} />

      <TextInput
        label={"Address"}
        value={formik.values.address}
        onChangeText={formik.handleChange("address")}
      />

      <Helper input={formik.errors.address} />

      <TextInput
        label={"Zip Code"}
        value={formik.values.zipCode}
        onChangeText={formik.handleChange("zipCode")}
        keyboardType="number-pad"
      />

      <Helper input={formik.errors.zipCode} />

      <Button
        mode="contained"
        onPress={formik.handleSubmit}
        style={styles.button}
        loading={loading}
        disabled={loading}
      >
        Save
      </Button>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  button: {
    marginBottom: 30,
  },
});
