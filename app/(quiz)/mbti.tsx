import React, { useState, useRef } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, SafeAreaView,
  ScrollView, Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { mbtiQuestions } from '@/data/mbtiQuestions';
import { scoreMBTI } from '@/lib/scoring';
import { useI18n } from '@/lib/i18n';

const SECTION_LABELS = ['E / I', 'S / N', 'T / F', 'J / P'];
const SECTION_COLORS = ['#6C63FF', '#FF6B9D', '#4ECDC4', '#FFD93D'];

export default function MBTIScreen() {
  const router = useRouter();
  const { tr, t, rtl } = useI18n();
  const { studentJson } = useLocalSearchParams<{ studentJson: string }>();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B'>>({});
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const total = mbtiQuestions.length;
  const q = mbtiQuestions[current];
  const section = Math.floor(current / 15);
  const progress = (current / total) * 100;

  const choose = (choice: 'A' | 'B') => {
    const updated = { ...answers, [current]: choice };
    setAnswers(updated);

    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 120, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start(() => {
      if (current < total - 1) {
        setCurrent(current + 1);
      } else {
        const result = scoreMBTI(updated);
        router.replace({
          pathname: '/(quiz)/iq',
          params: { studentJson, mbtiJson: JSON.stringify(result) },
        });
      }
    });
  };

  const goBack = () => {
    if (current > 0) setCurrent(current - 1);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient colors={['#0F0F1A', '#1A1A2E']} style={styles.gradient}>
        {/* Header */}
        <View style={[styles.header, rtl && styles.rowReverse]}>
          <TouchableOpacity onPress={goBack} disabled={current === 0}>
            <Ionicons name={rtl ? 'arrow-forward' : 'arrow-back'} size={24} color={current === 0 ? '#333' : '#6C63FF'} />
          </TouchableOpacity>
          <View style={styles.headerMid}>
            <Text style={styles.sectionLabel} numberOfLines={1}>
              🧩 {t('mbtiHeader')} · {SECTION_LABELS[section]}
            </Text>
            <Text style={styles.counter}>{current + 1} / {total}</Text>
          </View>
          <View style={styles.progressPill}>
            <Text style={styles.progressText}>{Math.round(progress)}%</Text>
          </View>
        </View>

        {/* Progress bar */}
        <View style={styles.progressBg}>
          <View style={[styles.progressFill, { width: `${progress}%`, backgroundColor: SECTION_COLORS[section] }]} />
        </View>

        {/* Section pills */}
        <View style={styles.sectionRow}>
          {SECTION_LABELS.map((l, i) => (
            <View key={i} style={[styles.sectionPill, i === section && { backgroundColor: SECTION_COLORS[i] + '33', borderColor: SECTION_COLORS[i] }]}>
              <Text style={[styles.sectionPillText, i === section && { color: SECTION_COLORS[i] }]}>{l}</Text>
            </View>
          ))}
        </View>

        {/* Question */}
        <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
          <Animated.View style={{ opacity: fadeAnim, width: '100%', alignItems: 'center' }}>
            <Text style={styles.questionText}>{tr(q.text)}</Text>

            <TouchableOpacity style={[styles.optionA, rtl && styles.rowReverse]} onPress={() => choose('A')} activeOpacity={0.8}>
              <View style={[styles.optionBadge, { backgroundColor: '#6C63FF' }]}>
                <Text style={styles.optionBadgeText}>A</Text>
              </View>
              <Text style={[styles.optionText, rtl && { textAlign: 'right' }]}>{tr(q.optionA)}</Text>
            </TouchableOpacity>

            <View style={styles.orSep}>
              <View style={styles.orLine} />
              <Text style={styles.orText}>{t('optionOr')}</Text>
              <View style={styles.orLine} />
            </View>

            <TouchableOpacity style={[styles.optionB, rtl && styles.rowReverse]} onPress={() => choose('B')} activeOpacity={0.8}>
              <View style={[styles.optionBadge, { backgroundColor: '#FF6B9D' }]}>
                <Text style={styles.optionBadgeText}>B</Text>
              </View>
              <Text style={[styles.optionText, rtl && { textAlign: 'right' }]}>{tr(q.optionB)}</Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>

        <Text style={styles.hint}>{t('pickOption')}</Text>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0F0F1A' },
  gradient: { flex: 1 },
  rowReverse: { flexDirection: 'row-reverse' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },
  headerMid: { flex: 1, alignItems: 'center' },
  sectionLabel: { color: '#FFF', fontWeight: '700', fontSize: 15 },
  counter: { color: '#666', fontSize: 12, marginTop: 2 },
  progressPill: { backgroundColor: '#1C1C2E', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5 },
  progressText: { color: '#6C63FF', fontWeight: '700', fontSize: 13 },
  progressBg: { height: 4, backgroundColor: '#1C1C2E', marginHorizontal: 0 },
  progressFill: { height: 4, borderRadius: 2 },
  sectionRow: { flexDirection: 'row', justifyContent: 'center', gap: 8, paddingVertical: 12, paddingHorizontal: 16 },
  sectionPill: { borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6, borderWidth: 1, borderColor: '#2A2A4A' },
  sectionPillText: { color: '#555', fontWeight: '600', fontSize: 12 },
  body: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24, paddingBottom: 24 },
  questionText: { color: '#FFF', fontSize: 20, fontWeight: '700', textAlign: 'center', lineHeight: 30, marginBottom: 32, maxWidth: 560 },
  optionA: { width: '100%', maxWidth: 560, flexDirection: 'row', alignItems: 'center', backgroundColor: '#1C1C2E', borderRadius: 18, padding: 20, borderWidth: 1, borderColor: '#6C63FF44', gap: 16 },
  optionB: { width: '100%', maxWidth: 560, flexDirection: 'row', alignItems: 'center', backgroundColor: '#1C1C2E', borderRadius: 18, padding: 20, borderWidth: 1, borderColor: '#FF6B9D44', gap: 16 },
  optionBadge: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  optionBadgeText: { color: '#FFF', fontWeight: '800', fontSize: 16 },
  optionText: { flex: 1, color: '#DDD', fontSize: 16, lineHeight: 24 },
  orSep: { flexDirection: 'row', alignItems: 'center', width: '100%', maxWidth: 560, marginVertical: 16 },
  orLine: { flex: 1, height: 1, backgroundColor: '#2A2A4A' },
  orText: { color: '#444', fontSize: 13, fontWeight: '700', marginHorizontal: 14 },
  hint: { textAlign: 'center', color: '#333', fontSize: 12, paddingBottom: 16 },
});
