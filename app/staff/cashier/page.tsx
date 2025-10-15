// app/cashier/page.tsx
'use client';

import { useState } from 'react';
import { ArrowLeft, User, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import TableSelector from '../../components/TableSelector';
import MenuSelector from '../../components/MenuSelector';
import PaymentMethod from '../../components/PaymentMethod';

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

    // Calculate current step index for progress
    const stepIndex = ['tables', 'menu', 'customer', 'payment'].indexOf(currentStep);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Cashier</h1>
                            <p className="text-xs sm:text-sm text-gray-600">Process new orders</p>
                        </div>
                    </div>
                    
                    {/* Progress Steps - Responsive */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                        {/* Mobile Progress Bar */}
                        <div className="w-full sm:hidden">
                            <div className="flex justify-between text-xs text-gray-600 mb-2">
                                <span>Step {stepIndex + 1} of 4</span>
                                <span className="font-medium">
                                    {currentStep === 'tables' && 'Selecting Tables'}
                                    {currentStep === 'menu' && 'Choosing Menu'}
                                    {currentStep === 'customer' && 'Customer Details'}
                                    {currentStep === 'payment' && 'Payment'}
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                    className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                                    style={{ 
                                        width: `${((stepIndex + 1) / 4) * 100}%` 
                                    }}
                                />
                            </div>
                        </div>

                        {/* Desktop Progress Steps */}
                        <div className="hidden sm:flex items-center gap-2 md:gap-4">
                            {[
                                { key: 'tables', label: 'Tables', shortLabel: 'Tbl' },
                                { key: 'menu', label: 'Menu', shortLabel: 'Menu' },
                                { key: 'customer', label: 'Customer', shortLabel: 'Cust' },
                                { key: 'payment', label: 'Payment', shortLabel: 'Pay' }
                            ].map((step, index) => {
                                const isCompleted = index < stepIndex;
                                const isCurrent = currentStep === step.key;
                                
                                return (
                                    <div key={step.key} className="flex items-center gap-2">
                                        <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-medium transition-all ${
                                            isCurrent
                                                ? 'bg-orange-500 text-white scale-110'
                                                : isCompleted
                                                ? 'bg-green-500 text-white'
                                                : 'bg-gray-200 text-gray-600'
                                        }`}>
                                            {isCompleted ? (
                                                <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />
                                            ) : (
                                                index + 1
                                            )}
                                        </div>
                                        <span className={`text-xs md:text-sm font-medium hidden lg:block ${
                                            isCurrent ? 'text-orange-600' : 'text-gray-600'
                                        }`}>
                                            {step.label}
                                        </span>
                                        <span className={`text-xs md:text-sm font-medium lg:hidden ${
                                            isCurrent ? 'text-orange-600' : 'text-gray-600'
                                        }`}>
                                            {step.shortLabel}
                                        </span>
                                        {index < 3 && (
                                            <div className={`w-4 md:w-6 lg:w-8 h-0.5 mx-1 md:mx-2 ${
                                                index < stepIndex ? 'bg-green-500' : 'bg-gray-300'
                                            }`} />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 py-6 md:py-8">
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
                    {/* Main Content */}
                    <div className="xl:col-span-2 space-y-6">
                        {currentStep === 'tables' && (
                            <TableSelector
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
                            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200">
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Customer Information</h3>
                                
                                <div className="space-y-4 sm:space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Customer Name (Optional)
                                        </label>
                                        <input
                                            type="text"
                                            value={customerName}
                                            onChange={(e) => setCustomerName(e.target.value)}
                                            placeholder="Enter customer name or leave blank for walk-in customer"
                                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-base sm:text-lg text-black"
                                        />
                                        <p className="text-xs sm:text-sm text-gray-500 mt-1">
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
                                                        className="bg-orange-100 text-orange-800 px-2 sm:px-3 py-1 sm:py-2 rounded-lg font-medium text-sm"
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
                        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200 sticky top-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
                            
                            {/* Customer Info */}
                            {customerName && (
                                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                                    <div className="flex items-center gap-2 text-blue-800">
                                        <User className="w-4 h-4" />
                                        <span className="font-medium text-sm">{customerName}</span>
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
                                                className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs sm:text-sm"
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
                                        <div className="flex justify-between items-center text-base sm:text-lg font-bold">
                                            <span className="text-black">Total:</span>
                                            <span className="text-orange-600">{formatCurrency(getTotalAmount())}</span>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <p className="text-gray-500 text-center py-4 text-sm">No items added yet</p>
                            )}

                            {/* Navigation Buttons */}
                            <div className="space-y-3 mt-6">
                                {currentStep === 'tables' && (
                                    <button
                                        onClick={() => setCurrentStep('menu')}
                                        disabled={!canProceedToMenu}
                                        className="w-full bg-orange-500 text-white py-2 sm:py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                                    >
                                        Continue to Menu Selection
                                    </button>
                                )}

                                {currentStep === 'menu' && (
                                    <>
                                        <button
                                            onClick={() => setCurrentStep('tables')}
                                            className="w-full bg-gray-500 text-white py-2 sm:py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors font-medium mb-2 text-sm sm:text-base"
                                        >
                                            Back to Tables
                                        </button>
                                        <button
                                            onClick={() => setCurrentStep('customer')}
                                            disabled={!canProceedToCustomer}
                                            className="w-full bg-orange-500 text-white py-2 sm:py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                                        >
                                            Continue to Customer Info
                                        </button>
                                    </>
                                )}

                                {currentStep === 'customer' && (
                                    <>
                                        <button
                                            onClick={() => setCurrentStep('menu')}
                                            className="w-full bg-gray-500 text-white py-2 sm:py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors font-medium mb-2 text-sm sm:text-base"
                                        >
                                            Back to Menu
                                        </button>
                                        <button
                                            onClick={() => setCurrentStep('payment')}
                                            disabled={!canProceedToPayment}
                                            className="w-full bg-orange-500 text-white py-2 sm:py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                                        >
                                            Continue to Payment
                                        </button>
                                    </>
                                )}

                                {currentStep === 'payment' && (
                                    <>
                                        <button
                                            onClick={() => setCurrentStep('customer')}
                                            className="w-full bg-gray-500 text-white py-2 sm:py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors font-medium mb-2 text-sm sm:text-base"
                                        >
                                            Back to Customer
                                        </button>
                                        <button
                                            onClick={handleConfirmOrder}
                                            disabled={!canConfirmOrder}
                                            className="w-full bg-green-500 text-white py-2 sm:py-3 px-4 rounded-lg hover:bg-green-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
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