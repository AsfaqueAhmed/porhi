'use client';

import React from 'react';
import type { CQRubric } from '@pori/shared';
import { useLanguageStore } from '@/store/language-store';

export interface CqRubricEditorProps {
  cqRubric: CQRubric;
  onChange: (key: keyof CQRubric, field: 'mark' | 'criteria', value: string | number) => void;
}

export function CqRubricEditor({ cqRubric, onChange }: CqRubricEditorProps) {
  const tr = useLanguageStore((s) => s.tr);

  const sections: Array<{
    key: keyof CQRubric;
    title: string;
    placeholder: string;
  }> = [
    {
      key: 'ka',
      title: tr('ক — জ্ঞানমূলক মানদণ্ড', 'A — Knowledge Criterion'),
      placeholder: tr('ক অংশের জ্ঞানমূলক প্রশ্ন ও মূল্যায়ন মানদণ্ড লিখুন...', 'Enter part A knowledge criteria...'),
    },
    {
      key: 'kha',
      title: tr('খ — অনুধাবনমূলক মানদণ্ড', 'B — Comprehension Criterion'),
      placeholder: tr('খ অংশের অনুধাবনমূলক প্রশ্ন ও মূল্যায়ন মানদণ্ড লিখুন...', 'Enter part B comprehension criteria...'),
    },
    {
      key: 'ga',
      title: tr('গ — প্রয়োগমূলক মানদণ্ড', 'C — Application Criterion'),
      placeholder: tr('গ অংশের প্রয়োগমূলক সমস্যা ও সমাধান ধাপ লিখুন...', 'Enter part C application criteria...'),
    },
    {
      key: 'gha',
      title: tr('ঘ — উচ্চতর দক্ষতা মানদণ্ড', 'D — Higher-order Skills Criterion'),
      placeholder: tr('ঘ অংশের উচ্চতর চিন্তন দক্ষতা ও মূল্যায়ন মানদণ্ড লিখুন...', 'Enter part D higher-order criteria...'),
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
      <h3 className="text-sm font-bold text-slate-900">
        {tr('সৃজনশীল (CQ) ৪ অংশের প্রশ্ন ও মূল্যায়ন রুব্রিক', 'Creative (CQ) 4-Part Rubric & Scoring')}
      </h3>
      <div className="space-y-3">
        {sections.map((part) => (
          <div
            key={part.key}
            className="p-3 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2"
          >
            <div className="flex items-center justify-between gap-3">
              <label
                htmlFor={`cq-${part.key}-criteria`}
                className="text-xs font-bold text-slate-800"
              >
                {part.title}
              </label>
              <div className="flex items-center gap-1.5 text-xs">
                <label
                  htmlFor={`cq-${part.key}-mark`}
                  className="text-[11px] font-semibold text-slate-600"
                >
                  {tr('নম্বর:', 'Marks:')}
                </label>
                <input
                  id={`cq-${part.key}-mark`}
                  type="number"
                  min={0}
                  value={cqRubric[part.key].mark}
                  onChange={(e) =>
                    onChange(
                      part.key,
                      'mark',
                      Math.max(0, Number.parseInt(e.target.value, 10) || 0),
                    )
                  }
                  className="w-14 text-xs p-1 text-center border border-slate-300 rounded-lg bg-white font-mono"
                />
              </div>
            </div>
            <textarea
              id={`cq-${part.key}-criteria`}
              rows={2}
              value={cqRubric[part.key].criteria}
              onChange={(e) => onChange(part.key, 'criteria', e.target.value)}
              placeholder={part.placeholder}
              className="w-full text-xs p-2.5 border border-slate-300 rounded-xl bg-white"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
