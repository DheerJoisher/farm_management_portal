import React, { useState, useEffect } from "react";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
} from "recharts";
 import Navbar from "../components/Navbar"; // adjust path if needed
import Footer from "../components/Footer";

const POULTRY_QUESTIONS = [
  {
    id: "q1",
    category: "Biosecurity",
    text: "Do workers change clothes and disinfect footwear before entering poultry houses?",
    options: [
      { id: "a", text: "Always - Full PPE protocol followed", score: 0 },
      { id: "b", text: "Sometimes - Basic precautions only", score: 3 },
      { id: "c", text: "Never - No biosecurity measures", score: 8 },
    ],
  },
  {
    id: "q2",
    category: "Vaccination",
    text: "Are birds vaccinated according to the recommended poultry vaccination schedule?",
    options: [
      { id: "a", text: "Yes - All vaccinations up-to-date", score: 0 },
      { id: "b", text: "Partially - Some vaccines missed", score: 4 },
      { id: "c", text: "No - No vaccination program", score: 9 },
    ],
  },
  {
    id: "q3",
    category: "Mortality Management",
    text: "How are dead birds disposed of on your poultry farm?",
    options: [
      { id: "a", text: "Proper incineration or approved disposal", score: 0 },
      { id: "b", text: "Burial on farm premises", score: 3 },
      { id: "c", text: "Open disposal or left unmanaged", score: 8 },
    ],
  },
  {
    id: "q4",
    category: "Quarantine",
    text: "Is there a separate isolation area for new or sick birds?",
    options: [
      { id: "a", text: "Yes - Proper quarantine facility maintained", score: 0 },
      { id: "b", text: "Basic separation but inadequate", score: 4 },
      { id: "c", text: "No separate area - Birds mixed together", score: 8 },
    ],
  },
  {
    id: "q5",
    category: "Feed & Water",
    text: "What is the source and quality of feed and water for your poultry?",
    options: [
      { id: "a", text: "High-quality commercial feed + clean water", score: 0 },
      { id: "b", text: "Mixed sources with occasional quality issues", score: 2 },
      { id: "c", text: "Poor quality or contaminated feed/water", score: 6 },
    ],
  },
  {
    id: "q6",
    category: "Housing Conditions",
    text: "What are the ventilation and housing conditions in your poultry houses?",
    options: [
      { id: "a", text: "Excellent - Climate controlled with proper ventilation", score: 0 },
      { id: "b", text: "Adequate - Basic ventilation systems", score: 2 },
      { id: "c", text: "Poor - Overcrowded with inadequate ventilation", score: 7 },
    ],
  },
  {
    id: "q7",
    category: "Health Monitoring",
    text: "How frequently do you monitor bird health and behavior?",
    options: [
      { id: "a", text: "Daily - Regular health checks by trained staff", score: 0 },
      { id: "b", text: "Weekly - Periodic monitoring", score: 3 },
      { id: "c", text: "Rarely - Only when problems are obvious", score: 6 },
    ],
  },
  {
    id: "q8",
    category: "Record Keeping",
    text: "Do you maintain detailed records of poultry health, mortality, and treatments?",
    options: [
      { id: "a", text: "Yes - Comprehensive digital/paper records", score: 0 },
      { id: "b", text: "Basic records - Some information tracked", score: 2 },
      { id: "c", text: "No records - Information not documented", score: 5 },
    ],
  },
];

const RISK_COLORS = ["#3B82F6", "#F59E0B", "#EF4444"];
const CATEGORY_COLORS = {
  "Biosecurity": "#3B82F6",
  "Vaccination": "#8B5CF6", 
  "Mortality Management": "#EF4444",
  "Quarantine": "#F59E0B",
  "Feed & Water": "#06B6D4",
  "Housing Conditions": "#84CC16",
  "Health Monitoring": "#F97316",
  "Record Keeping": "#6B7280"
};

