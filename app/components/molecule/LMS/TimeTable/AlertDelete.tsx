// import { useToast } from "~/components/ui/toast-container"
// import {
//     AlertDialog,
//     AlertDialogAction,
//     AlertDialogCancel,
//     AlertDialogContent,
//     AlertDialogDescription,
//     AlertDialogFooter,
//     AlertDialogHeader,
//     AlertDialogTitle,
//     AlertDialogTrigger,
//   } from "~/components/ui/alert-dialog";
//   import { deleteUser } from "~/routes/ERP/UserManagement/api";
// import { useState } from "react";

//   interface AlertDialogChildProps {
//     email: string;
//     id: string;
//     children: React.ReactNode;
//     onSuccess?: () => void; 
//   }
  
//   export function EventsAlertDelete({ email, children, id, onSuccess }: AlertDialogChildProps) {
//     const { toast } = useToast()
//     const [isDeleting, setIsDeleting] = useState(false)
//     const handleDelete = async (e: React.MouseEvent) => {
//         e.stopPropagation()
//         setIsDeleting(true)
        
//         try {
//           const { success, message } = await deleteUser(id)
          
//           if (success) {
//             toast({
//               message: "User deleted successfully",
//               description: new Date().toLocaleString(),
//               type: "success",
//               duration: 3000
//             })
//             if (onSuccess) onSuccess() // Trigger success callback
//           } else {
//             toast({
//               message: "Failed to delete user",
//               description: message || "Please try again",
//               type: "error"
//             })
//           }
//         } catch (error) {
//           toast({
//             message: "Error",
//             description: error instanceof Error ? error.message : "Failed to delete user",
//             type: "error"
//           })
//         } finally {
//           setIsDeleting(false)
//         }
//       }

//     return (
//       <AlertDialog>
//         <AlertDialogTrigger asChild>
//           {children}
//         </AlertDialogTrigger>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
//             <AlertDialogDescription>
//               This action cannot be undone. This will permanently delete your
//               account ({email}) and remove your data from our servers.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>Cancel</AlertDialogCancel>
//             <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     );
//   }


// src/components/EventsAlertDelete.tsx
"use client"

import { useToast } from "~/components/ui/toast-container"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog"
import { deleteEvent } from "~/routes/ERP/Events/api"
import { useState } from "react"

interface AlertDialogChildProps {
  eventId: string;
  eventTitle: string;
  children: React.ReactNode;
  onSuccess?: () => void;
}

export function EventsAlertDelete({ eventId, eventTitle, children, onSuccess }: AlertDialogChildProps) {
  const { toast } = useToast()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsDeleting(true)
    
    try {
      const { success, message } = await deleteEvent(eventId)
      
      if (success) {
        toast({
          message: "Event deleted successfully",
          description: `"${eventTitle}" has been deleted`,
          type: "success",
          duration: 3000
        })
        if (onSuccess) onSuccess()
      } else {
        toast({
          message: "Failed to delete event",
          description: message || "Please try again",
          type: "error"
        })
      }
    } catch (error) {
      toast({
        message: "Error",
        description: error instanceof Error ? error.message : "Failed to delete event",
        type: "error"
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild onClick={(e) => e.stopPropagation()}>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the event "{eventTitle}" and remove it from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDelete} 
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}