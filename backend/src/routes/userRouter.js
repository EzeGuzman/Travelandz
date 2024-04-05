import express from 'express';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { generateToken } from '../../utils/utilsRouter.js';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

const userRouter = express.Router();

// Inicio de Sesión de Usuarios
userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const { name, password } = req.body;
    const user = await User.findOne({ name });

    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).send({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user),
      });
    } else {
      res
        .status(401)
        .send({ message: 'Nombre de usuario o contraseña incorrectos' });
    }
  })
);

// Registro de Usuarios
userRouter.post(
  '/signup',
  expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ name });
    const one = User.f;

    if (existingUser) {
      return res
        .status(400)
        .send({ message: 'El nombre de usuario ya está en uso' });
    }

    const newUser = new User({
      name,
      email,
      emailToken: crypto.randomBytes(64).toString('hex'),
      password: bcrypt.hashSync(password, 8),
    });

    const createdUser = await newUser.save();

    // Envío de correo electrónico de verificación
    sendVerificationEmail(createdUser, req.headers.host);

    res.status(201).send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      token: generateToken(createdUser),
    });
  })
);

// Función para enviar correo electrónico de verificación
const sendVerificationEmail = async (user, host) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: false,
    auth: {
      user: 'guzmanezequielm@gmail.com',
      pass: 'akezrjywixkzhepp',
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: ' "TravelTest" <guzmanezequielm@gmail.com> ',
    to: user.email,
    subject: 'Bienvenido a TravelTest Usuario Navegante! :)',
    html: `
      <div style="max-width: 600px; padding: 10px; margin: 0 auto">
        <div style="padding: 1.5rem 0; background: #070f2b; display: flex; justify-content: center!important; box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.5);">
          <img style="padding: 0; display: block" src="https://common-front-apimanager-storage-live.s3.amazonaws.com/images/simbolo-logo-apitude.png" width="20%" />
        </div>
        <div style="background-color: #fff; color: #000000; margin: 4% 10% 2%; text-align: justify; font-family: sans-serif;">
          <h2 style="color: #222d65; margin: 0 0 7px">Hola ${user.name}!</h2>
          <h4 style="color: #00000065">Tu cuenta ha sido registrada con éxito!</h4>
          <p style="margin: 2px; font-size: 15px">
            Tu cuenta ha sido registrada con éxito y para poder proseguir con el registro es necesario realizar una verificación para comprobar que no eres un robot.<br /><br />
            Gracias por confiar en nosotros<br />
          </p>
          <div style="width: 100%; margin: 20px 0; display: inline-block; text-align: center;"></div>
          <div style="width: 100%; text-align: center">
            <a style="text-decoration: none; border-radius: 5px; padding: 11px 23px; color: white; background-color: #3498db;" href="https://${host}/api/user/verify-email?token=${user.emailToken}">Verificar mi cuenta</a>
          </div>
          <p style="color: #b3b3b3; font-size: 12px; text-align: center; margin: 30px 0 0;">TravelTest - 2024</p>
        </div>
      </div>
    `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('El email de verificación se envió a su cuenta de gmail');
    }
  });
};

// Verificación de Usuarios
userRouter.get(
  '/verify-email',
  expressAsyncHandler(async (req, res) => {
    try {
      const { token } = req.query;
      const user = await User.findOneAndUpdate(
        { emailToken: token },
        { $unset: { emailToken: 1 }, $set: { verified: true } }
      );
      if (user) {
        res.redirect('https://travelandztest.netlify.app/auth');
      } else {
        res.redirect('https://travelandztest.netlify.app/register');
        console.log('Email no verificado');
      }

      // Envío de correo electrónico de verificación
      sendVerificationEmail(user, 'travelandz-backend.onrender.com');
    } catch (error) {
      console.error('Error en la verificación de correo electrónico:', error);
      res.status(500).send('Error en la verificación de correo electrónico');
    }
  })
);

// Actualización de Usuarios
userRouter.put(
  '/update/:_id',
  expressAsyncHandler(async (req, res) => {
    const { _id } = req.params;
    const { name, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { name, email },
      { new: true }
    );
    res.send(
      updatedUser ? `${updatedUser.name} actualizado` : 'Usuario no encontrado'
    );
  })
);

// Actualización de contraseña de Usuarios
userRouter.put(
  '/change-password',
  expressAsyncHandler(async (req, res) => {
    const { userId, newPassword } = req.body;
    try {
      const user = await User.findById(userId);
      if (!user) {
        res.status(404).send({ message: 'Usuario no encontrado' });
        return;
      }
      user.password = bcrypt.hashSync(newPassword, 8);
      await user.save();
      res.status(200).send({ message: 'Contraseña actualizada exitosamente' });
    } catch (error) {
      console.error('Error updating password:', error);
      res.status(500).send({ message: 'Error al actualizar la contraseña' });
    }
  })
);

