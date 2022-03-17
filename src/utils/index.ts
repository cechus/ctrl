export const formatDate = (date: string | null) => {
  if (!date) return null;
  const options: any = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour12: false,
  };
  return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
};
export const formatOnlyDate = (date: string | null) => {
  if (!date) return null;
  const options: any = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
};
export const formatTime = (date: string | null) => {
  if (!date) return null;
  const options: any = {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };
  return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
};
export const formatSeconds = (seconds: number): any => {
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds - hours * 3600) / 60);
  let sec = seconds - hours * 3600 - minutes * 60;
  return {
    hours,
    minutes,
    seconds: sec,
  };
};
