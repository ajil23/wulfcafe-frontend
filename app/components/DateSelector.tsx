// components/DateSelector.tsx
'use client';
import { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';

interface DateSelectorProps {
    onDateTimeSelect: (date: Date, timeSlot: string) => void;
    selectedDate?: Date | null;
    selectedTimeSlot?: string;
}

export default function DateSelector({ onDateTimeSelect, selectedDate, selectedTimeSlot }: DateSelectorProps) {
    const [currentSelectedDate, setCurrentSelectedDate] = useState<Date>(selectedDate || new Date());
    const [currentSelectedTime, setCurrentSelectedTime] = useState<string>(selectedTimeSlot || '18:00');
    
    const timeSlots = [
        '10:00', '11:00', '12:00', '13:00', '14:00', 
        '15:00', '16:00', '17:00', '18:00', '19:00', 
        '20:00', '21:00'
    ];

    // Handle date change
    const handleDateChange = (date: Date) => {
        setCurrentSelectedDate(date);
        onDateTimeSelect(date, currentSelectedTime);
    };

    // Handle time change
    const handleTimeChange = (time: string) => {
        setCurrentSelectedTime(time);
        onDateTimeSelect(currentSelectedDate, time);
    };

    // Sync with props only when they change
    useEffect(() => {
        if (selectedDate) {
            setCurrentSelectedDate(selectedDate);
        }
    }, [selectedDate]);

    useEffect(() => {
        if (selectedTimeSlot) {
            setCurrentSelectedTime(selectedTimeSlot);
        }
    }, [selectedTimeSlot]);

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Select Date & Time</h3>
            
            {/* Date Picker */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Select Date
                </label>
                <input
                    type="date"
                    value={currentSelectedDate.toISOString().split('T')[0]}
                    onChange={(e) => handleDateChange(new Date(e.target.value))}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-black"
                />
            </div>

            {/* Time Slots */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                    <Clock className="w-4 h-4 inline mr-2" />
                    Select Time
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {timeSlots.map((time) => (
                        <button
                            key={time}
                            onClick={() => handleTimeChange(time)}
                            className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                                currentSelectedTime === time
                                    ? 'border-orange-500 bg-orange-50 text-orange-700'
                                    : 'border-gray-200 bg-white text-gray-700 hover:border-orange-300'
                            }`}
                        >
                            {time}
                        </button>
                    ))}
                </div>
            </div>

            {/* Selected Date & Time Display */}
            <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
                <p className="text-sm font-medium text-orange-800">
                    Selected: {currentSelectedDate.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    })} at {currentSelectedTime}
                </p>
            </div>
        </div>
    );
}