import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { firestore, collection, getDocs } from './firebaseConfig';  // Updated import

const FetchUsers = () => {
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        console.log('Fetching users data...');
        
        // Fetch the 'users' collection
        const usersCollection = collection(firestore, 'users');  // Reference the 'users' collection
        const snapshot = await getDocs(usersCollection);  // Fetch all documents from the collection
        
        // Map the snapshot to an array of user data
        const usersArray = snapshot.docs.map(doc => doc.data());
        
        // Set the fetched data to the state
        setUsersData(usersArray);

        // Log the users data to the console for debugging
        console.log('Users Data:', usersArray);
      } catch (error) {
        console.error('Error fetching users data:', error);
      }
    };

    fetchUsersData();
  }, []); // Empty dependency array to run this effect only once when the component mounts

  return (
    <View>
      {usersData.length > 0 ? (
        usersData.map((user, index) => (
          <View key={index}>
            <Text>Name: {user.name}</Text>
            <Text>Email: {user.email}</Text>
            <Text>Password: (userData.password)</Text>
            <Text>Login: (userData.isLoggedIn)</Text>
            <Text>Timezone: {user.timezone}</Text>
            <Text>Recommended Sleep: {user.recommendedSleep}</Text>
            <Text>Preferred Bedtime: {user.preferredBedtime}</Text>
            <Text>Preferred Wake Time: {user.preferredWakeTime}</Text>
          </View>
        ))
      ) : (
        <Text>No users found</Text>
      )}
    </View>
  );
};

export default FetchUsers;