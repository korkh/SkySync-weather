import { toast } from "react-toastify";

export const handleLocation = () =>
  new Promise<{ lat: number; lon: number }>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        resolve({ lat: latitude, lon: longitude });
      },
      (error) => {
        reject(error);
        toast.error("An error occured to get geolocation");
      }
    );
  });
