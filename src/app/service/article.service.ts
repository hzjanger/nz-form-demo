import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Classification} from '../entity/classification';
import {Article} from '../entity/article';
import {Label} from '../entity/label';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {


  url: string = "/assets/data";

  constructor(
    private http: HttpClient
  ) { }

  /**
   * 获取一级分类信息
   */
  getPrimaryClassification(): Observable<Classification[]> {
    return this.http.get<Classification[]>(`${this.url}/primaryClassification.json`);
  }

  /**
   * 获取二级分类
   */
  getSecondaryClassification(): Observable<Classification[]> {
    return this.http.get<Classification[]>(`${this.url}/secondaryClassification.json`);
  }

  /**
   * 获取更新信息
   */
  getArticleInfo(): Observable<Article> {
    return this.http.get<Article>(`${this.url}/classification.json`);
  }

  /**
   * 获取标签
   */
  getLabel(): Observable<Label[]> {
    return this.http.get<Label[]>(`${this.url}/label.json`);
  }


}
