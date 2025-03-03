"use client";
import withAuth from '../components/auth/withAuth';

function RoutinePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">루틴 페이지</h1>
      {/* 페이지 컨텐츠 */}
    </div>
  );
}

export default withAuth(RoutinePage); 