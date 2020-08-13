# 構成

## front
### アーキテクチャ
- Vue.js(vue cli)
  - @vue/composition-api

- hosting
  - netlify

## backend
### アーキテクチャ
- node.js(express + apollo server)
  - graphql
  - typeorm

- hosting
  - heroku(monorepo)

## 起動

- front
  
- backend  
  1. ```cd /backend && npm run install && npm run dev```
  2. ```(初回のみ)npm run typorm migration:run```