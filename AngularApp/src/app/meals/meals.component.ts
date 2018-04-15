import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
    selector: 'app-meals',
    templateUrl: './meals.component.html',
    styleUrls: ['./meals.component.css']
})
export class MealsComponent implements OnInit {
    @ViewChild('gmap') gmapElement: any;
    map: google.maps.Map;
    locations;
    displayed;
    lat;
    lng;
    prevWindow;
    week;
    meal;
    constructor(private _httpService: HttpService) {
        this.week = {
            Sunday: true,
            Monday: true,
            Tuesday: true,
            Wednesday: true,
            Thursday: true,
            Friday: true,
            Saturday: true,
            NoTime: true,
        };
        this.meal = 'All';
    }

    ngOnInit() {
        this.lat = '';
        this.lng = '';
        this.getUserLocation();
        this.initMap();
        this.getAll();
    }

    getDay(num) {
        const d = new Date();
        const weekday = new Array(7);
        weekday[0] = 'Sunday';
        weekday[1] = 'Monday';
        weekday[2] = 'Tuesday';
        weekday[3] = 'Wednesday';
        weekday[4] = 'Thursday';
        weekday[5] = 'Friday';
        weekday[6] = 'Saturday';
        return weekday[d.getDay()];
    }

    getAll() {
        const observable = this._httpService.getLocations();
        observable.subscribe(data => {
            this.locations = data['locations'];
            this.displayed = this.filter(this.locations);
            this.updateDistance();
            this.createMarkers(this.displayed);
            console.log(this.displayed);
        });
    }

    getNearest() {
        this.displayed = this.filter(this.locations);
        this.displayed = this.sortLocationsByDist(this.displayed);
        this.displayed = this.displayed.slice(0, 10);
        this.createMarkers(this.displayed);
    }

    filter(locations) {
        const filtered = [];
        for (let i = 0; i < locations.length; i++) {
            if (locations[i]['Sunday'].length > 0 && this.week.Sunday) {
                if (this.meal !== 'All') {
                    if (locations[i]['Meal_Served'] === this.meal) {
                        filtered.push(locations[i]);
                    } else if (locations[i]['Meal_Served'] === this.meal && this.week.Monday) {
                        filtered.push(locations[i]);
                    } else if (locations[i]['Meal_Served'] === this.meal && this.week.Tuesday) {
                        filtered.push(locations[i]);
                    }
                } else {
                    filtered.push(locations[i]);
                }
            } else if (locations[i]['Monday'].length > 0 && this.week.Monday) {
                if (this.meal !== 'All') {
                    if (locations[i]['Meal_Served'] === this.meal) {
                        filtered.push(locations[i]);
                    } else if (locations[i]['Meal_Served'] === this.meal && this.week.Monday) {
                        filtered.push(locations[i]);
                    } else if (locations[i]['Meal_Served'] === this.meal && this.week.Tuesday) {
                        filtered.push(locations[i]);
                    }
                } else {
                    filtered.push(locations[i]);
                }
            } else if (locations[i]['Tuesday'].length > 0 && this.week.Tuesday) {
                if (this.meal !== 'All') {
                    if (locations[i]['Meal_Served'] === this.meal) {
                        filtered.push(locations[i]);
                    } else if (locations[i]['Meal_Served'] === this.meal && this.week.Monday) {
                        filtered.push(locations[i]);
                    } else if (locations[i]['Meal_Served'] === this.meal && this.week.Tuesday) {
                        filtered.push(locations[i]);
                    }
                } else {
                    filtered.push(locations[i]);
                }
            } else if (locations[i]['Wednesday'].length > 0 && this.week.Wednesday) {
                if (this.meal !== 'All') {
                    if (locations[i]['Meal_Served'] === this.meal) {
                        filtered.push(locations[i]);
                    } else if (locations[i]['Meal_Served'] === this.meal && this.week.Monday) {
                        filtered.push(locations[i]);
                    } else if (locations[i]['Meal_Served'] === this.meal && this.week.Tuesday) {
                        filtered.push(locations[i]);
                    }
                } else {
                    filtered.push(locations[i]);
                }
            } else if (locations[i]['Thursday'].length > 0 && this.week.Thursday) {
                if (this.meal !== 'All') {
                    if (locations[i]['Meal_Served'] === this.meal) {
                        filtered.push(locations[i]);
                    } else if (locations[i]['Meal_Served'] === this.meal && this.week.Monday) {
                        filtered.push(locations[i]);
                    } else if (locations[i]['Meal_Served'] === this.meal && this.week.Tuesday) {
                        filtered.push(locations[i]);
                    }
                } else {
                    filtered.push(locations[i]);
                }
            } else if (locations[i]['Friday'].length > 0 && this.week.Friday) {
                if (this.meal !== 'All') {
                    if (locations[i]['Meal_Served'] === this.meal) {
                        filtered.push(locations[i]);
                    } else if (locations[i]['Meal_Served'] === this.meal && this.week.Monday) {
                        filtered.push(locations[i]);
                    } else if (locations[i]['Meal_Served'] === this.meal && this.week.Tuesday) {
                        filtered.push(locations[i]);
                    }
                } else {
                    filtered.push(locations[i]);
                }
            } else if (locations[i]['Saturday'].length > 0 && this.week.Saturday) {
                if (this.meal !== 'All') {
                    if (locations[i]['Meal_Served'] === this.meal) {
                        filtered.push(locations[i]);
                    } else if (locations[i]['Meal_Served'] === this.meal && this.week.Monday) {
                        filtered.push(locations[i]);
                    } else if (locations[i]['Meal_Served'] === this.meal && this.week.Tuesday) {
                        filtered.push(locations[i]);
                    }
                } else {
                    filtered.push(locations[i]);
                }
            } else if (this.week.NoTime) {
                if (this.meal !== 'All') {
                    if (locations[i]['Meal_Served'] === this.meal) {
                        filtered.push(locations[i]);
                    } else if (locations[i]['Meal_Served'] === this.meal && this.week.Monday) {
                        filtered.push(locations[i]);
                    } else if (locations[i]['Meal_Served'] === this.meal && this.week.Tuesday) {
                        filtered.push(locations[i]);
                    }
                } else {
                    filtered.push(locations[i]);
                }
            }
        }
        return filtered;
    }

