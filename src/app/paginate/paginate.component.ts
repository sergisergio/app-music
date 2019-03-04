import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.scss']
})
export class PaginateComponent implements OnInit {


  @Output() setPaginate: EventEmitter<{ start: number; end: number }> = new EventEmitter();

  pages: number[] = []; // pages num
  perPage: number; // number album(s) per page variable d'env
  total; // total albums
  numberPages: number = 0;
  currentPage: number;

  constructor(private aS: AlbumService) {
    this.perPage = this.aS.paginateNumberPage();
  }

  ngOnInit() {
    this.init();
  }

  /**
   *  init paginate
   * @param page
   */
  init(page : number = 1) {
    this.total = this.aS.count();
      this.numberPages = Math.ceil(this.total / this.perPage);
      this.currentPage = page;
      this.pages = [];
      for (let i = 1; i < this.numberPages + 1; i++) {
        this.pages.push(i);
      }
  }

  selectedPage(page: number) {
    this.currentPage = page;
    this.setPaginate.emit(this.paginate(page));

  }

  next() {
    if (this.currentPage >= this.numberPages) {
      this.currentPage = 1;
    } else {
      this.currentPage++;
    }
    this.setPaginate.emit(this.paginate(this.currentPage)); // émettre la page courante
  }

  previous() {
    if (this.currentPage == 1) {
      this.currentPage = this.numberPages;
    } else {
      this.currentPage--;
    }
    this.setPaginate.emit(this.paginate(this.currentPage));

  }

  paginate(page: number): { start: number, end: number } {
    let start = (page - 1) * this.perPage; // 0 2
    let end = start + this.perPage; // 2 4

    return { start: start, end: end };
  }

}
