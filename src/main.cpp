#include <napi.h>
#include <string>

#include "base.h"
#include "nnet_language_identifier.h"

const int num_queried_langs = 3;
using chrome_lang_id::NNetLanguageIdentifier;

Napi::Value GetLang(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    if (info.Length() != 1) {
        Napi::TypeError::New(env, "Wrong number of arguments")
                .ThrowAsJavaScriptException();
        return env.Null();
    }

    if (!info[0].IsString()) {
        Napi::TypeError::New(env, "Argument must be a string")
                .ThrowAsJavaScriptException();
        return env.Null();
    }

    NNetLanguageIdentifier lang_id(/*min_num_bytes=*/0,
            /*max_num_bytes=*/1000);

    Napi::String val = info[0].ToString();
    std::string text = val.Utf8Value();
    const std::vector<NNetLanguageIdentifier::Result> results = lang_id.FindTopNMostFreqLangs(text, num_queried_langs);
    Napi::Array result = Napi::Array::New(env, results.size());

    for (unsigned long i = 0; i < results.size(); i++) {
        Napi::Object obj = Napi::Object::New(env);
        obj.Set("language", results[i].language);
        obj.Set("probability", results[i].probability);
        obj.Set("is_reliable", results[i].is_reliable);
        obj.Set("proportion", results[i].proportion);
        result.Set(i, obj);
    }

    return result;
}


Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set(Napi::String::New(env, "getLanguages"),
                Napi::Function::New(env, GetLang));
    return exports;
}

NODE_API_MODULE(cld3, Init)
