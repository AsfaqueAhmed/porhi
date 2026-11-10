export type Language = 'bn' | 'en';

export const TRANSLATIONS = {
  // Navigation
  'nav.home': { bn: 'হোম', en: 'Home' },
  'nav.subjects': { bn: 'বিষয়সমূহ', en: 'Subjects' },
  'nav.progress': { bn: 'অগ্রগতি', en: 'Progress' },
  'nav.overview': { bn: 'ওভারভিউ', en: 'Overview' },
  'nav.curriculum': { bn: 'কারিকুলাম', en: 'Curriculum' },
  'nav.questions': { bn: 'প্রশ্ন ভান্ডার', en: 'Question Bank' },
  'nav.lessons': { bn: 'পাঠ্য লেসন', en: 'Lessons Bank' },
  'nav.reviewQueue': { bn: 'রিভিউ কিউ', en: 'Review Queue' },
  'nav.newQuestion': { bn: 'নতুন প্রশ্ন তৈরি', en: 'Create Question' },
  'nav.newLesson': { bn: 'নতুন লেসন তৈরি', en: 'Create Lesson' },
  'nav.adminPortal': { bn: 'অ্যাডমিন পোর্টাল', en: 'Admin Portal' },
  'nav.studentPortal': { bn: 'শিক্ষার্থী পোর্টাল', en: 'Student Portal' },
  'nav.backToLessons': { bn: 'লেসন তালিকায় ফিরুন', en: 'Back to Lessons' },
  'nav.backToQuestions': { bn: 'প্রশ্ন তালিকায় ফিরুন', en: 'Back to Questions' },

  // Actions
  'action.save': { bn: 'সংরক্ষণ করুন', en: 'Save' },
  'action.saving': { bn: 'সংরক্ষণ হচ্ছে...', en: 'Saving...' },
  'action.edit': { bn: 'সম্পাদনা', en: 'Edit' },
  'action.delete': { bn: 'মুছুন', en: 'Delete' },
  'action.cancel': { bn: 'বাতিল', en: 'Cancel' },
  'action.create': { bn: 'নতুন তৈরি', en: 'Create New' },
  'action.newContent': { bn: 'নতুন কনটেন্ট', en: 'New Content' },
  'action.search': { bn: 'অনুসন্ধান করুন...', en: 'Search...' },
  'action.filter': { bn: 'ফিল্টার', en: 'Filter' },
  'action.apply': { bn: 'প্রয়োগ করুন', en: 'Apply' },
  'action.clear': { bn: 'রিসেট', en: 'Reset' },
  'action.login': { bn: 'লগইন', en: 'Login' },
  'action.logout': { bn: 'লগআউট', en: 'Logout' },
  'action.reload': { bn: 'রিলোড', en: 'Reload' },
  'action.upload': { bn: 'আপলোড', en: 'Upload' },
  'action.insert': { bn: 'লেসনে যুক্ত করুন', en: 'Insert' },
  'action.submit': { bn: 'জমা দিন', en: 'Submit' },
  'action.close': { bn: 'বন্ধ করুন', en: 'Close' },

  // Statuses
  'status.all': { bn: 'সবগুলো', en: 'All' },
  'status.draft': { bn: 'খসড়া', en: 'Draft' },
  'status.inReview': { bn: 'রিভিউতে আছে', en: 'In Review' },
  'status.published': { bn: 'প্রকাশিত', en: 'Published' },
  'status.correction': { bn: 'সংশোধনে আছে', en: 'Correction' },
  'status.archived': { bn: 'আর্কাইভড', en: 'Archived' },

  // Roles
  'role.admin': { bn: 'অ্যাডমিন', en: 'Admin' },
  'role.editor': { bn: 'এডিটর', en: 'Editor' },
  'role.reviewer': { bn: 'রিভিউয়ার', en: 'Reviewer' },
  'role.student': { bn: 'শিক্ষার্থী', en: 'Student' },

  // Common UI
  'common.currentSubject': { bn: 'বর্তমান বিষয়', en: 'Current Subject' },
  'common.selectSubject': { bn: 'বিষয় নির্বাচন করুন', en: 'Select Subject' },
  'common.language': { bn: 'ভাষা', en: 'Language' },
  'common.loading': { bn: 'লোড হচ্ছে...', en: 'Loading...' },
  'common.noData': { bn: 'কোনো তথ্য পাওয়া যায়নি', en: 'No data found' },
  'common.success': { bn: 'সফল হয়েছে', en: 'Success' },
  'common.error': { bn: 'ত্রুটি', en: 'Error' },
  'common.version': { bn: 'ভার্সন', en: 'Version' },
} as const;

export type TranslationKey = keyof typeof TRANSLATIONS;

export function t(key: TranslationKey, lang: Language = 'bn'): string {
  const item = TRANSLATIONS[key];
  if (!item) return key;
  return item[lang] || item.bn || key;
}

export function tr(bn: string, en: string, lang: Language = 'bn'): string {
  return lang === 'en' ? en : bn;
}

export function formatDigits(val: string | number, lang: Language): string {
  const str = String(val);
  if (lang === 'en') {
    // Convert Bengali digits to Western digits
    return str.replace(/[০-৯]/g, (d) => String('০১২৩৪৫৬৭৮৯'.indexOf(d)));
  }
  // Convert Western digits to Bengali digits
  return str.replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]);
}
