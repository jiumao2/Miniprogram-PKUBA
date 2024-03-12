clear

% team_new = {};
team_new = {...
    'a1' 'm' '化学' ... % 男甲: ['','','','','','','','','','','','']
    'a2' 'm' '生科' ...
    'a3' 'm' '信科' ...
    'a4' 'm' '城环' ...
    'a5' 'm' '地空' ... 
    'a6' 'm' '法学' ...
    'b1' 'm' '医学' ...
    'b2' 'm' '数学' ...
    'b3' 'm' '环科' ...
    'b4' 'm' '经济' ...
    'b5' 'm' '软微' ...
    'b6' 'm' '外院' ...
    ...
    'A1' 'm' '电子' ... % 男乙: ['','','','','','','','','','','','','','','','','','','','','','','',''] 
    'A2' 'm' '社会' ...
    'A3' 'm' '教历' ...
    'A4' 'm' '中文' ... 
    'B1' 'm' '叉院' ...
    'B2' 'm' '国关' ...
    'B3' 'm' '光华' ...
    'B4' 'm' '马院' ...
    'C1' 'm' '物理' ...
    'C2' 'm' '材料' ...
    'C3' 'm' '信管' ...
    'C4' 'm' '计算机' ...
    'D1' 'm' '工学' ...
    'D2' 'm' '新传' ...
    'D3' 'm' '未来技术-现代农学院联队' ...
    'D4' 'm' '元培' ...
    'E1' 'm' '集电' ...
    'E2' 'm' '智能' ...
    'E3' 'm' '国发体教联队' ...
    'E4' 'm' '政管' ...
    'F1' 'm' '心理' ...
    'F2' 'm' '哲学' ...
    'F3' 'm' '燕京' ...
    'F4' 'm' '艺术' ...
    ...
    '1' 'f' '外院' ... % 女甲: ['','','','','','','','']
    '2' 'f' '法学' ...
    '3' 'f' '元培' ...
    '4' 'f' '马院' ... 
    '5' 'f' '医学' ...
    '6' 'f' '化学' ...
    '7' 'f' '信科' ...
    '8' 'f' '新传' ...
    ...
    'A1' 'f' '物理' ... % 女乙: ['','','','','','','','','','','','','']
    'A2' 'f' '光经' ...
    'A3' 'f' '燕京' ...
    'A4' 'f' '信管' ...
    'A5' 'f' '中文' ...
    'B1' 'f' '城环' ...
    'B2' 'f' '心理' ...
    'B3' 'f' '哲学教育联队' ...
    'B4' 'f' '社会' ...
    'C1' 'f' '数学' ...
    'C2' 'f' '生历' ...
    'C3' 'f' '国关' ...
    'C4' 'f' '政管' ...
    };
