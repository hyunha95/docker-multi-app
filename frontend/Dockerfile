# 엔진엑스에 제공할 빌드 파일을 생성하느 단계
FROM node:alpine as builder
WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./
RUN npm run build

# 엔진엑스를 가동하고 앞서 생성한 빌드 파일을 제공한다.
# default.conf에 해준 설정을 엔진엑스 컨테이너 안으로 복사한다.
FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html