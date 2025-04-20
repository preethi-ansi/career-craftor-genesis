
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MessageSquare, Search, ThumbsUp, ThumbsDown, Tag, PlusCircle, Clock, Filter, HelpCircle } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

// Mock data for questions
const mockQuestions = [
  {
    id: '1',
    title: 'What skills do I need to become a data scientist in 2025?',
    content: 'I\'m a computer science student looking to become a data scientist after graduation. What skills and technologies should I focus on learning to be competitive in the market by 2025?',
    author: {
      name: 'Alex Chen',
      avatar: 'https://github.com/shadcn.png',
      role: 'Student'
    },
    tags: ['Data Science', 'Career Planning', 'Skills'],
    answers: 5,
    votes: 12,
    createdAt: '2 days ago',
    views: 234,
  },
  {
    id: '2',
    title: 'How to negotiate salary for a new grad position?',
    content: 'I just received my first job offer as a software engineer. The salary is a bit lower than I expected based on my research. What\'s the best approach to negotiate without risking the offer?',
    author: {
      name: 'Sarah Johnson',
      avatar: '/assets/profile-2.jpg',
      role: 'Graduate'
    },
    tags: ['Salary Negotiation', 'New Grad', 'Software Engineering'],
    answers: 8,
    votes: 24,
    createdAt: '3 days ago',
    views: 542,
  },
  {
    id: '3',
    title: 'Career switch from marketing to UX design at 30 - is it too late?',
    content: 'I\'ve been working in marketing for 7 years but I\'m really interested in UX design. Is 30 too late to switch careers? What\'s the best approach for someone with my background?',
    author: {
      name: 'Michael Torres',
      avatar: null,
      role: 'Graduate'
    },
    tags: ['Career Change', 'UX Design', 'Marketing'],
    answers: 12,
    votes: 35,
    createdAt: '1 week ago',
    views: 678,
  },
  {
    id: '4',
    title: 'What certifications are valuable for cloud engineering?',
    content: 'I want to specialize in cloud engineering. Which certifications are most valuable for job prospects between AWS, Azure, and Google Cloud?',
    author: {
      name: 'Priya Sharma',
      avatar: '/assets/profile-3.jpg',
      role: 'Student'
    },
    tags: ['Cloud Computing', 'Certifications', 'AWS', 'Azure'],
    answers: 6,
    votes: 18,
    createdAt: '5 days ago',
    views: 412,
  },
  {
    id: '5',
    title: 'How important is GitHub portfolio for frontend development jobs?',
    content: 'I\'m applying for frontend developer positions. How much emphasis do employers put on GitHub portfolios versus traditional resumes? What should I include in my portfolio?',
    author: {
      name: 'David Clark',
      avatar: null,
      role: 'Graduate'
    },
    tags: ['Frontend Development', 'Portfolio', 'Job Search'],
    answers: 3,
    votes: 9,
    createdAt: '1 day ago',
    views: 187,
  },
];

// Mock data for tags
const mockTags = [
  { name: 'Career Planning', count: 145 },
  { name: 'Software Engineering', count: 237 },
  { name: 'Data Science', count: 189 },
  { name: 'UX Design', count: 124 },
  { name: 'Resume Building', count: 167 },
  { name: 'Interview Preparation', count: 213 },
  { name: 'Networking', count: 98 },
  { name: 'Salary Negotiation', count: 113 },
  { name: 'Remote Work', count: 156 },
  { name: 'Career Change', count: 142 },
];

