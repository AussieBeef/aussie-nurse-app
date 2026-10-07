'use client';
import React, { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('quiz');

  const quizzes = [
    { q: "「NPO」とはどういう意味？", options: ["絶飲食", "安静", "内服", "採血"], ans: 0 },
    { q: "「Prone position」とはどの体位？", options: ["仰臥位", "腹臥位", "側臥位", "截石位"], ans: 1 },
    { q: "「Sterile」とはどういう状態？", options: ["清潔・無菌", "不潔", "感染", "洗浄済"], ans: 0 },
  ];

  const checklists = [
    "手洗い・ガウンテクニックの確認",
    "術前手洗いの実施（タイムアウト確認）",
    "器械台（バックテーブル）のセッティング",
    "ガーゼ・器械のカウント（術前・閉腔前・閉頭/閉腹後）"
  ];

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <header style={{ borderBottom: '2px solid #0284c7', paddingBottom: '10px', marginBottom: '20px' }}>
        <h1 style={{ color: '#0284c7', fontSize: '22px', margin: 0 }}>aussie-nurse-app 🩺</h1>
        <p style={{ color: '#666', fontSize: '14px', margin: '5px 0 0' }}>臨床現場用・手術室看護学習ツール</p>
      </header>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button onClick={() => setActiveTab('quiz')} style={{ flex: 1, padding: '10px', background: activeTab === 'quiz' ? '#0284c7' : '#e0f2fe', color: activeTab === 'quiz' ? '#fff' : '#0369a1', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>臨床クイズ</button>
        <button onClick={() => setActiveTab('checklist')} style={{ flex: 1, padding: '10px', background: activeTab === 'checklist' ? '#0284c7' : '#e0f2fe', color: activeTab === 'checklist' ? '#fff' : '#0369a1', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>手洗い看護チェック</button>
      </div>

      {activeTab === 'quiz' ? (
        <div>
          <h3>手洗い・手術室の基礎クイズ</h3>
          {quizzes.map((item, idx) => (
            <div key={idx} style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px', marginBottom: '12px', border: '1px solid #e2e8f0' }}>
              <p style={{ fontWeight: 'bold', marginTop: 0 }}>Q{idx + 1}. {item.q}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {item.options.map((opt, i) => (
                  <button key={i} onClick={() => alert(i === item.ans ? '正解！⭕️' : '不正解…❌')} style={{ padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px', background: '#fff', cursor: 'pointer' }}>{opt}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h3>手術室（手洗い）チェックリスト</h3>
          {checklists.map((item, idx) => (
            <label key={idx} style={{ display: 'block', padding: '12px', background: '#f8fafc', borderRadius: '6px', marginBottom: '8px', cursor: 'pointer' }}>
              <input type="checkbox" style={{ marginRight: '10px' }} /> {item}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}