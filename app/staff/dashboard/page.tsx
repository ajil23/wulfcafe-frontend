// staff/dashboard/page.tsx
'use client';

import { useState } from 'react';
import { Utensils, ChefHat, Grid3x3, Clock, Users, ArrowRight, Calendar, CheckCircle, DollarSign, TrendingUp, Star, Package } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function StaffDashboard() {
    const [username] = useState('satria');

    const quickActions = [
        {
            title: 'Order Monitor',
            description: 'Kelola pesanan dan status meja',
            icon: Utensils,
            href: '/staff/order',
            color: 'bg-blue-500 hover:bg-blue-600',
            iconColor: 'text-blue-500'
        },
        {
            title: 'Kitchen Dashboard',
            description: 'Monitor pesanan dapur',
            icon: ChefHat,
            href: '/staff/kitchen',
            color: 'bg-green-500 hover:bg-green-600',
            iconColor: 'text-green-500'
        },
        {
            title: 'Floor Monitor',
            description: 'Pantau status lantai restoran',
            icon: Grid3x3,
            href: '/staff/floor',
            color: 'bg-purple-500 hover:bg-purple-600',
            iconColor: 'text-purple-500'
        }
    ];

    const recentActivities = [
        {
            id: 1,
            action: 'New order received',
            table: 'Table 1',
            time: '2 minutes ago',
            type: 'order'
        },
        {
            id: 2,
            action: 'Order ready to serve',
            table: 'Table 3',
            time: '5 minutes ago',
            type: 'ready'
        },
        {
            id: 3,
            action: 'Table reserved',
            table: 'Table 5',
            time: '15 minutes ago',
            type: 'reservation'
        },
        {
            id: 4,
            action: 'Order completed',
            table: 'Table 2',
            time: '25 minutes ago',
            type: 'completed'
        }
    ];

    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'order':
                return <Utensils className="w-4 h-4" />;
            case 'ready':
                return <ChefHat className="w-4 h-4" />;
            case 'reservation':
                return <Calendar className="w-4 h-4" />;
            case 'completed':
                return <CheckCircle className="w-4 h-4" />;
            default:
                return <Clock className="w-4 h-4" />;
        }
    };

    const getActivityColor = (type: string) => {
        switch (type) {
            case 'order':
                return 'bg-blue-100 text-blue-600';
            case 'ready':
                return 'bg-green-100 text-green-600';
            case 'reservation':
                return 'bg-purple-100 text-purple-600';
            case 'completed':
                return 'bg-gray-100 text-gray-600';
            default:
                return 'bg-gray-100 text-gray-600';
        }
    };

    return (
        <div className="min-h-screen bg-[#F9F2ED]">
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
                            <h1 className="text-2xl font-bold text-gray-900">Staff Dashboard</h1>
                            <p className="text-sm text-gray-600">
                                Welcome back, <span className="font-semibold text-orange-600">{username}</span>
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{new Date().toLocaleTimeString('id-ID', {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false
                            })}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-8">
                {/* Quick Stats - Improved Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Table Status Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-900">Table Status</h3>
                            <Users className="w-5 h-5 text-blue-500" />
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Total Tables</span>
                                <span className="font-bold text-gray-900">12</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Available</span>
                                <span className="font-bold text-green-600">8</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Occupied</span>
                                <span className="font-bold text-red-600">3</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Reserved</span>
                                <span className="font-bold text-yellow-600">1</span>
                            </div>
                            <div className="pt-2 border-t border-gray-200">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-700">Occupancy Rate</span>
                                    <span className="font-bold text-blue-600">75%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Revenue Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-900">Today's Revenue</h3>
                            <DollarSign className="w-5 h-5 text-green-500" />
                        </div>
                        <div className="text-3xl font-bold text-gray-900 mb-2">Rp 2.8M</div>
                        <div className="flex items-center gap-2 text-sm">
                            <TrendingUp className="w-4 h-4 text-green-500" />
                            <span className="text-green-600 font-medium">+12% from yesterday</span>
                        </div>
                        <div className="mt-4 text-xs text-gray-500">
                            Last updated: {new Date().toLocaleTimeString('id-ID', {
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </div>
                    </div>

                    {/* Orders Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-900">Active Orders</h3>
                            <Package className="w-5 h-5 text-orange-500" />
                        </div>
                        <div className="text-3xl font-bold text-gray-900 mb-2">8</div>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Pending Kitchen</span>
                                <span className="font-medium text-orange-600">3</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Ready to Serve</span>
                                <span className="font-medium text-green-600">2</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">In Progress</span>
                                <span className="font-medium text-blue-600">3</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions Grid */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Access</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {quickActions.map((action, index) => {
                            const IconComponent = action.icon;
                            return (
                                <Link
                                    key={index}
                                    href={action.href}
                                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all hover:scale-105 group"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`p-3 rounded-lg ${action.iconColor} bg-opacity-10`}>
                                            <IconComponent className="w-6 h-6" />
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                                    </div>
                                    <h4 className="font-bold text-gray-900 text-lg mb-2">
                                        {action.title}
                                    </h4>
                                    <p className="text-gray-600 text-sm">
                                        {action.description}
                                    </p>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Activity */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                            <Clock className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="space-y-4">
                            {recentActivities.map((activity) => (
                                <div key={activity.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                    <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                                        {getActivityIcon(activity.type)}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-900 text-sm">
                                            {activity.action}
                                        </p>
                                        <p className="text-gray-500 text-xs">
                                            {activity.table} • {activity.time}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* System Status */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-900">System Status</h3>
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="font-medium text-green-800">Order System</span>
                                </div>
                                <span className="text-green-600 text-sm font-medium">Online</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="font-medium text-green-800">Kitchen Display</span>
                                </div>
                                <span className="text-green-600 text-sm font-medium">Online</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="font-medium text-green-800">Payment System</span>
                                </div>
                                <span className="text-green-600 text-sm font-medium">Online</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <span className="font-medium text-blue-800">Staff Members</span>
                                </div>
                                <span className="text-blue-600 text-sm font-medium">3 Active</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}