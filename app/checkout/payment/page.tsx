// app/checkout/payment/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Poppins } from 'next/font/google';
import Image from 'next/image';

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
}

interface OrderData {
  name: string;
  phone: string;
  notes: string;
  cart: CartItem[];
  totalItems: number;
  totalPrice: number;
  orderDate: string;
}

export default function PaymentPage() {
  const router = useRouter();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<'qris' | 'other' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Load order data dari localStorage
  useEffect(() => {
    const savedOrderData = localStorage.getItem('orderData');
    
    if (savedOrderData) {
      setOrderData(JSON.parse(savedOrderData));
    } else {
      // Jika tidak ada data order, redirect kembali ke checkout
      router.push('/checkout');
    }
  }, [router]);

  const handlePaymentSelect = (method: 'qris' | 'other') => {
    setSelectedPayment(method);
  };

  const handleConfirmPayment = () => {
    if (!selectedPayment) {
      alert('Pilih metode pembayaran terlebih dahulu!');
      return;
    }

    setIsProcessing(true);

    // Simulasi proses pembayaran
    setTimeout(() => {
      // Clear cart dan order data setelah pembayaran berhasil
      localStorage.removeItem('cart');
      localStorage.removeItem('orderData');
      
      alert('Pembayaran berhasil! Pesanan Anda sedang diproses.');
      router.push('/');
    }, 3000);
  };

  if (!orderData) {
    return (
      <div className={`min-h-screen bg-[#f5f0eb] flex items-center justify-center ${poppins.className}`}>
        <div className="text-center">
          <div className="text-6xl mb-4">📦</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Memuat Data...</h1>
          <p className="text-gray-600 mb-6">Sedang memuat data pesanan Anda</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-[#f5f0eb] pb-8 ${poppins.className}`}>
      <div className="max-w-4xl mx-auto">
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
          
          {/* <button
            onClick={() => router.push('/checkout')}
            className="text-gray-600 hover:text-gray-900 transition-colors text-sm sm:text-base"
          >
            ← Kembali
          </button> */}
        </header>

        <div className="px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 text-center mb-8">
            Metode Pembayaran
          </h1>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Pilihan Metode Pembayaran */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Pilih Pembayaran</h2>
              
              <div className="space-y-4">
                {/* QRIS */}
                <button
                  onClick={() => handlePaymentSelect('qris')}
                  className={`w-full p-4 border-2 rounded-xl text-left transition-all ${
                    selectedPayment === 'qris' 
                      ? 'border-[#c17f54] bg-[#f9f2ed]' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedPayment === 'qris' 
                        ? 'border-[#c17f54] bg-[#c17f54]' 
                        : 'border-gray-400'
                    }`}>
                      {selectedPayment === 'qris' && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">QRIS</div>
                      <div className="text-sm text-gray-600 mt-1">
                        Bayar dengan scan QR code melalui aplikasi e-wallet atau mobile banking
                      </div>
                    </div>
                    <div className="text-2xl">🧾</div>
                  </div>
                </button>

                {/* Lainnya */}
                <button
                  onClick={() => handlePaymentSelect('other')}
                  className={`w-full p-4 border-2 rounded-xl text-left transition-all ${
                    selectedPayment === 'other' 
                      ? 'border-[#c17f54] bg-[#f9f2ed]' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedPayment === 'other' 
                        ? 'border-[#c17f54] bg-[#c17f54]' 
                        : 'border-gray-400'
                    }`}>
                      {selectedPayment === 'other' && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Lainnya</div>
                      <div className="text-sm text-gray-600 mt-1">
                        Metode pembayaran lainnya (transfer bank, e-wallet, dll)
                      </div>
                    </div>
                    <div className="text-2xl">💳</div>
                  </div>
                </button>
              </div>

              {/* Tombol Konfirmasi */}
              <button
                onClick={handleConfirmPayment}
                disabled={isProcessing || !selectedPayment}
                className="w-full bg-[#c17f54] text-white py-4 rounded-xl font-semibold hover:bg-[#b57049] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {isProcessing ? 'Memproses Pembayaran...' : 'Konfirmasi Pembayaran'}
              </button>
            </div>

            {/* Ringkasan Pesanan */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Ringkasan Pesanan</h2>
              
              {/* Data Pemesan */}
              <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-2">Data Pemesan</h3>
                <div className="text-sm text-gray-600">
                  <div>Nama: {orderData.name}</div>
                  {orderData.phone && <div>Telepon: {orderData.phone}</div>}
                  {orderData.notes && <div className="mt-2">Catatan: {orderData.notes}</div>}
                </div>
              </div>

              {/* Items */}
              <div className="space-y-4 mb-6">
                <h3 className="font-semibold text-gray-900">Pesanan</h3>
                {orderData.cart.map((item) => (
                  <div key={`${item.category}-${item.id}`} className="flex justify-between items-center py-3 border-b border-gray-100">
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{item.name}</div>
                      <div className="text-sm text-gray-600">x{item.quantity}</div>
                    </div>
                    <div className="text-[#c17f54] font-bold">
                      Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Total Item</span>
                  <span className="font-semibold">{orderData.totalItems} item</span>
                </div>
                <div className="flex justify-between items-center text-xl font-bold text-[#c17f54]">
                  <span>Total Harga</span>
                  <span>Rp {orderData.totalPrice.toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}