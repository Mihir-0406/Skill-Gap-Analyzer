
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ShieldCheck, UserPlus, Github, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Account Created!",
          description: result.message || "Registration successful. Please login to continue.",
        });
        navigate('/login');
      } else {
        toast({
          title: "Signup Failed!",
          description: result.error || "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("Signup error: ", err);
      toast({
        title: "Connection Error!",
        description: "Please check if your backend server is running.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[90vh] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-100 dark:bg-primary-900/30 rotate-3 group-hover:rotate-0 transition-transform">
            <UserPlus className="h-10 w-10 text-primary-600" />
          </div>
          <h2 className="mt-8 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Create an account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-primary-600 hover:text-primary-500 transition-colors">
              Sign in
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          <div className="space-y-5">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="rounded-xl border-gray-200 dark:border-gray-700 py-6"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john.doe@example.com"
                className="rounded-xl border-gray-200 dark:border-gray-700 py-6"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="rounded-xl border-gray-200 dark:border-gray-700 py-6"
              />
            </div>
          </div>

          <div className="flex items-start space-x-2 bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
            <Checkbox id="terms" className="mt-1" required />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms"
                className="text-xs font-medium text-gray-700 dark:text-gray-300 leading-normal"
              >
                I agree to the <Link to="#" className="text-primary-600 underline">Terms of Service</Link> and <Link to="#" className="text-primary-600 underline">Privacy Policy</Link>.
              </label>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl py-7 text-base font-bold shadow-xl active:scale-95 transition-all bg-primary-600 hover:bg-primary-700 flex items-center justify-center gap-3"
          >
            {isLoading ? (
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <>
                <Mail className="h-5 w-5" />
                Sign up with Email
              </>
            )}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200 dark:border-gray-700" />
            </div>
            <span className="relative bg-white dark:bg-gray-800 px-4 text-xs font-semibold text-gray-500 uppercase tracking-widest">
              OR
            </span>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <Button variant="outline" className="w-full rounded-xl py-6 border-2 font-semibold hover:bg-gray-50 transition-colors gap-3">
              <Github className="h-5 w-5" />
              Sign up with GitHub
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
