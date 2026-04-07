
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PieChart, LineChart, ComposedChart, ResponsiveContainer, Pie, Cell, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Download, Check, X, AlertCircle, BookOpen, ExternalLink, ChevronDown, ChevronUp, FileText, Upload, ShieldCheck, TrendingUp, Award } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/use-auth';

// Define career paths with required skills
const careerPaths = [
  {
    id: 'frontend',
    name: 'Frontend Developer',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript', 'Responsive Design', 'Web Performance', 'Accessibility'],
    trending: false
  },
  {
    id: 'backend',
    name: 'Backend Developer',
    skills: ['Node.js', 'Python', 'Databases', 'API Design', 'Authentication', 'Server Management', 'Performance Optimization'],
    trending: false
  },
  {
    id: 'fullstack',
    name: 'Full Stack Developer',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Databases', 'API Design', 'DevOps', 'System Architecture'],
    trending: true
  },
  {
    id: 'datascientist',
    name: 'Data Scientist',
    skills: ['Python', 'R', 'SQL', 'Machine Learning', 'Data Visualization', 'Statistics', 'Big Data', 'Model Deployment'],
    trending: true
  },
  {
    id: 'productmanager',
    name: 'Product Manager',
    skills: ['User Research', 'Market Analysis', 'Roadmapping', 'Agile Methodologies', 'Communication', 'Technical Knowledge', 'Analytics'],
    trending: false
  },
  {
    id: 'cv-checker',
    name: 'AI CV Auditor (Beta)',
    skills: ['Keyword Match', 'Experience Metrics', 'Action Verbs', 'Contact Information', 'LinkedIn Link', 'Project Quantifiability'],
    trending: true,
    isCV: true
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity Analyst',
    skills: ['Network Security', 'Ethical Hacking', 'Cryptography', 'Incident Response', 'Penetration Testing', 'Security Compliance'],
    trending: true
  },
  {
    id: 'devops',
    name: 'DevOps Engineer',
    skills: ['Docker/Kubernetes', 'CI/CD Pipelines', 'Infrastructure as Code', 'Cloud (AWS/Azure)', 'Version Control', 'Monitoring'],
    trending: true
  },
  {
    id: 'uiux',
    name: 'UI/UX Designer',
    skills: ['Wireframing', 'Figma/Adobe XD', 'User Research', 'Visual Design', 'Information Architecture', 'Accessibility (WCAG)'],
    trending: false
  },
  {
    id: 'mobile',
    name: 'Mobile App Developer',
    skills: ['React Native/Flutter', 'Swift/Kotlin', 'Mobile UI Design', 'API Integration', 'State Management', 'App Store Deployment'],
    trending: false
  },
  {
    id: 'cloud',
    name: 'Cloud Architect',
    skills: ['System Design', 'Scalability', 'Serverless Computing', 'Cloud Cost Optimization', 'Networking', 'Migration Strategies'],
    trending: true
  },
  {
    id: 'aiml',
    name: 'AI/ML Engineer',
    skills: ['Deep Learning', 'Neural Networks', 'NLP', 'PyTorch/TensorFlow', 'Computer Vision', 'Model Fine-Tuning'],
    trending: true
  },
  {
    id: 'qa',
    name: 'QA Automation Engineer',
    skills: ['Selenium/Playwright', 'Unit Testing', 'Integration Testing', 'Bug Tracking', 'Performance Testing', 'Testing Methodologies'],
    trending: false
  }
];

