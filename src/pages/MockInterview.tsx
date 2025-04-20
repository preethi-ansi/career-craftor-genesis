
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  GraduationCap,
  Briefcase,
  Building,
  BookOpen,
  Cpu,
  Clock,
  CheckCircle,
  Save,
  RefreshCw,
  PlayCircle,
  PauseCircle
} from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

// Mock data for companies
const mockCompanies = [
  { id: 'google', name: 'Google' },
  { id: 'microsoft', name: 'Microsoft' },
  { id: 'apple', name: 'Apple' },
  { id: 'amazon', name: 'Amazon' },
  { id: 'meta', name: 'Meta' },
  { id: 'netflix', name: 'Netflix' },
  { id: 'uber', name: 'Uber' },
  { id: 'airbnb', name: 'Airbnb' },
  { id: 'stripe', name: 'Stripe' },
  { id: 'shopify', name: 'Shopify' },
];

// Mock data for job roles
const mockJobRoles = [
  { id: 'software-engineer', name: 'Software Engineer' },
  { id: 'product-manager', name: 'Product Manager' },
  { id: 'data-scientist', name: 'Data Scientist' },
  { id: 'ux-designer', name: 'UX Designer' },
  { id: 'marketing-manager', name: 'Marketing Manager' },
  { id: 'financial-analyst', name: 'Financial Analyst' },
  { id: 'sales-representative', name: 'Sales Representative' },
  { id: 'customer-success', name: 'Customer Success Manager' },
  { id: 'project-manager', name: 'Project Manager' },
  { id: 'hr-manager', name: 'HR Manager' },
];

// Mock data for generated questions
const mockGeneratedQuestions = {
  'google-software-engineer': [
    {
      id: '1',
      question: 'Explain the difference between processes and threads and when you would use one over the other.',
      category: 'Technical',
      difficulty: 'Medium'
    },
    {
      id: '2',
      question: 'Write an algorithm to find the longest substring without repeating characters in a given string.',
      category: 'Coding',
      difficulty: 'Hard'
    },
    {
      id: '3',
      question: 'How would you design a scalable system for Google\'s search autocomplete feature?',
      category: 'System Design',
      difficulty: 'Hard'
    },
    {
      id: '4',
      question: 'Describe a time when you faced a technical challenge. How did you approach it and what was the outcome?',
      category: 'Behavioral',
      difficulty: 'Medium'
    },
    {
      id: '5',
      question: 'Explain how you would approach debugging a production issue that is affecting a critical service.',
      category: 'Technical',
      difficulty: 'Medium'
    },
    {
      id: '6',
      question: 'How do you stay updated with the latest technologies and programming practices?',
      category: 'Behavioral',
      difficulty: 'Easy'
    },
    {
      id: '7',
      question: 'Implement a function to check if a binary tree is balanced.',
      category: 'Coding',
      difficulty: 'Medium'
    },
    {
      id: '8',
      question: 'How would you handle a situation where you disagree with a team member\'s approach to solving a problem?',
      category: 'Behavioral',
      difficulty: 'Medium'
    },
    {
      id: '9',
      question: 'Explain the concept of eventual consistency and why it matters in distributed systems.',
      category: 'Technical',
      difficulty: 'Hard'
    },
    {
      id: '10',
      question: 'Design a URL shortening service like bit.ly.',
      category: 'System Design',
      difficulty: 'Medium'
    },
    {
      id: '11',
      question: 'How would you implement a cache with LRU (Least Recently Used) eviction policy?',
      category: 'Coding',
      difficulty: 'Hard'
    },
    {
      id: '12',
      question: 'Tell me about a project you\'re particularly proud of. What was your role and what challenges did you overcome?',
      category: 'Behavioral',
      difficulty: 'Medium'
    },
    {
      id: '13',
      question: 'How would you design the back-end system for a real-time collaborative document editing service?',
      category: 'System Design',
      difficulty: 'Hard'
    },
    {
      id: '14',
      question: 'Explain how garbage collection works in your preferred programming language.',
      category: 'Technical',
      difficulty: 'Medium'
    },
    {
      id: '15',
      question: 'Write an algorithm to find the kth largest element in an unsorted array.',
      category: 'Coding',
      difficulty: 'Medium'
    },
    {
      id: '16',
      question: 'How do you ensure your code is maintainable and understandable for other developers?',
      category: 'Behavioral',
      difficulty: 'Easy'
    },
    {
      id: '17',
      question: 'Describe your approach to testing and quality assurance in software development.',
      category: 'Technical',
      difficulty: 'Medium'
    },
    {
      id: '18',
      question: 'Implement a function to determine if a string is a palindrome.',
      category: 'Coding',
      difficulty: 'Easy'
    },
    {
      id: '19',
      question: 'How would you design a notification system that can handle millions of users?',
      category: 'System Design',
      difficulty: 'Hard'
    },
    {
      id: '20',
      question: 'Tell me about a time when you had to learn a new technology quickly to complete a project.',
      category: 'Behavioral',
      difficulty: 'Medium'
    }
  ]
};

