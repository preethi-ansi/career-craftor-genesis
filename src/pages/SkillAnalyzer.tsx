
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BarChart2,
  BookOpen,
  GraduationCap,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

// Mock career data with required skills
const careerSkillsData = {
  'software-engineer': {
    title: 'Software Engineer',
    requiredSkills: [
      { name: 'JavaScript', level: 4, importance: 'High' },
      { name: 'Python', level: 3, importance: 'Medium' },
      { name: 'SQL', level: 3, importance: 'Medium' },
      { name: 'Data Structures', level: 4, importance: 'High' },
      { name: 'Algorithms', level: 4, importance: 'High' },
      { name: 'Git', level: 3, importance: 'Medium' },
      { name: 'REST APIs', level: 3, importance: 'High' },
      { name: 'Testing', level: 3, importance: 'Medium' },
    ],
    recommendations: [
      { 
        name: 'Modern JavaScript Course', 
        provider: 'Udemy', 
        duration: '30 hours', 
        cost: '$19.99',
        link: 'https://www.udemy.com/',
        skillsCovered: ['JavaScript', 'REST APIs']
      },
      { 
        name: 'Data Structures & Algorithms Bootcamp', 
        provider: 'Coursera', 
        duration: '8 weeks', 
        cost: '$49/month',
        link: 'https://www.coursera.org/',
        skillsCovered: ['Data Structures', 'Algorithms']
      },
      { 
        name: 'SQL for Developers', 
        provider: 'DataCamp', 
        duration: '20 hours', 
        cost: '$25/month',
        link: 'https://www.datacamp.com/',
        skillsCovered: ['SQL']
      }
    ]
  },
  'data-scientist': {
    title: 'Data Scientist',
    requiredSkills: [
      { name: 'Python', level: 4, importance: 'High' },
      { name: 'Statistics', level: 5, importance: 'High' },
      { name: 'Machine Learning', level: 4, importance: 'High' },
      { name: 'SQL', level: 3, importance: 'Medium' },
      { name: 'Data Visualization', level: 4, importance: 'Medium' },
      { name: 'Big Data Technologies', level: 3, importance: 'Medium' },
      { name: 'R Programming', level: 3, importance: 'Low' },
      { name: 'Domain Knowledge', level: 3, importance: 'Medium' },
    ],
    recommendations: [
      { 
        name: 'Applied Data Science with Python', 
        provider: 'Coursera', 
        duration: '5 months', 
        cost: '$49/month',
        link: 'https://www.coursera.org/',
        skillsCovered: ['Python', 'Data Visualization', 'Machine Learning']
      },
      { 
        name: 'Statistics for Data Science', 
        provider: 'edX', 
        duration: '8 weeks', 
        cost: 'Free (Certificate: $99)',
        link: 'https://www.edx.org/',
        skillsCovered: ['Statistics']
      },
      { 
        name: 'Machine Learning A-Z', 
        provider: 'Udemy', 
        duration: '40 hours', 
        cost: '$19.99',
        link: 'https://www.udemy.com/',
        skillsCovered: ['Machine Learning']
      }
    ]
  },
  'ux-designer': {
    title: 'UX Designer',
    requiredSkills: [
      { name: 'User Research', level: 4, importance: 'High' },
      { name: 'Wireframing', level: 5, importance: 'High' },
      { name: 'Prototyping', level: 4, importance: 'High' },
      { name: 'User Testing', level: 4, importance: 'High' },
      { name: 'Visual Design', level: 4, importance: 'Medium' },
      { name: 'UI Design', level: 4, importance: 'Medium' },
      { name: 'Figma/Sketch', level: 4, importance: 'High' },
      { name: 'Information Architecture', level: 3, importance: 'Medium' },
    ],
    recommendations: [
      { 
        name: 'Google UX Design Professional Certificate', 
        provider: 'Coursera', 
        duration: '6 months', 
        cost: '$39/month',
        link: 'https://www.coursera.org/',
        skillsCovered: ['User Research', 'Wireframing', 'Prototyping']
      },
      { 
        name: 'Learn Figma: Design Essentials', 
        provider: 'Udemy', 
        duration: '15 hours', 
        cost: '$19.99',
        link: 'https://www.udemy.com/',
        skillsCovered: ['Figma/Sketch', 'UI Design']
      },
      { 
        name: 'User Testing Fundamentals', 
        provider: 'Interaction Design Foundation', 
        duration: '4 weeks', 
        cost: '$15/month',
        link: 'https://www.interaction-design.org/',
        skillsCovered: ['User Testing']
      }
    ]
  },
  'digital-marketer': {
    title: 'Digital Marketing Manager',
    requiredSkills: [
      { name: 'SEO', level: 4, importance: 'High' },
      { name: 'Content Marketing', level: 4, importance: 'High' },
      { name: 'Social Media Marketing', level: 4, importance: 'High' },
      { name: 'Email Marketing', level: 3, importance: 'Medium' },
      { name: 'Analytics', level: 4, importance: 'High' },
      { name: 'PPC Advertising', level: 3, importance: 'Medium' },
      { name: 'Marketing Strategy', level: 4, importance: 'High' },
      { name: 'CRM Tools', level: 3, importance: 'Medium' },
    ],
    recommendations: [
      { 
        name: 'Digital Marketing Specialization', 
        provider: 'Coursera', 
        duration: '8 months', 
        cost: '$49/month',
        link: 'https://www.coursera.org/',
        skillsCovered: ['SEO', 'Content Marketing', 'Social Media Marketing', 'Analytics']
      },
      { 
        name: 'Google Analytics Certification', 
        provider: 'Google', 
        duration: '40 hours', 
        cost: 'Free',
        link: 'https://analytics.google.com/analytics/academy/',
        skillsCovered: ['Analytics']
      },
      { 
        name: 'Complete Email Marketing Course', 
        provider: 'Udemy', 
        duration: '20 hours', 
        cost: '$19.99',
        link: 'https://www.udemy.com/',
        skillsCovered: ['Email Marketing']
      }
    ]
  }
};

