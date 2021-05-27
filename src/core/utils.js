export const emailValidator = (email) => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) {
    return 'Email cannot be empty.';
  }
  if (!re.test(email)) {
    return 'Ooops! We need a valid email address.';
  }

  return '';
};

export const passwordValidator = (password) => {
  if (!password || password.length <= 0) {
    return 'Password cannot be empty.';
  }

  return '';
};

export const nameValidator = (name) => {
  if (!name || name.length <= 0) {
    return 'Name cannot be empty.';
  }

  return '';
};

export const dateDisplay = (timestamp) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  return new Date(timestamp).toLocaleDateString('en-GB', options);
};

export const numericDate = (timestamp) => {
  const options = {
    // year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };

  return new Date(timestamp).toLocaleDateString('en-GB', options);
};

export const timeDisplay = (timestamp) => {
  const options = {
    hour: 'numeric',
    minute: 'numeric',
  };

  return new Date(timestamp).toLocaleTimeString('en-US', options);
};

export const getDayName = (dateStr, locale) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale, { weekday: 'short' });
};

export const getMonday = () => {
  const d = new Date();
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
  const monday = new Date(d.setDate(diff));
  monday.setHours(0, 0, 0, 0);
  return monday;
};

export const getDateString = (date) => {
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let dt = date.getDate();

  if (dt < 10) {
    dt = '0' + dt;
  }
  if (month < 10) {
    month = '0' + month;
  }
  return `${year}-${month}-${dt}`;
};

export const isToday = (someDate) => {
  const today = new Date();
  return (
    someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
  );
};

const daysDiff = (date) => {
  const now = new Date();

  const timeDiff = now.getTime() - date.getTime();
  return Math.round(timeDiff / (1000 * 3600 * 24));
};

export const dateTimeDisplay = (dateTime) => {
  const date = new Date(dateTime);

  if (isToday(date)) {
    return `Today, ${date.toLocaleTimeString('en-GB', {
      hour: 'numeric',
      minute: 'numeric',
    })}`;
  }

  const daysBetween = daysDiff(date);

  if (daysBetween === 1) {
    return `Yesterday, ${date.toLocaleTimeString('en-GB', {
      hour: 'numeric',
      minute: 'numeric',
    })}`;
  }

  if (daysBetween < 7) {
    return `${date.toLocaleTimeString('en-GB', {
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
    })}`;
  }

  const options = {
    hour: 'numeric',
    minute: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };

  return date.toLocaleDateString('en-GB', options);
};

export const sameDay = (d1Str, d2Str) => {
  const d1 = new Date(d1Str);
  const d2 = new Date(d2Str);
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};
