const fs = require('fs');
const path = require('path');
const vm = require('vm');

const SAMPLE_DIR = 'apps/api/prisma/sample-simulations';
const UPLOADS_DIR = 'apps/api/uploads/interactive';

const INTRO_CSS = `
    /* Standardized Pedagogical Boxes (Intro & Explainer) */
    .intro-box {
      background: #eff6ff !important;
      border-left: 4px solid #3b82f6 !important;
      padding: 12px 16px !important;
      border-radius: 0 12px 12px 0 !important;
      font-size: 0.84rem !important;
      color: #1e3a8a !important;
      line-height: 1.6 !important;
      margin-bottom: 14px !important;
    }
    .intro-box strong {
      color: #172554 !important;
    }
    .insight-box, .explainer-box {
      background: #f0fdfa !important;
      border-left: 4px solid #0d9488 !important;
      padding: 12px 16px !important;
      border-radius: 0 12px 12px 0 !important;
      font-size: 0.84rem !important;
      color: #134e4a !important;
      line-height: 1.6 !important;
      margin-top: 14px !important;
    }
    .insight-box strong, .explainer-box strong {
      color: #042f2e !important;
    }
`;

function ensureCss(html) {
  if (!html.includes('.intro-box')) {
    html = html.replace('</style>', INTRO_CSS + '\n  </style>');
  }
  return html;
}

