import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Car from "../components/home/car";
import { Searchbar } from "react-native-paper";
import MyContext from "../store";
import Spacer from "../components/common/spacer";
import { getVehicle } from "../api/vehicle-service";

const CarsScreen = () => {

  const { searchBarVisible } = useContext(MyContext);

  //orjınal lıste arama sonuclarında etkılenmeyen lıste
  const [carListOrj, setCarListOrj] = useState([]);

   //orjinal datayı kaybetmemek ıcın usestate de atayıp orada arama sonucalrını oynayacagıoz
   //bu lıste arama sonuclarında etkılenecek ve sureklı arananı bverecek degısecek
  const [carList, setCarList] = useState([]);


  const getData = async () => {
    const vehicleResponse = await getVehicle();
    setCarList(vehicleResponse.data);
    setCarListOrj(vehicleResponse.data);
  };

  useEffect(() => {
    getData();
  }, []);

  handleSearch = (value) => {
    //search olarak aranan value uerınden fıltreleme yaptık uyanları flatlıstte data kısmında carLıst oalrak ekrana bastık
    newList = carListOrj.filter((item) =>
      item.model.toLowerCase().includes(value.toLowerCase())
    );
    setCarList(newList);
  };

  return (
    <View>
      {/* search bar  visible true ıse goster*/}
      {searchBarVisible && (
        <Searchbar
          placeholder="Search Car..."
          style={{ marginHorizontal: 10, marginTop: 10 }}
          onChangeText={handleSearch}
        />
      )}

      {/* arabalar lıstesı */}

      <FlatList
        data={carList}
        renderItem={(dataItem) => <Car data={dataItem.item} />}
        keyExtractor={(item) => item.id}
        style={{ marginBottom: searchBarVisible ? 60 : 0 }} // ent alttakı boslugu saglamak ıcın yapıldı
      />
    </View>
  );
};

export default CarsScreen;

const styles = StyleSheet.create({});
