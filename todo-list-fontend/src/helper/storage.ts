
export const expand_key = "isExpand";
const storage = {
  set:  <T>(key: string,value: T) =>{ 
    localStorage.setItem(key,JSON.stringify(value));
  },
  get: <T>(key: string) : T=>  {
    const value = localStorage.getItem(key);

    return value ? JSON.parse(value) : "";
  }
};

export default storage;