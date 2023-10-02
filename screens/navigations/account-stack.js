import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../profile-screen";
import ChangePasswordScreen from "../change-password";
import ReservationsScreen from "../reservations-screen";
import ReservationDetailsScreen from "../reservation-details-scren";
import Header from "../../components/common/header";
import LoginScreen from "../login-screen";
import RegisterScreen from "../register-screen";
import { useContext } from "react";
import MyContext from "../../store";
const Stack = createNativeStackNavigator();

const AccountStack = () => {
  const { myUser } = useContext(MyContext);

  return (
    // profile, change password, reservations,reservation-details

    <Stack.Navigator
      initialRouteName={myUser ? "profile" : "login"}
      screenOptions={{
        header: (props) => <Header {...props} />,
      }}
    >
      {myUser ? (
        <Stack.Group>
          <Stack.Screen
            name="profile"
            component={ProfileScreen}
            options={{ title: "Profile" }}
          />
          <Stack.Screen
            name="change-password"
            component={ChangePasswordScreen}
            options={{ title: "Change Password" }}
          />
          <Stack.Screen
            name="reservations"
            component={ReservationsScreen}
            options={{ title: "Reservations" }}
          />
          <Stack.Screen
            name="reservation-details"
            component={ReservationDetailsScreen}
            options={{ title: "Reservation Details" }}
          />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen
            name="login"
            component={LoginScreen}
            options={{ title: "Login" }}
          />
          <Stack.Screen
            name="register"
            component={RegisterScreen}
            options={{ title: "Register" }}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default AccountStack;
