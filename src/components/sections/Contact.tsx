'use client';

import { Container } from '@/components/layout';
import { SectionHeader } from '@/components/layout/Section';
import { HandshakeForm } from './contact/HandshakeForm';

// export interface ContactProps {
//   // Props can be added in the future if needed
// }

// /**
//  * Contact Section - TCP Handshake Contact Form
//  * Network engineer themed contact interface with SYN → SYN-ACK → ACK structure
//  * Requirements: 16.1, 16.2, 16.3, 16.4, 16.5, 16.6, 16.7, 16.8, 16.9
//  */
export function Contact() {
  return (
    <section
      id="contact"
      className="relative w-full py-16 sm:py-24 lg:py-28"
      aria-labelledby="contact-heading"
    >
      <Container>
        <div className="mx-auto max-w-3xl">
          <SectionHeader
            align="center"
            title={
              <span id="contact-heading" className="text-copper">
                Initiate Connection
              </span>
            }
            description="Let's establish a communication channel. Send a packet and receive an ACK within 24-48 hours."
          />

          {/* Contact Form Card */}
          <div className="bg-substrate-raised border-trace relative overflow-hidden rounded-xl border-2 p-6 sm:p-8 lg:p-10">
            {/* Corner accents */}
            <span className="border-copper absolute top-0 left-0 h-3 w-3 border-t-2 border-l-2" />
            <span className="border-copper absolute top-0 right-0 h-3 w-3 border-t-2 border-r-2" />
            <span className="border-copper absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2" />
            <span className="border-copper absolute right-0 bottom-0 h-3 w-3 border-r-2 border-b-2" />

            {/* Form */}
            <HandshakeForm />
          </div>

          {/* Additional Contact Info */}
          <div className="mt-8 text-center">
            <p className="text-text-tertiary font-mono text-sm">
              Prefer direct routing?{' '}
              <a
                href="mailto:contact@raflizaardiansa.dev"
                className="text-copper hover:text-copper-bright underline transition-colors"
              >
                contact@raflizaardiansa.dev
              </a>
            </p>
          </div>

          {/* Accessibility description */}
          <div className="sr-only">
            <p>
              Contact form with three fields: name (SYN - initiate connection), email (SYN-ACK -
              acknowledge and reply), and message (ACK - establish connection). Submit to send a
              message and receive a response within 24-48 hours.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
