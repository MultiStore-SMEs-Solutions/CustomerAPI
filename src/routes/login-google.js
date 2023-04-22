const { Router } = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const jwt = require("jsonwebtoken");
const router = Router();

const {
sendEmail
} = require("../controllers/htmlMessageMail/sendActivationEmail");
const { User } = require("..//db");
const { generateSecret } = require("./../controllers/HashFunction/security");

let user = {};

passport.use(
  new GoogleStrategy(
    {
      //! mis credentials desde google auth - proces.env

      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.GOOOGLE_CALLBACK_URL_LOCAL || process.env.GOOOGLE_CALLBACK_URL_DEPLOY,

      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      return done(null, profile);

      // todo aca se puede capturar y guardar en la bd
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return done(err, user);
      // });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    // ! ruta del front que redirija al login
    failureRedirect: "/auth/failure",
  }),
  function (req, res) {
    //! guardamos la data de la sesion para enviar al front
    
    user = req.user;
    const payload = {
      userId: user.id,
      username: user.displayName,
      email: user.emails[0].value,
    };
    const secretOrPrivateKey = "mi_clave_secreta_123";
    const token = jwt.sign(payload, secretOrPrivateKey);
    //todo ruta del front para el boton

    try {
      const processUserLogin = async (user) => {
        const findUser = async (user) => {
          const result = await User.findAll({ where: { email: user.email } });
          return result;
        };
        const result = await findUser(user);

        const createUser = async (user) => {
          await User.create({
            name: user.given_name,
            last_name: user.family_name,
            account_name: `${user.given_name.at(0)}${user.family_name}`,
            email: user.email,
            secret: generateSecret(),
            profile_image: user.photos[0].value,
          });
        };

        if (!result.length) {
          createUser(user);
          sendEmail(user.email);
        }

      };
      processUserLogin(user);
    } catch (error) {
      console.log(error.message);
      return error.message;
    }

    const userDataQuery = JSON.stringify({
      userName: user.displayName,
      photo: user.photos[0].value,
      id: user.id,
      email: user.email,
    });


    //let redirect = `http://localhost:3000/?user=`;
    let redirect = `https://spacefood.up.railway.app/?user=`;


    
    res.redirect(`${redirect}${userDataQuery}`);
  }
);

router.get("/google_user", (req, res) => {
  const accessToken = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      provider: "google",
    },
    "aquivaeltoken",
    { expiresIn: "3d" }
  );

  const { password, ...others } = user._doc;
  //! con use efect para realizar el cargue de la info al front

  res.send(user);
});

router.get("/failure", (req, res) => {
  res.send("Error en la autenticacion");
});

module.exports = router;
