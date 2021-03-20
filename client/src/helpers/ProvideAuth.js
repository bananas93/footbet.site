import { createContext, useState } from 'react';

export default function ProvideAuth({ children }) {
  const [user, setUser] = useState(false);
  const handleLogin = () => {
    setUser(true);
  };
  const AuthContext = createContext(user);
  return (
    <AuthContext.Provider handleLogin={handleLogin} value={user}>
      {children}
    </AuthContext.Provider>
  );
}
