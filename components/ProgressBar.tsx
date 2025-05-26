import React from 'react';
import { Dimensions, PanResponder, StyleSheet, View } from 'react-native';

interface ProgressBarProps {
  percentage: number; // 0-100
  height?: number;
  backgroundColor?: string;
  progressColor?: string; // Optional override for automatic color
  onProgressChange?: (percentage: number) => void; // Callback for progress changes
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  height = 20,
  backgroundColor = '#E5E5E5',
  progressColor, // Optional override
  onProgressChange,
}) => {
  // Ensure percentage is between 0 and 100
  const clampedPercentage = Math.max(0, Math.min(100, percentage));
  
  // Get screen width and calculate 3/4 of it
  const screenWidth = Dimensions.get('window').width;
  const progressBarWidth = screenWidth * 0.75;
  
  // Determine color based on percentage if no override is provided
  const getProgressColor = (percent: number): string => {
    if (progressColor) return progressColor; // Use override if provided
    
    if (percent < 20) return '#F44336'; // Red
    if (percent < 50) return '#FF9800'; // Orange
    if (percent < 80) return '#FFEB3B'; // Yellow
    return '#4CAF50'; // Green
  };

  // Calculate percentage from touch position
  const calculatePercentageFromTouch = (touchX: number): number => {
    const newPercentage = Math.round((touchX / progressBarWidth) * 100);
    return Math.max(0, Math.min(100, newPercentage));
  };

  // Handle progress change
  const handleProgressChange = (newPercentage: number) => {
    if (onProgressChange) {
      onProgressChange(newPercentage);
    }
  };

  // Pan responder for handling touch and drag
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    
    onPanResponderGrant: (event) => {
      // Handle initial touch
      const touchX = event.nativeEvent.locationX;
      const newPercentage = calculatePercentageFromTouch(touchX);
      handleProgressChange(newPercentage);
    },
    
    onPanResponderMove: (event) => {
      // Handle drag movement
      const touchX = event.nativeEvent.locationX;
      const newPercentage = calculatePercentageFromTouch(touchX);
      handleProgressChange(newPercentage);
    },
    
    onPanResponderRelease: () => {
      // Optional: Handle when user releases touch
    },
  });

  return (
    <View style={[styles.container, { width: progressBarWidth, height }]}>
      <View
        style={[
          styles.background,
          {
            backgroundColor,
            height,
            borderRadius: height / 2,
          },
        ]}
        {...panResponder.panHandlers}
      >
        <View
          style={[
            styles.progress,
            {
              width: `${clampedPercentage}%`,
              backgroundColor: getProgressColor(clampedPercentage),
              height,
              borderRadius: height / 2,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  background: {
    width: '100%',
    overflow: 'hidden',
  },
  progress: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
});

export default ProgressBar; 