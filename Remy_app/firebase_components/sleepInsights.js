import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { OPENAI_API_KEY } from '@env';

const SleepInsights = ({ sleepData }) => {
  const [insight, setInsight] = useState('');
  const [loading, setLoading] = useState(false);

  const getSleepInsight = async () => {
    setLoading(true);
    try {
      const prompt = `
      Analyze this sleep data and provide recommendations:
      Sleep Start: ${sleepData.sleepStart}
      Sleep End: ${sleepData.sleepEnd}
      Total Sleep: ${sleepData.totalSleep} hours
      Sleep Debt: ${sleepData.sleepDebt} hours
      Deep Sleep: ${sleepData.deepSleep} hours
      Wake-ups: ${sleepData.wakeUps}
      Heart Rate: ${sleepData.heartRate}

      Generate a brief insight and 2 recommendations.
      `;

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'system', content: prompt }],
          max_tokens: 100,
        },
        {
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const insightText = response.data.choices[0].message.content;
      setInsight(insightText);
    } catch (error) {
      console.error('Error fetching insights:', error);
      setInsight('Failed to load insights. Try again.');
    }
    setLoading(false);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Sleep Insights</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Text>{insight}</Text>
      )}
      <Button title="Generate Insights" onPress={getSleepInsight} />
    </View>
  );
};

export default SleepInsights;