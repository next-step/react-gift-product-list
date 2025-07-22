const parseUserFromSessionStorage = (key: string) => {
  const saved = sessionStorage.getItem(key);
  return saved ? JSON.parse(saved) : null;
};

export default parseUserFromSessionStorage;
