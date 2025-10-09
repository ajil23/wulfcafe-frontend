// app/menu/[category]/page.tsx
'use client';

import Image from 'next/image';
import { Poppins } from 'next/font/google';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

// Data produk untuk setiap kategori
const menuProducts = {
  smoothies: [
    { 
      id: 1, 
      name: 'Strawberry Blast', 
      price: 'Rp 25.000', 
      image: '/products/strawberry-smoothie.png',
      composition: ['Strawberry', 'Yogurt', 'Honey', 'Ice'],
      nutrition: { calories: '150', protein: '5g', carbs: '30g', fat: '2g' },
      videoUrl: 'https://www.youtube.com/embed/example1'
    },
  ],
  coffee: [
    { 
      id: 1, 
      name: 'Espresso', 
      price: 'Rp 18.000', 
      image: '/products/espresso.png',
      composition: ['Arabica Coffee Beans', 'Water'],
      nutrition: { calories: '5', protein: '0g', carbs: '1g', fat: '0g' },
      videoUrl: 'https://www.youtube.com/embed/example2'
    },
  ],
  mocktail: [
    { 
      id: 1, 
      name: 'Mojito Mocktail', 
      price: 'Rp 32.000', 
      image: '/products/mojito-mocktail.png',
      composition: ['Lime', 'Mint Leaves', 'Soda Water', 'Sugar'],
      nutrition: { calories: '120', protein: '0g', carbs: '28g', fat: '0g' },
      videoUrl: 'https://www.youtube.com/embed/example3'
    },
  ],
  snacks: [
    { 
      id: 1, 
      name: 'Chicken Pop', 
      price: 'Rp 15.000', 
      image: '/series/chickenpop.png',
      composition: ['Chicken Breast', 'Bread Crumbs', 'Spices', 'Oil'],
      nutrition: { calories: '280', protein: '18g', carbs: '20g', fat: '12g' },
      videoUrl: 'https://www.youtube.com/embed/example4'
    },
  ]
};

