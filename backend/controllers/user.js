const prisma = require('../prisma/prismaClient')
const asyncHandler = require('express-async-handler')
const CustomError = require('../errors/customError')

const getUser = asyncHandler(async (req, res) => {
  const user = req.user
  if (!user) throw new CustomError('Unauthorized: user not authenticated', 401)

  const username = req.params.username
  if (!username) throw new CustomError('Invalid username', 403)

  const userProfile = await prisma.user.findUnique({
    where: { username },
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

module.exports = {
  getUser
}