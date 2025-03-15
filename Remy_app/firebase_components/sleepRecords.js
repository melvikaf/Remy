import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { firestore } from './firebaseConfig';

const SleepRecord = ({ userId, date }) => {
  const [sleepData, setSleepData] = useState(null);

  useEffect(() => {
    const fetchSleepData = async () => {
      const sleepDoc = await firestore
        .collection('sleepRecords')
        .doc(userId)
        .collection('records')
        .doc(date)
        .get();
      setSleepData(sleepDoc.data());
    };

    fetchSleepData();
  }, [userId, date]);

  return (
    <View>
      {sleepData && (
        <>
          <Text>Total Sleep: {sleepData.totalSleep} hours</Text>
          <Text>Deep Sleep: {sleepData.deepSleep} hours</Text>
          <Text>Wake-Ups: {sleepData.wakeUps}</Text>
          <Text>Heart Rate: {sleepData.heartRate} bpm</Text>
          <Text>Sleep Quality: {sleepData.sleepQuality}</Text>
        </>
      )}
    </View>
  );
};

export default SleepRecord;