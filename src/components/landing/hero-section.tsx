"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const AnimatedRoutingGraph = () => {
    const numNodes = 12;
    const radius = 140;

    const nodes = Array.from({ length: numNodes }).map((_, i) => {
        const angle = (i / numNodes) * 2 * Math.PI;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return { x, y, delay: Math.random() * 2 };
    });

    const paths = [
        [nodes[0], nodes[2], nodes[5]],
        [nodes[7], nodes[9], nodes[11]],
        [nodes[1], nodes[4]],
        [nodes[3], nodes[8], nodes[10]]
    ];

    const pathVariants = {
        hidden: { pathLength: 0 },
        visible: (i: number) => ({
            pathLength: 1,
            transition: {
                pathLength: { delay: i * 0.5, duration: 1.5, ease: "easeInOut" }
            }
        })
    };

    const vehicleVariants = {
        hidden: { offsetDistance: "0%" },
        visible: (i: number) => ({
            offsetDistance: "100%",
            transition: {
                delay: i * 0.5 + 0.5,
                duration: 2.5,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "linear"
            }
        })
    };

    return (
        <div className="relative w-full h-80 md:h-96 flex items-center justify-center">
            <svg viewBox="-180 -180 360 360" className="w-full h-full">
                <defs>
                    {paths.map((path, i) => {
                        const d = "M0,0 " + path.map(p => `L${p.x},${p.y}`).join(' ');
                        return <path key={i} id={`path-${i}`} d={d} fill="none" />;
                    })}
                </defs>

                {/* Grid background */}
                <path d="M-160,0 H160 M-120,0 H120 M-80,0 H80 M-40,0 H40 M0,-160 V160 M0,-120 V120 M0,-80 V80 M0,-40 V40" stroke="hsl(var(--primary) / 0.1)" strokeWidth="1" />

                {/* Central Hub */}
                <motion.circle 
                    cx="0" 
                    cy="0" 
                    r="12" 
                    fill="hsl(var(--primary))" 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                />
                <motion.circle 
                    cx="0" 
                    cy="0" 
                    r="12" 
                    fill="hsl(var(--primary))"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Destination Nodes */}
                {nodes.map((node, i) => (
                    <motion.circle
                        key={i}
                        cx={node.x}
                        cy={node.y}
                        r="5"
                        fill="hsl(var(--foreground))"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: node.delay, duration: 0.5 }}
                    />
                ))}

                {/* Animated Paths & Vehicles */}
                {paths.map((_, i) => (
                    <g key={i}>
                        <motion.path
                            d={"M0,0 " + paths[i].map(p => `L${p.x},${p.y}`).join(' ')}
                            fill="none"
                            stroke="hsl(var(--primary) / 0.3)"
                            strokeWidth="2"
                            variants={pathVariants}
                            initial="hidden"
                            animate="visible"
                            custom={i}
                        />
                        <motion.circle
                            r="5"
                            fill="hsl(var(--primary))"
                            variants={vehicleVariants}
                            initial="hidden"
                            animate="visible"
                            custom={i}
                        >
                            <motion.animateMotion dur="3s" repeatCount="indefinite">
                                <mpath href={`#path-${i}`} />
                            </motion.animateMotion>
                        </motion.circle>
                    </g>
                ))}
            </svg>
        </div>
    );
};


const HeroSection = () => {
  return (
    <section className="w-full py-20 md:py-32 lg:py-40 bg-card border-b">
      <div className="container mx-auto text-center">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline tracking-tighter">
                Dynamic Routing that Cuts Time & Cost
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Our AI-powered platform optimizes your delivery routes in real-time, saving you money on every mile.
            </p>
            <div className="mt-8 flex justify-center gap-4">
                <Button asChild size="lg">
                    <Link href="/signup">Get Started Free <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                    <Link href="#calculator">Calculate Savings</Link>
                </Button>
            </div>
        </motion.div>
        
        <motion.div
            className="mt-12 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <AnimatedRoutingGraph />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
