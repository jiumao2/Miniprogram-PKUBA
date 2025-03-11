%% 在微信开发者工具中运行以下代码
% var url = [];
% var fileID = [];
% wx.cloud.callFunction({
%     name:"get_all_photo_IDs",
%     success: res=>{
%         for (var i = 1; i<res.result.length; i++){
%             wx.cloud.getTempFileURL({
%                 fileList:[res.result[i]],
%                 success:res=>{
%                     url.push(res.fileList[0].tempFileURL);
%                     fileID.push(res.fileList[0].fileID)},
%                 fail:err=>{
%                     console.log(err)
%                     }
%                 })
%             }
%         }
%     });
% % 等待函数运行完成后，运行
% console.log(url.join(','))
% console.log(fileID.join(','))
% % 将结果拷贝至下方

temp_fileID = 'cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20240928_男篮_化学_VS_中文-国关_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20240928_女篮_社会_VS_环哲_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20240928_男篮_社会_VS_法学_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20240928_男篮_化学_VS_中文-国关_3.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20240928_男篮_化学_VS_中文-国关_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20240928_男篮_社会_VS_法学_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20240929_女篮_化学_VS_马院_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20240928_男篮_化学_VS_中文-国关_4.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20240928_男篮_社会_VS_法学_3.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20240928_男篮_社会_VS_法学_4.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20240929_男篮_医学_VS_元培_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20240929_女篮_化学_VS_马院_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20240929_男篮_医学_VS_元培_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20240929_男篮_工学_VS_生科_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20240929_男篮_地空_VS_环科_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20240929_女篮_化学_VS_马院_3.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20240929_男篮_工学_VS_生科_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20240929_男篮_地空_VS_环科_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241008_男篮_物理_VS_信科_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241008_男篮_物理_VS_信科_3.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241009_男篮_外院_VS_数学_3.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241008_男篮_物理_VS_信科_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241009_男篮_外院_VS_数学_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241009_男篮_外院_VS_数学_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241009_男篮_外院_VS_数学_4.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241009_男篮_外院_VS_数学_5.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241009_男篮_政管_VS_光经_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241009_男篮_政管_VS_光经_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241009_男篮_政管_VS_光经_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241010_男篮_考古-信管_VS_历哲_4.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241010_男篮_考古-信管_VS_历哲_5.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241010_男篮_考古-信管_VS_历哲_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241010_男篮_考古-信管_VS_历哲_3.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241010_男篮_考古-信管_VS_历哲_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241011_女篮_信管_VS_新传_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241011_女篮_信管_VS_新传_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241012_女篮_环哲_VS_物理_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241012_女篮_环哲_VS_物理_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241012_女篮_环哲_VS_物理_3.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241012_女篮_环哲_VS_物理_5.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241012_女篮_环哲_VS_物理_4.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241012_女篮_外院_VS_国关_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241012_男篮_数学_VS_信科_4.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241012_男篮_数学_VS_信科_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241012_男篮_数学_VS_信科_3.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241012_男篮_数学_VS_信科_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241012_男篮_中文-国关_VS_法学_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241012_女篮_外院_VS_国关_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241012_女篮_城环_VS_燕京_5.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241012_女篮_城环_VS_燕京_3.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241012_女篮_城环_VS_燕京_4.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241012_女篮_城环_VS_燕京_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241012_女篮_城环_VS_燕京_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241012_女篮_法学_VS_光经_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241012_女篮_心理_VS_数学_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241012_男篮_心城_VS_政管_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241012_男篮_心城_VS_政管_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241012_女篮_法学_VS_光经_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241012_男篮_心城_VS_政管_3.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241012_女篮_心理_VS_数学_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241012_女篮_心理_VS_数学_3.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241012_女篮_心理_VS_数学_4.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241012_男篮_外院_VS_物理_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241012_男篮_心城_VS_政管_4.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241012_男篮_外院_VS_物理_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241013_男篮_元培_VS_生科_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241013_男篮_元培_VS_生科_4.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241013_男篮_元培_VS_生科_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241013_男篮_元培_VS_生科_5.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241013_男篮_元培_VS_生科_3.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241013_女篮_法学_VS_信管_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241013_女篮_法学_VS_信管_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241013_女篮_马院_VS_国关_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241013_女篮_马院_VS_国关_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241023_男篮_环科_VS_历哲_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241013_女篮_社会_VS_中文_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241013_女篮_社会_VS_中文_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241013_女篮_心理_VS_城环_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241013_女篮_心理_VS_城环_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241013_男篮_医学_VS_工学_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241013_男篮_医学_VS_工学_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241014_女篮_化学_VS_外院_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241014_女篮_化学_VS_外院_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241012_男篮_中文-国关_VS_法学_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241016_女篮_医学_VS_考古-政管_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241016_女篮_医学_VS_考古-政管_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241018_女篮_中文_VS_物理_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241018_女篮_中文_VS_物理_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241018_女篮_中文_VS_物理_3.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241015_女篮_元培_VS_生历_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241015_女篮_元培_VS_生历_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241021_女篮_光经_VS_新传_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241021_女篮_光经_VS_新传_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241023_男篮_环科_VS_历哲_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241022_男篮_考古-信管_VS_环科_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241022_男篮_考古-信管_VS_环科_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241023_男篮_环科_VS_历哲_3.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241024_女篮_考古-政管_VS_地空_4.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241024_女篮_考古-政管_VS_地空_3.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241024_女篮_考古-政管_VS_地空_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241024_女篮_考古-政管_VS_地空_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241024_男篮_地空_VS_考古-信管_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241024_男篮_地空_VS_考古-信管_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241025_女篮_数学_VS_燕京_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241026_男篮_物理_VS_数学_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241025_女篮_数学_VS_燕京_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241026_男篮_物理_VS_数学_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241026_男篮_信科_VS_外院_3.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241026_女篮_国关_VS_化学_3.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241026_男篮_信科_VS_外院_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241026_男篮_信科_VS_外院_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241026_女篮_国关_VS_化学_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241026_女篮_国关_VS_化学_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241026_女篮_生历_VS_信科_4.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241026_女篮_生历_VS_信科_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241026_女篮_生历_VS_信科_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241025_女篮_数学_VS_燕京_3.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241026_女篮_外院_VS_马院_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241026_女篮_外院_VS_马院_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241026_女篮_外院_VS_马院_3.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241027_女篮_数学_VS_城环_4.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241026_男篮_光经_VS_心城_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241027_女篮_物理_VS_社会_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241027_女篮_物理_VS_社会_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241027_女篮_数学_VS_城环_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241027_女篮_数学_VS_城环_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241027_男篮_工学_VS_元培_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241027_女篮_数学_VS_城环_3.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241027_男篮_生科_VS_医学_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241027_男篮_生科_VS_医学_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241027_男篮_生科_VS_医学_3.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241027_男篮_工学_VS_元培_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241027_男篮_工学_VS_元培_4.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241027_男篮_工学_VS_元培_3.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241027_女篮_新传_VS_法学_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241027_女篮_中文_VS_环哲_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241027_女篮_信管_VS_光经_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241027_女篮_信管_VS_光经_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241027_女篮_地空_VS_医学_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241027_女篮_中文_VS_环哲_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241027_女篮_新传_VS_法学_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241027_女篮_地空_VS_医学_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241026_男篮_法学_VS_化学_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241027_女篮_燕京_VS_心理_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241026_男篮_法学_VS_化学_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241026_男篮_光经_VS_心城_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241028_女篮_信科_VS_元培_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241103_男篮_医学_VS_法学_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241102_男篮_化学_VS_环科_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241028_女篮_信科_VS_元培_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241103_女篮_法学_VS_外院_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241103_男篮_医学_VS_法学_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241103_女篮_法学_VS_外院_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241102_男篮_化学_VS_环科_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241103_女篮_心理_VS_信科_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241103_女篮_新传_VS_化学_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241103_女篮_心理_VS_信科_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241103_女篮_中文_VS_医学_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241103_女篮_新传_VS_化学_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241103_男篮_考古-信管_VS_元培_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241104_男篮_物理_VS_光经_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241103_男篮_元培_VS_考古–信管_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241103_女篮_新传_VS_化学_3.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241104_男篮_物理_VS_光经_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241103_男篮_考古-信管_VS_元培_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241103_女篮_外院_VS_法学_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241103_女篮_外院_VS_法学_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241110_男篮_化学_VS_物理_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241110_女篮_医学_VS_信科_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241110_男篮_化学_VS_物理_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241110_男篮_元培_VS_医学_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241110_男篮_元培_VS_医学_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241110_女篮_医学_VS_信科_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241111_女篮_外院_VS_化学_2.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241110_男篮_元培_VS_医学_3.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241111_女篮_外院_VS_化学_1.jpg,cloud://jiumao-5gniq4bm71dad3a0.6a69-jiumao-5gniq4bm71dad3a0-1306335529/20241117_女篮_外院_VS_医学_1.jpg';

