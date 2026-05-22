import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, SafeAreaView,
  ScrollView, Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { iqQuestions } from '@/data/iqQuestions';
import { scoreIQ } from '@/lib/scoring';
import { useI18n } from '@/lib/i18n';

const TIME_PER_Q = 75; // seconds

export default function IQScreen() {
  const router = useRouter();
  const { tr, t, rtl } = useI18n();
  const { studentJson, mbtiJson } = useLocalSearchParams<{ studentJson: string; mbtiJson: string }>();
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(TIME_PER_Q);
  const [showExpl, setShowExpl] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const q = iqQuestions[current];
  const total = iqQuestions.length;
  const progress = (current / total) * 100;

  useEffect(() => {
    setTimeLeft(TIME_PER_Q);
    setSelected(null);
    setShowExpl(false);
  }, [current]);

  useEffect(() => {
    if (showExpl) return;
    if (timeLeft <= 0) { advance(null); return; }
    const timer = setTimeout(() => setTimeLeft(tl => tl - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, showExpl]);

  const choose = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    setShowExpl(true);
    setTimeout(() => advance(idx), 2000);
  };

  const advance = (idx: number | null) => {
    const updated = { ...answers };
    if (idx !== null) updated[current] = idx;
    setAnswers(updated);

    Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }).start(() => {
      if (current < total - 1) {
        setCurrent(c => c + 1);
        Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }).start();
      } else {
        const correct = Object.entries(updated).filter(([k, v]) => iqQuestions[parseInt(k)].answer === v).length;
        const result = scoreIQ(correct, total);
        router.replace({
          pathname: '/(quiz)/intelligences',
          params: { studentJson, mbtiJson, iqJson: JSON.stringify(result) },
        });
      }
    });
  };

  const timerColor = timeLeft > 30 ? '#4ECDC4' : timeLeft > 10 ? '#FFD93D' : '#FF6B6B';

  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient colors={['#0F0F1A', '#1A1A2E']} style={styles.gradient}>
        {/* Header */}
        <View style={[styles.header, rtl && styles.rowReverse]}>
          <View>
            <Text style={styles.quizLabel}>🧠 {t('iqHeader')}</Text>
            <Text style={styles.counter}>{current + 1} / {total}</Text>
          </View>
          <View style={[styles.timer, { borderColor: timerColor }]}>
            <Ionicons name="time-outline" size={16} color={timerColor} />
            <Text style={[styles.timerText, { color: timerColor }]}>{timeLeft}s</Text>
          </View>
        </View>

        <View style={styles.progressBg}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>

        <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
          <Animated.View style={{ opacity: fadeAnim, width: '100%', alignItems: 'center' }}>
            <View style={styles.typeBadge}>
              <Text style={styles.typeBadgeText}>{q.type.toUpperCase()}</Text>
            </View>

            <Text style={styles.questionText}>{tr(q.text)}</Text>

            <View style={styles.optionsGrid}>
              {q.options.map((opt, i) => {
                let bg = '#1C1C2E';
                let border = '#2A2A4A';
                if (selected !== null) {
                  if (i === q.answer) { bg = '#4ECDC422'; border = '#4ECDC4'; }
                  else if (i === selected && selected !== q.answer) { bg = '#FF6B6B22'; border = '#FF6B6B'; }
                }
                return (
                  <TouchableOpacity
                    key={i}
                    style={[styles.option, { backgroundColor: bg, borderColor: border }, rtl && styles.rowReverse]}
                    onPress={() => choose(i)}
                    disabled={selected !== null}
                    activeOpacity={0.8}
                  >
                    <View style={styles.optionLetter}>
                      <Text style={styles.optionLetterText}>{String.fromCharCode(65 + i)}</Text>
                    </View>
                    <Text style={[styles.optionText, rtl && { textAlign: 'right' }]}>{tr(opt)}</Text>
                    {selected !== null && i === q.answer && (
                      <Ionicons name="checkmark-circle" size={22} color="#4ECDC4" />
                    )}
                    {selected !== null && i === selected && selected !== q.answer && (
                      <Ionicons name="close-circle" size={22} color="#FF6B6B" />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            {showExpl && (
              <View style={[styles.explBox, rtl && styles.rowReverse]}>
                <Ionicons name="bulb-outline" size={18} color="#FFD93D" />
                <Text style={[styles.explText, rtl && { textAlign: 'right' }]}>{tr(q.explanation)}</Text>
              </View>
            )}
          </Animated.View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0F0F1A' },
  gradient: { flex: 1 },
  rowReverse: { flexDirection: 'row-reverse' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },
  quizLabel: { color: '#FFF', fontWeight: '700', fontSize: 16 },
  counter: { color: '#666', fontSize: 12, marginTop: 2 },
  timer: { flexDirection: 'row', alignItems: 'center', gap: 6, borderWidth: 1.5, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 7 },
  timerText: { fontWeight: '800', fontSize: 15 },
  progressBg: { height: 4, backgroundColor: '#1C1C2E' },
  progressFill: { height: 4, backgroundColor: '#FF6B9D', borderRadius: 2 },
  body: { flexGrow: 1, alignItems: 'center', padding: 20, paddingBottom: 32 },
  typeBadge: { backgroundColor: '#FF6B9D22', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 5, borderWidth: 1, borderColor: '#FF6B9D44', marginBottom: 20 },
  typeBadgeText: { color: '#FF6B9D', fontWeight: '700', fontSize: 11, letterSpacing: 2 },
  questionText: { color: '#FFF', fontSize: 20, fontWeight: '700', textAlign: 'center', lineHeight: 30, marginBottom: 28, maxWidth: 560 },
  optionsGrid: { width: '100%', maxWidth: 560, gap: 10 },
  option: { flexDirection: 'row', alignItems: 'center', borderRadius: 14, padding: 16, borderWidth: 1.5, gap: 14 },
  optionLetter: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#FF6B9D22', alignItems: 'center', justifyContent: 'center' },
  optionLetterText: { color: '#FF6B9D', fontWeight: '800', fontSize: 15 },
  optionText: { flex: 1, color: '#DDD', fontSize: 15 },
  explBox: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, backgroundColor: '#FFD93D11', borderRadius: 12, padding: 14, marginTop: 20, maxWidth: 560, width: '100%', borderWidth: 1, borderColor: '#FFD93D33' },
  explText: { flex: 1, color: '#FFD93D', fontSize: 13, lineHeight: 20 },
});
