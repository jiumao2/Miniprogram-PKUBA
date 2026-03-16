clear

% team_new = {};
team_new = {...
    'A1' 'm' '医学' ... % 男甲: ["","","","","","","","","","","",""] 
    'A2' 'm' '城环' ...
    'A3' 'm' '经济' ...
    'A4' 'm' '信科' ... 
    'A5' 'm' '叉院' ... 
    'A6' 'm' '软微' ... 
    'B1' 'm' '数学' ...
    'B2' 'm' '化学' ...
    'B3' 'm' '工学' ...
    'B4' 'm' '元培' ...
    'B5' 'm' '生科' ...
    'B6' 'm' '外院' ...
    ... % 男乙：["","","","","","","","","","","","","","","","","","","","","",""]
    'a1' 'm' '信管' ...
    'a2' 'm' '哲学' ...
    'a3' 'm' '材料' ...
    'a4' 'm' '环科' ...
    'b1' 'm' '智能' ...
    'b2' 'm' '力工-先机' ...
    'b3' 'm' '中文-艺术' ...
    'b4' 'm' '光华' ...
    'c1' 'm' '心理' ...
    'c2' 'm' '新传' ...
    'c3' 'm' '电子' ...
    'c4' 'm' '社会' ...
    'c5' 'm' '历史' ...
    'd1' 'm' '物理' ...
    'd2' 'm' '未来-现代' ...
    'd3' 'm' '政管' ...
    'd4' 'm' '地空-集电' ...
    'd5' 'm' '法学' ...
    'e1' 'm' '计算机' ...
    'e2' 'm' '国关' ...
    'e3' 'm' '马院' ...
    'e4' 'm' '考古' ...
    'e5' 'm' '燕京' ...
    ... % 女甲: ["","","","","","","",""]
    'C1' 'f' '外院' ...
    'C2' 'f' '化学' ...
    'C3' 'f' '法学' ...
    'C4' 'f' '燕京' ...
    'C5' 'f' '信科' ...
    'C6' 'f' '元培' ...
    'C7' 'f' '医学' ...
    'C8' 'f' '物理' ...
    ... % 女乙: "","","","","","","","","","","","",""]
    'f1' 'f' '地空' ...
    'f2' 'f' '生科-历史' ...
    'f3' 'f' '信管' ...
    'f4' 'f' '工学-材料' ...
    'g1' 'f' '城环' ...
    'g2' 'f' '新传' ...
    'g3' 'f' '数学' ...
    'g4' 'f' '马院' ...
    'g5' 'f' '中文' ...
    'h1' 'f' '光华-经济' ...
    'h2' 'f' '国关' ...
    'h3' 'f' '社会-政管' ...
    'h4' 'f' '环科-哲学' ...
    'h5' 'f' '心理' ...
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
                if (temp(1)>='A' && temp(1)<='C') || contains(temp(1:pos1),'甲')
                    tempdata.group = meta.games{3};
                else
                    tempdata.group = meta.games{4};
                end
                pos_end = 3;
            else
                tempdata.sex = true;
                pos1 = strfind(upper(data{k,j}),'VS')-1;
%                 tempdata.group = meta.games{1};
                if (temp(1)>='A' && temp(1)<='B') || contains(temp(1:pos1),'甲')
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
                elseif ~isempty(strfind(tempdata.home_team, 'P')) ||...
                        ~isempty(strfind(tempdata.home_team, 'Q'))
                    tempdata.description = '淘汰赛';
                    tempdata.littlegroup = '';
%                 elseif ~isempty(strfind(tempdata.home_team, 'g'))
%                     tempdata.description = '半决赛';
%                     tempdata.littlegroup = '';
                elseif ~isempty(strfind(tempdata.home_team, '半决赛'))
                    tempdata.description = '半决赛';
                    tempdata.littlegroup = '';
                elseif ~isempty(strfind(tempdata.home_team, '决赛'))
                    tempdata.description = '决赛';
                    tempdata.littlegroup = '';
                elseif ~isempty(strfind(tempdata.home_team, '保级赛'))
                    tempdata.description = '保级赛';
                    tempdata.littlegroup = '';
                else
                    error('Unknown game!');
                end
            else
                if ~isempty(strfind(tempdata.home_team, 'C'))
                    tempdata.description = '循环赛';
                    tempdata.littlegroup = upper(tempdata.home_team(1));
                elseif ~isempty(strfind(tempdata.home_team, 'f')) ||...
                    ~isempty(strfind(tempdata.home_team, 'g')) ||...
                    ~isempty(strfind(tempdata.home_team, 'h'))
                    tempdata.description = '小组赛';
                    tempdata.littlegroup = upper(tempdata.home_team(1));
                elseif ~isempty(strfind(tempdata.home_team, 'Q'))
                    tempdata.description = '淘汰赛';
                    tempdata.littlegroup = '';
                elseif ~isempty(strfind(tempdata.home_team, '半决赛'))
                    tempdata.description = '半决赛';
                    tempdata.littlegroup = '';
%                 elseif ~isempty(strfind(tempdata.home_team, 'e'))
%                     tempdata.description = '半决赛';
%                     tempdata.littlegroup = '';
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
            
%             if strcmp(tempdata.group, meta.games{1})
%                 if (strcmp(data{k,1},'2025/4/12') || strcmp(data{k,1},'2025/4/13'))
%                     tempdata.adjustable = false;
%                 end
%             elseif strcmp(tempdata.group, meta.games{2})
%                 if (strcmp(data{k,1},'2025/4/12') || strcmp(data{k,1},'2025/4/13'))...
%                         || (strcmp(data{k,1},'2025/4/5')...
%                         && ~isempty(strfind(tempdata.home_team, 'a')))
%                     tempdata.adjustable = false;
%                 end
%             elseif strcmp(tempdata.group, meta.games{4})
%                 if strcmp(data{k,1},'2025/4/12') || strcmp(data{k,1},'2025/4/13')
%                     tempdata.adjustable = false;
%                 end
%             end

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
    elseif ~gender_this && group_this(1) == 'C'
        group_name = '女甲';
        littlegroup = 'A';
    else
        group_name = '女乙';
        littlegroup = upper(char(group_this(1) - 'e' + 'a'));
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


