'use client';
import { useState } from 'react';
import { Users, Clock, DollarSign, Sparkles, Grid3x3, CheckCircle, XCircle, Calendar, Wrench, X, ChefHat, Utensils, CheckCheck, RotateCcw } from 'lucide-react';
import Image from 'next/image';

interface OrderItem {
    id: number;
    name: string;
    quantity: number;
    price: number;
    status: 'pending' | 'preparing' | 'ready' | 'completed' | 'served' | 'canceled';
}

interface Order {
    id: string;
    tableNumber: string;
    status: 'pending' | 'preparing' | 'completed' | 'ready' | 'served' | 'canceled';
    customerName: string;
    seats: number;
    orderTime: string;
    duration?: string;
    totalAmount: number;
    items: OrderItem[];
}

const sampleOrders: Order[] = [
    {
        id: 'WLF-2024-001',
        tableNumber: 'Table 1',
        status: 'preparing',
        customerName: 'Budi Santoso',
        seats: 2,
        orderTime: new Date().toISOString(),
        duration: '17m',
        totalAmount: 15000,
        items: [
            {
                id: 1,
                name: 'Nasi Goreng Spesial',
                quantity: 1,
                price: 15000,
                status: 'preparing'
            },
            {
                id: 2,
                name: 'Es Teh Manis',
                quantity: 1,
                price: 8000,
                status: 'ready'
            }
        ]
    },
    {
        id: 'WLF-2024-002',
        tableNumber: 'Table 3',
        status: 'pending',
        customerName: 'Ahmad Rizki',
        seats: 4,
        orderTime: new Date(Date.now() - 10 * 60000).toISOString(),
        totalAmount: 0,
        items: [
            {
                id: 3,
                name: 'Mie Ayam Bakso',
                quantity: 2,
                price: 20000,
                status: 'pending'
            }
        ]
    },
    {
        id: 'WLF-2024-003',
        tableNumber: 'Table 4',
        status: 'ready',
        customerName: 'Sari Dewi',
        seats: 4,
        orderTime: new Date(Date.now() - 25 * 60000).toISOString(),
        duration: '25m',
        totalAmount: 45000,
        items: [
            {
                id: 4,
                name: 'Ayam Geprek',
                quantity: 1,
                price: 18000,
                status: 'ready'
            },
            {
                id: 5,
                name: 'Jus Alpukat',
                quantity: 1,
                price: 15000,
                status: 'ready'
            },
            {
                id: 6,
                name: 'Kerupuk',
                quantity: 2,
                price: 6000,
                status: 'ready'
            }
        ]
    },
    {
        id: 'WLF-2024-004',
        tableNumber: 'Table 6',
        status: 'completed',
        customerName: 'Tim Corporate',
        seats: 2,
        orderTime: new Date(Date.now() - 45 * 60000).toISOString(),
        duration: '35m',
        totalAmount: 120000,
        items: [
            {
                id: 7,
                name: 'Steak Sirloin',
                quantity: 2,
                price: 60000,
                status: 'served'
            }
        ]
    },
];

