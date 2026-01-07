
import React, { useState, useEffect, useCallback } from 'react';
import {
    Trophy,
    ChevronRight,
    RefreshCcw,
    BookOpen,
    CheckCircle2,
    XCircle,
    History,
    Layout,
    Hammer,
    Wind,
    Flower2,
    Construction
} from 'lucide-react';
import { QUIZ_QUESTIONS } from './data/constants.js';

// Helper component for Section Icons
const SectionIcon = ({ section, className }) => {
    switch (section) {
        case "Identity & History": return <History className={className} />;
        case "Spatial Syntax": return <Layout className={className} />;
        case "Engineering & Materials": return <Hammer className={className} />;
        case "Climatic Design": return <Wind className={className} />;
        case "Iconography & Ornamentation": return <Flower2 className={className} />;
        case "Restoration & Landscape": return <Construction className={className} />;
        default: return <BookOpen className={className} />;
    }
};

const QuizPage = () => {
    const [gameState, setGameState] = useState('START');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [score, setScore] = useState(0);
    const [lastSelected, setLastSelected] = useState(null);
    const [isAnswering, setIsAnswering] = useState(false);

    const startQuiz = () => {
        setGameState('QUIZ');
        setCurrentQuestionIndex(0);
        setUserAnswers([]);
        setScore(0);
        setLastSelected(null);
    };

    const handleAnswer = (selectedOptionIndex) => {
        if (isAnswering) return;

        const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
        const selectedLetter = String.fromCharCode(65 + selectedOptionIndex); // 0 -> A, 1 -> B, etc.
        const isCorrect = selectedLetter === currentQuestion.answer;

        setLastSelected(selectedLetter);
        setIsAnswering(true);

        if (isCorrect) {
            setScore(prev => prev + 1);
        }

        const newUserAnswer = {
            questionId: currentQuestion.id,
            selectedOption: selectedLetter,
            isCorrect,
        };

        setUserAnswers(prev => [...prev, newUserAnswer]);

        // Delay slightly to show feedback
        setTimeout(() => {
            if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
                setLastSelected(null);
                setIsAnswering(false);
            } else {
                setGameState('RESULT');
                setIsAnswering(false);
            }
        }, 800);
    };

    const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
    const progress = ((currentQuestionIndex + (isAnswering ? 1 : 0)) / QUIZ_QUESTIONS.length) * 100;

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
            {/* Background decoration */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-5">
                <div className="absolute top-0 right-0 w-96 h-96 bg-amber-900 rounded-full blur-3xl -mr-48 -mt-48"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-900 rounded-full blur-3xl -ml-48 -mb-48"></div>
            </div>

            <main className="relative z-10 w-full max-w-2xl">
                {gameState === 'START' && (
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200 text-center p-8 md:p-12 animate-in fade-in zoom-in duration-500">
                        <div className="w-20 h-20 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <BookOpen className="w-10 h-10 text-amber-700" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-serif text-slate-900 mb-4">Rumah Penghulu Abu Seman</h1>
                        <p className="text-slate-600 text-lg mb-8 leading-relaxed max-w-md mx-auto">
                            Test your knowledge about one of Malaysia’s finest examples of traditional vernacular architecture. Discover the secrets of its design, engineering, and history.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10 text-sm">
                            <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
                                <History className="w-4 h-4 text-amber-600" />
                                <span>Identity & History</span>
                            </div>
                            <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
                                <Layout className="w-4 h-4 text-emerald-600" />
                                <span>Spatial Syntax</span>
                            </div>
                            <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
                                <Hammer className="w-4 h-4 text-blue-600" />
                                <span>Engineering</span>
                            </div>
                        </div>
                        <button
                            onClick={startQuiz}
                            className="w-full md:w-auto px-10 py-4 bg-amber-800 hover:bg-amber-900 text-white font-bold rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center gap-2 mx-auto"
                        >
                            Begin Heritage Journey
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}

                {gameState === 'QUIZ' && (
                    <div className="space-y-6 animate-in slide-in-from-bottom-8 duration-500">
                        {/* Progress Header */}
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2 text-slate-500 font-medium text-sm">
                                    <SectionIcon section={currentQuestion.section} className="w-4 h-4" />
                                    <span className="uppercase tracking-wider">{currentQuestion.section}</span>
                                </div>
                                <span className="text-amber-800 font-bold text-sm bg-amber-50 px-2 py-1 rounded-md">
                  {currentQuestionIndex + 1} / {QUIZ_QUESTIONS.length}
                </span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-amber-600 transition-all duration-300 ease-out"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Question Card */}
                        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden min-h-[400px] flex flex-col">
                            <div className="p-8 md:p-10 flex-grow">
                                <h2 className="text-2xl md:text-3xl font-serif text-slate-900 leading-tight mb-8">
                                    {currentQuestion.question}
                                </h2>

                                <div className="grid gap-3">
                                    {currentQuestion.options.map((option, idx) => {
                                        const letter = String.fromCharCode(65 + idx);
                                        const isSelected = lastSelected === letter;
                                        const isCorrect = currentQuestion.answer === letter;

                                        let bgColor = "bg-white border-slate-200 hover:border-amber-300 hover:bg-slate-50";
                                        let textColor = "text-slate-700";

                                        if (isAnswering) {
                                            if (isSelected) {
                                                bgColor = isCorrect
                                                    ? "bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500 ring-opacity-20"
                                                    : "bg-rose-50 border-rose-500 ring-2 ring-rose-500 ring-opacity-20";
                                            } else if (isCorrect) {
                                                bgColor = "bg-emerald-50 border-emerald-500 opacity-60";
                                            } else {
                                                bgColor = "bg-white border-slate-100 opacity-40";
                                            }
                                        }

                                        return (
                                            <button
                                                key={idx}
                                                disabled={isAnswering}
                                                onClick={() => handleAnswer(idx)}
                                                className={`group relative flex items-center p-5 text-left rounded-2xl border-2 transition-all duration-200 ${bgColor} ${textColor}`}
                                            >
                        <span className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl border-2 mr-4 font-bold text-lg transition-colors
                          ${isSelected ? (isCorrect ? "bg-emerald-500 border-emerald-500 text-white" : "bg-rose-500 border-rose-500 text-white") : "bg-slate-50 border-slate-200 text-slate-400 group-hover:bg-amber-100 group-hover:border-amber-200 group-hover:text-amber-700"}
                        `}>
                          {letter}
                        </span>
                                                <span className="flex-grow font-medium md:text-lg">{option}</span>
                                                {isAnswering && isSelected && (
                                                    <div className="ml-2">
                                                        {isCorrect ? (
                                                            <CheckCircle2 className="w-6 h-6 text-emerald-500 animate-in zoom-in" />
                                                        ) : (
                                                            <XCircle className="w-6 h-6 text-rose-500 animate-in zoom-in" />
                                                        )}
                                                    </div>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {gameState === 'RESULT' && (
                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-6">
                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200 p-8 md:p-12 text-center">
                            <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                                <Trophy className="w-12 h-12 text-amber-600" />
                                <div className="absolute -inset-1 border-4 border-amber-200 rounded-full animate-ping opacity-25"></div>
                            </div>

                            <h2 className="text-3xl font-serif text-slate-900 mb-2">Heritage Quest Complete!</h2>
                            <p className="text-slate-500 mb-8">You explored the depths of Rumah Penghulu Abu Seman.</p>

                            <div className="bg-slate-50 rounded-3xl p-8 mb-10 flex flex-col items-center justify-center border border-slate-100">
                                <div className="text-7xl font-bold text-amber-800 mb-2">
                                    {score}<span className="text-3xl text-slate-300">/{QUIZ_QUESTIONS.length}</span>
                                </div>
                                <div className="text-lg font-semibold text-slate-600 uppercase tracking-widest">Your Final Score</div>

                                <div className="mt-6 flex gap-4 w-full">
                                    <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                                        <div className="text-2xl font-bold text-emerald-600">
                                            {Math.round((score / QUIZ_QUESTIONS.length) * 100)}%
                                        </div>
                                        <div className="text-xs text-slate-400 font-bold uppercase">Accuracy</div>
                                    </div>
                                    <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                                        <div className="text-2xl font-bold text-blue-600">
                                            {QUIZ_QUESTIONS.length}
                                        </div>
                                        <div className="text-xs text-slate-400 font-bold uppercase">Attempted</div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <button
                                    onClick={startQuiz}
                                    className="flex items-center justify-center gap-2 px-8 py-4 bg-amber-800 hover:bg-amber-900 text-white font-bold rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-lg"
                                >
                                    <RefreshCcw className="w-5 h-5" />
                                    Try Again
                                </button>
                                <button
                                    onClick={() => setGameState('START')}
                                    className="flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-2xl transition-all"
                                >
                                    Main Menu
                                </button>
                            </div>
                        </div>

                        {/* Performance Review */}
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                                <h3 className="font-bold text-slate-700 flex items-center gap-2">
                                    <BookOpen className="w-4 h-4" />
                                    Review Your Answers
                                </h3>
                            </div>
                            <div className="max-h-[400px] overflow-y-auto divide-y divide-slate-100">
                                {userAnswers.map((ua, index) => {
                                    const q = QUIZ_QUESTIONS.find(curr => curr.id === ua.questionId);
                                    return (
                                        <div key={index} className="p-4 hover:bg-slate-50 transition-colors">
                                            <div className="flex gap-4">
                                                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold
                          ${ua.isCorrect ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}
                        `}>
                                                    {index + 1}
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-slate-800 font-medium leading-tight">{q.question}</p>
                                                    <div className="flex items-center gap-3 text-sm">
                                                        <span className="text-slate-400">Your answer: <span className={ua.isCorrect ? "text-emerald-600 font-bold" : "text-rose-600 font-bold"}>{ua.selectedOption}</span></span>
                                                        {!ua.isCorrect && <span className="text-slate-400">Correct: <span className="text-emerald-600 font-bold">{q.answer}</span></span>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <footer className="mt-12 text-slate-400 text-sm flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-1000">
                <History className="w-4 h-4" />
                Preserving Vernacular Architecture & Heritage
            </footer>
        </div>
    );
};

export default QuizPage;
