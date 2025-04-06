// "use client"
// import { useEffect, useState } from "react";
// import { Button } from "~/components/ui/button"
// import { Input } from "~/components/ui/input"
// import { Label } from "~/components/ui/label"
// import {
//     Sheet,
//     SheetClose,
//     SheetContent,
//     SheetDescription,
//     SheetFooter,
//     SheetHeader,
//     SheetTitle,
// } from "~/components/ui/sheet"
// import {
//     Select,
//     SelectContent,
//     SelectGroup,
//     SelectItem,
//     SelectLabel,
//     SelectTrigger,
//     SelectValue,
// } from "~/components/ui/select"
// import { registerUser } from "~/routes/LMS/UserManagement/api";
// import { useToast } from "~/components/ui/toast-container"


// interface SheetDemoProps {
//     open: boolean;
//     onOpenChange: (open: boolean) => void;
//     onSuccess?: () => void; // Add this prop
// }

// export function CreateUserForm({ open, onOpenChange, onSuccess }: SheetDemoProps) {
//     useEffect(() => {
//         const storedDomain = localStorage.getItem("domainName"); // Assuming domain is stored with key "domain"
//         if (storedDomain) {
//             setFormData(prev => ({ ...prev, domainName: storedDomain }));
//         }
//     }, []);
//     const { toast } = useToast()
//     const [formData, setFormData] = useState({
//         // domainName: "",
//         playlistName: "",
        
//         name: "",
//         email: "",
//         password: "",
//         role: "",
//     });
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { id, value } = e.target;
//         setFormData(prev => ({ ...prev, [id]: value }));
//     };

//     const handleRoleChange = (value: string) => {
//         setFormData(prev => ({ ...prev, role: value }));
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setIsSubmitting(true);

//         try {
//             const response = await registerUser(formData);

//             if (response.success) {
//                 toast({
//                     message: "User created successfully",
//                     description: new Date().toLocaleString(),
//                     type: "success",
//                     duration: 3000
//                 });
//                 onOpenChange(false);
//                 if (onSuccess) onSuccess(); // Trigger the success callback
//             } else {
//                 toast({
//                     message: "Failed to create user",
//                     description: response.error || "Please try again",
//                     type: "error"
//                 });
//             }
//         } catch (error) {
//             toast({
//                 message: "An error occurred",
//                 description: error instanceof Error ? error.message : "Please try again",
//                 type: "error"
//             });
//         } finally {
//             setIsSubmitting(false);
//         }
//     };


//     return (
//         <Sheet open={open} onOpenChange={onOpenChange}>
//             <SheetContent>
//                 <SheetHeader>
//                     <SheetTitle>Create Users</SheetTitle>
//                     <SheetDescription>
//                         Create new user accounts here. Click save when you're done.
//                     </SheetDescription>
//                 </SheetHeader>
//                 <form onSubmit={handleSubmit}>
//                     <div className="grid gap-4 py-4 px-4">
//                         {/* <div className="grid grid-cols-4 items-center gap-4">
//                             <Label htmlFor="domainName" className="text-right">
//                                 Domain
//                             </Label>
//                             <Input
//                                 id="domainName"
//                                 value={formData.domainName}
//                                 readOnly
//                                 className="col-span-3"
//                                 required
//                             />
//                         </div> */}
//                         <div className="grid grid-cols-4 items-center gap-4">
//                             <Label htmlFor="name" className="text-right">
//                                 Name
//                             </Label>
//                             <Input
//                                 id="name"
//                                 placeholder="Name"
//                                 type="text"
//                                 value={formData.name}
//                                 onChange={handleInputChange}
//                                 className="col-span-3"
//                                 required
//                             />
//                         </div>
//                         <div className="grid grid-cols-4 items-center gap-4">
//                             <Label htmlFor="email" className="text-right">
//                                 Email
//                             </Label>
//                             <Input
//                                 id="email"
//                                 placeholder="user@example.com"
//                                 type="email"
//                                 value={formData.email}
//                                 onChange={handleInputChange}
//                                 className="col-span-3"
//                                 required
//                             />
//                         </div>
//                         <div className="grid grid-cols-4 items-center gap-4">
//                             <Label htmlFor="password" className="text-right">
//                                 Password
//                             </Label>
//                             <Input
//                                 id="password"
//                                 placeholder="*****"
//                                 className="col-span-3"
//                                 type="password"
//                                 value={formData.password}
//                                 onChange={handleInputChange}
//                                 required
//                             />
//                         </div>
//                         <div className="grid grid-cols-4 items-center gap-4">
//                             <Label htmlFor="role" className="text-right">
//                                 Role
//                             </Label>
//                             <Select onValueChange={handleRoleChange} required>
//                                 <SelectTrigger className="w-[260px]">
//                                     <SelectValue placeholder="Select a Role" />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                     <SelectGroup>
//                                         <SelectLabel>Roles</SelectLabel>
//                                         <SelectItem value="Admin">Admin</SelectItem>
//                                         <SelectItem value="Tutor">Tutor</SelectItem>
//                                         <SelectItem value="User">User</SelectItem>
//                                     </SelectGroup>
//                                 </SelectContent>
//                             </Select>
//                         </div>
//                     </div>
//                     <SheetFooter className="flex absolute w-full bottom-0">
//                         <Button type="submit" disabled={isSubmitting}>
//                             {isSubmitting ? "Creating..." : "Create"}
//                         </Button>
//                     </SheetFooter>
//                 </form>
//             </SheetContent>
//         </Sheet>
//     )
// }

