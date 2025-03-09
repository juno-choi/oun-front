"use client";
import LogoutButton from "@/app/components/auth/LogoutButton";
import RoutineMoveButton from "@/app/components/routine/RoutineListMoveButton";

export default function LoginUserDiv() {


  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <RoutineMoveButton className="px-8 py-4 text-lg font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-colors duration-200 ease-in-out w-64"/>
      <LogoutButton />
    </div>
      
  );
}
