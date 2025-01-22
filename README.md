# CarePulse - Healthcare Patient Management System

![CarePulse Logo](/public/assets/icons/logo-icon.svg)

A modern healthcare patient management system built with Next.js, designed to streamline patient registration, appointment scheduling, and medical records management for healthcare providers.

## 🚀 Features

- **Patient Management**
  - Patient registration and profiles
  - Medical history tracking
  - Document management with secure file upload
  - Patient identification verification

- **Appointment System**
  - Real-time appointment scheduling
  - Doctor availability management
  - Appointment status tracking (pending, scheduled, canceled)
  - Email notifications

- **User Interface**
  - Modern, responsive dark theme design
  - Mobile-friendly interface
  - Accessible form components
  - Real-time validation

## 🛠️ Tech Stack

- **Frontend Framework**: [Next.js 15](https://nextjs.org/)
- **Styling**: 
  - [Tailwind CSS](https://tailwindcss.com/)
  - Custom UI components with shadcn/ui
- **Form Management**: 
  - [React Hook Form](https://react-hook-form.com/)
  - [Zod](https://zod.dev/) for validation
- **Backend Service**: [Appwrite](https://appwrite.io/)
- **Authentication**: Custom PassKey implementation
- **Date/Time**: [React DatePicker](https://reactdatepicker.com/)

## 📝 Prerequisites

- Node.js 18+ 
- npm/yarn/pnpm
- Appwrite instance

## 🚀 Getting Started

1. **Clone the repository**
```bash
git clone https://github.com/hassaniqbal23/Patient-Management-System
cd carepulse

Install dependencies
npm install
 
 Environment Setup Create a .env.local file:
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_APPWRITE_ENDPOINT=your_endpoint

Run Development Server
Open http://localhost:3000 in your browser.

📁 Project Structure
carepulse/
├── app/                   # Next.js 13+ app directory
├── components/            # Reusable UI components
│   ├── forms/            # Form components
│   └── ui/               # UI elements
├── lib/                  # Utilities and configurations
│   ├── actions/          # Server actions
│   └── validation/       # Zod schemas
├── public/               # Static assets
└── types/                # TypeScript type definitions

🎨 Key Components
CustomFormField: Reusable form component supporting various input types
DatePicker: Custom styled date-time picker
SubmitButton: Loading-state aware submit button
PassKeyModal: Secure authentication modal
🔒 Security Features
Secure file uploads with Appwrite Storage
Form validation with Zod
Protected routes
Secure authentication flow

👤 Author
Hassan Iqbal

Email: hassaniqbalkiu@gmail.com
GitHub: @hassaniqbal23

<div align="center"> <p>Built with ❤️ by Hassan Iqbal</p> </div> ```


This README.md:
- Clearly describes your project's purpose
- Lists all major features
- Details the tech stack using icons for visual appeal
- Provides clear setup instructions
- Shows project structure
- Includes contributing guidelines
- Credits the author

Remember to:
1. Replace placeholder URLs and credentials
2. Add your actual GitHub handle
3. Update any specific features or requirements
4. Add screenshots if available
5. Include any additional environment variables required
6. Add a license file if mentioned
This README.md:
- Clearly describes your project's purpose
- Lists all major features
- Details the tech stack using icons for visual appeal
- Provides clear setup instructions
- Shows project structure
- Includes contributing guidelines
- Credits the author

Remember to:
1. Replace placeholder URLs and credentials
2. Add your actual GitHub handle
3. Update any specific features or requirements
4. Add screenshots if available
5. Include any additional environment variables required
6. Add a license file if mentioned