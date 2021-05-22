

// 基本配置文件
export interface Config {

}
/**
 * 
 */
export interface LocalConfig {

}
/**
 * 
 */
export interface Value<T> {
    value: T;
    valid?: boolean;
}


/*
  section 
  auto: 自动填充
  type: 自动填充数据类型
  data: 数据
*/
export interface SecInputValue {
    key: string;
    data: any;
    auto: boolean;
    type: string;
}