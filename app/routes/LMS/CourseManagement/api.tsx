const LMS_URL = import.meta.env.VITE_LMS_URL;

// export async function createCourse(formData: FormData) {
//   try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${LMS_URL}/api/courses/create`, {
//           method: 'POST',
//           headers: {
//               'Authorization': `Bearer ${token}`,
//           },
//           body: formData,
//       });

//       const data = await response.json();
      
//       if (!response.ok) {
//           return { success: false, error: data.message || 'Failed to create course' };
//       }

//       return { success: true, data };
//   } catch (error) {
//       return { 
//           success: false, 
//           error: error instanceof Error ? error.message : 'An unknown error occurred'
//       };
//   }
// }

// export async function fetchAllCourses() {
//   try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${LMS_URL}/api/courses`, {
//           method: 'GET',
//           headers: {
//               'Authorization': `Bearer ${token}`,
//               'Content-Type': 'application/json'
//           }
//       });

//       const data = await response.json();
      
//       if (!response.ok) {
//           return { success: false, error: data.message || 'Failed to fetch courses' };
//       }

//       return { success: true, courses: data.courses };
//   } catch (error) {
//       return { 
//           success: false, 
//           error: error instanceof Error ? error.message : 'Failed to fetch courses'
//       };
//   }
// }

// export async function deleteCourse(courseId: string) {
//   try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${LMS_URL}/api/courses/${courseId}`, {
//           method: 'DELETE',
//           headers: {
//               'Authorization': `Bearer ${token}`,
//           }
//       });

//       const data = await response.json();
      
//       if (!response.ok) {
//           return { success: false, error: data.message || 'Failed to delete course' };
//       }

//       return { success: true };
//   } catch (error) {
//       return { 
//           success: false, 
//           error: error instanceof Error ? error.message : 'Failed to delete course'
//       };
//   }
// }

export interface CourseData {
  _id: string;
  playlistName: string;
  description: string;
  price: string;
  visibility: string;
  classess: string;
  subject: string;
  time: string;
  level: string;
  lectures: string;
  thumbnail?: string;
}

// Create Course
export async function createCourse(formData: FormData) {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${LMS_URL}/api/courses/create`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();
    
    if (!response.ok) {
      return { success: false, error: data.message || 'Failed to create course' };
    }

    return { success: true, data };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
}

// Get All Courses
export async function fetchAllCourses(): Promise<{ success: boolean; courses?: CourseData[]; error?: string }> {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${LMS_URL}/api/courses`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    
    if (!response.ok) {
      return { success: false, error: data.message || 'Failed to fetch courses' };
    }

    return { success: true, courses: data.courses };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to fetch courses'
    };
  }
}

// Update Course
export async function updateCourse(courseId: string, formData: FormData | CourseData) {
  try {
    const token = localStorage.getItem('token');
    const isFormData = formData instanceof FormData;
    
    const response = await fetch(`${LMS_URL}/api/courses/${courseId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        ...(!isFormData && { 'Content-Type': 'application/json' })
      },
      body: isFormData ? formData : JSON.stringify(formData)
    });

    const data = await response.json();
    
    if (!response.ok) {
      return { success: false, error: data.message || 'Failed to update course' };
    }

    return { success: true, data };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to update course'
    };
  }
}

// Delete Course
export async function deleteCourse(courseId: string) {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${LMS_URL}/api/courses/${courseId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });

    const data = await response.json();
    
    if (!response.ok) {
      return { success: false, error: data.message || 'Failed to delete course' };
    }

    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to delete course'
    };
  }
}