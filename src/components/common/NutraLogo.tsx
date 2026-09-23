import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SymbolView } from 'expo-symbols';
import { NutraColors } from '@/constants/theme';

interface NutraLogoProps {
  size?: number;
}

/**
 * Official NutraLens Brand Mark:
 * Merges a scanning viewfinder reticle bracket frame with an organic botanical leaf glyph.
 */
export function NutraLogo({ size = 36 }: NutraLogoProps) {
  const cornerSize = Math.max(6, Math.round(size * 0.26));
  const cornerBorder = Math.max(1.5, Math.round(size * 0.07));
  const inset = Math.max(3, Math.round(size * 0.1));

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: Math.round(size * 0.24),
        },
      ]}>
      {/* Top Left Bracket */}
      <View
        style={[
          styles.bracket,
          {
            top: inset,
            left: inset,
            width: cornerSize,
            height: cornerSize,
            borderTopWidth: cornerBorder,
            borderLeftWidth: cornerBorder,
            borderTopLeftRadius: 2,
          },
        ]}
      />
      {/* Top Right Bracket */}
      <View
        style={[
          styles.bracket,
          {
            top: inset,
            right: inset,
            width: cornerSize,
            height: cornerSize,
            borderTopWidth: cornerBorder,
            borderRightWidth: cornerBorder,
            borderTopRightRadius: 2,
          },
        ]}
      />
      {/* Bottom Left Bracket */}
      <View
        style={[
          styles.bracket,
          {
            bottom: inset,
            left: inset,
            width: cornerSize,
            height: cornerSize,
            borderBottomWidth: cornerBorder,
            borderLeftWidth: cornerBorder,
            borderBottomLeftRadius: 2,
          },
        ]}
      />
      {/* Bottom Right Bracket */}
      <View
        style={[
          styles.bracket,
          {
            bottom: inset,
            right: inset,
            width: cornerSize,
            height: cornerSize,
            borderBottomWidth: cornerBorder,
            borderRightWidth: cornerBorder,
            borderBottomRightRadius: 2,
          },
        ]}
      />

      {/* Central Botanical Emblem */}
      <SymbolView
        name={{ ios: 'leaf.fill', android: 'eco', web: 'eco' }}
        size={Math.round(size * 0.44)}
        tintColor="#FFFFFF"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: NutraColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    shadowColor: '#176B4D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    elevation: 3,
  },
  bracket: {
    position: 'absolute',
    borderColor: NutraColors.secondaryContainer,
  },
});
