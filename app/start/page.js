"use client";
import withAuth from '../components/auth/withAuth';
import RoutineGetButton from '../components/routine/RoutineListMoveButton';
import RoutineCreateMoveButton from '../components/routine/RoutineCreateMoveButton';
import BackHistoryButton from '../components/util/BackHistoryButton';

function StartPage() {
  return (
    <div className="min-h-screen w-full relative">
      <BackHistoryButton />
      {/* 메인 컨텐츠 */}
      <div className="flex flex-col items-center justify-center min-h-screen gap-6">
        <RoutineGetButton />
        <RoutineCreateMoveButton />
      </div>
    </div>
  );
}

export default withAuth(StartPage); 