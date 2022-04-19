import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { debounceTime, fromEvent } from 'rxjs';
import { Movie } from './models/movie';
import { MovieService } from './services/movie/movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'movies';
  moives: Movie[];
  search: string = "";
  @ViewChild("searchInput") input: ElementRef;
  constructor(private movieService: MovieService) {

  }
  ngAfterViewInit(): void {
    fromEvent(this.input.nativeElement, "keyup")
      .pipe(debounceTime(500)).
      subscribe(() => {
        if (this.search != "") {

          this.movieService.getMoviesByName(this.search).subscribe(movies => {

            this.moives = movies
          });
        }

  });
}

ngOnInit(): void {



  this.movieService.getMovies().subscribe(movies => {

    this.moives = movies
  });

}


}
