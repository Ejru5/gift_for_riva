import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { useState } from 'react';
import confetti from 'canvas-confetti';

interface CardData {
    id: number;
    type: 'OMG' | 'MEMORY' | 'LETTER' | 'MESSAGE_1' | 'MESSAGE_2' | 'MESSAGE_3' | 'MESSAGE_4' | 'ADVICE' | 'LOCKED_GIFT';
    rotation: number;
}

const CardStack = ({ isInteractive }: { isInteractive: boolean }) => {
    const [cards, setCards] = useState<CardData[]>([
        { id: 9, type: 'LOCKED_GIFT', rotation: -2 },
        { id: 8, type: 'ADVICE', rotation: 3 },
        { id: 7, type: 'MESSAGE_3', rotation: -1 }, // Sirish
        { id: 6, type: 'MESSAGE_2', rotation: 2 },  // Hinal
        { id: 5, type: 'MESSAGE_4', rotation: 1 },  // Dhruv
        { id: 4, type: 'MESSAGE_1', rotation: -2 }, // Dhruvi
        { id: 3, type: 'LETTER', rotation: 1 },
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
                <div className="flex items-center mb-[-12px] px-3 py-1 bg-pink-500 rounded-full shadow-sm z-30 relative -rotate-2">
                    <span className="font-bold text-xs uppercase tracking-wider text-white">Nykaa Gift Card</span>
                </div>

                <div className="w-full flex flex-col items-center justify-center gap-2 pt-5 pb-3 px-4 border-2 border-black bg-white shadow-neo-sm relative">
                    <div className="text-center">
                        <p className="font-mono text-[10px] text-gray-500 mb-0.5 uppercase tracking-widest">CODE</p>
                        <p className="font-mono text-xs font-black text-black tracking-wide whitespace-nowrap">{CODE}</p>
                    </div>
                    <div className="w-10 h-[1px] bg-black/10 rounded-full"></div>
                    <div className="text-center">
                        <p className="font-mono text-[10px] text-gray-500 mb-0.5 uppercase tracking-widest">PIN</p>
                        <p className="font-mono text-xs font-black text-black tracking-wide whitespace-nowrap">{VOUCHER_PIN}</p>
                    </div>
                    <div className="w-10 h-[1px] bg-black/10 rounded-full"></div>
                    <div className="text-center">
                        <p className="font-mono text-[10px] text-gray-500 mb-0.5 uppercase tracking-widest">AMOUNT</p>
                        <p className="font-mono text-xs font-black text-black tracking-wide">₹3000</p>
                    </div>
                </div>

            </div>

            {/* Lock Overlay */}
            {!isUnlocked && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-gradient-to-br from-pink-50/95 to-white/95 backdrop-blur-sm p-4">
                    {/* Gift icon */}
                    <div className="mb-4">
                        <div className="w-16 h-16 bg-pink-500 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3">
                            <span className="text-3xl">🎁</span>
                        </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-handwriting text-2xl font-bold text-gray-800 mb-1">A Special Gift</h3>
                    <p className="text-xs text-gray-500 mb-4">Enter PIN to unlock</p>

                    {/* PIN Input */}
                    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
                        <input
                            type="text"
                            inputMode="numeric"
                            pattern="\d*"
                            maxLength={4}
                            value={input}
                            onChange={(e) => setInput(e.target.value.replace(/\D/g, ''))}
                            placeholder="• • • •"
                            className="w-full border-2 border-pink-300 rounded-xl p-3 font-mono text-center text-2xl tracking-[0.5em] placeholder:text-pink-200 placeholder:tracking-[0.3em] focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-gray-800 bg-white"
                        />

                        {/* Hint */}
                        <p className="text-[10px] text-gray-400 text-center italic">
                            Hint: your special date 💕
                        </p>

                        <button
                            type="submit"
                            className="w-full bg-pink-500 text-white font-bold py-3 rounded-xl hover:bg-pink-600 active:scale-95 transition-all shadow-md"
                        >
                            Unlock Gift
                        </button>
                    </form>
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
                        <span className="font-bold text-base self-center translate-x-1 transform -rotate-2 bg-yellow-300 px-2 py-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] z-30">To fiancés 💍</span>
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

            {data.type === 'LETTER' && (
                <div
                    className="w-full h-full flex flex-col py-4 px-5 relative overflow-hidden"
                    style={{
                        background: 'linear-gradient(135deg, #fdf8f3 0%, #f5ebe0 50%, #faf6f1 100%)',
                        backgroundImage: `
                            linear-gradient(135deg, #fdf8f3 0%, #f5ebe0 50%, #faf6f1 100%),
                            url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")
                        `,
                    }}
                >
                    {/* Paper texture lines */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-[0.15]"
                        style={{
                            backgroundImage: 'repeating-linear-gradient(transparent, transparent 20px, #c9b99a 21px)',
                        }}
                    ></div>

                    {/* Faded edge effect */}
                    <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_30px_rgba(139,119,101,0.15)]"></div>

                    {/* Letter content */}
                    <div className="relative z-10 flex flex-col justify-center h-full">
                        <p className="font-handwriting text-[13px] leading-[1.6] text-gray-800 tracking-wide">
                            <span className="text-[15px] font-semibold">To the couple we've known since our college days,</span>
                            <br />
                            We still remember those innocent faces Vasu used to make every time we teased him about Riddhi.
                            <br />
                            You both tried so hard to pass it off as "just friendship"…
                            <br />
                            <span className="italic">But honestly?</span>
                            <br />
                            The glow, the smiles, and that unspoken connection made everything so obvious, and so adorable.
                            <br />
                            Watching this story grow from then to now makes this moment even more special.
                        </p>

                        {/* Decorative heart */}
                        <div className="absolute bottom-0 right-0 text-xl opacity-40 transform rotate-12">❤️</div>
                    </div>

                    {/* Corner fold effect */}
                    <div
                        className="absolute bottom-0 right-0 w-6 h-6"
                        style={{
                            background: 'linear-gradient(135deg, transparent 50%, #e8ddd0 50%)',
                            boxShadow: '-2px -2px 3px rgba(0,0,0,0.05)',
                        }}
                    ></div>
                </div>
            )}

            {/* Message Card - Dhruv & Dhruvi */}
            {data.type === 'MESSAGE_1' && (
                <div
                    className="w-full h-full flex flex-col py-4 px-5 relative overflow-hidden"
                    style={{
                        background: 'linear-gradient(135deg, #fff8f0 0%, #ffecd9 50%, #fff5eb 100%)',
                    }}
                >
                    {/* Paper texture */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.12]"
                        style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 20px, #d4a574 21px)' }}
                    ></div>
                    <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_25px_rgba(180,140,100,0.12)]"></div>

                    <div className="relative z-10 flex flex-col justify-center h-full">
                        {/* From label */}
                        <div className="mb-3">
                            <span className="bg-orange-400 text-white font-bold text-xs px-2 py-1 rounded-sm shadow-sm">
                                Dhruvi
                            </span>
                        </div>
                        <p className="font-handwriting text-[11px] leading-[1.5] text-gray-800 tracking-wide">
                            We've known each other for the past 3–4 years, and honestly, we feel incredibly lucky to have found a bond that feels truly lifetime.
                            <br /><br />
                            You're not just friends to us — you're family.
                            <br /><br />
                            We often dream about the day when our kids will be friends too, creating memories just like we do today.
                            <br /><br />
                            So, so happy for you both.
                            <br />
                            Enjoy every second of this beautiful time.
                            <br />
                            love you guys.
                        </p>
                        <div className="absolute bottom-1 right-2 text-lg opacity-30">💕</div>
                    </div>
                </div>
            )}

            {/* Message Card - Hinal */}
            {data.type === 'MESSAGE_2' && (
                <div
                    className="w-full h-full flex flex-col py-4 px-5 relative overflow-hidden"
                    style={{
                        background: 'linear-gradient(135deg, #f0f8ff 0%, #e6f2ff 50%, #f5faff 100%)',
                    }}
                >
                    {/* Paper texture */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.12]"
                        style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 20px, #7a9fc9 21px)' }}
                    ></div>
                    <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_25px_rgba(100,140,180,0.12)]"></div>

                    <div className="relative z-10 flex flex-col justify-center h-full">
                        {/* From label */}
                        <div className="mb-3">
                            <span className="bg-blue-400 text-white font-bold text-xs px-2 py-1 rounded-sm shadow-sm">
                                Hinal
                            </span>
                        </div>
                        <p className="font-handwriting text-[11px] leading-[1.5] text-gray-800 tracking-wide">
                            Finally, this day has arrived, and we are beyond happy for you both.
                            <br /><br />
                            I've been close to Vasu since our tuition days and to Riddhi since our master's, so I've known them both separately and together. Honestly, I can't imagine two people more perfect for each other than you guys.
                            <br /><br />
                            Even though I didn't get much time to spend with you both, the bond we share is so special that it feels like we never lost touch.
                        </p>
                        <div className="absolute bottom-1 right-2 text-lg opacity-30">💙</div>
                    </div>
                </div>
            )}

            {/* Message Card - Sirish */}
            {data.type === 'MESSAGE_3' && (
                <div
                    className="w-full h-full flex flex-col py-4 px-5 relative overflow-hidden"
                    style={{
                        background: 'linear-gradient(135deg, #f5fff0 0%, #e8ffe0 50%, #f2fff5 100%)',
                    }}
                >
                    {/* Paper texture */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.12]"
                        style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 20px, #7ac974 21px)' }}
                    ></div>
                    <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_25px_rgba(100,180,100,0.12)]"></div>

                    <div className="relative z-10 flex flex-col justify-center h-full">
                        {/* From label */}
                        <div className="mb-3">
                            <span className="bg-green-500 text-white font-bold text-xs px-2 py-1 rounded-sm shadow-sm">
                                Shirish
                            </span>
                        </div>
                        <p className="font-handwriting text-[11px] leading-[1.5] text-gray-800 tracking-wide">
                            A special thanks to Riddhi for always being there and helping me plan every little surprise for Hinal.
                            <br /><br />
                            Nowadays Vasu only calls me for birthday wishes but hopefully we'll do better this year.
                            <br /><br />
                            Congratulations both of you for starting this new journey. Wishing you both a lifetime filled with love, laughter, understanding, and countless beautiful memories together. May this new journey be even more amazing than you ever imagined.
                        </p>
                        <div className="absolute bottom-1 right-2 text-lg opacity-30">💚</div>
                    </div>
                </div>
            )}

            {/* Message Card - Dhruv */}
            {data.type === 'MESSAGE_4' && (
                <div
                    className="w-full h-full flex flex-col py-4 px-5 relative overflow-hidden"
                    style={{
                        background: 'linear-gradient(135deg, #fff0f5 0%, #ffe4ec 50%, #fff5f8 100%)',
                    }}
                >
                    {/* Paper texture */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.12]"
                        style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 20px, #c97a9f 21px)' }}
                    ></div>
                    <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_25px_rgba(180,100,140,0.12)]"></div>

                    <div className="relative z-10 flex flex-col justify-center h-full">
                        {/* From label */}
                        <div className="mb-3">
                            <span className="bg-pink-500 text-white font-bold text-xs px-2 py-1 rounded-sm shadow-sm">
                                Dhruv
                            </span>
                        </div>
                        <p className="font-handwriting text-[10px] leading-[1.45] text-gray-800 tracking-wide">
                            I don't know how to express how happy I am that apart from me, there's someone who is starting their gruhasti. Ab maja aayega na bhidu.
                            <br /><br />
                            <span className="italic">Jokes apart... (clearing the voice)</span>
                            <br />
                            To me, you both are perfect for each other. I have seen how much you love & care for each other. Not just that, you shared that love & care to create our bond too.
                            <br />
                            From considering for the trip to cancelling plans just because we can't come, Khushiyo share karva thi leyne dukh ma sathe rehva sudhi, you guys are always there. So so grateful for you guys.
                            <br /><br />
                            Congratulations for starting this beautiful (and "adventurous") journey.
                        </p>
                        <div className="absolute bottom-1 right-2 text-lg opacity-30">💗</div>
                    </div>
                </div>
            )}

            {data.type === 'ADVICE' && (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-pink-50 to-white">
                    {/* Badge */}
                    <span className="bg-black text-white font-mono text-[10px] px-2 py-1 mb-6 uppercase tracking-widest">
                        The One & Only Rule
                    </span>

                    {/* Main Quote */}
                    <div className="relative">
                        <span className="absolute -left-4 -top-2 text-5xl text-pink-200 font-serif">"</span>
                        <h3 className="font-handwriting text-3xl font-bold text-gray-800 leading-tight px-4">
                            <span className="text-primary-pink">Riddhi</span> is always right.
                        </h3>
                        <span className="absolute -right-4 bottom-0 text-5xl text-pink-200 font-serif">"</span>
                    </div>

                    {/* Decorative line */}
                    <div className="w-16 h-1 bg-pink-300 rounded-full mt-6 mb-4"></div>

                    {/* Footer */}
                    <p className="font-mono text-[9px] text-gray-400 uppercase tracking-wider">
                        Do you understand vasu?
                    </p>
                </div>
            )}

            {data.type === 'LOCKED_GIFT' && <LockedGiftCard />}

        </motion.div>
    );
};

export default CardStack;