// Data kategori untuk warna
const categoryData = {
  smoothies: {
    title: 'Smoothies',
    buttonColor: 'bg-pink-500 hover:bg-pink-600',
    priceColor: 'text-pink-600',
    dotColor: 'bg-pink-500'
  },
  coffee: {
    title: 'Coffee',
    buttonColor: 'bg-amber-800 hover:bg-amber-900',
    priceColor: 'text-amber-800',
    dotColor: 'bg-amber-800'
  },
  mocktail: {
    title: 'Mocktail',
    buttonColor: 'bg-lime-500 hover:bg-lime-600',
    priceColor: 'text-lime-600',
    dotColor: 'bg-lime-500'
  },
  snacks: {
    title: 'Snacks',
    buttonColor: 'bg-orange-500 hover:bg-orange-600',
    priceColor: 'text-orange-500',
    dotColor: 'bg-orange-500'
  }
};

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [expandedCard, setExpandedCard] = useState(false);

  const category = params.category as string;
  const products = menuProducts[category] || [];
  const categoryInfo = categoryData[category];
  const currentProduct = products[currentSlide];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % products.length);
    setExpandedCard(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);
    setExpandedCard(false);
  };

  const toggleCardExpansion = () => {
    setExpandedCard(!expandedCard);
  };

  if (!categoryInfo || !currentProduct) {
    return (
      <div className={`min-h-screen bg-[#f5f0eb] flex items-center justify-center ${poppins.className}`}>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Kategori tidak ditemukan</h1>
          <button 
            onClick={() => router.back()}
            className="bg-[#c17f54] text-white px-6 py-2 rounded-full hover:bg-[#b57049] transition-colors"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

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
          <button 
            onClick={() => router.back()}
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${categoryInfo.buttonColor} flex items-center justify-center text-white transition-colors shadow-md`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-6 sm:w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </header>

        {/* Category Title */}
        <div className="px-4 sm:px-6 mt-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 text-center">
            {categoryInfo.title}
          </h1>
        </div>

        {/* Carousel */}
        <div className="px-4 sm:px-6 mt-8">
          <div className="relative">
            {/* Product Image */}
            <div className="flex justify-center mb-8">
              <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 relative">
                <Image
                  src={currentProduct.image}
                  alt={currentProduct.name}
                  width={384}
                  height={384}
                  className="w-full h-full object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </div>

            {/* Product Info Card - TETAP SEPERTI SEMULA */}
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-md mx-auto p-6 sm:p-8">
              <div className="text-left">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  {currentProduct.name}
                </h3>
                <p className={`text-xl sm:text-2xl font-semibold mb-6 ${categoryInfo.priceColor}`}>
                  {currentProduct.price}
                </p>
                
                <div className="flex gap-3">
                  <button 
                    onClick={toggleCardExpansion}
                    className="flex-1 border-2 border-gray-300 text-gray-700 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Detail Menu
                  </button>
                  
                  <button className={`flex-1 ${categoryInfo.buttonColor} text-white py-4 rounded-2xl font-semibold transition-colors shadow-lg`}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-2 sm:left-4 top-1/3 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-lg border border-gray-200 z-20"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-4 top-1/3 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-lg border border-gray-200 z-20"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-3">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? `${categoryInfo.dotColor} scale-125` 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal Overlay - Responsive */}
      {expandedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
          {/* Backdrop dengan efek blur */}
          <div 
            className="absolute inset-0 bg-[#f5f0eb] bg-opacity-80 backdrop-blur-sm"
            onClick={toggleCardExpansion}
          />
          
          {/* Modal Content - Responsive */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-2xl mx-2 sm:mx-4 max-h-[85vh] sm:max-h-[90vh] overflow-y-auto relative z-10">
            <div className="p-4 sm:p-6">
              {/* Header dalam modal - Responsive */}
              <div className="flex justify-between items-start mb-4 sm:mb-6">
                <div className="flex-1 mr-3">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 break-words">
                    {currentProduct.name}
                  </h3>
                  <p className={`text-lg sm:text-xl md:text-2xl font-semibold mt-1 sm:mt-2 ${categoryInfo.priceColor}`}>
                    {currentProduct.price}
                  </p>
                </div>
                <button 
                  onClick={toggleCardExpansion}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors flex-shrink-0"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Video YouTube - Responsive */}
              <div className="mb-6 sm:mb-8">
                <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Video Resep</h4>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={currentProduct.videoUrl}
                    className="w-full h-32 sm:h-40 md:h-48 rounded-lg sm:rounded-xl"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>

              {/* Komposisi - Responsive */}
              <div className="mb-6 sm:mb-8">
                <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Komposisi</h4>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {currentProduct.composition.map((item, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg sm:rounded-xl p-2 sm:p-3 text-center">
                      <p className="text-xs sm:text-sm font-medium text-gray-700 break-words">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Informasi Nutrisi - Responsive */}
              <div className="mb-6 sm:mb-8">
                <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Informasi Nutrisi</h4>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <div className="text-center bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                    <p className="text-lg sm:text-xl font-bold text-gray-900">{currentProduct.nutrition.calories}</p>
                    <p className="text-xs text-gray-600">Kalori</p>
                  </div>
                  <div className="text-center bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                    <p className="text-lg sm:text-xl font-bold text-gray-900">{currentProduct.nutrition.protein}</p>
                    <p className="text-xs text-gray-600">Protein</p>
                  </div>
                  <div className="text-center bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                    <p className="text-lg sm:text-xl font-bold text-gray-900">{currentProduct.nutrition.carbs}</p>
                    <p className="text-xs text-gray-600">Karbohidrat</p>
                  </div>
                  <div className="text-center bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                    <p className="text-lg sm:text-xl font-bold text-gray-900">{currentProduct.nutrition.fat}</p>
                    <p className="text-xs text-gray-600">Lemak</p>
                  </div>
                </div>
              </div>

              {/* Tombol Close - Responsive */}
              <button 
                onClick={toggleCardExpansion}
                className="w-full border-2 border-gray-300 text-gray-700 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold hover:bg-gray-50 transition-colors text-sm sm:text-base"
              >
                Tutup Detail
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}