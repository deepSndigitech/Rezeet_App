import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { en, hi } from "../locales"

export const resources = {
    en: {
        translation: en,
    },
    hi: {
        translation: hi,
    }

}
// export const languageResources = {
//     en: { translation: 'en' },
//     hi: { translation: 'hi' }
// }
i18next.use(initReactI18next).init({
    debug: true,
    interpolation: {
        escapeValue: false,
    },
    compatibilityJSON: 'v3',
    lng: 'en',
    fallbackLng: 'en',
    resources: resources,
})

export default i18next;