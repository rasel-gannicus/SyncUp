"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import AddNoteModal from "./Modal/AddNoteModal";
import { useAddNoteMutation, useDeleteNoteMutation } from "@/Redux/features/notes/noteApi";
import { useAuthState } from "@/utils/Route Protection/useAuthState";
import { toast } from "react-hot-toast";
import { useGetUserQuery } from "@/Redux/features/user/userApi";
import { LoadingSpinnerCustom } from "@/utils/Loading Spinner/LoadingSpinner";

// This would typically come from  app's state management or API
const initialNotes = [
  {
    id: 1,
    title: "Shopping List",
    content: "<p>Milk, Eggs, Bread</p>",
    color: "bg-pink-100",
  },
  {
    id: 2,
    title: "Meeting Notes",
    content: "<p>Discuss Q4 goals</p>",
    color: "bg-blue-100",
  },
  {
    id: 3,
    title: "Ideas",
    content: "<p>New app features</p>",
    color: "bg-green-100",
  },
];

const colorOptions = [
  "bg-pink-100",
  "bg-blue-100",
  "bg-green-100",
  "bg-yellow-100",
  "bg-purple-100",
  "bg-red-100",
  "bg-indigo-100",
  "bg-teal-100",
  "bg-orange-100",
  "bg-cyan-100",
];

export default function NotePad() {
  const [notes, setNotes] = useState(initialNotes);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { user, loading } = useAuthState();

  // --- getting note for user & adding new note
  const {data: userData, isLoading: userLoading, error: userError} = useGetUserQuery(user?.uid);

  const [addNoteToDb, { data, isLoading, error }] = useAddNoteMutation();

  // --- adding note 
  const handleAddNote = async (title: string, content: string) => {
    if (!user) {
      toast.error("You need to login first to save notes");
      return;
    }

    const newNote = {
      id: Date.now(),
      title,
      content,
      color: getRandomColor(),
      uid: user.uid, 
    };
      const toastId = toast.loading("Saving note...", {position : "bottom-center"} );

    try {
      const response : any = await addNoteToDb({ note: newNote });

      if ('error' in response) {
        toast.error(response.error.data.message || "Failed to add note."); 
        console.error(response.error);
      } else {
        toast.success("Note added successfully"); 
        setNotes([...notes, newNote]); // Optimistically update UI 
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
      console.error(error);
    } finally {
      toast.dismiss(toastId);
    }
  };


  const handleEditNote = (id: number) => {
    // This would typically navigate to EditNote page or open an edit modal
    console.log("Edit note", id);
  };

  // --- deleting a note 
  const [deleteNoteFromDb, {data : deleteNoteData, isLoading: deleteNoteLoading, error: deleteNoteError}] = useDeleteNoteMutation();

  const handleDeleteNote = async (createdAt: string) => {
    if (!user) {
      toast.error("You need to login first to delete notes");
      return;
    }

    const toastId = toast.loading("Deleting note...");

    try {
      const response: any = await deleteNoteFromDb({ uid: user?.uid, createdAt });

      if ('error' in response) {
        toast.error(response.error.data.message || "Failed to delete note.");
        console.error(response.error);
      } else {
        toast.success("Note deleted successfully"); 
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
      console.error(error);
    } finally {
      toast.dismiss(toastId);
    }
  };

  const getRandomColor = () => {
    return colorOptions[Math.floor(Math.random() * colorOptions.length)];
  };

  if(userLoading){
    return <LoadingSpinnerCustom desc="Getting notes ..." /> || <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">My Notes</h1>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <Card
          className="flex flex-col justify-center items-center cursor-pointer hover:bg-muted transition-colors duration-300"
          onClick={() => setIsAddModalOpen(true)}
        >
          <CardContent className="flex flex-col items-center py-8">
            <PlusCircle className="h-12 w-12 mb-4 text-muted-foreground" />
            <p className="text-lg font-semibold text-muted-foreground">
              Add a new note
            </p>
          </CardContent>
        </Card>

        {userData?.notes?.filter((note:any)=> !note?.isDeleted).map((note : any) => (
          <Card
            key={note.id}
            className={`flex flex-col ${note.color} transition-all duration-300 hover:shadow-lg`}
          >
            <CardHeader>
              <CardTitle>{note.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <div dangerouslySetInnerHTML={{ __html: note.content }} />
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEditNote(note.id)}
              >
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteNote(note.createdAt)}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {userData?.notes?.length === 0 && (
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground">
            {`No notes yet. Click on 'Add a new note' to get started!`}
          </p>
        </div>
      )}

      <AddNoteModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddNote={handleAddNote}
      />
    </div>
  );
}
