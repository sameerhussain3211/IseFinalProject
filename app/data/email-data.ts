// Define the PhishingTechnique type
export type PhishingTechnique =
  | "urgency_scareware"
  | "spoofing"
  | "credential_harvesting"
  | "lottery_advance_fee"
  | "fake_security_alert"
  | "typosquatting"
  | "fake_compliance"

// Define the Email interface
export interface Email {
  id: number
  subject: string
  sender: string
  content: string
  isPhishing: boolean
  technique?: PhishingTechnique
}

// Email data for different difficulty levels - 8 emails each, more realistic and longer
export const emailData: Record<"easy" | "medium" | "hard", Email[]> = {
  easy: [
    {
      id: 1,
      subject: "Welcome to SecureBank - Your Account is Ready",
      sender: "welcome@securebank.com",
      content: `Dear Valued Customer,

Welcome to SecureBank! We're excited to have you as part of our banking family.

Your new checking account (****1234) has been successfully opened and is now active. Here's what you can do next:

• Set up online banking at www.securebank.com/login
• Download our mobile app from your device's app store
• Visit any of our 500+ branch locations nationwide
• Call our customer service at 1-800-SECURE-1 for assistance

Your debit card will arrive within 7-10 business days at the address we have on file. For security purposes, it will be sent in a separate envelope from your PIN.

Thank you for choosing SecureBank. We look forward to serving your financial needs.

Best regards,
The SecureBank Team

This email was sent to the address associated with your account. If you have questions, please contact us at 1-800-SECURE-1.`,
      isPhishing: false,
    },
    {
      id: 2,
      subject: "URGENT: Your Amazon Account Has Been Suspended - Immediate Action Required",
      sender: "account-security@amaz0n-verification.com",
      technique: "urgency_scareware",
      content: `SECURITY ALERT - IMMEDIATE ACTION REQUIRED

Dear Amazon Customer,

We have detected suspicious activity on your Amazon account and have temporarily suspended it for your protection. 

SUSPICIOUS ACTIVITIES DETECTED:
- Multiple failed login attempts from unknown locations
- Unusual purchasing patterns detected
- Potential unauthorized access to your payment methods

YOUR ACCOUNT WILL BE PERMANENTLY DELETED IN 24 HOURS unless you verify your identity immediately.

To restore your account access, you must:
1. Click here to verify your account: http://amazon-security-verify.net/urgent
2. Provide your login credentials for verification
3. Confirm your payment information
4. Upload a photo of your government-issued ID

WARNING: Failure to complete verification within 24 hours will result in permanent account closure and loss of all order history, Prime benefits, and stored payment methods.

This is an automated security message. Do not reply to this email.

Amazon Security Team
Case #: AMZ-SEC-789456123`,
      isPhishing: true,
    },
    {
      id: 3,
      subject: "Your Monthly Statement is Ready - TechCorp Services",
      sender: "billing@techcorp.com",
      content: `Hello John,

Your monthly statement for TechCorp Services is now available for review.

Account Summary for March 2024:
- Account Number: TC-789456
- Service Plan: Professional Package
- Billing Period: March 1-31, 2024
- Amount Due: $89.99
- Due Date: April 15, 2024

Services Included This Month:
• Cloud Storage (500GB)
• Premium Support
• Advanced Analytics Dashboard
• API Access (10,000 calls)

You can view your detailed statement by logging into your account dashboard at www.techcorp.com/billing. Payment can be made online using your saved payment method or by calling our billing department at (555) 123-4567.

If you have any questions about your statement or services, please don't hesitate to contact our support team.

Thank you for being a valued TechCorp customer.

Best regards,
TechCorp Billing Department

To unsubscribe from billing notifications, visit your account preferences.`,
      isPhishing: false,
    },
    {
      id: 4,
      subject: "CONGRATULATIONS! You've Won the International Lottery - $2,500,000 Prize!",
      sender: "winner-notification@international-lottery-foundation.org",
      technique: "lottery_advance_fee",
      content: `OFFICIAL WINNER NOTIFICATION

Dear Lucky Winner,

CONGRATULATIONS! You have been selected as the GRAND PRIZE WINNER of the International Lottery Foundation's monthly drawing!

WINNING DETAILS:
Prize Amount: $2,500,000.00 USD
Ticket Number: ILF-2024-789456
Reference Number: WIN/ILF/2024/MAR/789
Batch Number: 45/67/ILF/2024

Your email address was randomly selected from millions of active email addresses worldwide. You did not need to purchase a ticket to win!

TO CLAIM YOUR PRIZE IMMEDIATELY:
1. Reply to this email with your full name, address, and phone number
2. Provide your bank account details for direct transfer
3. Send a processing fee of $500 via Western Union to cover international transfer costs
4. Provide a copy of your government-issued ID

IMPORTANT: You must claim your prize within 72 hours or it will be forfeited to the next winner.

Contact our claims agent immediately:
Mr. James Wilson
Email: claims@international-lottery-foundation.org
Phone: +44-7911-123456

Congratulations once again!

International Lottery Foundation
London, United Kingdom`,
      isPhishing: true,
    },
    {
      id: 5,
      subject: "Team Meeting Agenda - Project Alpha Review",
      sender: "sarah.johnson@yourcompany.com",
      content: `Hi Team,

I hope everyone is having a productive week. I wanted to send out the agenda for our upcoming team meeting scheduled for Friday, April 5th at 2:00 PM in Conference Room B.

Meeting Agenda:
1. Project Alpha Status Update (15 minutes)
   - Current milestone progress
   - Budget review
   - Timeline adjustments

2. Q2 Planning Discussion (20 minutes)
   - Resource allocation
   - New project proposals
   - Team capacity planning

3. Client Feedback Review (10 minutes)
   - Recent client surveys
   - Action items for improvement

4. Administrative Updates (10 minutes)
   - New company policies
   - Upcoming training opportunities
   - Office renovation schedule

5. Open Discussion (15 minutes)

Please come prepared with your project status reports and any questions or concerns you'd like to discuss. If you cannot attend, please send your updates to me by Thursday evening.

Looking forward to seeing everyone there!

Best regards,
Sarah Johnson
Project Manager
Direct: (555) 987-6543
sarah.johnson@yourcompany.com`,
      isPhishing: false,
    },
    {
      id: 6,
      subject: "Your PayPal Account Has Been Limited - Verify Now",
      sender: "security-noreply@paypaI-protection.com",
      technique: "typosquatting",
      content: `PayPal Account Limitation Notice

Dear PayPal User,

We have limited your PayPal account due to security concerns. Recent activity on your account has triggered our fraud protection systems.

ACCOUNT STATUS: LIMITED ACCESS
REASON: Suspicious transaction patterns detected
ACTION REQUIRED: Immediate verification needed

Recent concerning activities:
• Login from unrecognized device (IP: 192.168.1.1)
• Large transaction attempt ($1,247.99)
• Multiple failed password attempts
• Account accessed from new location (Moscow, Russia)

To restore full access to your account:
1. Click here to verify your identity: https://paypal-account-verification.secure-login.net
2. Confirm your account information
3. Verify your linked bank account and credit cards
4. Update your security questions

If you do not complete verification within 48 hours, your account will be permanently suspended and all funds will be held for 180 days.

This is an automated security email. Please do not reply.

PayPal Security Department
Reference ID: PP-SEC-456789123`,
      isPhishing: true,
    },
    {
      id: 7,
      subject: "Password Reset Confirmation - Your Account is Secure",
      sender: "security@linkedin.com",
      content: `Hi there,

We wanted to let you know that your LinkedIn password was successfully changed on April 3, 2024 at 3:42 PM PDT.

If you made this change, no further action is needed. Your account remains secure.

If you didn't make this change:
• Immediately sign in to your account and change your password
• Review your recent account activity
• Consider enabling two-step verification for added security
• Contact our support team if you need assistance

For your security, we recommend:
✓ Using a unique, strong password for your LinkedIn account
✓ Enabling two-step verification
✓ Regularly reviewing your account activity
✓ Being cautious of suspicious emails or links

You can review your account security settings at any time by visiting:
https://www.linkedin.com/psettings/privacy

If you have any questions or concerns about your account security, please visit our Help Center or contact our support team.

Thanks,
The LinkedIn Team

This email was sent to the email address associated with your LinkedIn account. If you no longer wish to receive security notifications, you can adjust your email preferences in your account settings.`,
      isPhishing: false,
    },
    {
      id: 8,
      subject: "IRS Tax Refund Processing - Action Required for $1,247 Refund",
      sender: "refund-processing@irs-treasury.gov.us",
      technique: "fake_security_alert",
      content: `Internal Revenue Service
United States Department of Treasury

OFFICIAL TAX REFUND NOTIFICATION

Taxpayer ID: [Your SSN]
Refund Amount: $1,247.00
Tax Year: 2023
Processing Date: April 3, 2024

Dear Taxpayer,

Our records indicate that you are eligible for a tax refund of $1,247.00 for the 2023 tax year. However, we need to verify your information before processing the refund.

REFUND STATUS: PENDING VERIFICATION
REASON: Updated banking regulations require additional verification

To receive your refund via direct deposit, please:
1. Click here to access the secure IRS portal: http://irs-refund-processing.treasury-gov.net
2. Verify your Social Security Number
3. Confirm your banking information
4. Provide your 2023 tax return information

IMPORTANT: You must complete verification within 72 hours or your refund will be delayed by 6-8 weeks and may be subject to additional processing fees.

For faster processing, you may also call our automated refund hotline at 1-800-TAX-FAST and provide the following information:
- Your Social Security Number
- Date of birth
- Bank account number and routing number

This is an official communication from the Internal Revenue Service.

IRS Refund Processing Department
Reference Number: IRS-REF-2024-789456`,
      isPhishing: true,
    },
  ],
  medium: [
    {
      id: 9,
      subject: "Security Alert: New Device Login Detected",
      sender: "security@paypaI.com",
      technique: "spoofing",
      content: `PayPal Security Alert

Hello,

We detected a new login to your PayPal account from a device we don't recognize.

Login Details:
• Date: April 3, 2024, 11:47 PM PDT
• Device: Windows PC
• Browser: Chrome 122.0
• Location: Chicago, IL, United States
• IP Address: 192.168.45.123

If this was you:
No action is needed. You're all set.

If this wasn't you:
Your account may be compromised. Please secure your account immediately by:
1. Changing your password
2. Reviewing recent account activity
3. Enabling two-factor authentication

To review this login or secure your account, please visit:
https://www.paypal.com/myaccount/security

We'll never ask for sensitive information like passwords or PINs in an email. If you receive suspicious emails claiming to be from PayPal, please forward them to spoof@paypal.com.

Thanks for helping us keep your account secure.

The PayPal Team

Questions? Visit the PayPal Help Center or contact us.
PayPal Holdings, Inc.`,
      isPhishing: true,
    },
    {
      id: 10,
      subject: "Invoice #INV-2024-3456 - Web Development Services",
      sender: "billing@webdesignpro.com",
      content: `Invoice for Professional Services

Dear Client,

Thank you for choosing WebDesign Pro for your recent project. Please find your invoice details below:

INVOICE INFORMATION:
Invoice Number: INV-2024-3456
Invoice Date: April 1, 2024
Due Date: April 31, 2024
Project: E-commerce Website Development

SERVICES PROVIDED:
• Custom website design and development (40 hours) - $4,000.00
• E-commerce integration and setup (12 hours) - $1,200.00
• Mobile responsive optimization (8 hours) - $800.00
• SEO optimization and setup (6 hours) - $600.00
• Content management system setup (4 hours) - $400.00

Subtotal: $7,000.00
Tax (8.5%): $595.00
Total Amount Due: $7,595.00

PAYMENT INFORMATION:
You can pay this invoice through several methods:
• Online payment portal: www.webdesignpro.com/pay-invoice
• Check payable to: WebDesign Pro LLC
• Bank transfer (contact us for details)

The project has been completed according to specifications and is now live at your domain. All source files and documentation have been provided via our secure client portal.

If you have any questions about this invoice or need assistance, please contact our billing department at billing@webdesignpro.com or call (555) 123-4567.

Thank you for your business!

Best regards,
WebDesign Pro Billing Team`,
      isPhishing: false,
    },
    {
      id: 11,
      subject: "Microsoft Office 365 License Expiration - Renew Now to Avoid Service Interruption",
      sender: "licensing@microsft-renewal.com",
      technique: "urgency_scareware",
      content: `Microsoft Office 365 License Renewal Required

Dear Office 365 User,

Your Microsoft Office 365 license is set to expire in 3 days (April 6, 2024). To avoid interruption of your Office applications and services, immediate renewal is required.

LICENSE INFORMATION:
• License Type: Office 365 Business Premium
• Expiration Date: April 6, 2024
• Registered Email: [Your Email]
• License Key: XXXXX-XXXXX-XXXXX-XXXXX

SERVICES THAT WILL BE AFFECTED:
✗ Microsoft Word, Excel, PowerPoint, Outlook
✗ OneDrive cloud storage (1TB)
✗ Microsoft Teams
✗ SharePoint Online
✗ Exchange Online email hosting

RENEWAL OPTIONS:
1. Automatic Renewal (Recommended): $12.50/month
2. Annual Payment: $150.00/year (Save $0!)
3. Download Renewal Tool: Click here to download our automatic renewal utility

To renew your license immediately:
1. Download the Microsoft License Renewal Tool: http://microsoft-office-renewal.net/download
2. Run the tool and enter your current license information
3. Provide payment information for seamless renewal
4. Your license will be automatically extended for 12 months

WARNING: If you do not renew within 72 hours, you will lose access to all Office applications and your OneDrive files may be permanently deleted.

For immediate assistance, contact Microsoft Licensing Support:
Phone: 1-800-MSFT-LIC
Email: licensing@microsoft-renewal.com

Microsoft Corporation
Licensing Department`,
      isPhishing: true,
    },
    {
      id: 12,
      subject: "Weekly Team Update - Marketing Department",
      sender: "mike.chen@yourcompany.com",
      content: `Weekly Marketing Team Update - Week of March 30, 2024

Hi Marketing Team,

I hope everyone had a productive week! Here's our weekly update with key accomplishments, upcoming priorities, and important announcements.

THIS WEEK'S ACCOMPLISHMENTS:
• Launched Q2 social media campaign - 15% increase in engagement
• Completed website redesign project - new site goes live Monday
• Finalized partnership agreement with TechStartup Inc.
• Email marketing campaign achieved 4.2% click-through rate (above industry average)

UPCOMING PRIORITIES (April 1-5):
• Product launch event planning (April 15 deadline)
• Q1 performance analysis and reporting
• Customer survey data analysis
• Trade show booth design finalization

TEAM ANNOUNCEMENTS:
• Welcome to Jessica Rodriguez, our new Digital Marketing Specialist
• Marketing budget meeting scheduled for Tuesday, April 2 at 10 AM
• New project management tool training session on Wednesday
• Team lunch celebration for Q1 goals achievement - Friday at noon

METRICS UPDATE:
• Website traffic: +22% month-over-month
• Lead generation: 847 qualified leads (target: 800)
• Social media followers: +1,247 across all platforms
• Email list growth: +156 subscribers

ACTION ITEMS:
• Sarah: Complete competitor analysis by Tuesday
• David: Finalize event vendor contracts by Wednesday
• Lisa: Submit Q1 budget reconciliation by Friday

Great work everyone! Let's keep the momentum going into Q2.

Best regards,
Mike Chen
Marketing Director
mike.chen@yourcompany.com
Direct: (555) 234-5678`,
      isPhishing: false,
    },
    {
      id: 13,
      subject: "Apple ID Security: Suspicious Activity Detected - Verify Account",
      sender: "security@apple-id-verification.com",
      technique: "credential_harvesting",
      content: `Apple ID Security Alert

Dear Apple ID User,

We have detected unusual activity on your Apple ID account that requires immediate attention.

SECURITY CONCERNS IDENTIFIED:
• Multiple failed login attempts from unknown devices
• Suspicious App Store purchases detected
• Account accessed from high-risk geographic location
• Potential unauthorized access to iCloud data

ACCOUNT STATUS: TEMPORARILY RESTRICTED
Your Apple ID: [Your Email Address]
Restriction Date: April 3, 2024
Case Number: APPL-SEC-789456123

IMMEDIATE ACTION REQUIRED:
To protect your account and restore full access, you must verify your identity within 24 hours.

Verification Process:
1. Click here to access Apple ID Security Portal: https://appleid-security-verification.com/verify
2. Enter your Apple ID and current password
3. Verify your identity using two-factor authentication
4. Review and confirm your account information
5. Update your security questions and answers

CONSEQUENCES OF DELAYED ACTION:
• Permanent suspension of Apple ID
• Loss of access to App Store, iTunes, and iCloud
• Potential loss of all iCloud data including photos, documents, and backups
• Inability to use Find My iPhone and other Apple services

This security alert was generated automatically by Apple's fraud detection system. For your protection, please do not share this email or your verification information with anyone.

If you need assistance, contact Apple Support:
Phone: 1-800-APL-CARE
Email: security@apple-support.com

Apple Security Team
Cupertino, CA`,
      isPhishing: true,
    },
    {
      id: 14,
      subject: "Document Shared: Q1 Financial Report - Review Required",
      sender: "finance@yourcompany.com",
      content: `Document Sharing Notification

Hello,

A document has been shared with you that requires your review and approval.

DOCUMENT DETAILS:
• Title: Q1 2024 Financial Report - Final Draft
• Shared by: Jennifer Martinez, CFO
• Document Type: Excel Spreadsheet (.xlsx)
• File Size: 2.4 MB
• Shared Date: April 3, 2024
• Access Level: View and Comment

REVIEW REQUIREMENTS:
Please review the following sections and provide feedback by April 8, 2024:
• Revenue analysis (Tab 2)
• Expense breakdown (Tab 3)
• Departmental budget variances (Tab 5)
• Q2 projections (Tab 7)

To access the document:
1. Log into the company portal at portal.yourcompany.com
2. Navigate to "Shared Documents"
3. Click on "Q1 2024 Financial Report - Final Draft"
4. Use the comment feature to provide feedback

IMPORTANT NOTES:
• This document contains confidential financial information
• Please ensure you're on a secure network when accessing
• Do not forward or share this document outside the organization
• The document will be available for review until April 10, 2024

If you have trouble accessing the document or have questions about the content, please contact:
• Jennifer Martinez (CFO): jennifer.martinez@yourcompany.com
• IT Support: itsupport@yourcompany.com

Thank you for your prompt attention to this matter.

Best regards,
Document Management System
YourCompany Inc.`,
      isPhishing: false,
    },
    {
      id: 15,
      subject: "Bank of America: Unusual Account Activity - Immediate Verification Required",
      sender: "alerts@bankofamerica-security.net",
      technique: "fake_security_alert",
      content: `Bank of America Security Alert

URGENT: Unusual Activity Detected on Your Account

Dear Valued Customer,

Our fraud monitoring system has detected unusual activity on your Bank of America account that requires immediate attention.

ACCOUNT INFORMATION:
• Account Number: ****1234
• Alert Date: April 3, 2024, 2:15 PM EST
• Alert Type: High-Risk Transaction Attempt

SUSPICIOUS ACTIVITIES DETECTED:
1. Large withdrawal attempt: $2,500.00 at ATM in Miami, FL
2. Online login from unrecognized device (IP: 203.45.67.89)
3. Multiple failed PIN attempts
4. Account information accessed from foreign location

IMMEDIATE ACTION REQUIRED:
To protect your account and prevent unauthorized access:

1. Verify your identity immediately by clicking here: https://bankofamerica-verify.secure-banking.net
2. Confirm recent transactions and account activity
3. Update your online banking password and PIN
4. Review and verify your contact information

ACCOUNT STATUS: TEMPORARILY RESTRICTED
Your account has been temporarily restricted to prevent further unauthorized activity. Normal access will be restored once verification is complete.

TIME-SENSITIVE: You must complete verification within 6 hours or your account will be permanently frozen pending investigation.

If you recognize this activity as legitimate, please still complete the verification process to remove the security restriction.

For immediate assistance:
• Call: 1-800-BOFA-SEC (available 24/7)
• Visit: Any Bank of America branch with valid ID

Bank of America Security Department
Member FDIC
Reference: BOA-SEC-2024-456789`,
      isPhishing: true,
    },
    {
      id: 16,
      subject: "Apple ID: Password Successfully Changed",
      sender: "noreply@apple.com",
      content: `Your Apple ID password was changed

Hi,

This email confirms that the password for your Apple ID was changed on April 3, 2024 at 4:23 PM PDT.

Apple ID: your.email@example.com

If you made this change:
No further action is required.

If you didn't make this change:
Your Apple ID may be compromised. To secure your account:
• Go to appleid.apple.com and sign in
• Change your password immediately
• Review your account information and recent activity
• Consider enabling two-factor authentication if you haven't already

For additional security, we recommend:
• Using a strong, unique password for your Apple ID
• Enabling two-factor authentication
• Keeping your trusted devices and phone numbers up to date
• Being cautious of phishing attempts

If you need help securing your account or have questions about this change, contact Apple Support:
• Visit support.apple.com
• Call 1-800-APL-CARE
• Use the Apple Support app

This email was sent to the email address associated with your Apple ID. If you no longer use this email address, you can update it at appleid.apple.com.

Apple Support`,
      isPhishing: false,
    },
  ],
  hard: [
    {
      id: 17,
      subject: "Action Required: Update Your Payment Information - Netflix",
      sender: "billing@netflix.com",
      content: `We're having trouble with your current payment method

Hi,

We weren't able to process payment for your Netflix membership using your Visa ending in 4567.

To keep your account active and avoid any interruption to your service, please update your payment information by April 10, 2024.

What you need to do:
1. Go to netflix.com/account
2. Sign in to your account
3. Select "Manage payment info"
4. Update your payment method

Your account will remain active until April 10, 2024. After this date, you won't be able to watch Netflix until you update your payment information.

If you recently updated your payment info, you can disregard this email. It may take a few days for our system to reflect your changes.

Questions? Visit the Help Center or call us.

Thanks,
The Netflix Team

This email was sent to the email address associated with your Netflix account. Netflix will never ask you to enter personal information in an email. Any email asking for payment information, passwords, or other account details should be treated as suspicious.`,
      isPhishing: false,
    },
    {
      id: 18,
      subject: "Google Security Alert: Suspicious Sign-in Attempt Blocked",
      sender: "security@googIe.com",
      technique: "spoofing",
      content: `Critical Security Alert - Immediate Action Required

Dear Google Account User,

We have detected and blocked a suspicious sign-in attempt to your Google account from an unrecognized device and location.

BLOCKED SIGN-IN ATTEMPT:
• Date/Time: April 3, 2024, 11:42 PM PDT
• Device: Unknown Android device
• Location: Lagos, Nigeria
• IP Address: 197.149.89.15
• Browser: Chrome Mobile 121.0

ADDITIONAL SECURITY CONCERNS:
Our advanced threat detection system has identified the following risks associated with your account:
• Multiple failed password attempts from various global locations
• Suspicious email forwarding rules detected in Gmail
• Potential malware infection on previously used devices
• Account credentials may have been compromised in recent data breach

IMMEDIATE SECURITY VERIFICATION REQUIRED:
To ensure your account remains secure and to prevent unauthorized access:

1. Verify your identity immediately: https://google-account-security.verification-center.net
2. Complete our enhanced security questionnaire
3. Confirm all devices that have accessed your account
4. Update your recovery information and backup codes
5. Enable advanced protection features

URGENT: Complete verification within 2 hours or your account will be temporarily suspended for security purposes.

Your Google services that may be affected:
• Gmail (email access)
• Google Drive (file storage)
• Google Photos (photo backup)
• YouTube (channel and subscriptions)
• Google Pay (payment services)
• Android device synchronization

This is an automated security message from Google's Trust & Safety team. Do not reply to this email.

For immediate assistance:
Phone: 1-855-GOOGLE-1
Email: security@google-support.com

Google Security Team
Mountain View, CA
Case Reference: GOOG-SEC-2024-789456`,
      isPhishing: true,
    },
    {
      id: 19,
      subject: "Shared Document: Project Proposal - Marketing Campaign 2024",
      sender: "collaboration@yourcompany.com",
      content: `Document Collaboration Notification

Hello,

You have been invited to collaborate on a document in our company workspace.

DOCUMENT DETAILS:
• Document Title: "Project Proposal - Marketing Campaign 2024"
• Shared by: Amanda Rodriguez, Marketing Director
• Document Type: Google Docs
• Sharing Date: April 3, 2024, 3:15 PM
• Access Level: Editor (can view, comment, and edit)

COLLABORATION DETAILS:
Amanda Rodriguez has invited you to review and contribute to the Q2 marketing campaign proposal. Your input is specifically requested on:

• Budget allocation recommendations (Section 3)
• Target audience analysis (Section 4)
• Digital marketing strategy (Section 6)
• Timeline and milestone planning (Section 8)

DEADLINE: Please complete your review and provide feedback by April 8, 2024, as this proposal will be presented to the executive team on April 10.

To access the document:
1. Click here to open: https://docs.google.com/document/d/1a2b3c4d5e6f7g8h9i0j/edit
2. Sign in with your company Google Workspace account
3. Use the comment feature (@mention) to provide specific feedback
4. Track changes are enabled for all edits

COLLABORATION GUIDELINES:
• Please use the suggestion mode when making edits
• Add comments for questions or clarifications
• Use @mentions to notify specific team members
• Keep discussions professional and constructive

Other collaborators on this document:
• Amanda Rodriguez (Owner)
• Michael Chen (Editor)
• Sarah Johnson (Commenter)
• David Park (Viewer)

If you have trouble accessing the document or questions about the collaboration, please contact:
• Amanda Rodriguez: amanda.rodriguez@yourcompany.com
• IT Support: support@yourcompany.com

Thank you for your collaboration!

Best regards,
Document Management System
YourCompany Workspace`,
      isPhishing: false,
    },
    {
      id: 20,
      subject: "Wells Fargo Security: Account Verification Required - Suspicious Activity",
      sender: "security@wellsfargo-online.com",
      technique: "credential_harvesting",
      content: `Wells Fargo Online Banking Security Alert

ACCOUNT SECURITY VERIFICATION REQUIRED

Dear Wells Fargo Customer,

We have identified potentially fraudulent activity on your Wells Fargo account and have implemented additional security measures to protect your funds.

ACCOUNT DETAILS:
• Account Holder: [Your Name]
• Account Number: ****5678
• Alert Date: April 3, 2024, 1:47 PM PST
• Security Level: HIGH RISK

SUSPICIOUS ACTIVITIES IDENTIFIED:
1. Unauthorized wire transfer attempt: $4,750.00 to overseas account
2. Multiple login attempts from IP addresses in Eastern Europe
3. Debit card usage in locations inconsistent with your profile
4. Account information accessed via unsecured network
5. Potential phishing attack targeting your credentials

IMMEDIATE SECURITY MEASURES ACTIVATED:
• Online banking access temporarily restricted
• Debit/credit card transactions limited to $500/day
• Wire transfers and large transactions blocked
• Account flagged for enhanced monitoring

REQUIRED VERIFICATION PROCESS:
To restore full account access and remove security restrictions:

Step 1: Identity Verification
• Access our secure verification portal: https://wellsfargo-security-center.com/verify
• Provide your full Social Security Number
• Confirm your date of birth and mother's maiden name

Step 2: Account Authentication
• Verify recent transaction history
• Confirm authorized devices and locations
• Update security questions and answers

Step 3: Enhanced Security Setup
• Enable multi-factor authentication
• Set up account alerts and notifications
• Review and update contact information

CRITICAL TIMELINE:
You must complete verification within 8 hours (by 9:47 PM PST today) or your account will be temporarily frozen pending manual review, which may take 5-7 business days.

PROTECT YOURSELF:
• Never share your login credentials with anyone
• Always verify the authenticity of security emails
• Contact us directly if you suspect fraud

For immediate assistance:
• Fraud Hotline: 1-800-WELLS-SEC (available 24/7)
• Online Chat: wellsfargo.com/security-help
• Visit any Wells Fargo branch with valid identification

Wells Fargo Bank Security Department
Member FDIC | Equal Housing Lender
Security Case #: WF-SEC-2024-456789123`,
      isPhishing: true,
    },
    {
      id: 21,
      subject: "Microsoft Teams: Meeting Recording Available - Q1 Review Session",
      sender: "noreply@teams.microsoft.com",
      content: `Meeting Recording Available

Hi,

The recording for "Q1 Business Review - Executive Team" is now available.

MEETING DETAILS:
• Meeting Title: Q1 Business Review - Executive Team
• Date: April 2, 2024
• Duration: 1 hour 23 minutes
• Organizer: Robert Chen, CEO
• Participants: 12 attendees

RECORDING INFORMATION:
• Recording started: April 2, 2024 at 2:00 PM PDT
• Recording ended: April 2, 2024 at 3:23 PM PDT
• File size: 847 MB
• Available until: July 2, 2024 (90 days)

To view the recording:
1. Go to Microsoft Teams
2. Navigate to "Calendar" > "Past meetings"
3. Find "Q1 Business Review - Executive Team"
4. Click "Recording" to play

You can also access the recording directly at:
https://teams.microsoft.com/l/meetup-join/19%3ameeting_abc123def456

ADDITIONAL RESOURCES:
• Meeting transcript (auto-generated)
• Shared presentation slides
• Chat messages from the meeting
• Action items and follow-ups

RECORDING FEATURES:
• Searchable transcript with timestamps
• Ability to download for offline viewing
• Share with team members who missed the meeting
• Create clips of important segments

PRIVACY NOTICE:
This recording contains confidential business information. Please ensure:
• Only authorized personnel have access
• Do not share outside the organization
• Follow company data retention policies
• Report any unauthorized access immediately

If you have questions about accessing the recording or need technical support:
• IT Helpdesk: support@yourcompany.com
• Microsoft Teams Support: https://support.microsoft.com/teams

This is an automated notification from Microsoft Teams. You received this because you were a participant in the recorded meeting.

Microsoft Teams
Microsoft Corporation`,
      isPhishing: false,
    },
    {
      id: 22,
      subject: "Chase Bank: Urgent Security Update Required - New Banking Regulations",
      sender: "compliance@chase-banking-security.org",
      technique: "fake_compliance",
      content: `JPMorgan Chase Bank - Compliance Department
URGENT: Mandatory Security Update Required

Dear Chase Bank Customer,

Due to new federal banking regulations effective April 1, 2024, all Chase Bank customers must complete a mandatory security update to maintain access to online banking services.

REGULATORY COMPLIANCE NOTICE:
The Federal Reserve and FDIC have implemented new cybersecurity requirements (Regulation CS-2024) that require all financial institutions to verify customer identity using enhanced authentication methods.

NEW REQUIREMENTS INCLUDE:
• Biometric verification for all online transactions
• Enhanced multi-factor authentication protocols
• Updated encryption standards for data transmission
• Mandatory security questionnaire completion
• Device registration and verification

COMPLIANCE DEADLINE: April 6, 2024 (72 hours remaining)

FAILURE TO COMPLY WILL RESULT IN:
• Immediate suspension of online banking access
• Temporary freeze on all electronic transactions
• Inability to use mobile banking applications
• Potential account closure per federal guidelines

MANDATORY COMPLIANCE STEPS:
1. Access the Chase Compliance Portal: https://chase-regulatory-compliance.banking-update.net
2. Complete the Federal Banking Security Questionnaire
3. Verify your identity using government-issued ID
4. Update your account security settings
5. Register all devices for future banking access

REQUIRED INFORMATION FOR COMPLIANCE:
• Full Social Security Number
• Account numbers for all Chase accounts
• Current debit/credit card information
• Online banking username and password
• Security questions and answers
• Employment and income verification

VERIFICATION PROCESS:
The compliance update requires approximately 15-20 minutes to complete. You will need:
• Government-issued photo ID
• Recent bank statement
• Social Security card or tax document
• Proof of current address

IMPORTANT SECURITY NOTICE:
This compliance update is mandatory for all Chase customers. The new regulations are designed to protect against increasing cyber threats and ensure the security of your financial information.

For immediate compliance assistance:
• Compliance Hotline: 1-800-CHASE-REG
• Email: compliance@chase-banking.com
• Visit any Chase branch with required documents

Chase Bank Compliance Department
Regulatory Affairs Division
Member FDIC | Equal Housing Lender
Compliance Reference: CHASE-REG-2024-789456`,
      isPhishing: true,
    },
    {
      id: 23,
      subject: "Zoom: Meeting Invitation - Board of Directors Quarterly Meeting",
      sender: "calendar@zoom.us",
      content: `You're invited to a Zoom meeting

MEETING INVITATION

Topic: Board of Directors Quarterly Meeting - Q1 2024 Review
Time: April 8, 2024 10:00 AM Pacific Time (US and Canada)
Duration: 2 hours

Join Zoom Meeting:
https://zoom.us/j/123456789?pwd=abcdef123456

Meeting ID: 123 456 789
Passcode: BoardQ1

AGENDA:
1. Call to Order and Roll Call (10:00 AM)
2. Approval of Previous Meeting Minutes (10:05 AM)
3. CEO Report - Q1 Performance Review (10:15 AM)
4. CFO Report - Financial Results and Q2 Outlook (10:45 AM)
5. Committee Reports (11:15 AM)
   • Audit Committee
   • Compensation Committee
   • Governance Committee
6. Strategic Initiatives Update (11:45 AM)
7. New Business and Discussion Items (12:15 PM)
8. Executive Session (12:45 PM)
9. Adjournment (1:00 PM)

PRE-MEETING MATERIALS:
Please review the following documents before the meeting:
• Q1 Financial Statements (sent separately)
• CEO Performance Dashboard
• Strategic Plan Progress Report
• Committee Meeting Minutes

DIAL-IN INFORMATION:
For those unable to use video:
• Phone: +1 669 900 9128
• Meeting ID: 123 456 789
• Passcode: 567890

TECHNICAL REQUIREMENTS:
• Zoom application (latest version recommended)
• Stable internet connection
• Camera and microphone enabled
• Quiet, professional environment

MEETING ETIQUETTE:
• Please join 5 minutes early for technical check
• Mute microphone when not speaking
• Use "Raise Hand" feature for questions
• Have materials readily available

If you cannot attend, please notify the Board Secretary at least 24 hours in advance.

For technical support with Zoom:
• Help Center: https://support.zoom.us
• Phone Support: 1-888-799-9666

This meeting is confidential and intended only for Board members and invited guests.

Best regards,
Corporate Secretary
Board of Directors
YourCompany Inc.`,
      isPhishing: false,
    },
    {
      id: 24,
      subject: "Amazon Prime: Membership Auto-Renewal Failed - Update Payment Method",
      sender: "auto-renew@amazon.com",
      content: `Your Amazon Prime membership renewal needs attention

Hello,

We tried to charge your Amazon Prime annual membership fee to your payment method on file, but the payment didn't go through.

MEMBERSHIP DETAILS:
• Amazon Prime Annual Membership
• Renewal Date: April 3, 2024
• Amount: $139.00
• Payment Method: Visa ending in 1234

Your Prime benefits will continue until April 10, 2024. To avoid any interruption in service, please update your payment information.

WHAT YOU NEED TO DO:
1. Go to Your Account > Prime Membership
2. Select "Update payment method"
3. Enter your new payment information
4. Confirm the renewal

If you don't update your payment method by April 10, 2024:
• Your Prime membership will be canceled
• You'll lose access to Prime benefits including free shipping
• Prime Video access will end
• Prime Music and Prime Reading will be unavailable

PRIME BENEFITS YOU'LL LOSE:
✗ FREE One-Day and Two-Day shipping
✗ Prime Video streaming
✗ Prime Music with 2 million songs
✗ Prime Reading with thousands of books
✗ Exclusive deals and early access to Lightning Deals
✗ Prime Gaming benefits
✗ Amazon Photos unlimited storage

To update your payment method:
Visit: amazon.com/prime/manage

If you meant to cancel your membership, no action is needed. Your membership will end on April 10, 2024, and you won't be charged.

Questions about your membership? Visit our Help pages or contact Customer Service.

Thanks,
Amazon Prime Team

This email was sent from a notification-only address that cannot accept incoming email. Please do not reply to this message.`,
      isPhishing: false,
    },
  ],
}
