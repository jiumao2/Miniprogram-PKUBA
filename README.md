# 北大篮协小程序

用于新生杯、北大杯的赛程管理

### 数据库内容：
1. 赛程 schedule
主队home 客队away 日期date 时间time 场地place 性别sex 组别group 

2. 申请调整 apply
主队home 客队away 原日期date 原时间time 原场地place 性别sex 组别group 新日期date_new 新时间time_new 新场地place_new 申请日期apply_date 申请时间 apply_time 申请方applicant 申请状态state

3. 领队leader
球队team 姓名name 球队性别sex 组别group 手机phone 特征码openID

### 使用方式：
1. 在schedule.xlsx中按照模板设计比赛
2. 修改“北大篮协小程序/miniprogram/app.js”文件中globalData对象的相应属性
3. 修改“北大篮协小程序/xls2Json”文件中的meta与place_all变量
4. 使用MATLAB的csv2Json将其转换为schedule.json文件
5. 在数据库中重建原有的Schedule, Request, Leader等新集合，将schedule.json导入Schedule集合中
6. 使用




 