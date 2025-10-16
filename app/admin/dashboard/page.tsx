'use client';

import { useState } from 'react';
import {
    Users, UserPlus, Edit, Trash2, Eye, Search, Filter, Clock, Calendar,
    Mail, Phone, MapPin, MoreVertical, ArrowLeft, Table, Utensils,
    Package, CreditCard, BookOpen, Plus, BarChart3, X, Activity,
    Settings, TrendingUp, Database
} from 'lucide-react';
import Image from 'next/image';

interface Staff {
    id: string;
    name: string;
    email: string;
    phone: string;
    position: string;
    status: 'active' | 'inactive';
    joinDate: string;
    lastLogin: string;
}

interface GuestSession {
    id: string;
    tableNumber: string;
    customerName: string;
    startTime: string;
    duration: string;
    totalSpent: number;
    status: 'active' | 'completed';
    orderCount: number;
}

interface RestaurantTable {
    id: string;
    number: string;
    capacity: number;
    status: 'available' | 'occupied' | 'reserved' | 'maintenance';
    location: string;
}

interface MenuItem {
    id: string;
    name: string;
    category: string;
    price: number;
    status: 'available' | 'out-of-stock';
    ingredients: string[];
    image?: string;
}

interface StockItem {
    id: string;
    name: string;
    category: string;
    currentStock: number;
    minStock: number;
    unit: string;
    status: 'adequate' | 'low' | 'out-of-stock';
}

interface Transaction {
    id: string;
    orderId: string;
    customerName: string;
    amount: number;
    paymentMethod: string;
    status: 'completed' | 'pending' | 'failed';
    date: string;
}

interface Reservation {
    id: string;
    customerName: string;
    phone: string;
    tableNumber: string;
    date: string;
    time: string;
    guests: number;
    status: 'confirmed' | 'pending' | 'cancelled';
}

interface StockTransaction {
    id: string;
    itemId: string;
    itemName: string;
    type: 'in' | 'out';
    quantity: number;
    unit: string;
    reason: 'purchase' | 'usage' | 'adjustment' | 'waste' | 'transfer';
    notes?: string;
    date: string;
    performedBy: string;
}

const sampleStaff: Staff[] = [
    {
        id: 'STF-001',
        name: 'Satria Adi',
        email: 'satria@wulf.com',
        phone: '+62 812-3456-7890',
        position: 'Manager',
        status: 'active',
        joinDate: '2024-01-15',
        lastLogin: '2024-12-20 14:30'
    },
    {
        id: 'STF-002',
        name: 'Budi Santoso',
        email: 'budi@wulf.com',
        phone: '+62 813-4567-8901',
        position: 'Waiter',
        status: 'active',
        joinDate: '2024-02-20',
        lastLogin: '2024-12-20 13:45'
    },
    {
        id: 'STF-003',
        name: 'Sari Dewi',
        email: 'sari@wulf.com',
        phone: '+62 814-5678-9012',
        position: 'Chef',
        status: 'active',
        joinDate: '2024-03-10',
        lastLogin: '2024-12-20 12:15'
    },
    {
        id: 'STF-004',
        name: 'Ahmad Rizki',
        email: 'ahmad@wulf.com',
        phone: '+62 815-6789-0123',
        position: 'Cashier',
        status: 'inactive',
        joinDate: '2024-04-05',
        lastLogin: '2024-12-18 16:20'
    }
];

const sampleGuestSessions: GuestSession[] = [
    {
        id: 'GS-001',
        tableNumber: 'Table 1',
        customerName: 'Tim Corporate',
        startTime: '2024-12-20 18:30',
        duration: '1h 25m',
        totalSpent: 450000,
        status: 'active',
        orderCount: 8
    },
    {
        id: 'GS-002',
        tableNumber: 'Table 3',
        customerName: 'Keluarga Surya',
        startTime: '2024-12-20 17:45',
        duration: '2h 15m',
        totalSpent: 320000,
        status: 'completed',
        orderCount: 6
    },
    {
        id: 'GS-003',
        tableNumber: 'Table 5',
        customerName: 'Rina Melati',
        startTime: '2024-12-20 19:00',
        duration: '45m',
        totalSpent: 180000,
        status: 'active',
        orderCount: 3
    },
    {
        id: 'GS-004',
        tableNumber: 'VIP Room',
        customerName: 'Mr. Johnson',
        startTime: '2024-12-20 16:30',
        duration: '3h 10m',
        totalSpent: 890000,
        status: 'completed',
        orderCount: 12
    }
];

