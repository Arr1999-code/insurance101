import React, { useState } from 'react';

const originalQuizData = [
  {
    question: "If agent Sue completes an application for an insurance policy on behalf of Phil, and the company agrees to insure him, which party made the offer?",
    options: [
      "Sue, when she made the initial appointment",
      "Phil, when he completed the application",
      "The company, when it issued the policy",
      "Phil, when he received the policy"
    ],
    correct: "The company, when it issued the policy"
  },
  {
    question: "A policyowner suffers an injury that renders him incapable of performing one or more important job duties. Any decrease in income resulting from this injury would make him eligible for benefits under which provision?",
    options: [
      "Partial disability",
      "Non Disabling injury",
      "Presumptive disability",
      "Flat amount disability"
    ],
    correct: "Partial disability"
  },
  {
    question: "Medicaid is a government-funded program designed to provide health care to",
    options: [
      "all individuals over the age of 65.",
      "All individuals who carry Medicare supplemental insurance.",
      "Anyone who does not have a proper caregiver.",
      "Low income state resident."
    ],
    correct: "Low income state resident."
  },
  {
    question: "Group Disability Income Insurance usually involves",
    options: [
      "Higher premiums than individual disability policies.",
      "Providing benefits for nonoccupational illnesses and injuries.",
      "A requirement that all employees participate",
      "Workers who are individually uninsurable because of their high-risk occupations"
    ],
    correct: "Providing benefits for nonoccupational illnesses and injuries."
  },
  {
    question: "Utilization review includes all of the following EXCEPT",
    options: [
      "Projected date for release of the patient",
      "Continues analysis of accident-prone individuals",
      "Cost-effective ways of handling patients with catastrophic illnesses.",
      "Intermittent analysis of the reasons for the patient to remain in the healthcare facility"
    ],
    correct: "Projected date for release of the patient"
  },
  {
    question: "Which of the following types of long-term care benefits would be best suited for a senior citizen who needs supervision, social, and recreational services?",
    options: [
      "Respite care",
      "Adult Day care",
      "Home health care",
      "Nursing home care"
    ],
    correct: "Adult Day care"
  },
  {
    question: "According to the Fair Credit Reporting Act, an insurer does NOT need to",
    options: [
      "Inform the applicant that an investigation is being conducted.",
      "Discuss any credit history inconsistencies with the application.",
      "Inform the applicant about the scope of an investigation.",
      "Notify the applicant if an application is denied."
    ],
    correct: "Discuss any credit history inconsistencies with the application."
  },
  {
    question: "Which of the following is NOT considered advertising?",
    options: [
      "A policy illustration.",
      "An AM Best company rating.",
      "A direct mailing by an insurer",
      "An agent’s oral sales presentation"
    ],
    correct: "An AM Best company rating."
  },
  {
    question: "How many days after an accident and health policy has been reinstated is there coverage for sickness?",
    options: ["1 day", "3 days", "5 days", "10 days"],
    correct: "10 days"
  },
  {
    question: "A Key Person Disability Income Policy pays benefits to the",
    options: ["Spouse", "Dependent", "Employee", "Employer"],
    correct: "Employer"
  },
  {
    question: "A 65-year-old employee who works for an employer with 24 employees is disabled on the job. The employee has fully recovered and returned to work. Which health insurance coverage is primary?",
    options: [
      "Medicaid",
      "An individual’s plan",
      "Workers’ compensation",
      "His employer’s group plan"
    ],
    correct: "Workers’ compensation"
  },
  {
    question: "Under Workers Compensation, injured employees are covered for all the following losses EXCEPT",
    options: [
      "Loss of wages",
      "Pain and suffering",
      "Medical expenses",
      "Occupational illness"
    ],
    correct: "Pain and suffering"
  },
  {
    question: "Group long-term disability benefit amounts are usually limited to what percentage of the participant’s income?",
    options: ["40", "60", "80", "100"],
    correct: "60"
  },
  {
    question: "Under New York’s cybersecurity regulation, multi-factor authentication would NOT include the use of a",
    options: [
      "Key card",
      "Fingerprint scan",
      "Password or passcode.",
      "Text message on a smartphone"
    ],
    correct: "Text message on a smartphone"
  },
  {
    question: "Insurance plans that are terminated for an entire group, generally allow an extension of benefits to which type of employee?",
    options: ["Temporary", "Disabled", "Full time", "Laid off"],
    correct: "Laid off"
  }
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
    if (userAnswers[currentQuestion] !== undefined) return; // Prevent changes

    const isCorrect = option === quizData[currentQuestion].correct;
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
  const selectedAnswer = userAnswers[currentQuestion];
  const correctAnswer = currentQ.correct;

  return (
    <div className="p-6 max-w-2xl mx-auto">
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
          <div className="space-y-2">
            {currentQ.options.map((option, i) => (
              <button
                key={i}
                onClick={() => handleSelect(option)}
                disabled={selectedAnswer !== undefined}
                className={`w-full text-left px-4 py-2 rounded border ${
                  selectedAnswer === option
                    ? option === correctAnswer
                      ? "bg-green-100 border-green-500"
                      : "bg-red-100 border-red-500"
                    : "bg-white hover:bg-gray-100 border-gray-300"
                }`}
              >
                {selectedAnswer !== undefined && correctAnswer === option && (
                  <span className="text-green-500 mr-2">✅</span>
                )}
                {selectedAnswer !== undefined && selectedAnswer === option && selectedAnswer !== correctAnswer && (
                  <span className="text-red-500 mr-2">❌</span>
                )}
                {option}
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
