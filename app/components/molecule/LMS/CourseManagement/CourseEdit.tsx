// "use client"

// import { useEffect, useState } from "react";
// import { Button } from "~/components/ui/button"
// import { Input } from "~/components/ui/input"
// import { Label } from "~/components/ui/label"
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "~/components/ui/select"
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
// } from "~/components/ui/sheet"
// import { updateUser } from "~/routes/LMS/UserManagement/api";
// import { useToast } from "~/components/ui/toast-container"

// interface SheetDemoProps {
//   open: boolean;
//   userData: {
//     _id: string;
//     name: string;
//     email: string;
//     role: string;
//   };
//   onOpenChange: (open: boolean) => void;
//   onSuccess?: () => void;
// }

// export function UserEditDrawer({ open, userData, onOpenChange, onSuccess }: SheetDemoProps) {
//   const { toast } = useToast();
//   const [formData, setFormData] = useState({
//     name: userData.name,
//     email: userData.email,
//     role: userData.role
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     // Reset form when userData changes
//     setFormData({
//       name: userData.name,
//       email: userData.email,
//       role: userData.role
//     });
//   }, [userData]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { id, value } = e.target;
//     setFormData(prev => ({ ...prev, [id]: value }));
//   };

//   const handleRoleChange = (value: string) => {
//     setFormData(prev => ({ ...prev, role: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const response = await updateUser(userData._id, formData);
      
//       if (response.success) {
//         toast({
//           message: "User updated successfully",
//           description: new Date().toLocaleString(),
//           type: "success",
//           duration: 3000
//         });
//         onOpenChange(false);
//         if (onSuccess) onSuccess();
//       } else {
//         toast({
//           message: "Failed to update user",
//           description: response.error || "Please try again",
//           type: "error"
//         });
//       }
//     } catch (error) {
//       toast({
//         message: "An error occurred",
//         description: error instanceof Error ? error.message : "Please try again",
//         type: "error"
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <Sheet open={open} onOpenChange={onOpenChange}>
//       <SheetContent>
//         <SheetHeader>
//           <SheetTitle>Edit User</SheetTitle>
//           <SheetDescription>
//             Make changes to the user profile here. Click save when you're done.
//           </SheetDescription>
//         </SheetHeader>
//         <form onSubmit={handleSubmit}>
//           <div className="grid gap-4 py-4 px-4">
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="name" className="text-right">
//                 Name
//               </Label>
//               <Input
//                 id="name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 className="col-span-3"
//                 required
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="email" className="text-right">
//                 Email
//               </Label>
//               <Input
//                 id="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 className="col-span-3"
//                 required
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="role" className="text-right">
//                 Role
//               </Label>
//               <Select 
//                 value={formData.role}
//                 onValueChange={handleRoleChange}
//                 required
//               >
//                 <SelectTrigger className="w-[260px]">
//                   <SelectValue placeholder="Select a role" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectGroup>
//                     <SelectLabel>Roles</SelectLabel>
//                     <SelectItem value="Admin">Admin</SelectItem>
//                     <SelectItem value="Tutor">Tutor</SelectItem>
//                     <SelectItem value="User">User</SelectItem>
//                   </SelectGroup>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//           <div className="absolute bottom-0 w-full p-4">
//             <Button type="submit" disabled={isSubmitting} className="w-full">
//               {isSubmitting ? "Saving..." : "Save changes"}
//             </Button>
//           </div>
//         </form>
//       </SheetContent>
//     </Sheet>
//   )
// }


"use client"
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet"
import { updateCourse } from "~/routes/LMS/CourseManagement/api";
import { useToast } from "~/components/ui/toast-container"

interface CourseEditProps {
  open: boolean;
  courseData: {
    _id: string;
    playlistName: string;
    description: string;
    price: string;
    visibility: string;
    classess: string;
    subject: string;
    time: string;
    level: string;
    lectures: string;
  };
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function CourseEditDrawer({ open, courseData, onOpenChange, onSuccess }: CourseEditProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    playlistName: "",
    description: "",
    price: "",
    visibility: "public",
    classess: "",
    subject: "",
    time: "",
    level: "",
    lectures: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormData({
      playlistName: courseData.playlistName,
      description: courseData.description,
      price: courseData.price,
      visibility: courseData.visibility,
      classess: courseData.classess,
      subject: courseData.subject,
      time: courseData.time,
      level: courseData.level,
      lectures: courseData.lectures
    });
  }, [courseData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await updateCourse(courseData._id, formData);
      
      if (response.success) {
        toast({
          message: "Course updated successfully",
          description: new Date().toLocaleString(),
          type: "success",
          duration: 3000
        });
        onOpenChange(false);
        if (onSuccess) onSuccess();
      } else {
        toast({
          message: "Failed to update course",
          description: response.error || "Please try again",
          type: "error"
        });
      }
    } catch (error) {
      toast({
        message: "An error occurred",
        description: error instanceof Error ? error.message : "Please try again",
        type: "error"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Edit Course</SheetTitle>
          <SheetDescription>
            Update course details here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4 px-4">
            {/* Playlist Name */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="playlistName" className="text-right">
                Name
              </Label>
              <Input
                id="playlistName"
                value={formData.playlistName}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>

            {/* Description Textarea */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <textarea
                id="description"
                value={formData.description}
                onChange={handleInputChange}
                className="col-span-3 p-2 border rounded-md h-32"
                required
              />
            </div>

            {/* Price */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price ($)
              </Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>

            {/* Visibility */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="visibility" className="text-right">
                Visibility
              </Label>
              <Select 
                value={formData.visibility}
                onValueChange={(value) => handleSelectChange('visibility', value)}
                required
              >
                <SelectTrigger className="w-[260px]">
                  <SelectValue placeholder="Select visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Classes */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="classess" className="text-right">
                Class
              </Label>
              <Input
                id="classess"
                type="text"
                value={formData.classess}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>

            {/* Subject */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subject" className="text-right">
                Subject
              </Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>

            {/* Time */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time" className="text-right">
                Time (min)
              </Label>
              <Input
                id="time"
                type="number"
                value={formData.time}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>

            {/* Level */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="level" className="text-right">
                Level
              </Label>
              <Select 
                value={formData.level}
                onValueChange={(value) => handleSelectChange('level', value)}
                required
              >
                <SelectTrigger className="w-[260px]">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Lectures */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lectures" className="text-right">
                Lectures
              </Label>
              <Input
                id="lectures"
                type="number"
                value={formData.lectures}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>
          </div>
          <div className="absolute bottom-0 w-full p-4 bg-white">
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}