const sampleTables: RestaurantTable[] = [
    {
        id: 'TBL-001',
        number: 'Table 1',
        capacity: 4,
        status: 'occupied',
        location: 'Main Hall'
    },
    {
        id: 'TBL-002',
        number: 'Table 2',
        capacity: 2,
        status: 'available',
        location: 'Main Hall'
    },
    {
        id: 'TBL-003',
        number: 'Table 3',
        capacity: 6,
        status: 'reserved',
        location: 'Garden'
    },
    {
        id: 'TBL-004',
        number: 'VIP Room',
        capacity: 10,
        status: 'maintenance',
        location: 'Private'
    }
];

const sampleMenu: MenuItem[] = [
    {
        id: 'MENU-001',
        name: 'Nasi Goreng Spesial',
        category: 'Main Course',
        price: 25000,
        status: 'available',
        ingredients: ['Nasi', 'Ayam', 'Telur', 'Sayuran']
    },
    {
        id: 'MENU-002',
        name: 'Mie Ayam Bakso',
        category: 'Main Course',
        price: 20000,
        status: 'available',
        ingredients: ['Mie', 'Ayam', 'Bakso', 'Sawi']
    },
    {
        id: 'MENU-003',
        name: 'Es Teh Manis',
        category: 'Beverage',
        price: 8000,
        status: 'out-of-stock',
        ingredients: ['Teh', 'Gula', 'Es']
    },
    {
        id: 'MENU-004',
        name: 'Capcay Kuah',
        category: 'Main Course',
        price: 18000,
        status: 'available',
        ingredients: ['Sayuran', 'Udang', 'Ayam', 'Jamur']
    },
    {
        id: 'MENU-005',
        name: 'Jus Alpukat',
        category: 'Beverage',
        price: 15000,
        status: 'available',
        ingredients: ['Alpukat', 'Susu', 'Es', 'Gula']
    },
    {
        id: 'MENU-006',
        name: 'Pisang Goreng',
        category: 'Dessert',
        price: 12000,
        status: 'available',
        ingredients: ['Pisang', 'Tepung', 'Minyak']
    },
    {
        id: 'MENU-007',
        name: 'Kerupuk',
        category: 'Appetizer',
        price: 5000,
        status: 'out-of-stock',
        ingredients: ['Tepung', 'Minyak', 'Garam']
    }
];

const sampleStock: StockItem[] = [
    {
        id: 'STK-001',
        name: 'Beras',
        category: 'Pantry',
        currentStock: 50,
        minStock: 20,
        unit: 'kg',
        status: 'adequate'
    },
    {
        id: 'STK-002',
        name: 'Ayam Fillet',
        category: 'Protein',
        currentStock: 15,
        minStock: 10,
        unit: 'kg',
        status: 'adequate'
    },
    {
        id: 'STK-003',
        name: 'Teh Celup',
        category: 'Beverage',
        currentStock: 5,
        minStock: 15,
        unit: 'box',
        status: 'low'
    },
    {
        id: 'STK-004',
        name: 'Gula Pasir',
        category: 'Pantry',
        currentStock: 0,
        minStock: 5,
        unit: 'kg',
        status: 'out-of-stock'
    }
];

const sampleTransactions: Transaction[] = [
    {
        id: 'TRX-001',
        orderId: 'WLF-2024-001',
        customerName: 'Budi Santoso',
        amount: 150000,
        paymentMethod: 'QRIS',
        status: 'completed',
        date: '2024-12-20 14:30'
    },
    {
        id: 'TRX-002',
        orderId: 'WLF-2024-002',
        customerName: 'Sari Dewi',
        amount: 89000,
        paymentMethod: 'Cash',
        status: 'completed',
        date: '2024-12-20 13:15'
    },
    {
        id: 'TRX-003',
        orderId: 'WLF-2024-003',
        customerName: 'Ahmad Rizki',
        amount: 45000,
        paymentMethod: 'Credit Card',
        status: 'pending',
        date: '2024-12-20 12:45'
    }
];

