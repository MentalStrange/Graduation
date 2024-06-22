export const generateAndStoreTimeSlots = async (radiologyCenterId, date) => {
  const startTime = new Date(date.setHours(9, 0, 0)); // 09:00 AM
  const endTime = new Date(date.setHours(17, 0, 0)); // 05:00 PM
  const interval = 30; // 30 minutes
  const allTimeSlots = generateTimeSlots(startTime, endTime, interval);

  const timeSlotPromises = allTimeSlots.map(async (slot) => {
    const [start, end] = slot.split(' - ');
    const appointmentData = {
      radiologyCenterId,
      timeSlot: slot,
      startTime: new Date(`${date.toDateString()} ${start}`),
      endTime: new Date(`${date.toDateString()} ${end}`),
      isAvailable: true
    };
    await RadiologyCenterAppointment.create(appointmentData);
  });

  await Promise.all(timeSlotPromises);
};