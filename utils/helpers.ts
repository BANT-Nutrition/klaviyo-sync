const fs = require("fs");

export const parseDateOrNull = (dateString: string | Date) => {
  try {
    if (dateString === "-") return null;
    return dateString ? new Date(dateString) : null;
  } catch (error) {
    return null;
  }
};

export function appendToFile(data: string, filePath: string) {
  fs.appendFile(filePath, data, (err: any) => {
    if (err) {
      console.error("Error appending to file:", err);
    } else {
      console.log("Data appended to file successfully.");
    }
  });
}
