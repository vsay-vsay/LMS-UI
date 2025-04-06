import CourseSelectionPublicPage from "~/components/molecule/LMS/PublicCourse/CourseSectionPublic"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { ToastProvider } from "~/components/ui/toast-container"


export default function LMSPublicCourseTemplete() {
    return (
        <>
            <Tabs defaultValue="public" className="">
                <TabsList className="ml-6">
                    <TabsTrigger value="public">Public Course</TabsTrigger>
                </TabsList>
                <TabsContent value="public">
                <ToastProvider>
                    <CourseSelectionPublicPage />
                </ToastProvider>
                </TabsContent>
            </Tabs>
        </>
    )
}
