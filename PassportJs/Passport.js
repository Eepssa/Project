const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const ejs = require('ejs');

const app = express();

// Configure Passport
passport.use(new LocalStrategy(
  { usernameField: 'email' },
  (email, password, done) => {
    // Replace this with your actual authentication logic
    if (email === 'abc@gmail.com' && password === 'abc123') {
      return done(null, { email: email });
    } else {
      return done(null, false, { message: 'Incorrect email or password.' });
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser((email, done) => {
  // In a real app, this would fetch user details from a database
  done(null, { email: email });
});

app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  res.render('login');
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/',
}));

app.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('dashboard', { user: req.user });
});

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
