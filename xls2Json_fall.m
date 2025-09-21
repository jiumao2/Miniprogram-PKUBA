clear

% team_new = {};
team_new = {...
    'A1' 'm' '�⻪-����' ... % ����: ["","","","","","","","","",""] 
    'A2' 'm' '��ʷ-��ѧ' ...
    'A3' 'm' '����-�ǻ�' ...
    'A4' 'm' '��ѧ' ... 
    'B1' 'm' '��ѧ' ...
    'B2' 'm' '��ѧ' ...
    'B3' 'm' '���-�Ź�' ...
    'B4' 'm' 'Ԫ��' ...
    'C1' 'm' '����' ...
    'C2' 'm' '��Ժ' ...
    'C3' 'm' '����' ...
    'C4' 'm' '�ſ�' ...
    'D1' 'm' '����' ...
    'D2' 'm' 'ҽѧ' ...
    'D3' 'm' '�ؿ�' ...
    'D4' 'm' '��ѧ' ...
    ... % Ů��: ["","","","","","","","","","","","","","","","","","","",""]
    'A1' 'f' '�Ź�' ...
    'A2' 'f' '�ǻ�' ...
    'A3' 'f' '����' ...
    'A4' 'f' '����' ...
    'A5' 'f' 'ҽѧ' ...
    'B1' 'f' '�´�' ...
    'B2' 'f' '��ѧ' ...
    'B3' 'f' '����-��ʷ' ...
    'B4' 'f' '���' ...
    'B5' 'f' '�⻪-����' ...
    'C1' 'f' '��ѧ' ...
    'C2' 'f' '����' ...
    'C3' 'f' 'Ԫ��' ...
    'C4' 'f' '��ѧ' ...
    'C5' 'f' '��ѧ' ...
    'D1' 'f' '�ſ�' ...
    'D2' 'f' '�ྩ' ...
    'D3' 'f' '��Ժ' ...
    'D4' 'f' '����' ...
    'D5' 'f' '�ؿ�' ...
    };

meta = ['{' ...
        '"games": ["����","Ů��"],' ... % Ӧ��app.js��GROUP_NAMES��ͬ
        '"place_all": ["���Ķ�һ","���Ķ���","���Ķ���","��°�"]' ... 
        '}' ];
meta = jsondecode(meta);


place_all = meta.place_all;
place_num = length(place_all);
place = cell(place_num,1);
% �涨����ÿһ����ʹ�õĳ���
place{1} = [2,5,8,12,14,17]; % xls����еĵ�2,5,8,12,14,17��ʹ�õ�һ������
place{2} = [3,6,9,13,15];
place{3}= [4,7,10];
place{4} = [11,16];


% ��ȡ������ɿɱ�������С�����json�ļ�
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

            if temp(end-1) == 'Ů'
                tempdata.sex = false;
%                 pos1 = strfind(upper(data{k,j}),'VS')-1;
                tempdata.group = meta.games{2};
%                 if (temp(1)>='A' && temp(1)<='Z') && ~contains(temp(1:pos1),'��')
%                     tempdata.group = meta.games{3};
%                 else
%                     tempdata.group = meta.games{4};
%                 end
                pos_end = 3;
            else
                tempdata.sex = true;
%                 pos1 = strfind(upper(data{k,j}),'VS')-1;
                tempdata.group = meta.games{1};
