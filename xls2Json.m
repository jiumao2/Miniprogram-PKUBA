clear
% 男篮: ['信科', '元培', '光经', '化学', '医学', '国关', '外院', '心哲', '政管', '数地', '新城', '法社', '物理', '环科', '生历', '工学', '中艺'],
% 女篮: ['中文', '信科', '信管', '元培', '化学', '医学', '国关', '地空', '城环', '外院', '心理', '政管', '新传', '法学', '物理', '生历', '社会', '艺哲']],
% team_new = {};
team_new = {...
    'A1' 'm' '信科' ...
    'A2' 'm' '法社' ...
    'A3' 'm' '中艺' ...
    'A4' 'm' '医学' ...
    'A5' 'm' '化学' ...
    'A6' 'm' '政管' ...
    'B1' 'm' '环科' ... 
    'B2' 'm' '元培' ...
    'B3' 'm' '外院' ...
    'B4' 'm' '光经' ...
    'B5' 'm' '数地' ...
    'B6' 'm' '工学' ...
    'C1' 'm' '物理' ...
    'C2' 'm' '心哲' ...
    'C3' 'm' '生历' ...
    'C4' 'm' '国关' ...
    'C5' 'm' '新城' ...
    'A1' 'f' '外院' ...
    'A2' 'f' '化学' ...
    'A3' 'f' '城环' ...
    'A4' 'f' '物理' ...
    'B1' 'f' '元培' ...
    'B2' 'f' '中文' ...
    'B3' 'f' '社会' ...
    'B4' 'f' '生历' ...
    'C1' 'f' '信科' ...
    'C2' 'f' '信管' ...
    'C3' 'f' '地空' ...
    'C4' 'f' '国关' ...
    'C5' 'f' '心理' ...
    'D1' 'f' '医学' ...
    'D2' 'f' '新传' ...
    'D3' 'f' '法学' ...
    'D4' 'f' '艺哲' ...
    'D5' 'f' '政管' ...
    };
meta = ['{' ...
        '"games": ["男篮","女篮"],' ... % 应与app.js中GROUP_NAMES相同
        '"place_all": ["五四东一","五四东二","五四东三","邱德拔"]' ... 
        '}' ];
% fid = fopen('meta.json');
% meta = fread(fid)';
% meta = native2unicode(meta);
meta = jsondecode(meta);
% fclose(fid);

% 规定表中每一列所使用的场地
place_all = meta.place_all;
place_num = length(place_all);
place = cell(place_num,1);
place{1} = [2,5,8,12,14,17];
place{2} = [3,6,9,13,15];
place{3}= [4,7,10];
place{4} = [11,16];



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
                pos_end = 3;
            else
                tempdata.sex = true;
                tempdata.group = meta.games{1};
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
%fwrite(fid,data_new);
fprintf(fid, '%s', data_new);
fclose(fid);