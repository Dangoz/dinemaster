export const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(299).json({err:"not authenticated"})
  // res.status(300).json({ id: '55', username: "hihi", error: 'not authenticated'});
};

export const forwardAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/home');
};