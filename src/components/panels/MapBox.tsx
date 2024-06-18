import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxClient from '@mapbox/mapbox-sdk';
import directions from '@mapbox/mapbox-sdk/services/directions';
import { Tunnel, Zone } from '../../types';
import { fetchTunnels, fetchZones } from '../../lib/apis';

mapboxgl.accessToken = 'pk.eyJ1IjoibWlrZWthbGUiLCJhIjoiY2x4Z2JsdzZiMTIzbjJrcHdxbDNhdTgzZSJ9.BSu0Xe1lgIgxULBXXQlEBQ';

const mapboxClient = MapboxClient({ accessToken: mapboxgl.accessToken });
const directionsClient = directions(mapboxClient);

export default function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);
  const [tunnels, setTunnels] = useState<Tunnel[]>([]);
  const [zones, setZones] = useState<Zone[]>([]);

  const fetchData = async () => {
    fetchTunnels(setTunnels);
    fetchZones(setZones);
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    if (tunnels.length < 1 || zones.length < 1) return;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom,
      attributionControl: false // Disable the default attribution control
    });

    map.current.on('load', async () => {
      // Enable 3D terrain
      map.current.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        tileSize: 512,
        maxzoom: 14
      });
      map.current.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });

      map.current.setLight({ anchor: 'map', intensity: 0.4 });

      // Fetch and add tunnels
      for (const tunnel of tunnels) {
        if (tunnel.visible) {
          console.log( [parseFloat(tunnel.startLng), parseFloat(tunnel.startLat)],
          [parseFloat(tunnel.endLng), parseFloat(tunnel.endLat)], "!!!!!!!!!!!!!!!!!!");
          
          const route = await fetchRoute(
            [parseFloat(tunnel.startLng), parseFloat(tunnel.startLat)],
            [parseFloat(tunnel.endLng), parseFloat(tunnel.endLat)]
          );

          map.current.addLayer({
            id: tunnel.id,
            type: 'line',
            source: {
              type: 'geojson',
              data: {
                type: 'Feature',
                geometry: {
                  type: 'LineString',
                  coordinates: route
                }
              }
            },
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': tunnel.color,
              'line-opacity': tunnel.opacity,
              'line-width': 5
            }
          });
        }
      }

      // Add 3D zones
      
      zones.forEach(zone => {
        if (zone.visible) {
          const radiusInMeters = parseFloat(zone.radius) * 1609.34;

          map.current.addSource(zone.id, {
            type: 'geojson',
            data: {
              type: 'Feature',
              geometry: {
                type: 'Polygon',
                coordinates: [createCircle([parseFloat(zone.centerLng), parseFloat(zone.centerLat)], radiusInMeters)]
              }
            }
          });

          map.current.addLayer({
            id: zone.id,
            type: 'fill-extrusion',
            source: zone.id,
            paint: {
              'fill-extrusion-color': zone.color,
              'fill-extrusion-height': 50,
              'fill-extrusion-opacity': 0.5
            }
          });
        }
      });
    });

    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  }, [tunnels, zones]);

  const fetchRoute = async (start: [number, number], end: [number, number]) => {
    const response = await directionsClient.getDirections({
      profile: 'driving',
      geometries: 'geojson',
      waypoints: [
        { coordinates: start },
        { coordinates: end }
      ]
    }).send();
    console.log(response);
    const route = response.body.routes[0].geometry.coordinates;
    return route;
  };

  const createCircle = (center: [number, number], radius: number) => {
    const points = 64;
    const coords = {
      latitude: center[1],
      longitude: center[0]
    };
    const km = radius / 1000;
    const ret = [];
    const distanceX = km / (111.32 * Math.cos(coords.latitude * Math.PI / 180));
    const distanceY = km / 110.574;

    let theta, x, y;
    for (let i = 0; i < points; i++) {
      theta = (i / points) * (2 * Math.PI);
      x = distanceX * Math.cos(theta);
      y = distanceY * Math.sin(theta);
      ret.push([coords.longitude + x, coords.latitude + y]);
    }
    ret.push(ret[0]);
    return ret;
  };

  return (
    <div className='flex flex-col h-full'>
      <div className='flex-grow-0 p-2'>
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div className='flex-grow'>
        <div ref={mapContainer} className="h-full" />
      </div>
    </div>
  );
}
