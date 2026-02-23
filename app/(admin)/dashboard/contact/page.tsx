"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ExternalLink, MapIcon, SquareArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ContactSubmission {
    id: string,
    user: User,
    projectAddress: string,
    emergencyNumber: string,
    googleMapLink: string,
    companyLogo?: CompanyLogo,
    safetyEquipmentMedia: SafetyEquipmentMedia[],
    projectVisualsMedia: ProjectVisualsMedia[]
}

interface CompanyLogo {
    id: string
    key: string
    url: string
    contactSubmissionId: string
}

interface ProjectVisualsMedia {
    id: string,
    key: string,
    url: string,
    type: string,
    contactSubmissionId: string
}

interface SafetyEquipmentMedia {
    id: string,
    key: string
    url: string,
    type: string,
    contactSubmissionId: string
}

interface User {
    name?: string
    email: string
    imageUrl?: string
}

export default function ContactPage() {
    const [contacts, setContacts] = useState<ContactSubmission[]>([]);
    const [loading, setLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const fetchContacts = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/v1/client/contact-submission", {
                method: "GET",
                credentials: "include",
            });

            const contactResponse = await response.json();

            // console.log("contactResponse", contactResponse);
            setContacts(contactResponse.contacts);
        } catch (error: any) {
            console.error("Something went wrong", error.message);
        } finally {
            setLoading(false);
        }
    }

    const handleDeleteContact = async (contactId: string) => {
        try {
            setIsDeleting(true);
            const response = await fetch("/api/v1/client/contact-submission", {
                method: "DELETE",
                credentials: "include",
                body: JSON.stringify({ contactId })
            });

            if (!response.ok) {
                toast.error(`Something went wrong status code: ${response.status}`);
                throw new Error(`Something went wrong status code: ${response.status}`);
            }

            fetchContacts();
        } catch (error: any) {
            console.error(error.message || "Something went wrong couldn't delete contact");
        } finally {
            setIsDeleting(false);
        }
    }

    useEffect(() => {
        fetchContacts();
    }, []);

    if (loading) {
        return (
            <div className="w-full min-h-screen flex flex-col items-center justify-center">
                <p className="text-center text-xl font-bold">Loading...</p>
            </div>
        )
    }
    return (
        <div className="px-4 md:px-6 py-4">
            <h1 className="text-3xl font-bold text-transparent bg-linear-to-r from-blue-600 to-blue-300 bg-clip-text">Your Contact ({contacts.length})</h1>
            <div className="flex flex-wrap gap-2 mt-6 md:mt-8">
                {
                    contacts.map((contact) => (
                        <Card key={contact.id}>
                            {
                                contact.companyLogo && (
                                    <CardHeader>

                                        <Link title="Click download company logo" href={contact.companyLogo.url} target="_blank" download="CompanyLogo">
                                            <Image width={100} height={100} src={contact.companyLogo?.url || "/placeholder-image.png"} alt="Company Logo" />
                                        </Link>
                                    </CardHeader>
                                )
                            }
                            <CardContent>
                                <address>
                                    {contact.user.imageUrl && <Image src={contact.user.imageUrl} alt={`${contact.user.name || "User"} profile image`} width={50} height={50} className="w-8 h-8 rounded-full" />}
                                    <p>Email: {contact.user.email}</p>
                                    <h3>Project address: <span>{contact.projectAddress}</span></h3>
                                    <p>Emergency Number: <span>{contact.emergencyNumber}</span></p>
                                    <Link className="flex items-center gap-2" href={contact.googleMapLink} target="_blank">
                                        <Image className="w-8 h-8" src="/map.png" width={360} height={360} alt="map-icon" />
                                        Map Link <ExternalLink className="size-6" />
                                    </Link>
                                </address>
                            </CardContent>
                            <CardAction>
                                <Link className={buttonVariants({ variant: "ghost", className: "flex items-center gap-2" })} href={`/dashboard/contact/safety-equipments/${contact.id}`}>Safety equipments
                                    <SquareArrowUpRight className="size-6" />
                                </Link>
                                <Link className={buttonVariants({ variant: "ghost", className: "flex items-center gap-2" })} href={`/dashboard/contact/projects-visuals/${contact.id}`}>Projects Visuals <SquareArrowUpRight className="size-6" /></Link>
                            </CardAction>
                            <CardFooter>
                                <Button disabled={isDeleting} onClick={() => handleDeleteContact(contact.id)}>Delete</Button>
                            </CardFooter>
                        </Card>
                    ))
                }
            </div>
        </div>
    )
}