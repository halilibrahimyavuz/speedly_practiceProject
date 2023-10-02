import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeStack from "./home-stack";
import AboutStack from "./about-stack";
import AccountStack from "./account-stack";
import Icon from "@expo/vector-icons/Feather";
import colors from "../../utils/constants/colors";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: colors.color1,
                    tabBarLabelStyle: { fontSize: 14 },
                    headerShown:false
                }}
            >

                <Tab.Screen name="home-stack" component={HomeStack}
                    options={{
                        title: "Home",
                        tabBarIcon: () => <Icon name="home" size={24} color={colors.color1} />
                    }}
                />
                <Tab.Screen name="about-stack" component={AboutStack}
                    options={{
                        title: "About",

                        tabBarIcon: () => <Icon name="info" size={24} color={colors.color1} />
                    }}
                />
                <Tab.Screen name="account-stack" component={AccountStack}
                    options={{
                        title: "Account",
                        tabBarIcon: () => <Icon name="user" size={24} color={colors.color1} />
                    }}
                />

            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default TabNavigator;