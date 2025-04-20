
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Search, DollarSign, Briefcase, GraduationCap, TrendingUp, Heart, Star } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

// Mock career data
const careerData = [
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    description: 'Design, develop, and maintain software systems and applications',
    salaryRange: '$70,000 - $150,000',
    educationLevel: 'Bachelor\'s Degree',
    growthRate: 'High',
    demandLevel: 4.8,
    skills: ['Programming', 'Problem Solving', 'Software Design', 'Algorithms'],
    industry: 'Technology',
    isPopular: true,
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    description: 'Analyze and interpret complex data to help organizations make better decisions',
    salaryRange: '$90,000 - $160,000',
    educationLevel: 'Master\'s Degree',
    growthRate: 'Very High',
    demandLevel: 4.9,
    skills: ['Statistics', 'Programming', 'Machine Learning', 'Data Visualization'],
    industry: 'Technology',
    isPopular: true,
  },
  {
    id: 'ux-designer',
    title: 'UX Designer',
    description: 'Create meaningful and relevant experiences for users interacting with products',
    salaryRange: '$65,000 - $130,000',
    educationLevel: 'Bachelor\'s Degree',
    growthRate: 'High',
    demandLevel: 4.5,
    skills: ['User Research', 'Wireframing', 'Prototyping', 'Visual Design'],
    industry: 'Design',
    isPopular: false,
  },
  {
    id: 'digital-marketer',
    title: 'Digital Marketing Manager',
    description: 'Develop and implement marketing strategies across digital channels',
    salaryRange: '$60,000 - $120,000',
    educationLevel: 'Bachelor\'s Degree',
    growthRate: 'Moderate',
    demandLevel: 4.2,
    skills: ['SEO', 'Content Marketing', 'Social Media', 'Analytics'],
    industry: 'Marketing',
    isPopular: true,
  },
  {
    id: 'financial-analyst',
    title: 'Financial Analyst',
    description: 'Analyze financial data and provide recommendations for business decisions',
    salaryRange: '$65,000 - $125,000',
    educationLevel: 'Bachelor\'s Degree',
    growthRate: 'Moderate',
    demandLevel: 4.0,
    skills: ['Financial Modeling', 'Data Analysis', 'Reporting', 'Forecasting'],
    industry: 'Finance',
    isPopular: false,
  },
  {
    id: 'product-manager',
    title: 'Product Manager',
    description: 'Lead the development and launch of products from conception to market',
    salaryRange: '$85,000 - $150,000',
    educationLevel: 'Bachelor\'s Degree',
    growthRate: 'High',
    demandLevel: 4.7,
    skills: ['Product Strategy', 'Market Research', 'User Experience', 'Project Management'],
    industry: 'Technology',
    isPopular: true,
  },
  {
    id: 'nurse-practitioner',
    title: 'Nurse Practitioner',
    description: 'Provide advanced nursing care and primary healthcare services',
    salaryRange: '$90,000 - $140,000',
    educationLevel: 'Master\'s Degree',
    growthRate: 'Very High',
    demandLevel: 4.9,
    skills: ['Clinical Assessment', 'Patient Care', 'Prescribing', 'Healthcare Knowledge'],
    industry: 'Healthcare',
    isPopular: false,
  },
  {
    id: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    description: 'Protect computer systems and networks from security threats',
    salaryRange: '$75,000 - $140,000',
    educationLevel: 'Bachelor\'s Degree',
    growthRate: 'Very High',
    demandLevel: 4.8,
    skills: ['Network Security', 'Threat Analysis', 'Security Tools', 'Vulnerability Assessment'],
    industry: 'Technology',
    isPopular: true,
  },
  {
    id: 'hr-manager',
    title: 'HR Manager',
    description: 'Oversee human resources activities and policies within an organization',
    salaryRange: '$70,000 - $120,000',
    educationLevel: 'Bachelor\'s Degree',
    growthRate: 'Moderate',
    demandLevel: 3.9,
    skills: ['Recruitment', 'Employee Relations', 'Performance Management', 'Compliance'],
    industry: 'Human Resources',
    isPopular: false,
  },
];

