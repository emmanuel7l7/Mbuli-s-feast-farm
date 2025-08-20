import type { Store } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, MapPin } from 'lucide-react';
import Image from 'next/image';

const stores: Store[] = [
    {
        id: '1',
        name: "Mbuli's Masaki",
        address: '123 Haile Selassie Road, Masaki, Dar es Salaam',
        hours: 'Mon-Sun: 11:00 AM - 10:00 PM',
        image: 'https://placehold.co/600x400',
        aiHint: 'restaurant exterior',
    },
    {
        id: '2',
        name: "Mbuli's Mlimani City",
        address: 'Mlimani City Mall, Food Court, Dar es Salaam',
        hours: 'Mon-Sun: 10:00 AM - 9:00 PM',
        image: 'https://placehold.co/600x400',
        aiHint: 'food court',
    },
    {
        id: '3',
        name: "Mbuli's Arusha",
        address: '45 Njiro Road, Arusha',
        hours: 'Mon-Sat: 12:00 PM - 9:30 PM',
        image: 'https://placehold.co/600x400',
        aiHint: 'shop front',
    },
    {
        id: '4',
        name: "Mbuli's Zanzibar",
        address: '78 Stone Town Waterfront, Zanzibar',
        hours: 'Mon-Sun: 1:00 PM - 11:00 PM',
        image: 'https://placehold.co/600x400',
        aiHint: 'beach restaurant',
    },
];

export default function StoresPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Find Our Restaurants</h1>
                <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
                    Visit one of our locations to enjoy the fresh taste of Mbuli's Feast Farm.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {stores.map((store) => (
                    <Card key={store.id} className="flex flex-col sm:flex-row overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-xl">
                        <div className="relative w-full sm:w-1/3 h-48 sm:h-auto">
                            <Image
                                src={store.image}
                                alt={store.name}
                                layout="fill"
                                objectFit="cover"
                                data-ai-hint={store.aiHint}
                            />
                        </div>
                        <div className="flex-1">
                            <CardHeader>
                                <CardTitle className="font-headline text-2xl">{store.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-start space-x-3">
                                    <MapPin className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                                    <p className="text-muted-foreground">{store.address}</p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                                    <p className="text-muted-foreground">{store.hours}</p>
                                </div>
                            </CardContent>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