// Envío de correo electrónico para cambiar la contraseña
userRouter.post(
  '/change-password-email',
  expressAsyncHandler(async (req, res) => {
    const { userId, userEmail } = req.body;
    try {
      const user = await User.findById(userId);
      if (!user) {
        res.status(404).send({ message: 'Usuario no encontrado' });
        return;
      }

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: false,
        auth: {
          user: 'guzmanezequielm@gmail.com',
          pass: 'akezrjywixkzhepp',
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      const mailOptions = {
        from: '"TravelTest" <guzmanezequielm@gmail.com>',
        to: userEmail,
        subject: 'Cambio de Contraseña',
        html: `
          <div style="max-width: 600px; padding: 10px; margin: 0 auto">
            <div style="padding: 1.5rem 0; background: #070f2b; display: flex; justify-content: center!important; box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.5);">
              <img style="padding: 0; display: block" src="https://common-front-apimanager-storage-live.s3.amazonaws.com/images/simbolo-logo-apitude.png" width="20%" />
            </div>
            <div style="background-color: #fff; color: #000000; margin: 4% 10% 2%; text-align: justify; font-family: sans-serif;">
              <h2 style="color: #222d65; margin: 0 0 7px">Hola ${user.name}!</h2>
              <h4 style="color: #00000065">Haz solicitado cambiar tu contraseña</h4>
              <p style="margin: 2px; font-size: 15px">
                Recibiste este correo electrónico porque solicitaste un cambio de contraseña en tu cuenta de TravelTest. Haz clic en el siguiente enlace para continuar:
              </p>
              <div style="width: 100%; margin: 20px 0; display: inline-block; text-align: center;">
                <a style="text-decoration: none; border-radius: 5px; padding: 11px 23px; color: white; background-color: #3498db;" href="https://travelandztest.netlify.app/reset-password/${userId}">Cambiar Contraseña</a>
              </div>
              <p style="color: #b3b3b3; font-size: 12px; text-align: center; margin: 30px 0 0;">TravelTest - 2024</p>
            </div>
          </div>
        `,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.error('Error sending change password email:', error);
          res.status(500).send({
            message:
              'Error al enviar el correo electrónico para cambiar la contraseña',
          });
        } else {
          console.log('Correo electrónico enviado para cambiar la contraseña');
          res.status(200).send({
            message: 'Correo electrónico enviado para cambiar la contraseña',
          });
        }
      });
    } catch (error) {
      console.error('Error sending change password email:', error);
      res.status(500).send({
        message:
          'Error al enviar el correo electrónico para cambiar la contraseña',
      });
    }
  })
);

// Restablecimiento de contraseña
userRouter.post(
  '/reset-password-request',
  expressAsyncHandler(async (req, res) => {
    const { email } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        res.status(404).send({ message: 'Usuario no encontrado' });
        return;
      }
      // Envío de correo electrónico para restablecer la contraseña
      sendResetPasswordEmail(user);
      res.status(200).send({
        message: 'Correo electrónico enviado para restablecer la contraseña',
      });
    } catch (error) {
      console.error(
        'Error al enviar la solicitud para restablecer la contraseña:',
        error
      );
      res.status(500).send({
        message: 'Error al enviar la solicitud para restablecer la contraseña',
      });
    }
  })
);

// Función para enviar correo electrónico de restablecimiento de contraseña
const sendResetPasswordEmail = async (user) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: false,
    auth: {
      user: 'guzmanezequielm@gmail.com',
      pass: 'akezrjywixkzhepp',
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: ' "TravelTest" <guzmanezequielm@gmail.com> ',
    to: user.email,
    subject: 'Restablecimiento de Contraseña',
    html: `
    <div style="max-width: 600px; padding: 10px; margin: 0 auto">
    <p>Hola ${user.name},</p>
    <p>Recibiste este correo electrónico porque solicitaste restablecer la contraseña de tu cuenta en TravelTest. Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
    <a href="https://travelandztest.netlify.app/reset-password/${user._id}">Restablecer Contraseña</a>
    <p>Si no solicitaste restablecer tu contraseña, puedes ignorar este correo electrónico.</p>
    <p>Gracias,</p>
    <p>El equipo de TravelTest</p>
  </div>
  
    `,
  };
};

//Obtención de Usuario (Uno solo)
userRouter.get(
  '/get/:_id',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params._id);
    res.status(200).send(user);
  })
);

// Eliminación de Usuarios
userRouter.post(
  '/delete',
  expressAsyncHandler(async (req, res) => {
    const { _id } = req.body;
    const deletedUser = await User.findOneAndDelete({ _id });
    res.send(deletedUser ? 'Usuario eliminado' : 'Usuario no encontrado');
  })
);

export default userRouter;
