import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, ScrollView,
  TouchableOpacity, ActivityIndicator, Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { intelligenceLabels } from '@/data/intelligenceQuestions';
import { getOrCreateSession, completeSession, saveResults } from '@/lib/supabase';
import { mbtiDescriptions, iqLevelKey, intelligenceI18nKey } from '@/lib/scoring';
import { useI18n, intelligenceLabelsI18n, UIKey } from '@/lib/i18n';
import { displayName } from '@/lib/studentDisplay';
import { IntelligenceType } from '@/types';

export default function ResultsScreen() {
  const router = useRouter();
  const { tr, t, lang } = useI18n();
  const { studentJson, mbtiJson, iqJson, intelligenceJson, careerJson, sessionId: existingSession } = useLocalSearchParams<{
    studentJson: string; mbtiJson: string; iqJson: string;
    intelligenceJson: string; careerJson: string; sessionId?: string;
  }>();

  const student = JSON.parse(studentJson);
  const mbti = mbtiJson ? JSON.parse(mbtiJson) : null;
  const iq = iqJson ? JSON.parse(iqJson) : null;
  const intelligence = intelligenceJson ? JSON.parse(intelligenceJson) : null;
  const career = careerJson ? JSON.parse(careerJson) : null;

  const [syncing, setSyncing] = useState(!existingSession);
  const [synced, setSynced] = useState(!!existingSession);
  const [syncError, setSyncError] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
  }, []);

  useEffect(() => {
    if (existingSession) return;
    const sync = async () => {
      try {
        const session = await getOrCreateSession(student.id);
        await saveResults(session.id, student.id, mbti, iq, intelligence, career);
        await completeSession(session.id);
        setSynced(true);
      } catch (e) {
        setSyncError(true);
      } finally {
        setSyncing(false);
      }
    };
    sync();
  }, []);

  const topCareer = career?.topMatch ?? null;
  const mbtiInfo = mbti?.type ? mbtiDescriptions[mbti.type] : null;
  const domInfo = intelligence?.dominant
    ? { meta: intelligenceLabels[intelligence.dominant as IntelligenceType], i18nKey: intelligenceI18nKey[intelligence.dominant as IntelligenceType] }
    : null;

  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient colors={['#0F0F1A', '#1A1A2E', '#16213E']} style={styles.gradient}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <Animated.View style={{ opacity: fadeAnim, width: '100%', alignItems: 'center' }}>
            {/* Hero */}
            <View style={styles.hero}>
              <Text style={styles.heroEmoji}>🎉</Text>
              <Text style={styles.heroTitle}>{t('resultsTitle')}</Text>
              <Text style={styles.heroName}>{displayName(student, lang)}</Text>

              <View style={[styles.syncBadge, synced ? styles.syncOk : syncError ? styles.syncErr : styles.syncPending]}>
                {syncing ? <ActivityIndicator size="small" color="#FFD93D" /> : null}
                <Ionicons
                  name={synced ? 'cloud-done-outline' : syncError ? 'cloud-offline-outline' : 'cloud-upload-outline'}
                  size={16}
                  color={synced ? '#4ECDC4' : syncError ? '#FF6B6B' : '#FFD93D'}
                />
                <Text style={[styles.syncText, synced ? { color: '#4ECDC4' } : syncError ? { color: '#FF6B6B' } : { color: '#FFD93D' }]}>
                  {syncing ? t('syncing') : synced ? t('synced') : t('syncFailed')}
                </Text>
              </View>
            </View>

            {/* MBTI Card */}
            {mbti && (
              <View style={[styles.resultCard, { borderColor: '#6C63FF55' }]}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardEmoji}>🧩</Text>
                  <Text style={styles.cardLabel}>{t('yourPersonality')}</Text>
                </View>
                <Text style={[styles.bigResult, { color: '#6C63FF' }]}>{mbti.type}</Text>
                {mbtiInfo && (
                  <>
                    <Text style={styles.subTitle}>{tr(mbtiInfo.title)}</Text>
                    <Text style={styles.resultDesc}>{tr(mbtiInfo.description)}</Text>
                  </>
                )}
                <View style={styles.dimensionRow}>
                  {(['EI', 'SN', 'TF', 'JP'] as const).map((pair, i) => {
                    const [a, b] = pair.split('') as [string, string];
                    const aScore = mbti.scores[a] ?? 0;
                    const bScore = mbti.scores[b] ?? 0;
                    const totalS = aScore + bScore || 1;
                    return (
                      <View key={i} style={styles.dimension}>
                        <Text style={styles.dimLabel}>{a} / {b}</Text>
                        <View style={styles.dimBar}>
                          <View style={[styles.dimFill, { width: `${(aScore / totalS) * 100}%`, backgroundColor: '#6C63FF' }]} />
                        </View>
                        <View style={styles.dimValues}>
                          <Text style={styles.dimVal}>{aScore}</Text>
                          <Text style={styles.dimVal}>{bScore}</Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            )}

            {/* IQ Card */}
            {iq && (
              <View style={[styles.resultCard, { borderColor: '#FF6B9D55' }]}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardEmoji}>🧠</Text>
                  <Text style={styles.cardLabel}>{t('yourIq')}</Text>
                </View>
                <Text style={[styles.bigResult, { color: '#FF6B9D' }]}>{iq.score}</Text>
                <Text style={[styles.levelBadgeText, { color: '#FF6B9D' }]}>
                  {t('iqLevel')}: {t(iqLevelKey[iq.level as keyof typeof iqLevelKey] as UIKey)}
                </Text>
                <View style={styles.iqBarWrap}>
                  <View style={styles.iqBarBg}>
                    <View style={[styles.iqBarFill, { width: `${Math.min((iq.score - 70) / 75 * 100, 100)}%` }]} />
                  </View>
                  <View style={styles.iqLabels}>
                    <Text style={styles.iqLabel}>70</Text>
                    <Text style={styles.iqLabel}>100</Text>
                    <Text style={styles.iqLabel}>130+</Text>
                  </View>
                </View>
              </View>
            )}

            {/* Intelligence Card */}
            {intelligence && domInfo && (
              <View style={[styles.resultCard, { borderColor: '#4ECDC455' }]}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardEmoji}>⭐</Text>
                  <Text style={styles.cardLabel}>{t('yourIntelligence')}</Text>
                </View>
                <Text style={styles.bigEmoji}>{domInfo.meta.emoji}</Text>
                <Text style={[styles.bigResult, { color: '#4ECDC4' }]}>
                  {tr(intelligenceLabelsI18n[domInfo.i18nKey])}
                </Text>
                <Text style={styles.resultDesc}>{tr(domInfo.meta.description)}</Text>
                <View style={styles.intelBars}>
                  {(Object.entries(intelligence.scores) as [IntelligenceType, number][])
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 5)
                    .map(([type, score]) => (
                      <View key={type} style={styles.intelRow}>
                        <Text style={styles.intelLabel} numberOfLines={1}>
                          {intelligenceLabels[type]?.emoji} {tr(intelligenceLabelsI18n[intelligenceI18nKey[type]])}
                        </Text>
                        <View style={styles.intelBarBg}>
                          <View style={[styles.intelBarFill, { width: `${score}%`, backgroundColor: '#4ECDC4' }]} />
                        </View>
                        <Text style={styles.intelScore}>{score}%</Text>
                      </View>
                    ))}
                </View>
              </View>
            )}

            {/* Career Card */}
            {topCareer && (
              <View style={[styles.resultCard, { borderColor: '#FFD93D55' }]}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardEmoji}>💼</Text>
                  <Text style={styles.cardLabel}>{t('yourCareer')}</Text>
                </View>
                <Text style={styles.bigEmoji}>{topCareer.emoji}</Text>
                <Text style={[styles.bigResult, { color: '#FFD93D' }]}>{tr(topCareer.title)}</Text>
                <Text style={styles.resultDesc}>{tr(topCareer.description)}</Text>
              </View>
            )}

            {/* Done button */}
            <TouchableOpacity style={styles.doneBtn} onPress={() => router.replace('/')} activeOpacity={0.85}>
              <Ionicons name="home-outline" size={22} color="#FFF" />
              <Text style={styles.doneBtnText}>{t('finish')}</Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0F0F1A' },
  gradient: { flex: 1 },
  scroll: { padding: 20, alignItems: 'center', paddingBottom: 40 },
  hero: { alignItems: 'center', marginBottom: 24 },
  heroEmoji: { fontSize: 60, marginBottom: 12 },
  heroTitle: { color: '#FFF', fontSize: 26, fontWeight: '800', marginBottom: 6, textAlign: 'center' },
  heroName: { color: '#6C63FF', fontSize: 17, fontWeight: '700', marginBottom: 16 },
  syncBadge: { flexDirection: 'row', alignItems: 'center', gap: 8, borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8, borderWidth: 1 },
  syncOk: { backgroundColor: '#4ECDC411', borderColor: '#4ECDC444' },
  syncErr: { backgroundColor: '#FF6B6B11', borderColor: '#FF6B6B44' },
  syncPending: { backgroundColor: '#FFD93D11', borderColor: '#FFD93D44' },
  syncText: { fontWeight: '600', fontSize: 13 },
  resultCard: { width: '100%', maxWidth: 560, backgroundColor: '#1C1C2E', borderRadius: 20, padding: 24, marginBottom: 16, borderWidth: 1 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 },
  cardEmoji: { fontSize: 22 },
  cardLabel: { color: '#888', fontWeight: '700', fontSize: 13, letterSpacing: 1, textTransform: 'uppercase' },
  bigResult: { fontSize: 32, fontWeight: '900', letterSpacing: 2, marginBottom: 4, textAlign: 'center' },
  subTitle: { color: '#FFF', fontSize: 17, fontWeight: '700', marginBottom: 8, textAlign: 'center' },
  bigEmoji: { fontSize: 48, marginBottom: 8, textAlign: 'center' },
  levelBadgeText: { fontWeight: '700', fontSize: 16, marginBottom: 12, textAlign: 'center' },
  resultDesc: { color: '#AAA', fontSize: 14, lineHeight: 22, marginBottom: 16, textAlign: 'center' },
  dimensionRow: { width: '100%', gap: 10 },
  dimension: { gap: 4 },
  dimLabel: { color: '#666', fontSize: 12, fontWeight: '700' },
  dimBar: { height: 8, backgroundColor: '#0F0F1A', borderRadius: 4, overflow: 'hidden' },
  dimFill: { height: 8, borderRadius: 4 },
  dimValues: { flexDirection: 'row', justifyContent: 'space-between' },
  dimVal: { color: '#555', fontSize: 11 },
  iqBarWrap: { width: '100%', marginBottom: 8 },
  iqBarBg: { height: 10, backgroundColor: '#0F0F1A', borderRadius: 5, overflow: 'hidden', marginBottom: 4 },
  iqBarFill: { height: 10, backgroundColor: '#FF6B9D', borderRadius: 5 },
  iqLabels: { flexDirection: 'row', justifyContent: 'space-between' },
  iqLabel: { color: '#444', fontSize: 11 },
  intelBars: { width: '100%', gap: 8 },
  intelRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  intelLabel: { width: 160, color: '#888', fontSize: 12 },
  intelBarBg: { flex: 1, height: 8, backgroundColor: '#0F0F1A', borderRadius: 4, overflow: 'hidden' },
  intelBarFill: { height: 8, borderRadius: 4 },
  intelScore: { width: 36, color: '#555', fontSize: 12, textAlign: 'right' },
  doneBtn: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#6C63FF', borderRadius: 16, paddingVertical: 16, paddingHorizontal: 36, marginTop: 8, marginBottom: 16 },
  doneBtnText: { color: '#FFF', fontWeight: '800', fontSize: 17 },
});