// 1. lab-safety-hazard-symbols.html
function updateCh1(html) {
  html = ensureCss(html);
  const t1_intro = `    <!-- 1. Intro Section (Before Interactive) -->
    <div class="intro-box">
      <strong>📖 পরীক্ষার পরিচিতি ও মূল তত্ত্ব (পাঠ্যবই পৃষ্ঠা ৮-১০):</strong><br>
      ল্যাবরেটরিতে ব্যবহৃত রাসায়নিক পদার্থের বোতলের গায়ে আন্তর্জাতিকভাবে স্বীকৃত গ্লোবালি হারমোনাইজড সিস্টেম (GHS)-এর ৮টি বিপদজনক প্রতীক থাকে। নিচে ওয়ার্কবেঞ্চ থেকে বিভিন্ন রাসায়নিকের বোতল নির্বাচন করে তাদের ঝুঁকি, সতর্কতা ও নিরাপদ সংরক্ষণ পদ্ধতি অনুশীলন করো।
    </div>`;
  const t1_expl = `    <!-- 3. Explainer Section (After Interactive) -->
    <div class="insight-box" style="margin-top:12px;">
      <strong>🔬 ফলাফল বিশ্লেষণ ও বোর্ড পরীক্ষার ফাঁদ সতর্কতা (পৃষ্ঠা ১০-১২):</strong><br>
      • <b>GHS প্রতীকের কাঠামো:</b> লাল রম্বস ফ্রেমের ভেতর সাদা পটভূমিতে কালো প্রতীকটি রাসায়নিকের তাৎক্ষণিক ঝুঁকির ধরন নির্দেশ করে।<br>
      • <b>বিস্ফোরক বনাম দাহ্য:</b> টিএনটি বা জৈব পারক্সাইডে সামান্য আঘাত বা তাপে বিস্ফোরণ ঘটে, কিন্তু অ্যালকোহল বা ইথারের মতো দাহ্য পদার্থে সরাসরি অগ্নিশিখা না দিলে আগুন ধরে না।<br>
      • <b>পরিবেশের ক্ষতিকর প্রভাব:</b> ভারী ধাতু ($Pb, Hg, Cd$) সমৃদ্ধ বর্জ্য কখনো সাধারণ ড্রেনে ফেলা যায় না; এগুলো নির্দিষ্ট বর্জ্য পাত্রে সংরক্ষণ করতে হয়।
    </div>`;

  const t2_intro = `    <!-- 1. Intro Section (Before Interactive) -->
    <div class="intro-box">
      <strong>📖 পরীক্ষার পরিচিতি ও মূল তত্ত্ব (পাঠ্যবই পৃষ্ঠা ১৩-১৪):</strong><br>
      ল্যাবরেটরিতে অ্যাসিড বা ক্ষার মেঝেতে বা টেবিলে পড়ে গেলে তা তাৎক্ষণিক নিরাপদ উপায়ে প্রশমিত করতে হয়। ঘনীভূত অ্যাসিডে সরাসরি পানি ঢাললে মারাত্মক স্প্যাটারিং ঘটে। নিচে কাচের রিঅ্যাকশন জারে অ্যাসিড নিয়ে খাবার সোডা ($NaHCO_3$) দ্বারা নিরাপদ প্রশমন প্রক্রিয়া ও pH পরিবর্তন পর্যবেক্ষণ করো।
    </div>`;
  const t2_expl = `    <!-- 3. Explainer Section (After Interactive) -->
    <div class="insight-box" style="margin-top:12px;">
      <strong>🔬 ফলাফল বিশ্লেষণ ও অ্যাসিড প্রশমনের সমীকরণ:</strong><br>
      • <b>প্রশমন বিক্রিয়া:</b> $HCl(aq) + NaHCO_3(s) \\rightarrow NaCl(aq) + H_2O(l) + CO_2(g)\\uparrow$<br>
      • <b>বুদবুদ নির্গমন:</b> খাবার সোডা যোগ করার সাথে সাথে কার্বন ডাই-অক্সাইড গ্যাসের তীব্র বুদবুদ সৃষ্টি হয় এবং pH দ্রুত ১.০ থেকে ৭.০ (নিরপেক্ষ)-এ পৌঁছায়।<br>
      • <b>অ্যাসিডে পানি ঢালা কেন নিষিদ্ধ?</b> ঘনীভূত অ্যাসিডে পানি দিলে তীব্র তাপ উৎপন্ন হয় যা পানিকে মুহূর্তে বাষ্পীভূত করে অ্যাসিডের ফুটন্ত ফোঁটা বিস্ফোরক গতিতে ছিটকে দেয় ($Acid Spattering$)।
    </div>`;

  const t3_intro = `    <!-- 1. Intro Section (Before Interactive) -->
    <div class="intro-box">
      <strong>📖 পরীক্ষার পরিচিতি ও মূল তত্ত্ব (পাঠ্যবই পৃষ্ঠা ৭-৮):</strong><br>
      ল্যাবরেটরিতে যেকোনো ব্যবহারিক পরীক্ষা শুরুর পূর্বে ব্যক্তিগত নিরাপত্তা নিশ্চিত করতে ৪টি অপরিহার্য PPE সরঞ্জাম (অ্যাপ্রন, সেফটি গগলস, হ্যান্ড গ্লাভস, ফিউম হুড) পরিধান আবশ্যক। প্রতিটি সুরক্ষা সরঞ্জামের ভূমিকা নিচে অনুশীলন করে শতভাগ নিরাপত্তা প্রস্তুতি নিশ্চিত করো।
    </div>`;
  const t3_expl = `    <!-- 3. Explainer Section (After Interactive) -->
    <div class="insight-box" style="margin-top:12px;">
      <strong>🔬 ফলাফল বিশ্লেষণ ও ল্যাব নিরাপত্তা নির্দেশিকা:</strong><br>
      • <b>অ্যাপ্রন:</b> শতভাগ সুতি কাপড়ের সাদা অ্যাপ্রন ব্যবহার করতে হয়, যাতে রাসায়নিক লাগলে দ্রুত খুলে ফেলা যায় (সিনথেটিক কাপড় অ্যাসিডে গলে ত্বকে আটকে যায়)।<br>
      • <b>সেফটি গগলস:</b> কাচের সূক্ষ্ম টুকরা ও অ্যাসিডের ছিটে থেকে চোখকে সুরক্ষা দেয়।<br>
      • <b>ফিউম হুড:</b> বিষাক্ত বা শ্বাসকষ্ট সৃষ্টিকারী গ্যাস যেমন $Cl_2, SO_2, NO_2, NH_3$ উৎপন্ন হওয়ার পরীক্ষাগুলো কেবল ফিউম হুডের ভেতর সম্পন্ন করতে হয়।
    </div>`;

  if (html.includes('id="tab-workbench"') && !html.includes('📖 পরীক্ষার পরিচিতি')) {
    html = html.replace(/(<div id="tab-workbench" class="pane active">\s*)(\s*<div class="grid-workbench">)/, (m, p1, p2) => p1 + t1_intro + '\n' + p2);
    html = html.replace(/(<\/div>\s*<\/div>\s*<!-- TAB 2: REACTION JAR)/, (m, p1) => t1_expl + '\n  </div>\n\n  <!-- TAB 2: REACTION JAR');
  }

  if (html.includes('id="tab-spill"') && !html.includes(t2_intro)) {
    html = html.replace(/(<div id="tab-spill" class="pane">\s*)(\s*<div class="workbench-card")/, (m, p1, p2) => p1 + t2_intro + '\n' + p2);
    html = html.replace(/(<\/div>\s*<\/div>\s*<!-- TAB 3: PPE)/, (m, p1) => t2_expl + '\n  </div>\n\n  <!-- TAB 3: PPE');
  }

  if (html.includes('id="tab-ppe"') && !html.includes(t3_intro)) {
    html = html.replace(/(<div id="tab-ppe" class="pane">\s*)(\s*<div style="margin-bottom:16px;">)/, (m, p1, p2) => p1 + t3_intro + '\n' + p2);
    html = html.replace(/(<\/div>\s*<\/div>\s*<script>)/, (m, p1) => t3_expl + '\n  </div>\n</div>\n\n<script>');
  }
  return html;
}

