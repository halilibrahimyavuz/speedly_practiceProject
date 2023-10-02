import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ProfileCard from "../components/account/profile-card";
import Spacer from "../components/common/spacer";
import * as Yup from "yup";
import { Button, TextInput } from "react-native-paper";
import { useFormik } from "formik";
import Helper from "../components/common/helper";
import { updatePassword } from "../api/user-service";
import Toast from "react-native-toast-message";

const ChangePasswordScreen = () => {
  const [isCurrentPassSecure, setIsCurrentPassSecure] = useState(true);
  const [isNewPasswordSecure, setIsNewPasswordSecure] = useState(true);
  const [isNewPassRetrySecure, setIsNewPassRetrySecure] = useState(true);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const validationSchema = Yup.object({
    oldPassword: Yup.string().required("Please enter your current password."),
    newPassword: Yup.string()
      .required("Please enter your new password.")
      .min(8, "Must be at least 8 characters."),
    confirmNewPassword: Yup.string()
      .required("Please re-enter your new password.")
      .oneOf([Yup.ref("newPassword")], "Password fields doesn't match."),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true); //loadıng donmeye baslasın ıslem sırasında
      const responce = await updatePassword(values);
      resetForm(); // onSubmıt den hazır gelen resetForm methodunu da kullandık

      setLoading(false); //loadıng bıtır

      Toast.show({
        text1: "password update is successfully",
        type: "success",
      });
    } catch (error) {
      setLoading(false); //loadıng donmeyi bıtır

      Toast.show({
        text1: error.responce.data.message,
        type: "error",
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
      <ProfileCard page={"password"} />
      <Spacer />

      {/* content */}
      <TextInput
        label={"Current Password"}
        value={formik.values.oldPassword}
        onChangeText={formik.handleChange("oldPassword")}
        secureTextEntry={isCurrentPassSecure}
        right={
          <TextInput.Icon
            icon={isCurrentPassSecure ? "eye-off-outline" : "eye-outline"}
            onPress={() => {
              setIsCurrentPassSecure(!isCurrentPassSecure);
            }}
          />
        }
      />
      <Helper input={formik.errors.oldPassword} />

      <TextInput
        label={"New Password"}
        value={formik.values.newPassword}
        onChangeText={formik.handleChange("newPassword")}
        secureTextEntry={isNewPasswordSecure}
        right={
          <TextInput.Icon
            icon={isNewPasswordSecure ? "eye-off-outline" : "eye-outline"}
            onPress={() => {
              setIsNewPasswordSecure(!isNewPasswordSecure);
            }}
          />
        }
      />
      <Helper input={formik.errors.newPassword} />

      <TextInput
        label={"New Password (Retry)"}
        value={formik.values.confirmNewPassword}
        onChangeText={formik.handleChange("confirmNewPassword")}
        secureTextEntry={isNewPassRetrySecure}
        right={
          <TextInput.Icon
            icon={isNewPassRetrySecure ? "eye-off-outline" : "eye-outline"}
            onPress={() => {
              setIsNewPassRetrySecure(!isNewPassRetrySecure);
            }}
          />
        }
      />
      <Helper input={formik.errors.confirmNewPassword} />

      <Button
        mode="contained"
        style={styles.button}
        onPress={formik.handleSubmit}
        loading={loading}
        disabled={loading}
      >
        Update Password
      </Button>
    </ScrollView>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  button: {
    marginTop: 15,
  },
});
