import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Analyze Skills', path: '/analyze' },
    { name: 'About Us', path: '/about' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300 border-b",
      scrolled 
        ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-gray-200 dark:border-gray-800 py-3 shadow-lg" 
        : "bg-transparent border-transparent py-5"
    )}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <ShieldCheck className="h-8 w-8 text-primary-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-indigo-600 bg-clip-text text-transparent">
              Skill Gap Analyzer
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary-500",
                  location.pathname === link.path 
                    ? "text-primary-600 font-bold border-b-2 border-primary-600" 
                    : "text-gray-600 dark:text-gray-300"
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-6 pl-4 border-l border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-bold text-gray-800 dark:text-white hidden lg:inline-block">
                      {user.name}
                    </span>
                  </div>
                  <Button 
                    onClick={logout} 
                    variant="outline"
                    size="sm"
                    className="rounded-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 h-9 px-5 text-xs font-bold transition-all shadow-sm active:scale-95"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <>
                  <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">
                    Sign in
                  </Link>
                  <Link to="/signup">
                    <Button size="sm" className="rounded-full px-6 active:scale-95 transition-transform shadow-md bg-primary-600 hover:bg-primary-700">
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden absolute w-full bg-white dark:bg-gray-900 border-b transition-all duration-300 overflow-hidden",
        isOpen ? "max-h-64 py-6" : "max-h-0"
      )}>
        <div className="container mx-auto px-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-gray-600 dark:text-gray-300"
            >
              {link.name}
            </Link>
          ))}
          <div className="flex flex-col gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
            {user ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
                  <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <Button onClick={() => { logout(); setIsOpen(false); }} variant="outline" className="w-full rounded-xl">
                  Logout Account
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full rounded-xl">Sign in</Button>
                </Link>
                <Link to="/signup" onClick={() => setIsOpen(false)}>
                  <Button className="w-full rounded-xl">Register Now</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