const sampleReservations: Reservation[] = [
    {
        id: 'RES-001',
        customerName: 'Tim Corporate',
        phone: '+62 812-3456-7890',
        tableNumber: 'VIP Room',
        date: '2024-12-21',
        time: '19:00',
        guests: 8,
        status: 'confirmed'
    },
    {
        id: 'RES-002',
        customerName: 'Keluarga Surya',
        phone: '+62 813-4567-8901',
        tableNumber: 'Table 3',
        date: '2024-12-22',
        time: '18:30',
        guests: 4,
        status: 'pending'
    },
    {
        id: 'RES-003',
        customerName: 'Rina Melati',
        phone: '+62 814-5678-9012',
        tableNumber: 'Table 5',
        date: '2024-12-20',
        time: '20:00',
        guests: 2,
        status: 'cancelled'
    }
];

const sampleStockTransactions: StockTransaction[] = [
    {
        id: 'ST-TRX-001',
        itemId: 'ING-001',
        itemName: 'Beras',
        type: 'in',
        quantity: 25,
        unit: 'kg',
        reason: 'purchase',
        notes: 'Pembelian rutin dari Supplier A',
        date: '2024-12-20 10:30',
        performedBy: 'Satria Adi'
    },
    {
        id: 'ST-TRX-002',
        itemId: 'ING-002',
        itemName: 'Ayam Fillet',
        type: 'out',
        quantity: 5,
        unit: 'kg',
        reason: 'usage',
        notes: 'Untuk persiapan menu hari ini',
        date: '2024-12-20 08:15',
        performedBy: 'Sari Dewi'
    },
    {
        id: 'ST-TRX-003',
        itemId: 'ING-003',
        itemName: 'Teh Celup',
        type: 'in',
        quantity: 10,
        unit: 'box',
        reason: 'purchase',
        notes: 'Stok darurat',
        date: '2024-12-19 14:20',
        performedBy: 'Budi Santoso'
    },
    {
        id: 'ST-TRX-004',
        itemId: 'ING-004',
        itemName: 'Gula Pasir',
        type: 'out',
        quantity: 2,
        unit: 'kg',
        reason: 'usage',
        notes: 'Untuk minuman',
        date: '2024-12-19 11:45',
        performedBy: 'Sari Dewi'
    }
];

const initialCategories = ['all', 'Main Course', 'Beverage', 'Dessert', 'Appetizer'];

type TabType = 'sessions' | 'tables' | 'reservations' | 'transactions' | 'stock-transactions' | 'staff' | 'menu' | 'stock';
type CategoryType = 'realtime' | 'master';