// Sample educational resources
const learningResources = {
  'HTML': [
    { name: 'MDN Web Docs - HTML', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML', type: 'Documentation' },
    { name: 'HTML & CSS Course', url: '#', type: 'Course' },
  ],
  'CSS': [
    { name: 'CSS Tricks', url: '#', type: 'Blog' },
    { name: 'Advanced CSS Masterclass', url: '#', type: 'Course' },
  ],
  'JavaScript': [
    { name: 'JavaScript.info', url: '#', type: 'Documentation' },
    { name: 'JavaScript: The Good Parts', url: '#', type: 'Book' },
  ],
  'React': [
    { name: 'React Official Docs', url: '#', type: 'Documentation' },
    { name: 'React for Beginners', url: '#', type: 'Course' },
  ],
  'Python': [
    { name: 'Python.org', url: '#', type: 'Documentation' },
    { name: 'Python Crash Course', url: '#', type: 'Book' },
  ],
  'Machine Learning': [
    { name: 'Machine Learning by Andrew Ng', url: '#', type: 'Course' },
    { name: 'Hands-On Machine Learning', url: '#', type: 'Book' },
  ],
  'SQL': [
    { name: 'SQL for Data Analysis', url: '#', type: 'Course' },
    { name: 'SQL Cookbook', url: '#', type: 'Book' },
  ],
  'TypeScript': [
    { name: 'TypeScript Documentation', url: 'https://www.typescriptlang.org/docs/', type: 'Documentation' },
    { name: 'TypeScript Deep Dive', url: '#', type: 'Book' },
  ],
  'Ethical Hacking': [
    { name: 'TryHackMe - Jr. Pentester Path', url: 'https://tryhackme.com', type: 'Platform' },
    { name: 'Hack The Box', url: 'https://www.hackthebox.com', type: 'Platform' },
  ],
  'Docker/Kubernetes': [
    { name: 'Docker Documentation', url: 'https://docs.docker.com', type: 'Documentation' },
    { name: 'Kubernetes Tutorial', url: 'https://kubernetes.io/docs/tutorials/', type: 'Tutorial' },
  ],
  'Figma/Adobe XD': [
    { name: 'Figma Learn Center', url: 'https://help.figma.com/hc/en-us', type: 'Tutorial' },
    { name: 'UI/UX Design Patterns', url: '#', type: 'Resources' },
  ],
  'Network Security': [
    { name: 'CompTIA Security+ Study Guide', url: '#', type: 'Book' },
    { name: 'Cisco Networking Academy', url: 'https://www.netacad.com', type: 'Course' },
  ],
  'CI/CD Pipelines': [
    { name: 'GitLab CI/CD Guide', url: 'https://docs.gitlab.com/ee/ci/', type: 'Documentation' },
    { name: 'GitHub Actions Documentation', url: 'https://docs.github.com/en/actions', type: 'Documentation' },
  ],
  'Deep Learning': [
    { name: 'Fast.ai Deep Learning for Coders', url: 'https://www.fast.ai', type: 'Course' },
    { name: 'TensorFlow Official Tutorials', url: 'https://www.tensorflow.org/tutorials', type: 'Documentation' },
  ],
  'NLP': [
    { name: 'Hugging Face Course', url: 'https://huggingface.co/learn/nlp-course', type: 'Course' },
    { name: 'Natural Language Processing with Python', url: '#', type: 'Book' },
  ],
  'Swift/Kotlin': [
    { name: 'Swift Playgrounds (iOS)', url: 'https://www.apple.com/swift/playgrounds/', type: 'Platform' },
    { name: 'Kotlin for Android Developers', url: 'https://developer.android.com/kotlin', type: 'Documentation' },
  ],
  'System Design': [
    { name: 'System Design Primer (GitHub)', url: 'https://github.com/donnemartin/system-design-primer', type: 'Resources' },
    { name: 'Grokking the System Design Interview', url: '#', type: 'Course' },
  ],
};

const Analyze = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [selectedCareer, setSelectedCareer] = useState('');
  const [userSkills, setUserSkills] = useState<Record<string, number>>({});
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [expandedResources, setExpandedResources] = useState<string[]>([]);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [cvScore, setCvScore] = useState(0);

  // Get skills based on selected career
  const getCareerSkills = () => {
    const career = careerPaths.find(c => c.id === selectedCareer);
    return career ? career.skills : [];
  };

  // Handle skill level change
  const handleSkillLevelChange = (skill: string, level: number) => {
    setUserSkills(prev => ({
      ...prev,
      [skill]: level
    }));
  };

  // Toggle showing resources for a skill
  const toggleResources = (skill: string) => {
    if (expandedResources.includes(skill)) {
      setExpandedResources(expandedResources.filter(s => s !== skill));
    } else {
      setExpandedResources([...expandedResources, skill]);
    }
  };

  // Start analysis
  const analyzeSkills = () => {
    const career = careerPaths.find(c => c.id === selectedCareer);

    if (career?.isCV) {
      if (!cvFile) {
        toast({
          title: "No file uploaded",
          description: "Please upload your resume to start the audit.",
          variant: "destructive",
        });
        return;
      }

      setIsAnalyzing(true);
      // Simulate CV Analysis
      setTimeout(() => {
        setIsAnalyzing(false);
        setAnalysisComplete(true);
        // Random professional score for demo
        const mockScore = 70 + Math.floor(Math.random() * 25);
        setCvScore(mockScore);

        // Populate skills mock results for CV
        const mockSkills: Record<string, number> = {
          'Keyword Match': 4,
          'Experience Metrics': 3,
          'Action Verbs': 5,
          'Contact Information': 5,
          'LinkedIn Link': 2,
          'Project Quantifiability': 3
        };
        setUserSkills(mockSkills);

        toast({
          title: "Resume Audited!",
          description: `Your CV strength score is ${mockScore}/100.`,
          variant: "default",
        });
      }, 1500);
      return;
    }

    // Check if all skills have been rated
    const skills = getCareerSkills();
    const allSkillsRated = skills.every(skill => userSkills[skill] !== undefined);

    if (!allSkillsRated) {
      toast({
        title: "Incomplete Skills Assessment",
        description: "Please rate your level for all skills before analyzing.",
        variant: "destructive",
      });
      return;
    }

    setAnalysisComplete(true);

    toast({
      title: "Analysis Complete!",
      description: "View your personalized skill gap report below.",
      variant: "default",
    });

    // Scroll to results
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Calculate overall match percentage
  const calculateOverallMatch = () => {
    const skills = getCareerSkills();
    if (skills.length === 0) return 0;

    const totalPossiblePoints = skills.length * 5; // 5 is max rating
    const userPoints = skills.reduce((sum, skill) => sum + (userSkills[skill] || 0), 0);

    return Math.round((userPoints / totalPossiblePoints) * 100);
  };

  // Get chart data for skill comparison
  const getSkillChartData = () => {
    const skills = getCareerSkills();
    return skills.map(skill => ({
      name: skill,
      userLevel: userSkills[skill] || 0,
      required: 4, // Assuming 4/5 is the professional level required
      gap: Math.max(0, 4 - (userSkills[skill] || 0))
    }));
  };

  // Prepare data for pie chart
  const getPieChartData = () => {
    const match = calculateOverallMatch();
    return [
      { name: 'Match', value: match },
      { name: 'Gap', value: 100 - match }
    ];
  };

  // Get priority skills to improve
  const getPrioritySkills = () => {
    const skills = getCareerSkills();
    return skills
      .map(skill => ({
        name: skill,
        level: userSkills[skill] || 0,
        gap: Math.max(0, 4 - (userSkills[skill] || 0))
      }))
      .filter(skill => skill.gap > 0)
      .sort((a, b) => b.gap - a.gap)
      .slice(0, 3);
  };

  // Generate mock timeline data
  const generateTimelineData = () => {
    const prioritySkills = getPrioritySkills();
    let currentMonth = 0;

    return prioritySkills.map(skill => {
      const duration = skill.gap * 2; // 2 months per level of gap
      const result = {
        skill: skill.name,
        startMonth: currentMonth,
        endMonth: currentMonth + duration
      };
      currentMonth += duration;
      return result;
    });
  };

  // Prepare learning roadmap data for chart
  const getLearningRoadmapData = () => {
    const roadmap = generateTimelineData();
    const data = [];

    // Create data points for each month
    const totalMonths = roadmap.length > 0
      ? roadmap[roadmap.length - 1].endMonth
      : 0;

    for (let month = 0; month <= totalMonths; month++) {
      const entry: Record<string, any> = { name: `Month ${month}` };

      roadmap.forEach(item => {
        if (month >= item.startMonth && month <= item.endMonth) {
          entry[item.skill] = 1;
        } else {
          entry[item.skill] = 0;
        }
      });

      data.push(entry);
    }

    return data;
  };

  // Handle download report
  const downloadReport = () => {
    toast({
      title: "Report Downloaded",
      description: "Your skill gap analysis report has been downloaded.",
      variant: "default",
    });
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-primary-50 dark:bg-gray-900 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center" data-aos="fade-up">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-900 dark:text-white">Skill Gap Analysis</h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
              Identify your skill gaps and get personalized recommendations to advance your career
            </p>
          </div>
        </div>
      </section>

      {/* Analysis Input Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg" data-aos="fade-up">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Step 1: Choose Your Target Career</h2>

              <div className="mb-8">
                <label htmlFor="career" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Select the role you're aiming for
                </label>
                <Select
                  value={selectedCareer}
                  onValueChange={(value) => {
                    setSelectedCareer(value);
                    setUserSkills({});
                    setAnalysisComplete(false);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a career path" />
                  </SelectTrigger>
                  <SelectContent>
                    {careerPaths.map(career => (
                      <SelectItem key={career.id} value={career.id}>{career.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedCareer && (
                <>
                  <div className="mb-8" data-aos="fade-up" data-delay="100">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                        <span className="text-primary-500 font-bold">2</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {careerPaths.find(c => c.id === selectedCareer)?.isCV
                          ? "Upload your Resume"
                          : "Rate your current proficiency level"}
                      </h3>
                    </div>

                    {careerPaths.find(c => c.id === selectedCareer)?.isCV ? (
                      /* CV Uploader UI */
                      <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-10 text-center hover:border-primary-400 transition-colors bg-gray-50/50 dark:bg-gray-800/50">
                        <input
                          type="file"
                          id="cv-upload"
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                        />
                        <label htmlFor="cv-upload" className="cursor-pointer">
                          <div className="h-16 w-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Upload className="h-8 w-8 text-primary-500" />
                          </div>
                          <p className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                            {cvFile ? cvFile.name : "Click to upload or drag & drop"}
                          </p>
                          <p className="text-sm text-gray-500">PDF, DOCX up to 5MB</p>
                        </label>
                        {cvFile && (
                          <div className="mt-4 flex items-center justify-center gap-2 text-green-500 text-sm font-medium">
                            <Check className="h-4 w-4" /> File uploaded successfully
                          </div>
                        )}
                      </div>
                    ) : (
                      /* Standard Skill Rating UI */
                      <div className="space-y-6 mb-8">
                        {getCareerSkills().map(skill => (
                          <div key={skill} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                            <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                              {skill}
                              {userSkills[skill] >= 4 && (
                                <Badge className="ml-2 bg-yellow-100 text-yellow-700 border-yellow-200 h-5 text-[10px]">
                                  <Award className="h-3 w-3 mr-1" /> PROFICIENT
                                </Badge>
                              )}
                            </h3>
                            <div className="flex flex-wrap gap-3">
                              {[1, 2, 3, 4, 5].map(level => (
                                <label
                                  key={level}
                                  className={`
                                    flex items-center justify-center w-12 h-12 rounded-full cursor-pointer border transition-all
                                    ${userSkills[skill] === level
                                      ? 'bg-primary-500 text-white border-primary-500'
                                      : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'}
                                  `}
                                >
                                  <input
                                    type="radio"
                                    className="sr-only"
                                    name={`skill-${skill}`}
                                    value={level}
                                    checked={userSkills[skill] === level}
                                    onChange={() => handleSkillLevelChange(skill, level)}
                                  />
                                  {level}
                                </label>
                              ))}
                            </div>
                            <div className="mt-2 text-sm flex justify-between text-gray-500 dark:text-gray-400">
                              <span>Beginner</span>
                              <span>Expert</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <Button onClick={analyzeSkills} className="btn-primary w-full">
                    Analyze My Skills
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {analysisComplete && (
        <section id="results" className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg" data-aos="fade-up">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Skill Gap Analysis Results</h2>
                  <Button onClick={downloadReport} className="bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600">
                    Download Report
                    <Download className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 dark:border-gray-700 mb-8">
                  <button
                    className={`px-4 py-2 font-medium text-sm ${activeTab === 'all'
                      ? 'text-primary-500 border-b-2 border-primary-500'
                      : 'text-gray-600 dark:text-gray-400'}`}
                    onClick={() => setActiveTab('all')}
                  >
                    Overview
                  </button>
                  <button
                    className={`px-4 py-2 font-medium text-sm ${activeTab === 'technical'
                      ? 'text-primary-500 border-b-2 border-primary-500'
                      : 'text-gray-600 dark:text-gray-400'}`}
                    onClick={() => setActiveTab('technical')}
                  >
                    Technical Skills
                  </button>
                  <button
                    className={`px-4 py-2 font-medium text-sm ${activeTab === 'resources'
                      ? 'text-primary-500 border-b-2 border-primary-500'
                      : 'text-gray-600 dark:text-gray-400'}`}
                    onClick={() => setActiveTab('resources')}
                  >
                    Learning Resources
                  </button>
                </div>

                {/* Overview Tab */}
                {activeTab === 'all' && (
                  <div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                      {/* Overall Match / CV Score */}
                      <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                          {selectedCareer === 'cv-checker' ? 'CV Strength Score' : 'Overall Match'}
                        </h3>
                        {selectedCareer === 'cv-checker' ? (
                          <div className="flex flex-col items-center justify-center h-48">
                            <div className="relative h-32 w-32 flex items-center justify-center mb-4">
                              <svg className="w-full h-full transform -rotate-90">
                                <circle
                                  cx="64"
                                  cy="64"
                                  r="58"
                                  stroke="currentColor"
                                  strokeWidth="12"
                                  fill="transparent"
                                  className="text-gray-200 dark:text-gray-600"
                                />
                                <circle
                                  cx="64"
                                  cy="64"
                                  r="58"
                                  stroke="currentColor"
                                  strokeWidth="12"
                                  fill="transparent"
                                  strokeDasharray={2 * Math.PI * 58}
                                  strokeDashoffset={2 * Math.PI * 58 * (1 - cvScore / 100)}
                                  className="text-primary-500"
                                />
                              </svg>
                              <span className="absolute text-3xl font-bold text-gray-900 dark:text-white">{cvScore}</span>
                            </div>
                            <Badge className="bg-green-100 text-green-700 border-green-200">
                              {cvScore > 80 ? 'Good Resume' : 'Needs Improvement'}
                            </Badge>
                          </div>
                        ) : (
                          <div className="flex justify-center">
                            <div className="h-48 w-48">
                              <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                  <Pie
                                    data={getPieChartData()}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                  >
                                    <Cell key="cell-0" fill="#6366f1" />
                                    <Cell key="cell-1" fill="#e5e7eb" />
                                  </Pie>
                                  <Tooltip />
                                </PieChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                        )}
                        <p className="text-center mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                          {selectedCareer === 'cv-checker'
                            ? `${cvScore >= 80 ? 'Optimized' : 'Potentially Filtered by ATS'}`
                            : `${calculateOverallMatch()}% Match with ${careerPaths.find(c => c.id === selectedCareer)?.name}`}
                        </p>
                      </div>

                      {/* Skills Comparison */}
                      <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl lg:col-span-2">
                        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Skills Comparison</h3>
                        <div className="h-72">
                          <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart
                              layout="vertical"
                              data={getSkillChartData()}
                              margin={{
                                top: 20,
                                right: 20,
                                bottom: 20,
                                left: 60,
                              }}
                            >
                              <CartesianGrid stroke="#f5f5f5" />
                              <XAxis type="number" domain={[0, 5]} />
                              <YAxis dataKey="name" type="category" scale="band" />
                              <Tooltip />
                              <Legend />
                              <Bar dataKey="userLevel" name="Your Level" barSize={20} fill="#6366f1" />
                              <Bar dataKey="gap" name="Skill Gap" barSize={20} fill="#ef4444" />
                              <Line dataKey="required" name="Required Level" stroke="#10b981" />
                            </ComposedChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>

                    {/* Priority Skills */}
                    <div className="mb-12">
                      <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Priority Skills to Improve</h3>
                      <div className="space-y-6">
                        {getPrioritySkills().map(skill => (
                          <div key={skill.name} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                            <div className="flex justify-between mb-2">
                              <h4 className="font-medium text-gray-900 dark:text-white">{skill.name}</h4>
                              <span className="text-sm text-gray-600 dark:text-gray-400">Current Level: {skill.level}/5</span>
                            </div>
                            <Progress value={skill.level * 20} className="h-2 mb-4" />
                            <div className="flex items-start gap-3 mt-3">
                              <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                              <p className="text-gray-700 dark:text-gray-300 text-sm">
                                {skill.gap > 2
                                  ? `This is a critical skill gap. Focus on improving ${skill.name} as a top priority.`
                                  : `You need to improve your ${skill.name} skills to reach the required professional level.`
                                }
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Learning Roadmap */}
                    <div>
                      <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Your Learning Roadmap</h3>
                      <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                        <div className="h-72 mb-6">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                              data={getLearningRoadmapData()}
                              margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 10,
                              }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis domain={[0, 1]} hide />
                              <Tooltip />
                              <Legend />
                              {getPrioritySkills().map((skill, index) => {
                                const colors = ['#6366f1', '#10b981', '#f59e0b'];
                                return (
                                  <Line
                                    key={skill.name}
                                    type="monotone"
                                    dataKey={skill.name}
                                    stroke={colors[index % colors.length]}
                                    strokeWidth={4}
                                  />
                                );
                              })}
                            </LineChart>
                          </ResponsiveContainer>
                        </div>

                        <div className="space-y-4">
                          {generateTimelineData().map((item, index) => (
                            <div key={index} className="flex items-start gap-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-600">
                              <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center flex-shrink-0">
                                <span className="text-primary-500 font-bold text-sm tracking-tight">{index + 1}</span>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-bold text-gray-900 dark:text-white">{item.skill}</h4>
                                  {userSkills[item.skill] >= 4 && (
                                    <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200 flex items-center gap-1 h-5 text-[10px]">
                                      <Award className="h-3 w-3" /> PROFICIENT
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Duration: <span className="font-semibold text-primary-500">Month {item.startMonth} - Month {item.endMonth}</span> ({item.endMonth - item.startMonth} months)
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Technical Skills Tab */}
                {activeTab === 'technical' && (
                  <div>
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Technical Skills Assessment</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Detailed breakdown of your technical skills compared to industry requirements
                      </p>

                      <div className="space-y-6">
                        {getCareerSkills().map(skill => {
                          const userLevel = userSkills[skill] || 0;
                          const requiredLevel = 4; // Professional level
                          const gap = Math.max(0, requiredLevel - userLevel);
                          const status = gap === 0 ? 'proficient' : gap <= 1 ? 'developing' : 'needs-work';

                          return (
                            <div key={skill} className="p-4 border rounded-lg">
                              <div className="flex justify-between items-center mb-2">
                                <h4 className="font-medium text-gray-900 dark:text-white">{skill}</h4>
                                <div className={`
                                  px-3 py-1 rounded-full text-xs font-medium
                                  ${status === 'proficient' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                    status === 'developing' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}
                                `}>
                                  {status === 'proficient' ? 'Proficient' :
                                    status === 'developing' ? 'Developing' :
                                      'Needs Work'}
                                </div>
                              </div>

                              <div className="flex items-center gap-3 mb-2">
                                <div className="flex-1">
                                  <Progress value={userLevel * 20} className="h-2" />
                                </div>
                                <div className="text-sm font-medium w-12 text-center">
                                  {userLevel}/5
                                </div>
                              </div>

                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                {status === 'proficient'
                                  ? `Excellent! Your ${skill} skills meet industry standards. Focus on advanced patterns next.`
                                  : status === 'developing'
                                    ? `You're on the right track with ${skill}. Reaching level 4 will put you ahead of 70% of candidates.`
                                    : `Concentrate heavily on ${skill}. Most entry-level roles require a level 3 minimum here.`
                                }
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Skill Gap Summary</h3>
                      <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          Based on your assessment, here's a summary of where you stand:
                        </p>

                        <div className="space-y-3">
                          {/* Strengths */}
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white flex items-center">
                              <Check className="h-5 w-5 text-green-500 mr-2" />
                              Your Strengths
                            </h4>
                            <ul className="ml-7 mt-2 list-disc text-gray-700 dark:text-gray-300">
                              {getCareerSkills()
                                .filter(skill => (userSkills[skill] || 0) >= 4)
                                .map(skill => (
                                  <li key={skill}>{skill}</li>
                                ))}
                              {getCareerSkills().filter(skill => (userSkills[skill] || 0) >= 4).length === 0 && (
                                <li className="text-gray-500 italic">No skills at professional level yet</li>
                              )}
                            </ul>
                          </div>

                          {/* Areas to Improve */}
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white flex items-center">
                              <X className="h-5 w-5 text-red-500 mr-2" />
                              Areas to Improve
                            </h4>
                            <ul className="ml-7 mt-2 list-disc text-gray-700 dark:text-gray-300">
                              {getCareerSkills()
                                .filter(skill => (userSkills[skill] || 0) < 3)
                                .map(skill => (
                                  <li key={skill}>{skill}</li>
                                ))}
                            </ul>
                          </div>

                          {/* Next Steps */}
                          <div className="pt-3 border-t border-gray-200 dark:border-gray-600">
                            <h4 className="font-medium text-gray-900 dark:text-white">Recommended Next Steps:</h4>
                            <ol className="ml-7 mt-2 list-decimal text-gray-700 dark:text-gray-300 space-y-1">
                              <li>Focus on improving your highest priority skills first</li>
                              <li>Dedicate at least 5-10 hours weekly to learning</li>
                              <li>Regularly practice and apply your new skills in projects</li>
                              <li>Reassess your skills every 3 months to track progress</li>
                            </ol>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Learning Resources Tab */}
                {activeTab === 'resources' && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                      {selectedCareer === 'cv-checker' ? 'Recommended Job Opportunities' : 'Recommended Learning Resources'}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {selectedCareer === 'cv-checker'
                        ? 'Based on your CV score, here are some job roles you should target immediately:'
                        : 'Curated resources to help you bridge your skill gaps, prioritized by your needs'
                      }
                    </p>

                    <div className="space-y-6">
                      {selectedCareer === 'cv-checker' ? (
                        /* CV Job Recommendations */
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            { title: 'Junior Software Engineer', company: 'TechNova Solutions', type: 'Full-time', salary: '₹6L - ₹8L' },
                            { title: 'Information Security Intern', company: 'SecureNet', type: 'Internship', salary: '₹25k/mo' },
                            { title: 'Web Developer Associate', company: 'Digital Pulse', type: 'Full-time', salary: '₹4L - ₹6L' },
                            { title: 'Software QA Analyst', company: 'FlowTest Systems', type: 'Full-time', salary: '₹5L - ₹7L' },
                          ].map((job, idx) => (
                            <div key={idx} className="p-4 border border-gray-100 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold text-gray-900 dark:text-white">{job.title}</h4>
                                <Badge className="bg-primary-50 text-primary-600 text-[10px] items-center flex">{job.type}</Badge>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{job.company}</p>
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-green-600">{job.salary}</span>
                                <Button variant="link" className="p-0 h-auto text-xs text-primary-500">Apply Now <ExternalLink className="h-3 w-3 ml-1" /></Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        getPrioritySkills().map(skill => (
                          <div key={skill.name} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                            <div
                              className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 cursor-pointer"
                              onClick={() => toggleResources(skill.name)}
                            >
                              <div className="flex items-center">
                                <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mr-3">
                                  <BookOpen className="h-4 w-4 text-primary-500" />
                                </div>
                                <h4 className="font-medium text-gray-900 dark:text-white">{skill.name}</h4>
                              </div>
                              {expandedResources.includes(skill.name) ? (
                                <ChevronUp className="h-5 w-5 text-gray-500" />
                              ) : (
                                <ChevronDown className="h-5 w-5 text-gray-500" />
                              )}
                            </div>

                            {expandedResources.includes(skill.name) && (
                              <div className="p-4 bg-white dark:bg-gray-800 space-y-4">
                                {learningResources[skill.name as keyof typeof learningResources] ? (
                                  <div className="space-y-4">
                                    {(learningResources[skill.name as keyof typeof learningResources] as any[]).map((resource, index) => (
                                      <div key={index} className="flex items-start bg-gray-50 dark:bg-gray-700 p-4 rounded-xl border border-gray-100 dark:border-gray-600">
                                        <div className="bg-primary-50 dark:bg-primary-900/40 p-2 rounded mr-3">
                                          <BookOpen className="h-5 w-5 text-primary-500" />
                                        </div>
                                        <div className="flex-1">
                                          <h5 className="font-bold text-gray-900 dark:text-white">{resource.name}</h5>
                                          <p className="text-xs text-gray-500 mb-2">{resource.type}</p>
                                          <a
                                            href={resource.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary-500 text-xs font-semibold flex items-center hover:underline"
                                          >
                                            Access Resource
                                            <ExternalLink className="h-3 w-3 ml-1" />
                                          </a>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-sm text-gray-500 italic text-center py-2">No specific resources found yet for {skill.name}.</p>
                                )}
                              </div>
                            )}
                          </div>
                        ))
                      )}
                    </div>

                    <div className="mt-8 p-6 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
                      <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Learning Tips</h3>
                      <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>Allocate consistent time blocks for learning (e.g., 1 hour daily)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>Apply new skills in practical projects to reinforce learning</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>Join communities related to your learning areas for support</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>Track your progress and celebrate small wins along the way</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {!user && (
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 text-center" data-aos="fade-up">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Ready to Accelerate Your Career?</h2>
            <p className="text-xl mb-8 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Set up regular skill assessments to track your progress and stay on the path to success
            </p>
            <Link to="/signup">
              <Button className="btn-primary">
                Create Account
              </Button>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default Analyze;
