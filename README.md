# WealthTracker

A modern, secure, and comprehensive financial management platform built with Next.js, TypeScript, and Supabase.

## Features

- 📊 **Dashboard**: Real-time financial overview with interactive charts
- 💰 **Asset Management**: Track stocks, mutual funds, FDs, and more
- 📈 **Performance Tracking**: Monitor portfolio growth and returns
- 🎯 **Goal Planning**: Set and track financial goals
- 📱 **Responsive Design**: Works seamlessly on all devices
- 🔒 **Security**: Built with security best practices

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI
- **Backend**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **State Management**: Zustand, React Query
- **Charts**: Recharts
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/wealthtracker.git
cd wealthtracker
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Update the environment variables with your Supabase credentials

5. Run the development server:
```bash
pnpm dev
```

## Project Structure

```
wealthtracker/
├── app/                 # Next.js app router pages
├── components/          # React components
├── services/           # API and service functions
├── stores/             # Zustand stores
├── types/              # TypeScript types
├── utils/              # Utility functions
├── hooks/              # Custom React hooks
├── styles/             # Global styles
└── supabase/           # Database schema and migrations
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Security

Please read our [Security Documentation](SECURITY.md) for details on our security practices.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
