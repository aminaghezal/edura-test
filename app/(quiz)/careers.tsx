import React, { useState, useRef } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, SafeAreaView,
  Animated, PanResponder, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { careers, mbtiCareerAffinity } from '@/data/careers';
import { Career, CareerResult } from '@/types';
import { useI18n } from '@/lib/i18n';

const { width: W } = Dimensions.get('window');
const SWIPE_THRESHOLD = W * 0.3;

export default function CareersScreen() {
  const router = useRouter();
  const { tr, t, rtl } = useI18n();
  const { studentJson, mbtiJson, iqJson, intelligenceJson } = useLocalSearchParams<{
    studentJson: string; mbtiJson: string; iqJson: string; intelligenceJson: string;
  }>();
  const mbti = JSON.parse(mbtiJson);

  const [index, setIndex] = useState(0);
  const [liked, setLiked] = useState<Career[]>([]);
  const [, setDirection] = useState<'left' | 'right' | null>(null);
  const position = useRef(new Animated.ValueXY()).current;
  const rotate = position.x.interpolate({ inputRange: [-W / 2, 0, W / 2], outputRange: ['-15deg', '0deg', '15deg'] });
  const likeOpacity = position.x.interpolate({ inputRange: [0, W / 4], outputRange: [0, 1], extrapolate: 'clamp' });
  const nopeOpacity = position.x.interpolate({ inputRange: [-W / 4, 0], outputRange: [1, 0], extrapolate: 'clamp' });

  const total = careers.length;
  const current = careers[index];

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, g) => {
      position.setValue({ x: g.dx, y: g.dy });
      setDirection(g.dx > 20 ? 'right' : g.dx < -20 ? 'left' : null);
    },
    onPanResponderRelease: (_, g) => {
      if (g.dx > SWIPE_THRESHOLD) swipe('right');
      else if (g.dx < -SWIPE_THRESHOLD) swipe('left');
      else resetCard();
    },
  });

  const swipe = (dir: 'left' | 'right') => {
    const toX = dir === 'right' ? W * 1.5 : -W * 1.5;
    Animated.timing(position, { toValue: { x: toX, y: 0 }, duration: 300, useNativeDriver: false }).start(() => {
      if (dir === 'right') setLiked(prev => [...prev, current]);
      advance();
    });
  };

  const resetCard = () => {
    setDirection(null);
    Animated.spring(position, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
  };

  const advance = () => {
    position.setValue({ x: 0, y: 0 });
    setDirection(null);
    if (index >= total - 1) {
      finishCareer();
    } else {
      setIndex(i => i + 1);
    }
  };

  const finishCareer = () => {
    const affinity = mbtiCareerAffinity[mbti.type] ?? [];
    const topMatch =
      liked.find(c => affinity.includes(c.id)) ??
      (liked.length > 0 ? liked[0] : null);

    const result: CareerResult = { liked, topMatch };
    router.replace({
      pathname: '/results',
      params: { studentJson, mbtiJson, iqJson, intelligenceJson, careerJson: JSON.stringify(result) },
    });
  };

  if (index >= total) return null;

  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient colors={['#0F0F1A', '#1A1A2E']} style={styles.gradient}>
        {/* Header */}
        <View style={[styles.header, rtl && styles.rowReverse]}>
          <Text style={styles.quizLabel}>💼 {t('careersHeader')}</Text>
          <Text style={styles.counter}>{index + 1} / {total}</Text>
          <View style={[styles.liked, rtl && styles.rowReverse]}>
            <Ionicons name="heart" size={16} color="#FF6B9D" />
            <Text style={styles.likedText}>{liked.length}</Text>
          </View>
        </View>

        <View style={styles.progressBg}>
          <View style={[styles.progressFill, { width: `${(index / total) * 100}%` }]} />
        </View>

        {/* Instruction */}
        <View style={[styles.instrRow, rtl && styles.rowReverse]}>
          <View style={[styles.instrItem, rtl && styles.rowReverse]}>
            <Ionicons name="arrow-back-circle" size={22} color="#FF6B6B" />
            <Text style={styles.instrText}>{t('swipeLeft')}</Text>
          </View>
          <View style={[styles.instrItem, rtl && styles.rowReverse]}>
            <Ionicons name="arrow-forward-circle" size={22} color="#4ECDC4" />
            <Text style={styles.instrText}>{t('swipeRight')}</Text>
          </View>
        </View>

        {/* Card */}
        <View style={styles.cardArea}>
          {index + 1 < total && (
            <View style={[styles.card, styles.cardBehind]}>
              <Text style={styles.peekEmoji}>{careers[index + 1].emoji}</Text>
            </View>
          )}

          <Animated.View
            style={[styles.card, { transform: [{ translateX: position.x }, { translateY: position.y }, { rotate }] }]}
            {...panResponder.panHandlers}
          >
            <Animated.View style={[styles.stamp, styles.likeStamp, { opacity: likeOpacity }]}>
              <Text style={styles.likeStampText}>{t('like')}</Text>
            </Animated.View>
            <Animated.View style={[styles.stamp, styles.nopeStamp, { opacity: nopeOpacity }]}>
              <Text style={styles.nopeStampText}>{t('nope')}</Text>
            </Animated.View>

            <Text style={styles.cardEmoji}>{current.emoji}</Text>
            <Text style={styles.cardTitle}>{tr(current.title)}</Text>
            <View style={styles.domainBadge}>
              <Text style={styles.domainText}>{tr(current.domain)}</Text>
            </View>
            <Text style={styles.cardDesc}>{tr(current.description)}</Text>

            <View style={styles.traitsRow}>
              {current.traits.map((tr2, i) => (
                <View key={i} style={styles.traitPill}>
                  <Text style={styles.traitText}>{tr(tr2)}</Text>
                </View>
              ))}
            </View>
          </Animated.View>
        </View>

        {/* Buttons */}
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.nope} onPress={() => swipe('left')} activeOpacity={0.85}>
            <Ionicons name="close" size={32} color="#FF6B6B" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.skip} onPress={() => advance()} activeOpacity={0.85}>
            <Ionicons name="play-skip-forward" size={22} color="#555" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.like} onPress={() => swipe('right')} activeOpacity={0.85}>
            <Ionicons name="heart" size={32} color="#4ECDC4" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0F0F1A' },
  gradient: { flex: 1 },
  rowReverse: { flexDirection: 'row-reverse' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingTop: 16, paddingBottom: 12 },
  quizLabel: { color: '#FFF', fontWeight: '700', fontSize: 16 },
  counter: { color: '#666', fontSize: 14 },
  liked: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#FF6B9D22', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 5 },
  likedText: { color: '#FF6B9D', fontWeight: '700', fontSize: 14 },
  progressBg: { height: 4, backgroundColor: '#1C1C2E' },
  progressFill: { height: 4, backgroundColor: '#FFD93D', borderRadius: 2 },
  instrRow: { flexDirection: 'row', justifyContent: 'center', gap: 32, paddingVertical: 10 },
  instrItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  instrText: { color: '#555', fontSize: 12 },
  cardArea: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  card: {
    position: 'absolute',
    width: Math.min(W - 48, 420),
    backgroundColor: '#1C1C2E',
    borderRadius: 24,
    padding: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2A4A',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  cardBehind: { transform: [{ scale: 0.94 }], top: 12, zIndex: -1 },
  peekEmoji: { fontSize: 48, opacity: 0.4 },
  stamp: { position: 'absolute', top: 24, borderWidth: 3, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6 },
  likeStamp: { right: 24, borderColor: '#4ECDC4', transform: [{ rotate: '15deg' }] },
  likeStampText: { color: '#4ECDC4', fontWeight: '900', fontSize: 22, letterSpacing: 3 },
  nopeStamp: { left: 24, borderColor: '#FF6B6B', transform: [{ rotate: '-15deg' }] },
  nopeStampText: { color: '#FF6B6B', fontWeight: '900', fontSize: 22, letterSpacing: 3 },
  cardEmoji: { fontSize: 64, marginBottom: 12 },
  cardTitle: { color: '#FFF', fontSize: 22, fontWeight: '800', textAlign: 'center', marginBottom: 8 },
  domainBadge: { backgroundColor: '#FFD93D22', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 5, borderWidth: 1, borderColor: '#FFD93D44', marginBottom: 14 },
  domainText: { color: '#FFD93D', fontWeight: '700', fontSize: 12 },
  cardDesc: { color: '#AAA', fontSize: 15, textAlign: 'center', lineHeight: 24, marginBottom: 18, maxWidth: 320 },
  traitsRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8 },
  traitPill: { backgroundColor: '#6C63FF22', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 5, borderWidth: 1, borderColor: '#6C63FF44' },
  traitText: { color: '#6C63FF', fontSize: 12, fontWeight: '600' },
  buttons: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 32, paddingBottom: 28, paddingTop: 12 },
  nope: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#FF6B6B22', borderWidth: 2, borderColor: '#FF6B6B', alignItems: 'center', justifyContent: 'center' },
  like: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#4ECDC422', borderWidth: 2, borderColor: '#4ECDC4', alignItems: 'center', justifyContent: 'center' },
  skip: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#1C1C2E', borderWidth: 1, borderColor: '#2A2A4A', alignItems: 'center', justifyContent: 'center' },
});