"use client"
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "~/components/ui/sheet"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select"
import { createCourse } from "~/routes/LMS/CourseManagement/api";
import { useToast } from "~/components/ui/toast-container"
import { Textarea } from "~/components/ui/textarea";

interface SheetDemoProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}

export function LMSCreateCourseForm({ open, onOpenChange, onSuccess }: SheetDemoProps) {
    const { toast } = useToast()
    const [formData, setFormData] = useState({
        playlistName: "",
        description: "",
        price: "",
        visibility: "public",
        thumbnail: null as File | null,
        classess: "",
        subject: "",
        time: "",
        level: "",
        lectures: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | HTMLTextAreaElement) => {
    //     const { id, value } = e.target;
    //     setFormData(prev => ({ ...prev, [id]: value }));
    // };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
      };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setFormData(prev => ({ ...prev, thumbnail: file || null }));
    };

    const handleSelectChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const form = new FormData();
        form.append('playlistName', formData.playlistName);
        form.append('description', formData.description);
        form.append('price', formData.price);
        form.append('visibility', formData.visibility);
        if (formData.thumbnail) {
            form.append('thumbnail', formData.thumbnail);
        }
        form.append('classess', formData.classess);
        form.append('subject', formData.subject);
        form.append('time', formData.time);
        form.append('level', formData.level);
        form.append('lectures', formData.lectures);

        try {
            const response = await createCourse(form);
            if (response.success) {
                toast({
                    message: "Course created successfully",
                    description: new Date().toLocaleString(),
                    type: "success",
                    duration: 3000
                });
                onOpenChange(false);
                if (onSuccess) onSuccess();
            } else {
                toast({
                    message: "Failed to create course",
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
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Create Course</SheetTitle>
                    <SheetDescription>
                        Create new course here. Click save when you're done.
                    </SheetDescription>
                </SheetHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 px-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="playlistName" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="playlistName"
                                placeholder="Course Playlist Name"
                                value={formData.playlistName}
                                onChange={handleInputChange}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Textarea 
                             id="description"
                             placeholder="What about in this course"
                             value={formData.description}
                             onChange={handleInputChange}
                             className="col-span-3"
                             required
                             />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="price" className="text-right">
                                Price (₹)
                            </Label>
                            <Input
                                id="price"
                                type="text"
                                placeholder="Price of your Course"
                                value={formData.price}
                                onChange={handleInputChange}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="visibility" className="text-right">
                                Visibility
                            </Label>
                            <Select 
                                onValueChange={(value) => handleSelectChange('visibility', value)} 
                                value={formData.visibility}
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
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="thumbnail" className="text-right">
                                Thumbnail
                            </Label>
                            <Input
                                id="thumbnail"
                                type="file"
                                onChange={handleFileChange}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="classess" className="text-right">
                                Class
                            </Label>
                            <Input
                                id="classess"
                                type="text"
                                placeholder="Enter Class"
                                value={formData.classess}
                                onChange={handleInputChange}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="subject" className="text-right">
                                Subject
                            </Label>
                            <Input
                                id="subject"
                                placeholder="Enter Subject"
                                value={formData.subject}
                                onChange={handleInputChange}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="time" className="text-right">
                                Time (min)
                            </Label>
                            <Input
                                id="time"
                                type="number"
                                placeholder="Enter Time"
                                value={formData.time}
                                onChange={handleInputChange}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="level" className="text-right">
                                Level
                            </Label>
                            <Select 
                                onValueChange={(value) => handleSelectChange('level', value)}
                                value={formData.level}
                                required
                            >
                                <SelectTrigger className="w-[260px]">
                                    <SelectValue placeholder="Select level" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="Beginner">Beginner</SelectItem>
                                        <SelectItem value="Intermidiate">Intermediate</SelectItem>
                                        <SelectItem value="Advanced">Advanced</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="lectures" className="text-right">
                                Lectures
                            </Label>
                            <Input
                                id="lectures"
                                type="number"
                                placeholder="Enter No. of Lectures"
                                value={formData.lectures}
                                onChange={handleInputChange}
                                className="col-span-3"
                                required
                            />
                        </div>
                    </div>
                    <SheetFooter className="flex absolute w-full bottom-0">
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Creating..." : "Create Course"}
                        </Button>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    )
}