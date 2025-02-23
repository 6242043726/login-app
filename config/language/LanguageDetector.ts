import { LanguageDetectorAsyncModule } from "i18next";
import * as SecureStore from 'expo-secure-store';
import * as Localization from 'expo-localization'; 

export default class LanguageDetector implements LanguageDetectorAsyncModule {
  type = "languageDetector" as const;
  async = true as const;

  static readonly type = "languageDetector";
  static readonly async = true;
  static readonly defaultLang = "th";

  async detect(
    callback: (lng: string | readonly string[] | undefined) => void | undefined
  ): Promise<string | readonly string[] | undefined> {
    try {
      const defaultLang = LanguageDetector.defaultLang;
      
      const savedLanguage = await SecureStore.getItemAsync('userLanguage');
      if (savedLanguage) {
        callback(savedLanguage);
        return savedLanguage;
      }

      const locales = Localization.getLocales();
      const systemLanguage = locales[0].languageCode || defaultLang; 
      const validLanguages = ["en", "th"];  

      if (validLanguages.includes(systemLanguage)) {
        callback(systemLanguage);
        return systemLanguage;
      }

      callback(defaultLang);
      return defaultLang;
      
    } catch (error) {
      console.error("Error detecting language", error);
      const defaultLang = LanguageDetector.defaultLang;
      callback(defaultLang);
      return defaultLang;
    }
  }

  async cacheUserLanguage(lng: string): Promise<void> {
    try {
      await SecureStore.setItemAsync('userLanguage', lng);
      console.log("Language cached: ", lng);
    } catch (error) {
      console.error("Error saving language to SecureStore", error);
    }
  }
}
