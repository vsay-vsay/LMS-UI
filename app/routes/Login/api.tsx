export async function loginUser(credentials: { email: string; password: string; domainName: string}) {
    const LMS_URL = import.meta.env.VITE_LMS_URL; // For Vite
    // const LMS_URL = process.env.REACT_APP_LMS_URL; // For Create React App
  
    if (!LMS_URL) {
      throw new Error('LMS_URL is not defined in environment variables');
    }
  
    const response = await fetch(`${LMS_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
  
    if (!response.ok) {
      throw new Error('Login failed');
    }
  
    return response.json();
  }


  export async function verifyDomain(credentials: { domainName: string }) {
    const LMS_URL = import.meta.env.VITE_LMS_URL; // For Vite
    // const LMS_URL = process.env.REACT_APP_LMS_URL; // For Create React App
  
    if (!LMS_URL) {
      throw new Error('LMS_URL is not defined in environment variables');
    }
  
    const response = await fetch(`${LMS_URL}/api/domain/check-domain`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
  
    if (!response.ok) {
      throw new Error('Login failed');
    }
  
    return response.json();
  }
  