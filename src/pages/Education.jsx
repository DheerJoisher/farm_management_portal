import React, { useState } from 'react';
import { ChevronDown, ChevronUp, PlayCircle, Book, Shield, Users, Wrench, Heart, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
 import Navbar from "../components/Navbar"; // adjust path if needed
import Footer from "../components/Footer";

const Education = () => {
  const [openStages, setOpenStages] = useState({});

  const toggleStage = (stageId) => {
    setOpenStages(prev => ({
      ...prev,
      [stageId]: !prev[stageId]
    }));
  };

  const stages = [
    {
      id: 1,
      title: "Planning & Site Selection",
      icon: <Book className="w-6 h-6" />,
      description: "Learn the fundamentals of choosing the right location and planning your poultry farm setup.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      keyPoints: [
        "Choose well-drained land with good ventilation",
        "Ensure proximity to markets and feed suppliers",
        "Check local zoning laws and regulations",
        "Plan for future expansion possibilities"
      ],
      duration: "15 minutes",
      difficulty: "Beginner"
    },
    {
      id: 2,
      title: "Infrastructure & Housing Design",
      icon: <Wrench className="w-6 h-6" />,
      description: "Design and construct proper housing that ensures bird comfort and productivity.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      keyPoints: [
        "Optimal space allocation per bird",
        "Ventilation and lighting systems",
        "Flooring and drainage solutions",
        "Predator-proof construction techniques"
      ],
      duration: "20 minutes",
      difficulty: "Intermediate"
    },
    {
      id: 3,
      title: "Biosecurity & Hygiene Protocols",
      icon: <Shield className="w-6 h-6" />,
      description: "Implement comprehensive hygiene measures to prevent disease outbreaks.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      keyPoints: [
        "Disinfection procedures and schedules",
        "Visitor and vehicle entry protocols",
        "Waste management systems",
        "Water quality management"
      ],
      duration: "25 minutes",
      difficulty: "Advanced"
    },
    {
      id: 4,
      title: "Bird Selection & Procurement",
      icon: <Users className="w-6 h-6" />,
      description: "Choose healthy, productive bird breeds suitable for your farming goals.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      keyPoints: [
        "Selecting appropriate breeds for your purpose",
        "Sourcing from certified suppliers",
        "Health screening procedures",
        "Transportation and quarantine protocols"
      ],
      duration: "18 minutes",
      difficulty: "Intermediate"
    },
    {
      id: 5,
      title: "Feeding & Nutrition Management",
      icon: <Heart className="w-6 h-6" />,
      description: "Develop optimal feeding strategies for maximum growth and production.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      keyPoints: [
        "Age-appropriate feed formulations",
        "Feeding schedules and quantities",
        "Water system maintenance",
        "Nutritional supplement programs"
      ],
      duration: "22 minutes",
      difficulty: "Intermediate"
    },
    {
      id: 6,
      title: "Health Monitoring & Disease Prevention",
      icon: <AlertTriangle className="w-6 h-6" />,
      description: "Implement health monitoring systems and vaccination programs.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      keyPoints: [
        "Daily health observation techniques",
        "Vaccination schedules and procedures",
        "Common disease identification",
        "Emergency response protocols"
      ],
      duration: "30 minutes",
      difficulty: "Advanced"
    },
    {
      id: 7,
      title: "Production Management & Record Keeping",
      icon: <TrendingUp className="w-6 h-6" />,
      description: "Optimize production efficiency through systematic monitoring and data analysis.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      keyPoints: [
        "Production tracking systems",
        "Cost analysis and profitability",
        "Performance benchmarking",
        "Digital record management tools"
      ],
      duration: "20 minutes",
      difficulty: "Intermediate"
    },
    {
      id: 8,
      title: "Marketing & Business Sustainability",
      icon: <CheckCircle className="w-6 h-6" />,
      description: "Develop sustainable business practices and marketing strategies.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      keyPoints: [
        "Market analysis and pricing strategies",
        "Building customer relationships",
        "Quality certification processes",
        "Scaling and expansion planning"
      ],
      duration: "25 minutes",
      difficulty: "Advanced"
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      { }
      <Navbar/>
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 mt-8">
              Poultry Farming Education
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Master the art of establishing and maintaining a successful poultry farm
            </p>
            <div className="flex justify-center items-center space-x-8 text-sm md:text-base">
              <div className="flex items-center">
                <PlayCircle className="w-5 h-5 mr-2" />
                8 Comprehensive Stages
              </div>
              <div className="flex items-center">
                <Book className="w-5 h-5 mr-2" />
                Interactive Learning
              </div>
              <div className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Hygiene Focused
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Learning Progress</span>
            <span>{Object.keys(openStages).length} of {stages.length} stages explored</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(Object.keys(openStages).length / stages.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {stages.map((stage, index) => (
            <div key={stage.id} className="mb-8">
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                {/* Stage Header */}
                <div 
                  className="p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => toggleStage(stage.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-gradient-to-r from-green-500 to-blue-500 p-3 rounded-full text-white">
                        {stage.icon}
                      </div>
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                            Stage {stage.id}: {stage.title}
                          </h2>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(stage.difficulty)}`}>
                            {stage.difficulty}
                          </span>
                        </div>
                        <p className="text-gray-600">{stage.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <span>⏱️ {stage.duration}</span>
                          <span>📚 {stage.keyPoints.length} Key Points</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-gray-400">
                      {openStages[stage.id] ? (
                        <ChevronUp className="w-6 h-6" />
                      ) : (
                        <ChevronDown className="w-6 h-6" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expandable Content */}
                {openStages[stage.id] && (
                  <div className="border-t border-gray-100">
                    <div className="p-6 space-y-6">
                      {/* Video Section */}
                      <div className="bg-gray-900 rounded-lg overflow-hidden">
                        <div className="aspect-w-16 aspect-h-9">
                          <iframe
                            src={stage.videoUrl}
                            title={`${stage.title} - Educational Video`}
                            className="w-full h-64 md:h-96"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                      </div>

                      {/* Key Points */}
                      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                          <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                          Key Learning Points
                        </h3>
                        <div className="grid md:grid-cols-2 gap-3">
                          {stage.keyPoints.map((point, pointIndex) => (
                            <div key={pointIndex} className="flex items-start space-x-2">
                              <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-700">{point}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Navigation */}
                      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                        <button 
                          className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                          onClick={() => index > 0 && toggleStage(stages[index - 1].id)}
                          disabled={index === 0}
                        >
                          <ChevronUp className="w-4 h-4" />
                          <span>Previous Stage</span>
                        </button>
                        <div className="text-sm text-gray-500">
                          Stage {stage.id} of {stages.length}
                        </div>
                        <button 
                          className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                          onClick={() => index < stages.length - 1 && toggleStage(stages[index + 1].id)}
                          disabled={index === stages.length - 1}
                        >
                          <span>Next Stage</span>
                          <ChevronDown className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Section */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Start Your Poultry Farm?</h3>
          <p className="text-gray-600 mb-6">
            You've learned the essential stages of establishing and maintaining a successful poultry farm. 
            Remember, proper hygiene and systematic management are key to your success.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center space-x-2">
              <Book className="w-5 h-5" />
              <span>Download Guide</span>
            </button>
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Join Community</span>
            </button>
          </div>
        </div>
      </div>
      { }
      <Footer/>
    </div>
  );
};

export default Education;