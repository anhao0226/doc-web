

// 基本配置文件
export interface Config {

}

// 本地配置文件
export interface LocalConfig {

}

// 通用返回数据格式
export interface Value<T> {
    valid: boolean
    data: T
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