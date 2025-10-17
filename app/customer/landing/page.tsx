'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
    Clock, MapPin, Phone, Mail, Instagram, Facebook,
    ChevronDown, ChevronRight, Star, Users, Coffee,
    Utensils, Heart, ArrowRight, Menu, X,
    Youtube
} from 'lucide-react';

export default function WulfCafeLanding() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['home', 'about', 'menu', 'testimonials', 'contact'];
            const scrollY = window.scrollY + 100; // Adjust for better detection

            let currentSection = 'home';

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const offsetTop = element.offsetTop;
                    const offsetBottom = offsetTop + element.offsetHeight;

                    if (scrollY >= offsetTop && scrollY < offsetBottom) {
                        currentSection = section;
                        break;
                    }
                }
            }

            // Special handling for contact section at the bottom
            if (scrollY + window.innerHeight >= document.documentElement.scrollHeight - 100) {
                currentSection = 'contact';
            }

            setActiveSection(currentSection);
        };

        window.addEventListener('scroll', handleScroll);
        // Trigger once to set initial state
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        // Immediate visual feedback - THIS IS CRITICAL
        setActiveSection(sectionId);

        const element = document.getElementById(sectionId);
        if (element) {
            const offsetPosition = element.offsetTop - 80;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            setIsMenuOpen(false);
        }
    };

    const menuItems = [
        {
            category: "Coffee",
            items: [
                { name: "Espresso", price: "25K", description: "Strong and bold Italian espresso" },
                { name: "Cappuccino", price: "32K", description: "Classic Italian cappuccino" },
                { name: "Latte", price: "35K", description: "Smooth milk with espresso" },
                { name: "Americano", price: "28K", description: "Rich black coffee" }
            ]
        },
        {
            category: "Main Course",
            items: [
                { name: "Nasi Goreng Spesial", price: "45K", description: "Special fried rice with chicken and egg" },
                { name: "Mie Ayam Bakso", price: "38K", description: "Chicken noodle with meatballs" },
                { name: "Steak Sirloin", price: "125K", description: "Premium sirloin steak" },
                { name: "Grilled Salmon", price: "98K", description: "Fresh salmon with herbs" }
            ]
        },
        {
            category: "Desserts",
            items: [
                { name: "Tiramisu", price: "42K", description: "Classic Italian dessert" },
                { name: "Chocolate Lava", price: "38K", description: "Warm chocolate cake" },
                { name: "Cheesecake", price: "35K", description: "New York style cheesecake" },
                { name: "Ice Cream Sundae", price: "32K", description: "Vanilla ice cream with toppings" }
            ]
        }
    ];

    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Food Blogger",
            comment: "The best coffee in town! Amazing atmosphere and friendly staff.",
            rating: 5,
            image: "/api/placeholder/100/100"
        },
        {
            name: "Budi Santoso",
            role: "Regular Customer",
            comment: "Perfect place to work and relax. Their cappuccino is outstanding!",
            rating: 5,
            image: "/api/placeholder/100/100"
        },
        {
            name: "Lisa Wang",
            role: "Tourist",
            comment: "Beautiful interior and delicious food. Will definitely come back!",
            rating: 4,
            image: "/api/placeholder/100/100"
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <Image
                                src="/wulflogo/wulflogo.png"
                                alt="Wulf Cafe"
                                width={40}
                                height={40}
                                className="object-contain"
                            />
                            <span className="text-xl font-bold text-[#c17f54]">CAFE</span>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            {['home', 'about', 'menu', 'testimonials', 'contact'].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => scrollToSection(item)}
                                    className={`font-medium transition-colors capitalize ${activeSection === item
                                        ? 'text-[#c17f54]'
                                        : 'text-gray-600 hover:text-[#c17f54]'
                                        }`}
                                >
                                    {item}
                                </button>
                            ))}
                            <button className="bg-[#c17f54] text-white px-6 py-2 rounded-lg hover:bg-[#b57049] transition-colors">
                                Reserve Table
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white border-t">
                        <div className="px-4 py-2 space-y-2">
                            {['home', 'about', 'menu', 'testimonials', 'contact'].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => scrollToSection(item)}
                                    className={`block w-full text-left px-4 py-2 rounded-lg font-medium transition-colors capitalize ${activeSection === item
                                        ? 'bg-[#c17f54] text-white'
                                        : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    {item}
                                </button>
                            ))}
                            <button className="w-full bg-[#c17f54] text-white px-4 py-2 rounded-lg hover:bg-[#b57049] transition-colors mt-2">
                                Reserve Table
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section id="home" className="pt-16 bg-gradient-to-br from-[#c17f54]/10 to-[#b57049]/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Hero Content */}
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                    Experience the Art of
                                    <span className="text-[#c17f54]"> Coffee & Cuisine</span>
                                </h1>
                                <p className="text-xl text-gray-600 leading-relaxed">
                                    Where every cup tells a story and every meal is a masterpiece.
                                    Join us for an unforgettable culinary experience in the heart of the city.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={() => scrollToSection('menu')}
                                    className="bg-[#c17f54] text-white px-8 py-4 rounded-lg hover:bg-[#b57049] transition-colors flex items-center justify-center gap-2 text-lg font-medium"
                                >
                                    Reserve Now
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Hero Image */}
                        <div className="relative">
                            <div className="bg-gradient-to-br from-[#c17f54] to-[#b57049] rounded-2xl p-1 w-full max-w-md mx-auto">
                                <div className="bg-white rounded-2xl p-4">
                                    <div className="h-96 lg:h-[28rem] rounded-xl overflow-hidden relative">
                                        {/* Background gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#c17f54]/10 to-[#b57049]/5"></div>

                                        {/* Image that covers the background */}
                                        <Image
                                            src="/products/Artboard 1.png"
                                            alt="Wulf Cafe"
                                            fill
                                            className="object-cover"
                                            priority
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Floating Elements */}
                            <div className="absolute -top-4 -left-4 bg-white p-4 rounded-xl shadow-lg">
                                <div className="flex items-center gap-2">
                                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                    <span className="font-semibold text-gray-600">4.9/5</span>
                                </div>
                                <div className="text-xs text-gray-600">Customer Rating</div>
                            </div>

                            <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg">
                                <div className="flex items-center gap-2">
                                    <Users className="w-5 h-5 text-[#c17f54]" />
                                    <span className="font-semibold text-gray-600">Open</span>
                                </div>
                                <div className="text-xs text-gray-600">Until 10 PM</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="flex justify-center pb-8">
                    <button
                        onClick={() => scrollToSection('about')}
                        className="animate-bounce"
                    >
                        <ChevronDown className="w-6 h-6 text-[#c17f54]" />
                    </button>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* About Image */}
                        <div className="relative">
                            <div className="bg-gradient-to-br from-[#c17f54] to-[#b57049] rounded-2xl p-1">
                                <div className="bg-gray-100 rounded-2xl p-4">
                                    <div className="aspect-video rounded-xl overflow-hidden relative">
                                        {/* Background gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#c17f54]/20 to-[#b57049]/10"></div>

                                        {/* Image that covers the background */}
                                        <Image
                                            src="/products/Artboard 1.png"
                                            alt="Wulf Cafe Interior"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* About Content */}
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <h2 className="text-4xl font-bold text-gray-900">
                                    Our Story of Passion and Flavor
                                </h2>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    Founded in 2021, Wulf Cafe has been serving the community with
                                    premium coffee and exquisite cuisine. Our passion for quality
                                    ingredients and exceptional service has made us a beloved
                                    destination for coffee lovers and food enthusiasts alike.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-[#c17f54]/10 rounded-lg flex items-center justify-center">
                                        <Coffee className="w-6 h-6 text-[#c17f54]" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Premium Coffee Beans</h3>
                                        <p className="text-gray-600">Sourced from the finest plantations worldwide</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-[#c17f54]/10 rounded-lg flex items-center justify-center">
                                        <Heart className="w-6 h-6 text-[#c17f54]" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Made with Love</h3>
                                        <p className="text-gray-600">Every dish prepared with passion and care</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-[#c17f54]/10 rounded-lg flex items-center justify-center">
                                        <Users className="w-6 h-6 text-[#c17f54]" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Community Focused</h3>
                                        <p className="text-gray-600">Building relationships one cup at a time</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Menu Section */}
            <section id="menu" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center space-y-4 mb-12">
                        <h2 className="text-4xl font-bold text-gray-900">Our Signature Menu</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Discover our carefully crafted selection of coffee, meals, and desserts
                            that will delight your senses
                        </p>
                    </div>

                    <div className="space-y-12">
                        {menuItems.map((category, categoryIndex) => (
                            <div key={categoryIndex} className="space-y-6">
                                <h3 className="text-2xl font-bold text-[#c17f54] text-center">
                                    {category.category}
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {category.items.map((item, itemIndex) => (
                                        <div
                                            key={itemIndex}
                                            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-200"
                                        >
                                            <div className="flex justify-between items-start mb-3">
                                                <h4 className="font-bold text-gray-900 text-lg">{item.name}</h4>
                                                <span className="text-[#c17f54] font-bold text-lg">{item.price}</span>
                                            </div>
                                            <p className="text-gray-600 text-sm">{item.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <button className="bg-[#c17f54] text-white px-8 py-4 rounded-lg hover:bg-[#b57049] transition-colors inline-flex items-center gap-2 text-lg font-medium">
                            View Full Menu
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center space-y-4 mb-12">
                        <h2 className="text-4xl font-bold text-gray-900">What Our Customers Say</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Don't just take our word for it - hear from our wonderful customers
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="bg-gradient-to-br from-[#c17f54]/5 to-[#b57049]/5 rounded-2xl p-6 border border-[#c17f54]/10"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-[#c17f54] rounded-full flex items-center justify-center text-white font-bold">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                                    </div>
                                </div>

                                <div className="flex mb-3">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-4 h-4 ${i < testimonial.rating
                                                ? 'text-yellow-400 fill-current'
                                                : 'text-gray-300'
                                                }`}
                                        />
                                    ))}
                                </div>

                                <p className="text-gray-600 italic">"{testimonial.comment}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 bg-gradient-to-br from-[#c17f54]/10 to-[#b57049]/5">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Visit Us Today</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            We'd love to welcome you to Wulf Cafe. Come experience the perfect blend
                            of great coffee, delicious food, and warm hospitality.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                        {/* Left Column */}
                        <div className="space-y-6">
                            <div className="flex items-start gap-4 p-4 bg-white/50 rounded-lg border border-[#c17f54]/20">
                                <div className="w-12 h-12 bg-[#c17f54] rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                    <MapPin className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 text-lg mb-2">Our Location</h3>
                                    <a
                                        href="https://maps.app.goo.gl/wb9yJgzmSb43aRLGA"
                                        className="text-gray-600 hover:text-[#c17f54] transition-colors leading-relaxed"
                                        target='_blank'
                                        rel='noopener noreferrer'
                                    >
                                        Kesilir, Siliragung, Kabupaten Banyuwangi, Jawa Timur 68488
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-white/50 rounded-lg border border-[#c17f54]/20">
                                <div className="w-12 h-12 bg-[#c17f54] rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                    <Clock className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 text-lg mb-2">Opening Hours</h3>
                                    <p className="text-gray-600">Monday - Sunday<br />7:00 AM - 10:00 PM</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            <div className="flex items-start gap-4 p-4 bg-white/50 rounded-lg border border-[#c17f54]/20">
                                <div className="w-12 h-12 bg-[#c17f54] rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                    <Phone className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 text-lg mb-2">Contact Us</h3>
                                    <a
                                        href="https://wa.me/+6285602509363"
                                        className="text-gray-600 hover:text-[#c17f54] transition-colors text-lg font-medium"
                                        target='_blank'
                                        rel='noopener noreferrer'
                                    >
                                        (+62) 856-0250-9363
                                    </a>
                                    <p className="text-sm text-gray-500 mt-1">Available on WhatsApp</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-white/50 rounded-lg border border-[#c17f54]/20">
                                <div className="w-12 h-12 bg-[#c17f54] rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                    <Mail className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 text-lg mb-2">Email</h3>
                                    <a
                                        href="mailto:cs@wulfgym.com"
                                        className="text-gray-600 hover:text-[#c17f54] transition-colors text-lg font-medium"
                                        target='_blank'
                                        rel='noopener noreferrer'
                                    >
                                        cs@wulfgym.com
                                    </a>
                                    <p className="text-sm text-gray-500 mt-1">We'll respond within 24 hours</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Social Media - Moved to bottom */}
                    <div className="flex gap-4 justify-center mt-12 pt-8 border-t border-[#c17f54]/20">
                        <a
                            href="https://www.instagram.com/wulfgym.id/"
                            className="w-12 h-12 bg-[#c17f54] rounded-lg flex items-center justify-center text-white hover:bg-[#b57049] transition-colors"
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            <Instagram className="w-6 h-6" />
                        </a>
                        <a
                            href="https://www.youtube.com/@WulfGym"
                            className="w-12 h-12 bg-[#c17f54] rounded-lg flex items-center justify-center text-white hover:bg-[#b57049] transition-colors"
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            <Youtube className="w-6 h-6" />
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <p className="text-gray-400">&copy; Copyright <b>WulfGym</b>. All rights reserved.</p>
                        <small className="text-gray-400">Designed by </small>
                        <a href="https://sekolahtrading.id" className="text-[#c17f54] hover:text-[#b57049] transition-colors text-sm">
                            Tama Produksi Media
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}