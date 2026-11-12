import 'dart:io';

import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:porhi/app/env.dart';
import 'package:porhi/core/content/media_url_resolver.dart';
import 'package:porhi/core/theme/porhi_theme.dart';

typedef RichImageWidgetBuilder = Widget Function(
  BuildContext context,
  String resolvedUrl,
);

/// Inline image card with tap-to-zoom fullscreen [InteractiveViewer] lightbox.
class ImageLightboxViewer extends StatelessWidget {
  final String src;
  final String alt;
  final EnvConfig? envConfig;
  final RichImageWidgetBuilder? imageBuilder;

  const ImageLightboxViewer({
    super.key,
    required this.src,
    this.alt = '',
    this.envConfig,
    this.imageBuilder,
  });

  Widget _buildImage(BuildContext context, String resolvedUrl, {BoxFit fit = BoxFit.contain}) {
    if (imageBuilder != null) {
      return imageBuilder!(context, resolvedUrl);
    }
    if (resolvedUrl.startsWith('file://')) {
      final path = tryParseLocalFilePath(resolvedUrl);
      if (path == null) return _errorPlaceholder();
      return Image.file(
        File(path),
        fit: fit,
        errorBuilder: (_, _, _) => _errorPlaceholder(),
      );
    }
    return CachedNetworkImage(
      imageUrl: resolvedUrl,
      fit: fit,
      placeholder: (_, _) => Container(
        height: 160,
        alignment: Alignment.center,
        color: PorhiTheme.slate100,
        child: const CircularProgressIndicator(strokeWidth: 2),
      ),
      errorWidget: (_, _, _) => _errorPlaceholder(),
    );
  }

  Widget _errorPlaceholder() {
    return Container(
      height: 140,
      padding: const EdgeInsets.all(16),
      alignment: Alignment.center,
      color: PorhiTheme.slate100,
      child: const Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(Icons.broken_image_outlined, color: PorhiTheme.slate400, size: 32),
          SizedBox(height: 6),
          Text(
            'ছবি লোড করা যায়নি',
            style: TextStyle(fontSize: 12, color: PorhiTheme.slate600),
          ),
        ],
      ),
    );
  }

  Future<void> _openLightbox(BuildContext context, String resolvedUrl) {
    return showDialog<void>(
      context: context,
      barrierColor: Colors.black87,
      builder: (dialogContext) {
        return Dialog.fullscreen(
          backgroundColor: Colors.black87,
          child: SafeArea(
            child: Stack(
              children: [
                Center(
                  child: InteractiveViewer(
                    minScale: 0.8,
                    maxScale: 4.0,
                    child: Padding(
                      padding: const EdgeInsets.all(16),
                      child: _buildImage(dialogContext, resolvedUrl),
                    ),
                  ),
                ),
                Positioned(
                  top: 12,
                  right: 12,
                  child: IconButton.filled(
                    onPressed: () => Navigator.of(dialogContext).pop(),
                    tooltip: 'বন্ধ করুন',
                    style: IconButton.styleFrom(
                      backgroundColor: Colors.white24,
                      foregroundColor: Colors.white,
                    ),
                    icon: const Icon(Icons.close_rounded),
                  ),
                ),
                if (alt.trim().isNotEmpty)
                  Positioned(
                    left: 16,
                    right: 16,
                    bottom: 16,
                    child: Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 14,
                        vertical: 10,
                      ),
                      decoration: BoxDecoration(
                        color: Colors.black54,
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Text(
                        alt.trim(),
                        textAlign: TextAlign.center,
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 13,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ),
                  ),
              ],
            ),
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final resolvedUrl = resolvePorhiMediaUrl(src, envConfig: envConfig);
    if (resolvedUrl.isEmpty) return const SizedBox.shrink();

    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 12),
      child: Column(
        children: [
          Stack(
            alignment: Alignment.bottomRight,
            children: [
              GestureDetector(
                onTap: () => _openLightbox(context, resolvedUrl),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(14),
                  child: DecoratedBox(
                    decoration: BoxDecoration(
                      border: Border.all(color: PorhiTheme.slate200),
                      borderRadius: BorderRadius.circular(14),
                    ),
                    child: ConstrainedBox(
                      constraints: const BoxConstraints(maxHeight: 320),
                      child: _buildImage(context, resolvedUrl),
                    ),
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(8),
                child: IconButton.filled(
                  onPressed: () => _openLightbox(context, resolvedUrl),
                  tooltip: 'জুম করুন',
                  style: IconButton.styleFrom(
                    backgroundColor: Colors.black54,
                    foregroundColor: Colors.white,
                    minimumSize: const Size(34, 34),
                    padding: const EdgeInsets.all(6),
                  ),
                  icon: const Icon(Icons.fullscreen_rounded, size: 18),
                ),
              ),
            ],
          ),
          if (alt.trim().isNotEmpty) ...[
            const SizedBox(height: 6),
            Text(
              alt.trim(),
              textAlign: TextAlign.center,
              style: const TextStyle(
                fontSize: 12,
                color: PorhiTheme.slate600,
                fontWeight: FontWeight.w500,
              ),
            ),
          ],
        ],
      ),
    );
  }
}
