import { useState, useRef } from 'react';

const loginTitleStyle = {
  fontSize: '1.5em',
  color: 'hsl(0, 0%, 100%)',
  textShadow: '0 0 10px hsl(0, 0%, 100%), 0 0 15px hsl(0, 0%, 100%), 0 0 30px hsl(0, 0%, 100%)',
};

export default function LoginForm({ handleSubmit }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const addUser = (event) => {
    event.preventDefault();
    handleSubmit({
      username,
      password,
    });
    setUsername('');
    setPassword('');
  };
  return (
    <div className='flex h-screen justify-center items-center'>
      <div className='flex justify-center'>
        <div className='flex flex-col gap-4'>
            <div className='flex justify-center'>
              <div style={loginTitleStyle}>Login</div>
            </div>           
            <form className='flex flex-col gap-4 items-center justify-between text-white' onSubmit={addUser}>

              <div className='flex gap-4'>
                username
                <input
                  className='text-black w-48'
                  type="text"
                  value={username}
                  name="username"
                  onChange={({ target }) => setUsername(target.value)}
                />
              </div>

              <div className='flex gap-4'>
                password
                <input
                  className='text-black w-48' 
                  type="password"
                  value={password}
                  name="password"
                  onChange={({ target }) => setPassword(target.value)}
                />
              </div>

              <button className='bg-white h-8 w-16 rounded-md text-black' type="submit">login</button>
            </form>
        </div>
        
      </div>      
    </div>
  );
}