export default function AdminDashboard() {
    const [activeCategory, setActiveCategory] = useState<CategoryType>('realtime');
    const [activeTab, setActiveTab] = useState<TabType>('sessions');
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [newItem, setNewItem] = useState({});
    
    const [selectedCategory, setSelectedCategory] = useState<'all' | string>('all');
    const [menuCategories, setMenuCategories] = useState<string[]>(initialCategories);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [showCategoryManager, setShowCategoryManager] = useState(false);

    // Tab categories configuration
    const tabCategories = {
        realtime: {
            label: 'Real-time Operations',
            description: 'Live monitoring & frequent updates',
            icon: Activity,
            tabs: [
                { key: 'transactions' as const, label: 'Payment Transactions', icon: CreditCard, description: 'Payment records' },
                { key: 'stock-transactions' as const, label: 'Stock Transactions', icon: BarChart3, description: 'Inventory changes' },
                { key: 'sessions' as const, label: 'Guest Sessions', icon: Clock, description: 'Active dining sessions' },
            ]
        },
        master: {
            label: 'Master Data',
            description: 'Configuration & settings',
            icon: Database,
            tabs: [
                { key: 'stock' as const, label: 'Inventory', icon: Package, description: 'Stock levels & supplies' },
                { key: 'reservations' as const, label: 'Reservations', icon: BookOpen, description: 'Upcoming bookings' },
                { key: 'tables' as const, label: 'Table Management', icon: Table, description: 'Real-time table availability' },
                { key: 'menu' as const, label: 'Menu Management', icon: Utensils, description: 'Food & beverage catalog' },
                { key: 'staff' as const, label: 'Staff Management', icon: Users, description: 'Employee records' },
            ]
        }
    };

    const getFilteredData = () => {
        const term = searchTerm.toLowerCase();
        switch (activeTab) {
            case 'staff':
                return sampleStaff.filter(staff =>
                    staff.name.toLowerCase().includes(term) ||
                    staff.email.toLowerCase().includes(term) ||
                    staff.position.toLowerCase().includes(term)
                );
            case 'sessions':
                return sampleGuestSessions.filter(session =>
                    session.customerName.toLowerCase().includes(term) ||
                    session.tableNumber.toLowerCase().includes(term)
                );
            case 'tables':
                return sampleTables.filter(table =>
                    table.number.toLowerCase().includes(term) ||
                    table.location.toLowerCase().includes(term)
                );
            case 'menu':
                let filteredMenu = sampleMenu.filter(item =>
                    item.name.toLowerCase().includes(term) ||
                    item.category.toLowerCase().includes(term)
                );
                
                if (selectedCategory !== 'all') {
                    filteredMenu = filteredMenu.filter(item => item.category === selectedCategory);
                }
                
                return filteredMenu;
            case 'stock':
                return sampleStock.filter(item =>
                    item.name.toLowerCase().includes(term) ||
                    item.category.toLowerCase().includes(term)
                );
            case 'transactions':
                return sampleTransactions.filter(transaction =>
                    transaction.customerName.toLowerCase().includes(term) ||
                    transaction.orderId.toLowerCase().includes(term)
                );
            case 'reservations':
                return sampleReservations.filter(reservation =>
                    reservation.customerName.toLowerCase().includes(term) ||
                    reservation.tableNumber.toLowerCase().includes(term)
                );
            case 'stock-transactions':
                return sampleStockTransactions.filter(transaction =>
                    transaction.itemName.toLowerCase().includes(term) ||
                    transaction.reason.toLowerCase().includes(term) ||
                    transaction.performedBy.toLowerCase().includes(term) ||
                    transaction.type.toLowerCase().includes(term)
                );
            default:
                return [];
        }
    };

    const filteredData = getFilteredData();

    const handleAddItem = () => {
        console.log('Adding item:', newItem);
        setShowAddModal(false);
        setNewItem({});
    };

    const handleEditItem = () => {
        console.log('Editing item:', selectedItem);
        setShowEditModal(false);
        setSelectedItem(null);
    };

    const handleDeleteItem = (item: any) => {
        if (confirm(`Are you sure you want to delete this ${activeTab.slice(0, -1)}?`)) {
            console.log('Deleting item:', item);
        }
    };

    const openEditModal = (item: any) => {
        setSelectedItem(item);
        setShowEditModal(true);
    };

    const handleAddCategory = () => {
        if (newCategoryName.trim() && !menuCategories.includes(newCategoryName.trim())) {
            setMenuCategories([...menuCategories, newCategoryName.trim()]);
            setNewCategoryName('');
        }
    };

    const handleDeleteCategory = (category: string) => {
        if (category !== 'all') {
            setMenuCategories(menuCategories.filter(cat => cat !== category));
            if (selectedCategory === category) {
                setSelectedCategory('all');
            }
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const formatDateTime = (dateTimeString: string) => {
        return new Date(dateTimeString).toLocaleString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const getStatusColor = (status: string, type: string = 'default') => {
        const colors: any = {
            active: 'bg-green-100 text-green-800',
            inactive: 'bg-gray-100 text-gray-800',
            available: 'bg-green-100 text-green-800',
            occupied: 'bg-red-100 text-red-800',
            reserved: 'bg-yellow-100 text-yellow-800',
            maintenance: 'bg-gray-100 text-gray-800',
            'out-of-stock': 'bg-red-100 text-red-800',
            adequate: 'bg-green-100 text-green-800',
            low: 'bg-yellow-100 text-yellow-800',
            out_of_stock: 'bg-red-100 text-red-800',
            completed: 'bg-green-100 text-green-800',
            pending: 'bg-yellow-100 text-yellow-800',
            failed: 'bg-red-100 text-red-800',
            confirmed: 'bg-green-100 text-green-800',
            cancelled: 'bg-red-100 text-red-800',
            purchase: 'bg-blue-100 text-blue-800',
            usage: 'bg-orange-100 text-orange-800',
            adjustment: 'bg-purple-100 text-purple-800',
            waste: 'bg-red-100 text-red-800',
            transfer: 'bg-yellow-100 text-yellow-800',
            in: 'bg-green-100 text-green-800',
            out: 'bg-red-100 text-red-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const getAddButtonText = () => {
        switch (activeTab) {
            case 'staff': return 'Add Staff';
            case 'tables': return 'Add Table';
            case 'menu': return 'Add Menu';
            case 'stock': return 'Add Stock';
            case 'reservations': return 'Add Reservation';
            default: return 'Add New';
        }
    };

    const showAddButton = ['staff', 'menu', 'stock', 'tables'].includes(activeTab);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
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
                            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                            <p className="text-sm text-gray-600">Manage restaurant operations</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="font-semibold text-gray-900">Admin User</p>
                            <p className="text-sm text-gray-600">Super Administrator</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Active Sessions</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {sampleGuestSessions.filter(s => s.status === 'active').length}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">Live now</p>
                            </div>
                            <div className="p-3 bg-[#c17f54]/10 rounded-lg">
                                <Activity className="w-6 h-6 text-[#c17f54]" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Available Tables</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {sampleTables.filter(t => t.status === 'available').length}/{sampleTables.length}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">Ready to seat</p>
                            </div>
                            <div className="p-3 bg-[#c17f54]/10 rounded-lg">
                                <Table className="w-6 h-6 text-[#c17f54]" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Today's Revenue</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    Rp {(sampleTransactions.reduce((acc, t) => acc + t.amount, 0) / 1000).toFixed(0)}K
                                </p>
                                <p className="text-xs text-green-600 mt-1">+12% from yesterday</p>
                            </div>
                            <div className="p-3 bg-[#c17f54]/10 rounded-lg">
                                <TrendingUp className="w-6 h-6 text-[#c17f54]" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Low Stock Alert</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {sampleStock.filter(s => s.status === 'low' || s.status === 'out-of-stock').length}
                                </p>
                                <p className="text-xs text-red-600 mt-1">Needs attention</p>
                            </div>
                            <div className="p-3 bg-[#c17f54]/10 rounded-lg">
                                <Package className="w-6 h-6 text-[#c17f54]" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Category Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {Object.entries(tabCategories).map(([key, category]) => {
                        const IconComponent = category.icon;
                        const isActive = activeCategory === key;
                        
                        return (
                            <button
                                key={key}
                                onClick={() => {
                                    setActiveCategory(key as CategoryType);
                                    setActiveTab(category.tabs[0].key);
                                    setSearchTerm('');
                                }}
                                className={`p-6 rounded-xl border-2 transition-all text-left ${
                                    isActive 
                                        ? 'bg-[#c17f54] text-white border-[#c17f54] shadow-lg'
                                        : 'bg-white text-gray-700 border-gray-200 hover:border-[#c17f54] hover:shadow-md'
                                }`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`p-3 rounded-lg ${
                                        isActive 
                                            ? 'bg-white/20' 
                                            : 'bg-[#c17f54]/10'
                                    }`}>
                                        <IconComponent className={`w-6 h-6 ${
                                            isActive 
                                                ? 'text-white' 
                                                : 'text-[#c17f54]'
                                        }`} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-lg mb-1">{category.label}</h3>
                                        <p className={`text-sm ${isActive ? 'text-white/90' : 'text-gray-600'}`}>
                                            {category.description}
                                        </p>
                                        <div className="flex items-center gap-2 mt-3 flex-wrap">
                                            {category.tabs.map(tab => (
                                                <span 
                                                    key={tab.key}
                                                    className={`text-xs px-2 py-1 rounded ${
                                                        isActive 
                                                            ? 'bg-white/20 text-white' 
                                                            : 'bg-gray-100 text-gray-600'
                                                    }`}
                                                >
                                                    {tab.label}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Main Content Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    {/* Tabs Navigation */}
                    <div className="border-b border-gray-200">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">
                                    {tabCategories[activeCategory].label}
                                </h2>
                                <p className="text-sm text-gray-600">
                                    {tabCategories[activeCategory].tabs.find(t => t.key === activeTab)?.description}
                                </p>
                            </div>
                        </div>
                        <nav className="flex overflow-x-auto">
                            {tabCategories[activeCategory].tabs.map((tab) => {
                                const IconComponent = tab.icon;
                                return (
                                    <button
                                        key={tab.key}
                                        onClick={() => {
                                            setActiveTab(tab.key);
                                            setSearchTerm('');
                                            if (tab.key !== 'menu') {
                                                setSelectedCategory('all');
                                            }
                                        }}
                                        className={`flex items-center gap-2 py-4 px-6 text-center font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                                            activeTab === tab.key
                                                ? 'border-[#c17f54] text-[#c17f54] bg-[#c17f54]/5'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                        }`}
                                    >
                                        <IconComponent className="w-4 h-4" />
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                        {/* Search Bar and Actions */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex-1 relative">
                                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                <input
                                    type="text"
                                    placeholder={`Search ${activeTab}...`}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c17f54] focus:border-[#c17f54] text-gray-900"
                                />
                            </div>
                            {showAddButton && (
                                <button
                                    onClick={() => setShowAddModal(true)}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg transition-colors text-white bg-[#c17f54] hover:bg-[#b57049]"
                                >
                                    <Plus className="w-4 h-4" />
                                    {getAddButtonText()}
                                </button>
                            )}
                            <button className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                                <Filter className="w-4 h-4" />
                                Filter
                            </button>
                        </div>

                        {/* Render Tab Content */}
                        {renderTabContent(
                            activeTab,
                            filteredData,
                            openEditModal,
                            handleDeleteItem,
                            getStatusColor,
                            formatCurrency,
                            formatDateTime,
                            selectedCategory,
                            setSelectedCategory,
                            menuCategories,
                            setShowCategoryManager
                        )}
                    </div>
                </div>
            </div>

            {/* Category Manager Modal */}
            {showCategoryManager && (
                <div 
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                    onClick={() => setShowCategoryManager(false)}
                >
                    <div 
                        className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">Manage Categories</h3>
                            <button
                                onClick={() => setShowCategoryManager(false)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                            <div className="space-y-2">
                                {menuCategories.filter(cat => cat !== 'all').map((category) => (
                                    <div key={category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <span className="font-medium text-gray-900">{category}</span>
                                        <div className="flex items-center gap-2">
                                            <button 
                                                onClick={() => handleDeleteCategory(category)}
                                                className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-2 pt-4 border-t border-gray-200">
                                <input
                                    type="text"
                                    placeholder="New category name"
                                    value={newCategoryName}
                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c17f54] focus:border-[#c17f54]"
                                />
                                <button 
                                    onClick={handleAddCategory}
                                    className="px-4 py-2 bg-[#c17f54] text-white rounded-lg hover:bg-[#b57049] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={!newCategoryName.trim()}
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Helper function to render tab content
function renderTabContent(
    activeTab: string,
    data: any[],
    onEdit: (item: any) => void,
    onDelete: (item: any) => void,
    getStatusColor: (status: string, type?: string) => string,
    formatCurrency: (amount: number) => string,
    formatDateTime: (dateTime: string) => string,
    selectedCategory?: string,
    setSelectedCategory?: (category: string) => void,
    menuCategories?: string[],
    setShowCategoryManager?: (show: boolean) => void
) {
    if (data.length === 0) {
        return (
            <div className="text-center py-16">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-600 font-medium">No data found</p>
                <p className="text-sm text-gray-500 mt-1">Try adjusting your search or filters</p>
            </div>
        );
    }

    switch (activeTab) {
        case 'sessions':
            return (
                <div className="space-y-3">
                    {data.map((session: any) => (
                        <div key={session.id} className="bg-gradient-to-r from-gray-50 to-white rounded-lg p-5 border border-gray-200 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={`w-3 h-3 rounded-full ${session.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-lg">{session.customerName}</h4>
                                        <div className="flex items-center gap-3 mt-1">
                                            <span className="text-sm text-gray-600 flex items-center gap-1">
                                                <Table className="w-4 h-4" />
                                                {session.tableNumber}
                                            </span>
                                            <span className="text-sm text-gray-600 flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                {session.duration}
                                            </span>
                                            <span className="text-sm text-gray-600">
                                                {session.orderCount} orders
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-xl text-gray-900">{formatCurrency(session.totalSpent)}</p>
                                    <p className="text-xs text-gray-500 mt-1">{formatDateTime(session.startTime)}</p>
                                    <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                                        {session.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            );

        case 'tables':
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.map((table: any) => (
                        <div key={table.id} className="bg-white rounded-lg p-5 border-2 border-gray-200 hover:shadow-lg transition-all">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h4 className="font-bold text-lg text-gray-900">{table.number}</h4>
                                    <p className="text-sm text-gray-600">{table.location}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(table.status)}`}>
                                    {table.status}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                                <Users className="w-4 h-4" />
                                <span>{table.capacity} seats</span>
                            </div>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => onEdit(table)} 
                                    className="flex-1 py-2 text-[#c17f54] bg-[#c17f54]/10 rounded-lg hover:bg-[#c17f54]/20 transition-colors text-sm font-medium"
                                >
                                    Edit
                                </button>
                                <button 
                                    onClick={() => onDelete(table)} 
                                    className="flex-1 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            );

        case 'reservations':
            return (
                <div className="overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200 bg-gray-50">
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Customer</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Table</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date & Time</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Guests</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {data.map((reservation: any) => (
                                <tr key={reservation.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-4">
                                        <div>
                                            <p className="font-medium text-gray-900">{reservation.customerName}</p>
                                            <p className="text-sm text-gray-600">{reservation.phone}</p>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className="text-sm font-medium text-gray-900">{reservation.tableNumber}</span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{formatDateTime(reservation.date + ' ' + reservation.time)}</p>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className="text-sm text-gray-900">{reservation.guests} people</span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(reservation.status)}`}>
                                            {reservation.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button onClick={() => onEdit(reservation)} className="p-2 text-[#c17f54] hover:bg-[#c17f54]/10 rounded-lg transition-colors">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );

        case 'transactions':
            return (
                <div className="overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200 bg-gray-50">
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Transaction</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Customer</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Amount</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Payment</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {data.map((transaction: any) => (
                                <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-4">
                                        <p className="font-medium text-gray-900">{transaction.id}</p>
                                        <p className="text-sm text-gray-600">{transaction.orderId}</p>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className="text-sm text-gray-900">{transaction.customerName}</span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className="text-sm font-bold text-gray-900">{formatCurrency(transaction.amount)}</span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className="text-sm text-gray-600">{transaction.paymentMethod}</span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                                            {transaction.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-sm text-gray-600">
                                        {formatDateTime(transaction.date)}
                                    </td>
                                    <td className="py-4 px-4 text-right">
                                        <button className="p-2 text-[#c17f54] hover:bg-[#c17f54]/10 rounded-lg transition-colors">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );

        case 'stock-transactions':
            return (
                <div className="overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200 bg-gray-50">
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Item</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Type</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Quantity</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Reason</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">By</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {data.map((transaction: any) => (
                                <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-4">
                                        <div>
                                            <p className="font-medium text-gray-900">{transaction.itemName}</p>
                                            <p className="text-xs text-gray-500">{transaction.id}</p>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transaction.type)}`}>
                                            {transaction.type.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className={`flex items-center gap-1 font-semibold ${transaction.type === 'in' ? 'text-green-600' : 'text-red-600'}`}>
                                            {transaction.type === 'in' ? '+' : '-'}
                                            {transaction.quantity} {transaction.unit}
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transaction.reason)}`}>
                                            {transaction.reason}
                                        </span>
                                        {transaction.notes && (
                                            <p className="text-xs text-gray-500 mt-1">{transaction.notes}</p>
                                        )}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-gray-600">
                                        {formatDateTime(transaction.date)}
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className="text-sm text-gray-900">{transaction.performedBy}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );

        case 'staff':
            return (
                <div className="overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200 bg-gray-50">
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Staff Member</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Position</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Join Date</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Last Login</th>
                                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {data.map((staff: any) => (
                                <tr key={staff.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-4">
                                        <div>
                                            <p className="font-medium text-gray-900">{staff.name}</p>
                                            <p className="text-sm text-gray-600">{staff.email}</p>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className="text-sm font-medium text-gray-900">{staff.position}</span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(staff.status)}`}>
                                            {staff.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-sm text-gray-600">
                                        {formatDateTime(staff.joinDate)}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-gray-600">
                                        {formatDateTime(staff.lastLogin)}
                                    </td>
                                    <td className="py-4 px-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button onClick={() => onEdit(staff)} className="p-2 text-[#c17f54] hover:bg-[#c17f54]/10 rounded-lg transition-colors">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => onDelete(staff)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );

        case 'menu':
            return (
                <div className="space-y-4">
                    {/* Category Filter */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2">
                        {menuCategories?.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory?.(category)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                                    selectedCategory === category
                                        ? 'bg-[#c17f54] text-white shadow-md'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {category === 'all' ? 'All Categories' : category}
                            </button>
                        ))}
                        <button
                            onClick={() => setShowCategoryManager?.(true)}
                            className="flex items-center gap-2 px-4 py-2 text-[#c17f54] bg-[#c17f54]/10 rounded-lg hover:bg-[#c17f54]/20 transition-colors whitespace-nowrap"
                        >
                            <Plus className="w-4 h-4" />
                            Manage
                        </button>
                    </div>

                    {/* Menu Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {data.map((item: any) => (
                            <div key={item.id} className="bg-white rounded-lg border-2 border-gray-200 hover:shadow-lg transition-all overflow-hidden">
                                <div className="aspect-video bg-gradient-to-br from-[#c17f54]/10 to-[#c17f54]/20 flex items-center justify-center">
                                    <Utensils className="w-12 h-12 text-[#c17f54]" />
                                </div>
                                <div className="p-4">
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex-1">
                                            <h4 className="font-bold text-gray-900">{item.name}</h4>
                                            <p className="text-xs text-gray-600 mt-1">{item.ingredients.join(', ')}</p>
                                        </div>
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(item.status)}`}>
                                            {item.status === 'out-of-stock' ? 'Out' : 'Available'}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between mt-3">
                                        <div>
                                            <span className="text-lg font-bold text-gray-900">{formatCurrency(item.price)}</span>
                                            <span className={`ml-2 text-xs px-2 py-1 rounded-full bg-[#c17f54]/10 text-[#c17f54]`}>
                                                {item.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mt-3 pt-3 border-t border-gray-200">
                                        <button 
                                            onClick={() => onEdit(item)} 
                                            className="flex-1 py-2 text-[#c17f54] bg-[#c17f54]/10 rounded-lg hover:bg-[#c17f54]/20 transition-colors text-sm font-medium"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => onDelete(item)} 
                                            className="flex-1 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );

        case 'stock':
            return (
                <div className="overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200 bg-gray-50">
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Item Name</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Category</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Current Stock</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Min Stock</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {data.map((item: any) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-4">
                                        <p className="font-medium text-gray-900">{item.name}</p>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className="text-sm text-gray-900">{item.category}</span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className="text-sm font-bold text-gray-900">
                                            {item.currentStock} {item.unit}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className="text-sm text-gray-600">{item.minStock} {item.unit}</span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                                            {item.status.replace('-', ' ')}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button onClick={() => onEdit(item)} className="p-2 text-[#c17f54] hover:bg-[#c17f54]/10 rounded-lg transition-colors">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => onDelete(item)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );

        default:
            return null;
    }
}