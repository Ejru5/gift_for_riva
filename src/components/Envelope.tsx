import { motion, type Variants } from 'framer-motion';
import { useState } from 'react';

const Envelope = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Animation variants
    const containerVariants: Variants = {
        float: {
            y: [-10, 10, -10],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }
        },
        open: {
            y: 50, // Slide down when open
            transition: {
                duration: 0.5,
                ease: "easeInOut"
            }
        }
    };

    const flapVariants: Variants = {
        closed: {
            rotateX: 0,
            zIndex: 20,
            transition: { duration: 0.5 }
        },
        open: {
            rotateX: 180,
            zIndex: 0, // Flap goes behind the contents when open
            transition: { duration: 0.6, ease: "easeInOut" }
        }
    };

    const handleOpen = () => {
        if (!isOpen) setIsOpen(true);
    };

    return (
        <div className="w-full h-full flex items-center justify-center" style={{ perspective: '1200px' }}>

            {/* Animated Envelope Container */}
            <motion.div
                className="relative w-72 h-48 cursor-pointer"
                variants={containerVariants}
                animate={isOpen ? 'open' : 'float'}
                onClick={handleOpen}
                style={{ transformStyle: 'preserve-3d' }}
            >

                {/* Level 1: Back of Envelope (Inside Color) */}
                <div className="absolute inset-0 bg-[#be185d] rounded-b-xl overflow-hidden shadow-2xl z-0"
                    style={{ transform: 'translateZ(-2px)' }}>
                    {/* Use darker color for depth */}
                </div>

                {/* Level 2: Content (The Card) */}
                <div className="absolute inset-x-4 h-40 bg-white rounded-lg shadow-sm z-10 flex items-center justify-center transition-transform duration-500"
                    style={{
                        bottom: '10px',
                        transform: isOpen ? 'translateY(-40px) translateZ(-1px)' : 'translateY(20px) translateZ(-1px)'
                    }}
                >
                    <span className="font-bold text-gray-400">Thinking...</span>
                </div>

                {/* Level 3: Front Pocket */}
                <div className="absolute inset-0 z-20 pointer-events-none" style={{ transform: 'translateZ(1px)' }}>
                    {/* SVG shape for the front pocket using clip-path or simple div layering */}
                    {/* Since we need specific layers, let's use a div with a custom clip-path or simply a bottom-half div */}

                    {/* Alternative: A div that covers the bottom half and has triangular top */}
                    {/* Let's try CSS clip-path for a proper envelope feel */}
                    <div
                        className="absolute bottom-0 w-full h-full bg-gradient-to-b from-[#ff7eb3] to-[#ff758c]"
                        style={{
                            clipPath: 'polygon(0% 100%, 100% 100%, 100% 40%, 50% 65%, 0% 40%)',
                            // Add noise texture via background-image if possible, here using simple gradient 
                        }}
                    ></div>

                    {/* Overlaid noise texture (simulated with opacity) */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                </div>

                {/* Level 4: Flap */}
                <motion.div
                    className="absolute top-0 w-full h-1/2 origin-top drop-shadow-lg"
                    style={{ zIndex: 30 }}
                    variants={flapVariants}
                    initial="closed"
                    animate={isOpen ? 'open' : 'closed'}
                >
                    <div
                        className="w-full h-full bg-gradient-to-b from-[#ff9a9e] to-[#fecfef]"
                        style={{
                            clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
                        }}
                    ></div>
                </motion.div>

            </motion.div>
        </div>
    );
};

export default Envelope;
