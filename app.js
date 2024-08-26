const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer(['Tu Orden a sido tomada con exito!, estaremos contactando contigo para la entrega de este.'])

const flowBienvenida = addKeyword([EVENTS.WELCOME]).addAnswer('🙌 Bienvenido a este chatbot De restaurante')
const flowNotaVoz = addKeyword([EVENTS.VOICE_NOTE]).addAnswer('🎤 Recibí una nota de voz, Me alegra escucharte en unos momentos de dare una respuesta.')
const flowUbicacion = addKeyword([EVENTS.LOCATION]).addAnswer('📍 Recibí una ubicación, Veo que estas cerca de unos ed nuestros locales, te puedo ayudar a llegar.')
const flowMedia = addKeyword([EVENTS.MEDIA]).addAnswer('🖼️ Recibí una imagen, perfecto le avisare a unos de  los administradores para que te ayuden a resolverlo.')
const flowDocumento = addKeyword([EVENTS.DOCUMENT]).addAnswer('📄 Recibí un documento, Te contactare con un administrador para que vea tu caso.')

const flowMenu = addKeyword(['menu', 'cafe', 'comida']).addAnswer('🍔 Aquí tienes el menu', null, null, [flowSecundario])
    .addAnswer(
    [
        '📄 Sopa: De fideos',
        '📄 Plato fuerte: Pollo a la plancha',
        '📄 Postre: Helado de chocolate',
        '📄 Bebida: Jugo de naranja',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)


const flowGracias = addKeyword(['gracias', 'grac', 'hasta luego']).addAnswer(
    [
        '🙏 Gracias a ti por visitarnos, esperamos verte pronto',
    ],
    null,
    null,
    []
)



const flowPrincipal = addKeyword(['hola', 'buen dia', 'buenas tardes', 'buenas noches', 'ola'])
    .addAnswer('🙌 Hola bienvenido a este *Chatbot*, Soy el asistente virtual del restaurante Luigis')
    .addAnswer(
        [
            'te comparto los lo que puedo hacer por ti',
            '👉 *menu* para ver el menu',
            '👉 *deudas*  para ver su vista de deudas en el restaurante',
            '👉 *pedidos* para ver los pedidos pendientes a su cuenta ',
            '👉 *ubicacion* para ver nuestra ubicacion!',
        ],
        null,
        null,
        [flowMenu, flowGracias]
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal, flowNotaVoz, flowUbicacion, flowMedia, flowDocumento])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
