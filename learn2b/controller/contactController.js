import { Resend } from 'resend';

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Handle contact form submission
const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Learn2Drive Contact Form <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL,
      subject: `New Contact from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ error: 'Failed to send message. Please try again.' });
    }

    // Send auto-reply to the user
    const { error: autoReplyError } = await resend.emails.send({
      from: 'Learn2Drive Contact Form <onboarding@resend.dev>',
      to: email,
      subject: 'Thank you for contacting Learn2Drive',
      html: `
        <h2>Thank you for contacting Learn2Drive</h2>
        <p>Dear ${name},</p>
        <p>We have received your message and will get back to you as soon as possible.</p>
        <p>Best regards,<br>The Learn2Drive Team</p>
      `
    });

    if (autoReplyError) {
      console.error('Error sending auto-reply:', autoReplyError);
      // Don't return error to user since main email was sent successfully
    }

    res.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error in contact form submission:', error);
    res.status(500).json({ error: 'Failed to send message. Please try again.' });
  }
};

export { submitContactForm }; 