meta = ['{' ...
        '"games": ["男甲","男乙","女甲","女乙"],' ... % 应与app.js中GROUP_NAMES相同
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

count = 0;
for k = 1:row
    for j = 1:col
        if strfind(upper(data{k,j}),'VS')
            temp = data{k,j};
            temp(temp==' ')=''; % delete all space
            tempdata.sex = true;

            if temp(end-1) == '女'
                tempdata.sex = false;
                pos1 = strfind(upper(data{k,j}),'VS')-1;
%                 tempdata.group = meta.games{2};
                if isnan(str2double(temp(1:pos1))) && ~contains(temp(1:pos1),'甲')
                    tempdata.group = meta.games{4};
                else
                    tempdata.group = meta.games{3};
                end
                pos_end = 3;
            else
                tempdata.sex = true;
                pos1 = strfind(upper(data{k,j}),'VS')-1;
%                 tempdata.group = meta.games{1};
                if (temp(1)>='a' && temp(1)<='z') || contains(temp(1:pos1),'甲')
                    tempdata.group = meta.games{1};
                else
                    tempdata.group = meta.games{2};
                end
                pos_end = 0;
            end

            pos1 = strfind(upper(data{k,j}),'VS')-1;
            pos2 = pos1 + 3;
            tempdata.home_team = temp(1:pos1);
            tempdata.away_team = temp(pos2:end-pos_end);
            tempdata.home_team_score = -1;
            tempdata.away_team_score = -1;
            tempdata.home_team_point = 0;
            tempdata.away_team_point = 0;

            % description
            if ~isempty(strfind(tempdata.home_team, 'a')) ||...
                ~isempty(strfind(tempdata.home_team, 'b'))
                tempdata.description = '小组赛';
                tempdata.littlegroup = upper(tempdata.home_team(1));
            elseif ~isempty(strfind(tempdata.home_team, 'A')) ||...
                ~isempty(strfind(tempdata.home_team, 'B')) ||...
                ~isempty(strfind(tempdata.home_team, 'C'))
                tempdata.description = '小组赛';
                tempdata.littlegroup = upper(tempdata.home_team(1));
            elseif tempdata.sex==true && (~isempty(strfind(tempdata.home_team, 'D')) ||...
                ~isempty(strfind(tempdata.home_team, 'E')) ||...
                ~isempty(strfind(tempdata.home_team, 'F')))
                tempdata.description = '小组赛';
                tempdata.littlegroup = upper(tempdata.home_team(1));
            elseif tempdata.sex==false && length(tempdata.home_team)==1
                tempdata.description = '大循环';
                tempdata.littlegroup = 'A';
            elseif ~isempty(strfind(tempdata.home_team, '全明星'))
                tempdata.description = '全明星';
                tempdata.littlegroup = '';
            elseif ~isempty(strfind(tempdata.home_team, '决赛'))
                tempdata.description = '决赛';
                tempdata.littlegroup = '';
            elseif ~isempty(strfind(tempdata.home_team, 'c5')) ||...
                ~isempty(strfind(tempdata.home_team, 'c6')) ||...
                ~isempty(strfind(tempdata.home_team, 'd5')) ||...
                ~isempty(strfind(tempdata.home_team, 'd6'))
                tempdata.description = '保级赛';
                tempdata.littlegroup = '';
            else
                tempdata.description = '淘汰赛';
                tempdata.littlegroup = '';
            end
            
            % is_given_up
            tempdata.is_given_up = false;

            % updated_by
            tempdata.updated_by = '九毛';

            % adjustable
            if contains([tempdata.home_team,tempdata.away_team],'决赛') && ~contains([tempdata.home_team,tempdata.away_team],'半决赛')
                tempdata.adjustable = false;
                tempdata.place = '邱德拔';
            else
                tempdata.adjustable = true;
            end
            
            
            if strcmp(tempdata.group, meta.games{1})
                if strcmp(data{k,1},'2024/4/20') || strcmp(data{k,1},'2024/4/21')
                    tempdata.adjustable = false;
                end
            elseif strcmp(tempdata.group, meta.games{2})
                if strcmp(data{k,1},'2024/4/13') || strcmp(data{k,1},'2024/4/14')
                    tempdata.adjustable = false;
                elseif (strcmp(data{k,1},'2024/4/6') || strcmp(data{k,1},'2024/4/7')) && (tempdata.home_team(1)=='A' || tempdata.home_team(1)=='B' || tempdata.home_team(1)=='F')
                    tempdata.adjustable = false;
                end
            elseif strcmp(tempdata.group, meta.games{4})
                if strcmp(data{k,1},'2024/4/13') || strcmp(data{k,1},'2024/4/14')
                    tempdata.adjustable = false;
                end
            end

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
            if ~isempty(strfind(tempdata.home_team, '全明星'))
                tempdata.place = '五四东一';
                if tempdata.sex
                    tempdata.group = '男篮';
                else
                    tempdata.group = '女篮';
                end
            end
            
            temp_time = datetime([datestr(data{k,1},'yyyy/mm/dd'),datestr(data{1,j},' HH:MM:00')]);
            temp_time = temp_time - hours(8); %微信小程序数据库导入时区为+0，中国为+8
            tempdata0 = jsonencode(tempdata);
            tempdata0 = [tempdata0(1:end-1),',"time":{"$date":"',datestr(temp_time,'yyyy-mm-ddTHH:MM:00Z"}}')];
            data_new = [data_new,tempdata0];

            count = count+1;
        end
    end
end
disp(['共有', num2str(count), '场比赛!']);
disp(data_new)
fid = fopen('schedule.json','w','n','UTF-8');
fprintf(fid, '%s', data_new);
fclose(fid);