// 3. bohr-atom-electron-config-lab.html
function updateCh3(html) {
  html = ensureCss(html);
  const t1_intro = `    <!-- 1. Intro Section (Before Interactive) -->
    <div class="intro-box">
      <strong>📖 পরীক্ষার পরিচিতি ও মূল তত্ত্ব (পাঠ্যবই পৃষ্ঠা ৪২-৫০):</strong><br>
      বোর পরমাণু মডেল অনুসারে ইলেকট্রনগুলো নিউক্লিয়াসকে কেন্দ্র করে নির্দিষ্ট বৃত্তাকার অনুমোদিত কক্ষপথে (প্রধান শক্তিস্তর K, L, M, N) ঘূর্ণায়মান থাকে, যেখানে তাদের কৌণিক ভরবেগ নির্দিষ্ট ($mvr = \\frac{nh}{2\\pi}$)। প্রতিটি প্রধান শক্তিস্তরে সর্বোচ্চ ইলেকট্রন ধারণক্ষমতা $2n^2$ এবং উপশক্তিস্তরে ($s, p, d, f$) ইলেকট্রন প্রবেশ করে আউফবাউ নীতি অনুযায়ী নিম্নশক্তিস্তর থেকে উচ্চশক্তিস্তরে। নিচে মৌল নির্বাচন করে কক্ষপথের লাইভ ইলেকট্রন ঘূর্ণন এবং উপশক্তিস্তর বিন্যাস পর্যবেক্ষণ করো।
    </div>`;
  const t1_expl = `    <!-- 3. Explainer Section (After Interactive) -->
    <div class="insight-box" style="margin-top:14px;">
      <strong>🔬 ফলাফল বিশ্লেষণ ও বোর্ড পরীক্ষার ফাঁদ সতর্কতা (পৃষ্ঠা ৪৬-৫০):</strong><br>
      • <b>পটাশিয়ামের ১৯তম ইলেকট্রন:</b> পটাশিয়ামের ($_{19}K$) ইলেকট্রন বিন্যাসে $4s$ অরবিটালের শক্তি ($n+l = 4+0 = 4$) $3d$ অরবিটালের শক্তি ($n+l = 3+2 = 5$) অপেক্ষা কম। তাই ১৯তম ইলেকট্রনটি $3d$-তে না গিয়ে আগে $4s$-এ প্রবেশ করে ($1s^2 2s^2 2p^6 3s^2 3p^6 4s^1$)।<br>
      • <b>ক্রোমিয়াম ও কপারের ব্যতিক্রম:</b> সমশক্তিসম্পন্ন অরবিটাল অর্ধপূর্ণ ($d^5$) বা সম্পূর্ণ পূর্ণ ($d^{10}$) থাকলে তা অধিক সুস্থিতি অর্জন করে। ফলে $_{24}Cr$-এর বিন্যাস $3d^4 4s^2$ না হয়ে $3d^5 4s^1$ এবং $_{29}Cu$-এর বিন্যাস $3d^9 4s^2$ না হয়ে $3d^{10} 4s^1$ হয়।
    </div>`;

  const t2_intro = `    <!-- 1. Intro Section (Before Interactive) -->
    <div class="intro-box">
      <strong>📖 পরীক্ষার পরিচিতি ও মূল তত্ত্ব (পাঠ্যবই পৃষ্ঠা ৫২-৫৩):</strong><br>
      বুনসেন বার্নারের অনুজ্জ্বল শিখায় ক্ষার ও ক্ষারীয় মৃত্তিকা ধাতুর লবণের পেস্ট প্রবেশ করালে শিখার তাপে বহিঃস্থ ইলেকট্রন উত্তেজিত হয়ে উচ্চ শক্তিস্তরে গমন করে। উত্তেজিত ইলেকট্রন যখন পুনরায় তার পূর্বের নিম্ন শক্তিস্তরে ফিরে আসে, তখন শোষিত শক্তি দৃশ্যমান আলোক তরঙ্গ হিসেবে নিঃসৃত হয় ($\\Delta E = h\\nu = \\frac{hc}{\\lambda}$)। ভিন্ন ভিন্ন ধাতুর শক্তিস্তরের ব্যবধান ভিন্ন হওয়ায় তারা স্বতন্ত্র বৈশিষ্ট্যপূর্ণ শিখা বর্ণ প্রদর্শন করে।
    </div>`;
  const t2_expl = `    <!-- 3. Explainer Section (After Interactive) -->
    <div class="insight-box" style="margin-top:14px;">
      <strong>🔬 ফলাফল বিশ্লেষণ ও ধাতব আয়ন সনাক্তকরণ চার্ট:</strong><br>
      • <b>সোডিয়াম ($Na^+$):</b> ৫৮৯ nm তরঙ্গদৈর্ঘ্যে সোনালী হলুদ শিখা প্রদর্শন করে।<br>
      • <b>পটাশিয়াম ($K^+$):</b> হালকা বেগুনি শিখা প্রদর্শন করে; খালি চোখে সোডিয়ামের উপস্থিতিতে কোবাল্ট নীল কাচের ভেতর দিয়ে হালকা লালচে-বেগুনি দেখা যায়।<br>
      • <b>ক্যালসিয়াম ($Ca^{2+}$) ও কপার ($Cu^{2+}$):</b> ক্যালসিয়াম ইটের মতো লাল (Brick Red) এবং কপার নীলাভ সবুজ শিখা সৃষ্টি করে।<br>
      • <b>লঘু HCl ব্যবহারের কারণ:</b> ধাতব ক্লোরাইড লবণগুলো অধিক উদ্বায়ী (volatile) হওয়ায় শিখায় সহজে বাষ্পীভূত হয়ে প্রদীপ্ত বর্ণ সৃষ্টি করে।
    </div>`;

  if (html.includes('id="atomView"') && !html.includes('📖 পরীক্ষার পরিচিতি')) {
    html = html.replace(/(<div id="atomView" class="atom-mode active-view">\s*)(\s*<div class="grid">)/, (m, p1, p2) => p1 + t1_intro + '\n' + p2);
    html = html.replace(/(<\/div>\s*<\/div>\s*<!-- TAB 2: FLAME TEST)/, (m, p1) => t1_expl + '\n  </div>\n\n  <!-- TAB 2: FLAME TEST');
  }

  if (html.includes('id="flameView"') && !html.includes(t2_intro)) {
    html = html.replace(/(<div id="flameView" class="flame-mode">\s*)(\s*<div class="grid">)/, (m, p1, p2) => p1 + t2_intro + '\n' + p2);
    html = html.replace(/(<\/div>\s*<\/div>\s*<script>)/, (m, p1) => t2_expl + '\n  </div>\n\n<script>');
  }
  return html;
}

