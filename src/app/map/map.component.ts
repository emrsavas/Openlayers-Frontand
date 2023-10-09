import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import Draw from 'ol/interaction/Draw';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Overlay from 'ol/Overlay';
import Polygon from 'ol/geom/Polygon';
import { Coordinate } from 'ol/coordinate';
import { GetModel } from './Model/GetModel';
import * as ol from 'ol';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import { MatDialog } from '@angular/material/dialog';
import { QuerydrawpopupComponent } from './querydrawpopup/querydrawpopup.component';




@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: Map | null = null;
  draw: Draw | null = null;
  popup: Overlay | null = null;
  name: string = "";
  number: string = "";
  isDrawingStarted: boolean = false;
  coordinates: Coordinate[] = [];
  getModel: GetModel = new GetModel;
  getModels: GetModel[] = [];
  popupVisible = false;



  constructor(private http: HttpClient,
    private dialog: MatDialog) { }


  ngOnInit(): void {
    this.getir();

    const turkeyCenter = fromLonLat([35.0, 39.0]);

    this.map = new Map({
      target: 'map',
      controls: [],
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: turkeyCenter,
        zoom: 6
      })
    });

    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: vectorSource
    });


    this.map.addLayer(vectorLayer);

    const addButton = document.getElementById('addDrawingButton');
    if (addButton) {
      addButton.addEventListener('click', () => {
        this.add(vectorSource);
      });
    }
  }


  add(vectorSource: VectorSource): void {
    if (!this.isDrawingStarted) {
      this.isDrawingStarted = true;

      if (this.draw) {
        this.map?.removeInteraction(this.draw);
      }

      this.draw = new Draw({
        source: vectorSource,
        type: 'Polygon',
      });

      this.map?.addInteraction(this.draw);

      this.draw.on('drawend', (event) => {
        const feature = event.feature;
        const geometry = feature.getGeometry();

        if (geometry instanceof Polygon) {
          const coordinates = geometry.getCoordinates()[0];
          this.togglePopup();


          this.openPopup();

          this.coordinates = coordinates;

          if (this.popup) {
            this.popup.setPosition(coordinates[0]);
          }

        }
      });
    } else {
      this.isDrawingStarted = false;
      if (this.draw) {
        this.map?.removeInteraction(this.draw);
      }
      vectorSource.clear();
    }
  }
  closePopup() {
    this.name='';
    this.number='';
    this.popupVisible = false;
  }
  togglePopup() {
    this.popupVisible = !this.popupVisible;
  }

  openPopup(): void {
    this.popup = new Overlay({
      element: document.getElementById('popup')!,
      autoPan: true,
      autoPanAnimation: {
        duration: 250,
      },
    });

    this.map?.addOverlay(this.popup);



  }
  getir() {
    this.http.get('https://localhost:5001/api/Map/Get').subscribe(
      (response: any) => {
        response.item = this.getModels
        for (const item of response) {
          if (item.coordinates !== null) {
            const coordinates = item.coordinates;


            const polygon = new Polygon([coordinates]);

            const style = new Style({
              stroke: new Stroke({
                color: 'blue',
                width: 2,
              }),
              fill: new Fill({
                color: 'rgba(0, 0, 255, 0.1)',
              }),
            });

            const feature = new ol.Feature({
              geometry: polygon,
            });
            feature.setStyle(style);

            const vectorSource = new VectorSource();
            vectorSource.addFeature(feature);

            const vectorLayer = new VectorLayer({
              source: vectorSource,
            });

            if (this.map !== null) {
              this.map.addLayer(vectorLayer);
            }
          }


        }

      },
      (error) => {
        console.error('Hata:', error);
      }
    );
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(QuerydrawpopupComponent, {
      width: 'auto',
    });

    dialogRef.afterClosed().subscribe(result => {
      window.location.reload();
    });
  }


  eklesene(): void {
    const coordinatesAsJSON = this.coordinates.map(coord => ({
      lon: coord[0],
      lat: coord[1],
    }));
    const formData = {
      name: this.name,
      number: this.number,
      edgeCount: 3,
      coordinates: this.coordinates
    };
    this.closePopup();
    if (this.popup) {
      this.popup.setPosition(undefined);
    }

    this.http
      .post('https://localhost:5001/api/Map/Add', formData)
      .subscribe(
        (response) => {
        },
        (error) => {
          console.error('API Hatası:', error);
        }
      );
  }
}


