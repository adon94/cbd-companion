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
