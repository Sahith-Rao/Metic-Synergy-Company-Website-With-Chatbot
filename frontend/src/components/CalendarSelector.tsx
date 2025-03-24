import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Globe } from 'lucide-react';
import styled from 'styled-components';

interface CalendarSelectorProps {
  onDateSelect: (date: string) => void;
  onTimeSelect: (time: string) => void;
  selectedDate: string;
  selectedTime: string;
}

const CalendarSelector: React.FC<CalendarSelectorProps> = ({
  onDateSelect,
  onTimeSelect,
  selectedDate,
  selectedTime
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDateObj, setSelectedDateObj] = useState<Date | null>(null);
  const [timeZone, setTimeZone] = useState('');
  const [customTime, setCustomTime] = useState(selectedTime || '');
  
  // Available times are now just suggestions
  const availableTimeOptions = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', 
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  // Initialize timezone
  useEffect(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimeZone(timezone);
  }, []);

  // Update selectedDateObj when selectedDate changes
  useEffect(() => {
    if (selectedDate) {
      setSelectedDateObj(new Date(selectedDate));
    }
  }, [selectedDate]);

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Format month name and year
  const formatMonthYear = (date: Date) => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  // Get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get day of week for first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  // Check if a date is today
  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  // Check if a date is selected
  const isSelected = (date: Date) => {
    if (!selectedDateObj) return false;
    return date.getDate() === selectedDateObj.getDate() &&
      date.getMonth() === selectedDateObj.getMonth() &&
      date.getFullYear() === selectedDateObj.getFullYear();
  };

  // Check if a date is in the past
  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    return date < today;
  };

  // Handle date selection
  const handleDateSelect = (day: number) => {
    const selected = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    if (isPastDate(new Date(selected))) return;
    
    setSelectedDateObj(selected);
    const formattedDate = selected.toISOString().split('T')[0];
    onDateSelect(formattedDate);
  };

  // Handle time selection
  const handleTimeSelect = (time: string) => {
    onTimeSelect(time);
  };

  // Render calendar days
  const renderCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    // Adjust for week starting on Monday
    const firstDayAdjusted = firstDay === 0 ? 6 : firstDay - 1;
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayAdjusted; i++) {
      days.push(<EmptyCell key={`empty-${i}`} />);
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isPast = isPastDate(new Date(date));
      
      days.push(
        <DayCell 
          key={day}
          onClick={() => !isPast && handleDateSelect(day)}
          isToday={isToday(date)}
          isSelected={isSelected(date)}
          isPast={isPast}
        >
          {day}
        </DayCell>
      );
    }
    
    return days;
  };

  return (
    <CalendarContainer>
      <CalendarHeader>
        <h2>Select a Date & Time</h2>
      </CalendarHeader>
      
      <CalendarWrapper>
        <MonthNavigation>
          <NavButton onClick={prevMonth} aria-label="Previous month">
            <ChevronLeft size={20} />
          </NavButton>
          <MonthYearDisplay>{formatMonthYear(currentMonth)}</MonthYearDisplay>
          <NavButton onClick={nextMonth} aria-label="Next month">
            <ChevronRight size={20} />
          </NavButton>
        </MonthNavigation>
        
        <DaysHeader>
          <DayLabel>MON</DayLabel>
          <DayLabel>TUE</DayLabel>
          <DayLabel>WED</DayLabel>
          <DayLabel>THU</DayLabel>
          <DayLabel>FRI</DayLabel>
          <DayLabel>SAT</DayLabel>
          <DayLabel>SUN</DayLabel>
        </DaysHeader>
        
        <DaysGrid>
          {renderCalendarDays()}
        </DaysGrid>
      </CalendarWrapper>

      {selectedDateObj && (
        <TimeSelectionWrapper>
          <TimeSelectionHeader>
            <h3>Available Times</h3>
            <TimeZoneSelector>
              <Globe size={16} />
              <select 
                value={timeZone} 
                onChange={(e) => setTimeZone(e.target.value)}
              >
                <option value={timeZone}>{timeZone.replace('_', ' ')}</option>
              </select>
            </TimeZoneSelector>
          </TimeSelectionHeader>
          <div>
            <TimeSelectionFlexible>
              <TimeInputWrapper>
                <TimeInputLabel>Choose a time</TimeInputLabel>
                <TimeInput 
                  type="time" 
                  value={customTime}
                  onChange={(e) => {
                    setCustomTime(e.target.value);
                    handleTimeSelect(e.target.value);
                  }}
                />
              </TimeInputWrapper>

              <TimeZoneDisplay>
                India Standard Time (11:54am)
              </TimeZoneDisplay>
            </TimeSelectionFlexible>
            
            <TimeSlotSuggestions>
              <SuggestionLabel>Or select a suggested time:</SuggestionLabel>
              <TimeSlotsGrid>
                {availableTimeOptions.map(time => (
                  <TimeSlot 
                    key={time} 
                    onClick={() => {
                      setCustomTime(time);
                      handleTimeSelect(time);
                    }}
                    isSelected={selectedTime === time}
                  >
                    {time}
                  </TimeSlot>
                ))}
              </TimeSlotsGrid>
            </TimeSlotSuggestions>
          </div>
        </TimeSelectionWrapper>
      )}
    </CalendarContainer>
  );
};

