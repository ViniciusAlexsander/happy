import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {FiPlus, FiArrowRight} from 'react-icons/fi'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';
import api from '../services/api';

import 'leaflet/dist/leaflet.css'

import '../styles/pages/orphanages-map.css';

import mapMarkerImg from '../images/Local.svg'


const mapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg,
    iconSize: [58, 68],
    iconAnchor: [29,68],
    popupAnchor: [170,2]
});

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

function OrphanagesMap() {
  //coloca o interface como tipo e por ser array, coloca o []
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data);
    })
  }, [])

  return(
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt=""/>

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Minas Gerais</strong>
          <span>Belo Horizonte</span>
        </footer>
      </aside>

      <Map 
        center={[-19.8901949,-43.920138]}
        zoom={12}
        style={{
          width: '100%', height: '100%'
        }}
      >
        {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
        <TileLayer 
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />
        
        {orphanages.map(orphanage => {
          return (
            <Marker icon={mapIcon}  position={[orphanage.latitude, orphanage.longitude]} key={orphanage.id}>
              <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                {orphanage.name}
                <Link to={`/orphanages/${orphanage.id}`}>
                  <FiArrowRight size={20}  color="#FFF"/>
                </Link>
              </Popup>
            </Marker>
          )
        })}
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="FFF"/>
      </Link>
    </div>
  )
}

export default OrphanagesMap;