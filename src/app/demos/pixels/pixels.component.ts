import { Component, OnInit } from '@angular/core';
import {DefaultCollection, SapphireDb} from 'ng-sapphiredb';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {Lists} from 'ng-metro4';

const size = 10;

interface Pixel {
  id?: string;
  color: string;
  x: number;
  y: number;
}

@Component({
  selector: 'app-pixels',
  templateUrl: './pixels.component.html',
  styleUrls: ['./pixels.component.less']
})
export class PixelsComponent implements OnInit {

  private collection: DefaultCollection<Pixel>;
  public pixels$: Observable<Pixel[]>;

  constructor(private db: SapphireDb) {
    this.collection = this.db.collection<Pixel>('pixels', 'demo');
    this.pixels$ = this.collection.orderBy(p => p.x).thenOrderBy(p => p.y).values();

    this.pixels$.pipe(take(1)).subscribe((pixels) => {
      if (pixels.length === 0) {
        for (let x = 0; x < size; x++) {
          for (let y = 0; y < size; y++) {
            this.collection.add({
              color: 'darkBlue',
              x: x,
              y: y
            });
          }
        }
      }
    });
  }

  changeColor(pixel: Pixel, change: number) {
    const allColors = Lists.colors();
    let colorIndex = allColors.indexOf(pixel.color);
    colorIndex = (colorIndex + change) % allColors.length;

    if (colorIndex < 0) {
      colorIndex = allColors.length - 1;
    }

    this.collection.update({
      ...pixel,
      color: allColors[colorIndex]
    });
    return false;
  }

  ngOnInit() {
  }

}
