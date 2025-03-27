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
  

  
  useEffect(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimeZone(timezone);
  }, []);

  
  useEffect(() => {
    if (selectedDate) {
      setSelectedDateObj(new Date(selectedDate));
    }
  }, [selectedDate]);

  
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  
  const formatMonthYear = (date: Date) => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  
  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  
  const isSelected = (date: Date) => {
    if (!selectedDateObj) return false;
    return date.getDate() === selectedDateObj.getDate() &&
      date.getMonth() === selectedDateObj.getMonth() &&
      date.getFullYear() === selectedDateObj.getFullYear();
  };

  
  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    return date < today;
  };

 
const handleDateSelect = (day: number) => {
  const selected = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
  if (isPastDate(new Date(selected))) return;
  
  setSelectedDateObj(selected);
  
  
  const year = selected.getFullYear();
  const month = String(selected.getMonth() + 1).padStart(2, '0');
  const dayOfMonth = String(selected.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${dayOfMonth}`;
  
  onDateSelect(formattedDate);
};

 
  const handleTimeSelect = (time: string) => {
    onTimeSelect(time);
  };

  
  const renderCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    
    const firstDayAdjusted = firstDay === 0 ? 6 : firstDay - 1;
    
    const days = [];
    
    
    for (let i = 0; i < firstDayAdjusted; i++) {
      days.push(<EmptyCell key={`empty-${i}`} />);
    }
    
   
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
      
      <CalendarGrid>
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

        
        <TimeSelectionWrapper>
        <TimeSelectionHeader>
          <h3>Select a Time</h3>
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
        </div>
        </TimeSelectionWrapper>
      </CalendarGrid>
    </CalendarContainer>
  );
};


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
  
  @media (max-width: 480px) {
    padding-bottom: 12px;
    
    h2 {
      font-size: 20px;
    }
  }
`;

const CalendarWrapper = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 20px;
  
  @media (max-width: 480px) {
    padding: 8px;
    margin-bottom: 16px;
  }
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
  
  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
`;

const DayCell = styled.button<{ isToday?: boolean; isSelected?: boolean; isPast?: boolean }>`
  height: 36px;
  width: 36px;
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
  
  @media (max-width: 480px) {
    height: 32px;
    width: 32px;
    font-size: 12px;
  }
`;

const EmptyCell = styled.div`
  height: 36px;
  width: 36px;
  
  @media (max-width: 480px) {
    height: 32px;
    width: 32px;
  }
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const TimeSelectionWrapper = styled.div`
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
  
  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
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



const TimeSelectionFlexible = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding: 16px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  
  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
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
  
  @media (max-width: 480px) {
    width: 100%;
    max-width: 150px;
    font-size: 14px;
    padding: 6px 8px;
  }
`;

const TimeZoneDisplay = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  gap: 6px;
  
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;


export default CalendarSelector;