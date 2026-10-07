'use client';
import React, { useState } from 'react';

type QuizCategory = 'theatre' | 'bedside';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const quizData: Record<QuizCategory, Question[]> = {
  theatre: [
    {
      id: 1,
      question: "Which of the following describes the primary purpose of the surgical 'Time Out'?",
      options: [
        "Final verification of patient, site, and procedure before incision",
        "Routine handover between scrub nurse and circulating nurse",
        "Counting sponges and instruments after surgical closure",
        "Checking equipment functionality prior to patient arrival"
      ],
      correctIndex: 0,
      explanation: "Time Out is performed immediately before skin incision to verify patient identity, surgical site, and procedure."
    },
    {
      id: 2,
      question: "When performing a surgical sponge count, when must the counts be conducted?",
      options: [
        "Only at the end of the procedure",
        "Before skin incision, before cavity closure, and during skin closure",
        "Whenever requested by the surgeon at any random stage",
        "Exclusively during emergency surgical interventions"
      ],
      correctIndex: 1,
      explanation: "Sponge counts must be conducted prior to incision, before closing a cavity/layer, and at skin closure."
    }
  ],
  bedside: [
    {
      id: 1,
      question: "What is the standard frequency for patient position changes to prevent pressure injuries?",
      options: [
        "Every 2 hours",
        "Every 4 hours",
        "Once per shift",
        "Only when requested"
      ],
      correctIndex: 0,
      explanation: "Repositioning every 2 hours is recommended to relieve pressure and preserve skin integrity."
    },
    {
      id: 2,
      question: "Which vital sign should be checked immediately before administering Digoxin?",
      options: [
        "Apical pulse rate",
        "Blood pressure",
        "Respiratory rate",
        "Oxygen saturation"
      ],
      correctIndex: 0,
      explanation: "Apical pulse must be assessed for 1 full minute; withhold if pulse is below 60 bpm."
    }
  ]
};

export default function Home() {
  const [category, setCategory] = useState<QuizCategory>('theatre');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const currentQuiz = quizData[category][currentIndex];

  const handleSelect = (index: number) => {
    setSelectedOption(index);
  };

  const handleNext = () => {
    setSelectedOption(null);
    if (currentIndex < quizData[category].length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto', padding: '24px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <header style={{ borderBottom: '2px solid #0284c7', paddingBottom: '16px', marginBottom: '24px' }}>
        <h1 style={{ color: '#0284c7', margin: 0, fontSize: '24px' }}>Aussie Nurse App 🩺</h1>
        <p style={{ color: '#64748b', margin: '4px 0 0', fontSize: '14px' }}>Clinical Practice & Surgical Learning</p>
      </header>

      {/* Mode Selector */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <button
          onClick={() => { setCategory('theatre'); setCurrentIndex(0); setSelectedOption(null); }}
          style={{
            flex: 1,
            padding: '12px',
            borderRadius: '8px',
            border: 'none',
            fontWeight: 'bold',
            cursor: 'pointer',
            backgroundColor: category === 'theatre' ? '#0284c7' : '#e0f2fe',
            color: category === 'theatre' ? '#ffffff' : '#0369a1'
          }}
        >
          Theatre Quiz
        </button>
        <button
          onClick={() => { setCategory('bedside'); setCurrentIndex(0); setSelectedOption(null); }}
          style={{
            flex: 1,
            padding: '12px',
            borderRadius: '8px',
            border: 'none',
            fontWeight: 'bold',
            cursor: 'pointer',
            backgroundColor: category === 'bedside' ? '#0284c7' : '#e0f2fe',
            color: category === 'bedside' ? '#ffffff' : '#0369a1'
          }}
        >
          Bedside Quiz
        </button>
      </div>

      {/* Quiz Card */}
      <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#0284c7', textTransform: 'uppercase', marginBottom: '8px' }}>
          {category} • Question {currentIndex + 1} of {quizData[category].length}
        </div>
        <h2 style={{ fontSize: '18px', color: '#1e293b', marginTop: 0, marginBottom: '20px', lineHeight: '1.4' }}>
          {currentQuiz.question}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {currentQuiz.options.map((opt, idx) => {
            let bg = '#f8fafc';
            let border = '1px solid #cbd5e1';
            let color = '#334155';

            if (selectedOption !== null) {
              if (idx === currentQuiz.correctIndex) {
                bg = '#dcfce7';
                border = '1px solid #22c55e';
                color = '#15803d';
              } else if (idx === selectedOption) {
                bg = '#fee2e2';
                border = '1px solid #ef4444';
                color = '#b91c1c';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={selectedOption !== null}
                style={{
                  padding: '14px',
                  borderRadius: '8px',
                  border: border,
                  backgroundColor: bg,
                  color: color,
                  textAlign: 'left',
                  fontSize: '15px',
                  cursor: selectedOption === null ? 'pointer' : 'default',
                  transition: 'all 0.2s ease'
                }}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {selectedOption !== null && (
          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
            <p style={{ margin: '0 0 12px', fontSize: '14px', color: '#475569', lineHeight: '1.5' }}>
              <strong>Rationale:</strong> {currentQuiz.explanation}
            </p>
            <button
              onClick={handleNext}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#0284c7',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Next Question
            </button>
          </div>
        )}
      </div>
    </div>
  );
}