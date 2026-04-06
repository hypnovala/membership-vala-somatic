# membership-vala-somatic

## Waitlist email delivery

Set one of these env vars in Vercel:

- `WAITLIST_WEBHOOK_URL` (preferred): any webhook endpoint (ConvertKit, Mailchimp, Zapier, Make, Supabase, etc.)
- `WAITLIST_GMAIL_TO`: your Gmail address to send waitlist submissions to Gmail via FormSubmit

### Gmail setup

1. In Vercel, set:

   ```bash
   WAITLIST_GMAIL_TO=yourname@gmail.com
   ```

2. Deploy once.
3. Submit a test waitlist entry from the site.
4. Check your Gmail inbox for the first FormSubmit verification email and confirm it.

After verification, new waitlist signups are forwarded to your Gmail inbox.
