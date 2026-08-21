import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // ユーザー名 sahashi、パスワード 1234 でログイン
        if (username === 'sahashi' && password === '1234') {
            localStorage.setItem('isLoggedIn', 'true');
            navigate('/calendar');
        } else {
            alert('ユーザー名またはパスワードが違います');
        }
    };

    return (
        <div className="login-container" style={{ maxWidth: '400px', margin: '100px auto', padding: '20px' }}>
            <h2>ログイン画面</h2>
            <form onSubmit={handleLogin} className="login-form">
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="text"
                        placeholder="ユーザー名"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ width: '100%', padding: '8px' }}
                        required
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="password"
                        placeholder="パスワード"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ width: '100%', padding: '8px' }}
                        required
                    />
                </div>
                <button type="submit" style={{ width: '100%', padding: '10px', background: '#007bff', color: '#fff' }}>
                    ログイン
                </button>
            </form>
        </div>
    );
}

export default Login;