// 4. periodic-trends-interactive-lab.html
function updateCh4(html) {
  html = ensureCss(html);
  const t1_intro = `    <!-- 1. Intro Section (Before Interactive) -->
    <div class="intro-box">
      <strong>📖 পরীক্ষার পরিচিতি ও মূল তত্ত্ব (পাঠ্যবই পৃষ্ঠা ৬০-৭০):</strong><br>
      মৌলসমূহের ভৌত ও রাসায়নিক ধর্মাবলি তাদের পারমাণবিক সংখ্যা বৃদ্ধির সাথে পর্যায়ক্রমে আবর্তিত হয় (আধুনিক পর্যায় সূত্র)। একই পর্যায়ে বাম থেকে ডানে গেলে পরমাণুর আকার হ্রাস পায় এবং একই গ্রুপে উপর থেকে নিচে গেলে নতুন শক্তিস্তর যুক্ত হওয়ায় আকার বৃদ্ধি পায়। নিচে পর্যায় সারণির মৌলগুলো ক্লিক করে তাদের বিভিন্ন পর্যায়বৃত্ত ধর্মের হিটম্যাপ ও পারমাণবিক মডেল পর্যবেক্ষণ করো।
    </div>`;
  const t1_expl = `    <!-- 3. Explainer Section (After Interactive) -->
    <div class="insight-box">
      <strong>🔬 ফলাফল বিশ্লেষণ ও পর্যায়বৃত্ত ধর্মের সাধারণ প্রবণতা:</strong><br>
      • <b>পারমাণবিক ব্যাসার্ধ:</b> পর্যায়ে বাম থেকে ডানে গেলে প্রোটন সংখ্যা ও কার্যকর নিউক্লিয়ার চার্জ বৃদ্ধি পাওয়ায় বহিঃস্থ স্তরের ইলেকট্রন অধিক আকর্ষিত হয়ে আকার ছোট হয়।<br>
      • <b>আয়নিকরণ শক্তি:</b> আকার ছোট হলে বহিঃস্থ স্তরের ইলেকট্রন অপসারণ করতে অধিক শক্তির প্রয়োজন হয়, ফলে পর্যায়ে বাম থেকে ডানে আয়নিকরণ শক্তি বাড়ে এবং গ্রুপে উপর থেকে নিচে কমে।<br>
      • <b>ব্যতিক্রম ($Be$ vs $B$ এবং $N$ vs $O$):</b> বেরিলিয়ামের ($1s^2 2s^2$) পূর্ণ $2s$ অরবিটাল এবং নাইট্রোজেনের ($1s^2 2s^2 2p^3$) অর্ধপূর্ণ $2p$ অরবিটাল অধিক সুস্থিত হওয়ায় এদের আয়নিকরণ শক্তি তাদের পরবর্তী মৌল অপেক্ষা বেশি।
    </div>`;

  if (html.includes('id="table-tab"') && !html.includes('📖 পরীক্ষার পরিচিতি')) {
    html = html.replace(/(<div id="table-tab" class="tab-content active">\s*)(\s*<div class="table-scroll-container">)/, (m, p1, p2) => p1 + t1_intro + '\n' + p2);
    html = html.replace(/(<\/div>\s*<!-- Graph View Tab -->)/, (m, p1) => t1_expl + '\n  </div>\n\n  <!-- Graph View Tab -->');
  }
  return html;
}

