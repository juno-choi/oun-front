"use client";
import withAuth from '@/app/components/auth/withAuth';

function RoutineCreatePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">루틴 생성 페이지</h1>
    </div>
  );
}

export default withAuth(RoutineCreatePage); 