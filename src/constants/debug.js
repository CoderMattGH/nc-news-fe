let DEBUG;
if (process.env.NODE_ENV === 'development')
  DEBUG = 1;
else
  DEBUG = 0;

export default DEBUG;