const MockInterview = () => {
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [interviewCompleted, setInterviewCompleted] = useState(false);
  const [showTips, setShowTips] = useState(true);
  const [useAI, setUseAI] = useState(true);
  
  // Generate interview questions
  const generateQuestions = () => {
    if (!company || !role) {
      return;
    }
    
    setLoading(true);
    
    // In a real app, this would be an API call
    setTimeout(() => {
      const key = `${company}-${role}`;
      // For demo purposes, just use the Google SWE questions for all combinations
      const generatedQuestions = mockGeneratedQuestions['google-software-engineer'];
      setQuestions(generatedQuestions);
      setLoading(false);
      
      // Reset interview state
      setCurrentQuestionIndex(0);
      setUserAnswers({});
      setInterviewStarted(false);
      setInterviewCompleted(false);
    }, 1500);
  };
  
  // Start the mock interview
  const startInterview = () => {
    setInterviewStarted(true);
  };
  
  // Save user's answer to the current question
  const saveAnswer = (questionId: string, answer: string) => {
    setUserAnswers({
      ...userAnswers,
      [questionId]: answer
    });
  };
  
  // Move to the next question
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setInterviewCompleted(true);
    }
  };
  
  // Move to the previous question
  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  // Get category color class
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Technical':
        return 'bg-blue-100 text-blue-800';
      case 'Coding':
        return 'bg-green-100 text-green-800';
      case 'Behavioral':
        return 'bg-purple-100 text-purple-800';
      case 'System Design':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Get difficulty color class
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      
      <main className="flex-grow py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">AI-Powered Interview Generator</h1>
            <p className="mt-1 text-gray-500">
              Practice with custom interview questions tailored to your target company and role
            </p>
          </div>
          
          {questions.length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>Generate Your Interview Questions</CardTitle>
                <CardDescription>
                  Select your target company and role to get started
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="company">Target Company</Label>
                    <Select value={company} onValueChange={setCompany}>
                      <SelectTrigger id="company">
                        <SelectValue placeholder="Select company" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockCompanies.map((c) => (
                          <SelectItem key={c.id} value={c.id}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="role">Job Role</Label>
                    <Select value={role} onValueChange={setRole}>
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockJobRoles.map((r) => (
                          <SelectItem key={r.id} value={r.id}>
                            {r.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="flex items-center space-x-2">
                    <Switch id="ai-feedback" checked={useAI} onCheckedChange={setUseAI} />
                    <Label htmlFor="ai-feedback">Enable AI feedback on your answers</Label>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Our AI will analyze your answers and provide personalized feedback
                  </p>
                </div>
                
                <div className="mt-8 bg-blue-50 rounded-lg p-4">
                  <div className="flex gap-3">
                    <div className="mt-1">
                      <GraduationCap className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-blue-900">Interview Preparation Tips</h3>
                      <ul className="mt-2 text-sm text-blue-800 space-y-2 list-disc pl-4">
                        <li>Research the company's culture, products, and recent news</li>
                        <li>Practice speaking your answers out loud</li>
                        <li>Use the STAR method (Situation, Task, Action, Result) for behavioral questions</li>
                        <li>Prepare relevant examples from your experience</li>
                        <li>Have questions ready to ask the interviewer</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  onClick={generateQuestions}
                  disabled={!company || !role || loading}
                >
                  {loading ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Generating Questions...
                    </>
                  ) : (
                    'Generate Interview Questions'
                  )}
                </Button>
              </CardFooter>
            </Card>
          ) : !interviewStarted ? (
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Your Interview Questions</CardTitle>
                      <CardDescription>
                        {questions.length} questions customized for {mockCompanies.find(c => c.id === company)?.name} / {mockJobRoles.find(r => r.id === role)?.name}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => setQuestions([])}>
                        Change Selection
                      </Button>
                      <Button variant="outline" size="sm" onClick={generateQuestions}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Regenerate
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="all">
                    <TabsList className="mb-4">
                      <TabsTrigger value="all">All ({questions.length})</TabsTrigger>
                      <TabsTrigger value="technical">Technical</TabsTrigger>
                      <TabsTrigger value="coding">Coding</TabsTrigger>
                      <TabsTrigger value="behavioral">Behavioral</TabsTrigger>
                      <TabsTrigger value="system">System Design</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="all">
                      <div className="space-y-2">
                        {questions.map((q, index) => (
                          <div 
                            key={q.id} 
                            className="p-3 border rounded-md hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <span className="text-sm text-gray-500 mr-2">#{index + 1}</span>
                                <span className="font-medium">{q.question}</span>
                              </div>
                              <div className="flex gap-2">
                                <Badge className={getCategoryColor(q.category)}>{q.category}</Badge>
                                <Badge className={getDifficultyColor(q.difficulty)}>{q.difficulty}</Badge>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="technical">
                      <div className="space-y-2">
                        {questions
                          .filter(q => q.category === 'Technical')
                          .map((q, index) => (
                            <div 
                              key={q.id} 
                              className="p-3 border rounded-md hover:bg-gray-50 transition-colors"
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <span className="text-sm text-gray-500 mr-2">T{index + 1}</span>
                                  <span className="font-medium">{q.question}</span>
                                </div>
                                <Badge className={getDifficultyColor(q.difficulty)}>{q.difficulty}</Badge>
                              </div>
                            </div>
                          ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="coding">
                      <div className="space-y-2">
                        {questions
                          .filter(q => q.category === 'Coding')
                          .map((q, index) => (
                            <div 
                              key={q.id} 
                              className="p-3 border rounded-md hover:bg-gray-50 transition-colors"
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <span className="text-sm text-gray-500 mr-2">C{index + 1}</span>
                                  <span className="font-medium">{q.question}</span>
                                </div>
                                <Badge className={getDifficultyColor(q.difficulty)}>{q.difficulty}</Badge>
                              </div>
                            </div>
                          ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="behavioral">
                      <div className="space-y-2">
                        {questions
                          .filter(q => q.category === 'Behavioral')
                          .map((q, index) => (
                            <div 
                              key={q.id} 
                              className="p-3 border rounded-md hover:bg-gray-50 transition-colors"
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <span className="text-sm text-gray-500 mr-2">B{index + 1}</span>
                                  <span className="font-medium">{q.question}</span>
                                </div>
                                <Badge className={getDifficultyColor(q.difficulty)}>{q.difficulty}</Badge>
                              </div>
                            </div>
                          ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="system">
                      <div className="space-y-2">
                        {questions
                          .filter(q => q.category === 'System Design')
                          .map((q, index) => (
                            <div 
                              key={q.id} 
                              className="p-3 border rounded-md hover:bg-gray-50 transition-colors"
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <span className="text-sm text-gray-500 mr-2">S{index + 1}</span>
                                  <span className="font-medium">{q.question}</span>
                                </div>
                                <Badge className={getDifficultyColor(q.difficulty)}>{q.difficulty}</Badge>
                              </div>
                            </div>
                          ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={startInterview}>
                    <PlayCircle className="mr-2 h-4 w-4" />
                    Start Interview Practice
                  </Button>
                </CardFooter>
              </Card>
              
              {showTips && (
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Interview Tips for {mockCompanies.find(c => c.id === company)?.name}</CardTitle>
                      <Button variant="ghost" size="sm" onClick={() => setShowTips(false)}>
                        Hide
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex gap-3">
                          <Building className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <h3 className="font-medium">Company Culture</h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {company === 'google' ? 
                                "Google values innovation, analytical thinking, and collaborative problem-solving. Show how you approach complex problems methodically." : 
                                "Research the company's core values and demonstrate how you align with their culture and mission."}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex gap-3">
                          <Clock className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <h3 className="font-medium">Interview Structure</h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {company === 'google' ? 
                                "Google typically conducts 4-5 interviews focusing on coding, algorithms, system design, and behavioral questions." : 
                                "Prepare for multiple rounds that may include technical assessments, behavioral questions, and culture fit evaluations."}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex gap-3">
                          <Briefcase className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <h3 className="font-medium">What They Look For</h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {role === 'software-engineer' ? 
                                "Strong problem-solving skills, coding proficiency, system design knowledge, and collaborative approach to work." : 
                                "Demonstrate your expertise, problem-solving abilities, and how you've made an impact in previous roles."}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex gap-3">
                          <BookOpen className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <h3 className="font-medium">Preparation Resources</h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {role === 'software-engineer' ? 
                                "LeetCode, 'Cracking the Coding Interview', system design primers, and the company's engineering blog." : 
                                "Research industry trends, review the company's products/services, and prepare relevant case studies."}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : interviewCompleted ? (
            <Card>
              <CardHeader>
                <CardTitle>Interview Completed!</CardTitle>
                <CardDescription>
                  You've completed all {questions.length} questions for your mock interview
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-green-50 border border-green-100 rounded-lg p-6 text-center mb-6">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-green-800">Great job on completing your practice!</h3>
                  <p className="text-green-700 mt-2">
                    You've answered all {questions.length} questions for your {mockCompanies.find(c => c.id === company)?.name} {mockJobRoles.find(r => r.id === role)?.name} interview.
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Your Performance Summary</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white p-4 rounded-lg border text-center">
                        <p className="text-2xl font-bold text-primary">{questions.length}</p>
                        <p className="text-sm text-gray-500">Questions</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border text-center">
                        <p className="text-2xl font-bold text-primary">{Object.keys(userAnswers).length}</p>
                        <p className="text-sm text-gray-500">Answers Saved</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border text-center">
                        <p className="text-2xl font-bold text-amber-500">45 min</p>
                        <p className="text-sm text-gray-500">Total Time</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border text-center">
                        <p className="text-2xl font-bold text-green-500">75%</p>
                        <p className="text-sm text-gray-500">Confidence Score</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">AI Feedback Overview</h3>
                    <div className="bg-white p-6 rounded-lg border">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-800">Strengths</h4>
                          <ul className="mt-2 text-sm text-gray-600 space-y-1 list-disc pl-5">
                            <li>Strong technical knowledge demonstrated in system design questions</li>
                            <li>Clear communication in behavioral responses</li>
                            <li>Good problem-solving approach in coding questions</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-800">Areas for Improvement</h4>
                          <ul className="mt-2 text-sm text-gray-600 space-y-1 list-disc pl-5">
                            <li>Could provide more specific examples in behavioral responses</li>
                            <li>Consider time complexity more explicitly in coding solutions</li>
                            <li>Expand on scalability considerations in system design answers</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setQuestions([])}>
                  Create New Interview
                </Button>
                <Button onClick={() => {
                  setInterviewStarted(false);
                  setInterviewCompleted(false);
                }}>
                  Review Questions & Answers
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main interview area - 2/3 width */}
              <div className="lg:col-span-2">
                <Card className="mb-6">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Question {currentQuestionIndex + 1} of {questions.length}</CardTitle>
                        <CardDescription>
                          {mockCompanies.find(c => c.id === company)?.name} / {mockJobRoles.find(r => r.id === role)?.name} Interview
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getCategoryColor(questions[currentQuestionIndex].category)}>
                          {questions[currentQuestionIndex].category}
                        </Badge>
                        <Badge className={getDifficultyColor(questions[currentQuestionIndex].difficulty)}>
                          {questions[currentQuestionIndex].difficulty}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <h3 className="text-xl font-medium">{questions[currentQuestionIndex].question}</h3>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="answer">Your Answer</Label>
                      <Textarea
                        id="answer"
                        placeholder="Type your answer here..."
                        rows={8}
                        value={userAnswers[questions[currentQuestionIndex].id] || ''}
                        onChange={(e) => saveAnswer(questions[currentQuestionIndex].id, e.target.value)}
                      />
                    </div>
                    
                    {useAI && userAnswers[questions[currentQuestionIndex].id] && userAnswers[questions[currentQuestionIndex].id].length > 50 && (
                      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-start gap-3">
                          <Cpu className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-blue-900">AI Feedback</h4>
                            <p className="text-sm text-blue-800 mt-1">
                              Your answer demonstrates good understanding of the core concepts. Consider adding specific examples from your experience to strengthen your response.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="justify-between">
                    <Button 
                      variant="outline"
                      onClick={previousQuestion}
                      disabled={currentQuestionIndex === 0}
                    >
                      Previous
                    </Button>
                    <Button 
                      variant="default"
                      onClick={nextQuestion}
                    >
                      {currentQuestionIndex === questions.length - 1 ? 'Finish Interview' : 'Next Question'}
                    </Button>
                  </CardFooter>
                </Card>
                
                {questions[currentQuestionIndex].category === 'Coding' && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Coding Tips</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4 text-sm">
                        <div className="flex gap-3">
                          <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-medium">1</div>
                          <p>Start by clarifying the problem and understanding edge cases</p>
                        </div>
                        <div className="flex gap-3">
                          <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-medium">2</div>
                          <p>Think about the approach before coding (brute force vs optimized)</p>
                        </div>
                        <div className="flex gap-3">
                          <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-medium">3</div>
                          <p>Analyze time and space complexity of your solution</p>
                        </div>
                        <div className="flex gap-3">
                          <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-medium">4</div>
                          <p>Test your solution with example inputs and edge cases</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {questions[currentQuestionIndex].category === 'System Design' && (
                  <Card>
                    <CardHeader>
                      <CardTitle>System Design Approach</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4 text-sm">
                        <div className="flex gap-3">
                          <div className="h-6 w-6 rounded-full bg-orange-100 text-orange-800 flex items-center justify-center font-medium">1</div>
                          <p>Clarify requirements and constraints (users, scale, performance, etc.)</p>
                        </div>
                        <div className="flex gap-3">
                          <div className="h-6 w-6 rounded-full bg-orange-100 text-orange-800 flex items-center justify-center font-medium">2</div>
                          <p>Start with a high-level architecture before diving into details</p>
                        </div>
                        <div className="flex gap-3">
                          <div className="h-6 w-6 rounded-full bg-orange-100 text-orange-800 flex items-center justify-center font-medium">3</div>
                          <p>Address data models, API design, and component interactions</p>
                        </div>
                        <div className="flex gap-3">
                          <div className="h-6 w-6 rounded-full bg-orange-100 text-orange-800 flex items-center justify-center font-medium">4</div>
                          <p>Discuss scalability, reliability, and potential bottlenecks</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {questions[currentQuestionIndex].category === 'Behavioral' && (
                  <Card>
                    <CardHeader>
                      <CardTitle>STAR Method Reminder</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4 text-sm">
                        <div className="flex gap-3">
                          <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center font-medium">S</div>
                          <p><span className="font-medium">Situation:</span> Describe the context and background</p>
                        </div>
                        <div className="flex gap-3">
                          <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center font-medium">T</div>
                          <p><span className="font-medium">Task:</span> Explain your responsibility or challenge</p>
                        </div>
                        <div className="flex gap-3">
                          <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center font-medium">A</div>
                          <p><span className="font-medium">Action:</span> Detail the specific steps you took</p>
                        </div>
                        <div className="flex gap-3">
                          <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center font-medium">R</div>
                          <p><span className="font-medium">Result:</span> Share the outcomes and what you learned</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
              
              {/* Sidebar - 1/3 width */}
              <div className="space-y-6">
                {/* Interview controls */}
                <Card>
                  <CardHeader>
                    <CardTitle>Interview Controls</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col space-y-4">
                      <Button variant="outline" className="justify-start" onClick={() => {}}>
                        <PauseCircle className="mr-2 h-4 w-4" />
                        Pause Interview
                      </Button>
                      <Button variant="outline" className="justify-start" onClick={() => {}}>
                        <Save className="mr-2 h-4 w-4" />
                        Save Progress
                      </Button>
                      <Button variant="outline" className="justify-start" onClick={() => setInterviewCompleted(true)}>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        End Interview
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Question navigation */}
                <Card>
                  <CardHeader>
                    <CardTitle>Question Navigator</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-5 gap-2">
                      {questions.map((_, index) => (
                        <Button
                          key={index}
                          variant={currentQuestionIndex === index ? "default" : userAnswers[questions[index].id] ? "outline" : "ghost"}
                          className="h-10 w-10 p-0"
                          onClick={() => setCurrentQuestionIndex(index)}
                        >
                          {index + 1}
                        </Button>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
                      <div className="flex items-center">
                        <div className="h-3 w-3 bg-primary rounded-full mr-1"></div>
                        <span>Current</span>
                      </div>
                      <div className="flex items-center">
                        <div className="h-3 w-3 border rounded-full mr-1"></div>
                        <span>Answered</span>
                      </div>
                      <div className="flex items-center">
                        <div className="h-3 w-3 bg-gray-200 rounded-full mr-1"></div>
                        <span>Not Started</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Interview progress */}
                <Card>
                  <CardHeader>
                    <CardTitle>Your Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Completion</span>
                          <span className="text-sm text-gray-500">
                            {Object.keys(userAnswers).length} / {questions.length} questions
                          </span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary" 
                            style={{ width: `${(Object.keys(userAnswers).length / questions.length) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold">24:18</p>
                          <p className="text-xs text-gray-500">Time Elapsed</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold">{Math.round((Object.keys(userAnswers).length / questions.length) * 100)}%</p>
                          <p className="text-xs text-gray-500">Complete</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MockInterview;
