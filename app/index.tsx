import React, { useEffect, useState, useCallback } from 'react';
import {
  View, Text, FlatList, TextInput, TouchableOpacity,
  StyleSheet, ActivityIndicator, SafeAreaView, RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { fetchStudents } from '@/lib/supabase';
import { Student } from '@/types';
import { useI18n } from '@/lib/i18n';
import { displayName, initials } from '@/lib/studentDisplay';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function HomeScreen() {
  const router = useRouter();
  const { t, rtl, lang } = useI18n();
  const [students, setStudents] = useState<Student[]>([]);
  const [filtered, setFiltered] = useState<Student[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setError(null);
      const data = await fetchStudents();
      setStudents(data);
      setFiltered(data);
    } catch (e: any) {
      setError(t('loadFailed'));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [t]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      q
        ? students.filter(s =>
            displayName(s, lang).toLowerCase().includes(q) ||
            `${s.firstName} ${s.lastName}`.toLowerCase().includes(q),
          )
        : students,
    );
  }, [search, students, lang]);

  const onRefresh = () => { setRefreshing(true); load(); };

  const selectStudent = (student: Student) => {
    router.push({ pathname: '/(auth)/verify', params: { studentJson: JSON.stringify(student) } });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient colors={['#0F0F1A', '#1A1A2E', '#16213E']} style={styles.gradient}>
        {/* Header */}
        <View style={[styles.header, rtl && styles.rowReverse]}>
          <View>
            <Text style={styles.brand}>{t('brand')}</Text>
            <Text style={styles.subtitle}>{t('assessmentCentre')}</Text>
          </View>
          <View style={[styles.headerRight, rtl && styles.rowReverse]}>
            <LanguageSwitcher />
            <View style={[styles.badge, rtl && styles.rowReverse]}>
              <Ionicons name="school-outline" size={20} color="#6C63FF" />
              <Text style={styles.badgeText}>{students.length} {t('studentsCount')}</Text>
            </View>
          </View>
        </View>

        {/* Search */}
        <View style={[styles.searchWrap, rtl && styles.rowReverse]}>
          <Ionicons name="search-outline" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, rtl && { textAlign: 'right' }]}
            placeholder={t('searchPlaceholder')}
            placeholderTextColor="#555"
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={20} color="#888" />
            </TouchableOpacity>
          )}
        </View>

        {/* Body */}
        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#6C63FF" />
            <Text style={styles.loadingText}>{t('loadingStudents')}</Text>
          </View>
        ) : error ? (
          <View style={styles.center}>
            <Ionicons name="wifi-outline" size={48} color="#FF6B6B" />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryBtn} onPress={load}>
              <Text style={styles.retryText}>{t('retry')}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={filtered}
            keyExtractor={item => item.id}
            numColumns={2}
            contentContainerStyle={styles.list}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#6C63FF" />}
            ListEmptyComponent={
              <View style={styles.center}>
                <Ionicons name="person-outline" size={48} color="#444" />
                <Text style={styles.emptyText}>{t('noStudents')}</Text>
              </View>
            }
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.card} onPress={() => selectStudent(item)} activeOpacity={0.8}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{initials(item)}</Text>
                </View>
                <Text style={styles.cardName} numberOfLines={2}>{displayName(item, lang)}</Text>
                {item.className && (
                  <View style={[styles.cardMeta, rtl && styles.rowReverse]}>
                    <Ionicons name="book-outline" size={13} color="#6C63FF" />
                    <Text style={styles.cardClass}>{item.className}</Text>
                  </View>
                )}
              </TouchableOpacity>
            )}
          />
        )}

        <Text style={styles.hint}>{t('tapToBegin')}</Text>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0F0F1A' },
  gradient: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingTop: 20, paddingBottom: 12, gap: 12 },
  rowReverse: { flexDirection: 'row-reverse' },
  brand: { fontSize: 32, fontWeight: '800', color: '#FFFFFF', letterSpacing: 4 },
  subtitle: { fontSize: 13, color: '#6C63FF', fontWeight: '600', letterSpacing: 1, marginTop: 2 },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  badge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1E1E35', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8, gap: 6, borderWidth: 1, borderColor: '#2A2A4A' },
  badgeText: { color: '#6C63FF', fontWeight: '700', fontSize: 13 },
  searchWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1A1A2E', borderRadius: 14, marginHorizontal: 24, marginBottom: 16, paddingHorizontal: 16, borderWidth: 1, borderColor: '#2A2A4A' },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, color: '#FFF', fontSize: 16, paddingVertical: 14 },
  list: { paddingHorizontal: 16, paddingBottom: 24 },
  card: { flex: 1, margin: 8, backgroundColor: '#1C1C2E', borderRadius: 18, padding: 20, alignItems: 'center', borderWidth: 1, borderColor: '#2A2A4A' },
  avatar: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#6C63FF22', alignItems: 'center', justifyContent: 'center', marginBottom: 12, borderWidth: 2, borderColor: '#6C63FF55' },
  avatarText: { color: '#6C63FF', fontWeight: '800', fontSize: 20 },
  cardName: { color: '#FFF', fontWeight: '700', fontSize: 15, textAlign: 'center', marginBottom: 6 },
  cardMeta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  cardClass: { color: '#888', fontSize: 12 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 60 },
  loadingText: { color: '#666', marginTop: 16, fontSize: 14, textAlign: 'center', paddingHorizontal: 24 },
  errorText: { color: '#FF6B6B', marginTop: 12, fontSize: 15, textAlign: 'center', paddingHorizontal: 24 },
  retryBtn: { marginTop: 16, backgroundColor: '#6C63FF', borderRadius: 12, paddingHorizontal: 28, paddingVertical: 12 },
  retryText: { color: '#FFF', fontWeight: '700' },
  emptyText: { color: '#555', marginTop: 12, fontSize: 15 },
  hint: { textAlign: 'center', color: '#333', fontSize: 12, paddingVertical: 12 },
});
