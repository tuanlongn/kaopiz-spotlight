const getAllKeys = () => {
  const numberOfKeys = localStorage.length;
  const keys = [];
  for (let i = 0; i < numberOfKeys; i += 1) {
    const key = localStorage.key(i);
    keys.push(key);
  }
  return keys;
};

const set = (key, val) => {
  try {
    localStorage.setItem(key, JSON.stringify(val));
    return true;
  } catch (e) {
    console.log(`storage:set -> key:${key} error`, e.message);
    return false;
  }
};

const get = (key) => {
  try {
    const val = localStorage.getItem(key);
    return JSON.parse(val);
  } catch (e) {
    console.log(`storage:get -> key:${key} error`, e.message);
    return null;
  }
};

const multiSet = (obj) => {
  const keys = [];
  try {
    Object.keys(obj).forEach((key) => {
      localStorage.setItem(key, JSON.stringify(obj[key]));
    });
    return true;
  } catch (e) {
    console.log(
      `storage:multiSet -> keys:[${keys.join(",")}] error`,
      e.message
    );
    return false;
  }
};

const multiGet = (keys) => {
  try {
    const result = {};
    keys.forEach((key) => {
      const val = localStorage.getItem(key);
      result[key] = JSON.parse(val);
    });
    return result;
  } catch (e) {
    console.log(
      `storage:multiGet -> keys:[${keys.join(",")}] error`,
      e.message
    );
    return false;
  }
};

const remove = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (e) {
    console.log(`storage:remove -> key:${key} error`, e.message);
    return false;
  }
};

const multiRemove = (keys) => {
  try {
    keys.forEach((key) => localStorage.removeItem(key));
    return true;
  } catch (e) {
    console.log(
      `storage:multiRemove -> keys:[${keys.join(",")}] error`,
      e.message
    );
    return false;
  }
};

const removeKeyContains = (str) => {
  try {
    const allKeys = getAllKeys();
    const keys = allKeys.filter((key) => key.indexOf(str) >= 0);
    return multiRemove(keys);
  } catch (e) {
    console.log(`storage:removeKeyContains -> key:str error`, e.message);
    return false;
  }
};

export default {
  getAllKeys,
  set,
  get,
  remove,
  multiGet,
  multiSet,
  multiRemove,
  removeKeyContains,
};
