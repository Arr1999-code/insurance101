import React, { useState } from 'react';

const originalQuizData = [
  // Questions should be defined here as normal, unchanged.
   {
    question: "Which of the following describes the cause of a loss?",
    options: ["Risk", "Hazard", "Peril", "Insurance"],
    answer: "Peril"
  },
  {
    question: "Which approach considers the future needs of the survivors in determining amounts of life insurance?",
    options: ["Human Life Value Approach.", "Cost Comparison Approach.", "Living Benefits Approach", "Needs Approach"],
    answer: "Needs Approach"
  },
  {
    question: "Replacing a policy when it is NOT in the best interest of a client is known as",
    options: ["discrimination", "defamation", "twisting", "rebating"],
    answer: "twisting"
  },
  {
    question: "Under a Universal Life insurance policy, a corridor represents the",
    options: ["gap between the total death benefit and the policy's cash value.", "time allotted to the insured to convert a group policy to an individual policy.", "stipulated time period that a policy may be reinstated after it has lapsed.", "percentage of benefits paid to each of the policy’s beneficiaries."],
    answer: "gap between the total death benefit and the policy's cash value."
  },
  {
    question: "The insured, who is 59 years of age decides to replace a long-term care policy they had for five years for a new policy. Which of the following is true of the insurer?",
    options: ["The original insurer will reimburse benefit dollars not used under the original policy period.", "The replacement insurer will probationary period and preexisting condition limitations.", "The replacement insurer will not honor previous exclusions that had previously been satisfied under the original policy.", "The replacement insurer will waive probationary periods pertaining to preexisting conditions satisfied under the original policy."],
    answer: "The replacement insurer will not honor previous exclusions that had previously been satisfied under the original policy."
  },
  {
    question: "A travel accident policy and a dread disease contract are examples of",
    options: ["group health policies.", "family health policies.", "personal health policies.", "limited health insurance policies."],
    answer: "limited health insurance policies."
  },
  {
    question: "A 65 Year-old employee who works for an employer with 24 employees is disabled on the job. The employee has fully recovered and returned to work. Which health coverage is primary?",
    options: ["Medicaid", "an individual plan", "workers' compensation", "his employer’s group plan"],
    answer: "workers’ compensation"
  },
  {
    question: "The PRIMARY difference between a noncancellable policy and guaranteed renewable policy is that only with a noncancelable policy can the insurer",
    options: ["Retain the right to refuse to renew the policy at a certain age", "cancel for excessive claims.", "allow renewal of policy for 5 years if the insured is over age 54.", "never raise premiums."],
    answer: "Retain the right to refuse to renew the policy at a certain age"
  },
  {
    question: "Sue Ellen is the sister of a licensed New York insurance producer, Frank Gillespie. Frank was recently killed in a car accident and Sue Ellen has been issued a temporary license to run Frank's agency. For what period of time is the initial temporary license valid?",
    options: ["3 months.", "6 months.", "1 year.", "2 years."],
    answer: "6 months."
  },
  {
    question: "Which of the following is a characteristic of level premium term life insurance",
    options: ["It provides for lower benefits.", "It can be used for cash value.", "It matches the level amount of protection on the insured's life expectancy.", "The cost of insurance is averaged throughout the contract."],
    answer: "The cost of insurance is averaged throughout the contract."
  },
  {
    question: "Some states have laws ensuring that health insurance coverages are available at a reasonable cost and under reasonable conditions for small employers. Small employers are defined as having no more than",
    options: ["200 employees.", "150 employees.", "100 employees.", "75 employees."],
    answer: "100 employees."
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
  if (!currentQ) {
    return <p className="text-center text-red-600">Error: Question not found.</p>;
  }

  const selectedAnswer = userAnswers[currentQuestion];
  const correctAnswer = currentQ.correct;
  const optionLabels = ['A', 'B', 'C', 'D'];

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
          <div className="flex flex-wrap gap-4">
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
