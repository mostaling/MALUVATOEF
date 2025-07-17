"use client";

import React, { useState, useEffect, createContext, useContext } from 'react';
import { Sun, Moon, MapPin, Rocket, ClipboardList, Award, CheckCircle, Twitter, Linkedin, Facebook, ArrowRight, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================================================
// THEME PROVIDER (FOR ROBUST DARK MODE)
// ============================================================================

type Theme = 'light' | 'dark';
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>('light');

    useEffect(() => {
        const initialTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        setTheme(initialTheme);
    }, []);

    const toggleTheme = () => {
        setTheme(prevTheme => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            if (newTheme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
            return newTheme;
        });
    };
    
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

// ============================================================================
// SVG Flag Component
// ============================================================================
const FlagIcon: React.FC<{ flagKey: string; className?: string }> = ({ flagKey, className }) => {
    const svgs: { [key: string]: React.ReactNode } = {
        Canada: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 450"><path fill="#d52b1e" d="M0 0h900v450H0z"/><path fill="#fff" d="M225 0h450v450H225z"/><path fill="#d52b1e" d="m450 112.5-22.5 22.5-45-22.5-22.5 45 22.5 45-45 22.5 45 45-45 45 67.5 45 67.5-45-45-45 45-45-45-22.5 22.5 45-22.5 45-45-22.5-45 22.5Z"/></svg>,
        France: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600"><path fill="#fff" d="M0 0h900v600H0z"/><path fill="#002654" d="M0 0h300v600H0z"/><path fill="#ce1126" d="M600 0h300v600H600z"/></svg>,
        UAE: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600"><path fill="#00732f" d="M0 0h1200v200H0z"/><path d="M0 200h1200v200H0z"/><path fill="#000" d="M0 400h1200v200H0z"/><path fill="red" d="M0 0h300v600H0z"/></svg>,
        SaudiArabia: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 6"><path fill="#006c35" d="M0 0h12v6H0z"/><path fill="#fff" d="M4.699 2.723c.03.003.06.004.09.004.225 0 .428-.11.552-.29l.006-.01c.01-.014.02-.028.028-.043l.005-.01c.01-.013.02-.026.028-.04l.003-.007c.01-.02.018-.04.025-.06s.013-.04.018-.06.008-.04.01-.06.003-.04.004-.06.002-.04.002-.06v-.016c0-.02-.002-.04-.004-.06s-.003-.04-.004-.06-.006-.04-.01-.06-.01-.04-.018-.06-.015-.04-.025-.06-.018-.04-.028-.06l-.005-.01c-.01-.013-.018-.026-.028-.04l-.006-.01c-.124-.18-.327-.29-.552-.29-.03 0-.06.001-.09.004-.12.01-.233.06-.325.13l-1.42 1.05v-.78c0-.275-.225-.5-.5-.5s-.5.225-.5.5v2.25c0 .275.225.5.5.5s.5-.225.5-.5v-1.13l1.187-.878-.26.125c-.15.07-.32.11-.49.11-.37 0-.7-.22-.84-.55-.05-.12-.08-.25-.08-.38 0-.41.34-.75.75-.75.25 0 .48.12.62.31l.01.01.01.01.02.04.01.01.02.04.01.01.01.02.02.04.01.02.01.02V2.5l.01.02.01.02.02.04.01.02.01.02.02.04.01.01.02.04.01.01c.05.08.12.15.2.2l.27-.2c-.06-.09-.1-.2-.1-.32 0-.275.225-.5.5-.5s.5.225.5.5-.225.5-.5.5c-.12 0-.23-.04-.32-.1l-.25.18.91.67v.01c.01 0 .01 0 .01-.01l.02-.02c.1-.1.17-.22.2-.36.01-.05.02-.1.02-.15s-.01-.1-.02-.15c-.03-.14-.1-.26-.2-.36l-.02-.02.01.01.91.67-.3-.14c-.16.03-.33.05-.5.05-.37 0-.7-.22-.84-.55-.05-.12-.08-.25-.08-.38 0-.41.34-.75.75-.75.25 0 .48.12.62.31l.01.01.01.01.02.04.01.01.02.04.01.01.01.02.02.04.01.02.01.02V2.5l.01.02.01.02.02.04.01.02.01.02.02.04.01.01.02.04.01.01c.05.08.12.15.2.2l.27-.2c-.06-.09-.1-.2-.1-.32 0-.275.225-.5.5-.5s.5.225.5.5-.225.5-.5.5c-.12 0-.23-.04-.32-.1l-.25.18.91.67v.01s0 .01-.01.01l.02-.02c.1-.1.17-.22.2-.36.01-.05.02-.1.02-.15s-.01-.1-.02-.15c-.03-.14-.1-.26-.2-.36l-.02-.02.01.01.91.67-.3-.14c-.16.03-.33.05-.5.05-.37 0-.7-.22-.84-.55-.05-.12-.08-.25-.08-.38 0-.41.34-.75.75-.75.25 0 .48.12.62.31l.01.01.01.01.02.04.01.01.02.04.01.01.01.02.02.04.01.02.01.02V2.5l.01.02.01.02.02.04.01.02.01.02.02.04.01.01.02.04.01.01c.05.08.12.15.2.2l.27-.2c-.06-.09-.1-.2-.1-.32 0-.275.225-.5.5-.5s.5.225.5.5-.225.5-.5.5c-.12 0-.23-.04-.32-.1l-.25.18.91.67v.01s0 .01 0 .01l.02-.02c.1-.1.17-.22.2-.36.01-.05.02-.1.02-.15s-.01-.1-.02-.15c-.03-.14-.1-.26-.2-.36l-.02-.02.01.01.91.67L10.2 4.1c-.16.03-.33.05-.5.05-.37 0-.7-.22-.84-.55-.05-.12-.08-.25-.08-.38 0-.41.34-.75.75-.75.25 0 .48.12.62.31l.01.01.01.01.02.04.01.01.02.04.01.01.01.02.02.04.01.02.01.02V2.5l.01.02.01.02.02.04.01.02.01.02.02.04.01.01.02.04.01.01c.05.08.12.15.2.2l.27-.2c-.06-.09-.1-.2-.1-.32 0-.275.225-.5.5-.5s.5.225.5.5-.225.5-.5.5c-.12 0-.23-.04-.32-.1l-.25.18.91.67v.01c0 .01 0 .01 0 .01l.02-.02c.1-.1.17-.22.2-.36.01-.05.02-.1.02-.15s-.01-.1-.02-.15c-.03-.14-.1-.26-.2-.36l-.02-.02.01.01.91.67L9.9 4.1c-.16.03-.33.05-.5.05-.37 0-.7-.22-.84-.55-.05-.12-.08-.25-.08-.38 0-.41.34-.75.75-.75.25 0 .48.12.62.31l.01.01.01.01.02.04.01.01.02.04.01.01.01.02.02.04.01.02.01.02V2.5l.01.02.01.02.02.04.01.02.01.02.02.04.01.01.02.04.01.01c.05.08.12.15.2.2l.27-.2c-.06-.09-.1-.2-.1-.32 0-.275.225-.5.5-.5s.5.225.5.5-.225.5-.5.5c-.12 0-.23-.04-.32-.1l-.25.18.91.67v.01s0 .01 0 .01l.02-.02c.1-.1.17-.22.2-.36.01-.05.02-.1.02-.15s-.01-.1-.02-.15c-.03-.14-.1-.26-.2-.36l-.02-.02.01.01.91.67-.3-.14c-.16.03-.33.05-.5.05-.37 0-.7-.22-.84-.55-.05-.12-.08-.25-.08-.38 0-.41.34-.75.75-.75.25 0 .48.12.62.31l.01.01.01.01.02.04.01.01.02.04.01.01.01.02.02.04.01.02.01.02V2.5l.01.02.01.02.02.04.01.02.01.02.02.04.01.01.02.04.01.01c.05.08.12.15.2.2l.27-.2c-.06-.09-.1-.2-.1-.32 0-.275.225-.5.5-.5s.5.225.5.5-.225.5-.5.5c-.12 0-.23-.04-.32-.1l-.25.18.91.67v.01s0 .01-.01.01l.02-.02c.1-.1.17-.22.2-.36.01-.05.02-.1.02-.15s-.01-.1-.02-.15c-.03-.14-.1-.26-.2-.36l-.02-.02.01.01.91.67-.3-.14c-.16.03-.33.05-.5.05-.37 0-.7-.22-.84-.55-.05-.12-.08-.25-.08-.38 0-.41.34-.75.75-.75.25 0 .48.12.62.31l.01.01.01.01.02.04.01.01.02.04.01.01.01.02.02.04.01.02.01.02V2.5l.01.02.01.02.02.04.01.02.01.02.02.04.01.01.02.04.01.01c.05.08.12.15.2.2l.27-.2c-.06-.09-.1-.2-.1-.32 0-.275.225-.5.5-.5s.5.225.5.5-.225.5-.5.5c-.12 0-.23-.04-.32-.1l-.25.18.91.67v.01s0 .01 0 .01l.02-.02c.1-.1.17-.22.2-.36.01-.05.02-.1.02-.15s-.01-.1-.02-.15c-.03-.14-.1-.26-.2-.36l-.02-.02.01.01.91.67L11.699 4.1c.09-.07.205-.12.325-.13zM1.5 5.25h9v.5h-9zM10.299 5.023c-.09-.07-.205-.12-.325-.13-.03.003-.06.004-.09.004-.225 0-.428-.11-.552-.29l-.006-.01c-.01-.014-.02-.028-.028-.043l-.005-.01c-.01-.013-.02-.026-.028-.04l-.003-.007c-.01-.02-.018-.04-.025-.06s-.013-.04-.018-.06-.008-.04-.01-.06-.003-.04-.004-.06-.002-.04-.002-.06v-.016c0-.02.002-.04.004-.06s.003-.04.004-.06.006-.04.01-.06.01-.04.018-.06.015-.04.025-.06.018-.04.028-.06l.005-.01c.01-.013.018-.026.028-.04l.006-.01c.124-.18.327-.29.552-.29.03 0 .06.001.09.004.12.01.233.06.325.13l.91-.67-.25-.18c-.09.06-.2.1-.32.1-.275 0-.5-.225-.5-.5s.225-.5.5-.5.5.225.5.5c0 .12-.04.23-.1.32l.27.2c.08-.05.15-.12.2-.2l.01-.01.02-.04.01-.01.02-.04.01-.02.02-.04.01-.01.02-.04.01-.01v-.01c0-.01.01-.01.01-.02.01-.01.01-.02.02-.04.01-.01.01-.02.02-.04.01-.01.01-.01.02-.02l.01-.01c.14-.19.37-.31.62-.31.41 0 .75.34.75.75 0 .13-.03.26-.08.38-.14.33-.47.55-.84.55-.17 0-.34-.02-.5-.05l-.3.14.91-.67s0-.01 0-.01v-.01l-.02.02c-.1.1-.17.22-.2.36-.01.05-.02.1-.02.15s.01.1.02.15c.03.14.1.26.2.36l.02.02s0-.01.01-.01l-.91-.67.25.18c.09-.06.2-.1.32-.1.275 0 .5.225.5.5s-.225.5-.5.5-.5-.225-.5-.5c0-.12.04-.23.1-.32l-.27-.2c-.08.05-.15.12-.2.2l-.01.01-.02.04-.01.01-.02.04-.01.02-.02.04-.01.01-.02.04-.01.01v.01c0 .01-.01.01-.01.02-.01.01-.01.02-.02.04-.01.01-.01.02-.02.04-.01.01-.01.01-.02.02l-.01.01c-.14.19-.37.31-.62.31-.41 0-.75-.34-.75-.75 0-.13.03.26.08.38.14.33.47.55.84.55.17 0 .34-.02.5-.05l-.3.14.91-.67s0-.01 0-.01v-.01l-.02.02c-.1.1-.17.22-.2.36-.01.05-.02.1-.02.15s.01.1.02.15c.03.14.1.26.2.36l.02.02s0-.01.01-.01l-.91-.67.25.18c.09-.06.2-.1.32-.1.275 0 .5.225.5.5s-.225.5-.5.5-.5-.225-.5-.5c0-.12.04-.23.1-.32l-.27-.2c-.08.05-.15.12-.2.2l-.01.01-.02.04-.01.01-.02.04-.01.02-.02.04-.01.01-.02.04-.01.01v.01c0 .01-.01.01-.01.02-.01.01-.01.02-.02.04-.01.01-.01.02-.02.04-.01.01-.01.01-.02.02l-.01.01c-.14.19-.37.31-.62.31-.41 0-.75-.34-.75-.75 0-.13.03.26.08.38.14.33.47.55.84.55.17 0 .34-.02.5-.05l-.3.14.91-.67s0-.01 0-.01v-.01l-.02.02c-.1.1-.17.22-.2.36-.01.05-.02.1-.02-.15s.01.1.02.15c.03.14.1.26.2.36l.02.02s0-.01.01-.01l-.91-.67.25.18c.09-.06.2-.1.32-.1.275 0 .5.225.5.5s-.225.5-.5.5-.5-.225-.5-.5c0-.12.04-.23.1-.32l-.27-.2c-.08.05-.15.12-.2.2l-.01.01-.02.04-.01.01-.02.04-.01.02-.02.04-.01.01-.02.04-.01.01v.01c0 .01-.01.01-.01.02-.01.01-.01.02-.02.04-.01.01-.01.02-.02.04-.01.01-.01.01-.02.02l-.01.01c-.14.19-.37.31-.62.31-.41 0-.75-.34-.75-.75 0-.13.03-.26-.08-.38-.14.33-.47.55-.84.55-.17 0-.34-.02-.5-.05l-1.42-1.05z"/></svg>,
        Qatar: <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 280 110"><path fill="#8A1538" d="M0 0h280v110H0z"/><path d="M0 0v110h23.3L90 55 23.3 0H0zm6.6 0L90 55l-83.4 55h6.6L96.6 55 13.2 0h-6.6zm6.6 0L96.6 55l-83.4 55h6.6L103.2 55 19.8 0h-6.6zm6.6 0L103.2 55 16.6 110h6.6L109.8 55 26.4 0h-6.6zm6.6 0L109.8 55l-83.4 55h6.6L116.4 55 33 0h-6.6zm6.6 0L116.4 55l-83.4 55h6.6L123 55l-76.8 55h6.6L129.6 55 46.2 0h-6.6z"/></svg>,
        Kuwait: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600"><path fill="#007a3d" d="M0 0h1200v200H0z"/><path fill="#fff" d="M0 200h1200v200H0z"/><path fill="red" d="M0 400h1200v200H0z"/><path d="M0 0v600l300-200v-200L0 0z"/></svg>,
        Bahrain: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 500"><path fill="#ce1126" d="m0 0h1000v500H0z"/><path fill="#fff" d="m333 0 133 50-133 50 133 50-133 50 133 50-133 50 133 50-133 50 133 50-133 50V0z"/></svg>,
    };
    return <div className={className}>{svgs[flagKey] || null}</div>;
};


// ============================================================================
// Dark Mode Toggle Component
// ============================================================================

const DarkModeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="relative w-14 h-7 rounded-full p-1 flex items-center transition-colors duration-300 bg-blue-100 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
            aria-label="Toggle dark mode"
        >
            <motion.div
                layout
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                className="w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center absolute"
                style={{left: theme === 'light' ? '4px' : '30px'}}
            >
              <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={theme}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {theme === 'dark' ? <Moon className="h-3 w-3 text-blue-400" /> : <Sun className="h-3 w-3 text-yellow-500" />}
                  </motion.div>
              </AnimatePresence>
            </motion.div>
        </button>
    );
};