// Styled Components
const CalendarContainer = styled.div`
  background-color: transparent;
  border-radius: 8px;
  width: 100%;
  font-family: system-ui, -apple-system, sans-serif;
`;

const CalendarHeader = styled.div`
  padding-bottom: 16px;
  
  h2 {
    font-size: 24px;
    font-weight: 600;
    margin: 0;
  }
`;

const CalendarWrapper = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 20px;
`;

const MonthNavigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const NavButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  
  &:focus {
    outline: none;
  }
`;

const MonthYearDisplay = styled.div`
  font-size: 18px;
  font-weight: 500;
`;

const DaysHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 8px;
`;

const DayLabel = styled.div`
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  padding: 4px 0;
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
`;

const DayCell = styled.button<{ isToday?: boolean; isSelected?: boolean; isPast?: boolean }>`
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 14px;
  cursor: ${({ isPast }) => (isPast ? 'not-allowed' : 'pointer')};
  border: none;
  background-color: ${({ isSelected, isToday }) => 
    isSelected 
      ? 'rgba(59, 130, 246, 0.8)' 
      : isToday 
        ? 'rgba(59, 130, 246, 0.3)' 
        : 'transparent'
  };
  color: ${({ isPast }) => (isPast ? 'rgba(255, 255, 255, 0.3)' : 'white')};
  
  &:hover {
    background-color: ${({ isSelected, isPast }) => 
      isPast 
        ? 'transparent' 
        : isSelected 
          ? 'rgba(59, 130, 246, 0.8)' 
          : 'rgba(255, 255, 255, 0.1)'
    };
  }
  
  &:focus {
    outline: none;
  }
`;

const EmptyCell = styled.div`
  height: 36px;
`;

const TimeSelectionWrapper = styled.div`
  margin-top: 20px;
`;

const TimeSelectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  
  h3 {
    font-size: 16px;
    font-weight: 500;
    margin: 0;
  }
`;

const TimeZoneSelector = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  
  svg {
    margin-right: 6px;
  }
  
  select {
    background-color: transparent;
    border: none;
    color: white;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    padding: 4px 0;
    
    &:focus {
      outline: none;
    }
    
    option {
      background-color: #212121;
      color: white;
    }
  }
`;

const TimeSlotsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 12px;
`;

const TimeSlot = styled.button<{ isSelected?: boolean }>`
  padding: 10px;
  border-radius: 6px;
  background-color: ${({ isSelected }) => isSelected ? 'rgba(59, 130, 246, 0.8)' : 'rgba(255, 255, 255, 0.05)'};
  border: 1px solid ${({ isSelected }) => isSelected ? 'rgba(59, 130, 246, 0.8)' : 'rgba(255, 255, 255, 0.1)'};
  color: white;
  text-align: center;
  cursor: pointer;
  
  &:hover {
    background-color: ${({ isSelected }) => isSelected ? 'rgba(59, 130, 246, 0.8)' : 'rgba(255, 255, 255, 0.1)'};
  }
  
  &:focus {
    outline: none;
  }
`;

// New styled components for time selection
const TimeSelectionFlexible = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding: 16px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
`;

const TimeInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TimeInputLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
`;

const TimeInput = styled.input`
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  padding: 8px 10px;
  color: white;
  font-size: 16px;
  width: 120px;
  
  &:focus {
    outline: none;
    border-color: rgba(59, 130, 246, 0.8);
  }
`;

const TimeZoneDisplay = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  gap: 6px;
`;

const TimeSlotSuggestions = styled.div`
  margin-top: 20px;
`;

const SuggestionLabel = styled.p`
  font-size: 14px;
  margin-bottom: 12px;
  color: rgba(255, 255, 255, 0.7);
`;

export default CalendarSelector;