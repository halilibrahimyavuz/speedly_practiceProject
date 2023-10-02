import { StyleSheet, Text, View } from 'react-native'
import { Card, Title, Paragraph, IconButton } from "react-native-paper";
import colors from '../../utils/constants/colors';
import { useNavigation } from '@react-navigation/native';
import { getVehicleImage } from '../../utils/functions/vehicle';

const Car = ({ data }) => {
    const { model, pricePerHour, image, id } = data;
    const navigation = useNavigation();

    return <Card style={styles.card}>
        <Card.Cover source={ getVehicleImage(image[0])} />
        <Card.Content style={styles.content}>

            <View>
                <Title style={styles.title}>{model}</Title>
                <Paragraph style={styles.paragraph}>from ${pricePerHour}/hour</Paragraph>
            </View>

            <IconButton
                icon="chevron-right"
                size={30}
                style={styles.button}
                iconColor='white'
                onPress={() => navigation.navigate("car-details", {car: data})}
            />
        </Card.Content>
    </Card>
}

const styles = StyleSheet.create({
    card: {
        margin: 15
    },
    content: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    button: {
        backgroundColor: colors.color1
    },
    title: {
        fontWeight: "bold"
    },
    paragraph: {
        color: colors.color3
    }
})

export default Car;