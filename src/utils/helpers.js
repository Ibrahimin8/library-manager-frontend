import { format, addDays, parseISO, isPast, differenceInDays } from 'date-fns';

export const formatDate = (date, formatStr = 'MMM dd, yyyy') => {
  if (!date) return 'N/A';
  try {
    return format(new Date(date), formatStr);
  } catch {
    return 'Invalid Date';
  }
};

export const calculateDueDate = (days = 14) => {
  return addDays(new Date(), days);
};

export const isOverdue = (dueDate) => {
  if (!dueDate) return false;
  return isPast(new Date(dueDate));
};

export const daysOverdue = (dueDate) => {
  if (!dueDate) return 0;
  return Math.max(0, differenceInDays(new Date(), new Date(dueDate)));
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^[\+]?[1-9][\d]{0,15}$/;
  return re.test(phone.replace(/[\s\-\(\)]/g, ''));
};