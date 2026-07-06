import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields (Name, Email, Message) are required.' },
        { status: 400 }
      );
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'RESEND_API_KEY is not configured in .env.local' },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const data = await resend.emails.send({
      from: 'Portfolio Contact Form <onboarding@resend.dev>',
      to: ['awanusbah@gmail.com'],
      replyTo: email,
      subject: `New Portfolio Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
          <h2 style="color: #10b981; margin-top: 0; font-size: 20px;">New Contact Form Submission</h2>
          <p style="margin: 8px 0; color: #374151;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 8px 0; color: #374151;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #10b981;">${email}</a></p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          <h3 style="color: #111827; margin-bottom: 12px; font-size: 16px;">Message:</h3>
          <p style="white-space: pre-wrap; color: #4b5563; line-height: 1.6; background-color: #f9fafb; padding: 16px; border-radius: 8px; border: 1px solid #f3f4f6;">${message}</p>
        </div>
      `,
    });

    if (data.error) {
      console.error('Resend API Error:', data.error);
      return NextResponse.json(
        { error: data.error.message || 'Failed to send email via Resend' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: error?.message || 'An unexpected error occurred while sending your message.' },
      { status: 500 }
    );
  }
}
