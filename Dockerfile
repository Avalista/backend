FROM node:22-alpine AS builder
WORKDIR /app

# 1. Copiar arquivos essenciais primeiro
COPY package*.json ./
COPY prisma ./prisma

# 2. Instalar dependências e gerar Prisma Client
RUN npm ci
# Cria o diretório necessário para o Prisma ERD
RUN npx prisma generate

# 3. Copiar resto do código e fazer build
COPY . .
RUN npm run build  # Agora os tipos do Prisma estarão disponíveis

# Estágio de produção
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production

# Copiar apenas o necessário
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/prisma ./prisma

RUN npm i --ignore-scripts

EXPOSE 3000
CMD ["node", "dist/main"]