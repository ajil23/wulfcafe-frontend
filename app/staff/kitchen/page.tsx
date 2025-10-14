// app/kitchen/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Poppins } from 'next/font/google';
import { ChefHat, CheckCircle, Utensils, Clock, User, Table, CheckCheck, Menu, X, Timer, RotateCcw, UtensilsCrossed, CalendarCheck, ArrowLeft } from 'lucide-react';
import Image from 'next/image';

const poppins = Poppins({
    weight: ['400', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
});

interface OrderItem {
    id: number;
    name: string;
    quantity: number;
    price: number;
    category: string;
    estimatedTime: number;
    actualTime?: number;
    readyTime?: string;
    status: 'processing' | 'ready' | 'completed';
    ingredients: {
        name: string;
        amount: string;
    }[];
}

interface OrderData {
    id: string;
    status: 'processing' | 'ready' | 'completed';
    customerName: string;
    tableNumber: string;
    orderTime: string;
    readyTime?: string;
    completedTime?: string;
    items: OrderItem[];
    totalPrice: number;
    estimatedTime: number;
    actualTime?: number;
    source?: 'dine-in' | 'booking';
}

// Data contoh untuk simulasi - SEMUA STATUS PROCESSING
const sampleOrders: OrderData[] = [
    {
        id: 'WLF-2024-001',
        status: 'processing',
        customerName: 'Budi Santoso',
        tableNumber: 'A5',
        orderTime: new Date().toISOString(),
        items: [
            {
                id: 1,
                name: 'Nasi Goreng Spesial',
                quantity: 2,
                price: 25000,
                category: 'makanan',
                estimatedTime: 8,
                status: 'processing',
                ingredients: [
                    { name: 'Nasi', amount: '400 gram' },
                    { name: 'Ayam', amount: '200 gram' },
                    { name: 'Telur', amount: '2 butir' },
                    { name: 'Bawang merah', amount: '50 gram' },
                    { name: 'Bawang putih', amount: '30 gram' },
                    { name: 'Kecap manis', amount: '3 sdm' },
                    { name: 'Garam', amount: '1 sdt' },
                    { name: 'Minyak', amount: '2 sdm' }
                ]
            },
            {
                id: 2,
                name: 'Es Teh Manis',
                quantity: 1,
                price: 8000,
                category: 'minuman',
                estimatedTime: 3,
                status: 'processing',
                ingredients: [
                    { name: 'Teh celup', amount: '2 buah' },
                    { name: 'Gula', amount: '2 sdm' },
                    { name: 'Es batu', amount: '200 gram' },
                    { name: 'Air panas', amount: '300 ml' }
                ]
            },
        ],
        totalPrice: 58000,
        estimatedTime: 15,
        source: 'dine-in',
    },
    {
        id: 'WLF-2024-002',
        status: 'processing',
        customerName: 'Sari Dewi',
        tableNumber: 'B3',
        orderTime: new Date(Date.now() - 5 * 60000).toISOString(),
        items: [
            {
                id: 3,
                name: 'Mie Ayam Bakso',
                quantity: 1,
                price: 20000,
                category: 'makanan',
                estimatedTime: 10,
                status: 'processing',
                ingredients: [
                    { name: 'Mie kuning', amount: '1 buah' },
                    { name: 'Ayam suwir', amount: '1 sdm' },
                    { name: 'Bakso sapi', amount: '2 buah' },
                    { name: 'Sawi', amount: '1 sdm' },
                    { name: 'Bawang goreng', amount: '1 sdt' },
                    { name: 'Kecap asin', amount: '1 sdt' },
                    { name: 'Minyak wijen', amount: '1 sdt' },
                ]
            },
            {
                id: 4,
                name: 'Jus Alpukat',
                quantity: 1,
                price: 15000,
                category: 'minuman',
                estimatedTime: 5,
                status: 'processing',
                ingredients: [
                    { name: 'Alpukat', amount: '1 buah' },
                    { name: 'Susu kental manis', amount: '2 sdm' },
                    { name: 'Es batu', amount: '100 gram' },
                    { name: 'Gula', amount: '1 sdt (optional)' },
                ]
            },
        ],
        totalPrice: 35000,
        estimatedTime: 12,
        source: 'dine-in',
    },
    {
        id: 'WLF-2024-003',
        status: 'processing',
        customerName: 'Ahmad Rizki',
        tableNumber: 'C1',
        orderTime: new Date(Date.now() - 2 * 60000).toISOString(),
        items: [
            {
                id: 5,
                name: 'Ayam Geprek',
                quantity: 1,
                price: 18000,
                category: 'makanan',
                estimatedTime: 12,
                status: 'processing',
                ingredients: [
                    { name: 'Ayam fillet', amount: '150 gram' },
                    { name: 'Tepung bumbu', amount: '100 gram' },
                    { name: 'Sambal', amount: '50 gram' },
                    { name: 'Minyak goreng', amount: '200 ml' },
                    { name: 'Nasi putih', amount: '200 gram' },
                ]
            },
            {
                id: 6,
                name: 'Kopi Latte',
                quantity: 1,
                price: 22000,
                category: 'minuman',
                estimatedTime: 6,
                status: 'processing',
                ingredients: [
                    { name: 'Espresso', amount: '30 ml' },
                    { name: 'Susu panas', amount: '200 ml' },
                    { name: 'Gula', amount: '1 sdt (optional)' },
                    { name: 'Busa susu', amount: '50 ml' }
                ]
            },
        ],
        totalPrice: 40000,
        estimatedTime: 10,
        source: 'booking',
    },
];

const statusSteps = [
    {
        key: 'processing' as const,
        label: 'Sedang Diproses',
        description: 'Pesanan sedang dibuat oleh dapur',
        icon: ChefHat,
        color: 'bg-yellow-100 text-yellow-800 border-yellow-300'
    },
    {
        key: 'ready' as const,
        label: 'Siap Disajikan',
        description: 'Pesanan sudah siap untuk diantar',
        icon: CheckCheck,
        color: 'bg-blue-100 text-blue-800 border-blue-300'
    },
    {
        key: 'completed' as const,
        label: 'Sudah Disajikan',
        description: 'Pesanan telah sampai ke meja',
        icon: Utensils,
        color: 'bg-green-100 text-green-800 border-green-300'
    },
];

export default function KitchenPage() {
    const [orders, setOrders] = useState<OrderData[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [filter, setFilter] = useState<'all' | 'processing' | 'ready' | 'completed'>('all');
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        // Load data dari localStorage atau API
        const savedOrders = localStorage.getItem('kitchenOrders');
        if (savedOrders) {
            try {
                setOrders(JSON.parse(savedOrders));
            } catch (error) {
                setOrders(sampleOrders);
            }
        } else {
            setOrders(sampleOrders);
        }
    }, []);

    useEffect(() => {
        // Auto-select first order jika belum ada yang dipilih
        if (orders.length > 0 && !selectedOrder) {
            setSelectedOrder(orders[0]);
        }
    }, [orders, selectedOrder]);

    useEffect(() => {
        // Auto-refresh waktu setiap 30 detik
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    const calculateActualTime = (orderTime: string, readyTime: string) => {
        const orderDate = new Date(orderTime);
        const readyDate = new Date(readyTime);
        const diffMs = readyDate.getTime() - orderDate.getTime();
        return Math.round(diffMs / 60000);
    };

    const getCurrentProcessingTime = (orderTime: string) => {
        const orderDate = new Date(orderTime);
        const diffMs = currentTime.getTime() - orderDate.getTime();
        return Math.floor(diffMs / 60000);
    };

    const getItemCurrentProcessingTime = (item: OrderItem, orderTime: string) => {
        if (item.actualTime) return item.actualTime;
        const orderDate = new Date(orderTime);
        const diffMs = currentTime.getTime() - orderDate.getTime();
        return Math.floor(diffMs / 60000);
    };

    const updateItemStatus = (orderId: string, itemId: number, newStatus: 'ready' | 'completed') => {
        const updatedOrders = orders.map(order => {
            if (order.id === orderId) {
                const updatedItems = order.items.map(item => {
                    if (item.id === itemId) {
                        const updatedItem = {
                            ...item,
                            status: newStatus
                        };

                        if (newStatus === 'ready' && !item.readyTime) {
                            updatedItem.readyTime = new Date().toISOString();
                            updatedItem.actualTime = calculateActualTime(order.orderTime, updatedItem.readyTime);
                        }

                        return updatedItem;
                    }
                    return item;
                });

                // Update order status berdasarkan item status
                const allItemsReady = updatedItems.every(item => item.status === 'ready' || item.status === 'completed');
                const allItemsCompleted = updatedItems.every(item => item.status === 'completed');

                let orderStatus: OrderData['status'] = order.status;
                if (allItemsCompleted) {
                    orderStatus = 'completed';
                } else if (allItemsReady) {
                    orderStatus = 'ready';
                }

                return {
                    ...order,
                    items: updatedItems,
                    status: orderStatus
                };
            }
            return order;
        });

        setOrders(updatedOrders);
        localStorage.setItem('kitchenOrders', JSON.stringify(updatedOrders));

        if (selectedOrder?.id === orderId) {
            const updatedSelectedOrder = updatedOrders.find(order => order.id === orderId);
            if (updatedSelectedOrder) {
                setSelectedOrder(updatedSelectedOrder);
            }
        }
    };

    const formatTime = (isoString: string) => {
        return new Date(isoString).toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    const formatDuration = (isoString: string) => {
        const orderTime = new Date(isoString);
        const diffMs = currentTime.getTime() - orderTime.getTime();
        const diffMins = Math.floor(diffMs / 60000);

        if (diffMins < 1) return 'Baru saja';
        if (diffMins < 60) return `${diffMins}m yang lalu`;

        const diffHours = Math.floor(diffMins / 60);
        return `${diffHours}j ${diffMins % 60}m yang lalu`;
    };

    const getProcessingTimeDisplay = (order: OrderData) => {
        if (order.actualTime) {
            return `${order.actualTime}m (Estimasi: ${order.estimatedTime}m)`;
        }

        const currentTime = getCurrentProcessingTime(order.orderTime);
        return `Sedang: ${currentTime}m (Estimasi: ${order.estimatedTime}m)`;
    };

    const getTimeComparison = (order: OrderData) => {
        if (!order.actualTime) return null;

        const difference = order.actualTime - order.estimatedTime;
        if (difference === 0) {
            return { text: 'Tepat waktu', color: 'text-green-600' };
        } else if (difference > 0) {
            return { text: `+${difference}m dari estimasi`, color: 'text-red-600' };
        } else {
            return { text: `${Math.abs(difference)}m lebih cepat`, color: 'text-green-600' };
        }
    };

    const resetData = () => {
        localStorage.removeItem('kitchenOrders');
        setOrders(sampleOrders);
        setSelectedOrder(sampleOrders[0]);
        setFilter('all');
    };

    const filteredOrders = orders.filter(order =>
        filter === 'all' || order.status === filter
    );

    const getOrdersByStatus = (status: OrderData['status']) => {
        return orders.filter(order => order.status === status);
    };

    return (
        <div className={`min-h-screen bg-[#F9F2ED] ${poppins.className}`}>
            {/* Mobile Header */}
            <div className="lg:hidden bg-white border-b border-[#E3E3E3] p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">

                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 rounded-lg hover:bg-gray-100"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <div className="flex items-center gap-2">
                            <Image
                                src="/wulflogo/wulflogo.png"
                                alt="Wolf Logo"
                                width={32}
                                height={32}
                                className="object-contain w-6 h-6"
                                priority
                            />
                            <h1 className="text-xl font-bold text-[#313131]">Kitchen</h1>
                        </div>
                    </div>
                    <div className="text-sm text-[#5A5A5A]">
                        {getOrdersByStatus('processing').length} pesanan diproses
                    </div>
                </div>
            </div>

            <div className="flex h-screen lg:h-auto lg:min-h-screen">
                {/* Sidebar */}
                <div className={`
          fixed lg:relative inset-y-0 left-0 z-50 w-80 bg-white border-r border-[#E3E3E3] transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
                    {/* Sidebar Header */}
                    <div className="p-6 border-b border-[#E3E3E3]">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <button onClick={() => window.history.back()} className="p-2 hover:bg-orange-100 rounded-lg transition-colors text-gray-500 hover:text-gray-700"><ArrowLeft className="w-5 h-5" /></button>
                                <Image
                                    src="/wulflogo/wulflogo.png"
                                    alt="Wolf Logo"
                                    width={40}
                                    height={40}
                                    className="object-contain w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
                                    priority
                                />
                                <h1 className="text-2xl font-bold text-[#313131]">Kitchen</h1>
                            </div>
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Reset Button */}
                        <button
                            onClick={resetData}
                            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 mt-3 transition-colors"
                        >
                            <RotateCcw className="w-4 h-4" />
                            Reset Data ke Awal
                        </button>

                        {/* Status Summary */}
                        <div className="grid grid-cols-3 gap-2 mt-4">
                            <div className="text-center p-2 bg-yellow-50 rounded-lg">
                                <div className="text-lg font-bold text-yellow-700">{getOrdersByStatus('processing').length}</div>
                                <div className="text-xs text-yellow-600">Diproses</div>
                            </div>
                            <div className="text-center p-2 bg-blue-50 rounded-lg">
                                <div className="text-lg font-bold text-blue-700">{getOrdersByStatus('ready').length}</div>
                                <div className="text-xs text-blue-600">Ready</div>
                            </div>
                            <div className="text-center p-2 bg-green-50 rounded-lg">
                                <div className="text-lg font-bold text-green-700">{getOrdersByStatus('completed').length}</div>
                                <div className="text-xs text-green-600">Serve</div>
                            </div>
                        </div>
                    </div>

                    {/* Filter Tabs */}
                    <div className="p-4 border-b border-[#E3E3E3]">
                        <div className="flex space-x-1">
                            {[
                                { key: 'all' as const, label: 'Semua', count: orders.length },
                                { key: 'processing' as const, label: 'Diproses', count: getOrdersByStatus('processing').length },
                                { key: 'ready' as const, label: 'Ready', count: getOrdersByStatus('ready').length },
                                { key: 'completed' as const, label: 'Serve', count: getOrdersByStatus('completed').length },
                            ].map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setFilter(tab.key)}
                                    className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg transition-colors ${filter === tab.key
                                        ? 'bg-[#c17f54] text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    {tab.label}
                                    <div className={`text-xs mt-1 ${filter === tab.key ? 'text-white' : 'text-gray-500'
                                        }`}>
                                        {tab.count}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Orders List */}
                    <div className="overflow-y-auto h-[calc(100vh-200px)] lg:h-[calc(100vh-180px)]">
                        {filteredOrders.map((order) => {
                            const statusInfo = statusSteps.find(step => step.key === order.status);
                            return (
                                <button
                                    key={order.id}
                                    onClick={() => {
                                        setSelectedOrder(order);
                                        setSidebarOpen(false);
                                    }}
                                    className={`w-full p-4 text-left border-b border-[#E3E3E3] hover:bg-gray-50 transition-colors ${selectedOrder?.id === order.id ? 'bg-[#FFF8F3] border-r-2 border-r-[#c17f54]' : ''
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="font-bold text-[#313131] text-sm">{order.id}</h3>
                                            <p className="text-xs text-[#5A5A5A]">Meja {order.tableNumber}</p>
                                        </div>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo?.color}`}>
                                            {statusInfo?.label}
                                        </span>
                                    </div>

                                    <div className="text-xs text-[#5A5A5A] mb-2">
                                        {order.customerName} • {formatDuration(order.orderTime)}
                                    </div>

                                    <div className="flex justify-between items-center text-xs text-[#313131]">
                                        <span>{order.items.length} item • Rp {order.totalPrice.toLocaleString('id-ID')}</span>
                                        {order.status === 'processing' && (
                                            <div className="flex items-center gap-1 text-yellow-600">
                                                <Timer className="w-3 h-3" />
                                                <span>{getProcessingTimeDisplay(order).split(' (')[0]}</span>
                                            </div>
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-auto">
                    {selectedOrder ? (
                        <div className="p-4 lg:p-6">
                            {/* Order Header */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E3E3E3] mb-6">
                                {/* Baris pertama: Order ID */}
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                                    <div>
                                        <h2 className="text-2xl font-bold text-[#313131] mb-2">{selectedOrder.id}</h2>
                                    </div>
                                </div>

                                {/* Baris kedua: Informasi Customer */}
                                <div className="flex flex-wrap items-center gap-4 text-sm text-[#5A5A5A] mb-4">
                                    <div className="flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        {selectedOrder.customerName}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Table className="w-4 h-4" />
                                        Meja {selectedOrder.tableNumber}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        {formatTime(selectedOrder.orderTime)}
                                    </div>
                                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium`}>
                                        {selectedOrder.source === 'dine-in' ? (
                                            <>
                                                <UtensilsCrossed className="w-3 h-3" />
                                                Dine-in
                                            </>
                                        ) : (
                                            <>
                                                <CalendarCheck className="w-3 h-3" />
                                                Booking
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Baris ketiga: Time Tracking */}
                                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Timer className="w-4 h-4 text-[#c17f54]" />
                                        <span className="font-semibold text-[#313131]">Waktu Pemrosesan Order</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <div className="text-[#5A5A5A]">Estimasi</div>
                                            <div className="font-semibold text-[#313131]">{selectedOrder.estimatedTime} menit</div>
                                        </div>
                                        <div>
                                            <div className="text-[#5A5A5A]">
                                                {selectedOrder.actualTime ? 'Aktual' : 'Berjalan'}
                                            </div>
                                            <div className="font-semibold text-[#313131]">
                                                {selectedOrder.actualTime
                                                    ? `${selectedOrder.actualTime} menit`
                                                    : `${getCurrentProcessingTime(selectedOrder.orderTime)} menit`
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    {selectedOrder.actualTime && (
                                        <div className={`mt-2 text-sm font-medium ${getTimeComparison(selectedOrder)?.color}`}>
                                            {getTimeComparison(selectedOrder)?.text}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Order Items - Dengan tombol per item */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E3E3E3] mb-6">
                                <h3 className="text-xl font-bold text-[#313131] mb-4">Detail Pesanan</h3>
                                <div className="space-y-4">
                                    {selectedOrder.items.map((item) => (
                                        <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                                            {/* Item Header dengan Status dan Tombol */}
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <div className="font-semibold text-[#313131]">{item.name}</div>
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                                                            item.status === 'ready' ? 'bg-blue-100 text-blue-800' :
                                                                'bg-green-100 text-green-800'
                                                            }`}>
                                                            {item.status === 'processing' ? 'Diproses' :
                                                                item.status === 'ready' ? 'Siap' : 'Selesai'}
                                                        </span>
                                                    </div>
                                                    <div className="text-sm text-[#5A5A5A] flex items-center gap-4">
                                                        <span>x{item.quantity}</span>
                                                        <span className="flex items-center gap-1">
                                                            <Timer className="w-3 h-3" />
                                                            {item.actualTime
                                                                ? `${item.actualTime}m (est: ${item.estimatedTime}m)`
                                                                : `${getItemCurrentProcessingTime(item, selectedOrder.orderTime)}m (est: ${item.estimatedTime}m)`
                                                            }
                                                        </span>
                                                        <span className="text-[#c17f54] font-bold">
                                                            Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Tombol untuk setiap item */}
                                                {item.status === 'processing' && (
                                                    <button
                                                        onClick={() => updateItemStatus(selectedOrder.id, item.id, 'ready')}
                                                        className="bg-[#c17f54] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#a56a42] transition-colors text-sm"
                                                    >
                                                        Tandai Siap
                                                    </button>
                                                )}
                                            </div>

                                            {/* Ingredients */}
                                            <div className="bg-gray-50 rounded-lg p-3">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="text-sm font-semibold text-[#313131]">Komposisi:</span>
                                                </div>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {item.ingredients.map((ingredient, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex items-center gap-1.5 bg-white px-2 py-1 rounded border border-gray-200 text-xs"
                                                        >
                                                            <span className="text-gray-700">{ingredient.name}</span>
                                                            <span className="text-gray-400">•</span>
                                                            <span className="font-medium text-gray-900">{ingredient.amount}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Order Timeline */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E3E3E3]">
                                <h3 className="text-xl font-bold text-[#313131] mb-6">Status Pesanan</h3>
                                <div className="relative">
                                    <div className="absolute left-5 top-0 w-0.5 bg-[#E3E3E3]" style={{ height: '12rem' }}></div>
                                    <div className="space-y-6">
                                        {statusSteps.map((step, index) => {
                                            const isCompleted = statusSteps.findIndex(s => s.key === selectedOrder.status) >= index;
                                            const IconComponent = step.icon;

                                            return (
                                                <div key={step.key} className="flex items-start gap-4 relative">
                                                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 z-10 ${isCompleted
                                                        ? 'bg-[#c17f54] border-[#c17f54] text-white'
                                                        : 'bg-white border-[#E3E3E3] text-[#A0A0A0]'
                                                        }`}>
                                                        {isCompleted ? (
                                                            <CheckCircle className="w-5 h-5" />
                                                        ) : (
                                                            <IconComponent className="w-5 h-5" />
                                                        )}
                                                    </div>
                                                    <div className="flex-1 pb-6">
                                                        <h4 className={`font-bold ${isCompleted ? 'text-[#313131]' : 'text-[#A0A0A0]'}`}>
                                                            {step.label}
                                                        </h4>
                                                        <p className={`mt-1 text-sm ${isCompleted ? 'text-[#5A5A5A]' : 'text-[#A0A0A0]'}`}>
                                                            {step.description}
                                                        </p>
                                                        {step.key === 'ready' && selectedOrder.readyTime && (
                                                            <p className="text-xs text-blue-600 mt-1">
                                                                Siap pada: {formatTime(selectedOrder.readyTime)}
                                                            </p>
                                                        )}
                                                        {step.key === 'completed' && selectedOrder.completedTime && (
                                                            <p className="text-xs text-green-600 mt-1">
                                                                Disajikan pada: {formatTime(selectedOrder.completedTime)}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-64">
                            <div className="text-center text-[#5A5A5A]">
                                <ChefHat className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                                <p>Pilih pesanan untuk melihat detail</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Overlay dengan inline style */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 lg:hidden"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
}