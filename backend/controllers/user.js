const prisma = require('../prisma/prismaClient')
const asyncHandler = require('express-async-handler')
const CustomError = require('../errors/customError')

const getUser = asyncHandler(async (req, res) => {
  const user = req.user
  if (!user) throw new CustomError('Unauthorized: user not authenticated', 401)

  const usernameParam = req.params.username
  if (!usernameParam) throw new CustomError('Invalid username', 403)

  const userProfile = await prisma.user.findUnique({
    where: { username: usernameParam },
    select: {
      username: true,
      email: true,
      hemophiliaType: true,
      hemophiliaSeverity: true,
      medicineType: true,
      dosageAmount: true,
      dosageFrequency: true,
      profilePic: true,
      createdAt: true
    }
  })

  if (!userProfile) throw new CustomError('User profile not found', 404)

  res.status(200).json({
    success: true,
    message: 'User profile fetched',
    data: userProfile
  })
})

const editUser = asyncHandler(async (req, res) => {
  const user = req.user
  if (!user) throw new CustomError('Unauthorized: user not authenticated', 401)

  const usernameParam = req.params.username
  if (!usernameParam) throw new CustomError('Invalid username', 403)

  const userProfile = await prisma.user.findUnique({ where: { username: usernameParam } })
  if (!userProfile) throw new CustomError('User profile not found', 404)

  if (userProfile.id !== user.id) throw new CustomError('Unauthorized: users can only update their own profile', 403)

  const { username, email, hemophiliaType, hemophiliaSeverity, medicineType, dosageAmount, dosageFrequency, profilePic } = req.body
  if (!username || !email) throw new CustomError('Username and email cannot be empty', 400)

  const updatedProfile = await prisma.user.update({
    where: { username: usernameParam },
    data: { username, email, hemophiliaType, hemophiliaSeverity, medicineType, dosageAmount, dosageFrequency, profilePic },
    select: {
      username: true,
      email: true,
      hemophiliaType: true,
      hemophiliaSeverity: true,
      medicineType: true,
      dosageAmount: true,
      dosageFrequency: true,
      profilePic: true,
      createdAt: true
    }
  })

  res.status(200).json({
    success: true,
    message: 'User profile updated',
    data: updatedProfile
  })
})

const deleteUser = asyncHandler(async (req, res) => {
  const user = req.user
  if (!user) throw new CustomError('Unauthorized: user not authenticated', 401)

  const usernameParam = req.params.username
  if (!usernameParam) throw new CustomError('Invalid username', 403)

  const userProfile = await prisma.user.findUnique({ where: { username: usernameParam } })
  if (!userProfile) throw new CustomError('User profile not found', 404)

  if (userProfile.id !== user.id) throw new CustomError('Unauthorized: users can only delete their own profile', 403)

  await prisma.user.delete({ where: { username: usernameParam } })

  res.status(200).json({ success: true, message: `Profile of ${usernameParam} has been deleted` })
})

module.exports = {
  getUser,
  editUser,
  deleteUser
}