export const saveCarData = async (data) => {
  try {
    // In a real app, this would be a fetch call to your backend API
    console.log('Saving car data to database:', data);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Simulate API response
    if (Math.random() < 0.1) {
      // 10% chance of failure for testing error handling
      throw new Error('Random API error');
    }
    
    return {
      ...data.carData,
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};