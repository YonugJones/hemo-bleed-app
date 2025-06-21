const prisma = require('../prisma/prismaClient')
const asyncHandler = require('express-async-handler')
const CustomError = require('../errors/customError')

const ALLOWED_INFUSION_TYPES = [
  'Routine',
  'OnDemand',
  'PreExercise',
  'PostExercise',
  'Other'
]

const logInfusion = asyncHandler(async (req, res) => {
  const user = req.user
  if (!user) throw new CustomError('Unauthorized: user not authenticated', 401)

  const userId = user.id

  const { date, type, product, doseUnits, notes, bleedId } = req.body

  // validates the infusion type
  if (!type || !ALLOWED_INFUSION_TYPES.includes(type)) {
    throw new CustomError(`Infusion type must be one of ${allowedTypes.join(', ')}`, 400);
  }

  // validate and parse date
  let parsedDate;
  if (date) {
    parsedDate = new Date(data)
    if (isNaN(parsedDate.valueOf())) {
      throw new CustomError('Invalid date format', 400)
    }
  }

  // validate dose units
  if (doseUnits != null) {
    if (!Number.isInteger(doseUnits) || doseUnits < 0) {
      throw new CustomError('doseUnits must be a non-negative integer', 400)
    }
  }

   // 4) Optional: validate bleedId (and ensure it exists)
  if (bleedId) {
    const uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;
    if (!uuidRegex.test(bleedId)) {
      throw new CustomError('Invalid bleedId format', 400);
    }

    const bleedRecord = await prisma.bleed.findUnique({
      where: { id: bleedId },
    });
    if (!bleedRecord) {
      throw new CustomError('No bleed found with that ID', 404);
    }
  }

// 5) Create the infusion
  const newInfusion = await prisma.infusion.create({
    data: {
      // Use parsedDate only if provided; otherwise Prisma will default to 'now()'
      ...(parsedDate ? { date: parsedDate } : {}),

      type,
      product: product ?? 'Unknown', // fallback to "Unknown" if not provided
      doseUnits: doseUnits ?? 0,
      notes: notes ?? undefined,
      userId,
      ...(bleedId ? { bleedId } : {}),
    },
  });

  return res.status(201).json({
    success: true,
    message: 'Infusion logged',
    data: newInfusion,
  });
});

module.exports = {
  logInfusion
}