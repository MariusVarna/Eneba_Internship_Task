import React from 'react';

const GameCard = ({ game }) => {
    const formatPrice = (price) => {
        return `€${parseFloat(price).toFixed(2)}`;
    };

    return (
        <div className="game-card">
            {/* Game Image */}
            <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-purple-700 to-purple-900">
                <img
                    src={game.cover_image_url}
                    alt={game.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x400/7e22ce/ffffff?text=Game+Cover';
                    }}
                />

                {/* Badges on image */}
                <div className="absolute top-2 left-2 flex flex-col gap-2">
                    {game.has_cashback && (
                        <div className="cashback-badge">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                            </svg>
                            CASHBACK
                        </div>
                    )}
                </div>

                {/* Stock badge */}
                {game.stock_status && (
                    <div className="absolute top-2 right-2">
                        <div className="stock-badge">{game.stock_status}</div>
                    </div>
                )}
            </div>

            {/* Game Info */}
            <div className="p-4">
                {/* Title */}
                <h3 className="text-white font-medium text-sm mb-2 line-clamp-2 min-h-[40px]">
                    {game.title}
                </h3>

                {/* Platform and Region */}
                <div className="flex flex-wrap gap-1 mb-3">
                    <span className="platform-badge">{game.region}</span>
                </div>

                {/* Price Section */}
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        {game.original_price && game.discount_percentage ? (
                            <>
                                <span className="text-white/50 text-sm line-through">
                                    {formatPrice(game.original_price)}
                                </span>
                                <span className="discount-badge">-{game.discount_percentage}%</span>
                            </>
                        ) : null}
                    </div>
                </div>

                {/* Current Price */}
                <div className="flex items-center justify-between">
                    <div className="price-badge">{formatPrice(game.price)}</div>

                    {/* Cashback amount (calculated as 2% of price) */}
                    {game.has_cashback && (
                        <div className="text-cyan-400 text-xs">
                            Cashback: {formatPrice(game.price * 0.02)}
                        </div>
                    )}
                </div>

                {/* Add to cart button */}
                <button className="w-full mt-3 bg-purple-600 hover:bg-purple-500 text-white py-2 rounded-lg transition-colors duration-200 text-sm font-medium">
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default GameCard;
