import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Card = ({ brandName, brandIcon, contactInfo, phone, email }) => {
  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Image source={brandIcon} style={styles.icon} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.brandName}>{brandName}</Text>
        <Text style={styles.contactInfo}>{contactInfo}</Text>
        <Text style={styles.phone}>{phone}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  iconContainer: {
    marginRight: 10,
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  infoContainer: {
    flex: 1,
  },
  brandName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color:'black'
  },
  contactInfo: {
    fontSize: 16,
    marginBottom: 5,
    color:'black'
  },
  phone: {
    fontSize: 16,
    marginBottom: 5,
    color:'black'
  },
  email: {
    fontSize: 16,
    color:'black'
  },
});

export default Card;