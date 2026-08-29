const safeMessages = new Set([
  "Email in use",
  "Email or password not valid",
  "Email is not verify",
  "Invalid or expired token",
  "New password must be different",
  "Invalid date of birth",
  "You have already booked this tour.",
  "Departure is unavailable or does not have enough seats",
  "Booking has expired",
  "Booking departure is no longer valid for payment",
  "Payment not found or wrong status",
  "Payment is no longer available",
  "Only active bookings can be canceled",
  "You are not allowed to review this tour because you haven't completed it yet.",
  "Email does not match with the logged in user",
  "You are already subscribed to the newsletter",
]);

export const getPublicErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof Error && safeMessages.has(error.message)) {
    return error.message;
  }

  console.error(fallback);
  return fallback;
};
