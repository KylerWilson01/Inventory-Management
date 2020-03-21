module.exports = function randomSalt(length) {
  const vals = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-=!@#$%^&*()_+.,';[]{}"

  let random = ''
  for (let i = 0; i < length; i++) {
    random += vals.charAt(Math.floor(Math.random() * vals.length))
  }

  return random
}