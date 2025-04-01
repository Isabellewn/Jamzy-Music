import { useState } from 'react';
import { useActionState } from 'react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [formStatus, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      try {
        const userEmail = formData.get('userEmail');
        const response = await fetch('/api/v1/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userEmail }), 
        });

        const data = await response.json();
        console.log(data);

        setIsLoggedIn(true);

        return 'success';
      } catch (e) {
        console.error(e);
        return 'fail';
      }
    },
    'unsubmitted'
  );

  return (
    <div className="login-modal-overlay">
      <div className="login-modal">
        <h3>Login Required</h3>
        <p>Please enter your email to continue:</p>

        <form action={formAction}>
          {!isLoggedIn? (
            <input 
            type="email"
            className="login-input"
            name="userEmail"
            value={email}
            placeholder="Your email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />):(
            <p>You are logged in!</p>
          )}

          <div className="login-buttons">
            <button type="submit" className="login-submit-btn" disabled={isPending}>
              {isPending ? "Logging in..." : "Login"}
            </button>
            <button type="button" className="close-btn" onClick={onLogin}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