// 5. chemical-bonding-simulator-lab.html
function updateCh5(html) {
  html = ensureCss(html);
  const ionic_intro = `      <!-- 1. Intro Section (Before Interactive) -->
      <div class="intro-box">
        <strong>📖 পরীক্ষার পরিচিতি ও মূল তত্ত্ব (পাঠ্যবই পৃষ্ঠা ৮৬-৯০):</strong><br>
        ধাতু ও অধাতুর পরমাণুর মধ্যে ইলেকট্রন আদান-প্রদানের মাধ্যমে ধনাত্মক ক্যাটায়ন ও ঋণাত্মক অ্যানায়ন সৃষ্টির পর তাদের মধ্যকার তীব্র স্থির বৈদ্যুতিক আকর্ষণ বল দ্বারা আয়নিক বন্ধন গঠিত হয়। নিচে সোডিয়াম ($Na$) থেকে ক্লোরিনে ($Cl$) ইলেকট্রন স্থানান্তর স্লাইডার টেনে আয়ন সৃষ্টি ও বন্ধন গঠন প্রত্যক্ষ করো।
      </div>`;
  const ionic_expl = `      <!-- 3. Explainer Section (After Interactive) -->
      <div class="insight-box">
        <strong>🔬 ফলাফল বিশ্লেষণ ও আয়নিক বন্ধনের বৈশিষ্ট্য:</strong><br>
        • <b>ইলেকট্রন স্থানান্তর:</b> $Na(2, 8, 1) \\rightarrow Na^+(2, 8) + e^-$ এবং $Cl(2, 8, 7) + e^- \\rightarrow Cl^-(2, 8, 8)$। উভয়েই নিকটস্থ নিষ্ক্রিয় গ্যাসের স্থিতিশীল অষ্টক বিন্যাস লাভ করে।<br>
        • <b>স্ফটিক জালিকা:</b> প্রতিটি $Na^+$ ছয়টি $Cl^-$ দ্বারা এবং প্রতিটি $Cl^-$ ছয়টি $Na^+$ দ্বারা পরিবেষ্টিত হয়ে একটি শক্তিশালী ত্রিমাত্রিক কেলাস জালিকা তৈরি করে, যার কারণে আয়নিক যৌগের গলনাঙ্ক অত্যন্ত উচ্চ ($NaCl$-এর গলনাঙ্ক ৮০১°C)।
      </div>`;

  if (html.includes('id="panel-ionic"') && !html.includes('📖 পরীক্ষার পরিচিতি')) {
    html = html.replace(/(<div id="panel-ionic" class="sim-panel active">\s*)(\s*<div class="two-col">)/, (m, p1, p2) => p1 + ionic_intro + '\n' + p2);
    html = html.replace(/(<\/div>\s*<!-- ==========================================\s*-->\s*<!-- MODULE 2: COVALENT)/, (m, p1) => ionic_expl + '\n    </div>\n\n    <!-- ==========================================\n    <!-- MODULE 2: COVALENT');
  }
  return html;
}

// 6. mole-solution-preparation-lab.html
function updateCh6(html) {
  html = ensureCss(html);
  const flask_intro = `    <!-- 1. Intro Section (Before Interactive) -->
    <div class="intro-box">
      <strong>📖 পরীক্ষার পরিচিতি ও মূল তত্ত্ব (পাঠ্যবই পৃষ্ঠা ১১২-১১৭):</strong><br>
      নির্দিষ্ট তাপমাত্রায় ১ লিটার (১০০০ mL) দ্রবণে দ্রবীভূত দ্রবের মোল সংখ্যাকে ঐ দ্রবণের মোলারিটি ($S$) বলে। $V\\text{ mL}$ আয়তনের মোলার দ্রবণ তৈরি করতে প্রয়োজনীয় দ্রবের ভর $W = \\frac{SMV}{1000}$ গ্রাম। নিচে মেজারিং ফ্লাস্কে দ্রব ও পানি যোগ করে কাঙ্ক্ষিত মোলার দ্রবণ প্রস্তুত করো।
    </div>`;
  const flask_expl = `    <!-- 3. Explainer Section (After Interactive) -->
    <div class="insight-box">
      <strong>🔬 ফলাফল বিশ্লেষণ ও মোলারিটি গণনার নিয়মাবলি:</strong><br>
      • <b>প্রমাণ দ্রবণ:</b> যে দ্রবণের ঘনমাত্রা সঠিকভাবে জানা থাকে তাকে প্রমাণ দ্রবণ বলে (যেমন: $0.1\\text{ M } Na_2CO_3$ দ্রবণ)।<br>
      • <b>সেমিমোলার ও ডেসিমোলার:</b> ঘনমাত্রা $0.5\\text{ M}$ হলে সেমিমোলার, $0.1\\text{ M}$ হলে ডেসিমোলার এবং $0.01\\text{ M}$ হলে সেন্টিমোলার দ্রবণ বলা হয়।
    </div>`;

  if (html.includes('id="tab-flask"') && !html.includes('📖 পরীক্ষার পরিচিতি')) {
    html = html.replace(/(<div id="tab-flask" class="tab-content active">\s*)(\s*<div class="two-col">)/, (m, p1, p2) => p1 + flask_intro + '\n' + p2);
    html = html.replace(/(<\/div>\s*<!-- TAB 2: DILUTION)/, (m, p1) => flask_expl + '\n  </div>\n\n  <!-- TAB 2: DILUTION');
  }
  return html;
}

