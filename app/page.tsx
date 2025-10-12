// page.tsx
'use client';

import Image from 'next/image';
import { Poppins } from 'next/font/google';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import CartSummary from './components/CartSummary';

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function CafePage() {
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [showCart, setShowCart] = useState(false);

  // Effect untuk update cart count
  useEffect(() => {
    const updateCartCount = () => {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const cart = JSON.parse(savedCart);
        const total = cart.reduce((sum: number, item: any) => sum + item.quantity, 0);
        setCartItemsCount(total);
      } else {
        setCartItemsCount(0);
      }
    };

    // Update saat component mount
    updateCartCount();

    // Listen untuk event custom ketika cart berubah
    window.addEventListener('cartUpdated', updateCartCount);
    
    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  const menuItems = [
    {
      id: 1,
      title: 'Smoothies',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      bgColor: 'bg-gradient-to-r from-pink-300 to-pink-400',
      image: '/series/smoothies.png',
      imagePosition: 'left',
      slug: 'smoothies'
    },
    {
      id: 2,
      title: 'Coffee',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      bgColor: 'bg-gradient-to-r from-amber-800 to-amber-900',
      image: '/series/coffee.png',
      imagePosition: 'right',
      slug: 'coffee'
    },
    {
      id: 3,
      title: 'Mocktail',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      bgColor: 'bg-gradient-to-r from-lime-500 to-lime-600',
      image: '/series/mocktail.png',
      imagePosition: 'left',
      slug: 'mocktail'
    },
    {
      id: 4,
      title: 'Snacks',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      bgColor: 'bg-gradient-to-r from-orange-400 to-orange-500',
      image: '/series/chickenpop.png',
      imagePosition: 'right',
      slug: 'snacks'
    }
  ];

  return (
    <div className={`min-h-screen bg-[#f5f0eb] pb-8 ${poppins.className}`}>
      <div className="max-w-[1300px] mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <Image
              src="/wulflogo/wulflogo.png"
              alt="Wolf Logo"
              width={40}
              height={40}
              className="object-contain w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
              priority
            />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Cafe</h1>
          </div>
          
          {/* Cart Icon dengan Badge */}
          <button 
            onClick={() => setShowCart(true)}
            className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </button>
        </header>

        {/* Menu Cards dengan gambar setengah keluar */}
        <div className="px-4 sm:px-6 space-y-6 sm:space-y-8 mt-6 sm:mt-8">
          {menuItems.map((item) => (
            <Link 
              key={item.id}
              href={`/menu/${item.slug}`}
              className="block"
            >
              <div
                className={`${item.bgColor} rounded-2xl sm:rounded-3xl p-6 sm:p-8 min-h-[140px] flex items-center justify-between shadow-lg relative overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform duration-200`}
              >
                {item.imagePosition === 'left' ? (
                  <>
                    {/* Container untuk gambar di pojok kiri atas - untuk Smoothies & Mocktail */}
                    {item.id === 1 || item.id === 3 ? (
                      <div className="absolute -left-15 -top-13 sm:-left-12 sm:-top-12 md:-left-16 md:-top-16 lg:-left-20 lg:-top-20">
                        <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 relative">
                          <Image
                            src={item.image}
                            alt={item.title}
                            width={384}
                            height={384}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    ) : (
                      /* Untuk item lain di kiri - tetap pakai yang lama */
                      <div className="relative -ml-8 sm:-ml-12 md:-ml-16">
                        <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center relative z-10 border-4 border-white/30">
                          <span className="text-white font-medium text-sm sm:text-base">Image</span>
                        </div>
                        <div className="absolute inset-0 rounded-full bg-black/10 blur-sm scale-105"></div>
                      </div>
                    )}

                    {/* Text Content untuk kiri */}
                    <div className={`ml-4 sm:ml-6 md:ml-8 flex-1 relative z-10 ${item.id === 1 || item.id === 3 ? 'ml-auto text-right' : ''}`}>
                      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                        {item.title}
                      </h2>
                      <p className={`text-white/90 text-sm sm:text-base md:text-lg leading-relaxed ${item.id === 1 || item.id === 3 ? 'max-w-[200px] sm:max-w-[250px] md:max-w-[300px] ml-auto' : 'max-w-md'}`}>
                        {item.description}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Container untuk gambar di kanan */}
                    <div className="flex items-center justify-between w-full">
                      {/* Text Content untuk kanan - POSISI DI KIRI */}
                      <div className="flex-1 mr-4 sm:mr-6 md:mr-8 text-left relative z-10">
                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                          {item.title}
                        </h2>
                        <p className={`text-white/90 text-sm sm:text-base md:text-lg leading-relaxed ${item.id === 2 || item.id === 4 ? 'max-w-[200px] sm:max-w-[250px] md:max-w-[300px]' : 'max-w-md'}`}>
                          {item.description}
                        </p>
                      </div>

                      {/* Image Container untuk kanan */}
                      {item.id === 2 || item.id === 4 ? (
                        // Untuk Coffee & Snacks - gambar real di pojok kanan atas
                        <div className="absolute -right-15 -top-15 sm:-right-12 sm:-top-12 md:-right-16 md:-top-16 lg:-right-20 lg:-top-20">
                          <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 relative">
                            <Image
                              src={item.image}
                              alt={item.title}
                              width={384}
                              height={384}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      ) : (
                        // Untuk item lain di kanan - tetap pakai yang lama
                        <div className="relative -mr-8 sm:-mr-12 md:-mr-16">
                          <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center relative z-10 border-4 border-white/30">
                            <span className="text-white font-medium text-sm sm:text-base">Image</span>
                          </div>
                          <div className="absolute inset-0 rounded-full bg-black/10 blur-sm scale-105"></div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Cart Summary */}
      <CartSummary 
        isOpen={showCart} 
        onClose={() => setShowCart(false)} 
      />
    </div>
  );
}