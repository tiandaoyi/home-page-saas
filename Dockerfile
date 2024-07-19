FROM node:16-alpine as build
# 设置 maintai
LABEL maintainer "495060071@qq.com"
# 当前目录代码都拷贝到app下
COPY ./ /app

WORKDIR /app

# 安装npm
RUN npm config set registry https://registry.npmmirror.com/

# 安装pnpm
RUN npm install -g pnpm@8.15.9
RUN pnpm config set registry https://registry.npmmirror.com/
RUN pnpm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/

# 自动生成代码前端
RUN pnpm install
RUN pnpm build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html/
# WORKDIR /usr/share/nginx/html/home-page-saas
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
# 暴露应用端口
# EXPOSE 80

# # 启动应用
# CMD ["npm", "run", "serve"]
