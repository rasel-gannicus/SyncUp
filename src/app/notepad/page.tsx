"use client";
import NotePad from "@/components/Notepad/Notepad";
import { LoadingSpinner } from "@/utils/Loading Spinner/LoadingSpinner";
import { useAuthState } from "@/utils/Route Protection/useAuthState";

const NotepadPage = () => {
  const { user, loading } = useAuthState();

  if (loading) {
    return <LoadingSpinner />;
  }

  return <NotePad user={user} />;
};

export default NotepadPage;
