clear

% team_new = {};
team_new = {...
    'a1' 'm' '��ѧ' ... % �м�: ['','','','','','','','','','','','']
    'a2' 'm' '����' ...
    'a3' 'm' '�ſ�' ...
    'a4' 'm' '�ǻ�' ...
    'a5' 'm' '�ؿ�' ... 
    'a6' 'm' '��ѧ' ...
    'b1' 'm' 'ҽѧ' ...
    'b2' 'm' '��ѧ' ...
    'b3' 'm' '����' ...
    'b4' 'm' '����' ...
    'b5' 'm' '��΢' ...
    'b6' 'm' '��Ժ' ...
    ...
    'A1' 'm' '����' ... % ����: ['','','','','','','','','','','','','','','','','','','','','','','',''] 
    'A2' 'm' '���' ...
    'A3' 'm' '����' ...
    'A4' 'm' '����' ... 
    'B1' 'm' '��Ժ' ...
    'B2' 'm' '����' ...
    'B3' 'm' '�⻪' ...
    'B4' 'm' '��Ժ' ...
    'C1' 'm' '����' ...
    'C2' 'm' '����' ...
    'C3' 'm' '�Ź�' ...
    'C4' 'm' '�����' ...
    'D1' 'm' '��ѧ' ...
    'D2' 'm' '�´�' ...
    'D3' 'm' 'δ������-�ִ�ũѧԺ����' ...
    'D4' 'm' 'Ԫ��' ...
    'E1' 'm' '����' ...
    'E2' 'm' '����' ...
    'E3' 'm' '�����������' ...
    'E4' 'm' '����' ...
    'F1' 'm' '����' ...
    'F2' 'm' '��ѧ' ...
    'F3' 'm' '�ྩ' ...
    'F4' 'm' '����' ...
    ...
    '1' 'f' '��Ժ' ... % Ů��: ['','','','','','','','']
    '2' 'f' '��ѧ' ...
    '3' 'f' 'Ԫ��' ...
    '4' 'f' '��Ժ' ... 
    '5' 'f' 'ҽѧ' ...
    '6' 'f' '��ѧ' ...
    '7' 'f' '�ſ�' ...
    '8' 'f' '�´�' ...
    ...
    'A1' 'f' '����' ... % Ů��: ['','','','','','','','','','','','','']
    'A2' 'f' '�⾭' ...
    'A3' 'f' '�ྩ' ...
    'A4' 'f' '�Ź�' ...
    'A5' 'f' '����' ...
    'B1' 'f' '�ǻ�' ...
    'B2' 'f' '����' ...
    'B3' 'f' '��ѧ��������' ...
    'B4' 'f' '���' ...
    'C1' 'f' '��ѧ' ...
    'C2' 'f' '����' ...
    'C3' 'f' '����' ...
    'C4' 'f' '����' ...
    };
meta = ['{' ...
        '"games": ["�м�","����","Ů��","Ů��"],' ... % Ӧ��app.js��GROUP_NAMES��ͬ
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
        if strfind(upper(data{k,j}),'VS')
            temp = data{k,j};
            temp(temp==' ')=''; % delete all space
            tempdata.sex = true;

            if temp(end-1) == 'Ů'
                tempdata.sex = false;
                pos1 = strfind(upper(data{k,j}),'VS')-1;
%                 tempdata.group = meta.games{2};
                if isnan(str2double(temp(1:pos1))) && ~contains(temp(1:pos1),'��')
                    tempdata.group = meta.games{4};
                else
                    tempdata.group = meta.games{3};
                end
                pos_end = 3;
            else
                tempdata.sex = true;
                pos1 = strfind(upper(data{k,j}),'VS')-1;
%                 tempdata.group = meta.games{1};
                if (temp(1)>='a' && temp(1)<='z') || contains(temp(1:pos1),'��')
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
                tempdata.description = 'С����';
                tempdata.littlegroup = upper(tempdata.home_team(1));
            elseif ~isempty(strfind(tempdata.home_team, 'A')) ||...
                ~isempty(strfind(tempdata.home_team, 'B')) ||...
                ~isempty(strfind(tempdata.home_team, 'C'))
                tempdata.description = 'С����';
                tempdata.littlegroup = upper(tempdata.home_team(1));
            elseif tempdata.sex==true && (~isempty(strfind(tempdata.home_team, 'D')) ||...
                ~isempty(strfind(tempdata.home_team, 'E')) ||...
                ~isempty(strfind(tempdata.home_team, 'F')))
                tempdata.description = 'С����';
                tempdata.littlegroup = upper(tempdata.home_team(1));
            elseif tempdata.sex==false && length(tempdata.home_team)==1
                tempdata.description = '��ѭ��';
                tempdata.littlegroup = 'A';
            elseif ~isempty(strfind(tempdata.home_team, 'ȫ����'))
                tempdata.description = 'ȫ����';
                tempdata.littlegroup = '';
            elseif ~isempty(strfind(tempdata.home_team, '����'))
                tempdata.description = '����';
                tempdata.littlegroup = '';
            elseif ~isempty(strfind(tempdata.home_team, 'c5')) ||...
                ~isempty(strfind(tempdata.home_team, 'c6')) ||...
                ~isempty(strfind(tempdata.home_team, 'd5')) ||...
                ~isempty(strfind(tempdata.home_team, 'd6'))
                tempdata.description = '������';
                tempdata.littlegroup = '';
            else
                tempdata.description = '��̭��';
                tempdata.littlegroup = '';
            end
            
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