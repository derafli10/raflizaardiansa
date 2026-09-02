'use client';

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { ConnectionStatus } from './ConnectionStatus';

export interface HandshakeFormProps {
  onSubmit?: (data: FormData) => Promise<void>;
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

/**
 * HandshakeForm Component
 *
 * TCP 3-way handshake themed contact form with progressive disclosure.
 * Structure: SYN (name) → SYN-ACK (email) → ACK (message)
 *
 * Requirements: 16.1, 16.2, 16.3, 16.4, 16.5, 16.6, 16.7, 16.8, 16.9
 */
export function HandshakeForm({ onSubmit }: HandshakeFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isFormValid = (): boolean => {
    return (
      formData.name.trim().length > 0 &&
      isValidEmail(formData.email) &&
      formData.message.trim().length > 0
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!isFormValid()) {
      setStatus('error');
      setErrorMessage('Please fill in all fields with valid information.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Default API call
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Failed to send message');
        }
      }

      setStatus('success');
      // Reset form after success
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
      }, 2000);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send message');
    }
  };

  const handleRetry = () => {
    setStatus('idle');
    setErrorMessage('');
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* SYN - Name Field */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <label className="mb-2 block">
            <span className="text-copper flex items-center gap-2 font-mono text-sm tracking-wider uppercase">
              <span className="bg-copper/20 rounded px-2 py-0.5">SYN</span>
              <span>Initiate Connection</span>
            </span>
          </label>
          <Input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={status === 'loading'}
            required
            aria-label="Your name"
            className="w-full"
          />
        </motion.div>

        {/* SYN-ACK - Email Field */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <label className="mb-2 block">
            <span className="text-signal-cyan flex items-center gap-2 font-mono text-sm tracking-wider uppercase">
              <span className="bg-signal-cyan/20 rounded px-2 py-0.5">SYN-ACK</span>
              <span>Acknowledge & Reply</span>
            </span>
          </label>
          <Input
            type="email"
            name="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            disabled={status === 'loading'}
            required
            aria-label="Your email address"
            className="w-full"
          />
        </motion.div>

        {/* ACK - Message Field */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <label className="mb-2 block">
            <span className="text-signal-green flex items-center gap-2 font-mono text-sm tracking-wider uppercase">
              <span className="bg-signal-green/20 rounded px-2 py-0.5">ACK</span>
              <span>Establish Connection</span>
            </span>
          </label>
          <Textarea
            name="message"
            placeholder="Your message..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            disabled={status === 'loading'}
            required
            rows={6}
            aria-label="Your message"
            className="w-full"
          />
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <button
            type="submit"
            disabled={!isFormValid() || status === 'loading'}
            className="bg-copper text-substrate hover:bg-copper-bright flex w-full items-center justify-center gap-2 rounded-md px-8 py-3 font-mono font-semibold shadow-[0_0_15px_rgba(212,165,116,0.25)] transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 md:w-auto"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Establishing Connection...</span>
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                <span>Send Message</span>
              </>
            )}
          </button>
        </motion.div>
      </form>

      {/* Connection Status */}
      <AnimatePresence mode="wait">
        <ConnectionStatus
          status={status === 'loading' ? 'idle' : status}
          message={errorMessage}
          onRetry={handleRetry}
        />
      </AnimatePresence>
    </div>
  );
}
