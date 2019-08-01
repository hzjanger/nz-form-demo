import {Label} from './label';

export class Classification {
  /**
   * 分类id
   */
  classificationId: number;
  /**
   * 分类名称
   */
  classificationName: string;

  /**
   * 父级分类id,如果是一级分类,parentId为0,如果是二级分类,parentId就是一级分类的id
   */
  parentId: number;

  /**
   * 标签信息
   */
  label: Label[];

}
