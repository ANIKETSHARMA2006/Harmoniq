import { clerkClient, getAuth } from "@clerk/express";

const protectRoute = async (req, res, next) => {
  const { isAuthenticated, userId } = getAuth(req);
  if (!isAuthenticated || !userId) {
    return res
      .status(401)
      .json({ message: "Unauthorized - User must be logged in" });
  }
  next();
};

const requireAdmin = async (req, res, next) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized - User must be logged in" });
    }
    const currentUser = await clerkClient.users.getUser(userId);
    const configuredAdminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const signedInEmail = currentUser.primaryEmailAddress?.emailAddress
      ?.trim()
      .toLowerCase();
    const isAdmin = Boolean(configuredAdminEmail && signedInEmail) &&
      configuredAdminEmail === signedInEmail;
    if (!isAdmin) {
      return res
        .status(401)
        .json({ message: "Unauthorized - User must be an admin" });
    }
    next();
  } catch (error) {
    console.error("Error in requireAdmin middleware:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export { protectRoute,requireAdmin };
