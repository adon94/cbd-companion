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

  return new Date(timestamp).toLocaleDateString('en-US', options);
};

export const timeDisplay = (timestamp) => {
  const options = {
    hour: 'numeric',
    minute: 'numeric',
  };

  return new Date(timestamp).toLocaleTimeString('en-US', options);
};
