"use client";
import NotePad from "@/components/Notepad/Notepad";
import { HomePageLoading } from "@/utils/Loading Spinner/Loading Skeleton/Skeleton";
import { useAuthState } from "@/utils/Route Protection/useAuthState";

const NotepadPage = () => {
  const { user, loading } = useAuthState();

  if (loading) {
    return <HomePageLoading />;
  }

  return <NotePad user={user} />;
};

export default NotepadPage;
