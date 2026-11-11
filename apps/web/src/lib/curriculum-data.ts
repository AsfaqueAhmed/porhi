export interface TopicItem {
  id: string;
  chapterId: string;
  orderIndex: number;
  titleBangla: string;
}

export interface ChapterItem {
  id: string;
  subjectId: string;
  orderIndex: number;
  titleBangla: string;
  topics: TopicItem[];
}

export const DEFAULT_CHAPTERS: ChapterItem[] = [
  {
    id: 'chap_ssc_physics_ch1',
    subjectId: 'sub_ssc_physics',
    orderIndex: 1,
    titleBangla: 'প্রথম অধ্যায়: ভৌত রাশি ও পরিমাপ',
    topics: [
      { id: 'top_ssc_physics_ch1_1', chapterId: 'chap_ssc_physics_ch1', orderIndex: 1, titleBangla: '১.১ পদার্থবিজ্ঞান (Physics)' },
      { id: 'top_ssc_physics_ch1_2', chapterId: 'chap_ssc_physics_ch1', orderIndex: 2, titleBangla: '১.২ পদার্থবিজ্ঞানের পরিসর (Scope of Physics)' },
      { id: 'top_ssc_physics_ch1_3', chapterId: 'chap_ssc_physics_ch1', orderIndex: 3, titleBangla: '১.৩ পদার্থবিজ্ঞানের ক্রমবিকাশ (Development of Physics)' },
      { id: 'top_ssc_physics_ch1_4', chapterId: 'chap_ssc_physics_ch1', orderIndex: 4, titleBangla: '১.৪ পদার্থবিজ্ঞানের উদ্দেশ্য (Objectives of Physics)' },
      { id: 'top_ssc_physics_ch1_5', chapterId: 'chap_ssc_physics_ch1', orderIndex: 5, titleBangla: '১.৫ ভৌত রাশি ও তাদের পরিমাপ (Physical Quantities)' },
      { id: 'top_ssc_physics_ch1_6', chapterId: 'chap_ssc_physics_ch1', orderIndex: 6, titleBangla: '১.৬ পরিমাপের যন্ত্রপাতি (Measuring Instruments)' },
      { id: 'top_ssc_physics_ch1_7', chapterId: 'chap_ssc_physics_ch1', orderIndex: 7, titleBangla: '১.৭ পরিমাপের ত্রুটি ও নির্ভুলতা (Error and Accuracy)' },
    ],
  },
  {
    id: 'chap_ssc_physics_ch2',
    subjectId: 'sub_ssc_physics',
    orderIndex: 2,
    titleBangla: 'দ্বিতীয় অধ্যায়: গতি (Motion)',
    topics: [
      { id: 'top_ssc_physics_ch2_1', chapterId: 'chap_ssc_physics_ch2', orderIndex: 1, titleBangla: '২.১ স্থিতি এবং গতি (Rest and Motion)' },
      { id: 'top_ssc_physics_ch2_2', chapterId: 'chap_ssc_physics_ch2', orderIndex: 2, titleBangla: '২.২ বিভিন্ন প্রকার গতি (Different Types of Motion)' },
      { id: 'top_ssc_physics_ch2_3', chapterId: 'chap_ssc_physics_ch2', orderIndex: 3, titleBangla: '২.৩ স্কেলার ও ভেক্টর রাশি (Scalar and Vector)' },
      { id: 'top_ssc_physics_ch2_4', chapterId: 'chap_ssc_physics_ch2', orderIndex: 4, titleBangla: '২.৪ দূরত্ব ও সরণ (Distance and Displacement)' },
      { id: 'top_ssc_physics_ch2_5', chapterId: 'chap_ssc_physics_ch2', orderIndex: 5, titleBangla: '২.৫ দ্রুতি ও বেগ (Speed and Velocity)' },
      { id: 'top_ssc_physics_ch2_6', chapterId: 'chap_ssc_physics_ch2', orderIndex: 6, titleBangla: '২.৬ ত্বরণ ও মন্দন (Acceleration and Deceleration)' },
      { id: 'top_ssc_physics_ch2_7', chapterId: 'chap_ssc_physics_ch2', orderIndex: 7, titleBangla: '২.৭ গতির সমীকরণ (Equations of Motion)' },
      { id: 'top_ssc_physics_ch2_8', chapterId: 'chap_ssc_physics_ch2', orderIndex: 8, titleBangla: '২.৮ পতনশীল বস্তুর সূত্র ও লেখচিত্র (Falling Bodies & Graphs)' },
      { id: 'top_ssc_physics_motion_eq', chapterId: 'chap_ssc_physics_ch2', orderIndex: 9, titleBangla: 'গতির সমীকরণ ও সমাধান' },
      { id: 'topic-motion-3', chapterId: 'chap_ssc_physics_ch2', orderIndex: 10, titleBangla: 'গতির সমীকরণসমূহ ও গাণিতিক বিশ্লেষণ' },
      { id: 'topic-motion-1', chapterId: 'chap_ssc_physics_ch2', orderIndex: 11, titleBangla: 'স্থিতি এবং গতি' },
    ],
  },
  {
    id: 'chap_ssc_physics_ch3',
    subjectId: 'sub_ssc_physics',
    orderIndex: 3,
    titleBangla: 'তৃতীয় অধ্যায়: বল (Force)',
    topics: [
      { id: 'top_ssc_physics_ch3_1', chapterId: 'chap_ssc_physics_ch3', orderIndex: 1, titleBangla: '৩.১ জড়তা ও বলের ধারণা (Inertia and Force)' },
      { id: 'top_ssc_physics_ch3_2', chapterId: 'chap_ssc_physics_ch3', orderIndex: 2, titleBangla: '৩.২ মৌলিক বলের প্রকৃতি (Fundamental Forces)' },
      { id: 'top_ssc_physics_ch3_3', chapterId: 'chap_ssc_physics_ch3', orderIndex: 3, titleBangla: '৩.৩ সাম্য ও অসাম্য বল (Balanced and Unbalanced Forces)' },
      { id: 'top_ssc_physics_ch3_4', chapterId: 'chap_ssc_physics_ch3', orderIndex: 4, titleBangla: '৩.৪ বেগের ওপর বলের প্রভাব (How Force Changes Velocity)' },
      { id: 'top_ssc_physics_ch3_5', chapterId: 'chap_ssc_physics_ch3', orderIndex: 5, titleBangla: '৩.৫ নিউটনের দ্বিতীয় সূত্র ও বল পরিমাপ (Newton’s Second Law & Lab)' },
      { id: 'top_ssc_physics_ch3_6', chapterId: 'chap_ssc_physics_ch3', orderIndex: 6, titleBangla: '৩.৬ নিউটনের তৃতীয় সূত্র: ক্রিয়া ও প্রতিক্রিয়া (Action and Reaction)' },
      { id: 'top_ssc_physics_ch3_7', chapterId: 'chap_ssc_physics_ch3', orderIndex: 7, titleBangla: '৩.৭ নিরাপদ ভ্রমণে বল ও গতি (Forces in Safe Travel)' },
      { id: 'top_ssc_physics_ch3_8', chapterId: 'chap_ssc_physics_ch3', orderIndex: 8, titleBangla: '৩.৮ ভরবেগ সংরক্ষণ ও সংঘর্ষ (Conservation of Momentum & Lab)' },
      { id: 'top_ssc_physics_ch3_9', chapterId: 'chap_ssc_physics_ch3', orderIndex: 9, titleBangla: '৩.৯ ঘর্ষণ বলের ধরন ও বৈশিষ্ট্য (Types of Friction & Lab)' },
      { id: 'top_ssc_physics_ch3_10', chapterId: 'chap_ssc_physics_ch3', orderIndex: 10, titleBangla: '৩.১০ ঘর্ষণ, গতি ও ব্যবহার (Friction: Effects and Uses)' },
    ],
  },
  {
    id: 'chap_ssc_physics_ch4',
    subjectId: 'sub_ssc_physics',
    orderIndex: 4,
    titleBangla: 'চতুর্থ অধ্যায়: কাজ, ক্ষমতা ও শক্তি (Work, Power, and Energy)',
    topics: [
      { id: 'top_ssc_physics_ch4_1', chapterId: 'chap_ssc_physics_ch4', orderIndex: 1, titleBangla: '৪.১ কাজ (Work)' },
      { id: 'top_ssc_physics_ch4_2', chapterId: 'chap_ssc_physics_ch4', orderIndex: 2, titleBangla: '৪.২ শক্তি ও শক্তির বিভিন্ন রূপ (Energy and Forms of Energy)' },
      { id: 'top_ssc_physics_ch4_3', chapterId: 'chap_ssc_physics_ch4', orderIndex: 3, titleBangla: '৪.৩ গতিশক্তি ও বিভবশক্তি (Kinetic and Potential Energy)' },
      { id: 'top_ssc_physics_ch4_4', chapterId: 'chap_ssc_physics_ch4', orderIndex: 4, titleBangla: '৪.৪ শক্তির নিত্যতা ও রূপান্তর (Conservation & Transformation of Energy & Lab)' },
      { id: 'top_ssc_physics_ch4_5', chapterId: 'chap_ssc_physics_ch4', orderIndex: 5, titleBangla: '৪.৫ শক্তির উৎস ও পরিবেশের প্রভাব (Energy Sources and Environment)' },
      { id: 'top_ssc_physics_ch4_6', chapterId: 'chap_ssc_physics_ch4', orderIndex: 6, titleBangla: '৪.৬ ভর ও শক্তির সম্পর্ক (Mass–Energy Equivalence, E=mc²)' },
      { id: 'top_ssc_physics_ch4_7', chapterId: 'chap_ssc_physics_ch4', orderIndex: 7, titleBangla: '৪.৭ ক্ষমতা (Power)' },
      { id: 'top_ssc_physics_ch4_8', chapterId: 'chap_ssc_physics_ch4', orderIndex: 8, titleBangla: '৪.৮ কর্মদক্ষতা (Efficiency & Lab)' },
    ],
  },
  {
    id: 'chap_ssc_physics_ch5',
    subjectId: 'sub_ssc_physics',
    orderIndex: 5,
    titleBangla: 'পঞ্চম অধ্যায়: পদার্থের অবস্থা ও চাপ (States of Matter and Pressure)',
    topics: [
      { id: 'top_ssc_physics_ch5_1', chapterId: 'chap_ssc_physics_ch5', orderIndex: 1, titleBangla: '৫.১ চাপ (Pressure)' },
      { id: 'top_ssc_physics_ch5_2', chapterId: 'chap_ssc_physics_ch5', orderIndex: 2, titleBangla: '৫.২ ঘনত্ব (Density)' },
      { id: 'top_ssc_physics_ch5_3', chapterId: 'chap_ssc_physics_ch5', orderIndex: 3, titleBangla: '৫.৩ তরলে চাপ, প্যাসকেলের সূত্র ও প্লবতা (Pressure in Liquids, Pascal’s Law & Lab)' },
      { id: 'top_ssc_physics_ch5_4', chapterId: 'chap_ssc_physics_ch5', orderIndex: 4, titleBangla: '৫.৪ বায়ুচাপ, ব্যারোমিটার ও আবহাওয়া (Air Pressure, Barometer and Weather)' },
      { id: 'top_ssc_physics_ch5_5', chapterId: 'chap_ssc_physics_ch5', orderIndex: 5, titleBangla: '৫.৫ স্থিতিস্থাপকতা ও হুকের সূত্র (Elasticity and Hooke’s Law & Lab)' },
      { id: 'top_ssc_physics_ch5_6', chapterId: 'chap_ssc_physics_ch5', orderIndex: 6, titleBangla: '৫.৬ পদার্থের তিন অবস্থা, আণবিক গতিতত্ত্ব ও প্লাজমা (States of Matter & Plasma)' },
    ],
  },
  {
    id: 'chap_ssc_physics_ch6',
    subjectId: 'sub_ssc_physics',
    orderIndex: 6,
    titleBangla: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব (Effect of Heat on Matter)',
    topics: [
      { id: 'top_ssc_physics_ch6_1', chapterId: 'chap_ssc_physics_ch6', orderIndex: 1, titleBangla: '৬.১ তাপ ও তাপমাত্রা (Heat and Temperature)' },
      { id: 'top_ssc_physics_ch6_2', chapterId: 'chap_ssc_physics_ch6', orderIndex: 2, titleBangla: '৬.২ তাপমাত্রিক ধর্ম ও তাপমাত্রার স্কেল (Thermometric Properties and Scales)' },
      { id: 'top_ssc_physics_ch6_3', chapterId: 'chap_ssc_physics_ch6', orderIndex: 3, titleBangla: '৬.৩ পদার্থের তাপীয় প্রসারণ (Thermal Expansion of Matter & Lab)' },
      { id: 'top_ssc_physics_ch6_4', chapterId: 'chap_ssc_physics_ch6', orderIndex: 4, titleBangla: '৬.৪ অবস্থার পরিবর্তন, সুপ্ততাপ ও বাষ্পীভবন (Change of State, Latent Heat and Evaporation)' },
      { id: 'top_ssc_physics_ch6_5', chapterId: 'chap_ssc_physics_ch6', orderIndex: 5, titleBangla: '৬.৫ আপেক্ষিক তাপ ও তাপধারণক্ষমতা (Specific Heat and Heat Capacity)' },
      { id: 'top_ssc_physics_ch6_6', chapterId: 'chap_ssc_physics_ch6', orderIndex: 6, titleBangla: '৬.৬ ক্যালরিমিতির মূলনীতি (Principles of Calorimetry & Lab)' },
      { id: 'top_ssc_physics_ch6_7', chapterId: 'chap_ssc_physics_ch6', orderIndex: 7, titleBangla: '৬.৭ গলনাঙ্ক ও স্ফুটনাঙ্কের ওপর চাপের প্রভাব (Effect of Pressure on Melting and Boiling Points)' },
    ],
  },
  {
    id: 'chap_ssc_physics_ch7',
    subjectId: 'sub_ssc_physics',
    orderIndex: 7,
    titleBangla: 'সপ্তম অধ্যায়: তরঙ্গ ও শব্দ (Waves and Sound)',
    topics: [
      { id: 'top_ssc_physics_ch7_1', chapterId: 'chap_ssc_physics_ch7', orderIndex: 1, titleBangla: '৭.১ সরল স্পন্দন গতি (Simple Harmonic Motion & Lab)' },
      { id: 'top_ssc_physics_ch7_2', chapterId: 'chap_ssc_physics_ch7', orderIndex: 2, titleBangla: '৭.২ তরঙ্গ (Waves & Wave Lab)' },
      { id: 'top_ssc_physics_ch7_3', chapterId: 'chap_ssc_physics_ch7', orderIndex: 3, titleBangla: '৭.৩ শব্দ তরঙ্গ (Sound Wave, Echo & Lab)' },
    ],
  },
  {
    id: 'chap_ssc_physics_ch8',
    subjectId: 'sub_ssc_physics',
    orderIndex: 8,
    titleBangla: 'অষ্টম অধ্যায়: আলোর প্রতিফলন (Reflection of Light)',
    topics: [
      { id: 'top_ssc_physics_ch8_1', chapterId: 'chap_ssc_physics_ch8', orderIndex: 1, titleBangla: '৮.১ আলোর প্রকৃতি ও তড়িৎচুম্বকীয় বর্ণালি (Nature of Light & EM Spectrum)' },
      { id: 'top_ssc_physics_ch8_2', chapterId: 'chap_ssc_physics_ch8', orderIndex: 2, titleBangla: '৮.২ আলোর প্রতিফলন, সূত্র ও ধরন (Reflection, Laws & Types + Lab)' },
      { id: 'top_ssc_physics_ch8_3', chapterId: 'chap_ssc_physics_ch8', orderIndex: 3, titleBangla: '৮.৩ দর্পণ, প্রতিবিম্ব ও সমতল দর্পণ (Mirrors, Images & Plane Mirror)' },
      { id: 'top_ssc_physics_ch8_4', chapterId: 'chap_ssc_physics_ch8', orderIndex: 4, titleBangla: '৮.৪ গোলীয় দর্পণের পরিচিতি ও জ্যামিতি (Spherical Mirror Geometry)' },
      { id: 'top_ssc_physics_ch8_5', chapterId: 'chap_ssc_physics_ch8', orderIndex: 5, titleBangla: '৮.৫ প্রতিবিম্ব অঙ্কন ও উত্তল দর্পণ (Ray Diagram Rules & Convex Mirror)' },
      { id: 'top_ssc_physics_ch8_6', chapterId: 'chap_ssc_physics_ch8', orderIndex: 6, titleBangla: '৮.৬ অবতল দর্পণ (৬ অবস্থান) ও সমীকরণ (Concave Mirror & Equation + Lab)' },
      { id: 'top_ssc_physics_ch8_7', chapterId: 'chap_ssc_physics_ch8', orderIndex: 7, titleBangla: '৮.৭ রৈখিক বিবর্ধন (Linear Magnification)' },
      { id: 'top_ssc_physics_ch8_8', chapterId: 'chap_ssc_physics_ch8', orderIndex: 8, titleBangla: '৮.৮ সমতল, উত্তল ও অবতল দর্পণের ব্যবহার (Uses of Mirrors)' },
    ],
  },
  {
    id: 'chap_ssc_physics_ch9',
    subjectId: 'sub_ssc_physics',
    orderIndex: 9,
    titleBangla: 'নবম অধ্যায়: আলোর প্রতিসরণ (Refraction of Light)',
    topics: [
      { id: 'top_ssc_physics_ch9_1', chapterId: 'chap_ssc_physics_ch9', orderIndex: 1, titleBangla: '৯.১ আলোর প্রতিসরণ ও স্নেলের সূত্র (Refraction & Snell Lab)' },
      { id: 'top_ssc_physics_ch9_2', chapterId: 'chap_ssc_physics_ch9', orderIndex: 2, titleBangla: '৯.২ পূর্ণ অভ্যন্তরীণ প্রতিফলন ও সংকট কোণ (Total Internal Reflection)' },
      { id: 'top_ssc_physics_ch9_3', chapterId: 'chap_ssc_physics_ch9', orderIndex: 3, titleBangla: '৯.৩ লেন্স, রশ্মিচিত্র ও ক্ষমতা (Lenses & Ray Optics Lab)' },
      { id: 'top_ssc_physics_ch9_4', chapterId: 'chap_ssc_physics_ch9', orderIndex: 4, titleBangla: '৯.৪ চশমার প্রয়োগ ও গাণিতিক সমস্যা (Spectacles & Practice)' },
    ],
  },
  {
    id: 'chap_ssc_physics_ch10',
    subjectId: 'sub_ssc_physics',
    orderIndex: 10,
    titleBangla: 'দশম অধ্যায়: স্থির বিদ্যুৎ (Static Electricity)',
    topics: [
      { id: 'top_ssc_physics_ch10_1', chapterId: 'chap_ssc_physics_ch10', orderIndex: 1, titleBangla: '১০.১ আধান বা চার্জ (Electric Charge)' },
      { id: 'top_ssc_physics_ch10_2', chapterId: 'chap_ssc_physics_ch10', orderIndex: 2, titleBangla: '১০.২ ঘর্ষণে স্থির বিদ্যুৎ তৈরি (Static Electricity due to Friction)' },
      { id: 'top_ssc_physics_ch10_3', chapterId: 'chap_ssc_physics_ch10', orderIndex: 3, titleBangla: '১০.৩ বৈদ্যুতিক আবেশ ও ইলেকট্রোস্কোপ (Induction & Electroscope)' },
      { id: 'top_ssc_physics_ch10_4', chapterId: 'chap_ssc_physics_ch10', orderIndex: 4, titleBangla: '১০.৪ বৈদ্যুতিক বল ও কুলম্বের সূত্র (Coulomb Law Lab)' },
      { id: 'top_ssc_physics_ch10_5', chapterId: 'chap_ssc_physics_ch10', orderIndex: 5, titleBangla: '১০.৫ তড়িৎ ক্ষেত্র ও বলরেখা (Electric Field & Field Lines)' },
      { id: 'top_ssc_physics_ch10_6', chapterId: 'chap_ssc_physics_ch10', orderIndex: 6, titleBangla: '১০.৬ তড়িৎ বিভব ও বিভব পার্থক্য (Electric Potential & Difference)' },
      { id: 'top_ssc_physics_ch10_7', chapterId: 'chap_ssc_physics_ch10', orderIndex: 7, titleBangla: '১০.৭ ধারক ও সঞ্চিত শক্তি (Capacitor & Stored Energy Lab)' },
      { id: 'top_ssc_physics_ch10_8', chapterId: 'chap_ssc_physics_ch10', orderIndex: 8, titleBangla: '১০.৮ স্থির বিদ্যুতের ব্যবহার ও নিরাপত্তা (Uses of Static Electricity & Safety)' },
    ],
  },
  {
    id: 'chap_ssc_physics_ch11',
    subjectId: 'sub_ssc_physics',
    orderIndex: 11,
    titleBangla: 'একাদশ অধ্যায়: চল বিদ্যুৎ (Current Electricity)',
    topics: [
      { id: 'top_ssc_physics_ch11_1', chapterId: 'chap_ssc_physics_ch11', orderIndex: 1, titleBangla: '১১.১ তড়িৎ প্রবাহ, বিভব পার্থক্য ও তড়িৎচালক শক্তি (Current, Voltage & EMF)' },
      { id: 'top_ssc_physics_ch11_2', chapterId: 'chap_ssc_physics_ch11', orderIndex: 2, titleBangla: '১১.২ ওহমের সূত্র, রোধ, আপেক্ষিক রোধ ও বর্তনী (Ohm Law & Circuits Lab)' },
      { id: 'top_ssc_physics_ch11_3', chapterId: 'chap_ssc_physics_ch11', orderIndex: 3, titleBangla: '১১.৩ তড়িৎ ক্ষমতা, জুলের তাপ ও বিদ্যুৎ বিল (Electric Power & Billing Lab)' },
      { id: 'top_ssc_physics_ch11_4', chapterId: 'chap_ssc_physics_ch11', orderIndex: 4, titleBangla: '১১.৪ বিদ্যুৎ সরবরাহ, সিস্টেম লস ও লোডশেডিং (Power Supply & System Loss)' },
      { id: 'top_ssc_physics_ch11_5', chapterId: 'chap_ssc_physics_ch11', orderIndex: 5, titleBangla: '১১.৫ বিদ্যুতের নিরাপদ ব্যবহার: ফিউজ, সার্কিট ব্রেকার ও আর্থিং (Electrical Safety)' },
      { id: 'top_ssc_physics_ch11_6', chapterId: 'chap_ssc_physics_ch11', orderIndex: 6, titleBangla: '১১.৬ বাসাবাড়িতে তড়িৎ বর্তনীর নকশা (Household Wiring Design)' },
    ],
  },
  {
    id: 'chap_ssc_physics_ch12',
    subjectId: 'sub_ssc_physics',
    orderIndex: 12,
    titleBangla: 'দ্বাদশ অধ্যায়: বিদ্যুতের চৌম্বক ক্রিয়া (Magnetic Effects of Current)',
    topics: [
      { id: 'top_ssc_physics_ch12_1', chapterId: 'chap_ssc_physics_ch12', orderIndex: 1, titleBangla: '১২.১ চুম্বক, চৌম্বক ক্ষেত্র ও বলরেখা (Magnet, Field & Field Lines)' },
      { id: 'top_ssc_physics_ch12_2', chapterId: 'chap_ssc_physics_ch12', orderIndex: 2, titleBangla: '১২.২ বিদ্যুতের চৌম্বক ক্রিয়া, তড়িৎচুম্বক ও DC মোটর (Electromagnetism & DC Motor Lab)' },
      { id: 'top_ssc_physics_ch12_3', chapterId: 'chap_ssc_physics_ch12', orderIndex: 3, titleBangla: '১২.৩ তড়িৎচৌম্বকীয় আবেশ, জেনারেটর ও ট্রান্সফরমার (Induction, Generator & Transformer Lab)' },
    ],
  },
];

