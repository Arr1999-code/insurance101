import React, { useState } from 'react';

const originalQuizData = [
  // ... your questions (unchanged)
  {
    question: "A policyowner suffers an injury that renders him incapable of performing one or more important job duties. Any decrease in income resulting from this injury would make him eligible for benefits under which provision?",
    options: [
      "A. Partial disability",
      "B. Non Disabling injury",
      "C. Presumptive disability",
      "D. Flat amount disability"
    ],
    answer: "A. Partial disability"
  },
  {
    question: "Medicaid is a government-funded program designed to provide health care to",
    options: [
      "A. all individuals over the age of 65..",
      "B. All individuals who carry Medicare supplemental insurance.",
      "C. Anyone who does not have a proper caregiver.",
      "D. Low income state resident."
    ],
    answer: "D. Low income state resident."
  },
  {
    question: "Group Disability Income Insurance usually involves",
    options: [
      "A. Higher premiums than individual disability policies.",
      "B. Providing benefits for nonoccupational illnesses and injuries.",
      "C. A requirement that all employees participate",
      "D. Workers who are individually uninsurable because of their high-risk occupations"
    ],
    answer: "B. Providing benefits for nonoccupational illnesses and injuries."
  },
  {
    question: "Utilization review includes all of the following EXCEPT",
    options: [
      "A. Projected date for release of the patient",
      "B. Continues analysis of accident-prone individuals",
      "C. Cost-effective ways of handling patients with catastrophic illnesses.",
      "D. Intermittent analysis of the reasons for the patient to remain in the healthcare facility"
    ],
    answer: "A. Projected date for release of the patient"
  },
  {
    question: "Which of the following types of long-term care benefits would be best suited for a senior citizen who needs supervision, social, and recreational services?",
    options: [
      "A. Respite care",
      "B. Adult Day care",
      "C. Home health care",
      "D. Nursing home care"
    ],
    answer: "B. Adult Day care"
  },
  {
    question: "If agent Sue completes an application for an insurance policy on behalf of Phil, and the company agrees to insure him, which party made the offer?",
    options: [
      "A. Sue, when she made the initial appointment",
      "B. Phil, when he completed the application",
      "C. The company, when it issued the policy",
      "D. Phil, when he received the policy"
    ],
    answer: "C. The company, when it issued the policy"
  },
  {
    question: "When a buyer is considering a long-term care policy, they are encouraged to review carefully all policy",
    options: [
      "A. Limitations.",
      "B. Facilities.",
      "C. Carriers.",
      "D. Agents."
    ],
    answer: "A. Limitations."
  },
  {
    question: "According to the Fair Credit Reporting Act, an insurer does NOT need to",
    options: [
      "Inform the applicant that an investigation is being conducted",
      "Discuss any credit history inconsistencies with the application",
      "Inform the applicant about the scope of an investigation",
      "Notify the applicant if an application is denied"
    ],
    answer: "Discuss any credit history inconsistencies with the application"
  },
  {
    question: "Which of the following is NOT considered advertising?",
    options: [
      "A policy illustration",
      "An AM Best company rating",
      "A direct mailing by an insurer",
      "An agent’s oral sales presentation"
    ],
    answer: "An AM Best company rating"
  },
  {
    question: "How many days after an accident and health policy has been reinstated is there coverage for sickness?",
    options: [
      "1 day",
      "3 days",
      "5 days",
      "10 days"
    ],
    answer: "10 days"
  },
  {
    question: "A Key Person Disability Income Policy pays benefits to the",
    options: [
      "Spouse",
      "Dependent",
      "Employee",
      "Employer"
    ],
    answer: "Employer"
  },
  {
    question: "A 65-year-old employee who works for an employer with 24 employees is disabled on the job. The employee has fully recovered and returned to work. Which health insurance coverage is primary?",
    options: [
      "Medicaid",
      "An individual's plan",
      "Workers’ compensation",
      "His employer’s group plan"
    ],
    answer: "Workers’ compensation"
  },
];

const quizData = [...originalQuizData].sort(() => Math.random() - 0.5);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  const handleLogin = () => {
    if (passwordInput === 'wut123') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleSelect = (option) => {
    if (userAnswers[currentQuestion] !== undefined || !quizData[currentQuestion]) return;

    const correctKey = quizData[currentQuestion].correct || quizData[currentQuestion].answer;
    const isCorrect = option === correctKey;
    setUserAnswers((prev) => ({ ...prev, [currentQuestion]: option }));
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowSummary(true);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="login-screen">
        <h2>Enter Password to Access Quiz</h2>
        <input
          type="password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          placeholder="Enter password"
        />
        <button onClick={handleLogin}>Enter</button>
      </div>
    );
  }

  const currentQ = quizData[currentQuestion];
  if (!currentQ) {
    return <p className="text-center text-red-600">Error: Question not found.</p>;
  }

  const selectedAnswer = userAnswers[currentQuestion];
  const correctAnswer = currentQ.correct || currentQ.answer;
  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Insurance Exam Quiz</h1>

      {showSummary ? (
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-2">Quiz Complete!</h2>
          <p className="mb-2">You got {score} out of {quizData.length} correct.</p>
          <p className="text-lg font-bold">Score: {Math.round((score / quizData.length) * 100)}%</p>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow-md mb-4">
          <p className="font-semibold mb-4">{currentQ.question}</p>
          <div className="flex flex-col gap-4">
            {currentQ.options.map((option, i) => (
              <button
                key={i}
                onClick={() => handleSelect(option)}
                disabled={selectedAnswer !== undefined}
                className={`w-full text-left px-4 py-2 rounded border flex items-start gap-2 ${
                  selectedAnswer === option
                    ? option === correctAnswer
                      ? "bg-green-100 border-green-500"
                      : "bg-red-100 border-red-500"
                    : "bg-white hover:bg-gray-100 border-gray-300"
                }`}
              >
                <span className="font-bold">{optionLabels[i]}.</span>
                <span className="flex-1">
                  {selectedAnswer !== undefined && correctAnswer === option && (
                    <span className="text-green-500 mr-2">✅</span>
                  )}
                  {selectedAnswer !== undefined && selectedAnswer === option && selectedAnswer !== correctAnswer && (
                    <span className="text-red-500 mr-2">❌</span>
                  )}
                  {option}
                </span>
              </button>
            ))}
          </div>

          {selectedAnswer && selectedAnswer === correctAnswer && (
            <p className="mt-4 font-medium text-green-600">Correct!</p>
          )}
          {selectedAnswer && selectedAnswer !== correctAnswer && (
            <>
              <p className="mt-4 font-medium text-red-600">Incorrect.</p>
              <p className="mt-2 text-green-600 font-medium">Correct answer: {correctAnswer}</p>
            </>
          )}
        </div>
      )}

      {!showSummary && (
        <div className="flex justify-between mt-4">
          <button
            onClick={handleBack}
            disabled={currentQuestion === 0}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Back
          </button>

          {selectedAnswer && (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleNext}
            >
              {currentQuestion < quizData.length - 1 ? "Next Question" : "Finish Quiz"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
