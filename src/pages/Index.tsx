
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BookOpen, BarChart2, FileText, MessageSquare, GraduationCap, ArrowRight } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const Index = () => {
  const features = [
    {
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      title: "Career Explorer",
      description: "Browse through various career paths, understand job requirements, and discover growth opportunities.",
      link: "/careers"
    },
    {
      icon: <BarChart2 className="h-8 w-8 text-primary" />,
      title: "Skill Gap Analysis",
      description: "Identify missing skills required for your dream career and get personalized recommendations.",
      link: "/skills"
    },
    {
      icon: <FileText className="h-8 w-8 text-primary" />,
      title: "Resume Builder",
      description: "Create professional resumes with our easy-to-use templates and export them as PDFs.",
      link: "/resume"
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-primary" />,
      title: "Q&A Community",
      description: "Connect with peers and industry professionals to get answers to your career questions.",
      link: "/community"
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-primary" />,
      title: "Mock Interviews",
      description: "Practice with AI-generated interview questions tailored to your target company and role.",
      link: "/interview"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero section */}
        <section className="relative overflow-hidden bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-12 md:py-20">
              <div className="text-center">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
                  <span className="block">Craft Your Perfect</span>
                  <span className="block text-primary">Career Journey</span>
                </h1>
                <p className="mt-6 max-w-lg mx-auto text-xl text-gray-500">
                  Explore careers, analyze skills, build your resume, and prepare for interviews - all in one place.
                </p>
                <div className="mt-10 flex justify-center gap-4">
                  <Link to="/register">
                    <Button size="lg" className="font-semibold">
                      Get Started
                    </Button>
                  </Link>
                  <Link to="/careers">
                    <Button size="lg" variant="outline" className="font-semibold">
                      Explore Careers
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 hidden lg:block">
            <div className="w-80 h-80 bg-primary/5 rounded-full"></div>
          </div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 hidden lg:block">
            <div className="w-60 h-60 bg-accent/5 rounded-full"></div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Everything You Need to Succeed</h2>
              <p className="mt-4 text-xl text-gray-600">
                Our comprehensive tools to help you at every stage of your career journey
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="feature-card">
                  <div className="p-6">
                    <div className="mb-5 inline-flex items-center justify-center p-2 bg-primary/10 rounded-lg">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-600 mb-4">{feature.description}</p>
                    <Link to={feature.link} className="text-primary font-medium inline-flex items-center">
                      Learn more <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">What Our Users Say</h2>
              <p className="mt-4 text-xl text-gray-600">
                Hear from students and graduates who transformed their career paths
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="p-6">
                <div className="flex items-center mb-4">
                  <div className="rounded-full bg-gray-200 w-12 h-12 flex items-center justify-center mr-4">
                    <span className="font-bold text-gray-700">SL</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Sarah L.</h4>
                    <p className="text-sm text-gray-500">Computer Science Student</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "The skill gap analysis helped me identify exactly what I needed to learn to land my dream internship at a tech company."
                </p>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center mb-4">
                  <div className="rounded-full bg-gray-200 w-12 h-12 flex items-center justify-center mr-4">
                    <span className="font-bold text-gray-700">MK</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Michael K.</h4>
                    <p className="text-sm text-gray-500">Business Graduate</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "The resume builder and interview practice helped me gain confidence and land multiple job offers within weeks."
                </p>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center mb-4">
                  <div className="rounded-full bg-gray-200 w-12 h-12 flex items-center justify-center mr-4">
                    <span className="font-bold text-gray-700">JP</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Jessica P.</h4>
                    <p className="text-sm text-gray-500">Psychology Major</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "I discovered career paths I hadn't even considered before. The community provided great advice for transitioning into UX research."
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="gradient-bg py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Craft Your Career?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of students and graduates who are building successful careers with Career Craftor.
            </p>
            <Link to="/register">
              <Button size="lg" variant="secondary" className="font-semibold">
                Sign Up Now — It's Free
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
