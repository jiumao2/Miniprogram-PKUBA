# Cloud DB Schema Notes

本文件用于记录用户通过 `schema_viewer` 页面提供的云数据库结构截图。
后续如果继续收到新的集合结构或补充字段，直接在此文件追加。

更新日期：2026-03-18
来源：用户在开发者工具中打开 `pages/schema_viewer/schema_viewer` 后提供的截图

## Schedule

集合信息：
- 文档数：146
- 抽样数：5

当前已确认字段：

| 字段 | 类型 | 备注 / 示例 |
| --- | --- | --- |
| `_id` | string | 示例：`851a630369b794bd067aa325208a2b62` |
| `adjustable` | boolean | 示例：`true` |
| `away_team` | string | 示例：`信科` |
| `away_team_point` | number | 示例：`0` |
| `away_team_score` | number | 示例：`-1` |
| `description` | string | 示例：`小组赛` |
| `group` | string | 示例：`男甲` |
| `home_team` | string | 示例：`经济` |
| `home_team_point` | number | 示例：`0` |
| `home_team_score` | number | 示例：`-1` |
| `is_given_up` | boolean | 示例：`false` |
| `littlegroup` | string | 示例：`A` |
| `place` | string | 示例：`五四东一` |
| `sex` | boolean | 示例：`true` |
| `time` | date | 示例：`2026-03-21T04:50:00.000Z` |
| `updated_by` | string | 示例：`九毛` |

## Request

集合信息：
- 文档数：3
- 抽样数：3

当前已确认字段：

| 字段 | 类型 | 备注 / 示例 |
| --- | --- | --- |
| `_id` | string | 示例：`7a85e5d469b7b5a30003cbf73aa132f3` |
| `away_team` | string | 示例：`新传` |
| `date` | string | 示例：`1` |
| `date_new` | number | 示例：`468` |
| `game_id` | string | 示例：`851a630369b794bd067aa35b7061f8c4` |
| `group` | string | 示例：`女乙` |
| `home_team` | string | 示例：`城环` |
| `is_reviewed` | boolean | 示例：`true` |
| `notes` | string | 示例为空字符串 |
| `period_new` | number | 示例：`6` |
| `place` | string | 示例：`五四东一` |
| `place_new` | string | 示例：`五四东一` |
| `request_time` | date | 截图显示存在，示例值未完整展示 |
| `requester` | string | 示例：`新传` |
| `reviewed_by` | string | 示例：`朱墨然` |
| `reviewed_time` | date | 示例：`2026-03-17T07:28:32.862Z` |
| `sex` | boolean | 示例：`false` |
| `state` | number | 示例：`2` |
| `teams_to_vote` | array | 示例：`[length=3]` |
| `teams_to_vote[]` | string | 示例：`数学` |
| `time` | date | 示例：`2026-04-01T12:40:00.000Z` |
| `time_new` | date | 示例：`2027-04-13T12:40:00.000Z` |
| `to_vote_in_same_group` | boolean | 示例：`true` |
| `type` | number | 示例：`3` |
| `voted_accept` | array | 示例：`[length=3]` |
| `voted_accept[]` | string | 示例：`马院` |
| `voted_reject` | array | 示例：`[length=0]` |

## Team

集合信息：
- 文档数：57
- 抽样数：5

当前已确认字段：

| 字段 | 类型 | 备注 / 示例 |
| --- | --- | --- |
| `_id` | string | 示例：`b8ca528e69b790cf03f553917aa117c9` |
| `group` | string | 示例：`男甲` |
| `littlegroup` | string | 示例：`A` |
| `name` | string | 示例：`医学` |

## Leader

集合信息：
- 文档数：31
- 抽样数：5

当前已确认字段：