// ============================================================================
// Header Component
// ============================================================================

const Header: React.FC = () => {
    const { theme } = useTheme();
    const navLinks = ["Destinations", "Processus", "Témoignages", "Contact"];
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
        e.preventDefault();
        const section = document.getElementById(sectionId);
        if (section) {
            const headerOffset = 90; // Fixed offset for the sticky header height
            const elementPosition = section.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
            setIsOpen(false); // Close mobile menu on click
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            <motion.div 
                className={`w-full transition-all duration-300 ease-in-out ${isScrolled ? 'py-2' : 'py-4'}`}
                animate={{ 
                    backgroundColor: isScrolled 
                        ? (theme === 'dark' ? 'rgba(15, 23, 42, 0.7)' : 'rgba(255, 255, 255, 0.7)') 
                        : 'transparent',
                    backdropFilter: isScrolled ? 'blur(10px)' : 'none',
                    boxShadow: isScrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)' : 'none',
                    borderBottom: isScrolled ? (theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)') : '1px solid transparent'
                }}
            >
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <a href="#" onClick={(e) => scrollToSection(e, 'home')} className="font-heading text-xl font-bold text-blue-600 dark:text-blue-500">
                        Fly with Djo
                    </a>
                    <nav className="hidden md:flex items-center space-x-6">
                        {navLinks.map(link => (
                            <a key={link} href={`#${link.toLowerCase()}`} onClick={(e) => scrollToSection(e, link.toLowerCase())} className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-500 transition-colors">
                                {link}
                            </a>
                        ))}
                    </nav>
                    <div className="hidden md:flex items-center space-x-4">
                        <DarkModeToggle />
                    </div>
                    <div className="md:hidden flex items-center">
                        <DarkModeToggle />
                        <button onClick={() => setIsOpen(!isOpen)} className="p-2 z-50 ml-2" aria-label="Toggle menu">
                            <AnimatePresence mode="wait">
                                {isOpen ?
                                    <motion.div key="x" initial={{rotate: -90, opacity: 0}} animate={{rotate: 0, opacity: 1}} exit={{rotate: -90, opacity: 0}}><X className="text-slate-800 dark:text-slate-200" /></motion.div> :
                                    <motion.div key="menu" initial={{rotate: 90, opacity: 0}} animate={{rotate: 0, opacity: 1}} exit={{rotate: 90, opacity: 0}}><Menu className="text-slate-800 dark:text-slate-200" /></motion.div>
                                }
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </motion.div>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="md:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-slate-800/95 backdrop-blur-lg shadow-lg"
                >
                   <nav className="flex flex-col items-center space-y-6 py-8">
                    {navLinks.map(link => (
                        <a key={link} href={`#${link.toLowerCase()}`} onClick={(e) => scrollToSection(e, link.toLowerCase())} className="text-lg font-medium text-slate-700 dark:text-slate-200">
                            {link}
                        </a>
                    ))}
                   </nav>
                </motion.div>
              )}
            </AnimatePresence>
        </header>
    );
};


