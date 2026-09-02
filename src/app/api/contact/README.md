# Contact API Route

## Setup Instructions

### 1. Install Resend Package

```bash
npm install resend
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Update the following variables in `.env.local`:

```env
RESEND_API_KEY=re_your_actual_api_key_here
RESEND_FROM_EMAIL=onboarding@yourdomain.com
CONTACT_EMAIL=contact@raflizaardiansa.dev
```

### 3. Get Resend API Key

1. Sign up at [https://resend.com](https://resend.com)
2. Go to [API Keys](https://resend.com/api-keys)
3. Create a new API key
4. Copy and paste into your `.env.local` file

### 4. Verify Your Domain (Production)

For production, you need to verify your sending domain:

1. Go to [Resend Domains](https://resend.com/domains)
2. Add your domain
3. Add DNS records as instructed
4. Update `RESEND_FROM_EMAIL` to use your verified domain

## API Endpoint

### POST `/api/contact`

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'd like to connect..."
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Message sent successfully. You will receive a response within 24-48 hours.",
  "id": "email-id-from-resend"
}
```

**Error Response (400/429/500):**

```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

## Validation Rules

- **Name**: 2-100 characters
- **Email**: Valid email format
- **Message**: 10-5000 characters

## Rate Limiting

- **Window**: 60 seconds
- **Max Requests**: 3 per IP address
- **Response**: 429 Too Many Requests

## Security Features

- ✅ Input validation
- ✅ Email format validation
- ✅ Rate limiting by IP
- ✅ Environment variable protection
- ✅ Error handling with safe messages
- ✅ Request body size limits (Next.js default)

## Testing

### Development Testing

For development, Resend allows sending to any email without domain verification:

```bash
# Test with curl
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message from the contact form."
  }'
```

### Integration with Form

The `HandshakeForm` component automatically uses this API endpoint:

```typescript
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
});
```

## Production Considerations

1. **Replace In-Memory Rate Limiting**: Use Redis or similar for distributed rate limiting
2. **Add CORS Headers**: If needed for external API calls
3. **Implement Logging**: Use structured logging service (e.g., Sentry, Datadog)
4. **Add Honeypot Field**: Prevent spam bot submissions
5. **Implement CAPTCHA**: Optional for high-traffic sites
6. **Monitor Email Delivery**: Set up Resend webhooks for delivery status

## Troubleshooting

### "Email service is not configured"

- Ensure `RESEND_API_KEY` is set in `.env.local`
- Restart your dev server after adding environment variables

### "Failed to send email"

- Check Resend API key is valid
- Verify you haven't exceeded Resend's rate limits
- Check Resend dashboard for error logs

### Rate Limit Issues

- Clear in-memory rate limit map by restarting server
- For production, implement Redis-based rate limiting

## References

- [Resend Documentation](https://resend.com/docs)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Environment Variables in Next.js](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
