clear

% team_new = {};
team_new = {...
    'A1' 'm' '医学' ... % 男甲: ["","","","","","","","","","","",""] 
    'A2' 'm' '城环' ...
    'A3' 'm' '经济' ...
    'A4' 'm' '外院' ... 
    'A5' 'm' '软微' ... 
    'A6' 'm' '环科' ... 
    'B1' 'm' '生科' ...
    'B2' 'm' '数学' ...
    'B3' 'm' '燕京' ...
    'B4' 'm' '化学' ...
    'B5' 'm' '信科' ...
    'B6' 'm' '工学' ...
    ... % 男乙：["","","","","","","","","","","","","","","","","","","","","",""]
    'a1' 'm' '光华' ...
    'a2' 'm' '元培' ...
    'a3' 'm' '哲学' ...
    'a4' 'm' '法学' ...
    'b1' 'm' '物理' ...
    'b2' 'm' '马院' ...
    'b3' 'm' '智能' ...
    'b4' 'm' '考古-艺术' ...
    'c1' 'm' '电子' ...
    'c2' 'm' '心理' ...
    'c3' 'm' '地空-政管' ...
    'c4' 'm' '中文' ...
    'd1' 'm' '叉院' ...
    'd2' 'm' '未来-现代' ...
    'd3' 'm' '计算机' ...
    'd4' 'm' '信管' ...
    'd5' 'm' '社会' ...
    'e1' 'm' '教育-历史' ...
    'e2' 'm' '集电-体教' ...
    'e3' 'm' '材料' ...
    'e4' 'm' '新传' ...
    'e5' 'm' '国关' ...
    ... % 女甲: ["","","","","","","",""]
    'A1' 'f' '数学' ...
    'A2' 'f' '化学' ...
    'A3' 'f' '元培' ...
    'A4' 'f' '信科' ...
    'A5' 'f' '医学' ...
    'A6' 'f' '心理' ...
    'A7' 'f' '外院' ...
    'A8' 'f' '法学' ...
    ... % 女乙: "","","","","","","","","","","","",""]
    'a1' 'f' '生科-历史' ...
    'a2' 'f' '光华-经济' ...
    'a3' 'f' '燕京' ...
    'a4' 'f' '考古-政管' ...
    'b1' 'f' '物理' ...
    'b2' 'f' '地空' ...
    'b3' 'f' '环科-哲学' ...
    'b4' 'f' '新传' ...
    'c1' 'f' '国关' ...
    'c2' 'f' '中文' ...
    'c3' 'f' '马院' ...
    'c4' 'f' '城环' ...
    'c5' 'f' '信管' ...
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
[~,txt,data] = xlsread('./schedule.xlsx');

[row,col] = size(data);
data_new = [];

count = 0;
for k = 1:row
    for j = 1:col
        tempdata = struct();
        if strfind(upper(data{k,j}),'VS')
            temp = data{k,j};
            temp(temp==' ')=''; % delete all space
            tempdata.sex = true;

            if temp(end-1) == '女'
                tempdata.sex = false;
                pos1 = strfind(upper(data{k,j}),'VS')-1;
%                 tempdata.group = meta.games{2};
                if (temp(1)>='A' && temp(1)<='Z') && ~contains(temp(1:pos1),'甲')
                    tempdata.group = meta.games{3};
                else
                    tempdata.group = meta.games{4};
                end
                pos_end = 3;
            else
                tempdata.sex = true;
                pos1 = strfind(upper(data{k,j}),'VS')-1;
%                 tempdata.group = meta.games{1};
                if (temp(1)>='A' && temp(1)<='Z') || contains(temp(1:pos1),'甲')
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
            if tempdata.sex==true
                if ~isempty(strfind(tempdata.home_team, 'A')) ||...
                    ~isempty(strfind(tempdata.home_team, 'B'))
                    tempdata.description = '小组赛';
                    tempdata.littlegroup = upper(tempdata.home_team(1));
                elseif ~isempty(strfind(tempdata.home_team, 'a')) ||...
                    ~isempty(strfind(tempdata.home_team, 'b')) ||...
                    ~isempty(strfind(tempdata.home_team, 'c')) ||...
                    ~isempty(strfind(tempdata.home_team, 'd')) ||...
                    ~isempty(strfind(tempdata.home_team, 'e'))
                    tempdata.description = '小组赛';
                    tempdata.littlegroup = upper(tempdata.home_team(1));
                elseif ~isempty(strfind(tempdata.home_team, 'f'))
                    tempdata.description = '淘汰赛';
                    tempdata.littlegroup = '';
                elseif ~isempty(strfind(tempdata.home_team, 'g'))
                    tempdata.description = '半决赛';
                    tempdata.littlegroup = '';
                elseif ~isempty(strfind(tempdata.home_team, '决赛'))
                    tempdata.description = '决赛';
                    tempdata.littlegroup = '';
                elseif ~isempty(strfind(tempdata.home_team, '半决赛'))
                    tempdata.description = '半决赛';
                    tempdata.littlegroup = '';
                elseif ~isempty(strfind(tempdata.home_team, '保级赛'))
                    tempdata.description = '保级赛';
                    tempdata.littlegroup = '';
                else
                    error('Unknown game!');
                end
            else
                if ~isempty(strfind(tempdata.home_team, 'A'))
                    tempdata.description = '循环赛';
                    tempdata.littlegroup = upper(tempdata.home_team(1));
                elseif ~isempty(strfind(tempdata.home_team, 'a')) ||...
                    ~isempty(strfind(tempdata.home_team, 'b')) ||...
                    ~isempty(strfind(tempdata.home_team, 'c'))
                    tempdata.description = '小组赛';
                    tempdata.littlegroup = upper(tempdata.home_team(1));
                elseif ~isempty(strfind(tempdata.home_team, 'd'))
                    tempdata.description = '淘汰赛';
                    tempdata.littlegroup = '';
                elseif ~isempty(strfind(tempdata.home_team, 'e'))
                    tempdata.description = '半决赛';
                    tempdata.littlegroup = '';
                elseif ~isempty(strfind(tempdata.home_team, '决赛'))
                    tempdata.description = '决赛';
                    tempdata.littlegroup = '';
                else
                    error('Unknown game!');
                end
            end

