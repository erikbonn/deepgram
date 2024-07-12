// finds any character that is not an alphanumeric character and replaces with underscores
export const sanitizeFileName = (fileName: string): string => {
  return fileName.replace(/[^a-z0-9]/gi, "_").toLowerCase();
};
