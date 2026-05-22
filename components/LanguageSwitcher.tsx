import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useI18n, LANGS, Lang } from '@/lib/i18n';

/**
 * Compact button + modal language picker.
 * Tap the globe icon → modal opens → pick EN / FR / AR → saved to AsyncStorage
 * and re-renders the whole app via context.
 */
export default function LanguageSwitcher() {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const current = LANGS.find(l => l.code === lang)!;

  const pick = async (l: Lang) => {
    setOpen(false);
    await setLang(l);
  };

  return (
    <>
      <TouchableOpacity style={styles.btn} onPress={() => setOpen(true)} activeOpacity={0.8}>
        <Ionicons name="language-outline" size={18} color="#6C63FF" />
        <Text style={styles.btnText}>{current.flag}  {current.native}</Text>
        <Ionicons name="chevron-down" size={14} color="#6C63FF" />
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <Pressable style={styles.card}>
            <Text style={styles.title}>{t('language')}</Text>
            {LANGS.map((l) => {
              const active = l.code === lang;
              return (
                <TouchableOpacity
                  key={l.code}
                  style={[styles.row, active && styles.rowActive]}
                  onPress={() => pick(l.code)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.flag}>{l.flag}</Text>
                  <View style={styles.rowInfo}>
                    <Text style={[styles.rowNative, active && { color: '#6C63FF' }]}>{l.native}</Text>
                    <Text style={styles.rowLabel}>{l.label}</Text>
                  </View>
                  {active && <Ionicons name="checkmark-circle" size={22} color="#6C63FF" />}
                </TouchableOpacity>
              );
            })}
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  btn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#1E1E35', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8, borderWidth: 1, borderColor: '#2A2A4A' },
  btnText: { color: '#6C63FF', fontWeight: '700', fontSize: 13 },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center', padding: 24 },
  card: { width: '100%', maxWidth: 360, backgroundColor: '#1C1C2E', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#2A2A4A' },
  title: { color: '#FFF', fontSize: 18, fontWeight: '800', marginBottom: 16, textAlign: 'center' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 14, paddingHorizontal: 14, borderRadius: 14, marginBottom: 4 },
  rowActive: { backgroundColor: '#6C63FF15', borderWidth: 1, borderColor: '#6C63FF44' },
  flag: { fontSize: 28 },
  rowInfo: { flex: 1 },
  rowNative: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  rowLabel: { color: '#666', fontSize: 12, marginTop: 2 },
});
