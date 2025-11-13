import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ExchVerifyOTP = ({ phoneNumber = "+91 9999999999" }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(59);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (isFirstLoad && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer, isFirstLoad]);

  const handleResendOTP = () => {
    setIsFirstLoad(false);
    setTimer(59);
    setOtp(["", "", "", ""]);

    // Start timer manually after resend
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleKeyPress = (value) => {
    if (value === "backspace") {
      // Find the last filled input and clear it
      for (let i = 3; i >= 0; i--) {
        if (otp[i] !== "") {
          const newOtp = [...otp];
          newOtp[i] = "";
          setOtp(newOtp);
          break;
        }
      }
    } else {
      // Find the first empty input and fill it
      for (let i = 0; i < 4; i++) {
        if (otp[i] === "") {
          const newOtp = [...otp];
          newOtp[i] = value;
          setOtp(newOtp);
          break;
        }
      }
    }
  };

  const keyboardLayout = [
    [
      { num: "1", letters: "" },
      { num: "2", letters: "ABC" },
      { num: "3", letters: "DEF" },
    ],
    [
      { num: "4", letters: "GHI" },
      { num: "5", letters: "JKL" },
      { num: "6", letters: "MNO" },
    ],
    [
      { num: "7", letters: "PQRS" },
      { num: "8", letters: "TUV" },
      { num: "9", letters: "WXYZ" },
    ],
    [
      { num: "", letters: "" },
      { num: "0", letters: "" },
      { num: "backspace", letters: "" },
    ],
  ];

  const BackIcon = () => (
    <View style={{ width: 24, height: 24 }}>
      <Text style={{ fontSize: 24 }}>←</Text>
    </View>
  );

  const BackspaceIcon = () => <Text style={{ fontSize: 20 }}>⌫</Text>;

  const ClockIcon = () => <Text style={{ fontSize: 14 }}>⏱</Text>;

  const ShareIcon = () => <Text style={{ fontSize: 14 }}>↗</Text>;

  const isOtpComplete = otp.every((digit) => digit !== "");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <BackIcon />
          </TouchableOpacity>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          <Text style={styles.title}>verify to login</Text>
          <Text style={styles.subtitle}>
            OTP sent to <Text style={styles.phoneNumber}>{phoneNumber}</Text>{" "}
            via SMS
          </Text>

          {/* OTP Input Boxes */}
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <View key={index} style={styles.otpBox}>
                <Text style={styles.otpText}>{digit}</Text>
              </View>
            ))}
          </View>

          {/* Resend Timer / Button */}
          {timer > 0 ? (
            <View style={styles.timerContainer}>
              <ClockIcon />
              <Text style={styles.timerText}>
                resend OTP in <Text style={styles.timerBold}>{timer}s</Text>
              </Text>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.resendButton}
              onPress={handleResendOTP}
            >
              <ShareIcon />
              <Text style={styles.resendText}>resend OTP</Text>
            </TouchableOpacity>
          )}

          {/* Login Button */}
          <TouchableOpacity
            style={[
              styles.loginButton,
              isOtpComplete && styles.loginButtonActive,
            ]}
            disabled={!isOtpComplete}
          >
            <Text
              style={[
                styles.loginButtonText,
                isOtpComplete && styles.loginButtonTextActive,
              ]}
            >
              login with OTP
            </Text>
          </TouchableOpacity>
        </View>

        {/* Spacer */}
        <View style={styles.spacer} />

        {/* Custom Keyboard */}
        <View style={styles.keyboard}>
          {keyboardLayout.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.keyboardRow}>
              {row.map((key, keyIndex) => (
                <TouchableOpacity
                  key={keyIndex}
                  onPress={() => key.num && handleKeyPress(key.num)}
                  disabled={!key.num}
                  style={[styles.key, !key.num && styles.keyDisabled]}
                >
                  {key.num === "backspace" ? (
                    <BackspaceIcon />
                  ) : (
                    <View style={styles.keyContent}>
                      <Text style={styles.keyNumber}>{key.num}</Text>
                      {key.letters ? (
                        <Text style={styles.keyLetters}>{key.letters}</Text>
                      ) : null}
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  backButton: {
    padding: 4,
  },
  mainContent: {
    paddingHorizontal: 16,
    alignItems: "center",
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 22,
  },
  phoneNumber: {
    color: "#1f2937",
    fontWeight: "500",
  },
  otpContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  otpBox: {
    width: 56,
    height: 56,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  otpText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1f2937",
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 32,
  },
  timerText: {
    fontSize: 14,
    color: "#6b7280",
  },
  timerBold: {
    fontWeight: "600",
    color: "#1f2937",
  },
  resendButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 32,
  },
  resendText: {
    fontSize: 14,
    color: "#1f2937",
    fontWeight: "500",
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#e5e7eb",
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: "center",
  },
  loginButtonActive: {
    backgroundColor: "#2563eb",
  },
  loginButtonText: {
    color: "#9ca3af",
    fontWeight: "600",
    fontSize: 16,
  },
  loginButtonTextActive: {
    color: "#fff",
  },
  spacer: {
    flex: 1,
  },
  keyboard: {
    backgroundColor: "#f3f4f6",
    paddingTop: 32,
    paddingBottom: 32,
    marginTop: 152,
  },
  keyboardRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  key: {
    flex: 1,
    maxWidth: 110,
    maxHeight: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  keyDisabled: {
    opacity: 0,
  },
  keyContent: {
    alignItems: "center",
  },
  keyNumber: {
    fontSize: 24,
    fontWeight: "400",
    color: "#1f2937",
  },
  keyLetters: {
    fontSize: 10,
    color: "#6b7280",
    marginTop: 2,
  },
});

export default ExchVerifyOTP;
