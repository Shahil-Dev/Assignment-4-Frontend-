export const loginUser = async (userData: { email: string; password: string }) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', 
      body: JSON.stringify(userData),
    });

    const result = await response.json();
    console.log("Full API Response:", result);
    console.log("Response Headers:", response.headers);
    console.log("Cookies after login:", document.cookie);

    if (!response.ok) {
      throw new Error(result.message || "Login failed");
    }

    let token = result.token || result.accessToken || (result.data && result.data.token);
    
    if (!token && document.cookie) {
      const cookies = document.cookie.split(';');
      for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'token' || name === 'jwt' || name === 'access_token') {
          token = value;
          console.log(`Token found in cookie (${name}):`, token);
          break;
        }
      }
    }

    return {
      success: true,
      data: result.data || result.user || result,
      token: token,
      message: result.message || "Login successful"
    };
  } catch (error: any) {
    console.error('API Error:', error.message);
    throw error;
  }
};

export const registerUser = async (userData: any) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Registration failed");
    }

    return {
      success: true,
      data: result.data || result.user || result,
      message: result.message || "Registration successful"
    };
  } catch (error: any) {
    console.error('Registration API Error:', error.message);
    throw error;
  }
};