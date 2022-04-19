import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Iomdb } from 'src/app/models/Iomdb/iomdb';
import { Movie } from 'src/app/models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http: HttpClient) { }
  getMovies(): Observable<Movie[]> {
    
    const baseurl = "http://www.omdbapi.com/?i=tt3896198&apikey=1ee2ab74";
    const url = "https://www.omdbapi.com/?s=game&apikey=1ee2ab74";

    return this.http.get<Iomdb>(url).pipe(
      map(response => {
             return response.Search.map(c => new Movie(c.Poster, c.Title, c.Type, c.Year, c.imdbID));

      }));




  }
  getMoviesByName(term:string){
    const url = `https://www.omdbapi.com/?s=${term}&apikey=1ee2ab74`;

    return this.http.get<Iomdb>(url).pipe(
      map(response => {
             return response.Search.map(c => new Movie(c.Poster, c.Title, c.Type, c.Year, c.imdbID));

      }));


  }
}