// ============================================================================
// Hero Section Component
// ============================================================================
const HeroSection: React.FC = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const variants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
    };

    return (
        <section id="home" className="h-screen min-h-[700px] flex items-center justify-center relative overflow-hidden text-white bg-slate-900">
            <div className="absolute inset-0 z-0">
                <motion.div 
                    className="absolute inset-0"
                    animate={{
                        background: [
                            'radial-gradient(circle at 20% 80%, rgba(37, 99, 235, 0.3), #0F172A 70%)',
                            'radial-gradient(circle at 80% 40%, rgba(56, 189, 248, 0.3), #0F172A 70%)',
                            'radial-gradient(circle at 50% 90%, rgba(129, 140, 248, 0.3), #0F172A 70%)',
                            'radial-gradient(circle at 20% 80%, rgba(37, 99, 235, 0.3), #0F172A 70%)',
                        ]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
                <motion.div 
                    className="absolute -inset-24 opacity-20"
                    style={{
                        maskImage: `radial-gradient(350px at ${mousePosition.x}px ${mousePosition.y}px, white, transparent)`,
                        WebkitMaskImage: `radial-gradient(350px at ${mousePosition.x}px ${mousePosition.y}px, white, transparent)`,
                        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 80%)',
                    }}
                    animate={{ x: mousePosition.x - 200, y: mousePosition.y - 200 }}
                    transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
                />
            </div>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{once: true}}
              variants={variants}
              className="relative z-10 text-center px-6"
            >
                <motion.h1 variants={variants} className="font-heading text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4">
                    Votre Carrière. <span className="text-blue-400">Sans Frontières.</span>
                </motion.h1>
                <motion.p variants={variants} className="max-w-3xl mx-auto text-lg md:text-xl text-slate-300 mb-8">
                    Des opportunités au Canada et en Europe aux carrefours d'affaires du Golfe. Nous sommes votre partenaire stratégique pour une transition réussie.
                </motion.p>
                <motion.div variants={variants}>
                    <a href="#destinations" className="bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-blue-700 transition-all transform hover:scale-105 inline-flex items-center group shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                        DÉCOUVRIR MES OPPORTUNITÉS
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </a>
                </motion.div>
            </motion.div>
        </section>
    );
};

