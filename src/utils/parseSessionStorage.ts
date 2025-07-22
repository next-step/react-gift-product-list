const parseSessionStorage = () => {
  const saved = sessionStorage.getItem('user');
  return saved ? JSON.parse(saved) : null;
};

export default parseSessionStorage;
