import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

interface MenuItem {
  icon: string;
  label: string;
  subtitle?: string;
  color?: string;
}

const menuSections: {title: string; items: MenuItem[]}[] = [
  {
    title: 'Заказы',
    items: [
      {icon: '📦', label: 'Мои заказы', subtitle: '3 активных'},
      {icon: '📍', label: 'Адреса доставки', subtitle: '2 адреса'},
      {icon: '💳', label: 'Способы оплаты', subtitle: 'Visa •••• 4242'},
    ],
  },
  {
    title: 'Настройки',
    items: [
      {icon: '🔔', label: 'Уведомления'},
      {icon: '🌙', label: 'Тёмная тема'},
      {icon: '🌐', label: 'Язык', subtitle: 'Русский'},
    ],
  },
  {
    title: 'Информация',
    items: [
      {icon: '❓', label: 'Помощь и FAQ'},
      {icon: '📞', label: 'Связаться с нами'},
      {icon: '⭐', label: 'Оценить приложение'},
      {icon: '📄', label: 'Политика конфиденциальности'},
    ],
  },
];

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Профиль</Text>
        </View>

        {/* User card */}
        <View style={styles.userCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>AB</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Александр</Text>
            <Text style={styles.userEmail}>alex@example.com</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editIcon}>✏️</Text>
          </TouchableOpacity>
        </View>

        {/* Loyalty card */}
        <View style={styles.loyaltyCard}>
          <View style={styles.loyaltyHeader}>
            <Text style={styles.loyaltyTitle}>Bloom Club</Text>
            <Text style={styles.loyaltyBadge}>Gold</Text>
          </View>
          <View style={styles.loyaltyProgress}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, {width: '65%'}]} />
            </View>
            <Text style={styles.loyaltyPoints}>650 / 1000 баллов</Text>
          </View>
          <Text style={styles.loyaltyHint}>
            Ещё 350 баллов до Platinum статуса
          </Text>
        </View>

        {/* Menu sections */}
        {menuSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionCard}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  style={[
                    styles.menuItem,
                    itemIndex < section.items.length - 1 && styles.menuItemBorder,
                  ]}>
                  <Text style={styles.menuIcon}>{item.icon}</Text>
                  <View style={styles.menuTextContainer}>
                    <Text style={styles.menuLabel}>{item.label}</Text>
                    {item.subtitle && (
                      <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                    )}
                  </View>
                  <Text style={styles.menuArrow}>›</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Выйти из аккаунта</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Версия 1.0.0</Text>
        <View style={{height: 30}} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1a1a2e',
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E91E63',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  userInfo: {
    flex: 1,
    marginLeft: 14,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  userEmail: {
    fontSize: 13,
    color: '#999',
    marginTop: 2,
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIcon: {
    fontSize: 16,
  },
  loyaltyCard: {
    backgroundColor: '#1a1a2e',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  loyaltyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  loyaltyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  loyaltyBadge: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFB800',
    backgroundColor: 'rgba(255,184,0,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: 'hidden',
  },
  loyaltyProgress: {
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 3,
    marginBottom: 8,
  },
  progressFill: {
    height: 6,
    backgroundColor: '#FFB800',
    borderRadius: 3,
  },
  loyaltyPoints: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
  },
  loyaltyHint: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999',
    paddingHorizontal: 20,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 14,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1a1a2e',
  },
  menuSubtitle: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  menuArrow: {
    fontSize: 22,
    color: '#CCC',
    fontWeight: '300',
  },
  logoutButton: {
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#FFE0E0',
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#E91E63',
  },
  version: {
    textAlign: 'center',
    fontSize: 12,
    color: '#CCC',
    marginBottom: 8,
  },
});
