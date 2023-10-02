import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { TextInput, Button, HelperText } from "react-native-paper";
import { useFormik } from "formik";
import colors from "../utils/constants/colors";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { MaskedTextInput } from "react-native-mask-text";
import Helper from "../components/common/helper";
import { register } from "../api/user-service";
import Toast from "react-native-toast-message";

const RegisterScreen = () => {
  const [isPassSecure, setIsPassSecure] = useState(true);
  const [isPassRetrySecure, setIsPassRetrySecure] = useState(true);
  const navigation = useNavigation();

  // 9 - accept digit.
  // A - accept alpha.
  // S - accept alphanumeric

  const initialValues = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    zipCode: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Please enter your first name"),
    lastName: Yup.string().required("Please enter your last name"),
    phoneNumber: Yup.string().required("Please enter your phone number"),
    address: Yup.string().required("Please enter your address"),
    zipCode: Yup.string().required("Please enter your zip code"),
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string()
      .required("Please enter your password")
      .min(8, "Must be at least 8 characters"),
    confirmPassword: Yup.string()
      .required("Please re-enter your password")
      .oneOf([Yup.ref("password")], "Password fields doesn't match"),
  });

  const onSubmit = async (values) => {
    try {
      const response = await register(values);

      Toast.show({
        type: "success",
        text1: "You registered successfully."
      });

      navigation.navigate("login");
    }
    catch (error) {
      Toast.show({
        type: "error",
        text1: error.response.data.message
      });
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <ScrollView style={styles.form}>
      <TextInput
        label="First Name"
        onChangeText={formik.handleChange("firstName")}
        value={formik.values.firstName}
        style={styles.textInput}
        activeUnderlineColor={colors.color3}
      />
      <Helper input={formik.errors.firstName} />


      <TextInput
        label="Last Name"
        onChangeText={formik.handleChange("lastName")}
        value={formik.values.lastName}
        style={styles.textInput}
        activeUnderlineColor={colors.color3}
      />
      <Helper input={formik.errors.lastName} />



      <TextInput
        label="Phone Number"
        value={formik.values.phoneNumber}
        onChangeText={formik.handleChange("phoneNumber")}
        onBlur={formik.handleBlur("phoneNumber")}
        style={styles.textInput}
        activeUnderlineColor={colors.color3}
        keyboardType="phone-pad"
        render={(props) => <MaskedTextInput {...props} mask="(999) 999-9999" />}
      />
      <Helper input={formik.errors.phoneNumber} />

      <TextInput
        label="Address"
        onChangeText={formik.handleChange("address")}
        value={formik.values.address}
        style={styles.textInput}
        activeUnderlineColor={colors.color3}
      />
      <Helper input={formik.errors.address} />

      <TextInput
        label="Zip Code"
        onChangeText={formik.handleChange("zipCode")}
        value={formik.values.zipCode}
        style={styles.textInput}
        activeUnderlineColor={colors.color3}
        keyboardType="number-pad"
      />
      <Helper input={formik.errors.zipCode} />

      <TextInput
        label="Email"
        onChangeText={formik.handleChange("email")}
        value={formik.values.email}
        style={styles.textInput}
        activeUnderlineColor={colors.color3}
        keyboardType="email-address"
      />
      <Helper input={formik.errors.email} />

      <TextInput
        label="Password"
        onChangeText={formik.handleChange("password")}
        value={formik.values.password}
        style={styles.textInput}
        secureTextEntry={isPassSecure}
        right={
          <TextInput.Icon
            icon={isPassSecure ? "eye-off-outline" : "eye-outline"}
            onPress={() => {
              setIsPassSecure(!isPassSecure);
            }}
          />
        }
        activeUnderlineColor={colors.color3}
      />
      <Helper input={formik.errors.password} />

      <TextInput
        label="Password (Retry)"
        onChangeText={formik.handleChange("confirmPassword")}
        value={formik.values.confirmPassword}
        style={styles.textInput}
        secureTextEntry={isPassRetrySecure}
        right={
          <TextInput.Icon
            icon={isPassRetrySecure ? "eye-off-outline" : "eye-outline"}
            onPress={() => {
              setIsPassRetrySecure(!isPassRetrySecure);
            }}
          />
        }
        activeUnderlineColor={colors.color3}
      />
      <Helper input={formik.errors.confirmPassword} />

      <Button
        mode="contained"
        onPress={formik.handleSubmit}
        style={styles.buttonSubmit}
        disabled={!formik.isValid}
      >
        REGISTER
      </Button>

      <Button
        mode="outlined"
        onPress={() => navigation.navigate("login")}
        style={styles.buttonLogin}
        uppercase={false}
      >
        Click to login
      </Button>
    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  form: {
    padding: 20,
    flex: 1,
  },
  textInput: {
    borderBottomWidth: 1,
    borderColor: colors.color4,
    marginVertical: 3,
  },
  error: {
    fontSize: 12,
    fontStyle: "italic",
    color: "red",
  },
  buttonSubmit: {
    marginTop: 10,
  },
  buttonLogin: {
    marginTop: 30,
    marginBottom: 60,
  },

  registerLink: {
    textAlign: "center",
    marginTop: 20,
  },
});
