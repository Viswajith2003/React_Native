import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const ExchLoginUI = () => {
  const [country, setCountry] = useState("India");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const countries = [
    { name: "India", code: "+91" },
    { name: "USA", code: "+1" },
    { name: "UK", code: "+44" },
    { name: "UAE", code: "+971" },
  ];

  const selectedCountry = countries.find((c) => c.name === country);

  const handleKeyPress = (value) => {
    if (value === "backspace") {
      setPhoneNumber((prev) => prev.slice(0, -1));
    } else if (phoneNumber.length < 10) {
      setPhoneNumber((prev) => prev + value);
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

  const ChevronIcon = ({ isOpen }) => (
    <Text
      style={{
        fontSize: 16,
        transform: [{ rotate: isOpen ? "180deg" : "0deg" }],
      }}
    >
      ▼
    </Text>
  );

  const BackspaceIcon = () => <Text style={{ fontSize: 20 }}>⌫</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <BackIcon />
          </TouchableOpacity>
        </View>

        {/* Logo */}
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>EXCH</Text>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          <Text style={styles.label}>Country</Text>

          {/* Dropdown and Input Row */}
          <View style={styles.inputRow}>
            {/* Country Dropdown */}
            <View style={styles.dropdownContainer}>
              <TouchableOpacity
                onPress={() => setIsDropdownOpen(!isDropdownOpen)}
                style={styles.dropdown}
              >
                <Text style={styles.dropdownText}>{country}</Text>
                <ChevronIcon isOpen={isDropdownOpen} />
              </TouchableOpacity>

              {isDropdownOpen && (
                <View style={styles.dropdownMenu}>
                  {countries.map((c) => (
                    <TouchableOpacity
                      key={c.name}
                      onPress={() => {
                        setCountry(c.name);
                        setIsDropdownOpen(false);
                      }}
                      style={styles.dropdownItem}
                    >
                      <Text style={styles.dropdownItemText}>{c.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* Phone Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.countryCode}>{selectedCountry?.code}</Text>
              <TextInput
                style={styles.input}
                value={phoneNumber}
                onChangeText={(text) =>
                  setPhoneNumber(text.replace(/\D/g, "").slice(0, 10))
                }
                placeholder="enter mobile number"
                placeholderTextColor="#999"
                keyboardType="number-pad"
                maxLength={10}
                showSoftInputOnFocus={false}
              />
            </View>
          </View>

          {/* Send OTP Button */}
          <TouchableOpacity
            style={[
              styles.sendButton,
              phoneNumber.length === 10 && styles.sendButtonActive,
            ]}
            disabled={phoneNumber.length < 10}
          >
            <Text
              style={[
                styles.sendButtonText,
                phoneNumber.length === 10 && styles.sendButtonTextActive,
              ]}
            >
              Send OTP
            </Text>
          </TouchableOpacity>

          {/* Terms Text */}
          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By continuing, you agree to{" "}
              <Text style={styles.termsLink}>terms & conditions</Text> and{" "}
              <Text style={styles.termsLink}>privacy policy</Text>
            </Text>
          </View>
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
  logoContainer: {
    alignItems: "center",
    marginBottom: 22,
  },
  logo: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#2563eb",
  },
  formSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  label: {
    color: "#6b7280",
    fontSize: 14,
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
    zIndex: 1000,
  },
  dropdownContainer: {
    position: "relative",
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    minWidth: 100,
  },
  dropdownText: {
    color: "#1f2937",
    marginRight: 8,
  },
  dropdownMenu: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    marginTop: 4,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 2000,
  },
  dropdownItem: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  dropdownItemText: {
    color: "#1f2937",
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  countryCode: {
    color: "#1f2937",
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: "#1f2937",
    paddingVertical: 12,
    outlineStyle: "none",
  },
  sendButton: {
    backgroundColor: "#e5e7eb",
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: "center",
    marginBottom: 8,
  },
  sendButtonActive: {
    backgroundColor: "#2563eb",
  },
  sendButtonText: {
    color: "#9ca3af",
    fontWeight: "500",
  },
  sendButtonTextActive: {
    color: "#fff",
  },
  termsContainer: {
    alignItems: "center",
  },
  termsText: {
    textAlign: "center",
    fontSize: 12,
    color: "#6b7280",
  },
  termsLink: {
    textDecorationLine: "underline",
  },
  spacer: {
    flex: 1,
  },
  keyboard: {
    backgroundColor: "#f3f4f6",
    paddingTop: 32,
    paddingBottom: 32,
    marginTop: 172,
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
    maxHeight: 60,
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
    marginTop: 8,
    fontSize: 22,
  },
  keyLetters: {
    fontSize: 10,
    color: "#6b7280",
    marginTop: 4,
  },
});

export default ExchLoginUI;
