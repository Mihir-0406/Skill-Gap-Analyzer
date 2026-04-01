
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Target, Users, PieChart, BookOpen } from 'lucide-react';

const About = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-primary-50 dark:bg-gray-900 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center" data-aos="fade-up">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-900 dark:text-white">Why Skill Gap Analyzer?</h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
              We're on a mission to help professionals identify and bridge the gaps between their current skills and career aspirations.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1" data-aos="fade-right">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Our Mission</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                To democratize career advancement by providing data-driven skill gap analysis and personalized learning pathways accessible to everyone, regardless of their background or current skill level.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                We believe that every professional deserves clear guidance on how to progress in their career, and our platform is designed to provide exactly that.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <div className="flex items-center gap-2 text-primary-500">
                  <Target className="h-5 w-5" />
                  <span className="font-medium">Data-driven career guidance</span>
                </div>
                <div className="flex items-center gap-2 text-primary-500">
                  <PieChart className="h-5 w-5" />
                  <span className="font-medium">Personalized learning paths</span>
                </div>
                <div className="flex items-center gap-2 text-primary-500">
                  <BookOpen className="h-5 w-5" />
                  <span className="font-medium">Curated resources</span>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2" data-aos="fade-left">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978"
                alt="Team collaboration"
                className="rounded-lg shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div data-aos="fade-right">
              <img
                src="https://images.unsplash.com/photo-1507537297725-24a1c029d3ca"
                alt="Future vision"
                className="rounded-lg shadow-2xl w-full"
              />
            </div>
            <div data-aos="fade-left">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Our Vision</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                We envision a world where career transitions are smooth and accessible, where professionals can confidently navigate their career paths with clarity and purpose.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                By 2025, we aim to help over a million professionals bridge their skill gaps and reach their career goals through our innovative platform.
              </p>
              <ul className="space-y-4 mt-8">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary-500 font-bold text-sm">1</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Equal Opportunity:</span> Making career advancement accessible to everyone
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary-500 font-bold text-sm">2</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Data-Driven Insights:</span> Using AI and industry data to provide accurate guidance
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary-500 font-bold text-sm">3</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Continuous Growth:</span> Supporting lifelong learning and career development
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Meet Our Team</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              The passionate individuals behind the Skill-Gap Analyzer platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="glass-card p-6 rounded-xl text-center" data-aos="fade-up" data-aos-delay="100">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6">
                <img
                  src="https://randomuser.me/api/portraits/men/85.jpg"
                  alt="Mihir Dabhi"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-1 text-gray-900 dark:text-white">Mihir Dabhi</h3>
              <p className="text-primary-500 mb-3">Founder & CEO</p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Former career coach with 10+ years helping professionals level up.
              </p>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                <span className="text-secondary-500">Favorite Skill:</span> Strategic Planning
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="glass-card p-6 rounded-xl text-center" data-aos="fade-up" data-aos-delay="200">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6">
                <img
                  src="https://randomuser.me/api/portraits/women/63.jpg"
                  alt="Hirva Vachhani"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-1 text-gray-900 dark:text-white">Hirva Vachhani</h3>
              <p className="text-primary-500 mb-3">Lead Data Scientist</p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                PhD in machine learning with expertise in predictive career modeling.
              </p>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                <span className="text-secondary-500">Favorite Skill:</span> Predictive Analytics
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="glass-card p-6 rounded-xl text-center" data-aos="fade-up" data-aos-delay="300">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6">
                <img
                  src="https://randomuser.me/api/portraits/women/29.jpg"
                  alt="Samarth Vegada"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-1 text-gray-900 dark:text-white">Samarth Vegada</h3>
              <p className="text-primary-500 mb-3">Head of Product</p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Former product leader at LinkedIn with passion for career tech.
              </p>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                <span className="text-secondary-500">Favorite Skill:</span> Product Strategy
              </p>
            </div>

            {/* Team Member 4 */}
            <div className="glass-card p-6 rounded-xl text-center" data-aos="fade-up" data-aos-delay="400">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6">
                <img
                  src="https://randomuser.me/api/portraits/women/29.jpg"
                  alt="Ritu Pal"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-1 text-gray-900 dark:text-white">Ritu Pal</h3>
              <p className="text-primary-500 mb-3">UX Research Lead</p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Human-centered design expert focused on career development tools.
              </p>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                <span className="text-secondary-500">Favorite Skill:</span> User Research
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Our Journey</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              How Skill-Gap Analyzer evolved from an idea to a comprehensive skill gap platform
            </p>
          </div>


          <div className="max-w-4xl mx-auto relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary-200 dark:bg-primary-800"></div>

            {/* Timeline items */}
            <div className="relative z-10">
              {/* Item 1 */}
              <div className="mb-16 flex flex-col md:flex-row items-center" data-aos="fade-up">
                <div className="md:w-1/2 md:pr-12 md:text-right">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                    <span className="text-primary-500 font-semibold">2020</span>
                    <h3 className="text-xl font-bold mt-2 mb-3 text-gray-900 dark:text-white">The Idea Spark</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Kaushal identified a gap in career development: professionals didn't know what skills they needed to advance.
                    </p>
                  </div>
                </div>
                <div className="mx-auto md:mx-0 h-12 w-12 rounded-full bg-primary-500 flex items-center justify-center my-4 md:my-0">
                  <span className="text-white font-bold">1</span>
                </div>
                <div className="md:w-1/2 md:pl-12"></div>
              </div>

              {/* Item 2 */}
              <div className="mb-16 flex flex-col md:flex-row items-center" data-aos="fade-up">
                <div className="md:w-1/2 md:pr-12"></div>
                <div className="mx-auto md:mx-0 h-12 w-12 rounded-full bg-primary-500 flex items-center justify-center my-4 md:my-0">
                  <span className="text-white font-bold">2</span>
                </div>
                <div className="md:w-1/2 md:pl-12">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                    <span className="text-primary-500 font-semibold">2021</span>
                    <h3 className="text-xl font-bold mt-2 mb-3 text-gray-900 dark:text-white">Beta Launch</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      First version of Skill-Gap Analyzer launched with basic skill gap analysis for tech professionals.
                    </p>
                  </div>
                </div>
              </div>

              {/* Item 3 */}
              <div className="mb-16 flex flex-col md:flex-row items-center" data-aos="fade-up">
                <div className="md:w-1/2 md:pr-12 md:text-right">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                    <span className="text-primary-500 font-semibold">2022</span>
                    <h3 className="text-xl font-bold mt-2 mb-3 text-gray-900 dark:text-white">Expansion</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Added career roadmap features and expanded to support 20+ different career paths across multiple industries.
                    </p>
                  </div>
                </div>
                <div className="mx-auto md:mx-0 h-12 w-12 rounded-full bg-primary-500 flex items-center justify-center my-4 md:my-0">
                  <span className="text-white font-bold">3</span>
                </div>
                <div className="md:w-1/2 md:pl-12"></div>
              </div>

              {/* Item 4 */}
              <div className="flex flex-col md:flex-row items-center" data-aos="fade-up">
                <div className="md:w-1/2 md:pr-12"></div>
                <div className="mx-auto md:mx-0 h-12 w-12 rounded-full bg-primary-500 flex items-center justify-center my-4 md:my-0">
                  <span className="text-white font-bold">4</span>
                </div>
                <div className="md:w-1/2 md:pl-12">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                    <span className="text-primary-500 font-semibold">Today</span>
                    <h3 className="text-xl font-bold mt-2 mb-3 text-gray-900 dark:text-white">Comprehensive Platform</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Skill-Gap Analyzer now offers AI-powered skill gap analysis, personalized learning paths, and progress tracking for professionals worldwide.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-500 text-white">
        <div className="container mx-auto px-4 text-center" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Start your skill gap analysis today and take the first step toward your career goals
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/analyze">
              <Button className="bg-white text-primary-500 hover:bg-gray-100 px-8 py-3 text-lg rounded-lg shadow-lg transition-all duration-300">
                Analyze My Skills
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button className="bg-transparent border-2 border-white hover:bg-white/10 px-8 py-3 text-lg rounded-lg shadow-lg transition-all duration-300">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
