import { useEffect, useState } from 'react';
import { Button } from '~/components/ui/button'
import { TopicsAddSectionForm } from './createTopics';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "~/components/ui/accordion"

const AddSectionContent = () => {
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);
                const response = await fetchAllCourses();
                setData(response.courses);
            } catch (error) {
                console.error("Failed to fetch courses:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, [refreshKey]);

    return (
        <div>
            {/* <Button variant="outline" >+ Add Topics</Button> */}
            <Button variant="outline" onClick={() => setIsSheetOpen(true)}>
                + Add Topics
            </Button>
            {isSheetOpen && (
                <TopicsAddSectionForm
                    open={isSheetOpen}
                    onOpenChange={setIsSheetOpen}
                    onSuccess={() => setRefreshKey(prev => prev + 1)}
                />
            )}
            <div className='pl-4 pt-4'>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>Is it accessible?</AccordionTrigger>
                    <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            </div>
        </div>
    )
}

export default AddSectionContent