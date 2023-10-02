import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { HelperText } from 'react-native-paper'

const Helper = ({ input }) => {
    return (
        <HelperText
            type='error'
            visible={input}
        >
            {input}
        </HelperText>
    )
}

export default Helper

const styles = StyleSheet.create({})