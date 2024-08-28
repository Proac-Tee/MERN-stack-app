export const calculateStartDate = (range: string): Date | null => {
  const currentDate = new Date();
  let startDate = null;

  switch (range) {
    case "Last week":
      startDate = new Date(currentDate);
      startDate.setDate(currentDate.getDate() - 7);
      break;
    case "Last Month":
      startDate = new Date(currentDate);
      startDate.setMonth(currentDate.getMonth() - 1);
      break;
    case "Last 2months":
      startDate = new Date(currentDate);
      startDate.setMonth(currentDate.getMonth() - 2);
      break;
    case "Last 6months":
      startDate = new Date(currentDate);
      startDate.setMonth(currentDate.getMonth() - 6);
      break;
    default:
      break;
  }

  return startDate;
};
