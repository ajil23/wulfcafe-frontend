// app/checkout/page.tsx
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

export default function CheckoutPage() {
    const router = useRouter();
    const [cart, setCart] = useState<CartItem[]>([]);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        notes: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Load cart dan form data dari localStorage
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        const savedOrderData = localStorage.getItem('orderData');
        
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }

        // Load form data dari orderData yang sudah tersimpan
        if (savedOrderData) {
            try {
                const orderData: OrderData = JSON.parse(savedOrderData);
                setFormData({
                    name: orderData.name || '',
                    phone: orderData.phone || '',
                    notes: orderData.notes || ''
                });
            } catch (error) {
                console.error('Error parsing saved order data:', error);
            }
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const updatedFormData = {
            ...formData,
            [name]: value
        };
        
        setFormData(updatedFormData);

        // Simpan form data ke localStorage secara real-time
        // Tapi jangan overwrite cart yang sudah ada
        const savedCart = localStorage.getItem('cart');
        const currentCart = savedCart ? JSON.parse(savedCart) : [];
        
        const tempOrderData: OrderData = {
            ...updatedFormData,
            cart: currentCart,
            totalItems: currentCart.reduce((sum: number, item: CartItem) => sum + item.quantity, 0),
            totalPrice: currentCart.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0),
            orderDate: new Date().toISOString()
        };

        localStorage.setItem('orderData', JSON.stringify(tempOrderData));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name.trim()) {
            alert('Nama harus diisi!');
            return;
        }

        setIsSubmitting(true);

        // Simpan data order final ke localStorage
        const orderData: OrderData = {
            ...formData,
            cart: cart,
            totalItems: cart.reduce((sum, item) => sum + item.quantity, 0),
            totalPrice: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
            orderDate: new Date().toISOString()
        };

        localStorage.setItem('orderData', JSON.stringify(orderData));

        // Redirect ke halaman payment
        setTimeout(() => {
            router.push('/checkout/payment');
        }, 500);
    };

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (cart.length === 0) {
        return (
            <div className={`min-h-screen bg-[#f5f0eb] flex items-center justify-center ${poppins.className}`}>
                <div className="text-center">
                    <div className="text-6xl mb-4">🛒</div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Keranjang Kosong</h1>
                    <p className="text-gray-600 mb-6">Silakan tambahkan menu terlebih dahulu</p>
                    <button
                        onClick={() => router.push('/')}
                        className="bg-[#c17f54] text-white px-6 py-3 rounded-full hover:bg-[#b57049] transition-colors"
                    >
                        Kembali ke Menu
                    </button>
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

                    <div className="flex gap-2">
                        
                        {/* Tombol Tambah Pesanan */}
                        <button
                            onClick={() => router.push('/')}
                            className="bg-[#c17f54] text-white px-4 py-2 rounded-full hover:bg-[#b57049] transition-colors text-sm sm:text-base"
                        >
                            + Tambah Pesanan
                        </button>
                    </div>
                </header>

                <div className="px-4 sm:px-6">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 text-center mb-8">
                        Checkout
                    </h1>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Form Data Pelanggan */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">Data Pemesan</h2>
                                {formData.name && (
                                    <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">
                                        Data tersimpan
                                    </span>
                                )}
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="space-y-4">
                                    {/* Nama */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nama <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#c17f54] focus:border-transparent transition-colors text-gray-900 placeholder-gray-500"
                                            placeholder="Masukkan nama lengkap"
                                        />
                                    </div>

                                    {/* Nomor Telepon */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nomor Telepon
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#c17f54] focus:border-transparent transition-colors text-gray-900 placeholder-gray-500"
                                            placeholder="Opsional"
                                        />
                                    </div>

                                    {/* Catatan */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Catatan
                                        </label>
                                        <textarea
                                            name="notes"
                                            value={formData.notes}
                                            onChange={handleInputChange}
                                            rows={4}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#c17f54] focus:border-transparent transition-colors text-gray-900 placeholder-gray-500"
                                            placeholder="Catatan khusus untuk pesanan (opsional)"
                                        />
                                    </div>

                                    {/* Tombol Submit */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-[#c17f54] text-white py-4 rounded-xl font-semibold hover:bg-[#b57049] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? 'Memproses...' : 'Pilih Metode Pembayaran'}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Ringkasan Pesanan */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Ringkasan Pesanan</h2>

                            <div className="space-y-4 mb-6">
                                {cart.map((item) => (
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
                                    <span className="font-semibold">{totalItems} item</span>
                                </div>
                                <div className="flex justify-between items-center text-xl font-bold text-[#c17f54]">
                                    <span>Total Harga</span>
                                    <span>Rp {totalPrice.toLocaleString('id-ID')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}