import {Classification} from './classification';
import {Label} from './label';
/**
 * 文章实体
 */
export class Article {

  /**
   * 文章id
   */
  articleId: number;

  /**
   * 文章的标题
   */
  title: string;

  /**
   * 文章的一级分类
   */
  primaryClassification: Classification;

  /**
   * 文章的二级分类
   */
  secondaryClassification: Classification;

  /**
   * 发布类型
   */
  accessType: string;

  /**
   * 文章的标签
   */
  label: Label[]

}
