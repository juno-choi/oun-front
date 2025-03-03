"use client";
import withAuth from '@/app/components/auth/withAuth';

function HealthCreatePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">헬스 만들기 페이지</h1>
    </div>
  );
}

export default withAuth(HealthCreatePage);