export default function OrderPage() {
    const [orders] = useState<Order[]>(sampleOrders);
    const [filter, setFilter] = useState<'all' | 'pending' | 'preparing' | 'ready' | 'completed' | 'served' | 'canceled'>('all');
    const [username] = useState('satria');
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const filteredOrders = orders.filter(order =>
        filter === 'all' || order.status === filter
    );

    const getStatusCount = (status: Order['status']) => {
        return orders.filter(o => o.status === status).length;
    };

    const getStatusColor = (status: Order['status']) => {
        switch (status) {
            case 'pending':
                return 'bg-gray-100 text-gray-800 border-gray-300';
            case 'preparing':
                return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            case 'ready':
                return 'bg-blue-100 text-blue-800 border-blue-300';
            case 'completed':
                return 'bg-green-100 text-green-800 border-green-300';
            case 'served':
                return 'bg-purple-100 text-purple-800 border-purple-300';
            case 'canceled':
                return 'bg-red-100 text-red-800 border-red-300';
            default:
                return '';
        }
    };

    const getStatusDotColor = (status: Order['status']) => {
        switch (status) {
            case 'pending':
                return 'bg-gray-500';
            case 'preparing':
                return 'bg-yellow-500';
            case 'ready':
                return 'bg-blue-500';
            case 'completed':
                return 'bg-green-500';
            case 'served':
                return 'bg-purple-500';
            case 'canceled':
                return 'bg-red-500';
            default:
                return '';
        }
    };

    const getStatusIcon = (status: Order['status']) => {
        switch (status) {
            case 'pending':
                return Clock;
            case 'preparing':
                return ChefHat;
            case 'ready':
                return CheckCheck;
            case 'completed':
                return CheckCircle;
            case 'served':
                return Utensils;
            case 'canceled':
                return XCircle;
            default:
                return Clock;
        }
    };

    const getStatusLabel = (status: Order['status']) => {
        switch (status) {
            case 'pending':
                return 'Pending';
            case 'preparing':
                return 'Preparing';
            case 'ready':
                return 'Ready';
            case 'completed':
                return 'Completed';
            case 'served':
                return 'Served';
            case 'canceled':
                return 'Canceled';
            default:
                return '';
        }
    };

    const getItemStatusColor = (status: OrderItem['status']) => {
        switch (status) {
            case 'pending':
                return 'bg-gray-100 text-gray-800';
            case 'preparing':
                return 'bg-yellow-100 text-yellow-800';
            case 'ready':
                return 'bg-blue-100 text-blue-800';
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'served':
                return 'bg-purple-100 text-purple-800';
            case 'canceled':
                return 'bg-red-100 text-red-800';
            default:
                return '';
        }
    };

    const formatTime = (isoString: string) => {
        return new Date(isoString).toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    return (
        <div className="min-h-screen bg-[#F9F2ED]">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Image
                            src="/wulflogo/wulflogo.png"
                            alt="Wolf Logo"
                            width={40}
                            height={40}
                            className="object-contain w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
                            priority
                        />
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Order Monitoring</h1>
                            <p className="text-sm text-gray-600">Welcome, <span className="font-semibold">{username}</span></p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="bg-white border-b border-gray-200 px-6 py-3">
                <div className="flex gap-2 overflow-x-auto">
                    <button
                        onClick={() => setFilter('all')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors whitespace-nowrap ${filter === 'all'
                            ? 'bg-gray-900 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        <Grid3x3 className="w-4 h-4" />
                        All
                        <span className={`ml-1 ${filter === 'all' ? 'text-white' : 'text-gray-500'}`}>
                            {orders.length}
                        </span>
                    </button>
                    {['pending', 'preparing', 'ready', 'completed', 'served', 'canceled'].map((status) => {
                        const StatusIcon = getStatusIcon(status as Order['status']);
                        return (
                            <button
                                key={status}
                                onClick={() => setFilter(status as any)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors whitespace-nowrap ${filter === status
                                    ? 'bg-gray-900 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                <StatusIcon className="w-4 h-4" />
                                {getStatusLabel(status as Order['status'])}
                                <span className={`ml-1 ${filter === status ? 'text-white' : 'text-gray-500'}`}>
                                    {getStatusCount(status as Order['status'])}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Orders Grid */}
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredOrders.map((order) => {
                        const StatusIcon = getStatusIcon(order.status);
                        return (
                            <button
                                key={order.id}
                                onClick={() => setSelectedOrder(order)}
                                className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition-all hover:scale-105 text-left w-full"
                            >
                                {/* Order Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">{order.id}</h3>
                                        <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${getStatusColor(order.status)}`}>
                                            {getStatusLabel(order.status)}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-3 h-3 rounded-full ${getStatusDotColor(order.status)}`}></div>
                                        <StatusIcon className="w-4 h-4 text-gray-400" />
                                    </div>
                                </div>

                                {/* Order Info */}
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Users className="w-4 h-4" />
                                        <span>{order.customerName} • {order.seats} seats</span>
                                    </div>

                                    {order.duration && (
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Clock className="w-4 h-4" />
                                            <span>{order.duration}</span>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-2 text-sm font-semibold text-orange-700">
                                        <DollarSign className="w-4 h-4" />
                                        <span>Rp {order.totalAmount.toLocaleString('id-ID')}</span>
                                    </div>

                                    <div className="text-xs text-gray-500">
                                        {order.items.length} items • Ordered at {formatTime(order.orderTime)}
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {filteredOrders.length === 0 && (
                    <div className="text-center py-12">
                        <div className="inline-block p-4 bg-gray-100 rounded-full mb-3">
                            <Grid3x3 className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-600">No orders found</p>
                    </div>
                )}
            </div>

            {/* Modal Detail */}
            {selectedOrder && (
                <div
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    onClick={() => setSelectedOrder(null)}
                >
                    <div
                        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">{selectedOrder.id}</h2>
                                <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${getStatusColor(selectedOrder.status)}`}>
                                    {getStatusLabel(selectedOrder.status)}
                                </span>
                            </div>
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="p-2 hover:bg-orange-100 rounded-lg transition-colors text-gray-500 hover:text-gray-700"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 space-y-6">
                            {/* Order Information */}
                            <div className="space-y-3">
                                <h3 className="font-semibold text-gray-900 text-lg">Order Information</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <Users className="w-5 h-5 text-gray-500" />
                                        <div>
                                            <div className="font-medium">Customer</div>
                                            <div>{selectedOrder.customerName}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <Calendar className="w-5 h-5 text-gray-500" />
                                        <div>
                                            <div className="font-medium">Order Time</div>
                                            <div>{formatTime(selectedOrder.orderTime)}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <Users className="w-5 h-5 text-gray-500" />
                                        <div>
                                            <div className="font-medium">Seats</div>
                                            <div>{selectedOrder.seats} people</div>
                                        </div>
                                    </div>
                                    {selectedOrder.duration && (
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <Clock className="w-5 h-5 text-gray-500" />
                                            <div>
                                                <div className="font-medium">Duration</div>
                                                <div>{selectedOrder.duration}</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="space-y-3">
                                <h3 className="font-semibold text-gray-900 text-lg">Order Items</h3>
                                <div className="space-y-3">
                                    {selectedOrder.items.map((item) => (
                                        <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex-1">
                                                <div className="font-medium text-gray-900">{item.name}</div>
                                                <div className="text-sm text-gray-600">
                                                    {item.quantity} x Rp {item.price.toLocaleString('id-ID')}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getItemStatusColor(item.status)}`}>
                                                    {getStatusLabel(item.status)}
                                                </span>
                                                <div className="text-sm font-semibold text-gray-900">
                                                    Rp {(item.quantity * item.price).toLocaleString('id-ID')}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex justify-between items-center text-lg font-bold text-gray-900">
                                    <span>Total Amount:</span>
                                    <span className="text-orange-700">Rp {selectedOrder.totalAmount.toLocaleString('id-ID')}</span>
                                </div>
                            </div>

                            {/* Status Info */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex items-center gap-3">
                                    <div className={`w-4 h-4 rounded-full ${getStatusDotColor(selectedOrder.status)}`}></div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Current Order Status</p>
                                        <p className="text-sm text-gray-600">
                                            {selectedOrder.status === 'pending' && 'Order is waiting for confirmation'}
                                            {selectedOrder.status === 'preparing' && 'Order is being prepared in the kitchen'}
                                            {selectedOrder.status === 'ready' && 'Order is ready for serving'}
                                            {selectedOrder.status === 'completed' && 'Order preparation is completed'}
                                            {selectedOrder.status === 'served' && 'Order has been served to customer'}
                                            {selectedOrder.status === 'canceled' && 'Order has been canceled'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}