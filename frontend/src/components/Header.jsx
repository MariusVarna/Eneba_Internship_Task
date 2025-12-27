import React from 'react';

const Header = () => {
    return (
        <header className="bg-gradient-to-r from-purple-800 to-purple-700 border-b border-purple-600/50">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 via-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">E</span>
                        </div>
                        <h1 className="text-white text-2xl font-bold">eneba</h1>
                    </div>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
                        <span className="hover:text-white transition-colors cursor-pointer">
                            🎮 Games, Gift Cards, Top-Ups & More | Best Deals
                        </span>
                    </nav>

                    {/* Right side actions */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-white/80 text-sm">
                            <span className="hover:text-white transition-colors cursor-pointer">
                                🌍 English EU | EUR
                            </span>
                        </div>
                        <button className="text-white/80 hover:text-white transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </button>
                        <button className="text-white/80 hover:text-white transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </button>
                        <button className="text-white/80 hover:text-white transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
