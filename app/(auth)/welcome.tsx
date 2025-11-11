import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Polygon } from "react-native-svg";

const { width } = Dimensions.get("window");

const slides = [
  {
    image: require("../../assets/redCar.png"), // ✅ Fixed: Use require()
    title: "Buy",
    subtitle: "Your Dream Car",
  },
  {
    image: require("../../assets/verifed.png"), // ✅ Fixed: Use require()
    title: "Verified",
    subtitle: "Car Sellers",
  },
  {
    image: require("../../assets/chat.png"), // ✅ Fixed: Use require()
    title: "Direct Chat",
    subtitle: "With Car Dealer",
  },
  {
    image: require("../../assets/yellowCar.png"), // ✅ Fixed: Use require()
    title: "Sell",
    subtitle: "Your Used Car",
  },
];

export default function ExchWelcomeScreen() {
  const [mobile, setMobile] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out and slide out current content (right to left)
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: -width, // Slide to left
          duration: 500,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Update index
        setCurrentIndex((prev) => (prev + 1) % slides.length);

        // Reset position to right side
        slideAnim.setValue(width);

        // Slide in from right and fade in new content
        Animated.parallel([
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 500,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
        ]).start();
      });

      // Rotate octagon anticlockwise by 1/8th of a circle (45 degrees)
      Animated.timing(rotateAnim, {
        toValue: rotateAnim._value - 45,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const octagonRotation = rotateAnim.interpolate({
    inputRange: [-360, 0],
    outputRange: ["-360deg", "0deg"],
  });

  const currentSlide = slides[currentIndex];

  return (
    <LinearGradient
      colors={["#4A90E2", "#3B7BD4", "#2E5FB8"]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header - Constant */}
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Welcome to <Text style={styles.headerBold}>EXCH</Text>
          </Text>
        </View>

        {/* Main Content Area */}
        <View style={styles.mainContent}>
          {/* Rotating Octagon Container */}
          <View style={styles.carContainer}>
            {/* Animated Octagon Background */}
            <Animated.View
              style={[
                styles.octagonContainer,
                {
                  transform: [{ rotate: octagonRotation }],
                },
              ]}
            >
              <Svg height="300" width="300" viewBox="0 0 300 300">
                <Polygon
                  points="150,40 213,67 251,130 251,170 213,233 150,260 87,233 49,170 49,130 87,67"
                  fill="rgba(30, 64, 175, 0.6)"
                />
              </Svg>
            </Animated.View>

            {/* Animated Badge/Image */}
            <Animated.View
              style={[
                styles.badgeContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ translateX: slideAnim }],
                },
              ]}
            >
              <Image
                source={currentSlide.image} // ✅ Fixed: Removed { uri: ... }
                style={styles.badgeImage}
                resizeMode="contain"
              />
            </Animated.View>

            {/* Decorative circles */}
            <View style={styles.yellowCircle} />
            <View style={styles.blueCircle} />
          </View>

          {/* Animated Title */}
          <Animated.View
            style={[
              styles.titleContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateX: slideAnim }],
              },
            ]}
          >
            <Text style={styles.title}>{currentSlide.title}</Text>
            <Text style={styles.subtitle}>{currentSlide.subtitle}</Text>
          </Animated.View>

          {/* Pagination Dots */}
          <View style={styles.pagination}>
            {slides.map((_, index) => (
              <View
                key={index}
                style={[styles.dot, currentIndex === index && styles.activeDot]}
              />
            ))}
          </View>
        </View>

        {/* Login Card */}
        <View style={styles.loginCard}>
          <TextInput
            style={styles.input}
            placeholder="enter your mobile number"
            placeholderTextColor="#9CA3AF"
            keyboardType="phone-pad"
            value={mobile}
            onChangeText={setMobile}
          />

          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          <Text style={styles.dividerText}>Or, login with</Text>

          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialIcon}>✉️</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialIcon}>G</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialIcon}>🍎</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.guestContainer}>
            <Text style={styles.guestText}>here to explore. </Text>
            <TouchableOpacity>
              <Text style={styles.guestLink}>Continue as Guest</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "300",
  },
  headerBold: {
    fontWeight: "bold",
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  carContainer: {
    height: 350,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginBottom: 20,
  },
  octagonContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    height: 300,
  },
  badgeContainer: {
    zIndex: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 280,
    height: 280,
  },
  badgeImage: {
    width: "100%",
    height: "100%",
  },
  yellowCircle: {
    position: "absolute",
    bottom: 40,
    right: 30,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FBBF24",
    opacity: 0.8,
  },
  blueCircle: {
    position: "absolute",
    top: 60,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#60A5FA",
    opacity: 0.6,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 15,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 48,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "300",
    marginTop: 5,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#FFFFFF",
    width: 24,
  },
  loginCard: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 25,
    paddingTop: 30,
    paddingBottom: 35,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 15,
    marginBottom: 15,
    color: "#374151",
  },
  loginButton: {
    backgroundColor: "#E5E7EB",
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonText: {
    color: "#9CA3AF",
    fontSize: 16,
    fontWeight: "600",
  },
  dividerText: {
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: 13,
    marginBottom: 15,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 20,
  },
  socialButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  socialIcon: {
    fontSize: 20,
  },
  guestContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  guestText: {
    color: "#6B7280",
    fontSize: 13,
  },
  guestLink: {
    color: "#374151",
    fontSize: 13,
    fontWeight: "600",
  },
});

// Installation Instructions:
// npm install expo-linear-gradient react-native-svg
// or
// expo install expo-linear-gradient react-native-svg