temp_url = 'https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20240928_男篮_化学_VS_中文-国关_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20240928_女篮_社会_VS_环哲_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20240928_男篮_社会_VS_法学_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20240928_男篮_化学_VS_中文-国关_3.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20240928_男篮_化学_VS_中文-国关_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20240928_男篮_社会_VS_法学_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20240929_女篮_化学_VS_马院_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20240928_男篮_化学_VS_中文-国关_4.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20240928_男篮_社会_VS_法学_3.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20240928_男篮_社会_VS_法学_4.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20240929_男篮_医学_VS_元培_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20240929_女篮_化学_VS_马院_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20240929_男篮_医学_VS_元培_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20240929_男篮_工学_VS_生科_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20240929_男篮_地空_VS_环科_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20240929_女篮_化学_VS_马院_3.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20240929_男篮_工学_VS_生科_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20240929_男篮_地空_VS_环科_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241008_男篮_物理_VS_信科_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241008_男篮_物理_VS_信科_3.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241009_男篮_外院_VS_数学_3.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241008_男篮_物理_VS_信科_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241009_男篮_外院_VS_数学_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241009_男篮_外院_VS_数学_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241009_男篮_外院_VS_数学_4.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241009_男篮_外院_VS_数学_5.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241009_男篮_政管_VS_光经_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241009_男篮_政管_VS_光经_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241009_男篮_政管_VS_光经_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241010_男篮_考古-信管_VS_历哲_4.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241010_男篮_考古-信管_VS_历哲_5.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241010_男篮_考古-信管_VS_历哲_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241010_男篮_考古-信管_VS_历哲_3.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241010_男篮_考古-信管_VS_历哲_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241011_女篮_信管_VS_新传_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241011_女篮_信管_VS_新传_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241012_女篮_环哲_VS_物理_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241012_女篮_环哲_VS_物理_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241012_女篮_环哲_VS_物理_3.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241012_女篮_环哲_VS_物理_5.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241012_女篮_环哲_VS_物理_4.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241012_女篮_外院_VS_国关_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241012_男篮_数学_VS_信科_4.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241012_男篮_数学_VS_信科_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241012_男篮_数学_VS_信科_3.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241012_男篮_数学_VS_信科_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241012_男篮_中文-国关_VS_法学_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241012_女篮_外院_VS_国关_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241012_女篮_城环_VS_燕京_5.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241012_女篮_城环_VS_燕京_3.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241012_女篮_城环_VS_燕京_4.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241012_女篮_城环_VS_燕京_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241012_女篮_城环_VS_燕京_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241012_女篮_法学_VS_光经_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241012_女篮_心理_VS_数学_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241012_男篮_心城_VS_政管_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241012_男篮_心城_VS_政管_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241012_女篮_法学_VS_光经_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241012_男篮_心城_VS_政管_3.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241012_女篮_心理_VS_数学_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241012_女篮_心理_VS_数学_3.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241012_女篮_心理_VS_数学_4.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241012_男篮_外院_VS_物理_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241012_男篮_心城_VS_政管_4.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241012_男篮_外院_VS_物理_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241013_男篮_元培_VS_生科_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241013_男篮_元培_VS_生科_4.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241013_男篮_元培_VS_生科_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241013_男篮_元培_VS_生科_5.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241013_男篮_元培_VS_生科_3.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241013_女篮_法学_VS_信管_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241013_女篮_法学_VS_信管_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241013_女篮_马院_VS_国关_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241013_女篮_马院_VS_国关_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241023_男篮_环科_VS_历哲_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241013_女篮_社会_VS_中文_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241013_女篮_社会_VS_中文_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241013_女篮_心理_VS_城环_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241013_女篮_心理_VS_城环_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241013_男篮_医学_VS_工学_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241013_男篮_医学_VS_工学_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241014_女篮_化学_VS_外院_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241014_女篮_化学_VS_外院_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241012_男篮_中文-国关_VS_法学_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241016_女篮_医学_VS_考古-政管_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241016_女篮_医学_VS_考古-政管_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241018_女篮_中文_VS_物理_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241018_女篮_中文_VS_物理_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241018_女篮_中文_VS_物理_3.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241015_女篮_元培_VS_生历_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241015_女篮_元培_VS_生历_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241021_女篮_光经_VS_新传_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241021_女篮_光经_VS_新传_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241023_男篮_环科_VS_历哲_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241022_男篮_考古-信管_VS_环科_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241022_男篮_考古-信管_VS_环科_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241023_男篮_环科_VS_历哲_3.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241024_女篮_考古-政管_VS_地空_4.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241024_女篮_考古-政管_VS_地空_3.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241024_女篮_考古-政管_VS_地空_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241024_女篮_考古-政管_VS_地空_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241024_男篮_地空_VS_考古-信管_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241024_男篮_地空_VS_考古-信管_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241025_女篮_数学_VS_燕京_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241026_男篮_物理_VS_数学_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241025_女篮_数学_VS_燕京_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241026_男篮_物理_VS_数学_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241026_男篮_信科_VS_外院_3.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241026_女篮_国关_VS_化学_3.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241026_男篮_信科_VS_外院_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241026_男篮_信科_VS_外院_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241026_女篮_国关_VS_化学_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241026_女篮_国关_VS_化学_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241026_女篮_生历_VS_信科_4.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241026_女篮_生历_VS_信科_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241026_女篮_生历_VS_信科_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241025_女篮_数学_VS_燕京_3.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241026_女篮_外院_VS_马院_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241026_女篮_外院_VS_马院_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241026_女篮_外院_VS_马院_3.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241027_女篮_数学_VS_城环_4.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241026_男篮_光经_VS_心城_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241027_女篮_物理_VS_社会_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241027_女篮_物理_VS_社会_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241027_女篮_数学_VS_城环_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241027_女篮_数学_VS_城环_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241027_男篮_工学_VS_元培_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241027_女篮_数学_VS_城环_3.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241027_男篮_生科_VS_医学_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241027_男篮_生科_VS_医学_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241027_男篮_生科_VS_医学_3.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241027_男篮_工学_VS_元培_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241027_男篮_工学_VS_元培_4.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241027_男篮_工学_VS_元培_3.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241027_女篮_新传_VS_法学_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241027_女篮_中文_VS_环哲_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241027_女篮_信管_VS_光经_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241027_女篮_信管_VS_光经_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241027_女篮_地空_VS_医学_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241027_女篮_中文_VS_环哲_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241027_女篮_新传_VS_法学_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241027_女篮_地空_VS_医学_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241026_男篮_法学_VS_化学_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241027_女篮_燕京_VS_心理_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241026_男篮_法学_VS_化学_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241026_男篮_光经_VS_心城_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241028_女篮_信科_VS_元培_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241103_男篮_医学_VS_法学_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241102_男篮_化学_VS_环科_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241028_女篮_信科_VS_元培_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241103_女篮_法学_VS_外院_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241103_男篮_医学_VS_法学_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241103_女篮_法学_VS_外院_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241102_男篮_化学_VS_环科_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241103_女篮_心理_VS_信科_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241103_女篮_新传_VS_化学_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241103_女篮_心理_VS_信科_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241103_女篮_中文_VS_医学_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241103_女篮_新传_VS_化学_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241103_男篮_考古-信管_VS_元培_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241104_男篮_物理_VS_光经_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241103_男篮_元培_VS_考古–信管_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241103_女篮_新传_VS_化学_3.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241104_男篮_物理_VS_光经_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241103_男篮_考古-信管_VS_元培_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241103_女篮_外院_VS_法学_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241103_女篮_外院_VS_法学_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241110_男篮_化学_VS_物理_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241110_女篮_医学_VS_信科_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241110_男篮_化学_VS_物理_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241110_男篮_元培_VS_医学_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241110_男篮_元培_VS_医学_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241110_女篮_医学_VS_信科_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241111_女篮_外院_VS_化学_2.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241110_男篮_元培_VS_医学_3.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241111_女篮_外院_VS_化学_1.jpg,https://6a69-jiumao-5gniq4bm71dad3a0-1306335529.tcb.qcloud.la/20241117_女篮_外院_VS_医学_1.jpg';

%%
idx = find(temp_url == ',');
urls = cell(1, length(idx)+1);
for k = 1:length(idx)+1
    if k == 1
        urls{k} = temp_url(1:idx(1)-1);
    elseif k == length(idx)+1
        urls{k} = temp_url(idx(end)+1:end);
    else
        urls{k} = temp_url(idx(k-1)+1:idx(k)-1);
    end
end

idx = find(temp_fileID == ',');
fileIDs = cell(1, length(idx)+1);
filenames = cell(1, length(idx)+1);
for k = 1:length(idx)+1
    if k == 1
        fileIDs{k} = temp_fileID(1:idx(1)-1);
    elseif k == length(idx)+1
        fileIDs{k} = temp_fileID(idx(end)+1:end);
    else
        fileIDs{k} = temp_fileID(idx(k-1)+1:idx(k)-1);
    end
    
    [~, name, ext] = fileparts(fileIDs{k});
    filenames{k} = [name, ext];
end

folder_save = './Backup/Photo';
for k = 1:length(urls)
    if isempty(urls{k})
        continue
    end
    websave(fullfile(folder_save, filenames{k}), urls{k});
end


