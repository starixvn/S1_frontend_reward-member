FROM node:16.20.0-alpine AS builder

# alpine 輕量化 Image 不包含必要的 python 資源，需另外加載才可正確執行 npm 安裝指令
RUN apk add --no-cache libc6-compat python3 make g++

ARG project_name
ARG env

# 設定工作目錄
WORKDIR /build

# bind node_modules to bin/PATH
# 因為有用到 node_module內的 nx command
# 故需要綁定 docker bin path 否則會 command not found
ENV PATH /build/node_modules/.bin:$PATH
COPY . .
# copy env
# COPY ./apps/${project_name}/.env.${env} ./apps/${project_name}/.env

# install
RUN npm ci
RUN nx clear-cache
RUN npm run build $project_name

FROM node:16.20.0-alpine AS serve-step

ARG project_name
ARG port

# 設定工作目錄
WORKDIR /app 

# 指定 group 和使用者
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 將檔案綁定至 group 與使用者
COPY --from=builder --chown=nextjs:nodejs /build/dist/apps/${project_name}/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /build/dist/apps/${project_name}/.next/static ./dist/apps/${project_name}/.next/static
COPY --from=builder --chown=nextjs:nodejs /build/dist/apps/${project_name}/public ./apps/${project_name}/public

# 設定 user 和 group 以用作目前階段剩餘部分的預設使用者和群組。
# USER nextjs

# server.js 運行路徑
ENV APP_PATH=apps/${project_name}/server.js

# 通知Docker容器在執行時監聽指定的PORT號
EXPOSE ${port}

ENV PORT ${port}

# 為執行容器提供預設值
CMD node $APP_PATH