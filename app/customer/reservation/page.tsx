// app/customer/reservation/page.tsx
'use client';

import { useState } from 'react';
import { Calendar, Users, MapPin, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import DateSelector from '../../components/DateSelector';
import RestaurantTableSelector from '../../components/TableSelector';
import MenuSelector from '../../components/MenuSelector';

interface ReservationData {
    date: Date | null;
    timeSlot: string;
    partySize: number;
    selectedTables: any[];
    cartItems: any[];
    customerInfo: {
        name: string;
        phone: string;
        number: string;
        specialRequests: string;
    };
}

export default function ReservationPage() {
    const [currentStep, setCurrentStep] = useState<'date' | 'tables' | 'menu' | 'review'>('date');
    const [reservationData, setReservationData] = useState<ReservationData>({
        date: null,
        timeSlot: '',
        partySize: 2,
        selectedTables: [],
        cartItems: [],
        customerInfo: {
            name: '',
            phone: '',
            number: '',
            specialRequests: ''
        }
    });

    // Sample data - bisa diambil dari API
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
    ];

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const handleDateSelect = (date: Date, timeSlot: string) => {
        setReservationData(prev => ({
            ...prev,
            date,
            timeSlot
        }));
    };

    const handleTableSelect = (tables: any[]) => {
        setReservationData(prev => ({
            ...prev,
            selectedTables: tables
        }));
    };

    const handleMenuUpdate = (cartItems: any[]) => {
        setReservationData(prev => ({
            ...prev,
            cartItems
        }));
    };

    const handleCustomerInfoUpdate = (field: string, value: string) => {
        setReservationData(prev => ({
            ...prev,
            customerInfo: {
                ...prev.customerInfo,
                [field]: value
            }
        }));
    };

    const handleReservationSubmit = () => {
        // Submit reservation data
        const reservationPayload = {
            ...reservationData,
            reservationId: `RES-${Date.now()}`,
            totalAmount: reservationData.cartItems.reduce((total, item) => total + (item.menuItem.price * item.quantity), 0)
        };
        
        console.log('Reservation Data:', reservationPayload);
        alert(`Reservation submitted successfully!\nReservation ID: ${reservationPayload.reservationId}`);
    };

    const getTotalAmount = () => {
        return reservationData.cartItems.reduce((total, item) => total + (item.menuItem.price * item.quantity), 0);
    };

    // Calculate current step index for progress
    const stepIndex = ['date', 'tables', 'menu', 'review'].indexOf(currentStep);

    const canProceedToTables = reservationData.date && reservationData.timeSlot;
    const canProceedToMenu = reservationData.selectedTables.length > 0;
    const canProceedToReview = reservationData.cartItems.length > 0;
    const canConfirmReservation = reservationData.customerInfo.name.trim().length > 0 && 
                                 reservationData.customerInfo.phone.trim().length > 0;

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
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Make Reservation</h1>
                            <p className="text-xs sm:text-sm text-gray-600">Book your table in advance</p>
                        </div>
                    </div>
                    
                    {/* Progress Steps - Responsive */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                        {/* Mobile Progress Bar */}
                        <div className="w-full sm:hidden">
                            <div className="flex justify-between text-xs text-gray-600 mb-2">
                                <span>Step {stepIndex + 1} of 4</span>
                                <span className="font-medium">
                                    {currentStep === 'date' && 'Date & Time'}
                                    {currentStep === 'tables' && 'Selecting Tables'}
                                    {currentStep === 'menu' && 'Choosing Menu'}
                                    {currentStep === 'review' && 'Review & Confirm'}
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
                                { key: 'date', label: 'Date & Time', shortLabel: 'Date' },
                                { key: 'tables', label: 'Tables', shortLabel: 'Tables' },
                                { key: 'menu', label: 'Menu', shortLabel: 'Menu' },
                                { key: 'review', label: 'Review', shortLabel: 'Review' }
                            ].map((step, index) => {
                                const isCompleted = index < stepIndex;
                                const isCurrent = currentStep === step.key;
                                
                                return (
                                    <div key={step.key} className="flex items-center gap-2">
                                        <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-medium transition-all ${
                                            isCurrent
                                                ? 'bg-orange-500 text-white scale-110'
                                                : isCompleted
                                                ? 'bg-orange-500 text-white'
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
                                                index < stepIndex ? 'bg-orange-500' : 'bg-gray-300'
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
                        {currentStep === 'date' && (
                            <DateSelector 
                                onDateTimeSelect={handleDateSelect}
                                selectedDate={reservationData.date}
                                selectedTimeSlot={reservationData.timeSlot}
                            />
                        )}

                        {currentStep === 'tables' && (
                            <RestaurantTableSelector
                                selectedTables={reservationData.selectedTables}
                                onTableSelect={handleTableSelect}
                                maxSelection={2}
                                title="Select Tables for Reservation"
                            />
                        )}

                        {currentStep === 'menu' && (
                            <MenuSelector
                                menuItems={sampleMenu}
                                cartItems={reservationData.cartItems}
                                onCartUpdate={handleMenuUpdate}
                            />
                        )}

                        {currentStep === 'review' && (
                            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200">
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Review Reservation</h3>
                                
                                <div className="space-y-4 sm:space-y-6">
                                    {/* Date & Time */}
                                    <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-lg">
                                        <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                                        <div>
                                            <p className="font-semibold text-gray-900 text-sm sm:text-base">
                                                {reservationData.date?.toLocaleDateString('en-US', { 
                                                    weekday: 'long', 
                                                    year: 'numeric', 
                                                    month: 'long', 
                                                    day: 'numeric' 
                                                })}
                                            </p>
                                            <p className="text-gray-600 text-sm sm:text-base">{reservationData.timeSlot}</p>
                                        </div>
                                    </div>

                                    {/* Tables */}
                                    {reservationData.selectedTables.length > 0 && (
                                        <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-lg">
                                            <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                                            <div>
                                                <p className="font-semibold text-gray-900 text-sm sm:text-base">Selected Tables</p>
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    {reservationData.selectedTables.map(table => (
                                                        <span key={table.id} className="bg-orange-100 text-orange-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                                                            {table.number}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Menu Items */}
                                    {reservationData.cartItems.length > 0 && (
                                        <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg">
                                            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 mt-1" />
                                            <div className="flex-1">
                                                <p className="font-semibold text-gray-900 text-sm sm:text-base mb-2">Selected Menu Items</p>
                                                <div className="space-y-2">
                                                    {reservationData.cartItems.map(item => (
                                                        <div key={item.menuItem.id} className="flex justify-between text-sm sm:text-base">
                                                            <span className="text-gray-700">{item.menuItem.name} x{item.quantity}</span>
                                                            <span className="font-semibold text-gray-900">{formatCurrency(item.menuItem.price * item.quantity)}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="border-t border-orange-200 mt-3 pt-3">
                                                    <div className="flex justify-between font-bold text-sm sm:text-base">
                                                        <span className="text-gray-900">Subtotal:</span>
                                                        <span className="text-orange-600">{formatCurrency(getTotalAmount())}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Customer Info Form */}
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <h4 className="font-semibold text-gray-900 mb-4 text-sm sm:text-base">Your Information</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                                            <div>
                                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                                    Full Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={reservationData.customerInfo.name}
                                                    onChange={(e) => handleCustomerInfoUpdate('name', e.target.value)}
                                                    placeholder="Enter your full name"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base text-black"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                                    Phone Number *
                                                </label>
                                                <input
                                                    type="tel"
                                                    value={reservationData.customerInfo.phone}
                                                    onChange={(e) => handleCustomerInfoUpdate('phone', e.target.value)}
                                                    placeholder="Enter your phone number"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base text-black"
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                                    Phone
                                                </label>
                                                <input
                                                    type="text"
                                                    value={reservationData.customerInfo.number}
                                                    onChange={(e) => handleCustomerInfoUpdate('number', e.target.value)}
                                                    placeholder="Enter your whatsapp number"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base text-black"
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                                    Special Requests
                                                </label>
                                                <textarea
                                                    value={reservationData.customerInfo.specialRequests}
                                                    onChange={(e) => handleCustomerInfoUpdate('specialRequests', e.target.value)}
                                                    placeholder="Any special requests or dietary restrictions"
                                                    rows={3}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base text-black"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Reservation Summary Sidebar */}
                    <div className="space-y-6">
                        {/* Summary Card */}
                        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200 sticky top-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Reservation Summary</h3>
                            
                            {reservationData.date ? (
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Date:</span>
                                        <span className="font-medium text-gray-900">
                                            {reservationData.date.toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Time:</span>
                                        <span className="font-medium text-gray-900">{reservationData.timeSlot}</span>
                                    </div>
                                    
                                    {reservationData.selectedTables.length > 0 && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Tables:</span>
                                            <span className="font-medium text-gray-900">
                                                {reservationData.selectedTables.map(t => t.number).join(', ')}
                                            </span>
                                        </div>
                                    )}

                                    {reservationData.cartItems.length > 0 && (
                                        <>
                                            <div className="border-t border-gray-200 pt-3">
                                                <div className="flex justify-between font-semibold">
                                                    <span className="text-black">Total:</span>
                                                    <span className="text-orange-600">
                                                        {formatCurrency(getTotalAmount())}
                                                    </span>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-4 text-sm">No reservation details yet</p>
                            )}

                            {/* Navigation Buttons */}
                            <div className="space-y-3 mt-6">
                                {currentStep === 'date' && (
                                    <button
                                        onClick={() => setCurrentStep('tables')}
                                        disabled={!canProceedToTables}
                                        className="w-full bg-orange-500 text-white py-2 sm:py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                                    >
                                        Continue to Table Selection
                                    </button>
                                )}

                                {currentStep === 'tables' && (
                                    <>
                                        <button
                                            onClick={() => setCurrentStep('date')}
                                            className="w-full bg-gray-500 text-white py-2 sm:py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors font-medium text-sm sm:text-base"
                                        >
                                            Back to Date Selection
                                        </button>
                                        <button
                                            onClick={() => setCurrentStep('menu')}
                                            disabled={!canProceedToMenu}
                                            className="w-full bg-orange-500 text-white py-2 sm:py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                                        >
                                            Continue to Menu Selection
                                        </button>
                                    </>
                                )}

                                {currentStep === 'menu' && (
                                    <>
                                        <button
                                            onClick={() => setCurrentStep('tables')}
                                            className="w-full bg-gray-500 text-white py-2 sm:py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors font-medium text-sm sm:text-base"
                                        >
                                            Back to Tables
                                        </button>
                                        <button
                                            onClick={() => setCurrentStep('review')}
                                            disabled={!canProceedToReview}
                                            className="w-full bg-orange-500 text-white py-2 sm:py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                                        >
                                            Continue to Review
                                        </button>
                                    </>
                                )}

                                {currentStep === 'review' && (
                                    <>
                                        <button
                                            onClick={() => setCurrentStep('menu')}
                                            className="w-full bg-gray-500 text-white py-2 sm:py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors font-medium text-sm sm:text-base"
                                        >
                                            Back to Menu
                                        </button>
                                        <button
                                            onClick={handleReservationSubmit}
                                            disabled={!canConfirmReservation}
                                            className="w-full bg-orange-500 text-white py-2 sm:py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                                        >
                                            Confirm Reservation
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