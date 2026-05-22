import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, Platform,
  StyleSheet, SafeAreaView, Alert,
} from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Student } from '@/types';
import { getStudentResults } from '@/lib/supabase';
import { useI18n } from '@/lib/i18n';
import { displayName, initials, birthDateYMD } from '@/lib/studentDisplay';

export default function VerifyScreen() {
  const router = useRouter();
  const { t, rtl, lang } = useI18n();
  const { studentJson } = useLocalSearchParams<{ studentJson: string }>();
  const student: Student = JSON.parse(studentJson);

  const [date, setDate] = useState<Date | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const formatDate = (d: Date) => {
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };

  const dateToYMD = (d: Date) => {
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    return `${d.getFullYear()}-${mm}-${dd}`;
  };

  const onPickerChange = (event: DateTimePickerEvent, selected?: Date) => {
    // Android: dismisses automatically. iOS: stays open until "OK".
    if (Platform.OS === 'android') setPickerOpen(false);
    if (event.type === 'dismissed') return;
    if (selected) {
      setDate(selected);
      setError('');
    }
  };

  const verify = async () => {
    setError('');

    if (!birthDateYMD(student)) {
      setError(t('dobNotSet'));
      return;
    }

    if (!date) {
      setError(t('dobInvalid'));
      return;
    }

    if (dateToYMD(date) !== birthDateYMD(student)) {
      setError(t('dobMismatch'));
      return;
    }

    setLoading(true);
    try {
      const previous = await getStudentResults(student.id);
      if (previous.length > 0) {
        const n = previous.length;
        Alert.alert(
          t('prevTitle'),
          n === 1 ? t('prevBodyOne') : t('prevBodyMany', { n }),
          [
            { text: t('viewResults'), onPress: () => router.replace({ pathname: '/results', params: { studentJson, sessionId: previous[0].session_id } }) },
            { text: t('takeAgain'), onPress: () => startQuiz() },
            { text: t('cancel'), style: 'cancel' },
          ],
        );
      } else {
        startQuiz();
      }
    } catch {
      startQuiz();
    } finally {
      setLoading(false);
    }
  };

  const startQuiz = () => {
    router.replace({ pathname: '/(quiz)/intro', params: { studentJson } });
  };

  // The picker upper bound: today (no future dates). Sensible default: 14 years ago.
  const today = new Date();
  const defaultPickerDate = date ?? new Date(today.getFullYear() - 14, today.getMonth(), today.getDate());

  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient colors={['#0F0F1A', '#1A1A2E']} style={styles.gradient}>
        <TouchableOpacity style={[styles.back, rtl && { alignSelf: 'flex-end' }]} onPress={() => router.back()}>
          <Ionicons name={rtl ? 'arrow-forward' : 'arrow-back'} size={24} color="#6C63FF" />
        </TouchableOpacity>

        <View style={styles.content}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials(student)}</Text>
          </View>

          <Text style={styles.name}>{displayName(student, lang)}</Text>
          {student.className && <Text style={styles.class}>{student.className}</Text>}

          <View style={styles.card}>
            <Ionicons name="lock-closed-outline" size={32} color="#6C63FF" style={styles.lockIcon} />
            <Text style={styles.cardTitle}>{t('verifyTitle')}</Text>
            <Text style={styles.cardSub}>{t('verifySub')}</Text>

            {/* Date picker button */}
            <TouchableOpacity
              style={[styles.dateBtn, error ? styles.dateBtnError : null]}
              onPress={() => setPickerOpen(true)}
              activeOpacity={0.7}
            >
              <Ionicons name="calendar-outline" size={22} color="#6C63FF" />
              <Text style={[styles.dateBtnText, !date && styles.dateBtnPlaceholder]}>
                {date ? formatDate(date) : t('dobPlaceholder')}
              </Text>
              <Ionicons name="chevron-down" size={18} color="#6C63FF" />
            </TouchableOpacity>

            {/* The actual DateTimePicker */}
            {pickerOpen && (
              <DateTimePicker
                value={defaultPickerDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onPickerChange}
                maximumDate={today}
                minimumDate={new Date(1990, 0, 1)}
                themeVariant="dark"
              />
            )}

            {/* iOS spinner needs a Done button (it doesn't auto-close) */}
            {pickerOpen && Platform.OS === 'ios' && (
              <TouchableOpacity style={styles.doneBtn} onPress={() => setPickerOpen(false)}>
                <Text style={styles.doneBtnText}>OK</Text>
              </TouchableOpacity>
            )}

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity
              style={[styles.btn, (loading || !date) && styles.btnDisabled, rtl && styles.rowReverse]}
              onPress={verify}
              disabled={loading || !date}
            >
              <Text style={styles.btnText}>{loading ? t('checking') : t('startAssessment')}</Text>
              {!loading && <Ionicons name={rtl ? 'arrow-back' : 'arrow-forward'} size={20} color="#FFF" />}
            </TouchableOpacity>
          </View>

          <View style={[styles.infoRow, rtl && styles.rowReverse]}>
            <Ionicons name="information-circle-outline" size={16} color="#555" />
            <Text style={styles.infoText}>{t('resultsSentAuto')}</Text>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0F0F1A' },
  gradient: { flex: 1 },
  back: { padding: 20, alignSelf: 'flex-start' },
  rowReverse: { flexDirection: 'row-reverse' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#6C63FF22', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#6C63FF' },
  avatarText: { color: '#6C63FF', fontWeight: '800', fontSize: 28 },
  name: { color: '#FFF', fontSize: 24, fontWeight: '800', marginTop: 16, textAlign: 'center' },
  class: { color: '#6C63FF', fontSize: 14, marginTop: 4, marginBottom: 32 },
  card: { width: '100%', maxWidth: 480, backgroundColor: '#1C1C2E', borderRadius: 24, padding: 32, alignItems: 'center', borderWidth: 1, borderColor: '#2A2A4A' },
  lockIcon: { marginBottom: 16 },
  cardTitle: { color: '#FFF', fontSize: 20, fontWeight: '700', marginBottom: 8, textAlign: 'center' },
  cardSub: { color: '#888', fontSize: 14, marginBottom: 24, textAlign: 'center' },
  dateBtn: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0F0F1A',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2A2A4A',
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 12,
    gap: 12,
  },
  dateBtnError: { borderColor: '#FF6B6B' },
  dateBtnText: { color: '#FFF', fontSize: 18, fontWeight: '600', flex: 1, textAlign: 'center', letterSpacing: 2 },
  dateBtnPlaceholder: { color: '#555', letterSpacing: 1 },
  doneBtn: { marginTop: 8, marginBottom: 8, backgroundColor: '#6C63FF', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 24 },
  doneBtnText: { color: '#FFF', fontWeight: '700', fontSize: 14 },
  errorText: { color: '#FF6B6B', fontSize: 13, marginBottom: 16, textAlign: 'center' },
  btn: { width: '100%', flexDirection: 'row', backgroundColor: '#6C63FF', borderRadius: 14, paddingVertical: 16, alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 8 },
  btnDisabled: { opacity: 0.4 },
  btnText: { color: '#FFF', fontWeight: '700', fontSize: 17 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 24, paddingHorizontal: 20 },
  infoText: { color: '#555', fontSize: 12, flex: 1, textAlign: 'center' },
});