// Mock data for user skills (in a real app, this would come from the user profile)
const mockUserSkills = [
  { name: 'JavaScript', level: 3 },
  { name: 'Python', level: 2 },
  { name: 'SQL', level: 1 },
  { name: 'Figma/Sketch', level: 2 },
  { name: 'Data Structures', level: 2 },
  { name: 'Content Marketing', level: 4 },
  { name: 'Social Media Marketing', level: 3 }
];

const SkillAnalyzer = () => {
  const { user } = useAuth();
  const [selectedCareer, setSelectedCareer] = useState('software-engineer');
  const [userSkills, setUserSkills] = useState(mockUserSkills);

  // Get the selected career data
  const careerData = careerSkillsData[selectedCareer as keyof typeof careerSkillsData];

  // Calculate the overall skills match percentage
  const calculateOverallMatch = () => {
    const career = careerSkillsData[selectedCareer as keyof typeof careerSkillsData];
    if (!career) return 0;

    let totalPoints = 0;
    let earnedPoints = 0;

    career.requiredSkills.forEach(requiredSkill => {
      // Weight points based on importance
      let skillWeight = 1;
      if (requiredSkill.importance === 'High') skillWeight = 3;
      if (requiredSkill.importance === 'Medium') skillWeight = 2;
      
      // Maximum points possible for this skill
      totalPoints += requiredSkill.level * skillWeight;
      
      // Find user's skill level
      const userSkill = userSkills.find(s => s.name === requiredSkill.name);
      
      // Calculate earned points
      if (userSkill) {
        // Cap user skill level at the required level
        const effectiveSkillLevel = Math.min(userSkill.level, requiredSkill.level);
        earnedPoints += effectiveSkillLevel * skillWeight;
      }
    });
    
    // Calculate percentage
    return totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;
  };

  // Get skills gap (skills that need improvement)
  const getSkillsGap = () => {
    const career = careerSkillsData[selectedCareer as keyof typeof careerSkillsData];
    if (!career) return [];

    return career.requiredSkills.map(requiredSkill => {
      const userSkill = userSkills.find(s => s.name === requiredSkill.name);
      const userLevel = userSkill ? userSkill.level : 0;
      const gap = requiredSkill.level - userLevel;
      
      return {
        ...requiredSkill,
        userLevel,
        gap: gap > 0 ? gap : 0,
        status: userLevel >= requiredSkill.level ? 'met' : userLevel > 0 ? 'partial' : 'missing'
      };
    }).sort((a, b) => {
      // Sort by importance first, then by gap size
      if (a.importance !== b.importance) {
        return a.importance === 'High' ? -1 : b.importance === 'High' ? 1 : 0;
      }
      return b.gap - a.gap;
    });
  };

  // Get skills that match the requirements
  const getMatchingSkills = () => {
    return getSkillsGap().filter(skill => skill.status === 'met');
  };

  // Get skills that partially match the requirements
  const getPartialSkills = () => {
    return getSkillsGap().filter(skill => skill.status === 'partial');
  };

  // Get skills that are completely missing
  const getMissingSkills = () => {
    return getSkillsGap().filter(skill => skill.status === 'missing');
  };

  // Get top recommendations based on skill gaps
  const getTopRecommendations = () => {
    const career = careerSkillsData[selectedCareer as keyof typeof careerSkillsData];
    if (!career) return [];
    
    // Get skills with the largest gaps and highest importance
    const prioritySkills = getSkillsGap()
      .filter(skill => skill.gap > 0)
      .sort((a, b) => {
        if (a.importance !== b.importance) {
          return a.importance === 'High' ? -1 : b.importance === 'High' ? 1 : 0;
        }
        return b.gap - a.gap;
      })
      .slice(0, 3)
      .map(skill => skill.name);
    
    // Find courses that cover the priority skills
    return career.recommendations.filter(recommendation => 
      recommendation.skillsCovered.some(skill => prioritySkills.includes(skill))
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      
      <main className="flex-grow py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Skill Gap Analyzer</h1>
            <p className="mt-1 text-gray-500">
              Compare your skills to career requirements and get personalized recommendations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main content area - 2/3 width */}
            <div className="md:col-span-2 space-y-8">
              {/* Career selector */}
              <Card>
                <CardHeader>
                  <CardTitle>Select a Career Path</CardTitle>
                  <CardDescription>
                    Choose the career you want to analyze your skills against
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Select value={selectedCareer} onValueChange={setSelectedCareer}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a career" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(careerSkillsData).map(([id, career]) => (
                        <SelectItem key={id} value={id}>
                          {career.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
              
              {/* Skill gap analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Skill Gap Analysis for {careerData.title}</CardTitle>
                  <CardDescription>
                    Compare your current skills with what's required for this role
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {/* Overall match */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Overall Skills Match</h3>
                        <span className="text-lg font-bold">{calculateOverallMatch()}%</span>
                      </div>
                      <Progress value={calculateOverallMatch()} className="h-3" />
                      <p className="text-sm text-gray-500 mt-2">
                        {calculateOverallMatch() >= 80 ? (
                          "Excellent match! You have most of the skills needed for this role."
                        ) : calculateOverallMatch() >= 60 ? (
                          "Good match. You have many of the required skills, but there's room for improvement."
                        ) : calculateOverallMatch() >= 40 ? (
                          "You have some of the required skills, but significant gaps remain."
                        ) : (
                          "You need to develop most of the key skills for this role."
                        )}
                      </p>
                    </div>
                    
                    <Separator />
                    
                    {/* Skills breakdown */}
                    <Tabs defaultValue="gaps">
                      <TabsList className="grid grid-cols-3 mb-6">
                        <TabsTrigger value="gaps">All Skills</TabsTrigger>
                        <TabsTrigger value="matching">
                          Matching <Badge className="ml-1 bg-green-100 text-green-800">{getMatchingSkills().length}</Badge>
                        </TabsTrigger>
                        <TabsTrigger value="missing">
                          Missing <Badge className="ml-1 bg-red-100 text-red-800">{getMissingSkills().length}</Badge>
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="gaps">
                        <div className="space-y-4">
                          {getSkillsGap().map((skill, index) => (
                            <div key={index} className="space-y-2">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                  <h4 className="font-medium">{skill.name}</h4>
                                  <Badge className="ml-2" variant={skill.importance === 'High' ? 'default' : 'secondary'}>
                                    {skill.importance}
                                  </Badge>
                                </div>
                                <div className="flex items-center">
                                  {skill.status === 'met' ? (
                                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                                  ) : skill.status === 'partial' ? (
                                    <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                                  ) : (
                                    <XCircle className="h-5 w-5 text-red-500 mr-2" />
                                  )}
                                  <span className="text-sm font-medium">
                                    {skill.userLevel} / {skill.level}
                                  </span>
                                </div>
                              </div>
                              <div className="flex h-2 overflow-hidden bg-gray-200 rounded">
                                <div 
                                  className="h-2 bg-primary" 
                                  style={{ width: `${(skill.userLevel / skill.level) * 100}%` }}
                                ></div>
                              </div>
                              <p className="text-sm text-gray-500">
                                {skill.status === 'met' ? (
                                  "You meet or exceed the required level for this skill!"
                                ) : skill.status === 'partial' ? (
                                  `You need to improve your ${skill.name} skills by ${skill.gap} levels.`
                                ) : (
                                  `You need to learn ${skill.name} for this role.`
                                )}
                              </p>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="matching">
                        {getMatchingSkills().length > 0 ? (
                          <div className="space-y-4">
                            {getMatchingSkills().map((skill, index) => (
                              <div key={index} className="p-4 bg-green-50 rounded-lg border border-green-100">
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center">
                                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                                    <h4 className="font-medium">{skill.name}</h4>
                                    <Badge className="ml-2" variant={skill.importance === 'High' ? 'default' : 'secondary'}>
                                      {skill.importance}
                                    </Badge>
                                  </div>
                                  <span className="text-sm font-medium">
                                    {skill.userLevel} / {skill.level}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600 mt-2">
                                  You meet or exceed the required level for this skill!
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <CheckCircle className="h-12 w-12 text-gray-300 mx-auto" />
                            <h3 className="mt-2 text-lg font-medium text-gray-900">No matching skills yet</h3>
                            <p className="mt-1 text-gray-500">
                              You haven't reached the required level for any skills yet.
                            </p>
                          </div>
                        )}
                      </TabsContent>
                      
                      <TabsContent value="missing">
                        {getMissingSkills().length > 0 ? (
                          <div className="space-y-4">
                            {getMissingSkills().map((skill, index) => (
                              <div key={index} className="p-4 bg-red-50 rounded-lg border border-red-100">
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center">
                                    <XCircle className="h-5 w-5 text-red-500 mr-2" />
                                    <h4 className="font-medium">{skill.name}</h4>
                                    <Badge className="ml-2" variant={skill.importance === 'High' ? 'default' : 'secondary'}>
                                      {skill.importance}
                                    </Badge>
                                  </div>
                                  <span className="text-sm font-medium">
                                    0 / {skill.level}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600 mt-2">
                                  You need to learn this skill for the role.
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
                            <h3 className="mt-2 text-lg font-medium text-gray-900">No missing skills!</h3>
                            <p className="mt-1 text-gray-500">
                              You have at least some level in all required skills.
                            </p>
                          </div>
                        )}
                      </TabsContent>
                    </Tabs>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Sidebar - 1/3 width */}
            <div className="space-y-8">
              {/* Skill summary */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Skill Summary</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <span className="text-sm">Skills Met</span>
                      </div>
                      <span className="font-medium">{getMatchingSkills().length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                        <span className="text-sm">Skills Partial</span>
                      </div>
                      <span className="font-medium">{getPartialSkills().length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <XCircle className="h-5 w-5 text-red-500 mr-2" />
                        <span className="text-sm">Skills Missing</span>
                      </div>
                      <span className="font-medium">{getMissingSkills().length}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <p className="text-sm text-gray-500">
                    Based on {careerData.requiredSkills.length} required skills for {careerData.title}
                  </p>
                </CardFooter>
              </Card>
              
              {/* Learning recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Courses</CardTitle>
                  <CardDescription>
                    Courses to help you bridge your skill gaps
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {getTopRecommendations().length > 0 ? (
                    <div className="space-y-4">
                      {getTopRecommendations().map((course, index) => (
                        <div key={index} className="border rounded-lg overflow-hidden">
                          <div className="p-4">
                            <h3 className="font-medium">{course.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {course.provider} • {course.duration} • {course.cost}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-3">
                              {course.skillsCovered.map((skill, i) => (
                                <Badge key={i} variant="outline" className="bg-blue-50">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                            <a 
                              href={course.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="mt-4 inline-flex items-center text-sm text-primary hover:underline"
                            >
                              Learn more <ExternalLink className="ml-1 h-3 w-3" />
                            </a>
                          </div>
                        </div>
                      ))}
                      <Button className="w-full flex items-center justify-center mt-2">
                        View All Recommendations <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <GraduationCap className="mx-auto h-8 w-8 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No recommendations yet</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Select a career path to see personalized course recommendations.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Update Skills */}
              <Card>
                <CardHeader>
                  <CardTitle>Update Your Skills</CardTitle>
                  <CardDescription>
                    Ensure your skill profile is up to date
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <BarChart2 className="mx-auto h-8 w-8 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">
                      Keep your skills up to date to get the most accurate analysis
                    </p>
                    <Button className="mt-4">Update Skills</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SkillAnalyzer;
