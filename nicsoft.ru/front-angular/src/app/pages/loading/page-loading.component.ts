import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  templateUrl: './page-loading.component.html',
  styleUrls: ['./page-loading.component.css']
})
export class AppPageLoadingComponent implements OnInit {
  name = '';
  text0 = '';
  text1 = '';
  title = 'Загрузка данных из файлов';

  constructor(private extHttp: HttpClient) {
    this.onFirstResponse = this.onFirstResponse.bind(this);
    this.onSecondResponse = this.onSecondResponse.bind(this);
    this.onThirdResponse = this.onThirdResponse.bind(this);
  }

  ngOnInit() {
    this.extHttp.get('/assets/loading/first.json').subscribe(this.onFirstResponse);
  }

  private onFirstResponse(response) {
    const {
      name,
      url0,
      url1
    } = response;

    this.name = name;

    this.extHttp.get(url0, { responseType: 'text'}).subscribe(this.onSecondResponse);
    this.extHttp.get(url1, { responseType: 'text'}).subscribe(this.onThirdResponse);
  }

  private onSecondResponse(response) {
    this.text0 = response;
  }

  private onThirdResponse(response) {
    this.text1 = response;
  }
}