export default function RiskDashboard() {
  const [view, setView] = useState("home");
  const [answers, setAnswers] = useState({});
  const [currentAssessment, setCurrentAssessment] = useState(null);
  const [selectedFarm, setSelectedFarm] = useState("");

  const handleAnswerChange = (qid, aid) =>
    setAnswers((s) => ({ ...s, [qid]: aid }));

  const computeScore = (answers) =>
    POULTRY_QUESTIONS.reduce(
      (sum, q) => sum + (q.options.find((o) => o.id === answers[q.id])?.score || 0),
      0
    );

  const riskLevelFromScore = (score) => {
    if (score <= 10) return { label: "Low", color: RISK_COLORS[0] };
    if (score <= 25) return { label: "Medium", color: RISK_COLORS[1] };
    return { label: "High", color: RISK_COLORS[2] };
  };

  const handleSubmit = () => {
    if (POULTRY_QUESTIONS.some((q) => !answers[q.id])) {
      alert("Please answer all questions to complete your poultry farm assessment");
      return;
    }
    const score = computeScore(answers);
    const risk = riskLevelFromScore(score);
    const assessment = {
      id: Date.now(),
      farm: selectedFarm || `Poultry Farm ${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      answers,
      score,
      risk: risk.label,
    };
    setCurrentAssessment(assessment);
    setAnswers({});
    setSelectedFarm("");
    setView("assessments");
  };

  // Analytics data for single assessment
  const getAnalyticsData = () => {
    if (!currentAssessment) return null;

    // Category-wise scores
    const categoryScores = {};
    const categoryMaxScores = {};
    
    POULTRY_QUESTIONS.forEach((q) => {
      const ans = currentAssessment.answers[q.id];
      const score = q.options.find((o) => o.id === ans)?.score || 0;
      const maxScore = Math.max(...q.options.map(o => o.score));
      
      categoryScores[q.category] = (categoryScores[q.category] || 0) + score;
      categoryMaxScores[q.category] = (categoryMaxScores[q.category] || 0) + maxScore;
    });

    const categoryData = Object.entries(categoryScores).map(([category, score]) => ({
      category,
      score,
      maxScore: categoryMaxScores[category],
      percentage: ((categoryMaxScores[category] - score) / categoryMaxScores[category] * 100).toFixed(1),
      risk: score > categoryMaxScores[category] * 0.3 ? "High" : score > categoryMaxScores[category] * 0.1 ? "Medium" : "Low"
    }));

    // Risk breakdown
    const totalMaxScore = Object.values(categoryMaxScores).reduce((a, b) => a + b, 0);
    const riskBreakdown = [
      { name: "Safe Areas", value: Math.max(0, totalMaxScore - currentAssessment.score), color: RISK_COLORS[0] },
      { name: "Risk Areas", value: currentAssessment.score, color: riskLevelFromScore(currentAssessment.score).color }
    ];

    return { categoryData, riskBreakdown, totalMaxScore };
  };

  const analyticsData = getAnalyticsData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-100">
      {/* Navbar */}
      <Navbar/>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Home / Landing Page */}
        {view === "home" && (
          <div className="flex flex-col items-center justify-center min-h-[80vh] gap-12">
            <div className="text-center space-y-6">
              <div className="inline-block p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg mb-6">
                <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center">
                  <div className="text-4xl">🐔</div>
                </div>
              </div>
              
              <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-800 to-indigo-600 bg-clip-text text-transparent leading-tight">
                Poultry Farm Risk Dashboard
              </h1>
              
              <p className="text-xl text-gray-600 max-w-4xl leading-relaxed">
                Comprehensive biosecurity assessment platform specifically designed for poultry farms. 
                Monitor disease risks, evaluate housing conditions, and ensure optimal bird health across your operations.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-10 mt-12">
              <button
                onClick={() => setView("quiz")}
                className="group px-16 py-7 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-2xl rounded-3xl shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 transform border-4 border-blue-500 hover:border-blue-400"
              >
                <span className="flex items-center justify-center gap-4">
                  <span className="text-3xl">🐓</span>
                  <span className="font-black">START ASSESSMENT</span>
                  <span className="group-hover:translate-x-2 transition-transform duration-200 text-2xl">→</span>
                </span>
              </button>
              
              {currentAssessment && (
                <button
                  onClick={() => setView("assessments")}
                  className="px-16 py-7 bg-white text-gray-800 font-black text-2xl rounded-3xl shadow-2xl border-4 border-gray-300 hover:border-blue-400 hover:shadow-3xl hover:scale-110 transition-all duration-300 transform hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50"
                >
                  <span className="flex items-center justify-center gap-4">
                    <span className="text-3xl">📊</span>
                    <span className="font-black">VIEW ANALYTICS</span>
                  </span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Quiz Page */}
        {view === "quiz" && (
          <div className="max-w-5xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-10 space-y-8">
              <div className="text-center space-y-4 border-b border-gray-200 pb-8">
                <div className="text-6xl mb-4">🐔</div>
                <h2 className="text-4xl font-bold text-gray-800">Poultry Farm Biosecurity Assessment</h2>
                <p className="text-lg text-gray-600">
                  Complete this comprehensive evaluation to assess your poultry farm's disease risk and biosecurity measures
                </p>
              </div>

              <div className="space-y-10">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200">
                  <label className="block text-lg font-semibold text-gray-800 mb-3">
                    🏠 Poultry Farm Name (Optional)
                  </label>
                  <input
                    value={selectedFarm}
                    onChange={(e) => setSelectedFarm(e.target.value)}
                    placeholder="E.g., Azure Poultry Farm, Blue Valley Chickens..."
                    className="w-full border-2 border-gray-200 rounded-xl shadow-sm p-4 text-lg focus:ring-4 focus:ring-blue-200 focus:border-blue-400 focus:outline-none transition-all duration-200"
                  />
                </div>

                {POULTRY_QUESTIONS.map((q, index) => (
                  <div key={q.id} className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-bold text-white bg-gradient-to-r from-blue-500 to-blue-600 px-3 py-1 rounded-full">
                            {q.category}
                          </span>
                          <span className="text-sm font-medium text-blue-600">
                            Question {index + 1} of {POULTRY_QUESTIONS.length}
                          </span>
                        </div>
                        <div className="text-xl font-semibold text-gray-800 leading-relaxed">{q.text}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      {q.options.map((opt) => (
                        <label
                          key={opt.id}
                          className={`group relative overflow-hidden p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${
                            answers[q.id] === opt.id
                              ? "border-blue-400 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg"
                              : "border-gray-200 bg-white hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className={`text-base font-medium transition-colors duration-200 ${
                              answers[q.id] === opt.id ? "text-blue-800" : "text-gray-700 group-hover:text-gray-900"
                            }`}>
                              {opt.text}
                            </span>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                              answers[q.id] === opt.id
                                ? "border-blue-500 bg-blue-500"
                                : "border-gray-300 group-hover:border-gray-400"
                            }`}>
                              {answers[q.id] === opt.id && (
                                <div className="w-3 h-3 bg-white rounded-full"></div>
                              )}
                            </div>
                          </div>
                          <input
                            type="radio"
                            name={q.id}
                            checked={answers[q.id] === opt.id}
                            onChange={() => handleAnswerChange(q.id, opt.id)}
                            className="sr-only"
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-10 border-t-2 border-gray-300">
                  <button 
                    onClick={handleSubmit}
                    className="px-20 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-2xl rounded-3xl shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 transform border-4 border-blue-500 hover:border-blue-400"
                  >
                    <span className="flex items-center gap-4">
                      <span className="text-3xl">🐓</span>
                      <span className="font-black">SUBMIT ASSESSMENT</span>
                    </span>
                  </button>
                  <button
                    onClick={() => setView("home")}
                    className="px-12 py-6 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold text-xl rounded-3xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 transform border-4 border-gray-500"
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-2xl">←</span>
                      <span className="font-bold">BACK TO HOME</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Assessments Page */}
        {view === "assessments" && (
          <div className="space-y-8">
            <div className="text-center space-y-4 mb-12">
              <div className="text-6xl mb-4">📊</div>
              <h1 className="text-5xl font-bold text-gray-800">Farm Assessment Analytics</h1>
              <p className="text-xl text-gray-600">Detailed analysis of your poultry farm biosecurity assessment</p>
            </div>

            {!currentAssessment ? (
              <div className="text-center py-16 text-gray-500 bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl">
                <div className="text-6xl mb-4">🐔</div>
                <div className="text-2xl font-bold mb-4">No Assessment Data Available</div>
                <div className="text-lg mb-8">Please complete a poultry farm assessment to view analytics</div>
                <button
                  onClick={() => setView("quiz")}
                  className="px-12 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xl rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 transform"
                >
                  Start Assessment
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                {/* Sidebar */}
                <aside className="xl:col-span-1 space-y-8">
                  <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 space-y-8">
                    {/* Farm Overview */}
                    <div className="text-center">
                      <h2 className="text-2xl font-bold text-gray-800 mb-4">🐔 {currentAssessment.farm}</h2>
                      <div className="text-gray-600 text-sm mb-2">Latest Assessment Date</div>
                      <div className="text-sm font-semibold text-gray-800 mb-4">
                        {new Date(currentAssessment.timestamp).toLocaleDateString()}
                      </div>
                      <div className="text-gray-600 text-sm mb-2">Overall Risk Score</div>
                      <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                        {currentAssessment.score}
                      </div>
                      <div className="text-sm text-gray-500">out of {analyticsData?.totalMaxScore}</div>
                    </div>

                    {/* Risk Level Indicator */}
                    <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-2xl">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Risk Level</h3>
                      <div className="flex justify-center mb-4">
                        <div
                          className="px-6 py-3 rounded-full text-lg font-bold text-white shadow-lg"
                          style={{ background: riskLevelFromScore(currentAssessment.score).color }}
                        >
                          {currentAssessment.risk} Risk
                        </div>
                      </div>
                      <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="80%" data={[
                            { 
                              name: 'Risk Score', 
                              value: (currentAssessment.score / analyticsData.totalMaxScore) * 100,
                              fill: riskLevelFromScore(currentAssessment.score).color
                            }
                          ]}>
                            <RadialBar dataKey="value" cornerRadius={10} fill="#3B82F6" />
                          </RadialBarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Risk Distribution */}
                    <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl border border-orange-200">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Risk vs Safe Areas</h3>
                      <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={analyticsData.riskBreakdown}
                              dataKey="value"
                              nameKey="name"
                              cx="50%"
                              cy="50%"
                              innerRadius={30}
                              outerRadius={70}
                              paddingAngle={6}
                            >
                              {analyticsData.riskBreakdown.map((entry, idx) => (
                                <Cell key={idx} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </aside>

                {/* Main Content */}
                <div className="xl:col-span-3 space-y-8">
                  {/* Category Performance Chart */}
                  <section className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
                      📈 Category Performance Analysis
                    </h2>
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl">
                      <div style={{ width: "100%", height: 320 }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={analyticsData.categoryData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                            <XAxis 
                              dataKey="category" 
                              angle={-45}
                              textAnchor="end"
                              height={80}
                              fontSize={12}
                            />
                            <YAxis />
                            <Tooltip formatter={(value, name) => [
                              name === 'score' ? `${value} points` : `${value}%`,
                              name === 'score' ? 'Risk Score' : 'Safety Percentage'
                            ]} />
                            <Legend />
                            <Bar 
                              dataKey="score" 
                              name="Risk Score" 
                              fill="#EF4444"
                              radius={[4, 4, 0, 0]}
                            />
                            <Bar 
                              dataKey="percentage" 
                              name="Safety %" 
                              fill="#3B82F6"
                              radius={[4, 4, 0, 0]}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </section>

                  {/* Category Breakdown */}
                  <section className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8">
                    <h2 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-3">
                      🎯 Detailed Category Breakdown
                    </h2>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {analyticsData.categoryData.map((cat) => (
                        <div key={cat.category} className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-2xl p-6 shadow-lg">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex-1 min-w-0">
                              <div className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
                                <div 
                                  className="w-4 h-4 rounded-full"
                                  style={{ backgroundColor: CATEGORY_COLORS[cat.category] }}
                                ></div>
                                {cat.category}
                              </div>
                              <div className="text-sm text-gray-600">
                                Performance: {cat.percentage}% Safe
                              </div>
                            </div>
                            <div
                              className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                                cat.risk === 'High' ? 'bg-red-500' : 
                                cat.risk === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                              }`}
                            >
                              {cat.risk}
                            </div>
                          </div>

                          <div className="bg-gray-50 p-4 rounded-xl">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-gray-600 font-medium">Risk Score</span>
                              <span className="text-lg font-bold text-gray-800">{cat.score}/{cat.maxScore}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div
                                className="h-3 rounded-full transition-all duration-500"
                                style={{ 
                                  width: `${(cat.score / cat.maxScore) * 100}%`,
                                  background: cat.risk === 'High' ? '#EF4444' : 
                                           cat.risk === 'Medium' ? '#F59E0B' : '#3B82F6'
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>



                  <div className="mt-12 text-center">
                    <button
                      onClick={() => setView("home")}
                      className="px-16 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-2xl rounded-3xl shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 transform border-4 border-blue-500"
                    >
                      <span className="flex items-center justify-center gap-4">
                        <span className="text-3xl">🏠</span>
                        <span className="font-black">BACK TO HOME</span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      { }
      <Footer/>
    </div>
  );
}
