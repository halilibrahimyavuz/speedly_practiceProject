import {createNativeStackNavigator} from "@react-navigation/native-stack";
import AboutScreen from "../about-screen";
import Header from "../../components/common/header";

const Stack = createNativeStackNavigator();

const AboutStack = () => {
    return (

        // about

        <Stack.Navigator  screenOptions={{
            header:(props)=> <Header {...props}/>
        }}>
          
            <Stack.Screen name="about" component={AboutScreen}  options={{title:"About"}}   />

        </Stack.Navigator>
    );
}

export default AboutStack;