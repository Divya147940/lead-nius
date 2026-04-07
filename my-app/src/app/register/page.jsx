"use client";

import SignupPage from '../../components/SignupPage';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();

  const handleBack = () => {
    // Robust redirect to home to avoid Next.js router sync issues
    window.location.href = '/';
  };

  return (
    <main>
      <SignupPage onBack={handleBack} />
    </main>
  );
}
