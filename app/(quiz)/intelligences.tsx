import React, { useState, useRef } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { intelligenceQuestions } from '@/data/intelligenceQuestions';
import { scoreIntelligences, intelligenceI18nKey } from '@/lib/scoring';
import { useI18n, intelligenceLabelsI18n } from '@/lib/i18n';

const TYPE_COLORS: Record<string, string> = {
  Linguistic: '#6C63FF',
  'Logical-Mathematical': '#FF6B9D',
  Spatial: '#4ECDC4',
  Musical: '#FFD93D',
  'Bodily-Kinesthetic': '#FF8C42',
  Interpersonal: '#A8E6CF',
  Intrapersonal: '#C7B8EA',
  Naturalist: '#8BC34A',
};

export default function IntelligencesScreen() {
  const router = useRouter();
  const { tr, t, rtl } = useI18n();
  const { studentJson, mbtiJson, iqJson } = useLocalSearchParams<{ studentJson: string; mbtiJson: string; iqJson: string }>();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const total = intelligenceQuestions.length;
  const q = intelligenceQuestions[current];
  const progress = (current / total) * 100;
  const color = TYPE_COLORS[q.type] ?? '#6C63FF';
  const typeLabel = tr(intelligenceLabelsI18n[intelligenceI18nKey[q.type]]);

  const SCALE = [
    { value: 1, label: t('rate1') },
    { value: 2, label: t('rate2') },
    { value: 3, label: t('rate3') },
    { value: 4, label: t('rate4') },
    { value: 5, label: t('rate5') },
  ];

  const choose = (value: number) => {
    const updated = { ...answers, [current]: value };
    setAnswers(updated);

    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 100, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 180, useNativeDriver: true }),
    ]).start(() => {
      if (current < total - 1) {
        setCurrent(c => c + 1);
      } else {
        const result = scoreIntelligences(updated, intelligenceQuestions);
        router.replace({
          pathname: '/(quiz)/careers',
          params: { studentJson, mbtiJson, iqJson, intelligenceJson: JSON.stringify(result) },
        });
      }
    });
  };

  const goBack = () => { if (current > 0) setCurrent(c => c - 1); };

  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient colors={['#0F0F1A', '#1A1A2E']} style={styles.gradient}>
        <View style={[styles.header, rtl && styles.rowReverse]}>
          <TouchableOpacity onPress={goBack} disabled={current === 0} style={styles.backBtn}>
            <Text style={{ color: current === 0 ? '#333' : color, fontSize: 22 }}>{rtl ? '→' : '←'}</Text>
          </TouchableOpacity>
          <View style={styles.headerMid}>
            <Text style={styles.quizLabel}>⭐ {t('intelHeader')}</Text>
            <Text style={styles.counter}>{current + 1} / {total}</Text>
          </View>
          <View style={[styles.progressPill, { borderColor: color }]}>
            <Text style={[styles.progressText, { color }]}>{Math.round(progress)}%</Text>
          </View>
        </View>

        <View style={styles.progressBg}>
          <View style={[styles.progressFill, { width: `${progress}%`, backgroundColor: color }]} />
        </View>

        <View style={[styles.typePill, { backgroundColor: color + '22', borderColor: color + '55' }]}>
          <Text style={[styles.typeText, { color }]}>{typeLabel}</Text>
        </View>

        <Animated.View style={[styles.questionWrap, { opacity: fadeAnim }]}>
          <Text style={styles.questionText}>{tr(q.text)}</Text>
        </Animated.View>

        <View style={styles.scaleWrap}>
          <View style={styles.scaleLabels}>
            <Text style={styles.scaleLabelText}>{t('rate1')}</Text>
            <Text style={styles.scaleLabelText}>{t('rate5')}</Text>
          </View>
          <View style={styles.scaleRow}>
            {SCALE.map((s) => (
              <TouchableOpacity
                key={s.value}
                style={[
                  styles.scaleBtn,
                  { width: 44 + (s.value - 1) * 4, height: 44 + (s.value - 1) * 4 },
                  answers[current] === s.value && { backgroundColor: color, borderColor: color },
                ]}
                onPress={() => choose(s.value)}
                activeOpacity={0.8}
              >
                <Text style={[styles.scaleBtnText, answers[current] === s.value && { color: '#FFF' }]}>
                  {s.value}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.scaleGradLine}>
            {SCALE.map((_, i) => (
              <View key={i} style={[styles.gradDot, { backgroundColor: color + (30 + i * 30).toString(16) }]} />
            ))}
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0F0F1A' },
  gradient: { flex: 1 },
  rowReverse: { flexDirection: 'row-reverse' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },
  backBtn: { padding: 4 },
  headerMid: { flex: 1, alignItems: 'center' },
  quizLabel: { color: '#FFF', fontWeight: '700', fontSize: 16 },
  counter: { color: '#666', fontSize: 12, marginTop: 2 },
  progressPill: { borderWidth: 1, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5 },
  progressText: { fontWeight: '700', fontSize: 13 },
  progressBg: { height: 4, backgroundColor: '#1C1C2E' },
  progressFill: { height: 4, borderRadius: 2 },
  typePill: { alignSelf: 'center', marginTop: 16, borderRadius: 20, paddingHorizontal: 20, paddingVertical: 7, borderWidth: 1 },
  typeText: { fontWeight: '700', fontSize: 13, letterSpacing: 1 },
  questionWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  questionText: { color: '#FFF', fontSize: 22, fontWeight: '700', textAlign: 'center', lineHeight: 34, maxWidth: 560 },
  scaleWrap: { paddingHorizontal: 24, paddingBottom: 32, alignItems: 'center' },
  scaleLabels: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', maxWidth: 400, marginBottom: 12 },
  scaleLabelText: { color: '#555', fontSize: 12 },
  scaleRow: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 8 },
  scaleBtn: { borderRadius: 100, backgroundColor: '#1C1C2E', borderWidth: 1.5, borderColor: '#2A2A4A', alignItems: 'center', justifyContent: 'center' },
  scaleBtnText: { color: '#888', fontWeight: '700', fontSize: 15 },
  scaleGradLine: { flexDirection: 'row', gap: 14, marginTop: 4 },
  gradDot: { width: 8, height: 8, borderRadius: 4 },
});
