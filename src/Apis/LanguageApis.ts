import { LanguageModel, TranslateModel } from "@Models";
import { Api } from "@mui/icons-material";
import { ApiService } from "Services/ApiService";

export const LanguageApis = {
  getAllLanguages() {
    return ApiService.get<LanguageModel[]>("/api/language");
  },
  getChoiceLanguage() {
    return ApiService.get("/api/choice");
  },
  getValueLanguage() {
    return ApiService.get<TranslateModel>(`/api/language/value`);
  },
  updateChoiceLanguage(lang: string) {
    return ApiService.put("/api/choice", lang, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