%             if ~isempty(strfind(tempdata.home_team, 'a')) ||...
%                 ~isempty(strfind(tempdata.home_team, 'b'))
%                 tempdata.description = '小组赛';
%                 tempdata.littlegroup = upper(tempdata.home_team(1));
%             elseif ~isempty(strfind(tempdata.home_team, 'A')) ||...
%                 ~isempty(strfind(tempdata.home_team, 'B')) ||...
%                 ~isempty(strfind(tempdata.home_team, 'C'))
%                 tempdata.description = '小组赛';
%                 tempdata.littlegroup = upper(tempdata.home_team(1));
%             elseif tempdata.sex==true && (~isempty(strfind(tempdata.home_team, 'D')) ||...
%                 ~isempty(strfind(tempdata.home_team, 'E')) ||...
%                 ~isempty(strfind(tempdata.home_team, 'F')))
%                 tempdata.description = '小组赛';
%                 tempdata.littlegroup = upper(tempdata.home_team(1));
%             elseif tempdata.sex==false && length(tempdata.home_team)==1
%                 tempdata.description = '大循环';
%                 tempdata.littlegroup = 'A';
%             elseif ~isempty(strfind(tempdata.home_team, '全明星'))
%                 tempdata.description = '全明星';
%                 tempdata.littlegroup = '';
%             elseif ~isempty(strfind(tempdata.home_team, '决赛'))
%                 tempdata.description = '决赛';
%                 tempdata.littlegroup = '';
%             elseif ~isempty(strfind(tempdata.home_team, 'c5')) ||...
%                 ~isempty(strfind(tempdata.home_team, 'c6')) ||...
%                 ~isempty(strfind(tempdata.home_team, 'd5')) ||...
%                 ~isempty(strfind(tempdata.home_team, 'd6'))
%                 tempdata.description = '保级赛';
%                 tempdata.littlegroup = '';
%             else
%                 tempdata.description = '淘汰赛';
%                 tempdata.littlegroup = '';
%             end
            
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
                if (strcmp(data{k,1},'2025/4/12') || strcmp(data{k,1},'2025/4/13'))
                    tempdata.adjustable = false;
                end
            elseif strcmp(tempdata.group, meta.games{2})
                if (strcmp(data{k,1},'2025/4/12') || strcmp(data{k,1},'2025/4/13'))...
                        || (strcmp(data{k,1},'2025/4/5')...
                        && ~isempty(strfind(tempdata.home_team, 'a')))
                    tempdata.adjustable = false;
                end
            elseif strcmp(tempdata.group, meta.games{4})
                if strcmp(data{k,1},'2025/4/12') || strcmp(data{k,1},'2025/4/13')
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
fprintf(fid, '%s\n', data_new);
disp(' ');
fclose(fid);

%% team.json
data_all = [];
count_team = 0;
for k = 1:3:length(team_new)
    group_this = team_new{k};
    gender_this = team_new{k+1}=='m';
    name_this = team_new{k+2};

%     if gender_this
%         group_name = '男篮';
%         littlegroup = upper(group_this(1));
%     else
%         group_name = '女篮';
%         littlegroup = upper(group_this(1));
%     end

    if gender_this && (group_this(1) == 'A' || group_this(1) == 'B')
        group_name = '男甲';
        littlegroup = upper(group_this(1));
    elseif gender_this
        group_name = '男乙';
        littlegroup = upper(group_this(1));
    elseif ~gender_this && group_this(1) == 'A'
        group_name = '女甲';
        littlegroup = 'A';
    else
        group_name = '女乙';
        littlegroup = upper(group_this(1));
    end
    
    tempdata = struct();
    tempdata.group = group_name;
    tempdata.littlegroup = littlegroup;
    tempdata.name = name_this;

    tempdata_json = jsonencode(tempdata);
    data_all = [data_all, tempdata_json];
    count_team = count_team+1;
end

disp(['共有', num2str(count_team), '支队伍!']);
disp(data_all)
fid = fopen('team.json','w','n','UTF-8');
fprintf(fid, '%s', data_all);
fclose(fid);


