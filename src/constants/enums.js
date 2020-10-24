/**
 * 静态枚举：前端存的枚举数据
 */

// 是否
const IS_NOT = [
  { id: 0, name: '否', color: '#F14D40' },
  { id: 1, name: '是', color: '#00CD87' }
];

// 网络状态
const NET_STATUS = [
  { id: 0, name: '下线', color: '#EBEFFF' },
  { id: 1, name: '在线', color: '#00CD87' }
];

// 录像状态
const VIDEO_STATUS = [
  { id: 0, name: '未绑定' },
  { id: 1, name: '已绑定' }
];

// 人口库类型
const POPULATION_TYPE = [
  { id: 0, name: '常住人口库' },
  { id: 1, name: '黑名单库' },
  { id: 2, name: '嫌犯库' },
  { id: 3, name: '其他' }
];

// 人像特征提取状态
const PORTRAIT_FEATURE_TYPE = [
  { id: 0, color: '#2F54C9', name: '待提取' },
  { id: 1, color: '#26F197', name: '成功' },
  { id: 2, color: '#EBEFFF', name: '失败' }
];

// 布控状态
const DISRTBUTION_TYPE = [
  { id: 0, value: 'KEYUNUSE', name: '未执行' },
  { id: 1, value: 'KWORKING', name: '执行中' },
  { id: 2, value: 'KEYDONE', name: '已完成' },
  { id: 3, value: 'KEYERROR', name: '执行错误' },
  { id: 4, value: 'KEYTIMEOUT', name: '执行超时' },
  { id: 5, value: 'KEYEXIT', name: '退出指令' }
];

// 民族
const NATION_LIST = [
  { id: 0, name: '汉族' },
  { id: 1, name: '蒙古族' },
  { id: 2, name: '回族' },
  { id: 3, name: '藏族' },
  { id: 4, name: '维吾尔族' },
  { id: 5, name: '苗族' },
  { id: 6, name: '彝族' },
  { id: 7, name: '壮族' },
  { id: 8, name: '布依族' },
  { id: 9, name: '朝鲜族' },
  { id: 10, name: '满族' },
  { id: 11, name: '侗族' },
  { id: 12, name: '瑶族' },
  { id: 13, name: '白族' },
  { id: 14, name: '土家族' },
  { id: 15, name: '哈尼族' },
  { id: 16, name: '哈萨克族' },
  { id: 17, name: '傣族' },
  { id: 18, name: '黎族' },
  { id: 19, name: '傈僳族' },
  { id: 20, name: '佤族' },
  { id: 21, name: '畲族' },
  { id: 22, name: '高山族' },
  { id: 23, name: '拉祜族' },
  { id: 24, name: '水族' },
  { id: 25, name: '东乡族' },
  { id: 26, name: '纳西族' },
  { id: 27, name: '景颇族' },
  { id: 28, name: '柯尔克孜族' },
  { id: 29, name: '土族' },
  { id: 30, name: '达斡尔族' },
  { id: 31, name: '仫佬族' },
  { id: 32, name: '羌族' },
  { id: 33, name: '布朗族' },
  { id: 34, name: '撒拉族' },
  { id: 35, name: '毛南族' },
  { id: 36, name: '仡佬族' },
  { id: 37, name: '锡伯族' },
  { id: 38, name: '阿昌族' },
  { id: 39, name: '普米族' },
  { id: 40, name: '塔吉克族' },
  { id: 41, name: '怒族' },
  { id: 42, name: '乌孜别克族' },
  { id: 43, name: '俄罗斯族' },
  { id: 44, name: '鄂温克族' },
  { id: 45, name: '德昂族' },
  { id: 46, name: '保安族' },
  { id: 47, name: '裕固族' },
  { id: 48, name: '京族' },
  { id: 49, name: '塔塔尔族' },
  { id: 50, name: '独龙族' },
  { id: 51, name: '鄂伦春族' },
  { id: 52, name: '赫哲族' },
  { id: 53, name: '门巴族' },
  { id: 54, name: '珞巴族' },
  { id: 55, name: '基诺族' }
];

export default {
  IS_NOT,
  NET_STATUS,
  VIDEO_STATUS,
  POPULATION_TYPE,
  PORTRAIT_FEATURE_TYPE,
  DISRTBUTION_TYPE,
  NATION_LIST
};