    updateDistance() {
        for (let i = 0; i < this.locations.length - 1; i++) {
            let dist = 0;
            dist += this.locations[i]['Coordinates']['lat'] - this.lat;
            dist += this.locations[i]['Coordinates']['lng'] - this.lng;
            this.locations[i]['Distance'] = dist;
        }
    }

    sortLocationsByDist(locations) {
        for (let i = 0; i < locations.length; i++) {
            for (let y = 0; y < locations.length - 1; y++) {
                if (locations[y]['Distance'] > locations[y + 1]['Distance']) {
                    const temp = locations[y];
                    locations[y] = locations[y + 1];
                    locations[y + 1] = temp;
                }
            }
        }
        return locations;
    }

    initMap() {
        const mapProp = {
            center: new google.maps.LatLng(47.608380, -122.359),
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    }

    createMarkers(locations) {
        this.initMap();
        let prevWindow;
        for (let i = 0; i < locations.length; i++) {
            if (locations[i].hasOwnProperty('Coordinates')) {
                const marker = new google.maps.Marker({
                    position: locations[i].Coordinates,
                    map: this.map,
                    title: locations[i].Name_of_Program
                });
                marker.addListener('click', function () {
                    if (navigator.geolocation) {
                        // tslint:disable-next-line:max-line-length
                        const contentString = '<h6>' + locations[i]['Name_of_Program'] + '</h6><div><a target="blank_" href="https://www.google.com/maps/dir/?api=1&origin=' + this.lat + ',' + this.lng + '&destination=' + locations[i]['Coordinates']['lat'] + ',' + locations[i]['Coordinates']['lng'] + '&z=10&t=h&hl=en-US&gl=US&mapclient=apiv3">Get Directions</a>';
                        const infowindow = new google.maps.InfoWindow({
                            content: contentString,
                            position: marker.getPosition(),
                            maxWidth: 180,
                        });
                        if (prevWindow) {
                            prevWindow.close();
                        }
                        prevWindow = infowindow;
                        infowindow.open(this.map);
                    }
                });
            }
        }
    }

    getUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.lat = position.coords.latitude;
                this.lng = position.coords.longitude;
            });
        } else {
            this.lat = 'Geolocation is not supported by this browser.';
        }
    }

}