%                 if (temp(1)>='A' && temp(1)<='Z') || contains(temp(1:pos1),'��')
%                     tempdata.group = meta.games{1};
%                 else
%                     tempdata.group = meta.games{2};
%                 end
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
                    ~isempty(strfind(tempdata.home_team, 'B')) ||...
                    ~isempty(strfind(tempdata.home_team, 'C')) ||...
                    ~isempty(strfind(tempdata.home_team, 'D')) 
                    tempdata.description = 'С����';
                    tempdata.littlegroup = upper(tempdata.home_team(1));
                elseif ~isempty(strfind(tempdata.home_team, 'E')) ||...
                    ~isempty(strfind(tempdata.home_team, 'F')) ||...
                    ~isempty(strfind(tempdata.home_team, 'G')) ||...
                    ~isempty(strfind(tempdata.home_team, 'H'))    
                    tempdata.description = '��̭��';
                    tempdata.littlegroup = '';
                elseif ~isempty(strfind(tempdata.home_team, 'I'))
                    tempdata.description = '�����';
                    tempdata.littlegroup = '';
                elseif ~isempty(strfind(tempdata.home_team, '����'))
                    tempdata.description = '����';
                    tempdata.littlegroup = '';
                else
                    error('Unknown game!');
                end
            else
                if ~isempty(strfind(tempdata.home_team, 'A')) ||...
                    ~isempty(strfind(tempdata.home_team, 'B')) ||...
                    ~isempty(strfind(tempdata.home_team, 'C')) ||...
                    ~isempty(strfind(tempdata.home_team, 'D')) 
                    tempdata.description = 'С����';
                    tempdata.littlegroup = upper(tempdata.home_team(1));
                elseif ~isempty(strfind(tempdata.home_team, 'E')) ||...
                    ~isempty(strfind(tempdata.home_team, 'F')) ||...
                    ~isempty(strfind(tempdata.home_team, 'G')) ||...
                    ~isempty(strfind(tempdata.home_team, 'H'))    
                    tempdata.description = '��̭��';
                    tempdata.littlegroup = '';
                elseif ~isempty(strfind(tempdata.home_team, 'I'))
                    tempdata.description = '�����';
                    tempdata.littlegroup = '';
                elseif ~isempty(strfind(tempdata.home_team, '����'))
                    tempdata.description = '����';
                    tempdata.littlegroup = '';
                else
                    error('Unknown game!');
                end
            end
            
            % is_given_up
            tempdata.is_given_up = false;

            % updated_by
            tempdata.updated_by = '��ë';

            % adjustable
            if contains([tempdata.home_team,tempdata.away_team],'����')
                tempdata.adjustable = false;
                tempdata.place = '��°�';
            else
                tempdata.adjustable = true;
            end
            
            if strcmp(tempdata.group, meta.games{1})
                if (strcmp(data{k,1},'2025/10/18') || strcmp(data{k,1},'2025/10/19'))
                    tempdata.adjustable = false;
                end
            elseif strcmp(tempdata.group, meta.games{2})
                if (strcmp(data{k,1},'2025/10/25') || strcmp(data{k,1},'2025/10/26'))...
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
%             if ~isempty(strfind(tempdata.home_team, 'ȫ����'))
%                 tempdata.place = '���Ķ�һ';
%                 if tempdata.sex
%                     tempdata.group = '����';
%                 else
%                     tempdata.group = 'Ů��';
%                 end
%             end
            
            temp_time = datetime([datestr(data{k,1},'yyyy/mm/dd'),datestr(data{1,j},' HH:MM:00')]);
            temp_time = temp_time - hours(8); %΢��С�������ݿ⵼��ʱ��Ϊ+0���й�Ϊ+8
            tempdata0 = jsonencode(tempdata);
            tempdata0 = [tempdata0(1:end-1),',"time":{"$date":"',datestr(temp_time,'yyyy-mm-ddTHH:MM:00Z"}}')];
            data_new = [data_new,tempdata0];

            count = count+1;
        end
    end
end
disp(['����', num2str(count), '������!']);
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

    if gender_this
        group_name = '����';
        littlegroup = upper(group_this(1));
    else
        group_name = 'Ů��';
        littlegroup = upper(group_this(1));
    end

%     if gender_this && (group_this(1) == 'A' || group_this(1) == 'B')
%         group_name = '�м�';
%         littlegroup = upper(group_this(1));
%     elseif gender_this
%         group_name = '����';
%         littlegroup = upper(group_this(1));
%     elseif ~gender_this && group_this(1) == 'A'
%         group_name = 'Ů��';
%         littlegroup = 'A';
%     else
%         group_name = 'Ů��';
%         littlegroup = upper(group_this(1));
%     end
    
    tempdata = struct();
    tempdata.group = group_name;
    tempdata.littlegroup = littlegroup;
    tempdata.name = name_this;

    tempdata_json = jsonencode(tempdata);
    data_all = [data_all, tempdata_json];
    count_team = count_team+1;
end

disp(['����', num2str(count_team), '֧����!']);
disp(data_all)
fid = fopen('team.json','w','n','UTF-8');
fprintf(fid, '%s', data_all);
fclose(fid);


