'use client';

import React from 'react';
import { QuestionBankManager } from '../../../../components/admin/question-bank-manager';

export default function AdminCqQuestionsPage() {
  return (
    <div className="space-y-6">
      <QuestionBankManager fixedType="CQ_CREATIVE" />
    </div>
  );
}
