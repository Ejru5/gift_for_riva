import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { useState } from 'react';
import confetti from 'canvas-confetti';

interface CardData {
    id: number;
    type: 'OMG' | 'MEMORY' | 'ADVICE' | 'LOCKED_GIFT';
    rotation: number;
}

const CardStack = ({ isInteractive }: { isInteractive: boolean }) => {
    const [cards, setCards] = useState<CardData[]>([
        { id: 4, type: 'LOCKED_GIFT', rotation: -2 },
        { id: 3, type: 'ADVICE', rotation: 3 },
        { id: 2, type: 'MEMORY', rotation: -1 },
        { id: 1, type: 'OMG', rotation: 2 }, // Top card
    ]);

    const handleNext = () => {
        setCards((prev) => {
            const newCards = [...prev];
            const topCard = newCards.pop(); // Remove top
            if (topCard) {
                newCards.unshift(topCard); // Add to bottom
            }
            return newCards;
        });
    };

    return (
        <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
            {/* Pointer events none on container so clicks pass through if needed, 
                but cards will enable pointer-events-auto */}

            <AnimatePresence mode='popLayout'>
                {cards.map((card, index) => {
                    const isTop = index === cards.length - 1;
                    return (
                        <Card
                            key={card.id}
                            data={card}
                            isTop={isTop && isInteractive}
                            onRemove={() => handleNext()}
                            index={index}
                        />
                    );
                })}
            </AnimatePresence>

        </div>
    );
};

