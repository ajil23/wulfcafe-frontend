// components/MenuSelector.tsx
'use client';

import { useState } from 'react';
import { Search, Plus, Minus, Utensils } from 'lucide-react';

interface MenuItem {
    id: string;
    name: string;
    category: string;
    price: number;
    status: 'available' | 'out-of-stock';
    ingredients: string[];
}

interface CartItem {
    menuItem: MenuItem;
    quantity: number;
    notes?: string;
}

interface MenuSelectorProps {
    menuItems: MenuItem[];
    cartItems: CartItem[];
    onCartUpdate: (items: CartItem[]) => void;
    categories?: string[];
}

export default function MenuSelector({ 
    menuItems, 
    cartItems, 
    onCartUpdate,
    categories = ['All', 'Main Course', 'Beverage', 'Dessert', 'Appetizer']
}: MenuSelectorProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
    const [customizationNotes, setCustomizationNotes] = useState('');

    const filteredMenu = menuItems.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.ingredients.some(ing => ing.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        return matchesSearch && matchesCategory && item.status === 'available';
    });

    const getItemQuantity = (itemId: string) => {
        const cartItem = cartItems.find(ci => ci.menuItem.id === itemId);
        return cartItem ? cartItem.quantity : 0;
    };

    const addToCart = (item: MenuItem) => {
        setSelectedItem(item);
        setCustomizationNotes('');
    };

    const confirmAddToCart = () => {
        if (!selectedItem) return;

        const existingItem = cartItems.find(ci => ci.menuItem.id === selectedItem.id);
        let newCartItems: CartItem[];

        if (existingItem) {
            newCartItems = cartItems.map(ci =>
                ci.menuItem.id === selectedItem.id
                    ? { ...ci, quantity: ci.quantity + 1, notes: customizationNotes }
                    : ci
            );
        } else {
            newCartItems = [...cartItems, {
                menuItem: selectedItem,
                quantity: 1,
                notes: customizationNotes
            }];
        }

        onCartUpdate(newCartItems);
        setSelectedItem(null);
        setCustomizationNotes('');
    };

    const updateQuantity = (itemId: string, newQuantity: number) => {
        if (newQuantity === 0) {
            onCartUpdate(cartItems.filter(ci => ci.menuItem.id !== itemId));
        } else {
            onCartUpdate(cartItems.map(ci =>
                ci.menuItem.id === itemId ? { ...ci, quantity: newQuantity } : ci
            ));
        }
    };

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

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Select Menu Items</h3>

            {/* Search and Filter */}
            <div className="flex gap-4 mb-6">
                <div className="flex-1 relative">
                    <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search menu items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-black"
                    />
                </div>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 mb-6 overflow-x-auto">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                            selectedCategory === category
                                ? 'bg-orange-500 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto mb-6">
                {filteredMenu.map((item) => {
                    const quantity = getItemQuantity(item.id);
                    
                    return (
                        <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                    <h4 className="font-bold text-gray-900 text-lg">{item.name}</h4>
                                    <p className="text-sm text-gray-600 mb-2">{item.ingredients.join(', ')}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold text-orange-600">
                                            {formatCurrency(item.price)}
                                        </span>
                                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                            {item.category}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center justify-between">
                                {quantity > 0 ? (
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => updateQuantity(item.id, quantity - 1)}
                                            className="p-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="font-bold text-gray-900 min-w-8 text-center">
                                            {quantity}
                                        </span>
                                        <button
                                            onClick={() => updateQuantity(item.id, quantity + 1)}
                                            className="p-1 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => addToCart(item)}
                                        className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors font-medium"
                                    >
                                        Add to Order
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {filteredMenu.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    <Utensils className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    No menu items found
                </div>
            )}

            {/* Customization Modal */}
            {selectedItem && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6">
                        <h4 className="text-lg font-bold text-gray-900 mb-4">Add {selectedItem.name}</h4>
                        
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Special Instructions (Optional)
                            </label>
                            <textarea
                                value={customizationNotes}
                                onChange={(e) => setCustomizationNotes(e.target.value)}
                                placeholder="E.g.: No spicy, extra sauce, etc."
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            />
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setSelectedItem(null)}
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmAddToCart}
                                className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
                            >
                                Add to Order
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}