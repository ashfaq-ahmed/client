export interface Office {
    id: number,
    offices: {
        address: string,
        coordinates: {lat: number, lon: number},
        location: string
    },
    distance?: number,
    organization: string,
    services: string,
    urlName: string,
    website: string,
    willWorkRemotely: boolean
}