// 7. chemical-reactions-redox-lab.html
function updateCh7(html) {
  html = ensureCss(html);
  const intro = `    <!-- 1. Intro Section (Before Interactive) -->
    <div class="intro-box" id="modeIntroBox">
      <strong>📖 পরীক্ষার পরিচিতি ও মূল তত্ত্ব (পাঠ্যবই পৃষ্ঠা ১৪০-১৫০):</strong><br>
      রাসায়নিক বিক্রিয়ায় পরমাণুর ইলেকট্রন পুনর্বিন্যাস এবং বন্ধন ভাঙা ও গড়ার মাধ্যমে নতুন ধর্মবিশিষ্ট পদার্থ উৎপন্ন হয়। নিচে ৪টি ভিন্ন প্রকৃতির বিক্রিয়া (অধঃক্ষেপণ, প্রতিস্থাপন, তাপউৎপাদী ও রেডক্স ইলেকট্রন স্থানান্তর) নির্বাচন করে পর্যবেক্ষণ করো।
    </div>`;
  const expl = `    <!-- 3. Explainer Section (After Interactive) -->
    <div class="insight-box" id="modeExplainerBox">
      <strong>🔬 ফলাফল বিশ্লেষণ ও গভীর বৈজ্ঞানিক ব্যাখ্যা:</strong><br>
      • <b>জারণ-বিজারণ যুগপৎ ঘটে:</b> জারণ বিক্রিয়ায় ইলেকট্রন বর্জিত হয় এবং বিজারণ বিক্রিয়ায় ইলেকট্রন গৃহীত হয়। একই বিক্রিয়ায় একটি পদার্থ ইলেকট্রন ত্যাগ করলে অপর পদার্থ তা গ্রহণ করে।<br>
      • <b>তাপমাত্রার পরিবর্তন:</b> তাপউৎপাদী বিক্রিয়ায় উৎপাদের বন্ধন গঠনকালে নির্গত শক্তি বিক্রিয়কের বন্ধন ভাঙার শক্তি অপেক্ষা বেশি হওয়ায় পরিবেশ উত্তপ্ত হয় ($\\Delta H$ ঋণাত্মক)।
    </div>`;

  if (html.includes('class="lab-layout"') && !html.includes('📖 পরীক্ষার পরিচিতি')) {
    html = html.replace(/(\s*<div class="lab-layout">)/, '\n' + intro + '\n$1');
    html = html.replace(/(<\/div>\s*<\/div>\s*<script>)/, expl + '\n  </div>\n</div>\n\n<script>');
  }
  return html;
}

// 8. electrochemical-galvanic-cell-lab.html
function updateCh8(html) {
  html = ensureCss(html);
  const intro = `  <!-- 1. Intro Section (Before Interactive) -->
  <div class="intro-box" id="cellIntroBox">
    <strong>📖 পরীক্ষার পরিচিতি ও মূল তত্ত্ব (পাঠ্যবই পৃষ্ঠা ১৭০-১৮২):</strong><br>
    ড্যানিয়েল কোষে জিংক ($Zn$) অ্যানোড ও কপার ($Cu$) ক্যাথোড হিসেবে কাজ করে। অধিক সক্রিয় জিংক ইলেকট্রন ত্যাগ করে জারিত হয় এবং বহিঃস্থ তার দিয়ে ইলেকট্রন কপার ক্যাথোডে প্রবাহিত হয়ে বিদ্যুৎ উৎপন্ন করে। সল্ট ব্রিজ ($KCl$) আয়ন বিনিময়ের মাধ্যমে উভয় দ্রবণের তড়িৎ নিরপেক্ষতা বজায় রাখে।
  </div>`;
  const expl = `  <!-- 3. Explainer Section (After Interactive) -->
  <div class="insight-box" id="cellExplainerBox">
    <strong>🔬 ফলাফল বিশ্লেষণ ও কোষ বিক্রিয়া:</strong><br>
    • <b>অ্যানোড জারণ:</b> $Zn(s) \\rightarrow Zn^{2+}(aq) + 2e^-$ (জিংক দণ্ড ক্ষয়প্রাপ্ত হয়)<br>
    • <b>ক্যাথোড বিজারণ:</b> $Cu^{2+}(aq) + 2e^- \\rightarrow Cu(s)$ (কপার দণ্ডে তামা জমা হয়)<br>
    • <b>কোষ বিভব:</b> $E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}} = +0.34\\text{ V} - (-0.76\\text{ V}) = +1.10\\text{ V}$<br>
    • <b>সল্ট ব্রিজের ভূমিকা:</b> $K^+$ ও $Cl^-$ আয়ন যথাক্রমে ক্যাথোড ও অ্যানোড পাত্রে গিয়ে চার্জের ভারসাম্য রক্ষা করে; সল্ট ব্রিজ সরিয়ে নিলে তড়িৎ প্রবাহ বন্ধ হয়ে যায়।
  </div>`;

  if (html.includes('class="canvas-wrap"') && !html.includes('📖 পরীক্ষার পরিচিতি')) {
    html = html.replace(/(\s*<!-- Interactive SVG Visualizer -->\s*<div class="canvas-wrap">)/, '\n' + intro + '\n$1');
    html = html.replace(/(<\/div>\s*<!-- Controls Card -->)/, '</div>\n' + expl + '\n\n  <!-- Controls Card -->');
  }
  return html;
}

