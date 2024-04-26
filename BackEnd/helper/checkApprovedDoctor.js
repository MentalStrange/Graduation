export const checkApproved = async (updatedDoctor) => {
  let status = "approved";
  Object.entries(updatedDoctor.toObject()).forEach(([key, value]) => {
    console.log(key, value);
    if (key !== "reviews") { 
      if (Array.isArray(value) && value.length === 0) {
        status = "pending";
      } else if (typeof value === "string" && value.trim() === "") {
        status = "pending";
      } else if (typeof value === "number" && isNaN(value)) {
        status = "pending";
      }
    }
  });
  updatedDoctor.status = status;
  await updatedDoctor.save();
  return updatedDoctor;
};
