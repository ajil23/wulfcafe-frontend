// components/TableSelector.tsx
'use client';

import { useState } from 'react';
import { Table, Users, Check, X, Search } from 'lucide-react';

interface Table {
    id: string;
    number: string;
    capacity: number;
    status: 'available' | 'occupied' | 'reserved' | 'maintenance';
    location: string;
    shape?: 'square' | 'circle' | 'rectangle';
    x?: number;
    y?: number;
}

interface TableSelectorProps {
    tables: Table[];
    selectedTables: Table[];
    onTableSelect: (tables: Table[]) => void;
    maxSelection?: number;
    title?: string;
}

export default function TableSelector({ 
    tables, 
    selectedTables, 
    onTableSelect, 
    maxSelection = 4,
    title = "Select Tables"
}: TableSelectorProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'map'>('map');

    const filteredTables = tables.filter(table =>
        table.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        table.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleTableClick = (table: Table) => {
        if (table.status !== 'available') return;

        const isSelected = selectedTables.some(t => t.id === table.id);
        let newSelection: Table[];

        if (isSelected) {
            newSelection = selectedTables.filter(t => t.id !== table.id);
        } else {
            if (selectedTables.length >= maxSelection) {
                alert(`Maximum ${maxSelection} tables can be selected`);
                return;
            }
            newSelection = [...selectedTables, table];
        }

        onTableSelect(newSelection);
    };

    const getStatusColor = (status: Table['status']) => {
        switch (status) {
            case 'available': return 'bg-green-500';
            case 'occupied': return 'bg-red-500';
            case 'reserved': return 'bg-yellow-500';
            case 'maintenance': return 'bg-gray-400';
            default: return 'bg-gray-300';
        }
    };

    const getTableSize = (capacity: number, shape: string) => {
        const baseSize = 40;
        const size = baseSize + (capacity * 4);
        
        if (shape === 'rectangle') {
            return { width: size * 1.5, height: size };
        }
        return { width: size, height: size };
    };

    const renderTableShape = (table: Table, isSelected: boolean) => {
        const size = getTableSize(table.capacity, table.shape || 'square');
        const baseClasses = `relative transition-all duration-200 flex items-center justify-center ${
            isSelected 
                ? 'ring-2 ring-orange-500 ring-offset-2 scale-105' 
                : table.status === 'available'
                ? 'hover:scale-105 cursor-pointer'
                : 'opacity-60'
        }`;

        switch (table.shape) {
            case 'circle':
                return (
                    <div
                        className={`${baseClasses} rounded-full bg-white border-2 ${
                            isSelected ? 'border-orange-500 bg-orange-50' : 'border-gray-300'
                        }`}
                        style={size}
                    >
                        <div className="text-center">
                            <div className={`font-bold ${isSelected ? 'text-orange-900' : 'text-gray-900'}`}>
                                {table.number}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                                <Users className="w-3 h-3" />
                                {table.capacity}
                            </div>
                        </div>
                        {/* Status indicator */}
                        <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(table.status)}`} />
                    </div>
                );

            case 'rectangle':
                return (
                    <div
                        className={`${baseClasses} rounded-lg bg-white border-2 ${
                            isSelected ? 'border-orange-500 bg-orange-50' : 'border-gray-300'
                        }`}
                        style={size}
                    >
                        <div className="text-center">
                            <div className={`font-bold ${isSelected ? 'text-orange-900' : 'text-gray-900'}`}>
                                {table.number}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                                <Users className="w-3 h-3" />
                                {table.capacity}
                            </div>
                        </div>
                        {/* Status indicator */}
                        <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(table.status)}`} />
                    </div>
                );

            default: // square
                return (
                    <div
                        className={`${baseClasses} rounded-lg bg-white border-2 ${
                            isSelected ? 'border-orange-500 bg-orange-50' : 'border-gray-300'
                        }`}
                        style={size}
                    >
                        <div className="text-center">
                            <div className={`font-bold ${isSelected ? 'text-orange-900' : 'text-gray-900'}`}>
                                {table.number}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                                <Users className="w-3 h-3" />
                                {table.capacity}
                            </div>
                        </div>
                        {/* Status indicator */}
                        <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(table.status)}`} />
                    </div>
                );
        }
    };

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                        {selectedTables.length} of {maxSelection} selected
                    </div>
                    <div className="flex bg-gray-100 rounded-lg p-1">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                                viewMode === 'grid'
                                    ? 'bg-white text-orange-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            Grid
                        </button>
                        <button
                            onClick={() => setViewMode('map')}
                            className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                                viewMode === 'map'
                                    ? 'bg-white text-orange-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            2D Map
                        </button>
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className="mb-6 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                    type="text"
                    placeholder="Search tables by number or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-black"
                />
            </div>

            {/* Selected Tables Preview */}
            {selectedTables.length > 0 && (
                <div className="mb-6 p-4 bg-orange-50 rounded-xl border border-orange-200">
                    <h4 className="text-sm font-medium text-orange-800 mb-3">Selected Tables:</h4>
                    <div className="flex flex-wrap gap-2">
                        {selectedTables.map((table) => (
                            <div
                                key={table.id}
                                className="flex items-center gap-2 bg-orange-500 text-white px-3 py-2 rounded-lg"
                            >
                                <Table className="w-4 h-4" />
                                <span className="font-medium">{table.number}</span>
                                <span className="text-orange-100 text-sm">({table.capacity} seats)</span>
                                <button
                                    onClick={() => handleTableClick(table)}
                                    className="text-orange-200 hover:text-white ml-1"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Tables Display */}
            {viewMode === 'grid' ? (
                /* Grid View */
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-h-96 overflow-y-auto">
                    {filteredTables.map((table) => {
                        const isSelected = selectedTables.some(t => t.id === table.id);
                        const isAvailable = table.status === 'available';

                        return (
                            <button
                                key={table.id}
                                onClick={() => handleTableClick(table)}
                                disabled={!isAvailable}
                                className={`relative p-4 rounded-xl border-2 transition-all ${
                                    isSelected
                                        ? 'border-orange-500 bg-orange-50'
                                        : isAvailable
                                        ? 'border-gray-200 bg-white hover:border-orange-300 hover:bg-orange-25'
                                        : 'border-gray-200 bg-gray-100 cursor-not-allowed'
                                }`}
                            >
                                {renderTableShape(table, isSelected)}
                                
                                {/* Location badge */}
                                <div className="absolute bottom-2 left-2">
                                    <span className="text-xs text-gray-500 bg-white/80 px-2 py-1 rounded">
                                        {table.location}
                                    </span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            ) : (
                /* 2D Map View */
                <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-xl border-2 border-gray-200 p-6 min-h-[400px] overflow-auto">
                    <div className="relative" style={{ minWidth: '600px', minHeight: '400px' }}>
                        {/* Restaurant outline/sections */}
                        <div className="absolute inset-4 border-2 border-dashed border-gray-300 rounded-lg"></div>
                        
                        {/* Tables arranged in a restaurant layout */}
                        <div className="grid grid-cols-3 gap-8 p-8">
                            {/* Left section */}
                            <div className="space-y-6">
                                {filteredTables.slice(0, 3).map((table, index) => {
                                    const isSelected = selectedTables.some(t => t.id === table.id);
                                    const isAvailable = table.status === 'available';
                                    
                                    return (
                                        <div key={table.id} className="flex justify-center">
                                            <button
                                                onClick={() => handleTableClick(table)}
                                                disabled={!isAvailable}
                                                className={`transition-transform ${
                                                    !isAvailable ? 'opacity-40 cursor-not-allowed' : 'hover:scale-110'
                                                }`}
                                            >
                                                {renderTableShape(table, isSelected)}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Center section */}
                            <div className="space-y-6">
                                {filteredTables.slice(3, 6).map((table, index) => {
                                    const isSelected = selectedTables.some(t => t.id === table.id);
                                    const isAvailable = table.status === 'available';
                                    
                                    return (
                                        <div key={table.id} className="flex justify-center">
                                            <button
                                                onClick={() => handleTableClick(table)}
                                                disabled={!isAvailable}
                                                className={`transition-transform ${
                                                    !isAvailable ? 'opacity-40 cursor-not-allowed' : 'hover:scale-110'
                                                }`}
                                            >
                                                {renderTableShape(table, isSelected)}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Right section */}
                            <div className="space-y-6">
                                {filteredTables.slice(6, 9).map((table, index) => {
                                    const isSelected = selectedTables.some(t => t.id === table.id);
                                    const isAvailable = table.status === 'available';
                                    
                                    return (
                                        <div key={table.id} className="flex justify-center">
                                            <button
                                                onClick={() => handleTableClick(table)}
                                                disabled={!isAvailable}
                                                className={`transition-transform ${
                                                    !isAvailable ? 'opacity-40 cursor-not-allowed' : 'hover:scale-110'
                                                }`}
                                            >
                                                {renderTableShape(table, isSelected)}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Legend */}
                        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-sm border">
                            <div className="text-xs font-medium text-gray-700 mb-2">Status Legend:</div>
                            <div className="flex flex-wrap gap-3 text-xs">
                                <div className="flex items-center gap-1">
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    <span>Available</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <span>Occupied</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <span>Reserved</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                                    <span>Maintenance</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {filteredTables.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    <Table className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No tables found</p>
                    <p className="text-sm text-gray-400 mt-1">Try adjusting your search terms</p>
                </div>
            )}
        </div>
    );
}