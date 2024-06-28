import loginHandler from "@/api/login/login";

export default function Login() {
  return (
    <div>
      <form action={loginHandler}>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}