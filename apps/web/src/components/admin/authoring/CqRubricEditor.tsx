'use client';

import React from 'react';
import type { CQRubric } from '@pori/shared';
import { CQ_SECTIONS } from './authoring-helpers';

export interface CqRubricEditorProps {
  cqRubric: CQRubric;
  onChange: (key: keyof CQRubric, field: 'mark' | 'criteria', value: string | number) => void;
}

export function CqRubricEditor({ cqRubric, onChange }: CqRubricEditorProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
      <h3 className="text-sm font-bold text-slate-900">
        সৃজনশীল (CQ) ৪ অংশের প্রশ্ন ও মূল্যায়ন রুব্রিক
      </h3>
      <div className="space-y-3">
        {CQ_SECTIONS.map((part) => (
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
                  নম্বর:
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
