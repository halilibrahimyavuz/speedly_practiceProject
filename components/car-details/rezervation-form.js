import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import * as Yup from "yup";
import { useFormik } from 'formik';
import { Button, HelperText, TextInput, useTheme } from 'react-native-paper';
import Spacer from '../common/spacer';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';
import moment from 'moment';
import Helper from '../common/helper';
import formatDateTime from '../../utils/functions/datetime';
import { isCarAvailable } from '../../api/reservation-service';
import Toast from 'react-native-toast-message';
import MyContext from '../../store';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import colors from '../../utils/constants/colors';
import { useNavigation } from '@react-navigation/native';

const ReservationForm = ({ setActiveScreen, carId, setReservationState }) => {
    const [isVisiblePickUpDate, setisVisiblePickUpDate] = useState(false);
    const [isVisiblePickUpTime, setisVisiblePickUpTime] = useState(false);
    const [isVisibleDropOffDate, setisVisibleDropOffDate] = useState(false);
    const [isVisibleDropOffTime, setisVisibleDropOffTime] = useState(false);

    const { myUser } = useContext(MyContext);
    const navigation = useNavigation();

    const initialValues = {
        pickUpLocation: "",
        dropOffLocation: "",
        pickUpDate: "",
        pickUpTime: "",
        dropOffDate: "",
        dropOffTime: "",
    };

    const validationSchema = Yup.object({
        pickUpLocation: Yup.string().required("Pickup location is required!"),
        dropOffLocation: Yup.string().required("Dropoff location is required!"),
        pickUpDate: Yup.string().required("Pickup date is required!"),
        pickUpTime: Yup.string().required("Pickup time is required!"),
        dropOffDate: Yup.string().required("Dropoff date is required!"),
        dropOffTime: Yup.string().required("Dropoff time is required!"),
    });

    const onSubmit = async (values) => {
        const {
            pickUpLocation,
            dropOffLocation,
            pickUpDate,
            pickUpTime,
            dropOffDate,
            dropOffTime
        } = values;

        try {
            const pickUpFormatted = formatDateTime(pickUpDate, pickUpTime);
            const dropOffFormatted = formatDateTime(dropOffDate, dropOffTime);

            if (dropOffFormatted < pickUpFormatted) {
                console.log("BIRAKMA TARİHİ ERKEN OLAMAZ !!!!");
            }
            else {
                // uygunluk kontrol edilecek (backend)

                const reservation = {
                    carId: carId,
                    pickUpDateTime: pickUpFormatted,
                    dropOffDateTime: dropOffFormatted,
                }

                const response = await isCarAvailable(reservation);

                const { available, totalPrice } = response.data;

                if (!available) {
                    throw "The car is not available. Please select another date."
                }

                reservation.price = totalPrice;
                reservation.pickUpLocation = values.pickUpLocation;
                reservation.dropOffLocation = values.dropOffLocation;

                setReservationState(reservation);

                Toast.show({
                    type: "success",
                    text1: "Car is available !"
                })

                setActiveScreen("payment");

            }
        }
        catch (error) {
            Toast.show({
                type: "error",
                text1: error?.response?.data?.message ?? error
            })
        }


    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    const theme = useTheme();

    return (
        <View style={styles.container}>

            <Text style={{ color: theme.colors.tertiary, textAlign:"center", fontSize: 18, fontWeight: "bold" }}>Reservation Form</Text>

            <Spacer />

            {!myUser ?
                (<View style={styles.loginWarning}>
                    <Icon name='shield-account' size={60} color={colors.color3} />
                    <Spacer height={10} />
                    <Text style={styles.loginText}>Please login before{"\n"}reservation.</Text>
                    <Spacer height={10} />
                    <Button mode='contained'
                        onPress={() => { navigation.navigate("account-stack") }}>
                        Login Now
                    </Button>
                    <Spacer />
                </View>)
                :

                (< View >
                    {/* pickup location (aracı alma yeri) */}
                    < TextInput
                        label="Pick-up Location"
                        value={formik.values.pickUpLocation}
                        onChangeText={formik.handleChange("pickUpLocation")}
                    />

                    <Helper input={formik.errors.pickUpLocation} />

                    {/* dropoff location (aracı bırakma yeri) */}
                    <TextInput
                        label={"Drop-off Location"}
                        value={formik.values.dropOffLocation}
                        onChangeText={formik.handleChange("dropOffLocation")}
                    />

                    <Helper input={formik.errors.dropOffLocation} />

                    {/* pickup date (alma tarihi) */}
                    <View style={styles.dateRow}>
                        <View style={{ flex: 4, marginRight: 7 }}>
                            <TextInput
                                label={"Pickup Date"}
                                value={formik.values.pickUpDate ? moment(formik.values.pickUpDate, "YYYY-MM-DD").format("MM/DD/YYYY") : ""}
                                onPressIn={() => setisVisiblePickUpDate(true)}
                            />

                            <Helper input={formik.errors.pickUpDate} />

                            <DatePickerModal
                                locale='en'
                                visible={isVisiblePickUpDate}
                                mode='single'
                                date={formik.values.pickUpDate}
                                validRange={{
                                    startDate: new Date()
                                }}
                                onConfirm={(params) => {
                                    formik.setFieldValue("pickUpDate", params.date);

                                    setisVisiblePickUpDate(false);
                                }}
                                onDismiss={() => {
                                    setisVisiblePickUpDate(false);
                                }}
                            />
                        </View>

                        {/* saat kısmı */}
                        <View style={{ flex: 3 }}>
                            <TextInput
                                label={"Time"}
                                value={formik.values.pickUpTime ? moment(formik.values.pickUpTime, "HH:mm").format("HH:mm") : ""}
                                onPressIn={() => setisVisiblePickUpTime(true)}
                            />

                            <Helper input={formik.errors.pickUpTime} />


                            <TimePickerModal
                                locale='en'
                                visible={isVisiblePickUpTime}
                                onConfirm={(params) => {
                                    formik.setFieldValue("pickUpTime", `${params.hours}:${params.minutes}`)

                                    setisVisiblePickUpTime(false);
                                }}
                                onDismiss={() => {
                                    setisVisiblePickUpTime(false);
                                }}
                            />
                        </View>
                    </View>

                    {/* dropoff date (bırakma tarihi) */}
                    <View style={styles.dateRow}>
                        <View style={{ flex: 4, marginRight: 7 }}>
                            <TextInput
                                label={"Drop-off Date"}
                                value={formik.values.dropOffDate ? moment(formik.values.dropOffDate, "YYYY-MM-DD").format("MM/DD/YYYY") : ""}
                                onPressIn={() => setisVisibleDropOffDate(true)}
                            />
                            <Helper input={formik.errors.dropOffDate} />



                            <DatePickerModal
                                locale='en'
                                visible={isVisibleDropOffDate}
                                mode='single'
                                date={formik.values.dropOffDate}
                                validRange={{
                                    startDate: formik.values.pickUpDate ? formik.values.pickUpDate : new Date()
                                }}
                                onConfirm={(params) => {
                                    formik.setFieldValue("dropOffDate", params.date);
                                    setisVisibleDropOffDate(false);
                                }}
                                onDismiss={() => {
                                    setisVisibleDropOffDate(false);
                                }}
                            />
                        </View>

                        {/* saat kısmı */}
                        <View style={{ flex: 3 }}>
                            <TextInput
                                label={"Time"}
                                value={formik.values.dropOffTime ? moment(formik.values.dropOffTime, "HH:mm").format("HH:mm") : ""}
                                onPressIn={() => setisVisibleDropOffTime(true)}
                            />
                            <Helper input={formik.errors.dropOffTime} />


                            <TimePickerModal
                                locale='en'
                                visible={isVisibleDropOffTime}
                                onConfirm={(params) => {
                                    formik.setFieldValue("dropOffTime", `${params.hours}:${params.minutes}`)
                                    setisVisibleDropOffTime(false);
                                }}
                                onDismiss={() => {
                                    setisVisibleDropOffTime(false);
                                }}
                            />
                        </View>

                    </View>

                    {/* gönder butonu */}
                    <Button mode='contained' onPress={formik.handleSubmit}>
                        Check Availability
                    </Button>


                </View>)
            }
        </View >
    )
}

export default ReservationForm

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    dateRow: {
        flexDirection: "row"
    },
    loginWarning: {
        alignItems: "center"
    },
    loginText: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        color: colors.color3
    }
})