const LockedGiftCard = () => {
    const [input, setInput] = useState("");
    const [isUnlocked, setIsUnlocked] = useState(false);
    const LOCK_PIN = "2504"; // PIN to unlock the card
    const VOUCHER_PIN = "167400"; // Voucher PIN to display
    const CODE = "6002-9401-0323-8056"; // Voucher code

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input === LOCK_PIN) {
            setIsUnlocked(true);
            confetti({
                particleCount: 100,
                spread: 70,
                colors: ['#E80071', '#FFFFFF']
            });
        } else {
            setInput("");
        }
    };

    return (
        <div
            className="w-full h-full border-none flex flex-col relative overflow-hidden p-3"
            style={{
                backgroundColor: '#FAF9F6',
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 4.5C10 4.5 8.5 2 6 2C3.5 2 2 4 2 6C2 10 10 14 10 14C10 14 18 10 18 6C18 4 16.5 2 14 2C11.5 2 10 4.5 10 4.5Z' fill='%23f9d5e5' fill-opacity='0.4'/%3E%3C/svg%3E")`,
                backgroundSize: '30px 30px'
            }}
        >

            {/* Actual Gift Content */}
            <div className={`w-full h-full flex flex-col items-center justify-start pt-6 p-3 transition-all duration-700 z-10 ${isUnlocked ? 'filter-none' : 'filter blur-xl scale-105 select-none'}`}>

                <div className="flex flex-col items-center mb-4">
                    <span className="font-handwriting text-2xl font-bold text-black whitespace-nowrap bg-pink-200 px-3 py-1 -rotate-2 relative z-10 -translate-x-2">For the beauty</span>
                    <span className="font-handwriting text-2xl font-bold text-black whitespace-nowrap bg-yellow-200 px-3 py-1 rotate-1 relative z-20 translate-x-5 -mt-1">that you are</span>
                </div>

                {/* Nykaa Gift Card Badge */}
                <div className="flex items-center mb-[-14px] px-4 py-2 bg-pink-500 rounded-full shadow-sm z-30 relative -rotate-2">
                    <span className="font-bold text-sm uppercase tracking-wider text-white">Nykaa Gift Card</span>
                </div>

                <div className="w-full flex flex-col items-center justify-center gap-2 pt-6 pb-4 px-6 border-2 border-black bg-white shadow-neo-sm relative">
                    <div className="text-center">
                        <p className="font-mono text-xs text-gray-500 mb-1 uppercase tracking-widest">CODE</p>
                        <p className="font-mono text-sm font-black text-black tracking-wide whitespace-nowrap">{CODE}</p>
                    </div>
                    <div className="w-12 h-[2px] bg-black/10 rounded-full"></div>
                    <div className="text-center">
                        <p className="font-mono text-xs text-gray-500 mb-1 uppercase tracking-widest">PIN</p>
                        <p className="font-mono text-sm font-black text-black tracking-wide whitespace-nowrap">{VOUCHER_PIN}</p>
                    </div>
                    <div className="w-12 h-[2px] bg-black/10 rounded-full"></div>
                    <div className="text-center">
                        <p className="font-mono text-xs text-gray-500 mb-1 uppercase tracking-widest">AMOUNT</p>
                        <p className="font-mono text-sm font-black text-black tracking-wide">₹3000</p>
                    </div>
                </div>

            </div>

            {/* Lock Overlay */}
            {!isUnlocked && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#FAF9F6]/80 backdrop-blur-md p-6">
                    <div className="bg-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-full text-center relative overflow-hidden">
                        <div className="text-4xl mb-4">🔒</div>
                        <h3 className="font-black text-xl mb-4 text-black">ENTER PIN</h3>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                            <input
                                type="text"
                                pattern="\d*"
                                maxLength={4}
                                value={input}
                                onChange={(e) => setInput(e.target.value.replace(/\D/g, ''))}
                                placeholder="4 DIGIT PIN"
                                className="w-full border-2 border-black p-2 font-mono text-center text-lg placeholder:text-sm focus:outline-none focus:bg-gray-100 text-black placeholder:text-gray-400"
                            />
                            <button
                                type="submit"
                                className="bg-black text-white font-bold py-2 border-2 border-black hover:bg-gray-800 active:scale-95 transition-transform"
                            >
                                UNLOCK
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const Card = ({ data, isTop, onRemove, index }: { data: CardData; isTop: boolean; onRemove: () => void; index: number }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-30, 30]); // Add extra rotation when dragging

    // Combine base rotation with dynamic rotation. Add index based Z to prevent flickering during animation
    const totalRotate = useTransform(rotate, (r) => r + data.rotation);

    return (
        <motion.div
            layout
            className={`absolute w-56 h-96 bg-white border-[3px] border-black rounded-lg shadow-neo overflow-hidden cursor-grab active:cursor-grabbing ${isTop ? 'pointer-events-auto' : ''}`}
            style={{
                x: isTop ? x : 0,
                y: isTop ? y : 0,
                rotate: totalRotate,
                zIndex: index // Stack by index
            }}
            drag={isTop} // Only draggable if top and interactive
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} // Snap back if released early
            dragElastic={0.7} // Loose feel
            onDragEnd={(_, info) => {
                const threshold = 100;
                // Swipe left or right -> Next (cycle top to bottom)
                if (Math.abs(info.offset.x) > threshold) {
                    onRemove();
                }
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{
                scale: 0.5,
                opacity: 0,
                transition: { duration: 0.2 }
            }}
        >
            {/* Card Content based on Type */}
            {data.type === 'OMG' && (
                <div className="w-full h-full flex flex-col items-center justify-center p-5 text-center">
                    <div className="w-full flex flex-col -space-y-1 mb-6">
                        <span className="font-bold text-base self-start ml-1 transform -rotate-2 bg-gray-300 px-2 py-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] z-10">From strangers</span>
                        <span className="font-bold text-base self-center transform rotate-1 bg-yellow-100 px-2 py-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] z-20">To friends</span>
                        <span className="font-bold text-base self-end mr-1 transform -rotate-2 bg-yellow-300 px-2 py-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] z-30">To fiancés 💍</span>
                    </div>
                    <p className="font-serif text-base italic leading-relaxed text-gray-800 border-t-2 border-black/10 pt-4">
                        "Today, we celebrate
                        not just your engagement,
                        but every little moment
                        that led you here."
                    </p>
                </div>
            )}

            {data.type === 'MEMORY' && (
                <div className="w-full h-full flex flex-col items-center p-3 bg-white relative">
                    {/* Image Frame - Expanded */}
                    <div className="w-full h-[75%] flex items-center justify-center mb-2 bg-gray-50 border border-gray-100 shadow-inner overflow-hidden">
                        <img
                            src="/propose.png"
                            alt="Proposal Memory"
                            className="h-[130%] w-auto object-contain"
                        />
                    </div>

                    {/* Caption with Handwriting Font */}
                    <div className="text-center relative z-10 w-full mt-auto mb-2">
                        <p className="font-handwriting text-3xl font-bold leading-none text-gray-800 transform -rotate-1">
                            The iconic moment <br />
                            when he said  <br />
                            <span className="text-gray-400 line-through decoration-2 mx-1">YES </span>
                            <span className="text-red-600 font-extrabold text-4xl inline-block transform -rotate-6 drop-shadow-sm"> NO</span>
                        </p>
                    </div>

                    {/* Polaroid Texture */}
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-20"></div>
                </div>
            )}

            {data.type === 'ADVICE' && (
                <div className="text-left w-full h-full p-6 flex flex-col justify-center">
                    <span className="bg-black text-white font-mono text-xs px-1 mb-4 inline-block w-max">ADVICE #101</span>
                    <h3 className="font-serif text-3xl font-bold leading-tight mb-4">
                        "Rule #1:<br />
                        <span className="text-primary-pink bg-black/5 px-1">The Wife</span> is always right."
                    </h3>
                    <p className="font-mono text-[10px] text-gray-500 mt-auto">Derived from ancient wisdom.</p>
                </div>
            )}

            {data.type === 'LOCKED_GIFT' && <LockedGiftCard />}

        </motion.div>
    );
};

export default CardStack;
