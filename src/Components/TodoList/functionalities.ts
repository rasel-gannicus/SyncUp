import { toast } from "react-hot-toast";

/**
 * Checks if the user is logged in.
 * @param user The user object. If falsy, the user is not logged in.
 * @returns True if the user is logged in, false otherwise.
 */
export const validateUser = (user : any): boolean => {
  if (!user) {
    // If the user is not logged in, show a toast message
    toast.error("You need to login first.");
    return false;
  }
  return true;
};


  
  