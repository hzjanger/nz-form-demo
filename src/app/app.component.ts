import {Component, OnInit} from '@angular/core';
import {ArticleService} from './service/article.service';
import {Classification} from './entity/classification';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Article} from './entity/article';
import {Label} from './entity/label';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  /**
   * 一级分类
   */
  primaryClassificationList: Classification[];

  /**
   * 二级分类
   */
  secondaryClassificationList: Classification[];

  /**
   * 标签信息
   */
  labelList: Label[] = [];

  articleForm: FormGroup;


  constructor(
    private articleService: ArticleService,
    private fb: FormBuilder
  ) {  }

  ngOnInit() {
    this.articleForm = this.fb.group({
      title: [null, [Validators.required]],
      primary: [null, [Validators.required]],
      secondary: [null, [Validators.required]],
      accessType: [null, [Validators.required]],
      label: this.buildLabel()
    });
    this.getPrimaryClassification();
    this.getLabel();
  }

  buildLabel() {
    return this.fb.array(
      this.labelList.map(value => {
        return this.fb.control(false);
      })
    );
  }

  /**
   * 获取一级分类
   */
  getPrimaryClassification() {
    this.articleService.getPrimaryClassification()
      .subscribe((data: Classification[]) => {
        this.primaryClassificationList = data;
      });
  }

  /**
   * 获取二级分类
   */
  getSecondaryClassification() {
    this.articleService.getSecondaryClassification()
      .subscribe((data: Classification[]) => {
        this.secondaryClassificationList = [];
          data.forEach(value => {
            if (value.parentId === this.primary.value.classificationId) {
              this.secondaryClassificationList.push(value);
            }
          });
      })
  }

  getArticleInfo() {
    this.articleService.getArticleInfo()
      .subscribe((data: Article) => {
        this.primary.setValue(data.primaryClassification);
        this.secondary.setValue(data.secondaryClassification);
        this.title.setValue(data.title);
        this.accessType.setValue(data.accessType);
        data.label.forEach((value, index) => {
          for (let i = 0; i < this.labelList.length; i++) {
            if (value.labelName == this.labelList[i].labelName && value.labelId == this.labelList[i].labelId) {
              this.label.get('' + i).setValue(true);
              break;
            }
          }
        });
      })
  }

  /**
   *
   * @param c1
   * @param c2
   */
  compareFn(c1: Classification, c2: Classification): boolean {
    return c1 && c2 ? c1.classificationId === c2.classificationId : c1 === c2;
  }

  /**
   * 选择一级分类,获取一级分类下的二级分类
   */
  selectPrimary() {
    this.secondary.patchValue(null);
    this.getSecondaryClassification();

  }

  /**
   * 获取标签信息
   */
  getLabel() {
    this.articleService.getLabel()
      .subscribe((data: Label[]) => {
        this.labelList = data;
        this.labelList.forEach(value => {
          this.label.push(this.fb.control(false));
        })
      });
  }

  submit() {
    console.log(this.articleForm.value);
  }

  /**
   * 获取一级分类表单
   */
  get primary(): FormControl {
    return this.articleForm.get('primary') as FormControl;
  }

  /**
   * 获取二级分类表单
   */
  get secondary(): FormControl {
    return this.articleForm.get('secondary') as FormControl;
  }


  get title(): FormControl {
    return this.articleForm.get('title') as FormControl;
  }

  /**
   * 获取发布类型表单
   */
  get accessType(): FormControl {
    return this.articleForm.get('accessType') as FormControl;
  }

  /**
   * 获取标签表单
   */
  get label(): FormArray {
    return this.articleForm.get('label') as FormArray;
  }

}