const Community = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('recent');
  const [openAskQuestion, setOpenAskQuestion] = useState(false);

  // Filter questions based on search and filters
  const filteredQuestions = mockQuestions.filter((question) => {
    // Search filter
    if (searchQuery && !question.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !question.content.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Tags filter
    if (selectedTags.length > 0 && !question.tags.some(tag => selectedTags.includes(tag))) {
      return false;
    }
    
    return true;
  });

  // Sort questions based on selected sort option
  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    if (sortBy === 'votes') {
      return b.votes - a.votes;
    }
    if (sortBy === 'answers') {
      return b.answers - a.answers;
    }
    if (sortBy === 'views') {
      return b.views - a.views;
    }
    // Default: sort by recency
    return mockQuestions.indexOf(a) - mockQuestions.indexOf(b);
  });

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      
      <main className="flex-grow py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page header */}
          <div className="mb-8 md:flex md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Q&A Community</h1>
              <p className="mt-1 text-gray-500">
                Ask questions, share knowledge, and connect with peers
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Dialog open={openAskQuestion} onOpenChange={setOpenAskQuestion}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <PlusCircle className="h-4 w-4" />
                    Ask a Question
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Ask a Question</DialogTitle>
                    <DialogDescription>
                      Share your career question with the community
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label htmlFor="question-title" className="text-sm font-medium">
                        Question Title
                      </label>
                      <Input
                        id="question-title"
                        placeholder="e.g., What skills should I learn for data science?"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="question-details" className="text-sm font-medium">
                        Question Details
                      </label>
                      <Textarea
                        id="question-details"
                        placeholder="Provide more context and details about your question..."
                        rows={6}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="question-tags" className="text-sm font-medium">
                        Tags
                      </label>
                      <Input
                        id="question-tags"
                        placeholder="e.g., career-planning, data-science (comma separated)"
                      />
                      <p className="text-xs text-gray-500">
                        Add up to 5 tags to categorize your question
                      </p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setOpenAskQuestion(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setOpenAskQuestion(false)}>
                      Post Question
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main content - 3/4 width */}
            <div className="lg:col-span-3 space-y-6">
              {/* Search and filter */}
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search questions"
                          className="pl-9"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="recent">Most Recent</SelectItem>
                          <SelectItem value="votes">Most Votes</SelectItem>
                          <SelectItem value="answers">Most Answers</SelectItem>
                          <SelectItem value="views">Most Views</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  {selectedTags.length > 0 && (
                    <div className="mt-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-medium text-gray-700">
                          Active Filters:
                        </span>
                        {selectedTags.map((tag) => (
                          <Badge
                            key={tag}
                            className="cursor-pointer"
                            variant="secondary"
                            onClick={() => toggleTag(tag)}
                          >
                            {tag} ×
                          </Badge>
                        ))}
                        <Button
                          variant="link"
                          size="sm"
                          className="text-xs h-auto p-0"
                          onClick={() => setSelectedTags([])}
                        >
                          Clear all
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Question Tabs */}
              <Tabs defaultValue="all">
                <div className="flex justify-between items-center mb-4">
                  <TabsList>
                    <TabsTrigger value="all">All Questions</TabsTrigger>
                    <TabsTrigger value="trending">Trending</TabsTrigger>
                    <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
                  </TabsList>
                  <div className="text-sm text-gray-500">
                    {sortedQuestions.length} questions
                  </div>
                </div>
                
                {/* Questions list - the same for all tabs in this simplified implementation */}
                <TabsContent value="all" className="space-y-4">
                  {sortedQuestions.length > 0 ? (
                    sortedQuestions.map((question) => (
                      <Card key={question.id} className="transition-all hover:shadow-md">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="flex flex-col items-center space-y-2">
                              <Button variant="outline" size="icon" className="h-8 w-8">
                                <ThumbsUp className="h-4 w-4" />
                              </Button>
                              <span className="text-sm font-medium">{question.votes}</span>
                              <Button variant="outline" size="icon" className="h-8 w-8">
                                <ThumbsDown className="h-4 w-4" />
                              </Button>
                            </div>
                            
                            <div className="flex-1">
                              <Link to={`/community/question/${question.id}`} className="hover:underline">
                                <h3 className="text-lg font-semibold text-gray-900">{question.title}</h3>
                              </Link>
                              <p className="mt-2 text-gray-600 line-clamp-2">{question.content}</p>
                              
                              <div className="flex flex-wrap gap-2 mt-4">
                                {question.tags.map((tag) => (
                                  <Badge 
                                    key={tag} 
                                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                                    className="cursor-pointer"
                                    onClick={() => toggleTag(tag)}
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              
                              <div className="flex flex-wrap justify-between items-center mt-4">
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                  <div className="flex items-center">
                                    <MessageSquare className="h-4 w-4 mr-1" />
                                    <span>{question.answers} answers</span>
                                  </div>
                                  <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-1" />
                                    <span>{question.createdAt}</span>
                                  </div>
                                </div>
                                
                                <div className="flex items-center mt-2 sm:mt-0">
                                  <Avatar className="h-6 w-6 mr-2">
                                    <AvatarImage src={question.author.avatar || undefined} />
                                    <AvatarFallback>{question.author.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <span className="text-sm font-medium">{question.author.name}</span>
                                    <span className="text-xs text-gray-500 ml-2">{question.author.role}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <MessageSquare className="h-12 w-12 text-gray-400 mx-auto" />
                      <h3 className="mt-2 text-lg font-medium text-gray-900">No questions found</h3>
                      <p className="mt-1 text-gray-500">
                        Try adjusting your search or filters to find what you're looking for.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedTags([]);
                        }}
                        className="mt-6"
                      >
                        Reset Filters
                      </Button>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="trending">
                  {/* In a real app, this would show trending questions */}
                  <div className="text-center py-12">
                    <MessageSquare className="h-12 w-12 text-gray-400 mx-auto" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">Trending questions</h3>
                    <p className="mt-1 text-gray-500">
                      This feature will be available soon!
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="unanswered">
                  {/* In a real app, this would show unanswered questions */}
                  <div className="text-center py-12">
                    <MessageSquare className="h-12 w-12 text-gray-400 mx-auto" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">Unanswered questions</h3>
                    <p className="mt-1 text-gray-500">
                      This feature will be available soon!
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Sidebar - 1/4 width */}
            <div className="space-y-6">
              {/* Ask question card */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Need Help?</CardTitle>
                  <CardDescription>
                    Our community is here to help with career questions
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <p className="text-sm text-gray-600">
                    Get answers from experienced professionals and fellow students on career planning, skill development, interviews, and more.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    onClick={() => setOpenAskQuestion(true)}
                  >
                    Ask a Question
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Chatbot assistance */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Career Advisor Bot</CardTitle>
                  <CardDescription>
                    Get instant answers and guidance
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="bg-primary/5 rounded-lg p-4 flex gap-3">
                    <div>
                      <HelpCircle className="h-6 w-6 text-primary" />
                    </div>
                    <p className="text-sm text-gray-600">
                      Our AI assistant can help with quick career questions while you wait for community responses.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Chat with Advisor
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Popular tags */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Popular Tags</CardTitle>
                  <CardDescription>
                    Browse questions by topic
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {mockTags.map((tag) => (
                      <Badge
                        key={tag.name}
                        variant={selectedTags.includes(tag.name) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleTag(tag.name)}
                      >
                        {tag.name}
                        <span className="ml-1 text-xs opacity-70">({tag.count})</span>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Community stats */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Community Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">1,234</p>
                      <p className="text-sm text-gray-500">Questions</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">5,678</p>
                      <p className="text-sm text-gray-500">Answers</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">987</p>
                      <p className="text-sm text-gray-500">Members</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">92%</p>
                      <p className="text-sm text-gray-500">Questions Resolved</p>
                    </div>
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

export default Community;
