"use client";
import withAuth from '../components/auth/withAuth';
import RoutineGetButton from '../components/routine/RoutineListMoveButton';
import RoutineCreateMoveButton from '../components/routine/RoutineCreateMoveButton';
import LogoutButton from '../components/auth/LogoutButton';

function StartPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <RoutineGetButton />
      <RoutineCreateMoveButton />
      <LogoutButton />
    </div>
  );
}

export default withAuth(StartPage); 