import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { Appbar } from 'react-native-paper'
import colors from '../../utils/constants/colors';
import MyContext from '../../store';

const Header = (props) => {
        
        const {searchBarVisible, setSearchBarVisible} = useContext(MyContext);
        const {back , navigation , options , route} = props; //propsu açtık ıcındekılerı kullancagız

  return (
    
     <Appbar.Header style={styles.headerContainer}>

{/* GEri butonu */}
        {/* //back true gelıyorsa gerı butonu cıkıyor ve gerıdekı sayfaya navigator yapıyoreu */}
        {back &&   <Appbar.BackAction   onPress={ ()=>{navigation.goBack() } }    iconColor='white' />}   

{/* sayfa baslıgı */}
        {/* stack den gelen title ı  başlığa yazmıs oluyoruz  */}
        <Appbar.Content title= {options.title} titleStyle={{color:"white" ,  fontWeight:"bold"}} /> 

{/* arama butonu search bar sadece bu butona tıklayınca cıkması ıcın merkezı state ıle searchbarvısıble ı takıp ettık */}
        {route.name=="cars" && 
         <Appbar.Action
                 icon="magnify"
                 onPress={()=>{setSearchBarVisible(!searchBarVisible)} }
                 iconColor='white'/> 
        }      
        
       

     </Appbar.Header>

  )
}

export default Header

const styles = StyleSheet.create({
    headerContainer:{
        backgroundColor:colors.color1,
        
    }
})