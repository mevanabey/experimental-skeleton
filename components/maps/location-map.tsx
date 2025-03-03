//@ts-nocheck
"use client"

// MapForm.tsx
import React, { useRef, useEffect } from 'react';
import mapboxgl, { Map as MapboxMap, MapMouseEvent, Marker } from 'mapbox-gl';

// Import Mapbox CSS
import 'mapbox-gl/dist/mapbox-gl.css';

// Set your Mapbox access token here
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ?? '';

type Location = {
  lng: number;
  lat: number;
};

type MapFormProps = {
  coordinates: Location | null; // Coordinates from the form
  setCoordinates: (location: Location, locationName: string) => void; // Function to update the coordinates in the form
};

export const MapForm: React.FC<MapFormProps> = ({ coordinates, setCoordinates }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const map = useRef<MapboxMap | null>(null);
  const marker = useRef<Marker | null>(null);

  const fetchLocationName = async (lng: number, lat: number) => {
    // setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`
      );
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        // Get the most relevant place name
        const place = data.features[0];
        // setLocationName(place.place_name);
        return place.place_name;
      } else {
        return 'Location not found.';
        // setLocationName('Location name not found');
      }
    } catch (error) {
      console.error('Error fetching location name:', error);

      return 'Error fetching location name.';
      // setLocationName('Error fetching location name');
    } finally {
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize the map
    map.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: coordinates ? [coordinates.lng, coordinates.lat] : [-73.935242, 40.73061],
      zoom: 12,
    });

    // Place marker if coordinates are provided
    if (coordinates) {
      marker.current = new mapboxgl.Marker().setLngLat([coordinates.lng, coordinates.lat]).addTo(map.current);

      fetchLocationName(coordinates.lng, coordinates.lat);
    }

    // Add a marker on map click
    map.current.on('click', async (e: MapMouseEvent) => {
      const coords = e.lngLat;

      // Place or move the marker
      if (marker.current) {
        marker.current.setLngLat(coords);
      } else {
        marker.current = new mapboxgl.Marker().setLngLat(coords).addTo(map.current!);
      }

      const locationName = await fetchLocationName(coords.lng, coords.lat);

      // Update form state
      setCoordinates({ lng: coords.lng, lat: coords.lat }, locationName);
    });

    // Clean up on unmount
    return () => {
      map.current?.remove();
    };
  }, []);

  // Update map when coordinates change
  useEffect(() => {
    if (!map.current || !coordinates) return;

    // Fly to the new coordinates
    map.current.flyTo({ center: [coordinates.lng, coordinates.lat], zoom: 15 });

    // Update or place the marker
    if (marker.current) {
      marker.current.setLngLat([coordinates.lng, coordinates.lat]);
    } else {
      marker.current = new mapboxgl.Marker().setLngLat([coordinates.lng, coordinates.lat]).addTo(map.current!);
    }
  }, [coordinates]);

  return (
    <div
      ref={mapContainerRef}
      className="rounded-md relative overflow-hidden border shadow-sm"
      style={{ width: '100%', height: '400px', marginBottom: '20px' }}
    />
  );
};

export default MapForm;