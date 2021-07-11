clear
meta = ['{' ...
        '"games": ["男篮","女篮"],' ... % 应与app.js中GROUP_NAMES相同
        '"place_all": ["五四东一","五四东二","五四东三","邱德拔"]' ... % 规定表中每一列所使用的场地
        '}' ];
% fid = fopen('meta.json');
% meta = fread(fid)';
% meta = native2unicode(meta);
meta = jsondecode(meta);
% fclose(fid);

% 规定表中每一列所使用的场地
place_all = meta.place_all;
place_num = length(place_all);
place = zeros(place_num,4);
place(1,:) = [2,5,8,11];
place(2,:) = [3,6,9,12];
place(3,:)= [4,7,10,13];
place(4,1:2) = [14,15];



[~,txt,data] = xlsread('schedule.xlsx');

[row,col] = size(data);
data_new = [];
for k = 1:row
    for j = 1:col
        if strfind(data{k,j},'VS')
            temp = data{k,j};
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
            pos1 = strfind(data{k,j},'VS')-1;
            pos2 = pos1 + 3;
            tempdata.home_team = temp(1:pos1);
            tempdata.away_team = temp(pos2:end-pos_end);
            for i = 1:place_num
                if sum(place(i,:)==j)>=1
                    tempdata.place = place_all{i};
                    break
                end
            end
            if strfind(tempdata.home_team,'决赛') | strfind(tempdata.away_team,'决赛')
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