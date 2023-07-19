import { Kafka } from "kafkajs";
import { randomUUID } from "node:crypto";

async function bootstrap() {
    const kafka = new Kafka({
        clientId: 'notification-kafka-producer',
        brokers: ['relaxed-lioness-5472-us1-kafka.upstash.io:9092'],
        sasl: {
            mechanism: 'scram-sha-256',
            username: 'cmVsYXhlZC1saW9uZXNzLTU0NzIkx-u9KcBhKrF20csPSctWzskJcUJkRkGIra4',
            password: '70d27b76f96f402aa74e7fae350ea4bc',
        },
        ssl: true,
    });

    const producer = kafka.producer()

    await producer.connect()
    await producer.send({
        topic: 'notifications.send-notification',
        messages: [
            { 
                value: JSON.stringify({
                    content: 'Nova solicitação de amizade!',
                    category: 'social',
                    recipientId: randomUUID(),
                })
            },
        ],
    })

    await producer.disconnect();
}

bootstrap();