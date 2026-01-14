import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import CardStack from './CardStack';

const SealedPackage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showCardsOnly, setShowCardsOnly] = useState(false);
    const x = useMotionValue(0);
    const opacity = useTransform(x, [0, 250], [1, 0]); // Fade tear strip as you drag
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Initialize Audio
    useEffect(() => {
        audioRef.current = new Audio('/zip.mp3'); // Expects zip.mp3 in public folder
        audioRef.current.volume = 0.5;
    }, []);

    // Trigger Zoom effect after unboxing animation
    useEffect(() => {
        if (isOpen && !showCardsOnly) {
            const timer = setTimeout(() => setShowCardsOnly(true), 800);
            return () => clearTimeout(timer);
        }
    }, [isOpen, showCardsOnly]);

    const handleOpen = () => {
        setIsOpen(true);
        // Trigger Haptic
        if (navigator.vibrate) navigator.vibrate([50, 50, 50]);
        // Trigger Confetti
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.5 },
            colors: ['#cbb498', '#FFFFFF', '#000000'] // Cardboard/Packing colors
        });
    };

    return (
        <div className="relative w-full h-full flex items-center justify-center">

            {/* 3D Box Container */}
            <motion.div
                className="relative w-full h-[600px] z-10 transition-transform duration-500"
                initial={false}
                animate={
                    showCardsOnly
                        ? { scale: 1.1, y: 0 }
                        : {
                            scale: 1,
                            y: isOpen ? 0 : [0, -15, 0] // Floating animation when closed
                        }
                }
                transition={
                    showCardsOnly
                        ? { duration: 0.5 }
                        : {
                            y: {
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }
                        }
                }
            >

                {/* GROUP 1: Back Layers (Thickness + Interior) */}
                {/* These must be BEHIND the cards */}
                <motion.div
                    className="absolute inset-0 z-0"
                    animate={showCardsOnly ? { opacity: 0, scale: 1.2, pointerEvents: 'none' } : { opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    {/* Layer 2: Box Back (Interior) acting as Main Body with Thickness Shadow */}
                    <div
                        className="absolute inset-0 bg-[#cbb498] rounded-xl border-[3px] border-black z-10 flex items-center justify-center overflow-hidden"
                        style={{
                            boxShadow: `
                                0px 15px 0px #8c7760,
                                0px 15px 0px 3px #000,
                                0px 25px 25px rgba(0,0,0,0.3)
                            `
                        }}
                    >
                        {/* Inner texture */}
                        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                    </div>
                </motion.div>

                {/* GROUP 2: Content (Cards) */}
                {/* Situated visually BETWEEN Back and Front */}
                <motion.div
                    className="absolute inset-0 z-20 flex items-center justify-center p-8"
                    animate={showCardsOnly ? { scale: 1.25 } : { scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <CardStack isInteractive={isOpen} />
                </motion.div>

                {/* GROUP 3: Front Layer (The Seal) */}
                {/* Must be ON TOP of the cards */}
                <motion.div
                    className="absolute inset-0 z-30 overflow-hidden rounded-xl border-[3px] border-black"
                    animate={showCardsOnly ? { opacity: 0, scale: 1.2, pointerEvents: 'none' } : { opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    {/* Background Texture */}
                    <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

                    {/* Top Half */}
                    <motion.div
                        className="absolute top-0 left-0 w-full h-1/2 bg-[#cbb498] border-b border-black/10 z-20 overflow-hidden"
                        initial={false}
                        animate={isOpen ? { y: '-100%', opacity: 0 } : { y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                        <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

                        {/* Sticker 1: Top Left - FRAGILE */}
                        <div className="absolute top-8 left-6 border-4 border-red-600 p-2 transform -rotate-12 bg-[#cbb498] shadow-sm">
                            <div className="border border-red-600 p-1">
                                <span className="font-black text-red-600 text-xl tracking-widest block">FRAGILE</span>
                            </div>
                            <span className="absolute -top-2 -left-2 w-full h-full bg-red-600/10 pointer-events-none"></span>
                        </div>

                        {/* Original Priority Mail Label */}
                        <div className="absolute top-4 right-4 border-2 border-black p-2 font-mono text-xs font-bold rotate-6 opacity-70 bg-white/50 backdrop-blur-sm">
                            PRIORITY MAIL
                        </div>
                    </motion.div>

                    {/* Bottom Half */}
                    <motion.div
                        className="absolute bottom-0 left-0 w-full h-1/2 bg-[#cbb498] border-t border-black/10 z-20 overflow-hidden"
                        initial={false}
                        animate={isOpen ? { y: '100%', opacity: 0 } : { y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                        <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

                        {/* Sticker 2: Bottom Right - AIR MAIL */}
                        <div className="absolute bottom-12 right-6 bg-blue-600 p-1 transform rotate-3 shadow-md">
                            <div className="border-2 border-dashed border-white p-2 flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full bg-white animate-pulse"></div>
                                <span className="font-black text-white text-lg tracking-widest">AIR MAIL</span>
                            </div>
                        </div>

                        {/* Sticker 3: Middle Left - DO NOT BEND/BARCODE */}
                        <div className="absolute top-10 left-8 bg-white p-2 transform -rotate-6 shadow-sm border border-black max-w-[120px]">
                            <div className="h-8 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Barcode_39.svg/1200px-Barcode_39.svg.png')] bg-cover mb-1 opacity-80"></div>
                            <span className="font-mono text-[10px] font-bold block text-center leading-none">DO NOT BEND</span>
                            <span className="font-mono text-[8px] block text-center text-gray-500">EXP-2026-X</span>
                        </div>

                    </motion.div>

                    {/* Tear Strip Container - Centered */}
                    {/* Only visible if not open */}
                    {!isOpen && (
                        <motion.div
                            className="absolute top-1/2 left-0 w-full h-16 -mt-8 z-30 flex items-center justify-end pr-6"
                            style={{ opacity }}
                        >
                            {/* Packing Tape Effect */}
                            <div className="absolute inset-x-0 h-12 bg-white/10 backdrop-blur-[1px] border-y border-white/20 shadow-inner transform -rotate-1 origin-left pointer-events-none">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50"></div>
                            </div>

                            {/* Dashed Line */}
                            <div className="absolute top-1/2 left-0 w-full h-0.5 border-t-2 border-dashed border-black/60 -mt-[1px] z-10"></div>

                            {/* Text follows Arrow */}
                            <span className="mr-5 font-mono text-xs font-black text-black/50 pointer-events-none select-none tracking-widest relative z-20 whitespace-nowrap bg-[#cbb498] px-2 outline-dotted outline-1 outline-[#cbb498]">
                                TEAR HERE
                            </span>

                            {/* Pull Tab - Right Aligned */}
                            <motion.div
                                className="relative z-40 w-12 h-12 bg-primary-pink rounded-full border-2 border-black flex items-center justify-center cursor-grab active:cursor-grabbing shadow-sm"
                                drag="x"
                                dragConstraints={{ left: -280, right: 0 }} // Constrain to width (Drag Left)
                                dragElastic={0.1}
                                dragMomentum={false}
                                onDrag={(_, info) => {
                                    // Haptic simulation on drag
                                    if (Math.abs(info.delta.x) > 2) {
                                        if (navigator.vibrate) navigator.vibrate(5);
                                    }

                                    // Play sound if dragging intensely? or just once?
                                    // Simple logic: Play on start (not ideal here, better in onDragStart)
                                }}
                                onDragStart={() => {
                                    if (audioRef.current) audioRef.current.play().catch(() => { });
                                }}
                                onDragEnd={(_, info) => {
                                    // Threshold to trigger open (Drag Left -> Negative X)
                                    if (info.offset.x < -200) {
                                        handleOpen();
                                    }
                                }}
                                style={{ x }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {/* Arrow Icon (Pointing Left) */}
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white transform rotate-180">
                                    <path d="M5 12h14" />
                                    <path d="M12 5l7 7-7 7" />
                                </svg>
                            </motion.div>
                        </motion.div>
                    )}

                </motion.div>

            </motion.div>
        </div>
    );
};

export default SealedPackage;
