const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const GithubStrategy = require('passport-github2');
const { useValidPassword } = require('../utils/cryp-password.util');
const { ghClientId, ghClientSecret } = require('./app.config');
const NewUserDto = require('../DTO/new-user.dto');
const UserService = require('../services/user.service');
const UserModel = require('../DAO/models/user.model');

const initializePassport = () => {
    passport.use(
        'register',
        new localStrategy(
            { passReqToCallback: true, usernameField: 'email' },
            async (req, username, password, done) => {
                try {
                    const existingUser = await UserModel.findOne({ email: username });
                    if (existingUser) {
                        console.log('El correo electrónico ya está registrado.');
                        return done(null, false);
                    }

                    const newUser = new NewUserDto(req.body, password);
                    const createdUser = await UserService.createUser(newUser);
                    return done(null, createdUser);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );

    passport.use(
        'login',
        new localStrategy({ usernameField: 'email' }, async (username, password, done) => {
            try {
                const user = await UserModel.findOne({ email: username });
                if (!user) {
                    console.log('Usuario o contraseña incorrectos.');
                    return done(null, false);
                }
                if (!useValidPassword(user, password)) {
                    console.log('Usuario o contraseña incorrectos.');
                    return done(null, false);
                }
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        })
    );

    passport.use(
        'github',
        new GithubStrategy(
            {
                clientID: ghClientId,
                clientSecret: ghClientSecret,
                callbackURL: 'http://localhost:8080/api/auth/githubcallback',
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    const { id, login, name, email } = profile._json;
                    let user = await UserModel.findOne({ email });

                    if (!user) {
                        const newUserInfo = {
                            first_name: name,
                            email,
                            githubId: id,
                            githubUsername: login,
                        };

                        user = await UserModel.create(newUserInfo);
                    }

                    console.log('Usuario actualizado exitosamente:', user);
                    done(null, user);
                } catch (error) {
                    console.error('Error al procesar la autenticación de GitHub:', error);
                    done(error);
                }
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await UserModel.findById(id, { password: 0 });
            done(null, user);
        } catch (error) {
            done(error);
        }
    });
};

module.exports = initializePassport;