export interface ResolvedTopicHierarchy {
  topicId: string;
  topicTitle: string;
  chapterId: string;
  chapterTitle: string;
  subjectId: string;
}

export function findTopicHierarchy(topicId: string, customChapters: ChapterItem[] = DEFAULT_CHAPTERS): ResolvedTopicHierarchy {
  const chaptersToSearch = customChapters && customChapters.length > 0 ? customChapters : DEFAULT_CHAPTERS;

  for (const ch of chaptersToSearch) {
    const topic = ch.topics?.find((t) => t.id === topicId);
    if (topic) {
      return {
        topicId: topic.id,
        topicTitle: topic.titleBangla,
        chapterId: ch.id,
        chapterTitle: ch.titleBangla,
        subjectId: ch.subjectId || 'sub_ssc_physics',
      };
    }
  }

  // Fallback by heuristic naming
  if (topicId.includes('ch1') || topicId.includes('measurement') || topicId.includes('fusis')) {
    return {
      topicId,
      topicTitle: 'ভৌত রাশি ও পরিমাপ',
      chapterId: 'chap_ssc_physics_ch1',
      chapterTitle: 'প্রথম অধ্যায়: ভৌত রাশি ও পরিমাপ',
      subjectId: 'sub_ssc_physics',
    };
  }

  if (topicId.includes('ch3') || topicId.includes('force') || topicId.includes('inertia') || topicId.includes('friction') || topicId.includes('momentum') || topicId.includes('bol')) {
    return {
      topicId,
      topicTitle: 'বল (Force)',
      chapterId: 'chap_ssc_physics_ch3',
      chapterTitle: 'তৃতীয় অধ্যায়: বল (Force)',
      subjectId: 'sub_ssc_physics',
    };
  }

  if (topicId.includes('ch4') || topicId.includes('work') || topicId.includes('power') || topicId.includes('energy') || topicId.includes('kaj')) {
    return {
      topicId,
      topicTitle: 'কাজ, ক্ষমতা ও শক্তি',
      chapterId: 'chap_ssc_physics_ch4',
      chapterTitle: 'চতুর্থ অধ্যায়: কাজ, ক্ষমতা ও শক্তি',
      subjectId: 'sub_ssc_physics',
    };
  }

  if (topicId.includes('ch5') || topicId.includes('pressure') || topicId.includes('density') || topicId.includes('buoyancy') || topicId.includes('elasticity') || topicId.includes('plasma')) {
    return {
      topicId,
      topicTitle: 'পদার্থের অবস্থা ও চাপ',
      chapterId: 'chap_ssc_physics_ch5',
      chapterTitle: 'পঞ্চম অধ্যায়: পদার্থের অবস্থা ও চাপ',
      subjectId: 'sub_ssc_physics',
    };
  }

  if (topicId.includes('ch6') || topicId.includes('heat') || topicId.includes('temperature') || topicId.includes('tap') || topicId.includes('expansion') || topicId.includes('calorimetry')) {
    return {
      topicId,
      topicTitle: 'বস্তুর ওপর তাপের প্রভাব',
      chapterId: 'chap_ssc_physics_ch6',
      chapterTitle: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব',
      subjectId: 'sub_ssc_physics',
    };
  }

  if (topicId.includes('ch7') || topicId.includes('wave') || topicId.includes('sound') || topicId.includes('echo') || topicId.includes('shm') || topicId.includes('pendulum') || topicId.includes('taranga') || topicId.includes('shobdo')) {
    return {
      topicId,
      topicTitle: 'তরঙ্গ ও শব্দ (Waves and Sound)',
      chapterId: 'chap_ssc_physics_ch7',
      chapterTitle: 'সপ্তম অধ্যায়: তরঙ্গ ও শব্দ (Waves and Sound)',
      subjectId: 'sub_ssc_physics',
    };
  }
  if (topicId.includes('ch8') || topicId.includes('reflection') || topicId.includes('mirror') || topicId.includes('light') || topicId.includes('alo') || topicId.includes('dorpon')) {
    return {
      topicId,
      topicTitle: 'আলোর প্রতিফলন (Reflection of Light)',
      chapterId: 'chap_ssc_physics_ch8',
      chapterTitle: 'অষ্টম অধ্যায়: আলোর প্রতিফলন (Reflection of Light)',
      subjectId: 'sub_ssc_physics',
    };
  }
  if (topicId.includes('ch9') || topicId.includes('refract') || topicId.includes('snell') || topicId.includes('lens') || topicId.includes('tir') || topicId.includes('fiber') || topicId.includes('protishoron')) {
    return {
      topicId,
      topicTitle: 'আলোর প্রতিসরণ (Refraction of Light)',
      chapterId: 'chap_ssc_physics_ch9',
      chapterTitle: 'নবম অধ্যায়: আলোর প্রতিসরণ (Refraction of Light)',
      subjectId: 'sub_ssc_physics',
    };
  }
  if (topicId.includes('ch10') || topicId.includes('static') || topicId.includes('coulomb') || topicId.includes('capacitor') || topicId.includes('charge') || topicId.includes('electroscope') || topicId.includes('sthir')) {
    return {
      topicId,
      topicTitle: 'স্থির বিদ্যুৎ (Static Electricity)',
      chapterId: 'chap_ssc_physics_ch10',
      chapterTitle: 'দশম অধ্যায়: স্থির বিদ্যুৎ (Static Electricity)',
      subjectId: 'sub_ssc_physics',
    };
  }
  if (topicId.includes('ch11') || topicId.includes('current') || topicId.includes('ohm') || topicId.includes('circuit') || topicId.includes('resistor') || topicId.includes('fuse') || topicId.includes('kwh') || topicId.includes('chol')) {
    return {
      topicId,
      topicTitle: 'চল বিদ্যুৎ (Current Electricity)',
      chapterId: 'chap_ssc_physics_ch11',
      chapterTitle: 'একাদশ অধ্যায়: চল বিদ্যুৎ (Current Electricity)',
      subjectId: 'sub_ssc_physics',
    };
  }
  if (topicId.includes('ch12') || topicId.includes('magnet') || topicId.includes('solenoid') || topicId.includes('electromagnet') || topicId.includes('motor') || topicId.includes('generator') || topicId.includes('transformer') || topicId.includes('induction') || topicId.includes('chumbok')) {
    return {
      topicId,
      topicTitle: 'বিদ্যুতের চৌম্বক ক্রিয়া (Magnetic Effects of Current)',
      chapterId: 'chap_ssc_physics_ch12',
      chapterTitle: 'দ্বাদশ অধ্যায়: বিদ্যুতের চৌম্বক ক্রিয়া (Magnetic Effects of Current)',
      subjectId: 'sub_ssc_physics',
    };
  }

  return {
    topicId,
    topicTitle: 'গতি (Motion)',
    chapterId: 'chap_ssc_physics_ch2',
    chapterTitle: 'দ্বিতীয় অধ্যায়: গতি (Motion)',
    subjectId: 'sub_ssc_physics',
  };
}
