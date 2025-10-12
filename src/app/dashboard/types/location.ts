export interface ILocation {
  type: "Point";
  coordinates: [number, number]; // [longitude, latitude]
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  landmark?: string;
}

export interface IMedia {
    jobImages: { url: string, fileId: string }[];
    jobVideos: { url: string, fileId: string }[];
}