import { useState, useEffect } from "react";

export default function StartTimerComponent({ timer, setTimer, isTimerRunning, setIsTimerRunning }) {
    
    // 타이머 시작/정지
    const toggleTimer = () => {
        setIsTimerRunning(!isTimerRunning);
    };
    
    // 타이머 리셋
    const resetTimer = () => {
        setTimer(0);
    };

    // 시간 포맷팅 (초 -> 분:초)
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    
    // 타이머 기능
    useEffect(() => {
        let interval;
        if (isTimerRunning) {
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isTimerRunning]);

    return (
        <div className="mb-8">
            {(
                <div className="text-center border-8 border-gray-700 rounded-lg p-4">
                    <div className="text-4xl font-bold mb-4 text-white">{formatTime(timer)}</div>
                    <div className="flex justify-center space-x-4">
                        <button 
                            onClick={toggleTimer}
                            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                                isTimerRunning 
                                    ? "bg-red-500 text-white hover:bg-red-600" 
                                    : "bg-green-500 text-white hover:bg-green-600"
                            }`}
                        >
                            {isTimerRunning ? "일시정지" : "시작"}
                        </button>
                        <button 
                            onClick={resetTimer}
                            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                        >
                            리셋
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