const CareerExplorer = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [educationFilter, setEducationFilter] = useState('all');
  const [demandFilter, setDemandFilter] = useState([3.0]);

  // Filter careers based on search and filters
  const filteredCareers = careerData.filter((career) => {
    // Search filter
    if (searchQuery && !career.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !career.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Industry filter
    if (industryFilter !== 'all' && career.industry !== industryFilter) {
      return false;
    }
    
    // Education filter
    if (educationFilter !== 'all' && career.educationLevel !== educationFilter) {
      return false;
    }
    
    // Demand filter
    if (career.demandLevel < demandFilter[0]) {
      return false;
    }
    
    return true;
  });

  // Get unique industries for filter
  const industries = Array.from(new Set(careerData.map((career) => career.industry)));
  
  // Get unique education levels for filter
  const educationLevels = Array.from(new Set(careerData.map((career) => career.educationLevel)));

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      
      <main className="flex-grow py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page header */}
          <div className="mb-8 md:flex md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Career Explorer</h1>
              <p className="mt-1 text-gray-500">
                Discover career paths, requirements, and opportunities
              </p>
            </div>
          </div>
          
          {/* Filters and search */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              <div className="md:col-span-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Search Careers
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by title or keywords"
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Industry
                </label>
                <Select value={industryFilter} onValueChange={setIndustryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Industries</SelectItem>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Education
                </label>
                <Select value={educationFilter} onValueChange={setEducationFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Education" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    {educationLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Demand Level: {demandFilter[0]}
                </label>
                <Slider
                  value={demandFilter}
                  min={3.0}
                  max={5.0}
                  step={0.1}
                  onValueChange={setDemandFilter}
                />
              </div>
              <div className="md:col-span-1">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setIndustryFilter('all');
                    setEducationFilter('all');
                    setDemandFilter([3.0]);
                  }}
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>
          
          {/* Career listings */}
          <Tabs defaultValue="grid">
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-sm text-gray-500">
                  Showing {filteredCareers.length} of {careerData.length} careers
                </p>
              </div>
              <TabsList>
                <TabsTrigger value="grid">Grid</TabsTrigger>
                <TabsTrigger value="list">List</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="grid">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCareers.map((career) => (
                  <Card key={career.id} className="transition-all hover:shadow-md">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">{career.title}</CardTitle>
                        {career.isPopular && (
                          <Badge variant="secondary" className="ml-2">
                            <Star className="h-3 w-3 mr-1" /> Popular
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="line-clamp-2">{career.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 text-gray-500 mr-2" />
                          <span className="text-sm text-gray-600">{career.salaryRange}</span>
                        </div>
                        <div className="flex items-center">
                          <GraduationCap className="h-4 w-4 text-gray-500 mr-2" />
                          <span className="text-sm text-gray-600">{career.educationLevel}</span>
                        </div>
                        <div className="flex items-center">
                          <TrendingUp className="h-4 w-4 text-gray-500 mr-2" />
                          <span className="text-sm text-gray-600">Growth: {career.growthRate}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {career.skills.slice(0, 3).map((skill, i) => (
                            <Badge key={i} variant="outline" className="bg-gray-50">
                              {skill}
                            </Badge>
                          ))}
                          {career.skills.length > 3 && (
                            <Badge variant="outline" className="bg-gray-50">
                              +{career.skills.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link to={`/careers/${career.id}`} className="w-full">
                        <Button className="w-full">View Details</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="list">
              <div className="space-y-4">
                {filteredCareers.map((career) => (
                  <Card key={career.id} className="transition-all hover:shadow-md">
                    <div className="flex flex-col md:flex-row md:items-center p-6">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <h3 className="text-lg font-semibold">{career.title}</h3>
                          {career.isPopular && (
                            <Badge variant="secondary" className="ml-2">
                              <Star className="h-3 w-3 mr-1" /> Popular
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-600 mt-1">{career.description}</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-4 mt-3">
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 text-gray-500 mr-2" />
                            <span className="text-sm text-gray-600">{career.salaryRange}</span>
                          </div>
                          <div className="flex items-center">
                            <GraduationCap className="h-4 w-4 text-gray-500 mr-2" />
                            <span className="text-sm text-gray-600">{career.educationLevel}</span>
                          </div>
                          <div className="flex items-center">
                            <TrendingUp className="h-4 w-4 text-gray-500 mr-2" />
                            <span className="text-sm text-gray-600">Growth: {career.growthRate}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {career.skills.map((skill, i) => (
                            <Badge key={i} variant="outline" className="bg-gray-50">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mt-4 md:mt-0">
                        <Button variant="outline" size="sm">
                          <Heart className="h-4 w-4 mr-1" /> Save
                        </Button>
                        <Link to={`/careers/${career.id}`}>
                          <Button size="sm">View Details</Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {filteredCareers.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No careers found</h3>
              <p className="mt-1 text-gray-500">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setIndustryFilter('all');
                  setEducationFilter('all');
                  setDemandFilter([3.0]);
                }}
                className="mt-6"
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CareerExplorer;