// 9. acid-base-titration-ph-lab.html
function updateCh9(html) {
  html = ensureCss(html);
  const intro = `  <!-- 1. Intro Section (Before Interactive) -->
  <div class="intro-box">
    <strong>📖 পরীক্ষার পরিচিতি ও মূল তত্ত্ব (পাঠ্যবই পৃষ্ঠা ২০৪-২১০):</strong><br>
    টাইট্রেশন হলো একটি পরীক্ষণমূলক পদ্ধতি যার সাহায্যে উপযুক্ত নির্দেশক ব্যবহার করে একটি প্রমাণ দ্রবণের (যেমন: জানা ঘনমাত্রার $NaOH$) নির্দিষ্ট আয়তনের সাথে বিক্রিয়া ঘটিয়ে অপর একটি অজানা দ্রবণের ($HCl$) ঘনমাত্রা নির্ণয় করা হয়। প্রশমন বিন্দুতে অ্যাসিড ও ক্ষারের হাইড্রোজেন ও হাইড্রোক্সাইড আয়ন সম্পূর্ণ বিক্রিয়া করে পানি উৎপন্ন করে ($H^+ + OH^- \\rightarrow H_2O$) এবং pH দ্রুত পরিবর্তিত হয়।
  </div>`;
  const expl = `  <!-- 3. Explainer Section (After Interactive) -->
  <div class="insight-box" style="margin-top:16px;">
    <strong>🔬 ফলাফল বিশ্লেষণ ও টাইট্রেশন গণনা সূত্র:</strong><br>
    • <b>প্রশমন সমীকরণ:</b> $V_A \\times S_A \\times e_A = V_B \\times S_B \\times e_B$ (যেখানে $V$ আয়তন, $S$ মোলার ঘনমাত্রা এবং $e$ তুল্য সংখ্যা)।<br>
    • <b>নির্দেশকের ভূমিকা:</b> ফেনলফথ্যালিন অ্যাসিড দ্রবণে বর্ণহীন থাকে, কিন্তু প্রশমন বিন্দুর সামান্য পরেই ক্ষারের আধিক্যে স্থায়ী হালকা গোলাপি বর্ণ ধারণ করে ($pH = 8.2 - 10.0$)।<br>
    • <b>pH স্কেল:</b> $pH = -\\log[H^+]$। নিরপেক্ষ দ্রবণের $pH = 7$, অ্যাসিড দ্রবণের $pH < 7$ এবং ক্ষারীয় দ্রবণের $pH > 7$।
  </div>`;

  if (html.includes('class="lab-container"') && !html.includes('📖 পরীক্ষার পরিচিতি')) {
    html = html.replace(/(\s*<div class="lab-container">)/, '\n' + intro + '\n$1');
    html = html.replace(/(<\/div>\s*<script>)/, expl + '\n</div>\n\n<script>');
  }
  return html;
}

// 10. metal-reactivity-corrosion-lab.html
function updateCh10(html) {
  html = ensureCss(html);
  const t1_intro = `    <!-- 1. Intro Section (Before Interactive) -->
    <div class="intro-box">
      <strong>📖 পরীক্ষার পরিচিতি ও মূল তত্ত্ব (পাঠ্যবই পৃষ্ঠা ২২২-২২৭):</strong><br>
      ধাতুগুলোর ইলেকট্রন ত্যাগের প্রবণতার ওপর ভিত্তি করে সাজানো তালিকাকে সক্রিয়তা সিরিজ বলে ($K > Na > Ca > Mg > Al > Zn > Fe > Pb > [H] > Cu > Ag > Au$)। হাইড্রোজেন অপেক্ষা উপরে অবস্থিত ধাতুগুলো লঘু অ্যাসিড থেকে হাইড্রোজেন গ্যাস প্রতিস্থাপিত করতে পারে। নিচে টেস্টটিউবে বিভিন্ন ধাতু যোগ করে বিক্রিয়ার তীব্রতা পর্যবেক্ষণ করো।
    </div>`;
  const t1_expl = `    <!-- 3. Explainer Section (After Interactive) -->
    <div class="insight-box">
      <strong>🔬 সক্রিয়তা সিরিজ বিশ্লেষণ ও সমীকরণ:</strong><br>
      পটাশিয়াম ও সোডিয়াম ঠান্ডা পানির সাথেও তীব্র বিক্রিয়া করে, জিংক ও আয়রন লঘু অ্যাসিডের সাথে বিক্রিয়া করে $H_2$ গ্যাস মুক্ত করে ($Zn + 2HCl \\rightarrow ZnCl_2 + H_2\\uparrow$), কিন্তু কপার ও সোনা হাইড্রোজেন অপেক্ষা নিচে থাকায় অ্যাসিডের সাথে কোনো বিক্রিয়া করে না।
    </div>`;

  if (html.includes('id="tab-reactivity"') && !html.includes('📖 পরীক্ষার পরিচিতি')) {
    html = html.replace(/(<div id="tab-reactivity" class="tab-content active">\s*)(\s*<div class="stage-container">)/, (m, p1, p2) => p1 + t1_intro + '\n' + p2);
    html = html.replace(/(<\/div>\s*<!-- Tab 2: Rusting Chamber -->)/, (m, p1) => t1_expl + '\n  </div>\n\n  <!-- Tab 2: Rusting Chamber -->');
  }
  return html;
}

