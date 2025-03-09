"use client";
import withAuth from '@/app/components/auth/withAuth';
import RoutineGetButton from '@/app/components/routine/RoutineListMoveButton';
import RoutineCreateMoveButton from '@/app/components/routine/RoutineCreateMoveButton';
import MainLogo from '@/app/components/main/MainLogo';
import LogoutButton from '@/app/components/auth/LogoutButton';

function StartPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <MainLogo />
      <RoutineGetButton className="px-8 py-4 text-lg font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-colors duration-200 ease-in-out w-64" />
      <RoutineCreateMoveButton />
      <LogoutButton />
    </div>
  );
}

export default withAuth(StartPage); 