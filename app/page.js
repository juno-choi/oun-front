import LoginButton from "./components/LoginButton"; 

export default function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>OAuth 로그인 테스트</h1>
      <LoginButton />
    </div>
  );
}