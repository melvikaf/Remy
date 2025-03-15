import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Switch, ScrollView } from 'react-native';
import { Audio } from 'expo-av';
import axios from 'axios';
import { BEATHOVEN_API_URL, API_KEY } from '../config/beathovenConfig';  // Import the config
import Slider from '@react-native-community/slider';  // Import the cross-platform Slider

export default function MusicGenerator() {
  const [prompt, setPrompt] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [looping, setLooping] = useState(false); // State for the switch (looping)
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false); // Track if audio is playing
  const [progress, setProgress] = useState(0); // Track audio progress

  const generateMusic = async () => {
    console.log('generateMusic invoked');
    setLoading(true);
    setErrorMessage('');

    // Log the request body
    console.log('Request body:', {
      prompt: { text: prompt },
      format: 'wav',
      looping: looping,
    });

    try {
      const response = await axios.post(
        `${BEATHOVEN_API_URL}/api/v1/tracks/compose`,
        {
          prompt: { text: prompt },
          format: 'wav',
          looping: looping,
        },
        {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('API Response:', response.data);

      if (response.data && response.data.task_id) {
        await checkTaskStatus(response.data.task_id);
      } else {
        console.error('Task ID missing:', response.data);
        setErrorMessage('Failed to start music generation. Please check your request.');
      }
    } catch (error) {
      console.error('Error generating music:', error.response?.data || error.message);
      setErrorMessage('Error generating music. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const checkTaskStatus = async (taskId) => {
    try {
      console.log('Checking task status for taskId:', taskId);  // Log the taskId for debugging

      if (!taskId) {
        console.error('Task ID is undefined!');
        setErrorMessage('Task ID is undefined. Please try again.');
        return;
      }

      const response = await axios.get(
        `${BEATHOVEN_API_URL}/api/v1/tasks/${taskId}`,  // Correct endpoint with taskId
        {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
          },
        }
      );

      console.log('Task status:', response.data);

      if (response.data.status === 'composed' && response.data.meta.track_url) {
        setAudioUrl(response.data.meta.track_url);  // Set the audio URL from the response
        playAudio(response.data.meta.track_url);  // Play the audio once it's ready
      } else if (response.data.status === 'composing' || response.data.status === 'running') {
        // If still processing, retry checking the status
        console.log('Track still composing, retrying in 3 seconds...');
        setTimeout(() => checkTaskStatus(taskId), 3000);  // Retry after 3 seconds
      } else {
        setErrorMessage('Music composition failed. Please try again.');
      }
    } catch (error) {
      console.error('Error checking task status:', error.response?.data || error.message);
      setErrorMessage('Error checking task status. Please try again.');
    }
  };

  const playAudio = async (url) => {
    const { sound } = await Audio.Sound.createAsync(
      { uri: url },
      { shouldPlay: true, isLooping: looping }  // Play the audio and respect the looping state
    );

    setSound(sound);
    sound.playAsync();  // Start playing the audio
    setIsPlaying(true);  // Set audio playing state to true

    // Monitor the progress of audio playback
    sound.setOnPlaybackStatusUpdate(status => {
      if (status.isPlaying) {
        setProgress(status.positionMillis / status.durationMillis);  // Update progress
      }
    });
  };

  const togglePlayPause = async () => {
    if (isPlaying) {
      await sound.pauseAsync();  // Pause audio if playing
    } else {
      await sound.playAsync();  // Play audio if paused
    }
    setIsPlaying(!isPlaying);  // Toggle the playing state
  };

  const handleSliderChange = (value) => {
    sound.setPositionAsync(value * sound._loadedSound.durationMillis);  // Change position based on slider value
    setProgress(value);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter a music theme"
        value={prompt}
        onChangeText={setPrompt}
      />

      {/* Switch for Looping */}
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Loop the music:</Text>
        <Switch
          value={looping}
          onValueChange={setLooping}  // Toggle looping state on change
          thumbColor={looping ? "#4cd137" : "#e84118"}  // Green for ON, Red for OFF
          trackColor={{ false: "#e1e1e1", true: "#74b9ff" }}  // Color for the track
        />
      </View>

      <Button title="Generate Music" onPress={generateMusic} disabled={loading} />
      {loading && <Text style={styles.loadingText}>Generating music...</Text>}
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

      {audioUrl && (
        <>
          <Text style={styles.audioText}>Generated Music:</Text>
          {/* Play/Pause Button */}
          <Button title={isPlaying ? "Pause" : "Play"} onPress={togglePlayPause} />
          {/* Progress Bar */}
          <View style={styles.progressBarContainer}>
            <Text>Progress: {Math.round(progress * 100)}%</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={1}
              value={progress}
              onValueChange={handleSliderChange}
              thumbTintColor="#4cd137"  // Set the thumb color
              minimumTrackTintColor="#74b9ff"  // Set minimum track color
              maximumTrackTintColor="#e84118"  // Set maximum track color
            />
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,  // Ensures the container fills the screen
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',  // Set the background color of the whole container to pink
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
    color: 'black',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  switchLabel: {
    marginRight: 10,
    fontSize: 16,
    color: 'black',
  },
  loadingText: {
    color: 'gray',
    marginTop: 10
  },
  errorText: {
    color: 'red',
    marginTop: 10
  },
  audioText: {
    marginTop: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  progressBarContainer: {
    marginTop: 20,
    width: '80%',
  },
  slider: {
    width: '100%',
    height: 40,
  },
});