// ============================================================================
// Destinations Hub Component
// ============================================================================

const destinations = [
    { name: "Canada", flagKey: "Canada" }, { name: "France", flagKey: "France" }, { name: "UAE", flagKey: "UAE" },
    { name: "Arabie Saoudite", flagKey: "SaudiArabia" }, { name: "Qatar", flagKey: "Qatar" }, { name: "Koweït", flagKey: "Kuwait" }, { name: "Bahreïn", flagKey: "Bahrain" },
];

const DestinationsHub: React.FC = () => (
    <section id="destinations" className="py-24 bg-slate-100 dark:bg-slate-900">
        <div className="container mx-auto px-6 text-center">
            <motion.h2 initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true, amount: 0.5}} transition={{duration: 0.5}} className="font-heading text-3xl md:text-4xl font-bold mb-12 text-slate-800 dark:text-slate-100">Choisissez Votre Prochain Horizon.</motion.h2>
            <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ staggerChildren: 0.1 }}
                className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-6 md:gap-8"
            >
                {destinations.map(dest => (
                    <motion.a key={dest.name} href="#" className="group" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 }}}>
                        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-blue-500/20 dark:hover:shadow-blue-400/20 p-4 transition-all duration-300 transform hover:-translate-y-2 border border-transparent hover:border-blue-500">
                            <FlagIcon flagKey={dest.flagKey} className="h-12 w-auto mx-auto mb-4 rounded overflow-hidden" />
                            <h3 className="font-semibold text-slate-700 dark:text-slate-200">{dest.name}</h3>
                        </div>
                    </motion.a>
                ))}
            </motion.div>
        </div>
    </section>
);


