import prisma from '@/lib/prisma';
import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const alt = 'Evacuation Plan Services Image'
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
    const interSemiBold = await readFile(
        join(process.cwd(), 'assets/Inter-SemiBold.ttf')
    )
    // Replace this with your actual data fetching
    const services = await prisma.service.findMany({
        take: 3,
        include: {
            images: true,
        }
    });

    return new ImageResponse(
        (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: '100%',
                backgroundColor: '#1e293b',
                padding: '40px',
                alignItems: 'center',
                overflow: 'hidden', // Prevents content spill
            }}>
                <h1 style={{ fontSize: '48px', color: '#93c5fd', marginBottom: '20px' }}>Our Services</h1>

                <div style={{ display: 'flex', gap: '20px' }}>
                    {services.map((service) => (
                        <div key={service.id} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '350px'
                        }}>
                            <p style={{ fontSize: '24px', color: 'white' }}>{service.title}</p>
                            {service.images?.[0]?.key && (
                                <img
                                    src={`${process.env.NEXT_PUBLIC_BUCKET_URL}/${service.images[0].key}`}
                                    width={300}
                                    height={200}
                                    style={{ borderRadius: '8px' }}
                                    alt='Evacuation Plan Service'
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        ),
        {
            ...size,
            fonts: [
                {
                    name: 'Inter',
                    data: interSemiBold,
                    style: 'normal',
                    weight: 400,
                },
            ],
        }
    );
}