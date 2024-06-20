//import Togglable from '../components/Togglable.js';
import LoginForm from "./LoginForm.jsx";

export default function LoginView({ handleLogin, user }) {
  console.log(user);
  return (
    <div className="bg-custom-gradient">
        <LoginForm handleSubmit={handleLogin} />
    </div>
  );
}