// ============================================================================
// Process Section Component (REBUILT FOR STABILITY)
// ============================================================================

const processSteps = [
    { icon: MapPin, title: "Évaluation & Stratégie", description: "Analyse approfondie de votre profil pour définir la meilleure trajectoire." },
    { icon: ClipboardList, title: "Préparation du Dossier", description: "Nous constituons un dossier impeccable et optimisé pour les ambassades." },
    { icon: Rocket, title: "Soumission & Suivi", description: "Gestion complète du processus de candidature avec un suivi proactif." },
    { icon: Award, title: "Intégration & Succès", description: "Préparation au départ et conseils pour une intégration fluide." },
];

const ProcessSection: React.FC = () => (
    <section id="processus" className="py-24 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <motion.h2 initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true, amount: 0.5}} transition={{duration: 0.5}} className="font-heading text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100">Notre Rampe de Lancement en 4 Étapes</motion.h2>
                <motion.p initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true, amount: 0.5}} transition={{duration: 0.5, delay: 0.2}} className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Un processus clair et transparent, conçu pour maximiser vos chances de succès.</motion.p>
            </div>
            <div className="relative max-w-4xl mx-auto">
                {/* The vertical timeline bar */}
                <div className="hidden md:block absolute top-8 bottom-8 left-1/2 w-0.5 bg-slate-200 dark:bg-slate-700 -translate-x-1/2"></div>
                
                {processSteps.map((step, index) => {
                    const isEven = index % 2 === 0;
                    return (
                        <motion.div
                            key={index}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                            variants={{
                                hidden: { opacity: 0, y: 50 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: index * 0.2 } }
                            }}
                            className="relative flex md:grid md:grid-cols-2 md:gap-10 items-start mb-12 last:mb-0"
                        >
                            {/* Timeline Icon (Desktop) */}
                            <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 h-16 w-16 rounded-full bg-blue-600 dark:bg-blue-500 text-white items-center justify-center ring-8 ring-white dark:ring-slate-800">
                                <step.icon className="h-8 w-8" />
                            </div>

                            {/* Content Card */}
                            <div className={`w-full ${isEven ? 'md:col-start-1 md:text-right' : 'md:col-start-2 md:text-left'}`}>
                                <div className="bg-slate-100 dark:bg-slate-900/50 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                                   {/* Mobile Icon & Title */}
                                   <div className="flex items-center md:hidden mb-4">
                                       <div className="h-12 w-12 rounded-full bg-blue-600 dark:bg-blue-500 text-white flex items-center justify-center mr-4 flex-shrink-0">
                                           <step.icon className="h-6 w-6" />
                                       </div>
                                       <h3 className="font-heading text-xl font-bold text-slate-800 dark:text-slate-200">{step.title}</h3>
                                   </div>
                                   {/* Desktop Title */}
                                   <h3 className="font-heading text-xl font-bold mb-2 text-slate-800 dark:text-slate-200 hidden md:block">{step.title}</h3>
                                   <p className="text-slate-600 dark:text-slate-400">{step.description}</p>
                                </div>
                             </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    </section>
);


// ============================================================================
// Why Us Section Component
// ============================================================================

const expertisePoints = [
    "Maîtrise des procédures d'immigration complexes.",
    "Réseau d'employeurs partenaires à l'international.",
    "Accompagnement personnalisé à chaque étape.",
    "Taux de succès élevé et satisfaction client.",
];

const WhyUsSection: React.FC = () => (
    <section className="py-24 bg-slate-100 dark:bg-slate-900">
        <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div initial={{opacity:0, x:-50}} whileInView={{opacity:1, x:0}} viewport={{once:true}} transition={{duration:0.8}} className="order-2 lg:order-1">
                    <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-6">Double Expertise. Zéro Stress.</h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                        Nous combinons une connaissance pointue des lois sur l'immigration avec une expertise en recrutement international. Cette double compétence est votre meilleur atout.
                    </p>
                    <motion.ul 
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ staggerChildren: 0.2 }}
                      className="space-y-4"
                    >
                        {expertisePoints.map((point, index) => (
                            <motion.li key={index} variants={{hidden: {opacity:0, x:-20}, visible: {opacity:1, x:0}}} className="flex items-start">
                                <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                                <span className="text-slate-700 dark:text-slate-300">{point}</span>
                            </motion.li>
                        ))}
                    </motion.ul>
                </motion.div>
                <motion.div initial={{opacity:0, scale:0.8}} whileInView={{opacity:1, scale:1}} viewport={{once:true}} transition={{duration:0.8}} className="order-1 lg:order-2 h-96 lg:h-auto lg:aspect-[4/3] w-full rounded-2xl shadow-xl overflow-hidden">
                    <img src="https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Équipe professionnelle en réunion stratégique" className="w-full h-full object-cover" />
                </motion.div>
            </div>
        </div>
    </section>
);


