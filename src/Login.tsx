import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Login: React.FC = () => 
{
    const { loginWithToken, login } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [failedTokenAuth, setFailedTokenAuth] = useState(false);

    useEffect(() => {
        (async function() {
            const success = await loginWithToken();
            if(success)
            {
                navigate('/hello');
            }
            else
            {
                setFailedTokenAuth(true);
            }
        })();
    }, []);

    const handleLogin = async (e: React.FormEvent) => 
    {
        e.preventDefault();
        const success = await login(username, password);
        if (success) 
        {
          navigate('/hello');
          setError('');
        } 
        else 
        {
          setError('Invalid username or password');
        }
    };

    return (
    <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700">
        {failedTokenAuth && (
        <div className="p-4 sm:p-7">
            <div className="mt-5">
                <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">{error}</p>
                <form onSubmit={handleLogin}>
                    <div className="grid gap-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm mb-2 dark:text-white">Username</label>
                            <div className="relative">
                                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" required />
                            </div>
                            <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
                        </div>

                        <div>
                            <div className="flex justify-between items-center">
                                <label htmlFor="password" className="block text-sm mb-2 dark:text-white">Password</label>
                                <a className="inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500" href="../examples/html/recover-account.html">Forgot password?</a>
                            </div>
                            <div className="relative">
                                <input type="password" id="password" name="password"  value={password}
                                    onChange={(e) => setPassword(e.target.value)} className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" required aria-describedby="password-error" />
                                <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                                    <svg className="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                                    </svg>
                                </div>
                            </div>
                            <p className="hidden text-xs text-red-600 mt-2" id="password-error">8+ characters required</p>
                        </div>

                        <div className="flex items-center">
                            <div className="flex">
                                <input id="remember-me" name="remember-me" type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" />
                            </div>
                            <div className="ms-3">
                                <label htmlFor="remember-me" className="text-sm dark:text-white">Remember me</label>
                            </div>
                        </div>
                        <button type="submit" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">Sign in</button>
                    </div>
                </form>
            </div>
        </div>
        )}
    </div>        
        
    );
};

export default Login;