import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

/**
 * Contact API Route
 *
 * Handles contact form submissions with Resend email delivery.
 * Validates request body and implements basic rate limiting considerations.
 *
 * Requirements: 16.3, 16.10
 */

const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiting: Store IP addresses and timestamps (in-memory, simple approach)
// For production, use Redis or similar
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 3; // Max 3 requests per minute

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const requests = rateLimitMap.get(identifier) || [];

  // Filter out requests outside the time window
  const recentRequests = requests.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW);

  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false; // Rate limit exceeded
  }

  // Add current request
  recentRequests.push(now);
  rateLimitMap.set(identifier, recentRequests);

  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip =
      request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Rate limit exceeded. Please try again later.',
        },
        { status: 429 }
      );
    }

    // Parse request body
    const body: ContactFormData = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: name, email, and message are required.',
        },
        { status: 400 }
      );
    }

    // Validate name (min 2 chars, max 100 chars)
    if (body.name.trim().length < 2 || body.name.trim().length > 100) {
      return NextResponse.json(
        {
          success: false,
          error: 'Name must be between 2 and 100 characters.',
        },
        { status: 400 }
      );
    }

    // Validate email format
    if (!isValidEmail(body.email)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email address format.',
        },
        { status: 400 }
      );
    }

    // Validate message (min 10 chars, max 5000 chars)
    if (body.message.trim().length < 10 || body.message.trim().length > 5000) {
      return NextResponse.json(
        {
          success: false,
          error: 'Message must be between 10 and 5000 characters.',
        },
        { status: 400 }
      );
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        {
          success: false,
          error: 'Email service is not configured. Please contact the administrator.',
        },
        { status: 500 }
      );
    }

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: process.env.CONTACT_EMAIL || 'contact@raflizaardiansa.dev',
      replyTo: body.email,
      subject: `Contact Form: ${body.name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #d4a574, #e8c49a);
                color: #0a0f0d;
                padding: 20px;
                border-radius: 8px 8px 0 0;
              }
              .content {
                background: #f5f5f5;
                padding: 20px;
                border-radius: 0 0 8px 8px;
              }
              .field {
                margin-bottom: 15px;
              }
              .label {
                font-weight: 600;
                color: #666;
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
              }
              .value {
                margin-top: 5px;
                color: #333;
              }
              .message {
                background: white;
                padding: 15px;
                border-radius: 4px;
                white-space: pre-wrap;
                word-wrap: break-word;
              }
              .footer {
                margin-top: 20px;
                padding-top: 20px;
                border-top: 1px solid #ddd;
                font-size: 12px;
                color: #999;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h2 style="margin: 0;">New Contact Form Submission</h2>
              <p style="margin: 5px 0 0 0; opacity: 0.9;">From The Schematic Network</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name</div>
                <div class="value">${body.name}</div>
              </div>
              <div class="field">
                <div class="label">Email</div>
                <div class="value"><a href="mailto:${body.email}">${body.email}</a></div>
              </div>
              <div class="field">
                <div class="label">Message</div>
                <div class="message">${body.message}</div>
              </div>
              <div class="footer">
                <p>Received: ${new Date().toLocaleString('en-US', {
                  dateStyle: 'full',
                  timeStyle: 'long',
                })}</p>
                <p>IP: ${ip}</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend API error:', error);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to send email. Please try again later.',
        },
        { status: 500 }
      );
    }

    // Success response
    return NextResponse.json(
      {
        success: true,
        message: 'Message sent successfully. You will receive a response within 24-48 hours.',
        id: data?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact API error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred. Please try again later.',
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to submit contact form.' },
    { status: 405 }
  );
}
