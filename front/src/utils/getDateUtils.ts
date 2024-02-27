const currentDate = new Date();
const year = String(currentDate.getFullYear()).slice(-2); // 뒤의 2자리만 가져오기 위해 slice 사용
const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1, 두 자리로 만들기 위해 padStart 사용
const day = String(currentDate.getDate()).padStart(2, "0"); // 두 자리로 만들기 위해 padStart 사용

export const todaysDate = `${year}-${month}-${day}`;
