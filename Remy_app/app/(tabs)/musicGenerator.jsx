import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Switch,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';
import axios from 'axios';

// Replace this with your actual config import:
import { BEATHOVEN_API_URL, API_KEY } from '../../scripts/beathovenConfig';

export default function MusicGenerator() {
  const [prompt, setPrompt] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [looping, setLooping] = useState(false);
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const generateMusic = async () => {
    setLoading(true);
    setErrorMessage('');

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
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data && response.data.task_id) {
        await checkTaskStatus(response.data.task_id);
      } else {
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
    if (!taskId) {
      setErrorMessage('Task ID is undefined. Please try again.');
      return;
    }

    try {
      const response = await axios.get(
        `${BEATHOVEN_API_URL}/api/v1/tasks/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );

      if (response.data.status === 'composed' && response.data.meta?.track_url) {
        setAudioUrl(response.data.meta.track_url);
        playAudio(response.data.meta.track_url);
      } else if (
        response.data.status === 'composing' ||
        response.data.status === 'running'
      ) {
        // Retry after 3 seconds
        setTimeout(() => checkTaskStatus(taskId), 3000);
      } else {
        setErrorMessage('Music composition failed. Please try again.');
      }
    } catch (error) {
      console.error('Error checking task status:', error.response?.data || error.message);
      setErrorMessage('Error checking task status. Please try again.');
    }
  };

  const playAudio = async (url) => {
    try {
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: url },
        { shouldPlay: true, isLooping: looping }
      );
      setSound(newSound);
      setIsPlaying(true);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (!status.isLoaded) return;
        if (status.isPlaying && status.durationMillis) {
          setProgress(status.positionMillis / status.durationMillis);
        }
        if (status.didJustFinish) {
          setIsPlaying(false);
          setProgress(0);
        }
      });
    } catch (error) {
      Alert.alert('Audio Error', 'Could not play the audio. Please try again.');
      console.error(error);
    }
  };

  const togglePlayPause = async () => {
    if (!sound) return;
    if (isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
    } else {
      await sound.playAsync();
      setIsPlaying(true);
    }
  };

  const handleSliderChange = async (value) => {
    if (!sound) return;
    const status = await sound.getStatusAsync();
    if (status.isLoaded && status.durationMillis) {
      const newPosition = value * status.durationMillis;
      await sound.setPositionAsync(newPosition);
      setProgress(value);
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup: unload the sound if the screen unmounts
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  return (
    <View style={styles.container}>
      {/* Use the same gradient colors as your LoginScreen */}
      <LinearGradient
        colors={['#6A608C', '#2E096D']}
        style={styles.gradient}
      >
        <ScrollView
          style={{ flex: 1, width: '100%' }}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Top header with brand */}
          <View style={styles.header}>
            <Text style={styles.brandTitle}>Remy</Text>
          </View>

          {/* Main content area */}
          <View style={styles.mainContent}>
            <Text style={styles.screenTitle}>Music Generator</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter a music theme"
              placeholderTextColor="#aaa"
              value={prompt}
              onChangeText={setPrompt}
            />

            {/* Switch for Looping */}
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Loop the music?</Text>
              <Switch
                value={looping}
                onValueChange={setLooping}
                thumbColor={looping ? '#4cd137' : '#e84118'}
                trackColor={{ false: '#e1e1e1', true: '#74b9ff' }}
              />
            </View>

            {/* Generate button with bubble shape */}
            <TouchableOpacity
              style={styles.button}
              onPress={generateMusic}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Generating...' : 'Generate Music'}
              </Text>
            </TouchableOpacity>

            {errorMessage ? (
              <Text style={styles.errorText}>{errorMessage}</Text>
            ) : null}

            {/* If we have an audio URL, show player controls */}
            {audioUrl ? (
              <>
                <Text style={styles.subTitle}>Generated Music</Text>

                {/* Play/Pause Bubble Button */}
                <TouchableOpacity
                  style={styles.button}
                  onPress={togglePlayPause}
                >
                  <Text style={styles.buttonText}>
                    {isPlaying ? 'Pause' : 'Play'}
                  </Text>
                </TouchableOpacity>

                {/* Slider Progress */}
                <View style={styles.sliderContainer}>
                  <Text style={styles.progressText}>
                    Progress: {Math.round(progress * 100)}%
                  </Text>
                  <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={1}
                        value={progress}
                        onValueChange={handleSliderChange}
                        thumbTintColor="#FFF"            // White thumb
                        minimumTrackTintColor="#6A608C"  // Purple for the filled section
                        maximumTrackTintColor="#2E096D"  // Darker purple for the unfilled section
                        />

                </View>
              </>
            ) : null}
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  /* Outer container to fill screen */
  container: {
    flex: 1,
  },
  /* Gradient background styling */
  gradient: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scrollContent: {
    paddingHorizontal: 30,
    paddingBottom: 30,
  },
  /* Header row (brand at top) */
  header: {
    marginTop: 60,
    marginBottom: 20,
    width: '100%',
    alignItems: 'flex-start',
  },
  brandTitle: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
  /* Main content area */
  mainContent: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  screenTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 30, // bubble corners
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  /* Switch container (for looping toggle) */
  switchContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  switchLabel: {
    fontSize: 16,
    color: '#fff',
  },
  /* Bubble button */
  button: {
    backgroundColor: '#2E096D',
    paddingVertical: 15,
    borderRadius: 30,
    marginBottom: 10,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  /* Error text */
  errorText: {
    color: '#ffcccc',
    marginTop: 10,
    textAlign: 'center',
  },
  /* Subtitle text (e.g., "Generated Music") */
  subTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginVertical: 20,
  },
  /* Slider container */
  sliderContainer: {
    width: '100%',
    marginTop: 10,
  },
  progressText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  slider: {
    width: '100%',
    height: 40,
  },
});
