'use client';

import React from 'react';
import { QuestionBankManager } from '../../../../components/admin/question-bank-manager';

export default function AdminMcqQuestionsPage() {
  return (
    <div className="space-y-6">
      <QuestionBankManager fixedType="MCQ" />
    </div>
  );
}
