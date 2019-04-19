# README

## users
### columns
|  column  |    type      | options |
| -------- | ------------ | ------- |
| name     | string       | null: false, unique: true, add_index: true |

### Association
- has_many :user_groups
- has_many :messages
- has_many :groups through: :user_groups

## groups
## columns
|  column  |  type  |   options   |
| -------- | ------ | ----------- |
| name     | string | null: false |

### Association
- has_many :user_groups
- has_many :messages
- has_many :users through: :user_groups

## messages
### columns
| column |    type    |      options      |
| ------ | ---------- | ----------------- |
| body   | text       |                   |
| image  | string     |                   |
| user   | references | foreign_key: true |
| group  | references | foreign_key: true |

### Association
- belongs_to :user
- belongs_to :group

## user_groups
### columns
| column |    type    |      options      |
| ------ | ---------- | ----------------- |
| user   | references | foreign_key: true |
| group  | references | foreign_key: true |

### Association
- belongs_to :user
- belongs_to :group