| 字段 | 类型 | 备注 / 示例 |
| --- | --- | --- |
| `_id` | string | 示例：`d3a1add769b6f6d60002855b6f6275d5` |
| `group` | string | 示例：`女乙` |
| `name` | string | 示例：`九毛` |
| `openID` | string | 示例：`oBalc4-6ISuQfjlpVCYj2zLnGlP0` |
| `register_date` | date | 示例：`2026-03-15T18:13:42.747Z` |
| `sex` | boolean | 示例：`false` |
| `team` | string | 示例：`城环` |

## Manager

集合信息：
- 文档数：102
- 抽样数：5

当前已确认字段：

| 字段 | 类型 | 备注 / 示例 |
| --- | --- | --- |
| `_id` | string | 示例：`2da1518365f55da6029d167034e6d647` |
| `name` | string | 示例：`李佳锦` |
| `openID` | string | 示例：`oBalc46f4xPJOFFXruu9RGfBo3-g` |
| `register_date` | date | 示例：`2024-03-16T08:51:50.879Z` |
| `type` | number | 示例：`0` |

## Private

集合信息：
- 文档数：2
- 抽样数：2

当前已确认记录：

### 记录 1：`_id = META`

| 字段 | 类型 | 备注 / 示例 |
| --- | --- | --- |
| `_id` | string | 固定为 `META` |
| `GAME_END_DATE` | number | 示例：`118` |
| `GAME_NAME` | string | 示例：`北大杯` |
| `GAME_START_DATE` | number | 示例：`80` |
| `GROUP_NAMES` | array | 示例：`[length=4]` |
| `GROUP_NAMES[]` | string | 示例：`男甲` |
| `GROUP_SEX` | array | 示例：`[length=4]` |
| `GROUP_SEX[]` | boolean | 示例：`true` |
| `LITTLEGROUPS` | array | 示例：`[length=4]` |
| `LITTLEGROUPS[]` | array | 示例：`[length=2]` |
| `LITTLEGROUPS[][]` | string | 示例：`A` |
| `LoginPassword` | string | 示例：`PKUBA1997` |
| `MANAGER_TYPES` | array | 示例：`[length=2]` |
| `MANAGER_TYPES[]` | string | 示例截图未完整展示 |
| `MAX_GAMES_NUM` | array | 示例：`[length=7]` |
| `MAX_GAMES_NUM[]` | array | 示例：`[length=5]` |
| `MAX_GAMES_NUM[][]` | object | 示例：`{...}` |
| `MAX_GAMES_NUM[][].hour` | number | 示例：`12` |
| `MAX_GAMES_NUM[][].max_game` | number | 示例：`3` |
| `MAX_GAMES_NUM[][].minute` | number | 示例：`50` |
| `PERIOD_TO_TIME` | array | 示例：`[length=11]` |
| `PERIOD_TO_TIME[]` | array | 示例：`[length=2]` |
| `PERIOD_TO_TIME[][]` | string | 示例：`12` |
| `PLACE_NAMES` | array | 示例：`[length=3]` |
| `PLACE_NAMES[]` | string | 示例：`五四东一` |
| `ROUND_END_DAY` | number | 示例：`7` |
| `ROUND_START_DAY` | number | 示例：`1` |
| `STATE` | array | 示例：`[length=6]` |
| `STATE[]` | string | 示例截图未完整展示 |
| `TEAMS` | array | 示例：`[length=4]` |
| `TEAMS[]` | array | 示例：`[length=12]` |
| `TEAMS[][]` | string | 示例：`医学` |
| `TYPES` | array | 示例：`[length=3]` |
| `TYPES[]` | string | 示例：`普通调整` |

### 记录 2：`_id = PASSWORD`

| 字段 | 类型 | 备注 / 示例 |
| --- | --- | --- |
| `_id` | string | 固定为 `PASSWORD` |
| `LoginPassword` | string | 示例：`PKUBA1997` |

## 尚未收到完整截图的集合

以下集合已知存在，但当前截图中还没有完整结构：

- `Photo`

如果后续用户继续发送截图，优先追加到本文件中。