// 11. hydrocarbon-functional-groups-lab.html
function updateCh11(html) {
  html = ensureCss(html);
  const br2_intro = `    <!-- 1. Intro Section (Before Interactive) -->
    <div class="intro-box">
      <strong>📖 পরীক্ষার পরিচিতি ও মূল তত্ত্ব (পাঠ্যবই পৃষ্ঠা ২৬০-২৬৩):</strong><br>
      অসম্পৃক্ত হাইড্রোকার্বনে (অ্যালকিন ও অ্যালকাইন) কার্বন-কার্বন দুর্বল পাই ($\\pi$) বন্ধন উপস্থিত থাকে। লাল বর্ণের ব্রমিন দ্রবণের ($Br_2/CCl_4$) সাথে বিক্রিয়ায় এই পাই বন্ধন ভেঙে গিয়ে বর্ণহীন ডাইব্রোমো বা টেট্রাব্রোমো যৌগ তৈরি হয়। সম্পৃক্ত অ্যালকেন এই পরীক্ষা দেয় না।
    </div>`;
  const br2_expl = `    <!-- 3. Explainer Section (After Interactive) -->
    <div class="insight-box" style="margin-top:14px;">
      <strong>🔬 ব্রমিন পানি পরীক্ষার সমীকরণ ও বিশ্লেষণ:</strong><br>
      $CH_2=CH_2 + Br_2 (\\text{লাল}) \\rightarrow CH_2Br-CH_2Br (\\text{বর্ণহীন ১,২-ডাইব্রোমোইথেন})$। এই পরীক্ষার মাধ্যমে সম্পৃক্ত ও অসম্পৃক্ত হাইড্রোকার্বনের পার্থক্য নিশ্চিত করা হয়।
    </div>`;

  if (html.includes('id="br2-test"') && !html.includes('📖 পরীক্ষার পরিচিতি')) {
    html = html.replace(/(<div id="br2-test" class="tab-content active">\s*)(\s*<div class="reagent-grid">)/, (m, p1, p2) => p1 + br2_intro + '\n' + p2);
    html = html.replace(/(<\/div>\s*<!-- TAB 2: BAEYER TEST)/, (m, p1) => br2_expl + '\n  </div>\n\n  <!-- TAB 2: BAEYER TEST');
  }
  return html;
}

// 12. chemistry-in-daily-life-lab.html
function updateCh12(html) {
  html = ensureCss(html);
  const intro = `  <!-- 1. Intro Section (Before Interactive) -->
  <div class="intro-box" id="dailyIntroBox">
    <strong>📖 পরীক্ষার পরিচিতি ও মূল তত্ত্ব (পাঠ্যবই পৃষ্ঠা ২৮০-২৯০):</strong><br>
    গৃহস্থালিতে ব্যবহৃত বিভিন্ন রাসায়নিক যেমন সাবান, ডিটারজেন্ট, ভিনেগার ও বেকিং সোডার কার্যপ্রণালী রসায়নের সরাসরি প্রয়োগ। নিচে ৩টি প্রধান বাস্তবমুখী পরীক্ষা নির্বাচন করে রাসায়নিক বিক্রিয়া ও পরিষ্কারক কৌশল প্রত্যক্ষ করো।
  </div>`;
  const expl = `  <!-- 3. Explainer Section (After Interactive) -->
  <div class="insight-box" id="dailyExplainerBox" style="margin-top:16px;">
    <strong>🔬 ফলাফল বিশ্লেষণ ও গভীর বৈজ্ঞানিক ব্যাখ্যা:</strong><br>
    • <b>স্যাপোনিফিকেশন বিক্রিয়া:</b> চর্বি বা তেল + ক্ষার ($NaOH/KOH$) $\\rightarrow$ সাবান + গ্লিসারিন ($C_3H_5(OH)_3$)। দ্রবণে $NaCl$ (লবণ) যোগ করলে সাবানের দ্রাব্যতা কমে তা ভাসমান কেক আকারে পৃথক হয়ে যায় (Salting Out)।<br>
    • <b>মাইসেল গঠন:</b> সাবানের হাইড্রোকার্বন লেজ তৈল বা গ্রিজের সাথে এবং আয়নিত শীর্ষ পানির সাথে যুক্ত হয়ে গোলাকার মাইসেল গঠন করে কাপড় পরিষ্কার করে।
  </div>`;

  if (html.includes('class="main-grid"') && !html.includes('📖 পরীক্ষার পরিচিতি')) {
    html = html.replace(/(\s*<div class="main-grid">)/, '\n' + intro + '\n$1');
    html = html.replace(/(<\/div>\s*<script>)/, expl + '\n</div>\n\n<script>');
  }
  return html;
}

const UPDATERS = {
  'lab-safety-hazard-symbols.html': updateCh1,
  'bohr-atom-electron-config-lab.html': updateCh3,
  'periodic-trends-interactive-lab.html': updateCh4,
  'chemical-bonding-simulator-lab.html': updateCh5,
  'mole-solution-preparation-lab.html': updateCh6,
  'chemical-reactions-redox-lab.html': updateCh7,
  'electrochemical-galvanic-cell-lab.html': updateCh8,
  'acid-base-titration-ph-lab.html': updateCh9,
  'metal-reactivity-corrosion-lab.html': updateCh10,
  'hydrocarbon-functional-groups-lab.html': updateCh11,
  'chemistry-in-daily-life-lab.html': updateCh12,
};

for (const [fname, fn] of Object.entries(UPDATERS)) {
  const p = path.join(SAMPLE_DIR, fname);
  if (fs.existsSync(p)) {
    const content = fs.readFileSync(p, 'utf8');
    const newContent = fn(content);
    fs.writeFileSync(p, newContent, 'utf8');
    console.log('✅ Processed:', fname);
  }
}
console.log('Finished updating sample-simulations.');
