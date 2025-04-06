import LMSCourseManagementMolecule from "~/components/molecule/LMS/CourseManagement/CourseTab"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { ToastProvider } from "~/components/ui/toast-container"


export default function LMSCourseManagementTemplete() {
    return (
        <>
            <Tabs defaultValue="course" className="">
                <TabsList className="ml-6">
                    <TabsTrigger value="course">Course</TabsTrigger>
                </TabsList>
                <TabsContent value="course">
                <ToastProvider>
                   <LMSCourseManagementMolecule />
                </ToastProvider>
                </TabsContent>
            </Tabs>
        </>
    )
}
