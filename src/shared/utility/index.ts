export * from './types/formRef'
export * from './types/formStore'

export const removeObjEmptyProp = (obj: any) => {
  for (const key in obj) {
    if (Reflect.has(obj, key)) { 
      if (obj[key] === null || obj[key] === "") {
        if(typeof obj[key] !== "boolean"){
          delete obj[key];
        }
      }
    }
  }
  return obj;
};

export const dateEngFormat = (date: any) => {
  if (!date) return null;

  const d = typeof date === "string" ? new Date(date) : date;

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}