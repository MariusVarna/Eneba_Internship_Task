import React from 'react';
import GameCard from './GameCard';

const GameGrid = ({ games, loading, error }) => {
    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white/20 border-t-white mb-4"></div>
                        <p className="text-white/80">Loading games...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                        <div className="text-red-400 text-5xl mb-4">⚠️</div>
                        <p className="text-white text-lg mb-2">Error loading games</p>
                        <p className="text-white/60 text-sm">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!games || games.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                        <div className="text-white/40 text-6xl mb-4">🎮</div>
                        <p className="text-white text-lg mb-2">No games found</p>
                        <p className="text-white/60 text-sm">Try adjusting your search</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {games.map((game) => (
                    <GameCard key={game.id} game={game} />
                ))}
            </div>
        </div>
    );
};

export default GameGrid;
