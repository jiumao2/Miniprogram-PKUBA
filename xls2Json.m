clear

% team_new = {};
team_new = {...
    'A1' 'm' '��Ժ' ... % ����: ["","","","","","","","","","","","","","","","","","",""] 
    'A2' 'm' '����' ...
    'A3' 'm' '�ſ�' ...
    'A4' 'm' '��ѧ' ... 
    'B1' 'm' 'ҽѧ' ...
    'B2' 'm' '��ѧ' ...
    'B3' 'm' '����' ...
    'B4' 'm' 'Ԫ��' ...
    'C1' 'm' '��ѧ' ...
    'C2' 'm' '���' ...
    'C3' 'm' '��ѧ' ...
    'C4' 'm' '����-����' ...
    'D1' 'm' '�ؿ�' ...
    'D2' 'm' '����-�Ź�' ...
    'D3' 'm' '����' ...
    'D4' 'm' '����' ...
    'E1' 'm' '�ĳ�' ...
    'E2' 'm' '����' ...
    'E3' 'm' '�⾭' ...
    ...
    'A1' 'f' '���' ... % Ů��: []
    'A2' 'f' '����' ...
    'A3' 'f' '����' ...
    'A4' 'f' '����' ...
    'B1' 'f' '��ѧ' ...
    'B2' 'f' '��Ժ' ...
    'B3' 'f' '����' ...
    'B4' 'f' '��Ժ' ...
    'C1' 'f' '����' ...
    'C2' 'f' '��ѧ' ...
    'C3' 'f' '�ྩ' ...
    'C4' 'f' '�ǻ�' ...
    'D1' 'f' '��ѧ' ...
    'D2' 'f' '�Ź�' ...
    'D3' 'f' '�´�' ...
    'D4' 'f' '�⾭' ...
    'E1' 'f' 'ҽѧ' ...
    'E2' 'f' '����-����' ...
    'E3' 'f' '�ؿ�' ...
    'F1' 'f' 'Ԫ��' ...
    'F2' 'f' '����' ...
    'F3' 'f' '�ſ�' ...
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
[~,txt,data] = xlsread('schedule.xlsx');

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
                pos1 = strfind(upper(data{k,j}),'VS')-1;
                tempdata.group = meta.games{2};
%                 if isnan(str2double(temp(1:pos1))) && ~contains(temp(1:pos1),'��')
%                     tempdata.group = meta.games{4};
%                 else
%                     tempdata.group = meta.games{3};
%                 end
                pos_end = 3;
            else
                tempdata.sex = true;
                pos1 = strfind(upper(data{k,j}),'VS')-1;
                tempdata.group = meta.games{1};
%                 if (temp(1)>='a' && temp(1)<='z') || contains(temp(1:pos1),'��')
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
                    ~isempty(strfind(tempdata.home_team, 'D')) ||...
                    ~isempty(strfind(tempdata.home_team, 'E'))
                    tempdata.description = 'С����';
                    tempdata.littlegroup = upper(tempdata.home_team(1));
                elseif ~isempty(strfind(tempdata.home_team, 'F')) ||...
                    ~isempty(strfind(tempdata.home_team, 'G'))
                    tempdata.description = '��̭��';
                    tempdata.littlegroup = upper(tempdata.home_team(1));
                elseif ~isempty(strfind(tempdata.home_team, '����'))
                    tempdata.description = '��������';
                    tempdata.littlegroup = '';
                else
                    error('Unknown game!');
                end
            else
                if ~isempty(strfind(tempdata.home_team, 'A')) ||...
                    ~isempty(strfind(tempdata.home_team, 'B')) ||...
                    ~isempty(strfind(tempdata.home_team, 'C')) ||...
                    ~isempty(strfind(tempdata.home_team, 'D')) ||...
                    ~isempty(strfind(tempdata.home_team, 'E')) ||...
                    ~isempty(strfind(tempdata.home_team, 'F'))
                    tempdata.description = 'С����';
                    tempdata.littlegroup = upper(tempdata.home_team(1));
                elseif ~isempty(strfind(tempdata.home_team, 'G')) ||...
                    ~isempty(strfind(tempdata.home_team, 'H'))
                    tempdata.description = '��̭��';
                    tempdata.littlegroup = upper(tempdata.home_team(1));
                elseif ~isempty(strfind(tempdata.home_team, '����'))
                    tempdata.description = 'Ů������';
                    tempdata.littlegroup = '';
                else
                    error('Unknown game!');
                end
            end

%             if ~isempty(strfind(tempdata.home_team, 'a')) ||...
%                 ~isempty(strfind(tempdata.home_team, 'b'))
%                 tempdata.description = 'С����';
%                 tempdata.littlegroup = upper(tempdata.home_team(1));
%             elseif ~isempty(strfind(tempdata.home_team, 'A')) ||...
%                 ~isempty(strfind(tempdata.home_team, 'B')) ||...
%                 ~isempty(strfind(tempdata.home_team, 'C'))
%                 tempdata.description = 'С����';
%                 tempdata.littlegroup = upper(tempdata.home_team(1));
%             elseif tempdata.sex==true && (~isempty(strfind(tempdata.home_team, 'D')) ||...
%                 ~isempty(strfind(tempdata.home_team, 'E')) ||...
%                 ~isempty(strfind(tempdata.home_team, 'F')))
%                 tempdata.description = 'С����';
%                 tempdata.littlegroup = upper(tempdata.home_team(1));
%             elseif tempdata.sex==false && length(tempdata.home_team)==1
%                 tempdata.description = '��ѭ��';
%                 tempdata.littlegroup = 'A';
%             elseif ~isempty(strfind(tempdata.home_team, 'ȫ����'))
%                 tempdata.description = 'ȫ����';
%                 tempdata.littlegroup = '';
%             elseif ~isempty(strfind(tempdata.home_team, '����'))
%                 tempdata.description = '����';
%                 tempdata.littlegroup = '';
%             elseif ~isempty(strfind(tempdata.home_team, 'c5')) ||...
%                 ~isempty(strfind(tempdata.home_team, 'c6')) ||...
%                 ~isempty(strfind(tempdata.home_team, 'd5')) ||...
%                 ~isempty(strfind(tempdata.home_team, 'd6'))
%                 tempdata.description = '������';
%                 tempdata.littlegroup = '';
%             else
%                 tempdata.description = '��̭��';
%                 tempdata.littlegroup = '';
%             end
            
            % is_given_up
            tempdata.is_given_up = false;

            % updated_by
            tempdata.updated_by = '��ë';

            % adjustable
            if contains([tempdata.home_team,tempdata.away_team],'����') && ~contains([tempdata.home_team,tempdata.away_team],'�����')
                tempdata.adjustable = false;
                tempdata.place = '��°�';
            else
                tempdata.adjustable = true;
            end
            
            if strcmp(tempdata.group, meta.games{1})
                if (strcmp(data{k,1},'2024/10/26') || strcmp(data{k,1},'2024/10/27'))...
                        &&...
                        (~isempty(strfind(tempdata.home_team, 'A')) ||...
                        ~isempty(strfind(tempdata.home_team, 'B')) ||...
                        ~isempty(strfind(tempdata.home_team, 'C')) ||...
                        ~isempty(strfind(tempdata.home_team, 'D')))
                    tempdata.adjustable = false;
                end
            elseif strcmp(tempdata.group, meta.games{2})
                if (strcmp(data{k,1},'2024/10/26') || strcmp(data{k,1},'2024/10/27'))...
                        &&...
                        (~isempty(strfind(tempdata.home_team, 'A')) ||...
                        ~isempty(strfind(tempdata.home_team, 'B')) ||...
                        ~isempty(strfind(tempdata.home_team, 'C')) ||...
                        ~isempty(strfind(tempdata.home_team, 'D')))
                    tempdata.adjustable = false;
                end
%             elseif strcmp(tempdata.group, meta.games{4})
%                 if strcmp(data{k,1},'2024/4/13') || strcmp(data{k,1},'2024/4/14')
%                     tempdata.adjustable = false;
%                 end
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
            if ~isempty(strfind(tempdata.home_team, 'ȫ����'))
                tempdata.place = '���Ķ�һ';
                if tempdata.sex
                    tempdata.group = '����';
                else
                    tempdata.group = 'Ů��';
                end
            end
            
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
fprintf(fid, '%s', data_new);
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

%     if gender_this && (group_this(1) == 'a' || group_this(1) == 'b')
%         group_name = '�м�';
%         littlegroup = upper(group_this(1));
%     elseif gender_this
%         group_name = '����';
%         littlegroup = group_this(1);
%     elseif ~gender_this && length(group_this)==1
%         group_name = 'Ů��';
%         littlegroup = 'A';
%     else
%         group_name = 'Ů��';
%         littlegroup = group_this(1);
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


