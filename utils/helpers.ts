export const parseDateOrNull = (dateString: string | Date) => {
  try {
    if (dateString === '-') return null
    return dateString ? new Date(dateString) : null;
  } catch (error) {
    return null;
  }
};
