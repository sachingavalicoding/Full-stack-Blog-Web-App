export const validateUser = (req, res, next) => {
    const { username, email, phoneNumber } = req.body;
  
    if (!username || !email || !phoneNumber) {
      return res.status(400).json({ error: 'All fields (username, email, phone number) are required!' });
    }
  
    next(); // If validation passes, move to the next middleware or route handler
  };
  