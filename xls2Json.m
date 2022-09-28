clear

% 男篮: ['工地','法社','历哲','信心','城环','国关','化学','经济','政管','生科','数学','物理','元培','信科','医学','外院','光华','环科','中文'],
% 女篮: ['光经','生历','艺哲','城环','地空','国关','化学','软微','社会','数学','外院','物理','心理','新传','信管','信科','医学','元培','政管','法学','马院','中文'],

% team_new = {};
team_new = {...
    'A1' 'm' '经济' ... % 男篮: ['','','','','','','','','','','','','','','','','','','']
    'A2' 'm' '城环' ...
    'A3' 'm' '外院' ...
    'A4' 'm' '法社' ...
    'B1' 'm' '物理' ... 
    'B2' 'm' '信科' ...
    'B3' 'm' '中文' ...
    'B4' 'm' '化学' ...
    'C1' 'm' '医学' ...
    'C2' 'm' '国关' ...
    'C3' 'm' '生科' ...
    'C4' 'm' '政管' ...
    'D1' 'm' '环科' ...
    'D2' 'm' '数学' ...
    'D3' 'm' '历哲' ...
    'D4' 'm' '元培' ... 
    'E1' 'm' '光华' ...
    'E2' 'm' '工地' ...
    'E3' 'm' '信心' ...
    ...
    'A1' 'f' '医学' ... % 女乙: ['','','','','','','','','','','','','','','','','','','','','','']
    'A2' 'f' '信管' ...
    'A3' 'f' '中文' ...
    'A4' 'f' '软微' ...
    'B1' 'f' '外院' ...
    'B2' 'f' '社会' ...
    'B3' 'f' '心理' ...
    'B4' 'f' '地空' ...
    'C1' 'f' '城环' ...
    'C2' 'f' '艺哲' ...
    'C3' 'f' '光经' ...
    'C4' 'f' '马院' ...
    'D1' 'f' '元培' ...
    'D2' 'f' '法学' ...
    'D3' 'f' '数学' ...
    'D4' 'f' '国关' ...
    'E1' 'f' '新传' ...
    'E2' 'f' '生历' ...
    'E3' 'f' '政管' ...
    'F1' 'f' '信科' ...
    'F2' 'f' '物理' ...
    'F3' 'f' '化学' ...
    };
meta = ['{' ...
        '"games": ["男篮","女篮"],' ... % 应与app.js中GROUP_NAMES相同
        '"place_all": ["五四东一","五四东二","五四东三","邱德拔"]' ... 
        '}' ];
meta = jsondecode(meta);


place_all = meta.place_all;
place_num = length(place_all);
place = cell(place_num,1);
% 规定表中每一列所使用的场地
place{1} = [2,5,8,12,14,17]; % xls表格中的第2,5,8,12,14,17列使用第一个场地
place{2} = [3,6,9,13,15];
place{3}= [4,7,10];
place{4} = [11,16];


% 读取表格，生成可被导入至小程序的json文件
[~,txt,data] = xlsread('schedule.xlsx');

[row,col] = size(data);
data_new = [];
for k = 1:row
    for j = 1:col
        if strfind(upper(data{k,j}),'VS')
            temp = data{k,j};
            temp(temp==' ')=''; % delete all space
            tempdata.sex = true;
            if temp(end-1) == '女'
                tempdata.sex = false;
                tempdata.group = meta.games{2};
%                 if strcmp(temp(1),'甲')
%                     tempdata.group = meta.games{3};
%                 else
%                     tempdata.group = meta.games{4};
%                 end
                pos_end = 3;
            else
                tempdata.sex = true;
                tempdata.group = meta.games{1};
%                 if strcmp(temp(1),'甲')
%                     tempdata.group = meta.games{1};
%                 else
%                     tempdata.group = meta.games{2};
%                 end
                pos_end = 0;
            end
            if strfind(data{k,j},'VS')
                pos1 = strfind(data{k,j},'VS')-1;
            elseif strfind(data{k,j},'vs')
                pos1 = strfind(data{k,j},'vs')-1;
            end
            pos2 = pos1 + 3;
            tempdata.home_team = temp(1:pos1);
            tempdata.away_team = temp(pos2:end-pos_end);
            tempdata.home_team_score = -1;
            tempdata.away_team_score = -1;
            % substitute
            for i = 1:3:length(team_new)
                if strcmp(tempdata.home_team,team_new{i}) && (tempdata.sex == (strcmp(team_new{i+1},'m')))
                    tempdata.home_team = team_new{i+2};
                elseif strcmp(tempdata.home_team,team_new{i}) && (tempdata.sex == (~strcmp(team_new{i+1},'f')))
                    tempdata.home_team = team_new{i+2};                    
                end
                if strcmp(tempdata.away_team,team_new{i}) && (tempdata.sex == (strcmp(team_new{i+1},'m')))
                    tempdata.away_team = team_new{i+2};
                elseif strcmp(tempdata.away_team,team_new{i}) && (tempdata.sex == (~strcmp(team_new{i+1},'f')))
                    tempdata.away_team = team_new{i+2};                    
                end
            end
            for i = 1:place_num
                if sum(place{i}==j)>=1
                    tempdata.place = place_all{i};
                    break
                end
            end
            if contains([tempdata.home_team,tempdata.away_team],'决赛') && ~contains([tempdata.home_team,tempdata.away_team],'半决赛')
                tempdata.adjustable = false;
            else
                tempdata.adjustable = true;
            end
            
            if strcmp(data{k,1},'2022/11/4') || strcmp(data{k,1},'2022/11/5')
                tempdata.adjustable = false;
            end
            
            temp_time = datetime([datestr(data{k,1},'yyyy/mm/dd'),datestr(data{1,j},' HH:MM:00')]);
            temp_time = temp_time - hours(8); %微信小程序数据库导入时区为+0，中国为+8
            tempdata0 = jsonencode(tempdata);
            tempdata0 = [tempdata0(1:end-1),',"time":{"$date":"',datestr(temp_time,'yyyy-mm-ddTHH:MM:00Z"}}')];
            data_new = [data_new,tempdata0];
        end
    end
end
disp(data_new)
fid = fopen('schedule.json','w','n','UTF-8');
fprintf(fid, '%s', data_new);
fclose(fid);