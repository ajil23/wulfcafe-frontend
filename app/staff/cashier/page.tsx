// app/cashier/page.tsx
'use client';

import { useState } from 'react';
import { ArrowLeft, User, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import TableSelector from '../../components/TableSelector';
import MenuSelector from '../../components/MenuSelector';
import PaymentMethod from '../../components/PaymentMethod';

// Sample data
const sampleTables = [
    {
        id: 'TBL-001',
        number: 'Table 1',
        capacity: 4,
        status: 'available' as const,
        location: 'Main Hall'
    },
    {
        id: 'TBL-002',
        number: 'Table 2',
        capacity: 2,
        status: 'available' as const,
        location: 'Main Hall'
    },
    {
        id: 'TBL-003',
        number: 'Table 3',
        capacity: 6,
        status: 'available' as const,
        location: 'Garden'
    },
    {
        id: 'TBL-004',
        number: 'VIP Room',
        capacity: 10,
        status: 'available' as const,
        location: 'Private'
    }
];

const sampleMenu = [
    {
        id: 'MENU-001',
        name: 'Nasi Goreng Spesial',
        category: 'Main Course',
        price: 25000,
        status: 'available' as const,
        ingredients: ['Nasi', 'Ayam', 'Telur', 'Sayuran']
    },
    {
        id: 'MENU-002',
        name: 'Mie Ayam Bakso',
        category: 'Main Course',
        price: 20000,
        status: 'available' as const,
        ingredients: ['Mie', 'Ayam', 'Bakso', 'Sawi']
    },
    {
        id: 'MENU-003',
        name: 'Es Teh Manis',
        category: 'Beverage',
        price: 8000,
        status: 'available' as const,
        ingredients: ['Teh', 'Gula', 'Es']
    },
    {
        id: 'MENU-004',
        name: 'Capcay Kuah',
        category: 'Main Course',
        price: 18000,
        status: 'available' as const,
        ingredients: ['Sayuran', 'Udang', 'Ayam', 'Jamur']
    },
    {
        id: 'MENU-005',
        name: 'Jus Alpukat',
        category: 'Beverage',
        price: 15000,
        status: 'available' as const,
        ingredients: ['Alpukat', 'Susu', 'Es', 'Gula']
    }
];

interface CartItem {
    menuItem: any;
    quantity: number;
    notes?: string;
}

export default function CashierPage() {
    const [currentStep, setCurrentStep] = useState<'tables' | 'menu' | 'customer' | 'payment'>('tables');
    const [selectedTables, setSelectedTables] = useState<any[]>([]);
    const [customerName, setCustomerName] = useState('');
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [paymentMethod, setPaymentMethod] = useState('');

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const getTotalAmount = () => {
        return cartItems.reduce((total, item) => total + (item.menuItem.price * item.quantity), 0);
    };

    const handleConfirmOrder = () => {
        // Simulate order confirmation
        const orderData = {
            tables: selectedTables,
            customerName: customerName || 'Walk-in Customer',
            items: cartItems,
            paymentMethod,
            total: getTotalAmount(),
            orderId: `WLF-${Date.now()}`
        };
        
        console.log('Order confirmed:', orderData);
        
        alert(`Order confirmed successfully!\nOrder ID: ${orderData.orderId}\nTotal: ${formatCurrency(orderData.total)}`);
        
        // Reset form
        setSelectedTables([]);
        setCustomerName('');
        setCartItems([]);
        setPaymentMethod('');
        setCurrentStep('tables');
    };

    const canProceedToMenu = selectedTables.length > 0;
    const canProceedToCustomer = cartItems.length > 0;
    const canProceedToPayment = customerName.trim().length > 0 || cartItems.length > 0;
    const canConfirmOrder = paymentMethod && cartItems.length > 0;

    return (
        <div className="min-h-screen bg-gray-50">
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
                            <h1 className="text-2xl font-bold text-gray-900">Cashier</h1>
                            <p className="text-sm text-gray-600">Process new orders</p>
                        </div>
                    </div>
                    
                    {/* Progress Steps */}
                    <div className="flex items-center gap-4">
                        {[
                            { key: 'tables', label: 'Tables' },
                            { key: 'menu', label: 'Menu' },
                            { key: 'customer', label: 'Customer' },
                            { key: 'payment', label: 'Payment' }
                        ].map((step, index) => (
                            <div key={step.key} className="flex items-center gap-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                    currentStep === step.key
                                        ? 'bg-orange-500 text-white'
                                        : index < ['tables', 'menu', 'customer', 'payment'].indexOf(currentStep)
                                        ? 'bg-green-500 text-white'
                                        : 'bg-gray-200 text-gray-600'
                                }`}>
                                    {index < ['tables', 'menu', 'customer', 'payment'].indexOf(currentStep) ? (
                                        <CheckCircle className="w-4 h-4" />
                                    ) : (
                                        index + 1
                                    )}
                                </div>
                                <span className={`text-sm font-medium ${
                                    currentStep === step.key ? 'text-orange-600' : 'text-gray-600'
                                }`}>
                                    {step.label}
                                </span>
                                {index < 3 && <div className="w-8 h-0.5 bg-gray-300 mx-2" />}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-8">
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="xl:col-span-2 space-y-6">
                        {currentStep === 'tables' && (
                            <TableSelector
                                tables={sampleTables}
                                selectedTables={selectedTables}
                                onTableSelect={setSelectedTables}
                                maxSelection={4}
                                title="Select Tables for Dine-in"
                            />
                        )}

                        {currentStep === 'menu' && (
                            <MenuSelector
                                menuItems={sampleMenu}
                                cartItems={cartItems}
                                onCartUpdate={setCartItems}
                            />
                        )}

                        {currentStep === 'customer' && (
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Customer Information</h3>
                                
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Customer Name (Optional)
                                        </label>
                                        <input
                                            type="text"
                                            value={customerName}
                                            onChange={(e) => setCustomerName(e.target.value)}
                                            placeholder="Enter customer name or leave blank for walk-in customer"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg text-black"
                                        />
                                        <p className="text-sm text-gray-500 mt-1">
                                            If left blank, will be recorded as "Walk-in Customer"
                                        </p>
                                    </div>

                                    {/* Order Preview */}
                                    {cartItems.length > 0 && (
                                        <div className="border-t border-gray-200 pt-4">
                                            <h4 className="font-bold text-gray-900 mb-3">Order Preview</h4>
                                            <div className="space-y-2">
                                                {cartItems.map((item) => (
                                                    <div key={item.menuItem.id} className="flex justify-between items-center text-sm">
                                                        <div>
                                                            <span className="font-medium text-gray-500">{item.menuItem.name}</span>
                                                            <span className="text-gray-800 ml-2">x{item.quantity}</span>
                                                        </div>
                                                        <span className="font-semibold text-gray-900">
                                                            {formatCurrency(item.menuItem.price * item.quantity)}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="border-t border-gray-200 mt-3 pt-3">
                                                <div className="flex justify-between items-center font-bold">
                                                    <span className="text-black">Total:</span>
                                                    <span className="text-orange-600">{formatCurrency(getTotalAmount())}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Tables Info */}
                                    {selectedTables.length > 0 && (
                                        <div className="border-t border-gray-200 pt-4">
                                            <h4 className="font-bold text-gray-900 mb-2">Selected Tables</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedTables.map((table) => (
                                                    <span
                                                        key={table.id}
                                                        className="bg-orange-100 text-orange-800 px-3 py-2 rounded-lg font-medium"
                                                    >
                                                        {table.number}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {currentStep === 'payment' && (
                            <PaymentMethod
                                selectedMethod={paymentMethod}
                                onMethodSelect={setPaymentMethod}
                            />
                        )}
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="space-y-6">
                        {/* Order Summary */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 sticky top-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
                            
                            {/* Customer Info */}
                            {customerName && (
                                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                                    <div className="flex items-center gap-2 text-blue-800">
                                        <User className="w-4 h-4" />
                                        <span className="font-medium">{customerName}</span>
                                    </div>
                                </div>
                            )}

                            {/* Tables Info */}
                            {selectedTables.length > 0 && (
                                <div className="mb-4">
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Tables:</h4>
                                    <div className="flex flex-wrap gap-1">
                                        {selectedTables.map((table) => (
                                            <span
                                                key={table.id}
                                                className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm"
                                            >
                                                {table.number}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Items List */}
                            {cartItems.length > 0 ? (
                                <>
                                    <div className="space-y-3 max-h-64 overflow-y-auto">
                                        {cartItems.map((item) => (
                                            <div key={item.menuItem.id} className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    <p className="font-medium text-gray-900 text-sm">
                                                        {item.menuItem.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {item.quantity} x {formatCurrency(item.menuItem.price)}
                                                    </p>
                                                    {item.notes && (
                                                        <p className="text-xs text-gray-400">Note: {item.notes}</p>
                                                    )}
                                                </div>
                                                <span className="font-semibold text-gray-900 text-sm">
                                                    {formatCurrency(item.menuItem.price * item.quantity)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <div className="border-t border-gray-200 mt-4 pt-4">
                                        <div className="flex justify-between items-center text-lg font-bold">
                                            <span className="text-black">Total:</span>
                                            <span className="text-orange-600">{formatCurrency(getTotalAmount())}</span>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <p className="text-gray-500 text-center py-4">No items added yet</p>
                            )}

                            {/* Navigation Buttons */}
                            <div className="space-y-3 mt-6">
                                {currentStep === 'tables' && (
                                    <button
                                        onClick={() => setCurrentStep('menu')}
                                        disabled={!canProceedToMenu}
                                        className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Continue to Menu Selection
                                    </button>
                                )}

                                {currentStep === 'menu' && (
                                    <>
                                        <button
                                            onClick={() => setCurrentStep('tables')}
                                            className="w-full bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors font-medium mb-2"
                                        >
                                            Back to Tables
                                        </button>
                                        <button
                                            onClick={() => setCurrentStep('customer')}
                                            disabled={!canProceedToCustomer}
                                            className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Continue to Customer Info
                                        </button>
                                    </>
                                )}

                                {currentStep === 'customer' && (
                                    <>
                                        <button
                                            onClick={() => setCurrentStep('menu')}
                                            className="w-full bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors font-medium mb-2"
                                        >
                                            Back to Menu
                                        </button>
                                        <button
                                            onClick={() => setCurrentStep('payment')}
                                            disabled={!canProceedToPayment}
                                            className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Continue to Payment
                                        </button>
                                    </>
                                )}

                                {currentStep === 'payment' && (
                                    <>
                                        <button
                                            onClick={() => setCurrentStep('customer')}
                                            className="w-full bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors font-medium mb-2"
                                        >
                                            Back to Customer
                                        </button>
                                        <button
                                            onClick={handleConfirmOrder}
                                            disabled={!canConfirmOrder}
                                            className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Confirm Order
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}