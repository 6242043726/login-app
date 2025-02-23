import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import FingerPrintIcon from '@/assets/svg/FingerPrintIcon';
import { COLORS } from '@/constants/Colors';
import DeleteIcon from '@/assets/svg/DeleteIcon';

interface CustomPinKeyboardProps {
  onKeyPress: (value: string) => void;
  onDelete: () => void;
  enableBio?: () => void;
  bioType?: string | null;
  disable?: boolean;
  disableNum?: boolean;
}

const CustomPinKeyboard: React.FC<CustomPinKeyboardProps> = ({
  onKeyPress,
  onDelete,
  enableBio,
  bioType,
  disable,
  disableNum,
}) => {
  const [pressedKey, setPressedKey] = useState<string | null>(null);

  const handlePressIn = (key: string) => {
    setPressedKey(key);
  };

  const handlePressOut = () => {
    setPressedKey(null);
  };

  const renderKey = (num: string) => {
    const isPressed = pressedKey === num;
    return (
      <Pressable
        disabled={disableNum}
        style={[styles.key, isPressed && styles.keyPressed]}
        onPress={() => onKeyPress(num)}
        onPressIn={() => handlePressIn(num)}
        onPressOut={handlePressOut}
        key={num}
      >
        <Text style={[styles.keyText , isPressed && styles.keyTextPressed]}>{num}</Text>
      </Pressable>
    );
  };

  const renderBioIcon = () => {
    if (bioType === "TouchID" || bioType === "FaceID") {
      return (
        <Text style={styles.keyText}>
          <FingerPrintIcon size={50}/>
        </Text>
      );
    }
    return <Text style={styles.keyText}></Text>;
  };

  return (
    <View style={styles.keyboardContainer}>
      <View style={styles.row}>{["1", "2", "3"].map(renderKey)}</View>
      <View style={styles.row}>{["4", "5", "6"].map(renderKey)}</View>
      <View style={styles.row}>{["7", "8", "9"].map(renderKey)}</View>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.key, {borderColor: "transparent"}]}
          disabled={disable}
          onPress={enableBio}
        >
          {renderBioIcon()}
        </TouchableOpacity>
        {renderKey("0")}
        <TouchableOpacity style={[styles.key, {borderColor: "transparent"}]} onPress={onDelete}>
          <Text style={styles.keyText}>
            <DeleteIcon />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  key: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 12,
    borderWidth: 0.5,
    borderRadius: 90,
    borderColor: COLORS.gray,
    backgroundColor: 'transparent',
  },
  keyPressed: {
    backgroundColor: COLORS.green,
  },
  keyText: {
    fontSize: 30,
    color: COLORS.black,
    fontFamily: "SukhumvitSet",
  },
  keyTextPressed: {
    color: COLORS.white,
  },
});

export default CustomPinKeyboard;
