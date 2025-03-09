"use client";
import withAuth from '@/app/components/auth/withAuth';
import MainLogo from '@/app/components/main/MainLogo';
import RoutineList from '@/app/components/routine/RoutineList';
import RoutineCreateMoveButton from '@/app/components/routine/RoutineCreateMoveButton';
import PulseLine from '@/app/components/common/PulseLine';

function RoutinePage() {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <MainLogo />
      <RoutineCreateMoveButton />
      <PulseLine />
      <RoutineList />
    </div>
  );
}

export default withAuth(RoutinePage); 