// ============================================================================
// Testimonials Section Component
// ============================================================================

const testimonialsData = [
    { quote: "Le professionnalisme de l'équipe a rendu mon projet de vie au Canada une réalité. Je n'aurais jamais pu le faire seul. Un immense merci !", name: "Karim J.", location: "Développeur à Montréal, QC", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
    { quote: "De la Tunisie à Dubaï sans aucun stress. L'équipe a géré chaque détail. Je les recommande vivement à tous ceux qui cherchent à évoluer.", name: "Amina B.", location: "Architecte à Dubaï, EAU", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704e" },
];

const TestimonialsSection: React.FC = () => (
    <section id="témoignages" className="py-24 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-6">
            <motion.h2 initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true, amount: 0.5}} transition={{duration: 0.5}} className="font-heading text-3xl md:text-4xl font-bold text-center mb-16 text-slate-800 dark:text-slate-100">Histoires de Succès Mondiales</motion.h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {testimonialsData.map((testimonial, index) => (
                    <motion.div 
                      key={index} 
                      initial={{opacity: 0, y: 50}} 
                      whileInView={{opacity: 1, y: 0}} 
                      viewport={{once: true, amount: 0.3}} 
                      transition={{duration: 0.6, delay: index * 0.2}}
                      className="bg-slate-100 dark:bg-slate-900 p-8 rounded-xl shadow-lg"
                    >
                        <p className="text-slate-600 dark:text-slate-300 italic mb-6">"{testimonial.quote}"</p>
                        <div className="flex items-center">
                            <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4 border-2 border-blue-500" />
                            <div>
                                <div className="font-semibold text-slate-800 dark:text-slate-100">{testimonial.name}</div>
                                <div className="text-sm text-blue-600 dark:text-blue-400">{testimonial.location}</div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);


// ============================================================================
// Final CTA Section Component
// ============================================================================

const FinalCTASection: React.FC = () => (
    <section id="contact" className="py-24 bg-gradient-to-r from-blue-700 to-indigo-800 text-white">
        <div className="container mx-auto px-6 text-center">
            <motion.h2 initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.7}} className="font-heading text-3xl md:text-4xl font-bold mb-4">Prêt à Construire Votre Avenir International ?</motion.h2>
            <motion.p initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.7, delay:0.2}} className="text-lg text-blue-200 mb-8 max-w-2xl mx-auto">Le monde est plus petit que vous ne le pensez. Faisons le premier pas ensemble.</motion.p>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4, type: 'spring' }}
                className="inline-block"
            >
                <motion.a 
                    href="#" 
                    className="bg-white text-blue-700 font-bold py-4 px-8 rounded-lg text-lg hover:bg-slate-100 transition-colors transform hover:scale-102 inline-block shadow-lg"
                    animate={{
                        boxShadow: [
                            "0 10px 15px -3px rgba(255, 255, 255, 0.2), 0 4px 6px -2px rgba(255, 255, 255, 0.1)",
                            "0 10px 15px -3px rgba(255, 255, 255, 0.4), 0 4px 6px -2px rgba(255, 255, 255, 0.2)",
                            "0 10px 15px -3px rgba(255, 255, 255, 0.2), 0 4px 6px -2px rgba(255, 255, 255, 0.1)",
                        ]
                    }}
                    whileHover={{
                        scale: 1.02,
                        boxShadow: "0 20px 25px -5px rgba(255, 255, 255, 0.4), 0 10px 10px -5px rgba(255, 255, 255, 0.2)"
                    }}
                    transition={{
                        duration: 0.3,
                        boxShadow: {
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }
                    }}
                >
                    RÉSERVER UNE CONSULTATION STRATÉGIQUE
                </motion.a>
            </motion.div>
        </div>
    </section>
);

