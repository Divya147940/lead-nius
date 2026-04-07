"use client";

import SignupPage from '../../components/SignupPage';
import { useRouter } from 'next/navigation';

export default function SignupRoute() {
  const router = useRouter();

  const handleBack = () => {
    // Navigate back to the home page
    router.push('/');
  };

  return (
    <main>
      <SignupPage onBack={handleBack} />
    </main>
  );
}
