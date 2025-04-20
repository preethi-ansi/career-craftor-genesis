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
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  FileText,
  Download,
  Plus,
  Trash2,
  FileDown,
  Eye,
  CheckCircle,
  PencilLine,
  Layout,
  User
} from 'lucide-react';
import { Briefcase, GraduationCap } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

// Mock resume templates
const resumeTemplates = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'Classic and formal design suitable for traditional industries',
    thumbnail: '/assets/resume-professional.jpg'
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and minimal design with a contemporary feel',
    thumbnail: '/assets/resume-modern.jpg'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Distinctive design for creative professionals',
    thumbnail: '/assets/resume-creative.jpg'
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Sophisticated design for senior executives and leadership roles',
    thumbnail: '/assets/resume-executive.jpg'
  }
];

const ResumeBuilder = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [selectedTemplate, setSelectedTemplate] = useState('professional');
  const [resumeData, setResumeData] = useState({
    personal: {
      name: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      summary: ''
    },
    experience: [
      { id: '1', title: '', company: '', location: '', startDate: '', endDate: '', current: false, description: '' }
    ],
    education: [
      { id: '1', degree: '', school: '', location: '', startDate: '', endDate: '', description: '' }
    ],
    skills: [
      { id: '1', name: '', level: 'Intermediate' }
    ],
    projects: [
      { id: '1', title: '', description: '', technologies: '', link: '' }
    ]
  });
  
  // Update personal info
  const updatePersonal = (field: string, value: string) => {
    setResumeData({
      ...resumeData,
      personal: {
        ...resumeData.personal,
        [field]: value
      }
    });
  };
  
  // Add new experience entry
  const addExperience = () => {
    const newId = (resumeData.experience.length + 1).toString();
    setResumeData({
      ...resumeData,
      experience: [
        ...resumeData.experience,
        { id: newId, title: '', company: '', location: '', startDate: '', endDate: '', current: false, description: '' }
      ]
    });
  };
  
  // Update experience entry
  const updateExperience = (id: string, field: string, value: string | boolean) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    });
  };
  
  // Remove experience entry
  const removeExperience = (id: string) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.filter(exp => exp.id !== id)
    });
  };
  
  // Add new education entry
  const addEducation = () => {
    const newId = (resumeData.education.length + 1).toString();
    setResumeData({
      ...resumeData,
      education: [
        ...resumeData.education,
        { id: newId, degree: '', school: '', location: '', startDate: '', endDate: '', description: '' }
      ]
    });
  };
  
  // Update education entry
  const updateEducation = (id: string, field: string, value: string) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    });
  };
  
  // Remove education entry
  const removeEducation = (id: string) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.filter(edu => edu.id !== id)
    });
  };
  
  // Add new skill
  const addSkill = () => {
    const newId = (resumeData.skills.length + 1).toString();
    setResumeData({
      ...resumeData,
      skills: [
        ...resumeData.skills,
        { id: newId, name: '', level: 'Intermediate' }
      ]
    });
  };
  
  // Update skill
  const updateSkill = (id: string, field: string, value: string) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.map(skill => 
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    });
  };
  
  // Remove skill
  const removeSkill = (id: string) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.filter(skill => skill.id !== id)
    });
  };
  
  // Add new project
  const addProject = () => {
    const newId = (resumeData.projects.length + 1).toString();
    setResumeData({
      ...resumeData,
      projects: [
        ...resumeData.projects,
        { id: newId, title: '', description: '', technologies: '', link: '' }
      ]
    });
  };
  
  // Update project
  const updateProject = (id: string, field: string, value: string) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.map(project => 
        project.id === id ? { ...project, [field]: value } : project
      )
    });
  };
  
  // Remove project
  const removeProject = (id: string) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.filter(project => project.id !== id)
    });
  };
  
  // Navigate to next section
  const nextSection = () => {
    switch (activeTab) {
      case 'personal':
        setActiveTab('experience');
        break;
      case 'experience':
        setActiveTab('education');
        break;
      case 'education':
        setActiveTab('skills');
        break;
      case 'skills':
        setActiveTab('projects');
        break;
      case 'projects':
        setActiveTab('preview');
        break;
      default:
        break;
    }
  };
  
  // Navigate to previous section
  const prevSection = () => {
    switch (activeTab) {
      case 'experience':
        setActiveTab('personal');
        break;
      case 'education':
        setActiveTab('experience');
        break;
      case 'skills':
        setActiveTab('education');
        break;
      case 'projects':
        setActiveTab('skills');
        break;
      case 'preview':
        setActiveTab('projects');
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      
      <main className="flex-grow py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Resume Builder</h1>
            <p className="mt-1 text-gray-500">
              Create a professional resume in minutes
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar navigation - 1/4 width */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <nav className="space-y-1">
                    <Button 
                      variant={activeTab === 'personal' ? 'default' : 'ghost'} 
                      className="w-full justify-start"
                      onClick={() => setActiveTab('personal')}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Personal Info
                    </Button>
                    <Button 
                      variant={activeTab === 'experience' ? 'default' : 'ghost'} 
                      className="w-full justify-start"
                      onClick={() => setActiveTab('experience')}
                    >
                      <Briefcase className="mr-2 h-4 w-4" />
                      Experience
                    </Button>
                    <Button 
                      variant={activeTab === 'education' ? 'default' : 'ghost'} 
                      className="w-full justify-start"
                      onClick={() => setActiveTab('education')}
                    >
                      <GraduationCap className="mr-2 h-4 w-4" />
                      Education
                    </Button>
                    <Button 
                      variant={activeTab === 'skills' ? 'default' : 'ghost'} 
                      className="w-full justify-start"
                      onClick={() => setActiveTab('skills')}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Skills
                    </Button>
                    <Button 
                      variant={activeTab === 'projects' ? 'default' : 'ghost'} 
                      className="w-full justify-start"
                      onClick={() => setActiveTab('projects')}
                    >
                      <PencilLine className="mr-2 h-4 w-4" />
                      Projects
                    </Button>
                    <Button 
                      variant={activeTab === 'preview' ? 'default' : 'ghost'} 
                      className="w-full justify-start"
                      onClick={() => setActiveTab('preview')}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                  </nav>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Template</CardTitle>
                  <CardDescription>
                    Choose a resume design
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      {resumeTemplates.map(template => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <div className="mt-4 p-2 border rounded-md bg-gray-50">
                    <div className="aspect-[3/4] bg-gray-200 rounded flex items-center justify-center">
                      <Layout className="h-10 w-10 text-gray-400" />
                    </div>
                    <p className="text-sm font-medium text-center mt-2">
                      {resumeTemplates.find(t => t.id === selectedTemplate)?.name}
                    </p>
                    <p className="text-xs text-gray-500 text-center mt-1">
                      {resumeTemplates.find(t => t.id === selectedTemplate)?.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-2">
                  <Button variant="outline" className="w-full justify-start" disabled={activeTab !== 'preview'}>
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                  <Button variant="outline" className="w-full justify-start" disabled={activeTab !== 'preview'}>
                    <FileDown className="mr-2 h-4 w-4" />
                    Save Resume
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            {/* Main content area - 3/4 width */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {activeTab === 'personal' && 'Personal Information'}
                    {activeTab === 'experience' && 'Work Experience'}
                    {activeTab === 'education' && 'Education'}
                    {activeTab === 'skills' && 'Skills'}
                    {activeTab === 'projects' && 'Projects'}
                    {activeTab === 'preview' && 'Resume Preview'}
                  </CardTitle>
                  <CardDescription>
                    {activeTab === 'personal' && 'Add your contact information and professional summary'}
                    {activeTab === 'experience' && 'Add your work history, starting with the most recent position'}
                    {activeTab === 'education' && 'Add your educational background'}
                    {activeTab === 'skills' && 'List your relevant skills and proficiency levels'}
                    {activeTab === 'projects' && 'Showcase your notable projects (optional)'}
                    {activeTab === 'preview' && 'Review your completed resume'}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="p-6">
                  {/* Personal Information */}
                  {activeTab === 'personal' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input 
                            id="name"
                            value={resumeData.personal.name}
                            onChange={(e) => updatePersonal('name', e.target.value)}
                            placeholder="John Doe"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email"
                            type="email"
                            value={resumeData.personal.email}
                            onChange={(e) => updatePersonal('email', e.target.value)}
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input 
                            id="phone"
                            value={resumeData.personal.phone}
                            onChange={(e) => updatePersonal('phone', e.target.value)}
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input 
                            id="location"
                            value={resumeData.personal.location}
                            onChange={(e) => updatePersonal('location', e.target.value)}
                            placeholder="San Francisco, CA"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="website">Website/LinkedIn (Optional)</Label>
                        <Input 
                          id="website"
                          value={resumeData.personal.website}
                          onChange={(e) => updatePersonal('website', e.target.value)}
                          placeholder="linkedin.com/in/johndoe"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="summary">Professional Summary</Label>
                        <Textarea 
                          id="summary"
                          value={resumeData.personal.summary}
                          onChange={(e) => updatePersonal('summary', e.target.value)}
                          placeholder="Experienced software engineer with expertise in web development..."
                          rows={4}
                        />
                        <p className="text-sm text-gray-500">
                          Briefly highlight your key skills and experience in 2-4 sentences.
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {/* Work Experience */}
                  {activeTab === 'experience' && (
                    <div className="space-y-8">
                      {resumeData.experience.map((exp, index) => (
                        <div key={exp.id} className="space-y-6">
                          {index > 0 && <Separator />}
                          <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium">Experience {index + 1}</h3>
                            {resumeData.experience.length > 1 && (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => removeExperience(exp.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor={`job-title-${exp.id}`}>Job Title</Label>
                              <Input 
                                id={`job-title-${exp.id}`}
                                value={exp.title}
                                onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                                placeholder="Software Engineer"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`company-${exp.id}`}>Company</Label>
                              <Input 
                                id={`company-${exp.id}`}
                                value={exp.company}
                                onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                                placeholder="Google"
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor={`location-${exp.id}`}>Location</Label>
                              <Input 
                                id={`location-${exp.id}`}
                                value={exp.location}
                                onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                                placeholder="Mountain View, CA"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`start-date-${exp.id}`}>Start Date</Label>
                              <Input 
                                id={`start-date-${exp.id}`}
                                value={exp.startDate}
                                onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                                placeholder="Jan 2020"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`end-date-${exp.id}`}>End Date</Label>
                              <Input 
                                id={`end-date-${exp.id}`}
                                value={exp.endDate}
                                onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                                placeholder="Present"
                                disabled={exp.current}
                              />
                              <div className="flex items-center pt-2">
                                <input
                                  type="checkbox"
                                  id={`current-${exp.id}`}
                                  checked={exp.current}
                                  onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                                  className="mr-2"
                                />
                                <Label htmlFor={`current-${exp.id}`}>I currently work here</Label>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor={`description-${exp.id}`}>Description</Label>
                            <Textarea 
                              id={`description-${exp.id}`}
                              value={exp.description}
                              onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                              placeholder="• Developed and maintained web applications using React.js
• Implemented RESTful APIs and improved system performance by 40%
• Led a team of 3 junior developers on a client project"
                              rows={5}
                            />
                            <p className="text-sm text-gray-500">
                              Use bullet points to highlight achievements, responsibilities, and impacts.
                            </p>
                          </div>
                        </div>
                      ))}
                      
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={addExperience}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Another Experience
                      </Button>
                    </div>
                  )}
                  
                  {/* Education */}
                  {activeTab === 'education' && (
                    <div className="space-y-8">
                      {resumeData.education.map((edu, index) => (
                        <div key={edu.id} className="space-y-6">
                          {index > 0 && <Separator />}
                          <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium">Education {index + 1}</h3>
                            {resumeData.education.length > 1 && (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => removeEducation(edu.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                              <Input 
                                id={`degree-${edu.id}`}
                                value={edu.degree}
                                onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                                placeholder="Bachelor of Science in Computer Science"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`school-${edu.id}`}>School</Label>
                              <Input 
                                id={`school-${edu.id}`}
                                value={edu.school}
                                onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                                placeholder="Stanford University"
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor={`location-${edu.id}`}>Location</Label>
                              <Input 
                                id={`location-${edu.id}`}
                                value={edu.location}
                                onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                                placeholder="Stanford, CA"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`start-date-${edu.id}`}>Start Date</Label>
                              <Input 
                                id={`start-date-${edu.id}`}
                                value={edu.startDate}
                                onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                                placeholder="Aug 2016"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`end-date-${edu.id}`}>End Date</Label>
                              <Input 
                                id={`end-date-${edu.id}`}
                                value={edu.endDate}
                                onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                                placeholder="May 2020"
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor={`description-${edu.id}`}>Additional Information (Optional)</Label>
                            <Textarea 
                              id={`description-${edu.id}`}
                              value={edu.description}
                              onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                              placeholder="• GPA: 3.8/4.0
• Relevant coursework: Data Structures, Algorithms, Web Development
• Academic achievements or extracurricular activities"
                              rows={4}
                            />
                          </div>
                        </div>
                      ))}
                      
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={addEducation}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Another Education
                      </Button>
                    </div>
                  )}
                  
                  {/* Skills */}
                  {activeTab === 'skills' && (
                    <div className="space-y-6">
                      <div className="bg-blue-50 rounded-lg p-4 mb-6">
                        <p className="text-sm text-blue-800">
                          Add skills relevant to the job you're applying for. Include both technical and soft skills that showcase your abilities.
                        </p>
                      </div>
                      
                      {resumeData.skills.map((skill, index) => (
                        <div key={skill.id} className="flex items-end gap-4">
                          <div className="flex-1 space-y-2">
                            <Label htmlFor={`skill-${skill.id}`}>Skill</Label>
                            <Input 
                              id={`skill-${skill.id}`}
                              value={skill.name}
                              onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                              placeholder="JavaScript"
                            />
                          </div>
                          <div className="w-1/3 space-y-2">
                            <Label htmlFor={`level-${skill.id}`}>Level</Label>
                            <Select 
                              value={skill.level}
                              onValueChange={(value) => updateSkill(skill.id, 'level', value)}
                            >
                              <SelectTrigger id={`level-${skill.id}`}>
                                <SelectValue placeholder="Select level" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Beginner">Beginner</SelectItem>
                                <SelectItem value="Intermediate">Intermediate</SelectItem>
                                <SelectItem value="Advanced">Advanced</SelectItem>
                                <SelectItem value="Expert">Expert</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          {resumeData.skills.length > 1 && (
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => removeSkill(skill.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                      
                      <Button 
                        variant="outline" 
                        className="w-full mt-4"
                        onClick={addSkill}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Another Skill
                      </Button>
                    </div>
                  )}
                  
                  {/* Projects */}
                  {activeTab === 'projects' && (
                    <div className="space-y-8">
                      <div className="bg-blue-50 rounded-lg p-4 mb-6">
                        <p className="text-sm text-blue-800">
                          Adding projects can significantly strengthen your resume, especially if you have limited work experience. Include personal projects, open-source contributions, or academic projects.
                        </p>
                      </div>
                      
                      {resumeData.projects.map((project, index) => (
                        <div key={project.id} className="space-y-6">
                          {index > 0 && <Separator />}
                          <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium">Project {index + 1}</h3>
                            {resumeData.projects.length > 1 && (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => removeProject(project.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor={`project-title-${project.id}`}>Project Title</Label>
                              <Input 
                                id={`project-title-${project.id}`}
                                value={project.title}
                                onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                                placeholder="E-commerce Website"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`technologies-${project.id}`}>Technologies Used</Label>
                              <Input 
                                id={`technologies-${project.id}`}
                                value={project.technologies}
                                onChange={(e) => updateProject(project.id, 'technologies', e.target.value)}
                                placeholder="React.js, Node.js, MongoDB"
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor={`project-link-${project.id}`}>Project Link (Optional)</Label>
                            <Input 
                              id={`project-link-${project.id}`}
                              value={project.link}
                              onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                              placeholder="https://github.com/username/project"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor={`project-description-${project.id}`}>Description</Label>
                            <Textarea 
                              id={`project-description-${project.id}`}
                              value={project.description}
                              onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                              placeholder="• Developed a full-stack e-commerce platform with user authentication
• Implemented payment processing integration with Stripe
• Designed responsive UI with accessibility considerations"
                              rows={4}
                            />
                          </div>
                        </div>
                      ))}
                      
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={addProject}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Another Project
                      </Button>
                    </div>
                  )}
                  
                  {/* Resume Preview */}
                  {activeTab === 'preview' && (
                    <div className="space-y-6">
                      <div className="bg-white border rounded-lg shadow-sm p-8">
                        <div className="text-center mb-6">
                          <h2 className="text-2xl font-bold">{resumeData.personal.name || 'Your Name'}</h2>
                          <div className="text-gray-600 flex flex-wrap justify-center gap-x-4 mt-1">
                            {resumeData.personal.email && <span>{resumeData.personal.email}</span>}
                            {resumeData.personal.phone && <span>{resumeData.personal.phone}</span>}
                            {resumeData.personal.location && <span>{resumeData.personal.location}</span>}
                            {resumeData.personal.website && <span>{resumeData.personal.website}</span>}
                          </div>
                        </div>
                        
                        {resumeData.personal.summary && (
                          <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2 pb-1 border-b">Professional Summary</h3>
                            <p className="text-gray-700">{resumeData.personal.summary}</p>
                          </div>
                        )}
                        
                        {resumeData.experience.some(exp => exp.company || exp.title) && (
                          <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2 pb-1 border-b">Experience</h3>
                            {resumeData.experience.map((exp, index) => (
                              exp.company || exp.title ? (
                                <div key={exp.id} className={`${index > 0 ? 'mt-4' : ''}`}>
                                  <div className="flex justify-between">
                                    <div>
                                      <h4 className="font-medium">{exp.title || 'Job Title'}</h4>
                                      <p className="text-gray-600">{exp.company || 'Company Name'}{exp.location ? `, ${exp.location}` : ''}</p>
                                    </div>
                                    <p className="text-gray-600 text-sm">
                                      {exp.startDate || 'Start Date'} - {exp.current ? 'Present' : (exp.endDate || 'End Date')}
                                    </p>
                                  </div>
                                  {exp.description && (
                                    <div className="mt-2 text-gray-700 whitespace-pre-line text-sm">
                                      {exp.description}
                                    </div>
                                  )}
                                </div>
                              ) : null
                            ))}
                          </div>
                        )}
                        
                        {resumeData.education.some(edu => edu.school || edu.degree) && (
                          <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2 pb-1 border-b">Education</h3>
                            {resumeData.education.map((edu, index) => (
                              edu.school || edu.degree ? (
                                <div key={edu.id} className={`${index > 0 ? 'mt-4' : ''}`}>
                                  <div className="flex justify-between">
                                    <div>
                                      <h4 className="font-medium">{edu.degree || 'Degree'}</h4>
                                      <p className="text-gray-600">{edu.school || 'School Name'}{edu.location ? `, ${edu.location}` : ''}</p>
                                    </div>
                                    <p className="text-gray-600 text-sm">
                                      {edu.startDate || 'Start Date'} - {edu.endDate || 'End Date'}
                                    </p>
                                  </div>
                                  {edu.description && (
                                    <div className="mt-2 text-gray-700 whitespace-pre-line text-sm">
                                      {edu.description}
                                    </div>
                                  )}
                                </div>
                              ) : null
                            ))}
                          </div>
                        )}
                        
                        {resumeData.skills.some(skill => skill.name) && (
                          <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2 pb-1 border-b">Skills</h3>
                            <div className="flex flex-wrap gap-2">
                              {resumeData.skills.map((skill) => (
                                skill.name ? (
                                  <div key={skill.id} className="bg-gray-100 px-3 py-1 rounded text-sm">
                                    {skill.name} {skill.level && `• ${skill.level}`}
                                  </div>
                                ) : null
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {resumeData.projects.some(project => project.title) && (
                          <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2 pb-1 border-b">Projects</h3>
                            {resumeData.projects.map((project, index) => (
                              project.title ? (
                                <div key={project.id} className={`${index > 0 ? 'mt-4' : ''}`}>
                                  <div className="flex justify-between">
                                    <div>
                                      <h4 className="font-medium">
                                        {project.title || 'Project Title'}
                                        {project.link && (
                                          <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-primary text-sm ml-2">
                                            Link
                                          </a>
                                        )}
                                      </h4>
                                      {project.technologies && (
                                        <p className="text-gray-600 text-sm">Technologies: {project.technologies}</p>
                                      )}
                                    </div>
                                  </div>
                                  {project.description && (
                                    <div className="mt-2 text-gray-700 whitespace-pre-line text-sm">
                                      {project.description}
                                    </div>
                                  )}
                                </div>
                              ) : null
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex justify-center">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="gap-2">
                              <Download className="h-4 w-4" />
                              Download PDF
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Download Resume</DialogTitle>
                            </DialogHeader>
                            <div className="py-4">
                              <p className="text-sm text-gray-500">
                                Your resume has been prepared for download. Click the button below to save it as a PDF file.
                              </p>
                            </div>
                            <DialogFooter>
                              <Button className="gap-2">
                                <FileText className="h-4 w-4" />
                                Download PDF
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  )}
                </CardContent>
                
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="outline"
                    onClick={prevSection}
                    disabled={activeTab === 'personal'}
                  >
                    Previous
                  </Button>
                  <Button 
                    onClick={nextSection}
                    disabled={activeTab === 'preview'}
                  >
                    {activeTab === 'projects' ? 'Preview Resume' : 'Next'}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ResumeBuilder;
