// components/PaymentMethod.tsx
'use client';

import { CreditCard, Smartphone, Wallet } from 'lucide-react';

interface PaymentMethodProps {
    selectedMethod: string;
    onMethodSelect: (method: string) => void;
}

const paymentMethods = [
    {
        id: 'cash',
        name: 'Cash',
        icon: Wallet,
        description: 'Pay with cash'
    },
    {
        id: 'qris',
        name: 'QRIS',
        icon: Smartphone,
        description: 'Scan QR code'
    },
    {
        id: 'debit',
        name: 'Debit Card',
        icon: CreditCard,
        description: 'Pay with debit card'
    },
    {
        id: 'credit',
        name: 'Credit Card',
        icon: CreditCard,
        description: 'Pay with credit card'
    },
    {
        id: 'transfer',
        name: 'Bank Transfer',
        icon: CreditCard,
        description: 'Bank transfer payment'
    }
];

export default function PaymentMethod({ selectedMethod, onMethodSelect }: PaymentMethodProps) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Payment Method</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {paymentMethods.map((method) => {
                    const IconComponent = method.icon;
                    const isSelected = selectedMethod === method.id;
                    
                    return (
                        <button
                            key={method.id}
                            onClick={() => onMethodSelect(method.id)}
                            className={`p-4 border-2 rounded-xl text-left transition-all ${
                                isSelected
                                    ? 'border-orange-500 bg-orange-50'
                                    : 'border-gray-200 bg-white hover:border-orange-300 hover:bg-orange-25'
                            }`}
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className={`p-2 rounded-lg ${
                                    isSelected ? 'bg-orange-100' : 'bg-gray-100'
                                }`}>
                                    <IconComponent className={`w-5 h-5 ${
                                        isSelected ? 'text-orange-600' : 'text-gray-600'
                                    }`} />
                                </div>
                                <span className={`font-bold ${
                                    isSelected ? 'text-orange-900' : 'text-gray-900'
                                }`}>
                                    {method.name}
                                </span>
                            </div>
                            <p className={`text-sm ${
                                isSelected ? 'text-orange-700' : 'text-gray-600'
                            }`}>
                                {method.description}
                            </p>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}