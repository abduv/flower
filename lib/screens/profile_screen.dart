import 'package:flutter/material.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          const SizedBox(height: 8),

          // Avatar & user info
          Center(
            child: Column(
              children: [
                Container(
                  width: 80,
                  height: 80,
                  decoration: const BoxDecoration(
                    color: Color(0xFFE91E63),
                    shape: BoxShape.circle,
                  ),
                  child: const Center(
                    child: Text(
                      'АБ',
                      style: TextStyle(
                        fontSize: 28,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: 12),
                const Text(
                  'Александр',
                  style: TextStyle(
                    fontSize: 22,
                    fontWeight: FontWeight.bold,
                    color: Color(0xFF1a1a2e),
                  ),
                ),
                const SizedBox(height: 4),
                const Text(
                  'alex@example.com',
                  style: TextStyle(color: Colors.grey, fontSize: 14),
                ),
                const SizedBox(height: 12),
                OutlinedButton.icon(
                  onPressed: () {},
                  icon: const Icon(Icons.edit, size: 16),
                  label: const Text('Редактировать'),
                  style: OutlinedButton.styleFrom(
                    foregroundColor: const Color(0xFFE91E63),
                    side: const BorderSide(color: Color(0xFFE91E63)),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(20),
                    ),
                  ),
                ),
              ],
            ),
          ),

          const SizedBox(height: 24),

          // Loyalty card
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [Color(0xFFE91E63), Color(0xFFFF6090)],
              ),
              borderRadius: BorderRadius.circular(20),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      '🌸 Bloom Club',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    Text(
                      'Gold',
                      style: TextStyle(
                        color: Colors.white70,
                        fontSize: 14,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 16),
                ClipRRect(
                  borderRadius: BorderRadius.circular(4),
                  child: LinearProgressIndicator(
                    value: 0.65,
                    backgroundColor: Colors.white.withValues(alpha: 0.3),
                    valueColor:
                        const AlwaysStoppedAnimation<Color>(Colors.white),
                    minHeight: 6,
                  ),
                ),
                const SizedBox(height: 8),
                const Text(
                  '650 / 1000 баллов до Platinum',
                  style: TextStyle(color: Colors.white70, fontSize: 13),
                ),
              ],
            ),
          ),

          const SizedBox(height: 24),

          // Orders section
          const _SectionTitle(title: 'Заказы'),
          _MenuItem(
            icon: Icons.receipt_long,
            label: 'Мои заказы',
            trailing: '3 активных',
            onTap: () {},
          ),
          _MenuItem(
            icon: Icons.location_on_outlined,
            label: 'Адреса доставки',
            trailing: '2',
            onTap: () {},
          ),
          _MenuItem(
            icon: Icons.credit_card,
            label: 'Способы оплаты',
            trailing: 'Visa ****',
            onTap: () {},
          ),

          const SizedBox(height: 16),

          // Settings section
          const _SectionTitle(title: 'Настройки'),
          _MenuItem(
            icon: Icons.notifications_outlined,
            label: 'Уведомления',
            onTap: () {},
          ),
          _MenuItem(
            icon: Icons.dark_mode_outlined,
            label: 'Тёмная тема',
            hasSwitch: true,
            onTap: () {},
          ),
          _MenuItem(
            icon: Icons.language,
            label: 'Язык',
            trailing: 'Русский',
            onTap: () {},
          ),

          const SizedBox(height: 16),

          // Info section
          const _SectionTitle(title: 'Информация'),
          _MenuItem(
            icon: Icons.help_outline,
            label: 'Помощь и FAQ',
            onTap: () {},
          ),
          _MenuItem(
            icon: Icons.mail_outline,
            label: 'Связаться с нами',
            onTap: () {},
          ),
          _MenuItem(
            icon: Icons.star_outline,
            label: 'Оценить приложение',
            onTap: () {},
          ),
          _MenuItem(
            icon: Icons.privacy_tip_outlined,
            label: 'Политика конфиденциальности',
            onTap: () {},
          ),

          const SizedBox(height: 24),

          // Logout
          OutlinedButton.icon(
            onPressed: () {},
            icon: const Icon(Icons.logout),
            label: const Text('Выйти'),
            style: OutlinedButton.styleFrom(
              foregroundColor: Colors.red,
              side: const BorderSide(color: Colors.red),
              padding: const EdgeInsets.symmetric(vertical: 14),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(16),
              ),
            ),
          ),

          const SizedBox(height: 16),
          const Center(
            child: Text(
              'Версия 1.0.0',
              style: TextStyle(color: Colors.grey, fontSize: 12),
            ),
          ),
          const SizedBox(height: 16),
        ],
      ),
    );
  }
}

class _SectionTitle extends StatelessWidget {
  final String title;
  const _SectionTitle({required this.title});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Text(
        title,
        style: const TextStyle(
          fontSize: 16,
          fontWeight: FontWeight.bold,
          color: Color(0xFF1a1a2e),
        ),
      ),
    );
  }
}

class _MenuItem extends StatelessWidget {
  final IconData icon;
  final String label;
  final String? trailing;
  final bool hasSwitch;
  final VoidCallback onTap;

  const _MenuItem({
    required this.icon,
    required this.label,
    this.trailing,
    this.hasSwitch = false,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 4),
      child: ListTile(
        onTap: onTap,
        leading: Icon(icon, color: const Color(0xFF555555)),
        title: Text(
          label,
          style: const TextStyle(fontSize: 15, color: Color(0xFF1a1a2e)),
        ),
        trailing: hasSwitch
            ? Switch(
                value: false,
                onChanged: (_) {},
                activeThumbColor: const Color(0xFFE91E63),
              )
            : trailing != null
                ? Text(
                    trailing!,
                    style: TextStyle(fontSize: 13, color: Colors.grey[500]),
                  )
                : const Icon(Icons.chevron_right, color: Colors.grey),
        contentPadding: const EdgeInsets.symmetric(horizontal: 12),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        tileColor: Colors.white,
      ),
    );
  }
}
