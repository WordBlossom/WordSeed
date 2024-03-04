export function dateForm(date?: string) {
  if (date) return date.substring(0, 10);
  const dateInstance = date ? new Date(date) : new Date();
  const year = String(dateInstance.getFullYear()); // 뒤의 2자리만 가져오기 위해 slice 사용
  const month = String(dateInstance.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1, 두 자리로 만들기 위해 padStart 사용
  const day = String(dateInstance.getDate()).padStart(2, "0"); // 두 자리로 만들기 위해 padStart 사용
  return `${year}-${month}-${day}`;
}

export const todaysDate = dateForm();
