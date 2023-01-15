import { body } from "express-validator";

export const loginValidation = [
  body("email", "Электронная почта должна соответствовать формату name@domain.ru").isEmail(),
  body("password", "Пароль должен содержать не менее 5 символов").isLength({ min: 5 }),
];

export const registerValidation = [
  body("email", "Электронная почта должна соответствовать формату name@domain.ru").isEmail(),
  body("password", "Пароль должен содержать не менее 5 символов").isLength({ min: 5 }),
  body("name", "Имя пользователя должно содержать не менее 3 символов").isLength({ min: 3 }),
  body("avatar").optional(),
];

export const restaurantCreateValidation = [
  body("displayName", "Введите название ресторана").isString(),
  body("logo", "Загрузите логотип ресторана").optional().isString(),
  body("menu", "Составьте меню ресторана").optional().isArray(),
];
