import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useI18n, UIKey } from '@/lib/i18n';

export default function IntroScreen() {
  const router = useRouter();
  const { t, rtl } = useI18n();
  const { studentJson } = useLocalSearchParams<{ studentJson: string }>();

  const STEPS: { icon: string; title: UIKey; desc: UIKey; color: string }[] = [
    { icon: '🧩', title: 'stepMbtiTitle',   desc: 'stepMbtiDesc',   color: '#6C63FF' },
    { icon: '🧠', title: 'stepIqTitle',     desc: 'stepIqDesc',     color: '#FF6B9D' },
    { icon: '⭐', title: 'stepIntelTitle',  desc: 'stepIntelDesc',  color: '#4ECDC4' },
    { icon: '💼', title: 'stepCareerTitle', desc: 'stepCareerDesc', color: '#FFD93D' },
  ];

  const start = () => {
    router.replace({ pathname: '/(quiz)/mbti', params: { studentJson } });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient colors={['#0F0F1A', '#1A1A2E', '#16213E']} style={styles.gradient}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={styles.topSection}>
            <Text style={styles.emoji}>🎯</Text>
            <Text style={styles.title}>{t('introTitle')}</Text>
            <Text style={styles.sub}>{t('introSub')}</Text>
          </View>

          <View style={styles.steps}>
            {STEPS.map((s, i) => (
              <View key={i} style={[styles.stepRow, rtl && styles.rowReverse]}>
                <View style={[styles.stepIcon, { backgroundColor: s.color + '22', borderColor: s.color + '66' }]}>
                  <Text style={styles.stepEmoji}>{s.icon}</Text>
                </View>
                <View style={styles.stepInfo}>
                  <Text style={[styles.stepTitle, rtl && { textAlign: 'right' }]}>{t(s.title)}</Text>
                  <Text style={[styles.stepDesc, rtl && { textAlign: 'right' }]}>{t(s.desc)}</Text>
                </View>
                <View style={[styles.stepNum, { backgroundColor: s.color }]}>
                  <Text style={styles.stepNumText}>{i + 1}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.rules}>
            {(['rule1','rule2','rule3'] as const).map((k) => (
              <View key={k} style={[styles.ruleRow, rtl && styles.rowReverse]}>
                <Ionicons name="checkmark-circle-outline" size={18} color="#4ECDC4" />
                <Text style={[styles.ruleText, rtl && { textAlign: 'right' }]}>{t(k)}</Text>
              </View>
            ))}
            <View style={[styles.ruleRow, rtl && styles.rowReverse]}>
              <Ionicons name="time-outline" size={18} color="#FFD93D" />
              <Text style={[styles.ruleText, rtl && { textAlign: 'right' }]}>{t('rule4')}</Text>
            </View>
          </View>

          <TouchableOpacity style={[styles.startBtn, rtl && styles.rowReverse]} onPress={start} activeOpacity={0.85}>
            <Text style={styles.startText}>{t('beginAssessment')}</Text>
            <Ionicons name={rtl ? 'arrow-back-circle' : 'arrow-forward-circle'} size={28} color="#FFF" />
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0F0F1A' },
  gradient: { flex: 1 },
  scroll: { padding: 28, alignItems: 'center' },
  rowReverse: { flexDirection: 'row-reverse' },
  topSection: { alignItems: 'center', marginBottom: 32 },
  emoji: { fontSize: 56, marginBottom: 16 },
  title: { color: '#FFF', fontSize: 28, fontWeight: '800', letterSpacing: 1, textAlign: 'center' },
  sub: { color: '#888', fontSize: 14, textAlign: 'center', marginTop: 8, lineHeight: 22, maxWidth: 400 },
  steps: { width: '100%', maxWidth: 560, marginBottom: 28 },
  stepRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1C1C2E', borderRadius: 16, padding: 16, marginBottom: 10, borderWidth: 1, borderColor: '#2A2A4A' },
  stepIcon: { width: 52, height: 52, borderRadius: 14, alignItems: 'center', justifyContent: 'center', borderWidth: 1, marginRight: 16, marginLeft: 16 },
  stepEmoji: { fontSize: 26 },
  stepInfo: { flex: 1 },
  stepTitle: { color: '#FFF', fontWeight: '700', fontSize: 16 },
  stepDesc: { color: '#666', fontSize: 13, marginTop: 3 },
  stepNum: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  stepNumText: { color: '#FFF', fontWeight: '800', fontSize: 14 },
  rules: { width: '100%', maxWidth: 560, backgroundColor: '#1C1C2E', borderRadius: 16, padding: 20, marginBottom: 28, borderWidth: 1, borderColor: '#2A2A4A', gap: 12 },
  ruleRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  ruleText: { color: '#AAA', fontSize: 14, flex: 1 },
  startBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#6C63FF', borderRadius: 18, paddingVertical: 18, paddingHorizontal: 40, gap: 12, marginBottom: 20 },
  startText: { color: '#FFF', fontWeight: '800', fontSize: 18, letterSpacing: 1 },
});
