import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";
import { useFormik } from "formik";
import Helper from "../components/common/helper";
import { login, getUser } from "../api/user-service";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";
import MyContext from "../store";

const LoginScreen = () => {
  const { setMyUser } = useContext(MyContext);
  const [isPassSecure, setIsPassSecure] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  //*************Formik and Yup  **************/
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const onSubmit = async (values) => {
    console.log(values);
    //login işlemi
    try {
      setLoading(true); //loadıng donmeye baslasın ıslem sırasında

      console.log("try içindeki values " + values);
      const response = await login(values);
      console.log(response);
      console.log("test1");

      //tokenin localde tutlması
      await SecureStore.setItemAsync("token", response.data.token);

      //kullanıcı bilgisinin çekilmesi
      const responseUser = await getUser();

      //merkezi state e eklenmesı
      setMyUser(responseUser.data);

      setLoading(false); //beklemeyi bitir.

      Toast.show({
        type: "success",
        text1: "Logged in successfully.",
      });
    } catch (error) {
      setLoading(false); //hata gelırse de beklemeyi bitir. yoksa sureklı doner
      console.error("Login Error:", error); // Hata mesajını konsola yazdırın
      Toast.show({
        type: "error",
        text1: error.response.data.message,
    
      });
    }

    // console.log(values);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  // ******************************************************

  return (
    <View style={styles.container}>
      <TextInput
        label={"Email"}
        value={formik.values.email}
        onChangeText={formik.handleChange("email")}
        style={styles.textInput}
        keyboardType="email-address"
      />

      <Helper input={formik.errors.email} />

      <TextInput
        label={"Password"}
        style={styles.textInput}
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        secureTextEntry={isPassSecure} // secure durumunu states ıle kontrol edıyoruz
        right={
          <TextInput.Icon // secure true ıse göz ikonu calısıyır tıklanınca kapanıyor vs
            icon={isPassSecure ? "eye-off-outline" : "eye-outline"} // secure durumuna gore gozu acar kapar
            onPress={() => {
              setIsPassSecure(!isPassSecure);
            }}
          />
        }
      />

      <Helper input={formik.errors.password} />

      <Button
        mode="contained"
        style={styles.button}
        onPress={formik.handleSubmit}
        loading={loading} // loadıng durumuna göre loadıng fonk. calıssın
        disabled={loading}  //loadıng durumuna göre disbled olsun
      >
        LOGIN
      </Button>

      <Button
        mode="outlined"
        style={styles.button}
        onPress={() => navigation.navigate("register")}
      >
        Create New Account
      </Button>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  textInput: {
    marginVertical: 10,
  },
  button: {
    marginTop: 30,
  },
});
