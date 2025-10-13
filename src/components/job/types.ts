
interface IMedia {
    jobImages: { url: string, fileId: string }[];
    jobVideo: { url: string, fileId: string };
}
export interface ILocation {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
    landmark?: string;
}

export interface IJob {
  _id?:string;
    title: string;
    jobType: string[];
    description: string;
    category: string;
    budget: number;
    location: ILocation;
    createdBy: string;
    assignedTo: string;// The person who accepted it
    status: "open" | "in-progress" | "completed" | "cancelled";
    media: IMedia;
    distanceLimit: number;
    createdAt: Date;
    updateAt: Date
}