import 'package:flutter/material.dart';
import 'package:porhi/core/theme/porhi_theme.dart';

/// A compact editorial header used at the start of student feature screens.
/// Keeps the page purpose clear without taking space away from the main task.
class FeatureIntroCard extends StatelessWidget {
  final IconData icon;
  final String eyebrow;
  final String title;
  final String description;

  const FeatureIntroCard({
    super.key,
    required this.icon,
    required this.eyebrow,
    required this.title,
    required this.description,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      clipBehavior: Clip.antiAlias,
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        gradient: PorhiTheme.heroGradient,
        borderRadius: BorderRadius.circular(26),
      ),
      child: Row(
        children: <Widget>[
          Container(
            width: 54,
            height: 54,
            decoration: BoxDecoration(
              color: Colors.white.withValues(alpha: 0.12),
              borderRadius: BorderRadius.circular(17),
              border: Border.all(color: Colors.white.withValues(alpha: 0.18)),
            ),
            child: Icon(icon, color: PorhiTheme.indigo100, size: 27),
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Text(
                  eyebrow.toUpperCase(),
                  style: TextStyle(
                    color: PorhiTheme.indigo100,
                    fontSize: 10,
                    fontWeight: FontWeight.w800,
                    letterSpacing: 1.05,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  title,
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 17,
                    height: 1.2,
                    fontWeight: FontWeight.w800,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  description,
                  style: const TextStyle(
                    color: Color(0xFFD2E6D9),
                    fontSize: 12.5,
                    height: 1.4,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
