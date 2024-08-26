export const formatDate = (dateString: string | Date): string => {
  const dateObject = new Date(dateString);
  return dateObject.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
