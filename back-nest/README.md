install

nest new tutorials-nestjs

Clean package.json

```json
"devDependencies": {
   "@nestjs/cli": "^11.0.0",
   "@nestjs/schematics": "^11.0.0",
   "@nestjs/testing": "^11.0.1",
   "@types/express": "^5.0.0",
   "@types/node": "^22.10.7",
   "source-map-support": "^0.5.21",
   "ts-node": "^10.9.2",
   "tsconfig-paths": "^4.2.0",
   "typescript": "^5.7.3"
 }
```

7. Notificações em Tempo Real
   Utilize Socket.IO para:
   Atualizar a lista de lances e o preço atual em tempo real.
   Exibir notificações de novos lances enviados por outros participantes.

8. Encerramento do Leilão
   Ao encerrar um leilão:
   Envie uma notificação em tempo real a todos os participantes, informando o nome do vencedor e o valor final.
   Desabilite a interface de envio de novos lances.
