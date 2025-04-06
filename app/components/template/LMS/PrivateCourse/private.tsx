import CourseSelectionPrivatePage from "~/components/molecule/LMS/PrivateCourse/CourseSectionPrivate"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { ToastProvider } from "~/components/ui/toast-container"


export default function LMSPrivateCourseTemplete() {
    return (
        <>
            <Tabs defaultValue="private" className="">
                <TabsList className="ml-6">
                    <TabsTrigger value="private">Private Course</TabsTrigger>
                </TabsList>
                <TabsContent value="private">
                <ToastProvider>
                    <CourseSelectionPrivatePage />
                </ToastProvider>
                </TabsContent>
            </Tabs>
        </>
    )
}
