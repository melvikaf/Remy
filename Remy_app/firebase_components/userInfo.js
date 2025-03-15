import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { firestore } from './firebaseConfig';

const UserProfile = ({ userId }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userDoc = await firestore.collection('users').doc(userId).get();
      setUserData(userDoc.data());
    };
    fetchUserData();
  }, [userId]);

  return (
    <View>
      {userData && (
        <>
          <Text>Name: {userData.name}</Text>
          <Text>Email: {userData.email}</Text>
          <Text>Timezone: {userData.timezone}</Text>
          <Text>Recommended Sleep: {userData.recommendedSleep} hours</Text>
          <Text>Preferred Bedtime: {userData.preferredBedtime}</Text>
          <Text>Preferred Wake Time: {userData.preferredWakeTime}</Text>
        </>
      )}
    </View>
  );
};

export default UserProfile;