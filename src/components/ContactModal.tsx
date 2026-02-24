import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, X } from 'lucide-react';
import Hyperspeed from './Hyperspeed';
import { gsap } from 'gsap';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'name' | 'email' | 'complete';

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const [step, setStep] = useState<Step>('name');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (isOpen) {
      setStep('name');
      setName('');
      setEmail('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        '.contact-content',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.3 }
      );
    }
  }, [isOpen, step]);

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setStep('email');
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      // Open mail client
      const subject = encodeURIComponent(`Hello from ${name}`);
      const body = encodeURIComponent(`Hi,\n\nMy name is ${name} and I'd like to get in touch.\n\nBest regards,\n${name}\n${email}`);
      window.location.href = `mailto:hello@developer.com?subject=${subject}&body=${body}`;
      setStep('complete');
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-full w-full h-full max-h-full p-0 border-0 bg-transparent overflow-hidden [&>button]:hidden">
        <DialogTitle className="sr-only">Contact Form</DialogTitle>
        
        {/* Hyperspeed Background */}
        <div className="absolute inset-0 z-0">
          {isOpen && <Hyperspeed />}
        </div>

        {/* Close Button */}


        {/* Content */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="contact-content text-center px-6 max-w-2xl mx-auto">
            {step === 'name' && (
              <form onSubmit={handleNameSubmit} className="space-y-8">
                <div className="space-y-4">
                  <h2 className="font-display text-5xl md:text-7xl text-foreground tracking-tight">
                    WHAT'S YOUR NAME?
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    Let's start with an introduction
                  </p>
                </div>
                <div className="space-y-6">
                  <Input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-16 text-2xl text-center bg-background/10 backdrop-blur-md border-border/30 text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50"
                    autoFocus
                  />
                  <Button
                    type="submit"
                    disabled={!name.trim()}
                    className="h-14 px-8 text-lg font-medium bg-primary hover:bg-primary/90 text-primary-foreground rounded-full group"
                  >
                    Continue
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </form>
            )}

            {step === 'email' && (
              <form onSubmit={handleEmailSubmit} className="space-y-8">
                <div className="space-y-4">
                  <h2 className="font-display text-5xl md:text-7xl text-foreground tracking-tight">
                    NICE TO MEET YOU, {name.toUpperCase()}!
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    Now, what's your email?
                  </p>
                </div>
                <div className="space-y-6">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-16 text-2xl text-center bg-background/10 backdrop-blur-md border-border/30 text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50"
                    autoFocus
                  />
                  <Button
                    type="submit"
                    disabled={!email.trim()}
                    className="h-14 px-8 text-lg font-medium bg-primary hover:bg-primary/90 text-primary-foreground rounded-full group"
                  >
                    Open Mail
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </form>
            )}

            {step === 'complete' && (
              <div className="space-y-4">
                <h2 className="font-display text-5xl md:text-7xl text-foreground tracking-tight">
                  OPENING MAIL...
                </h2>
                <p className="text-muted-foreground text-lg">
                  Can't wait to hear from you!
                </p>
              </div>
            )}
          </div>
        </div>


        {/* Close Button - Bottom Right */}
        <div className="absolute bottom-10 right-10 z-50">
          <button
            onClick={onClose}
            className="group flex items-center gap-3 px-6 py-3 rounded-full bg-[#0a0a0a]/80 backdrop-blur-md border border-white/20 text-white hover:bg-[#0a0a0a] hover:border-white/40 transition-all duration-300"
          >
            <span className="font-display text-lg tracking-widest uppercase">CLOSE</span>
            <X className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
