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
import { AddNoteModal } from "./Modal/AddNoteModal";

// This would typically come from my app's state management or API
const initialNotes = [
  {
    id: 1,
    title: "Shopping List",
    content: "Milk, Eggs, Bread",
    color: "bg-pink-100",
  },
  {
    id: 2,
    title: "Meeting Notes",
    content: "Discuss Q4 goals",
    color: "bg-blue-100",
  },
  { id: 3, title: "Ideas", content: "New app features", color: "bg-green-100" },
  {
    id: 4,
    title: "Books to Read",
    content: "1984, To Kill a Mockingbird",
    color: "bg-yellow-100",
  },
  {
    id: 5,
    title: "Workout Plan",
    content: "Monday: Cardio, Tuesday: Strength",
    color: "bg-purple-100",
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

export default function Notepad() {
  const [notes, setNotes] = useState(initialNotes);

  // --- for opening modal to add new note
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddNote = () => {
    // This would typically open to 'Add Note' modal
    setIsModalOpen(true);
    console.log("Navigate to Add Note page");
  };

  const handleEditNote = (id: number) => {
    // This would typically navigate to  EditNote page
    console.log("Edit note", id);
  };

  const handleDeleteNote = (id: number) => {
    // This would typically delete the note from backend
    setNotes(notes.filter((note) => note.id !== id));
  };

  const getRandomColor = () => {
    return colorOptions[Math.floor(Math.random() * colorOptions.length)];
  };

  return (
    <div className="container mx-auto p-4">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">My Notes</h1>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card
          className="flex flex-col justify-center items-center cursor-pointer hover:bg-muted transition-colors duration-300"
          onClick={handleAddNote}
        >
          <CardContent className="flex flex-col items-center py-8">
            <PlusCircle className="h-12 w-12 mb-4 text-muted-foreground" />
            <p className="text-lg font-semibold text-muted-foreground">
              Add a new note
            </p>
          </CardContent>
        </Card>

        {notes.map((note) => (
          <Card
            key={note.id}
            className={`flex flex-col ${note.color} transition-all duration-300 hover:shadow-lg`}
          >
            <CardHeader>
              <CardTitle>{note.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">{note.content}</p>
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
                onClick={() => handleDeleteNote(note.id)}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {notes.length === 0 && (
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground">
            No notes yet. Click on 'Add a new note' to get started!
          </p>
        </div>
      )}
      <AddNoteModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
}