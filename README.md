![avatar](/miniprogram_code.jpg)
# 北大篮协小程序

用于新生杯、北大杯的赛程管理。

### 使用方式：
1. 在schedule.xlsx中按照模板设计比赛
2. 修改“北大篮协小程序/miniprogram/app.js”文件中globalData对象的相应属性
3. 修改“北大篮协小程序/xls2Json”文件中的meta与place_all变量
4. 使用MATLAB的xls2Json将其转换为schedule.json文件
5. 在数据库中重建原有的Schedule, Request, Leader等新集合，将schedule.json导入Schedule集合中
6. 使用




 