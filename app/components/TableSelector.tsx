import { useState, useEffect } from 'react';
import { Table, Users, X, Search, ZoomIn, ZoomOut, RotateCcw, CheckCircle } from 'lucide-react';

interface TableData {
    id: string;
    number: string;
    capacity: number;
    status: 'available' | 'occupied' | 'reserved' | 'maintenance';
    location: string;
    shape?: 'square' | 'circle' | 'rectangle';
    x: number;
    y: number;
}

interface TableSelectorProps {
    tables: TableData[];
    selectedTables: TableData[];
    onTableSelect: (tables: TableData[]) => void;
    maxSelection?: number;
    title?: string;
}

export default function RestaurantTableSelector({
    tables: initialTables,
    selectedTables,
    onTableSelect,
    maxSelection = 4,
    title = "Select Tables"
}: TableSelectorProps) {
    // Sample table data positioned according to the restaurant layout
    const [tables] = useState<TableData[]>([
        // Indoor tables (8 tables, 2 seats each)
        { id: '1', number: 'I1', capacity: 2, status: 'available', location: 'Indoor', shape: 'circle', x: 90, y: 90 },
        { id: '2', number: 'I2', capacity: 2, status: 'available', location: 'Indoor', shape: 'circle', x: 190, y: 90 },
        { id: '3', number: 'I3', capacity: 2, status: 'occupied', location: 'Indoor', shape: 'circle', x: 285, y: 90 },
        { id: '4', number: 'I4', capacity: 2, status: 'occupied', location: 'Indoor', shape: 'circle', x: 370, y: 90 },
        { id: '5', number: 'I5', capacity: 2, status: 'available', location: 'Indoor', shape: 'circle', x: 90, y: 170 },
        { id: '6', number: 'I6', capacity: 2, status: 'reserved', location: 'Indoor', shape: 'circle', x: 190, y: 170 },
        { id: '7', number: 'I7', capacity: 2, status: 'available', location: 'Indoor', shape: 'circle', x: 285, y: 170 },
        { id: '8', number: 'I8', capacity: 2, status: 'maintenance', location: 'Indoor', shape: 'circle', x: 370, y: 170 },

        // Semi-Outdoor tables (6 tables, 2 seats each)
        { id: '10', number: 'S1', capacity: 2, status: 'available', location: 'Semi-Outdoor', shape: 'circle', x: 630, y: 90 },
        { id: '11', number: 'S2', capacity: 2, status: 'available', location: 'Semi-Outdoor', shape: 'circle', x: 735, y: 90 },
        { id: '12', number: 'S3', capacity: 2, status: 'occupied', location: 'Semi-Outdoor', shape: 'circle', x: 830, y: 90 },
        { id: '13', number: 'S4', capacity: 2, status: 'available', location: 'Semi-Outdoor', shape: 'circle', x: 630, y: 170 },
        { id: '14', number: 'S5', capacity: 2, status: 'available', location: 'Semi-Outdoor', shape: 'circle', x: 735, y: 170 },
        { id: '15', number: 'S6', capacity: 2, status: 'reserved', location: 'Semi-Outdoor', shape: 'circle', x: 830, y: 170 },

        // Outdoor tables (12 tables, various capacities)
        { id: '16', number: 'O1', capacity: 4, status: 'available', location: 'Outdoor', shape: 'square', x: 150, y: 320 },
        { id: '17', number: 'O2', capacity: 4, status: 'available', location: 'Outdoor', shape: 'square', x: 250, y: 320 },
        { id: '18', number: 'O3', capacity: 4, status: 'available', location: 'Outdoor', shape: 'square', x: 350, y: 320 },
        { id: '19', number: 'O4', capacity: 4, status: 'reserved', location: 'Outdoor', shape: 'square', x: 450, y: 320 },
        { id: '20', number: 'O5', capacity: 4, status: 'available', location: 'Outdoor', shape: 'square', x: 550, y: 320 },
        { id: '21', number: 'O6', capacity: 4, status: 'available', location: 'Outdoor', shape: 'square', x: 650, y: 320 },
        { id: '22', number: 'O7', capacity: 6, status: 'available', location: 'Outdoor', shape: 'rectangle', x: 200, y: 420 },
        { id: '23', number: 'O8', capacity: 6, status: 'available', location: 'Outdoor', shape: 'rectangle', x: 350, y: 420 },
        { id: '24', number: 'O9', capacity: 6, status: 'occupied', location: 'Outdoor', shape: 'rectangle', x: 500, y: 420 },
        { id: '25', number: 'O10', capacity: 6, status: 'available', location: 'Outdoor', shape: 'rectangle', x: 650, y: 420 },
        { id: '26', number: 'O11', capacity: 2, status: 'available', location: 'Outdoor', shape: 'circle', x: 750, y: 380 },
        { id: '27', number: 'O12', capacity: 2, status: 'maintenance', location: 'Outdoor', shape: 'circle', x: 750, y: 460 },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'map'>('map');
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

    // Responsive layout dimensions
    const [containerSize, setContainerSize] = useState({ width: 930, height: 600 });

    useEffect(() => {
        const updateSize = () => {
            if (window.innerWidth < 768) {
                // Mobile
                setContainerSize({ width: 600, height: 800 });
                setScale(0.6);
            } else if (window.innerWidth < 1024) {
                // Tablet
                setContainerSize({ width: 800, height: 600 });
                setScale(0.8);
            } else {
                // Desktop
                setContainerSize({ width: 930, height: 600 });
                setScale(1);
            }
        };

        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    const filteredTables = tables.filter(table =>
        table.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        table.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleTableClick = (table: TableData) => {
        if (table.status !== 'available') return;

        const isSelected = selectedTables.some(t => t.id === table.id);
        let newSelection: TableData[];

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

    // Zoom functions
    const zoomIn = () => setScale(prev => Math.min(prev + 0.2, 2));
    const zoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.4));
    const resetView = () => {
        setScale(1);
        setPosition({ x: 0, y: 0 });
    };

    // Drag functions for mobile
    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartPosition({ x: e.clientX - position.x, y: e.clientY - position.y });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        setPosition({
            x: e.clientX - startPosition.x,
            y: e.clientY - startPosition.y
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Touch events for mobile
    const handleTouchStart = (e: React.TouchEvent) => {
        if (e.touches.length === 1) {
            setIsDragging(true);
            setStartPosition({
                x: e.touches[0].clientX - position.x,
                y: e.touches[0].clientY - position.y
            });
        }
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging || e.touches.length !== 1) return;
        setPosition({
            x: e.touches[0].clientX - startPosition.x,
            y: e.touches[0].clientY - startPosition.y
        });
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    const getStatusColor = (status: TableData['status']) => {
        switch (status) {
            case 'available': return 'bg-green-500';
            case 'occupied': return 'bg-red-500';
            case 'reserved': return 'bg-yellow-500';
            case 'maintenance': return 'bg-gray-400';
            default: return 'bg-gray-300';
        }
    };

    const getChairColor = (status: TableData['status']) => {
        switch (status) {
            case 'available': return 'bg-green-400 border-green-600';
            case 'occupied': return 'bg-red-400 border-red-600';
            case 'reserved': return 'bg-orange-400 border-orange-600';
            case 'maintenance': return 'bg-gray-400 border-gray-600';
            default: return 'bg-gray-400 border-gray-600';
        }
    };

    const getTableColor = (status: TableData['status'], isSelected: boolean) => {
        if (isSelected) {
            return 'bg-green-100 border-green-500';
        }

        switch (status) {
            case 'available': return 'bg-green-50 border-green-300';
            case 'occupied': return 'bg-red-50 border-red-300';
            case 'reserved': return 'bg-orange-50 border-orange-300';
            case 'maintenance': return 'bg-gray-100 border-gray-300';
            default: return 'bg-gray-100 border-gray-300';
        }
    };

    const getTableSize = (capacity: number, shape: string) => {
        const baseSize = 40;
        const size = baseSize + (capacity * 3);

        if (shape === 'rectangle') {
            return { width: size * 1.5, height: size * 0.8 };
        }
        return { width: size, height: size };
    };

    const renderChairs = (table: TableData, isSelected: boolean) => {
        const chairs = [];
        const chairCount = table.capacity;
        const chairColor = getChairColor(table.status);

        switch (table.shape) {
            case 'circle':
                for (let i = 0; i < chairCount; i++) {
                    const angle = (i / chairCount) * 2 * Math.PI;
                    const radius = 25;
                    const chairX = Math.cos(angle) * radius;
                    const chairY = Math.sin(angle) * radius;

                    chairs.push(
                        <div
                            key={i}
                            className={`absolute w-3 h-3 rounded-sm border ${chairColor}`}
                            style={{
                                left: `50%`,
                                top: `50%`,
                                transform: `translate(-50%, -50%) translate(${chairX}px, ${chairY}px)`
                            }}
                        />
                    );
                }
                break;

            case 'rectangle':
                const chairsPerSide = Math.ceil(chairCount / 2);
                const chairSpacing = 20;

                for (let i = 0; i < chairsPerSide; i++) {
                    const x = (i - (chairsPerSide - 1) / 2) * chairSpacing;
                    chairs.push(
                        <div
                            key={`top-${i}`}
                            className={`absolute w-3 h-3 rounded-sm border ${chairColor}`}
                            style={{
                                left: `50%`,
                                top: `0%`,
                                transform: `translate(${x}px, -8px)`
                            }}
                        />
                    );
                }

                for (let i = 0; i < chairsPerSide; i++) {
                    const x = (i - (chairsPerSide - 1) / 2) * chairSpacing;
                    chairs.push(
                        <div
                            key={`bottom-${i}`}
                            className={`absolute w-3 h-3 rounded-sm border ${chairColor}`}
                            style={{
                                left: `50%`,
                                top: `100%`,
                                transform: `translate(${x}px, 8px)`
                            }}
                        />
                    );
                }
                break;

            default: // square
                const sideChairs = Math.ceil(chairCount / 4);
                const squareSpacing = 15;

                for (let i = 0; i < sideChairs && chairs.length < chairCount; i++) {
                    const x = (i - (sideChairs - 1) / 2) * squareSpacing;
                    chairs.push(
                        <div
                            key={`top-${i}`}
                            className={`absolute w-3 h-3 rounded-sm border ${chairColor}`}
                            style={{
                                left: `50%`,
                                top: `0%`,
                                transform: `translate(${x}px, -8px)`
                            }}
                        />
                    );
                }

                for (let i = 0; i < sideChairs && chairs.length < chairCount; i++) {
                    const y = (i - (sideChairs - 1) / 2) * squareSpacing;
                    chairs.push(
                        <div
                            key={`right-${i}`}
                            className={`absolute w-3 h-3 rounded-sm border ${chairColor}`}
                            style={{
                                left: `100%`,
                                top: `50%`,
                                transform: `translate(8px, ${y}px)`
                            }}
                        />
                    );
                }

                for (let i = 0; i < sideChairs && chairs.length < chairCount; i++) {
                    const x = (i - (sideChairs - 1) / 2) * squareSpacing;
                    chairs.push(
                        <div
                            key={`bottom-${i}`}
                            className={`absolute w-3 h-3 rounded-sm border ${chairColor}`}
                            style={{
                                left: `50%`,
                                top: `100%`,
                                transform: `translate(${x}px, 8px)`
                            }}
                        />
                    );
                }

                for (let i = 0; i < sideChairs && chairs.length < chairCount; i++) {
                    const y = (i - (sideChairs - 1) / 2) * squareSpacing;
                    chairs.push(
                        <div
                            key={`left-${i}`}
                            className={`absolute w-3 h-3 rounded-sm border ${chairColor}`}
                            style={{
                                left: `0%`,
                                top: `50%`,
                                transform: `translate(-8px, ${y}px)`
                            }}
                        />
                    );
                }
                break;
        }

        return chairs;
    };

    const renderTableShape = (table: TableData, isSelected: boolean) => {
        const size = getTableSize(table.capacity, table.shape || 'square');
        const baseClasses = `absolute transition-all duration-200 flex items-center justify-center ${isSelected
            ? 'ring-2 ring-green-500 ring-offset-2 scale-110 z-20'
            : table.status === 'available'
                ? 'hover:scale-110 cursor-pointer z-10'
                : 'opacity-60 z-0'
            }`;

        const shapeStyle = {
            left: `${table.x}px`,
            top: `${table.y}px`,
            width: `${size.width}px`,
            height: `${size.height}px`,
            transform: 'translate(-50%, -50%)'
        };

        const tableColor = getTableColor(table.status, isSelected);

        const tableContent = (
            <div className="text-center z-10 relative">
                <div className={`font-bold text-xs ${isSelected ? 'text-green-900' : 'text-gray-900'}`}>
                    {table.number}
                </div>
                <div className="text-[10px] text-gray-500 flex items-center justify-center gap-1">
                    <Users className="w-2 h-2" />
                    {table.capacity}
                </div>
            </div>
        );

        switch (table.shape) {
            case 'circle':
                return (
                    <div
                        key={table.id}
                        className={`${baseClasses} rounded-full border-2 ${tableColor}`}
                        style={shapeStyle}
                        onClick={() => handleTableClick(table)}
                    >
                        {renderChairs(table, isSelected)}
                        {tableContent}
                    </div>
                );

            case 'rectangle':
                return (
                    <div
                        key={table.id}
                        className={`${baseClasses} rounded-lg border-2 ${tableColor}`}
                        style={shapeStyle}
                        onClick={() => handleTableClick(table)}
                    >
                        {renderChairs(table, isSelected)}
                        {tableContent}
                    </div>
                );

            default: // square
                return (
                    <div
                        key={table.id}
                        className={`${baseClasses} rounded-lg border-2 ${tableColor}`}
                        style={shapeStyle}
                        onClick={() => handleTableClick(table)}
                    >
                        {renderChairs(table, isSelected)}
                        {tableContent}
                    </div>
                );
        }
    };

    return (
        <div>
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-200">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900">{title}</h3>
                        <div className="flex items-center gap-3">
                            <div className="text-sm text-gray-600 bg-gray-100 px-3 md:px-4 py-2 rounded-full font-medium">
                                {selectedTables.length} of {maxSelection} selected
                            </div>
                            <div className="flex bg-gray-100 rounded-lg p-1">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`px-3 md:px-4 py-2 rounded-md text-sm font-medium transition-all ${viewMode === 'grid'
                                        ? 'bg-white text-orange-600 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    Grid
                                </button>
                                <button
                                    onClick={() => setViewMode('map')}
                                    className={`px-3 md:px-4 py-2 rounded-md text-sm font-medium transition-all ${viewMode === 'map'
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
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
                        <input
                            type="text"
                            placeholder="Search tables by number or location..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 md:pl-11 pr-4 py-2 md:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-black text-sm md:text-base"
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
                                        className="flex items-center gap-2 bg-orange-500 text-white px-3 py-2 rounded-lg text-sm"
                                    >
                                        <Table className="w-3 h-3 md:w-4 md:h-4" />
                                        <span className="font-medium">{table.number}</span>
                                        <span className="text-orange-100 text-xs">({table.capacity} seats)</span>
                                        <button
                                            onClick={() => handleTableClick(table)}
                                            className="text-orange-200 hover:text-white ml-1"
                                        >
                                            <X className="w-3 h-3 md:w-4 md:h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Tables Display */}
                    {viewMode === 'grid' ? (
                        /* Grid View */
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 max-h-[500px] md:max-h-[600px] overflow-y-auto">
                            {filteredTables.map((table) => {
                                const isSelected = selectedTables.some(t => t.id === table.id);
                                const isAvailable = table.status === 'available';
                                const tableColor = getTableColor(table.status, isSelected);

                                return (
                                    <button
                                        key={table.id}
                                        onClick={() => handleTableClick(table)}
                                        disabled={!isAvailable}
                                        className={`relative p-4 md:p-6 rounded-xl border-2 transition-all ${tableColor} ${isAvailable ? 'hover:shadow-md' : 'cursor-not-allowed'
                                            }`}
                                    >
                                        {/* Check icon untuk meja yang terpilih - POSISI AMAN */}
                                        {isSelected && (
                                            <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full z-10 shadow-lg">
                                                <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                                            </div>
                                        )}

                                        <div className="text-center mb-3">
                                            <div className={`text-lg md:text-2xl font-bold mb-2 ${isSelected ? 'text-green-900' : 'text-gray-900'}`}>
                                                {table.number}
                                            </div>
                                            <div className="text-xs md:text-sm text-gray-500 flex items-center justify-center gap-1">
                                                <Users className="w-3 h-3 md:w-4 md:h-4" />
                                                {table.capacity} seats
                                            </div>
                                        </div>
                                        <div className="mt-2 text-xs text-gray-500 font-medium">
                                            {table.location}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    ) : (
                        /* 2D Map View - Restaurant Layout */
                        <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border-2 border-gray-300 overflow-hidden">
                            {/* Zoom Controls */}
                            <div className="absolute top-4 right-4 z-30 flex flex-col gap-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg border">
                                <button
                                    onClick={zoomIn}
                                    className="p-2 hover:bg-gray-100 rounded transition-colors"
                                    title="Zoom In"
                                >
                                    <ZoomIn className="w-4 h-4 text-black" />
                                </button>
                                <button
                                    onClick={zoomOut}
                                    className="p-2 hover:bg-gray-100 rounded transition-colors"
                                    title="Zoom Out"
                                >
                                    <ZoomOut className="w-4 h-4 text-black" />
                                </button>
                                <button
                                    onClick={resetView}
                                    className="p-2 hover:bg-gray-100 rounded transition-colors"
                                    title="Reset View"
                                >
                                    <RotateCcw className="w-4 h-4 text-black" />
                                </button>
                            </div>

                            <div
                                className="relative overflow-hidden touch-pan-y"
                                style={{
                                    width: '100%',
                                    height: 'min(80vh, 600px)',
                                    cursor: isDragging ? 'grabbing' : 'grab'
                                }}
                                onMouseDown={handleMouseDown}
                                onMouseMove={handleMouseMove}
                                onMouseUp={handleMouseUp}
                                onMouseLeave={handleMouseUp}
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                                onTouchEnd={handleTouchEnd}
                            >
                                <div
                                    className="absolute origin-top-left"
                                    style={{
                                        transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
                                        width: `${containerSize.width}px`,
                                        height: `${containerSize.height}px`
                                    }}
                                >
                                    {/* Restaurant sections with labels */}
                                    <svg
                                        className="absolute inset-0"
                                        style={{
                                            pointerEvents: 'none',
                                            width: '930px',
                                            height: '600px'
                                        }}
                                    >
                                        {/* Indoor section */}
                                        <rect x="40" y="40" width="380" height="200" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />
                                        <text x="230" y="30" textAnchor="middle" className="text-sm font-bold fill-gray-700">INDOOR</text>

                                        {/* Indoor door */}
                                        <rect x="350" y="235" width="40" height="5" fill="#9ca3af" />
                                        <text x="370" y="250" textAnchor="middle" className="text-[10px] fill-gray-600">DOOR</text>

                                        {/* Bar section */}
                                        <rect x="430" y="40" width="140" height="200" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />

                                        {/* Restroom */}
                                        <rect x="435" y="50" width="130" height="40" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="1" />
                                        <text x="500" y="75" textAnchor="middle" className="text-xs font-medium fill-gray-600">RESTROOM</text>

                                        {/* Bar counter */}
                                        <rect x="435" y="95" width="130" height="140" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="1" opacity="0.3" />
                                        <text x="500" y="170" textAnchor="middle" className="text-xs font-medium fill-purple-700">BAR COUNTER</text>

                                        {/* Semi-Outdoor section */}
                                        <rect x="580" y="40" width="310" height="200" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />
                                        <text x="730" y="30" textAnchor="middle" className="text-sm font-bold fill-gray-700">SEMI-OUTDOOR</text>

                                        {/* Outdoor section */}
                                        <rect x="40" y="260" width="850" height="280" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />
                                        <text x="450" y="280" textAnchor="middle" className="text-sm font-bold fill-gray-700">OUTDOOR</text>

                                        {/* Parking Area section */}
                                        <rect x="40" y="550" width="850" height="40" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />
                                        <text x="450" y="575" textAnchor="middle" className="text-sm font-bold fill-gray-700">PARKING AREA</text>
                                    </svg>

                                    {/* Render all tables */}
                                    {filteredTables.map(table => renderTableShape(table, selectedTables.some(t => t.id === table.id)))}
                                </div>

                                {/* Legend */}
                                <div className="absolute bottom-4 left-4 z-30 bg-white/95 backdrop-blur-sm rounded-xl p-3 md:p-4 shadow-lg border border-gray-200 max-w-[180px] md:max-w-none">
                                    <div className="text-xs font-bold text-gray-700 mb-2">Status Legend:</div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                            <span className="text-black">Available</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                            <span className="text-black">Occupied</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                                            <span className="text-black">Reserved</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                                            <span className="text-black">Maintenance</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Scale Indicator */}
                                <div className="absolute bottom-4 right-4 z-30 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                    {Math.round(scale * 100)}%
                                </div>
                            </div>
                        </div>
                    )}

                    {filteredTables.length === 0 && (
                        <div className="text-center py-8 md:py-12 text-gray-500">
                            <Table className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-3 text-gray-300" />
                            <p className="font-medium text-sm md:text-base">No tables found</p>
                            <p className="text-xs md:text-sm text-gray-400 mt-1">Try adjusting your search terms</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}