// ============================================================================
// Footer Component
// ============================================================================

const Footer: React.FC = () => {
    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
        e.preventDefault();
        const section = document.getElementById(sectionId);
        if (section) {
            const headerOffset = 90;
            const elementPosition = section.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    return (
    <footer className="bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-6 py-12">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
                <div className="col-span-1 md:col-span-2">
                    <h3 className="font-heading text-lg font-bold text-blue-600 dark:text-blue-500 mb-2">Fly with Djo</h3>
                    <p className="text-slate-600 dark:text-slate-400 max-w-sm">Votre partenaire de confiance pour une carrière internationale réussie depuis la Tunisie.</p>
                </div>
                <div>
                    <h4 className="font-heading text-md font-bold mb-4 text-slate-800 dark:text-slate-200">Liens Rapides</h4>
                    <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                        <li><a href="#destinations" onClick={(e) => scrollToSection(e, 'destinations')} className="hover:text-blue-500 transition-colors">Destinations</a></li>
                        <li><a href="#processus" onClick={(e) => scrollToSection(e, 'processus')} className="hover:text-blue-500 transition-colors">Processus</a></li>
                        <li><a href="#témoignages" onClick={(e) => scrollToSection(e, 'témoignages')} className="hover:text-blue-500 transition-colors">Témoignages</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-heading text-md font-bold mb-4 text-slate-800 dark:text-slate-200">Suivez-nous</h4>
                    <div className="flex space-x-4">
                        <a href="#" aria-label="Twitter" className="text-slate-500 hover:text-blue-500 transition-colors"><Twitter /></a>
                        <a href="#" aria-label="LinkedIn" className="text-slate-500 hover:text-blue-500 transition-colors"><Linkedin /></a>
                        <a href="#" aria-label="Facebook" className="text-slate-500 hover:text-blue-500 transition-colors"><Facebook /></a>
                    </div>
                </div>
            </div>
            <div className="pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-400">
                <p>&copy; {new Date().getFullYear()} Fly with Djo. Tous droits réservés.</p>
            </div>
        </div>
    </footer>
    );
};


// ============================================================================
// Main Page Component
// ============================================================================

export default function Page() {
    return (
        <main className="font-sans bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
            <Header />
            <HeroSection />
            <DestinationsHub />
            <ProcessSection />
            <WhyUsSection />
            <TestimonialsSection />
            <FinalCTASection />
            <Footer />
        </main>
    );
}
