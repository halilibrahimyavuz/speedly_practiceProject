import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CarsScreen from "../cars-screen";
import CarDetailsScreen from "../car-details-screen";
import ReservationResultScreen from "../reservation-result-screen";
import Header from "../../components/common/header";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator 
         initialRouteName="cars"
         screenOptions={{
            header:(props)=> <Header {...props}/>
        }}>
        
            {/* cars, car-details, reservation-result */}

            <Stack.Screen name="cars" component={CarsScreen} options={{title:"Home"}} />
            <Stack.Screen name="car-details" component={CarDetailsScreen}  options={{title:"Car Detail"}}  />
            <Stack.Screen name="reservation-result" component={ReservationResultScreen}   options={{title:"Rezervation Result"}}  />

        </Stack.Navigator>
    );
}

export default HomeStack;