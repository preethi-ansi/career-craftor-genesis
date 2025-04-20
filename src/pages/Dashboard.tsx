
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, BarChart2, FileText, MessageSquare, GraduationCap, Star, Award } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const Dashboard = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Mock data for dashboard
  const recommendedCareers = [
    { id: 'software-engineer', title: 'Software Engineer', match: 92 },
    { id: 'data-scientist', title: 'Data Scientist', match: 87 },
    { id: 'ux-designer', title: 'UX Designer', match: 75 },
  ];
  
  const recentActivities = [
    { type: 'Saved Career', title: 'Product Manager', date: '2 days ago' },
    { type: 'Generated Resume', template: 'Professional Clean', date: '3 days ago' },
    { type: 'Took Interview Practice', company: 'Google', role: 'Software Engineer', date: '1 week ago' },
  ];

  const upcomingInterviews = [
    { company: 'Microsoft', role: 'Software Engineer', date: '2023-05-20', status: 'Scheduled' },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-sm text-gray-500">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name || 'User'}!</h1>
            <p className="text-gray-600 mt-1">Let's continue crafting your career journey.</p>
          </div>
          
          {/* Dashboard grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content - 2/3 width */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>
                    Continue where you left off or start something new
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Link to="/careers">
                      <Button variant="outline" className="w-full h-24 flex flex-col gap-2">
                        <BookOpen className="h-6 w-6" />
                        <span>Explore Careers</span>
                      </Button>
                    </Link>
                    <Link to="/skills">
                      <Button variant="outline" className="w-full h-24 flex flex-col gap-2">
                        <BarChart2 className="h-6 w-6" />
                        <span>Analyze Skills</span>
                      </Button>
                    </Link>
                    <Link to="/resume">
                      <Button variant="outline" className="w-full h-24 flex flex-col gap-2">
                        <FileText className="h-6 w-6" />
                        <span>Build Resume</span>
                      </Button>
                    </Link>
                    <Link to="/interview">
                      <Button variant="outline" className="w-full h-24 flex flex-col gap-2">
                        <GraduationCap className="h-6 w-6" />
                        <span>Practice Interview</span>
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
              
              {/* Career recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Careers</CardTitle>
                  <CardDescription>
                    Based on your profile, skills, and interests
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {recommendedCareers.map((career) => (
                      <div key={career.id} className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{career.title}</h3>
                          <div className="flex items-center mt-1">
                            <Star className="h-4 w-4 text-yellow-400 mr-1" />
                            <p className="text-sm text-gray-500">{career.match}% match</p>
                          </div>
                        </div>
                        <Link to={`/careers/${career.id}`}>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="bg-primary/10 rounded-full p-2">
                          <Award className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{activity.type}</h3>
                          <p className="text-sm text-gray-600">
                            {activity.title || activity.template || `${activity.company} - ${activity.role}`}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">{activity.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Sidebar - 1/3 width */}
            <div className="space-y-8">
              {/* Profile completion */}
              <Card>
                <CardHeader>
                  <CardTitle>Profile Completion</CardTitle>
                </CardHeader>
                <CardContent>
                  <Progress value={65} className="h-2 mb-2" />
                  <p className="text-sm text-gray-600">
                    Your profile is 65% complete. Add more skills and education details to improve your recommendations.
                  </p>
                  <Button className="w-full mt-4" size="sm">
                    Complete Profile
                  </Button>
                </CardContent>
              </Card>
              
              {/* Upcoming interviews */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Interviews</CardTitle>
                </CardHeader>
                <CardContent>
                  {upcomingInterviews.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingInterviews.map((interview, index) => (
                        <div key={index} className="rounded-lg border p-4">
                          <h3 className="font-medium">{interview.company}</h3>
                          <p className="text-sm text-gray-600">{interview.role}</p>
                          <div className="flex justify-between items-center mt-2">
                            <p className="text-xs text-gray-500">{interview.date}</p>
                            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                              {interview.status}
                            </span>
                          </div>
                          <Button variant="outline" size="sm" className="w-full mt-3">
                            Prepare Now
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <GraduationCap className="mx-auto h-8 w-8 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No upcoming interviews</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Schedule mock interviews to practice for your dream role.
                      </p>
                      <div className="mt-6">
                        <Button size="sm">Schedule Mock Interview</Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Community Questions */}
              <Card>
                <CardHeader>
                  <CardTitle>Community Highlights</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="trending">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="trending">Trending</TabsTrigger>
                      <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
                    </TabsList>
                    <TabsContent value="trending" className="mt-4">
                      <div className="space-y-4">
                        <div className="border-l-2 border-primary pl-3">
                          <h3 className="text-sm font-medium">What skills do I need for data science?</h3>
                          <p className="text-xs text-gray-500 mt-1">15 answers · 2 days ago</p>
                        </div>
                        <div className="border-l-2 border-primary pl-3">
                          <h3 className="text-sm font-medium">How to negotiate salary for a new grad position?</h3>
                          <p className="text-xs text-gray-500 mt-1">23 answers · 3 days ago</p>
                        </div>
                      </div>
                      <Link to="/community">
                        <Button variant="link" size="sm" className="mt-4 p-0">
                          View all questions
                        </Button>
                      </Link>
                    </TabsContent>
                    <TabsContent value="unanswered" className="mt-4">
                      <div className="space-y-4">
                        <div className="border-l-2 border-gray-200 pl-3">
                          <h3 className="text-sm font-medium">What certifications are valuable for cloud engineering?</h3>
                          <p className="text-xs text-gray-500 mt-1">0 answers · 8 hours ago</p>
                        </div>
                        <div className="border-l-2 border-gray-200 pl-3">
                          <h3 className="text-sm font-medium">Tips for career transition from marketing to UX?</h3>
                          <p className="text-xs text-gray-500 mt-1">0 answers · 1 day ago</p>
                        </div>
                      </div>
                      <Link to="/community">
                        <Button variant="link" size="sm" className="mt-4 p-0">
                          Answer questions
                        </Button>
                      </Link>
                    </TabsContent>
                  </Tabs>
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

export default Dashboard;
