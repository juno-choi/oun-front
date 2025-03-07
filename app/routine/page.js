"use client";
import withAuth from '@/app/components/auth/withAuth';
import MainLogo from '@/app/components/main/MainLogo';
import RoutineList from '@/app/components/routine/RoutineList';

function RoutinePage() {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <MainLogo />
      <RoutineList />
    </div>
  );
}

export default withAuth(RoutinePage); 