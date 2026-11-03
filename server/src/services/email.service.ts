import nodemailer from 'nodemailer';
import { env } from '../config/env.js';

let transporter: nodemailer.Transporter | null = null;

if (env.SMTP_USER && env.SMTP_PASS) {
  const cleanPass = env.SMTP_PASS.replace(/\s+/g, '');
  transporter = nodemailer.createTransport({
    host: env.SMTP_HOST || 'smtp.gmail.com',
    port: env.SMTP_PORT || 465,
    secure: (env.SMTP_PORT || 465) === 465,
    auth: {
      user: env.SMTP_USER,
      pass: cleanPass,
    },
  });
}

export const emailService = {
  /**
   * Send notification to Pranav when someone submits the contact form
   */
  async sendContactNotification(inquiry: {
    inquiryNumber: string;
    fullName: string;
    email: string;
    company?: string | null;
    subject: string;
    inquiryType: string;
    message: string;
  }): Promise<void> {
    if (!transporter) {
      console.log('[EmailService: Dev Mode] Inbound notification email logged:', inquiry.inquiryNumber);
      return;
    }

    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e5e5e5; border-radius: 12px; background: #ffffff;">
        <h2 style="color: #8b2323; margin-top: 0;">New Inquiry: ${inquiry.inquiryNumber}</h2>
        <p><strong>From:</strong> ${inquiry.fullName} (<a href="mailto:${inquiry.email}">${inquiry.email}</a>)</p>
        ${inquiry.company ? `<p><strong>Company:</strong> ${inquiry.company}</p>` : ''}
        <p><strong>Type:</strong> ${inquiry.inquiryType}</p>
        <p><strong>Subject:</strong> ${inquiry.subject}</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
        <div style="background: #faf8f5; padding: 16px; border-radius: 8px; font-size: 14px; line-height: 1.6; color: #222;">
          ${inquiry.message.replace(/\n/g, '<br/>')}
        </div>
        <p style="font-size: 12px; color: #888; margin-top: 20px;">
          Sent from Pranav Shende Portfolio System • <a href="${env.CLIENT_URL}/admin/messages" style="color: #8b2323;">View in Admin Panel</a>
        </p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Portfolio Inquiries" <${env.SMTP_USER}>`,
      to: env.NOTIFICATION_EMAIL,
      replyTo: inquiry.email,
      subject: `[Portfolio Inquiry] ${inquiry.subject} — ${inquiry.fullName}`,
      html: htmlContent,
    });
  },

  /**
   * Send automated acknowledgment confirmation email to the visitor
   */
  async sendContactAcknowledgment(toEmail: string, fullName: string, inquiryNumber: string, subject: string): Promise<void> {
    if (!transporter) {
      console.log(`[EmailService: Dev Mode] Acknowledgment email for ${toEmail} (${inquiryNumber}) logged.`);
      return;
    }

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: auto; padding: 32px 24px; border: 1px solid #e7ded4; border-radius: 16px; background: #faf7f2;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="color: #8b2323; font-size: 24px; margin: 0; font-family: Georgia, serif;">Pranav Shende</h1>
          <p style="color: #78716c; font-size: 13px; margin: 4px 0 0 0;">Full Stack Developer & AI Engineer</p>
        </div>

        <div style="background: #ffffff; padding: 24px; border-radius: 12px; border: 1px solid #e7ded4; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
          <h2 style="color: #1c1917; font-size: 18px; margin-top: 0;">Your message has been received! 👋</h2>
          <p style="font-size: 14px; color: #44403c; line-height: 1.6;">
            Hi <strong>${fullName}</strong>,
          </p>
          <p style="font-size: 14px; color: #44403c; line-height: 1.6;">
            Thank you for reaching out through my portfolio. Your response has been successfully sent and recorded under reference ID <strong>${inquiryNumber}</strong>.
          </p>
          <p style="font-size: 14px; color: #44403c; line-height: 1.6;">
            I will review your message regarding "<em>${subject}</em>" and get back to you as soon as possible.
          </p>
          <div style="margin: 20px 0; padding: 14px 18px; background: #fdfaf6; border-left: 4px solid #8b2323; border-radius: 6px;">
            <p style="margin: 0; font-size: 13px; color: #57534e;">
              <strong>Reference Number:</strong> ${inquiryNumber}<br/>
              <strong>Status:</strong> Received & Queued for Review
            </p>
          </div>
          <p style="font-size: 13px; color: #78716c; line-height: 1.5; margin-bottom: 0;">
            In the meantime, feel free to inspect my live projects, open-source repositories, and IEEE research publications on my website.
          </p>
        </div>

        <div style="text-align: center; margin-top: 24px;">
          <p style="font-size: 13px; color: #78716c; margin: 0;">
            Warm regards,<br />
            <strong style="color: #1c1917;">Pranav Shende</strong><br />
            <a href="https://pranavshende.online" style="color: #8b2323; text-decoration: none; font-size: 12px;">pranavshende.online</a>
          </p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Pranav Shende" <${env.SMTP_USER}>`,
      to: toEmail,
      subject: `Your message has been received [${inquiryNumber}] — Pranav Shende`,
      html: htmlContent,
    });
  },
};
