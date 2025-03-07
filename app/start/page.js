"use client";
import withAuth from '@/app/components/auth/withAuth';
import RoutineGetButton from '@/app/components/routine/RoutineListMoveButton';
import RoutineCreateMoveButton from '@/app/components/routine/RoutineCreateMoveButton';
import LogoutButton from '@/app/components/auth/LogoutButton';
import MainLogo from '@/app/components/main/MainLogo';

function StartPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <MainLogo />
      <RoutineGetButton />
      <RoutineCreateMoveButton />
      <LogoutButton />
    </div>
  );
}

export default withAuth(StartPage); 