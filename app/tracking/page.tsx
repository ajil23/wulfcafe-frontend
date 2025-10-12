// app/tracking/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Poppins } from 'next/font/google';
import { ChefHat, CheckCircle, Utensils, Clock, User, Table, CheckCheck } from 'lucide-react';

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
}

interface OrderData {
  id: string;
  status: 'processing' | 'ready' | 'completed';
  customerName: string;
  tableNumber: string;
  orderTime: string;
  items: OrderItem[];
  totalPrice: number;
}

// Data contoh untuk simulasi - HANYA 1 ORDER
const sampleOrder: OrderData = {
  id: 'WLF-2024-001',
  status: 'processing',
  customerName: 'Budi Santoso',
  tableNumber: 'A5',
  orderTime: new Date().toISOString(),
  items: [
    { id: 1, name: 'Nasi Goreng Spesial', quantity: 2, price: 25000 },
    { id: 2, name: 'Es Teh Manis', quantity: 1, price: 8000 },
  ],
  totalPrice: 58000,
};

const statusSteps = [
  {
    key: 'processing' as const,
    label: 'Sedang Diproses',
    description: 'Pesanan sedang dibuat oleh dapur',
    icon: ChefHat
  },
  {
    key: 'ready' as const,
    label: 'Siap Disajikan',
    description: 'Pesanan sudah siap untuk diantar',
    icon: CheckCheck
  },
  {
    key: 'completed' as const,
    label: 'Sudah Disajikan',
    description: 'Pesanan telah sampai ke meja Anda',
    icon: Utensils
  },
];

export default function TrackingPage() {
  const router = useRouter();
  const [order, setOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    // Untuk demo, gunakan sample data - HANYA 1 ORDER
    setOrder(sampleOrder);
  }, []);

  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  if (!order) {
    return (
      <div className={`min-h-screen bg-[#F9F2ED] flex items-center justify-center ${poppins.className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c17f54] mx-auto mb-4"></div>
          <p className="text-[#5A5A5A]">Memuat data pesanan...</p>
        </div>
      </div>
    );
  }

  const CurrentStatusIcon = statusSteps.find(step => step.key === order.status)?.icon || ChefHat;

  return (
    <div className={`min-h-screen bg-[#F9F2ED] py-6 ${poppins.className}`}>
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#313131] mb-2">Lacak Pesanan</h1>
          <p className="text-[#5A5A5A]">Pantau status pesanan Anda secara real-time</p>
        </div>

        {/* Single Order Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E3E3E3] overflow-hidden">
          {/* Order Header */}
          <div className="bg-[#FFF8F3] p-6 text-center border-b border-[#E3E3E3]">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center border border-[#E3E3E3]">
                <CurrentStatusIcon className="w-8 h-8 text-[#c17f54]" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-[#313131] mb-2">
              {statusSteps.find(step => step.key === order.status)?.label}
            </h2>
            <p className="text-[#5A5A5A] text-sm mb-4">
              {statusSteps.find(step => step.key === order.status)?.description}
            </p>
            <div className="border-t border-[#E3E3E3] pt-4">
              <p className="text-xs text-[#5A5A5A]">Order ID</p>
              <p className="text-lg font-bold text-[#c17f54]">{order.id}</p>
            </div>
          </div>

          {/* Order Details */}
          <div className="p-6">
            {/* Items */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-[#313131] mb-4">Detail Pesanan</h3>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b border-[#F9F2ED] last:border-b-0">
                    <div className="flex-1">
                      <span className="text-[#313131] font-medium">{item.name}</span>
                      <span className="text-[#5A5A5A] text-sm ml-2">x{item.quantity}</span>
                    </div>
                    <span className="font-medium text-[#313131]">
                      Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#E3E3E3] mt-4 pt-4 flex justify-between items-center">
                <span className="font-bold text-[#313131]">Total</span>
                <span className="font-bold text-[#c17f54] text-lg">
                  Rp {order.totalPrice.toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            {/* Order Info */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-[#313131] mb-4">Informasi Pesanan</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[#5A5A5A]" />
                    <span className="text-[#5A5A5A]">Waktu Pemesanan</span>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-[#313131] text-sm">
                      {formatDate(order.orderTime)} • {formatTime(order.orderTime)}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-[#5A5A5A]" />
                    <span className="text-[#5A5A5A]">Nama Pemesan</span>
                  </div>
                  <p className="font-medium text-[#313131]">{order.customerName}</p>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Table className="w-4 h-4 text-[#5A5A5A]" />
                    <span className="text-[#5A5A5A]">Nomor Meja</span>
                  </div>
                  <p className="font-medium text-[#313131]">
                    {order.tableNumber || 'Takeaway'}
                  </p>
                </div>
              </div>
            </div>

            {/* Tracking Status */}
            <div>
              <h3 className="text-lg font-bold text-[#313131] mb-6">Status Pesanan</h3>
              <div className="relative">
                {/* Vertical Line */}
                <div
                  className="absolute left-5 top-0 w-0.5 bg-[#E3E3E3]"
                  style={{ height: `${(statusSteps.length - 1) * 6}rem` }}
                ></div>

                <div className="space-y-6">
                  {statusSteps.map((step, index) => {
                    const isCompleted = statusSteps.findIndex(s => s.key === order.status) >= index;
                    const isCurrent = order.status === step.key;
                    const IconComponent = step.icon;

                    return (
                      <div key={step.key} className="flex items-start gap-4 relative">
                        {/* Status Circle */}
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 z-10 ${
                          isCompleted
                            ? 'bg-[#c17f54] border-[#c17f54] text-white'
                            : 'bg-white border-[#E3E3E3] text-[#A0A0A0]'
                        }`}>
                          {isCompleted ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            <IconComponent className="w-5 h-5" />
                          )}
                        </div>

                        {/* Status Content */}
                        <div className={`flex-1 ${index === statusSteps.length - 1 ? '' : 'pb-6'}`}>
                          <h4 className={`font-bold ${
                            isCompleted ? 'text-[#313131]' : 'text-[#A0A0A0]'
                          }`}>
                            {step.label}
                          </h4>
                          <p className={`mt-1 text-sm ${
                            isCompleted ? 'text-[#5A5A5A]' : 'text-[#A0A0A0]'
                          }`}>
                            {step.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 mt-8">
          <button
            onClick={() => router.push('/')}
            className="flex-1 bg-white border-2 border-[#c17f54] text-[#c17f54] hover:bg-[#FFF8F3] font-bold py-3 rounded-xl transition-all duration-200"
          >
            Kembali ke Menu
          </button>
        </div>
      </div>
    </div>
  );
}