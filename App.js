import TabNavigator from "./screens/navigations/tab-navigator";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import MyContext from "./store";
import { useEffect, useState } from "react";
import colors from "./utils/constants/colors";
import { en, registerTranslation } from "react-native-paper-dates";
import Toast from "react-native-toast-message";
import * as SecureStore from "expo-secure-store";
import { getUser } from "./api/user-service";
import { StatusBar } from "expo-status-bar";

registerTranslation("en", en);

export default function App() {
  const [searchBarVisible, setSearchBarVisible] = useState(false);
  const [myUser, setMyUser] = useState();

  //PaperProvider dan gelen default degerlerının bazısnıj degısmesı ıcın yaptık
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: colors.color1,
      secondary: colors.color2,
      tertiary: colors.color3,
    },
  };

  //uygulama  ılk acıldıgın gereklı cekılecek datalar
  const getData = async () => {
    // load user ınfo
    const token = await SecureStore.getItemAsync("token");

    //token varsa kullanıcın bılgıısı cekme
    if (token) {
      const responceUser = await getUser();
      setMyUser(responceUser.data);
    }
  };

  //uygulama ılk acıldıgında token varmı dıye kontrol edecek method
  useEffect(() => {
    getData();
  }, []);

  return (
    
    <MyContext.Provider
      value={{
        searchBarVisible,
        setSearchBarVisible,
        myUser,
        setMyUser,
      }}
    >
     <StatusBar style="light" />
      <PaperProvider theme={theme}>
        <TabNavigator />
        <Toast />
      </PaperProvider>
    </MyContext.Provider>
  );
}
