// src/services/api.ts
const LMS_URL = import.meta.env.VITE_LMS_URL; 

interface RegisterPayload {
  // domainName: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}

interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    domainName: string;
    __v: number;
  }
  

export const registerUser = async (payload: RegisterPayload): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${LMS_URL}/api/users/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Registration error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An unknown error occurred' 
    };
  }
};

export const fetchAllUsers = async (): Promise<User[]> => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
  
      const response = await fetch(`${LMS_URL}/api/users/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Add authorization header
        },
        // body: JSON.stringify({ domain }),
      });
  
      if (!response.ok) {
        // Handle specific HTTP errors
        if (response.status === 401) {
          throw new Error('Unauthorized - Please login again');
        }
        if (response.status === 403) {
          throw new Error('Forbidden - You don\'t have permission');
        }
        throw new Error(`Failed to fetch users: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };


  export const deleteUser = async (userId: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
  
      const response = await fetch(`${LMS_URL}/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete user');
      }
  
      return { success: true };
    } catch (error) {
      console.error('Error deleting user:', error);
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to delete user'
      };
    }
  };
  
  export const updateUser = async (
    userId: string,
    userData: {
      name: string;
      email: string;
      role: string;
    }
  ): Promise<{ success: boolean; data?: any; error?: string }> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
  
      const response = await fetch(`${LMS_URL}/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update user');
      }
  
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Error updating user:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to update user'
      };
    }
  };