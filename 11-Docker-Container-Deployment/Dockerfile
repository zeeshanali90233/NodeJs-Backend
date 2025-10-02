from node:18

workdir /app

copy package*.json ./

run npm install

copy . .

expose 5050

cmd ["npm", "start"]