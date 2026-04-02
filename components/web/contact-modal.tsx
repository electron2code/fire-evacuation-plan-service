import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import ContactForm from "./contact-form"
import ServiceCardCarousel from "./service-card-carousel"
import { Button } from "../ui/button"
import { XIcon } from "lucide-react"

export default function ContactModal({ images, serviceTitle, encodedMessage, }: {
    images: {
        id: string
        key: string
        serviceId: string
    }[],
    serviceTitle: string,
    encodedMessage: string,
}) {
    return (
        <Dialog>
            <form>
                <DialogTrigger className="absolute inset-0 opacity-0" asChild>
                    <a>Open Dialog</a>
                </DialogTrigger>
                <DialogContent className="overflow-y-auto" showCloseButton={false}>
                    <DialogHeader>
                        <DialogTitle className="hidden">Contact Form</DialogTitle>
                        <DialogDescription className="hidden">
                            Contact us for services.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="max-w-2xl mx-auto">
                        <ServiceCardCarousel images={images} />
                    </div>
                    <ContactForm encodedMessage={encodedMessage} serviceTitle={serviceTitle} />
                    <DialogClose className="absolute top-2 right-2" asChild>
                        <Button className="w-10 h-10 rounded-full bg-gray-300 text-gray-800 hover:bg-gray-400 hover:text-gray-900 cursor-pointer">
                            <XIcon />
                        </Button>
                    </DialogClose>
                </DialogContent>
            </form>
        </Dialog>
    )
}
