export interface User {
  id: string;
  email: string;
  name: string;
  verified: boolean;
}

export function setAuthToken(token: string) {
  localStorage.setItem('authToken', token);
}

export function getAuthToken(): string | null {
  return localStorage.getItem('authToken');
}

export function removeAuthToken() {
  localStorage.removeItem('authToken');
}

export function getCurrentUser(): User | null {
  const userStr = localStorage.getItem('currentUser');
  if (!userStr) return null;
  
  try {
    const user = JSON.parse(userStr);
    return user;
  } catch {
    return null;
  }
}

export function setCurrentUser(user: User) {
  localStorage.setItem('currentUser', JSON.stringify(user));
}

export function removeCurrentUser() {
  localStorage.removeItem('currentUser');
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}

export function validatePassword(password: string): { isValid: boolean; message: string } {
  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters long' };
  }
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one uppercase letter' };
  }
  if (!/[a-z]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one lowercase letter' };
  }
  if (!/[0-9]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one number' };
  }
  if (!/[!@#$%^&*]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one special character (!@#$%^&*)' };
  }
  return { isValid: true, message: 'Password meets requirements' };
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}