import { useState, useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

const VendorMoreInfo = ({ locationName, email }) => {
  const [open, setOpen] = useState(true);
  const [coordinates, setCoordinates] = useState({
    lat: 27.70169,
    lng: 85.3206,
  }); // Default to Kathmandu

  useEffect(() => {
    fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        locationName
      )}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          const { lat, lon } = data[0];
          setCoordinates({ lat: parseFloat(lat), lng: parseFloat(lon) });
        }
      })
      .catch((error) => console.error("Error fetching coordinates:", error));
  }, [locationName]);

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-10"
    >
      <DialogBackdrop className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-full p-4 text-center sm:p-0">
          <DialogPanel className="relative text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:max-w-lg sm:w-full">
            <div className="p-4">
              {email}
              <iframe
                width="100%"
                height="400"
                style={{ border: "0" }}
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                  coordinates.lng - 0.005
                }%2C${coordinates.lat - 0.005}%2C${coordinates.lng + 0.005}%2C${
                  coordinates.lat + 0.005
                }&layer=mapnik&marker=${coordinates.lat}%2C${coordinates.lng}`}
                allowFullScreen
              ></iframe>
              {/* {availableFacilities} */}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default VendorMoreInfo;
