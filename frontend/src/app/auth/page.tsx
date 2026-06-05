import { LoginForm } from '@/app/ui/sign-in';
import { Suspense } from 'react';

export default function AuthPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[600px] flex-col">
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}