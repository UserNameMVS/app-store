export function generateAuthError(error) {
  switch (error) {
  case 'EMAIL_EXISTS':
    return 'Пользователь с таким email уже существует'
  case 'INVALID_PASSWORD':
    return 'Email или пароль введены некорректно'
  case 'EMAIL_NOT_FOUND':
    return 'Email или пароль введены некорректно'

  default:
    return 'Слишком много попыток входа. Попробуйте позднее'
  }
}