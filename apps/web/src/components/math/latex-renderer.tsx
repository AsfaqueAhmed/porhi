import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface LatexRendererProps {
  content?: string | null;
  className?: string;
}

interface Segment {
  type: 'text' | 'inline' | 'block';
  raw: string;
  math?: string;
}

export function parseLatexContent(content: string): Segment[] {
  const segments: Segment[] = [];
  // Match $$block$$ or $inline$ (single line)
  const regex = /\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      segments.push({
        type: 'text',
        raw: content.slice(lastIndex, match.index),
      });
    }

    if (match[1] !== undefined) {
      // Block math $$...$$
      segments.push({
        type: 'block',
        raw: match[0],
        math: match[1].trim(),
      });
    } else if (match[2] !== undefined) {
      // Inline math $...$
      segments.push({
        type: 'inline',
        raw: match[0],
        math: match[2].trim(),
      });
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < content.length) {
    segments.push({
      type: 'text',
      raw: content.slice(lastIndex),
    });
  }

  return segments;
}

export const LatexRenderer: React.FC<LatexRendererProps> = ({ content, className }) => {
  if (!content) {
    return null;
  }

  const segments = parseLatexContent(content);

  return (
    <div className={className}>
      {segments.map((seg, idx) => {
        if (seg.type === 'text') {
          return <span key={idx}>{seg.raw}</span>;
        }

        try {
          const isBlock = seg.type === 'block';
          const html = katex.renderToString(seg.math || '', {
            displayMode: isBlock,
            throwOnError: false,
            trust: false,
            strict: 'warn',
          });

          if (isBlock) {
            return (
              <div
                key={idx}
                className="my-2 overflow-x-auto py-1"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            );
          }

          return (
            <span
              key={idx}
              className="inline-block px-0.5"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        } catch {
          return (
            <span key={idx} className="text-red-500 font-mono text-sm">
              {seg.raw}
            </span>
          );
        }
      })}
    </div>
  );
};
